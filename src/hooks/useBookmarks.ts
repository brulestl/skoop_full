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
}

const PAGE_SIZE = 20;
const DEBOUNCE_DELAY = 300; // 300ms debounce
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Cache for storing query results and their timestamps
interface CacheEntry {
  data: Bookmark[];
  totalCount: number;
  timestamp: number;
  isEmpty: boolean; // Track if this query returned 0 results
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
  
  // Add debouncing
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastQueryRef = useRef<string>('');
  const autoSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      queryCache.delete(queryKey);
    }
    return null;
  };

  // Store data in cache
  const setCachedData = (queryKey: string, data: Bookmark[], totalCount: number) => {
    queryCache.set(queryKey, {
      data,
      totalCount,
      timestamp: Date.now(),
      isEmpty: totalCount === 0
    });
  };

  const fetchBookmarks = async (offset = 0, append = false, force = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    const queryKey = createQueryKey();
    
    // Check cache first (only for initial queries, not pagination)
    if (offset === 0 && !force) {
      const cached = getCachedData(queryKey);
      if (cached) {
        console.log('Using cached data for query:', queryKey);
        setBookmarks(cached.data);
        setTotalCount(cached.totalCount);
        setHasMore(cached.data.length === limit && !cached.isEmpty);
        setCurrentOffset(cached.data.length);
        setLoading(false);
        lastQueryRef.current = queryKey;
        return;
      }
    }
    
    // Skip if same query and not forced (but not cached)
    if (!force && queryKey === lastQueryRef.current && offset === 0) {
      return;
    }

    try {
      setError(null);
      if (!append) {
        setLoading(true);
      }

      console.log('Making database query for:', queryKey);

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
        return;
      }

      // Treat empty data as valid result, not an error
      const bookmarkData = data || [];
      console.log(`Query returned ${bookmarkData.length} bookmarks (count: ${count || 0})`);

      const newBookmarks = bookmarkData.map((bookmark: any) => ({
        ...bookmark,
        savedAt: new Date(bookmark.created_at),
        sourceUrl: bookmark.url,
        starred: false, // Default value
        engagement: bookmark.metadata || {}, // Use metadata for engagement data
      }));
      
      if (append) {
        setBookmarks(prev => [...prev, ...newBookmarks]);
      } else {
        setBookmarks(newBookmarks);
        // Cache the initial query result - empty results are valid and cacheable
        if (offset === 0) {
          setCachedData(queryKey, newBookmarks, count || 0);
        }
      }

      setTotalCount(count || 0);
      setHasMore(newBookmarks.length === limit);
      setCurrentOffset(offset + newBookmarks.length);
      lastQueryRef.current = queryKey;

    } catch (err) {
      console.error('Exception fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function
  const debouncedFetch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const queryKey = createQueryKey();
    
    // If we have cached data that shows this query returns 0 results, show immediately
    // Empty results are valid and should be displayed, not treated as errors
    const cached = getCachedData(queryKey);
    if (cached && cached.isEmpty) {
      console.log('Query known to return empty results, showing cached empty result immediately');
      setBookmarks([]);
      setTotalCount(0);
      setHasMore(false);
      setCurrentOffset(0);
      setLoading(false);
      setError(null); // Clear any previous errors
      lastQueryRef.current = queryKey;
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentOffset(0);
      fetchBookmarks(0, false, true);
    }, DEBOUNCE_DELAY);
  }, [user, provider, sortBy, sortOrder, providers]);

  // Setup auto-sync every 15 minutes
  const setupAutoSync = useCallback(() => {
    if (autoSyncIntervalRef.current) {
      clearInterval(autoSyncIntervalRef.current);
    }

    autoSyncIntervalRef.current = setInterval(() => {
      console.log('Auto-sync: Refreshing bookmarks...');
      // Clear cache to force fresh data
      queryCache.clear();
      setCurrentOffset(0);
      fetchBookmarks(0, false, true);
    }, CACHE_DURATION);
  }, []);

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchBookmarks(currentOffset, true);
    }
  };

  const refresh = async () => {
    // Clear cache for this query to force fresh data
    const queryKey = createQueryKey();
    queryCache.delete(queryKey);
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
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
      setTotalCount(prev => Math.max(0, prev - 1));
      
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
    totalCount
  };
}

/**
 * Hook specifically for fetching bookmarks by provider for SkoopContent columns
 */
export function useProviderBookmarks(provider: Provider): UseBookmarksResult {
  return useBookmarks({ provider, limit: 5 });
} 