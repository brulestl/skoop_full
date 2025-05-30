import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { Provider } from './useConnectedAccounts';

export interface Bookmark {
  id: string;
  user_id: string;
  url: string;
  title: string | null;
  description: string | null;
  summary: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  metadata?: any; // JSON metadata including engagement metrics
  // Additional properties that might come from raw data
  source?: Provider;
  sourceUrl?: string;
  savedAt?: Date;
  starred?: boolean;
  engagement?: any;
  image?: string | null;
  content?: string;
}

export interface UseBookmarksOptions {
  provider?: Provider;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'source';
  sortOrder?: 'asc' | 'desc';
  providers?: string[];
}

export interface UseBookmarksResult {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  deleteBookmark: (bookmarkId: string) => Promise<boolean>;
  totalCount: number;
  isEmpty: boolean; // Flag to indicate if the current filter combination has no results
}

const PAGE_SIZE = 20;
const DEBOUNCE_DELAY = 300; // 300ms debounce
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const AUTO_SYNC_INTERVAL = 30 * 60 * 1000; // 30 minutes for auto-sync (increased from 15 to reduce spam)

// Cache for storing query results and their timestamps
interface CacheEntry {
  data: Bookmark[];
  totalCount: number;
  timestamp: number;
  isEmpty: boolean; // Track if this query returned 0 results
  queryKey: string; // Store the query key for debugging
}

const queryCache = new Map<string, CacheEntry>();

