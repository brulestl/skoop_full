import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { Provider } from './useConnectedAccounts';
import { comprehensiveSyncService } from '@/services/comprehensiveSyncService';

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
  forceRefresh: () => Promise<void>;
  deleteBookmark: (bookmarkId: string) => Promise<boolean>;
  totalCount: number;
  isEmpty: boolean; // Flag to indicate if the current filter combination has no results
}

const PAGE_SIZE = 20;
const DEBOUNCE_DELAY = 300; // 300ms debounce
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const AUTO_SYNC_INTERVAL = 30 * 60 * 1000; // 30 minutes for auto-sync (increased from 15 to reduce spam)

// TASK UI-FILTER: Enhanced cache management to stop endless polling
// Cache for storing query results and their timestamps with improved empty result handling
interface CacheEntry {
  data: Bookmark[];
  totalCount: number;
  timestamp: number;
  isEmpty: boolean; // Track if this query returned 0 results
  queryKey: string; // Store the query key for debugging
  lastFetchKey: string; // Track the exact parameters that produced this result
}

const queryCache = new Map<string, CacheEntry>();

// Track last fetch to prevent endless re-querying with same parameters
const lastFetchCache = new Map<string, { count: number; timestamp: number }>();

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
  const [initialSyncPerformed, setInitialSyncPerformed] = useState(false);
  
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
  
  // TASK UI-FILTER: Create sources key for tracking filter combinations
  const createSourcesKey = useCallback(() => {
    return JSON.stringify({
      pageSize: limit,
      providers: providers?.sort()
    });
  }, [limit, providers]);

  // Check if cache entry is still valid
  const isCacheValid = (entry: CacheEntry): boolean => {
    return Date.now() - entry.timestamp < CACHE_DURATION;
  };

  // TASK UI-FILTER: Enhanced cache checking with last fetch tracking
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

  // TASK UI-FILTER: Check if we should skip re-query based on last fetch
  const shouldSkipRequery = (sourcesKey: string): boolean => {
    const lastFetch = lastFetchCache.get(sourcesKey);
    if (!lastFetch) return false;
    
    const timeSinceLastFetch = Date.now() - lastFetch.timestamp;
    const isRecentFetch = timeSinceLastFetch < CACHE_DURATION;
    
    // If we recently fetched this exact filter combination and got 0 results, skip
    if (isRecentFetch && lastFetch.count === 0) {
      console.log(`TASK UI-FILTER: Skipping re-query for empty result. Last fetch: ${timeSinceLastFetch}ms ago, got ${lastFetch.count} results`);
      return true;
    }
    
    return false;
  };

  // Store data in cache with enhanced tracking
  const setCachedData = (queryKey: string, data: Bookmark[], totalCount: number) => {
    const sourcesKey = createSourcesKey();
    
    const cacheEntry: CacheEntry = {
      data,
      totalCount,
      timestamp: Date.now(),
      isEmpty: totalCount === 0,
      queryKey,
      lastFetchKey: sourcesKey
    };
    
    queryCache.set(queryKey, cacheEntry);
    
    // TASK UI-FILTER: Track last fetch result for this filter combination
    lastFetchCache.set(sourcesKey, {
      count: totalCount,
      timestamp: Date.now()
    });
    
    console.log(`Cached data for query: ${queryKey} (${totalCount} items, isEmpty: ${cacheEntry.isEmpty}, sourcesKey: ${sourcesKey})`);
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

  // Check if initial sync is needed and perform it
  const checkAndPerformInitialSync = useCallback(async () => {
    if (!user || initialSyncPerformed) return false;

    try {
      console.log('Checking if initial sync is needed...');
      
      // Check if this is the user's first time (no bookmarks exist)
      const shouldSync = await comprehensiveSyncService.shouldPerformInitialSync();
      
      if (shouldSync) {
        console.log('Performing initial comprehensive sync...');
        setLoading(true);
        setError(null);
        
        // Initialize sync service for this user
        await comprehensiveSyncService.initialize(user.id, 'manual');
        
        // Perform initial sync
        const result = await comprehensiveSyncService.syncAllBookmarks('initial');
        
        if (result.success && result.totalSynced > 0) {
          console.log(`Initial sync completed successfully: ${result.totalSynced} bookmarks synced`);
          
          // Clear any cached data to ensure we fetch fresh data
          queryCache.clear();
          
          // Mark initial sync as performed
          setInitialSyncPerformed(true);
          
          return true; // Indicates that initial sync was performed
        } else if (result.errors.length > 0) {
          console.log('Initial sync completed with errors:', result.errors);
          setError(`Initial sync completed with some errors. ${result.errors[0]}`);
        } else {
          console.log('Initial sync completed but no bookmarks were found');
        }
      }
      
      setInitialSyncPerformed(true);
      return false;
    } catch (error) {
      console.error('Error during initial sync check:', error);
      setError(error instanceof Error ? error.message : 'Failed to perform initial sync');
      setInitialSyncPerformed(true);
      return false;
    }
  }, [user, initialSyncPerformed]);

  const fetchBookmarks = async (offset = 0, append = false, force = false) => {
    if (!user) {
      setLoading(false);
      setIsEmpty(false);
      return;
    }

    // Check for initial sync first (only on very first load)
    if (offset === 0 && !append && !force && !initialSyncPerformed && lastQueryRef.current === '') {
      const syncPerformed = await checkAndPerformInitialSync();
      if (syncPerformed) {
        // If initial sync was performed, we'll fetch fresh data after it completes
        // The comprehensive sync service will dispatch an event when done
        return;
      }
    }

    const queryKey = createQueryKey();
    const sourcesKey = createSourcesKey();
    
    // TASK UI-FILTER: Check if we should skip this query based on recent empty results
    if (offset === 0 && !force && shouldSkipRequery(sourcesKey)) {
      // Return cached empty state to show "No bookmarks for Telegram yet" message
      const lastFetch = lastFetchCache.get(sourcesKey);
      if (lastFetch && lastFetch.count === 0) {
        console.log('TASK UI-FILTER: Returning cached empty state to prevent re-query');
        setBookmarks([]);
        setTotalCount(0);
        setHasMore(false);
        setCurrentOffset(0);
        setLoading(false);
        setError(null);
        setIsEmpty(true);
        lastQueryRef.current = queryKey;
        return;
      }
    }
    
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
        console.log('Applying single provider filter:', provider);
        query = query.eq('source', provider);
      }

      // Filter by multiple providers if specified - HARDENED LOGIC
      // Skip .in() filter in these cases:
      // 1. providers is empty array (would cause Supabase 400 error) 
      // 2. providers is undefined/null
      // 3. Only apply .in() filter when providers has valid entries
      if (providers && Array.isArray(providers) && providers.length > 0) {
        // Additional safety: only apply if providers contains valid strings
        const validProviders = providers.filter(p => p && typeof p === 'string' && p.trim().length > 0);
        if (validProviders.length > 0) {
          console.log('Applying provider filter:', validProviders);
          query = query.in('source', validProviders);
        } else {
          console.log('Skipping provider filter - no valid providers found');
        }
      } else {
        console.log('No provider filter applied - providers:', providers);
      }

      console.log('Final query parameters:', {
        user_id: user.id,
        sortBy,
        sortOrder,
        offset,
        limit,
        provider,
        providers,
        range: `${offset}-${offset + limit - 1}`
      });

      const { data, count, error } = await query;

      if (error) {
        console.error('Database query error:', error);
        setError(`Failed to fetch bookmarks: ${error.message}`);
        setIsEmpty(false);
        return;
      }

      const fetchedBookmarks = data || [];
      const fetchedCount = count || 0;

      console.log(`Query result: ${fetchedBookmarks.length} items, total count: ${fetchedCount}, isEmpty: ${fetchedCount === 0}`);

      if (append) {
        setBookmarks(prev => [...prev, ...fetchedBookmarks]);
        setCurrentOffset(offset + fetchedBookmarks.length);
      } else {
        setBookmarks(fetchedBookmarks);
        setCurrentOffset(fetchedBookmarks.length);
        
        // Cache the query result for future use (only for non-append queries)
        setCachedData(queryKey, fetchedBookmarks, fetchedCount);
      }

      setTotalCount(fetchedCount);
      setHasMore(fetchedBookmarks.length === limit && fetchedCount > currentOffset + fetchedBookmarks.length);
      setIsEmpty(fetchedCount === 0);
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

  const forceRefresh = async () => {
    // Clear ALL cache and force complete refresh
    console.log('Force refresh - clearing ALL cache and resetting state');
    queryCache.clear();
    lastFetchCache.clear();
    setCurrentOffset(0);
    setBookmarks([]);
    setTotalCount(0);
    setHasMore(true);
    setIsEmpty(false);
    setError(null);
    lastQueryRef.current = '';
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

  // Listen for comprehensive sync completion events
  useEffect(() => {
    const handleComprehensiveSyncComplete = (event: CustomEvent) => {
      const { results, totalSynced, syncType } = event.detail;
      
      if (syncType === 'initial' && totalSynced > 0) {
        console.log('Initial comprehensive sync completed, refreshing bookmarks...');
        // Clear cache and refresh data
        queryCache.clear();
        setCurrentOffset(0);
        fetchBookmarks(0, false, true);
      } else if (syncType !== 'initial') {
        // For manual or automatic syncs, also refresh
        console.log('Comprehensive sync completed, refreshing bookmarks...');
        queryCache.clear();
        lastAutoSyncRef.current = Date.now();
        setCurrentOffset(0);
        fetchBookmarks(0, false, true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('comprehensive-sync-completed', handleComprehensiveSyncComplete as EventListener);
      
      return () => {
        window.removeEventListener('comprehensive-sync-completed', handleComprehensiveSyncComplete as EventListener);
      };
    }
  }, []);

  return {
    bookmarks,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    forceRefresh,
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