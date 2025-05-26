import { useState, useEffect } from 'react';
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

const PAGE_SIZE = 10;

export function useBookmarks(options: UseBookmarksOptions = {}): UseBookmarksResult {
  const { user } = useAuth();
  const { provider, limit = PAGE_SIZE } = options;
  
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  const fetchBookmarks = async (offset = 0, append = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      if (!append) {
        setLoading(true);
      }

      // Build the query using any type to avoid TypeScript issues temporarily
      let query = (supabase as any)
        .from('bookmarks')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // Filter by provider if specified and source column exists
      if (provider) {
        query = query.eq('source', provider);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching bookmarks:', error);
        setError(error.message);
        return;
      }

      const newBookmarks = (data || []).map((bookmark: any) => ({
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
      }

      setTotalCount(count || 0);
      setHasMore(newBookmarks.length === limit);
      setCurrentOffset(offset + newBookmarks.length);

    } catch (err) {
      console.error('Exception fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchBookmarks(currentOffset, true);
    }
  };

  const refresh = async () => {
    setCurrentOffset(0);
    await fetchBookmarks(0, false);
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

  useEffect(() => {
    fetchBookmarks();
  }, [user, provider, limit]);

  // Listen for bookmark updates from sync operations
  useEffect(() => {
    const handleBookmarksUpdated = () => {
      console.log('Bookmarks updated event received, refreshing...');
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