export function useBookmarks(options: UseBookmarksOptions = {}): UseBookmarksResult {
  const { user } = useAuth();
  const { provider, limit = PAGE_SIZE, sortBy = 'created_at', sortOrder = 'desc', providers } = options;
  
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  
  // Add debouncing and sync management
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastQueryRef = useRef<string>('');
  const autoSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoSyncRef = useRef<number>(0); // Track last auto-sync time

  // Create a stable query key for caching/debouncing
  const createQueryKey = useCallback(() => {
    return JSON.stringify({
      userId: user?.id,
      provider,
      sortBy,
      sortOrder,
      providers: providers?.sort() // Sort to ensure consistent key
    });
  }, [user?.id, provider, sortBy, sortOrder, providers]);

  // Check if cache entry is still valid
  const isCacheValid = (entry: CacheEntry): boolean => {
    return Date.now() - entry.timestamp < CACHE_DURATION;
  };

  // Get cached data if available and valid
  const getCachedData = (queryKey: string): CacheEntry | null => {
    const cached = queryCache.get(queryKey);
    if (cached && isCacheValid(cached)) {
      return cached;
    }
    // Remove expired cache entry
    if (cached) {
      console.log('Removing expired cache entry for:', queryKey);
      queryCache.delete(queryKey);
    }
    return null;
  };

  // Store data in cache
  const setCachedData = (queryKey: string, data: Bookmark[], totalCount: number) => {
    const cacheEntry: CacheEntry = {
      data,
      totalCount,
      timestamp: Date.now(),
      isEmpty: totalCount === 0,
      queryKey
    };
    
    queryCache.set(queryKey, cacheEntry);
    console.log(`Cached data for query: ${queryKey} (${totalCount} items, isEmpty: ${cacheEntry.isEmpty})`);
  };

  // Check if we should throttle auto-sync based on empty results
  const shouldThrottleAutoSync = (queryKey: string): boolean => {
    const cached = getCachedData(queryKey);
    const now = Date.now();
    
    // If we have empty results cached, throttle auto-sync more aggressively
    if (cached && cached.isEmpty) {
      const timeSinceLastSync = now - lastAutoSyncRef.current;
      const throttleTime = AUTO_SYNC_INTERVAL * 2; // Double the interval for empty results
      
      if (timeSinceLastSync < throttleTime) {
        console.log(`Throttling auto-sync for empty results. Last sync: ${timeSinceLastSync}ms ago, need: ${throttleTime}ms`);
        return true;
      }
    }
    
    return false;
  };

  const fetchBookmarks = async (offset = 0, append = false, force = false) => {
    if (!user) {
      setLoading(false);
      setIsEmpty(false);
      return;
    }

    const queryKey = createQueryKey();
    
    // Check cache first (only for initial queries, not pagination)
    if (offset === 0 && !force) {
      const cached = getCachedData(queryKey);
      if (cached) {
        console.log('Using cached data for query:', queryKey, `(${cached.data.length} items, isEmpty: ${cached.isEmpty})`);
        setBookmarks(cached.data);
        setTotalCount(cached.totalCount);
        setHasMore(cached.data.length === limit && !cached.isEmpty);
        setCurrentOffset(cached.data.length);
        setLoading(false);
        setError(null);
        setIsEmpty(cached.isEmpty);
        lastQueryRef.current = queryKey;
        return;
      }
    }
    
    // Skip if same query and not forced (prevent duplicate requests)
    if (!force && queryKey === lastQueryRef.current && offset === 0) {
      console.log('Skipping duplicate query:', queryKey);
      return;
    }

    try {
      setError(null);
      if (!append) {
        setLoading(true);
      }

      console.log('Making database query for:', queryKey, `(offset: ${offset}, append: ${append}, force: ${force})`);

      // Build the query using any type to avoid TypeScript issues temporarily
      let query = (supabase as any)
        .from('bookmarks')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + limit - 1);

      // Filter by provider if specified and source column exists
      if (provider) {
        query = query.eq('source', provider);
      }

      // Filter by multiple providers if specified - HARDENED LOGIC
      // Skip .in() filter in these cases:
      // 1. providers is empty array (would cause Supabase 400 error) 
      // 2. providers includes 'all' (means fetch all sources)
      // 3. providers is null/undefined
      if (providers && providers.length > 0 && !providers.includes('all')) {
        console.log('Applying source filter:', providers);
        query = query.in('source', providers);
      } else {
        console.log('Skipping source filter - fetching all sources. Providers:', providers);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching bookmarks:', error);
        setError(error.message);
        setIsEmpty(false);
        return;
      }

      // Treat empty data as valid result, not an error
      const bookmarkData = data || [];
      const resultCount = count || 0;
      const isEmptyResult = resultCount === 0;
      
      console.log(`Query returned ${bookmarkData.length} bookmarks (count: ${resultCount}, isEmpty: ${isEmptyResult})`);

      const newBookmarks = bookmarkData.map((bookmark: any) => ({
        ...bookmark,
        savedAt: new Date(bookmark.created_at),
        sourceUrl: bookmark.url,
        starred: false, // Default value
        engagement: bookmark.metadata || {}, // Use metadata for engagement data
      }));
      
      if (append) {
        setBookmarks(prev => [...prev, ...newBookmarks]);
        setCurrentOffset(offset + newBookmarks.length);
      } else {
        setBookmarks(newBookmarks);
        setCurrentOffset(newBookmarks.length);
        
        // Always cache the initial query result - empty results are valid and important to cache
        if (offset === 0) {
          setCachedData(queryKey, newBookmarks, resultCount);
        }
      }

      setTotalCount(resultCount);
      setHasMore(newBookmarks.length === limit && !isEmptyResult);
      setIsEmpty(isEmptyResult);
      lastQueryRef.current = queryKey;

    } catch (err) {
      console.error('Exception fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
      setIsEmpty(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function with improved empty result handling
  const debouncedFetch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const queryKey = createQueryKey();
    
    // If we have cached data (including empty results), show it immediately
    const cached = getCachedData(queryKey);
    if (cached) {
      console.log('Using cached data from debounced fetch:', queryKey, `(isEmpty: ${cached.isEmpty})`);
      setBookmarks(cached.data);
      setTotalCount(cached.totalCount);
      setHasMore(cached.data.length === limit && !cached.isEmpty);
      setCurrentOffset(cached.data.length);
      setLoading(false);
      setError(null);
      setIsEmpty(cached.isEmpty);
      lastQueryRef.current = queryKey;
      return;
    }

    // Debounce new queries
    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentOffset(0);
      fetchBookmarks(0, false, true);
    }, DEBOUNCE_DELAY);
  }, [user, provider, sortBy, sortOrder, providers]);

  // Setup auto-sync with improved throttling for empty results
  const setupAutoSync = useCallback(() => {
    if (autoSyncIntervalRef.current) {
      clearInterval(autoSyncIntervalRef.current);
    }

    autoSyncIntervalRef.current = setInterval(() => {
      const queryKey = createQueryKey();
      
      // Check if we should throttle auto-sync for empty results
      if (shouldThrottleAutoSync(queryKey)) {
        return;
      }
      
      console.log('Auto-sync: Refreshing bookmarks...');
      lastAutoSyncRef.current = Date.now();
      
      // For auto-sync, only invalidate the current query's cache, not all caches
      queryCache.delete(queryKey);
      setCurrentOffset(0);
      fetchBookmarks(0, false, true);
    }, AUTO_SYNC_INTERVAL);
  }, [user, provider, sortBy, sortOrder, providers]);

  const loadMore = async () => {
    if (!loading && hasMore && !isEmpty) {
      await fetchBookmarks(currentOffset, true);
    }
  };

  const refresh = async () => {
    // Clear cache for this query to force fresh data
    const queryKey = createQueryKey();
    queryCache.delete(queryKey);
    console.log('Manual refresh - cleared cache for:', queryKey);
    setCurrentOffset(0);
    await fetchBookmarks(0, false, true);
  };

  const deleteBookmark = async (bookmarkId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await (supabase as any)
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId)
        .eq('user_id', user.id); // Ensure user can only delete their own bookmarks

      if (error) {
        console.error('Error deleting bookmark:', error);
        return false;
      }

      // Remove from local state
      setBookmarks(prev => {
        const newBookmarks = prev.filter(bookmark => bookmark.id !== bookmarkId);
        // Update isEmpty flag based on new count
        setIsEmpty(newBookmarks.length === 0);
        return newBookmarks;
      });
      setTotalCount(prev => {
        const newCount = Math.max(0, prev - 1);
        setIsEmpty(newCount === 0);
        return newCount;
      });
      
      // Update cache to reflect the deletion
      const queryKey = createQueryKey();
      const cached = getCachedData(queryKey);
      if (cached) {
        const updatedData = cached.data.filter(bookmark => bookmark.id !== bookmarkId);
        const updatedCount = Math.max(0, cached.totalCount - 1);
        setCachedData(queryKey, updatedData, updatedCount);
      }
      
      return true;
    } catch (err) {
      console.error('Exception deleting bookmark:', err);
      return false;
    }
  };

  // Use debounced fetch for parameter changes
  useEffect(() => {
    if (!user) {
      setLoading(false);
      setIsEmpty(false);
      return;
    }

    // Clear any pending debounced calls
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // For initial load, fetch immediately
    if (lastQueryRef.current === '') {
      setCurrentOffset(0);
      fetchBookmarks(0, false, true);
      setupAutoSync(); // Start auto-sync timer
    } else {
      // For subsequent changes, use debounced fetch
      debouncedFetch();
      
      // Restart auto-sync with new parameters
      setupAutoSync();
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [user, provider, sortBy, sortOrder, providers]);

  // Cleanup auto-sync on unmount
  useEffect(() => {
    return () => {
      if (autoSyncIntervalRef.current) {
        clearInterval(autoSyncIntervalRef.current);
      }
    };
  }, []);

  // Listen for bookmark updates from sync operations
  useEffect(() => {
    const handleBookmarksUpdated = () => {
      console.log('Bookmarks updated event received, clearing cache and refreshing...');
      queryCache.clear(); // Clear all cache when bookmarks are updated
      lastAutoSyncRef.current = Date.now(); // Reset auto-sync timer
      refresh();
    };

    window.addEventListener('bookmarks-updated', handleBookmarksUpdated);
    
    return () => {
      window.removeEventListener('bookmarks-updated', handleBookmarksUpdated);
    };
  }, []);

  return {
    bookmarks,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    deleteBookmark,
    totalCount,
    isEmpty
  };
}

/**
 * Hook specifically for fetching bookmarks by provider for SkoopContent columns
 */
export function useProviderBookmarks(provider: Provider): UseBookmarksResult {
  return useBookmarks({ provider, limit: 5 });
} 