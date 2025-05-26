import { useState, useEffect, useCallback } from 'react';
import { collectionsService } from '@/services/collectionsService';
import {
  CollectionWithCount,
  SmartCollection,
  CreateCollectionInput,
  UpdateCollectionInput,
  AddToCollectionInput,
  RemoveFromCollectionInput,
  BookmarkForCollection
} from '@/types/collections';

// Hook for managing collections list
export function useCollections() {
  const [collections, setCollections] = useState<CollectionWithCount[]>([]);
  const [smartCollections, setSmartCollections] = useState<SmartCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both regular and smart collections in parallel
      const [collectionsResult, smartCollectionsResult] = await Promise.all([
        collectionsService.getUserCollections(),
        collectionsService.getSmartCollections()
      ]);

      if (collectionsResult.error) {
        setError(collectionsResult.error);
      } else {
        setCollections(collectionsResult.collections);
      }

      if (smartCollectionsResult.error) {
        console.error('Error fetching smart collections:', smartCollectionsResult.error);
      } else if (smartCollectionsResult.data) {
        setSmartCollections(smartCollectionsResult.data);
      }
    } catch (err) {
      setError('Failed to fetch collections');
      console.error('Error in fetchCollections:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCollection = useCallback(async (input: CreateCollectionInput) => {
    const result = await collectionsService.createCollection(input);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    // Refresh collections after creation
    await fetchCollections();
    return { success: true, data: result.data };
  }, [fetchCollections]);

  const updateCollection = useCallback(async (collectionId: string, input: UpdateCollectionInput) => {
    const result = await collectionsService.updateCollection(collectionId, input);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    // Refresh collections after update
    await fetchCollections();
    return { success: true, data: result.data };
  }, [fetchCollections]);

  const deleteCollection = useCallback(async (collectionId: string) => {
    const result = await collectionsService.deleteCollection(collectionId);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    // Refresh collections after deletion
    await fetchCollections();
    return { success: true };
  }, [fetchCollections]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    smartCollections,
    loading,
    error,
    refetch: fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection
  };
}

// Hook for managing a single collection
export function useCollection(collectionId: string | null) {
  const [collection, setCollection] = useState<CollectionWithCount | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkForCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async () => {
    if (!collectionId) return;

    setLoading(true);
    setError(null);

    try {
      const [collectionResult, bookmarksResult] = await Promise.all([
        collectionsService.getCollection(collectionId),
        collectionsService.getCollectionBookmarks(collectionId)
      ]);

      if (collectionResult.error) {
        setError(collectionResult.error);
      } else {
        setCollection(collectionResult.data);
      }

      if (bookmarksResult.error) {
        setError(bookmarksResult.error);
      } else if (bookmarksResult.data) {
        setBookmarks(bookmarksResult.data);
      }
    } catch (err) {
      setError('Failed to fetch collection');
      console.error('Error in fetchCollection:', err);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  const addToCollection = useCallback(async (input: AddToCollectionInput) => {
    const result = await collectionsService.addToCollection(input);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    // Refresh collection data after adding items
    await fetchCollection();
    return { success: true };
  }, [fetchCollection]);

  const removeFromCollection = useCallback(async (input: RemoveFromCollectionInput) => {
    const result = await collectionsService.removeFromCollection(input);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    // Refresh collection data after removing items
    await fetchCollection();
    return { success: true };
  }, [fetchCollection]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return {
    collection,
    bookmarks,
    loading,
    error,
    refetch: fetchCollection,
    addToCollection,
    removeFromCollection
  };
}

// Hook for smart collections
export function useSmartCollection(smartCollectionId: string | null) {
  const [bookmarks, setBookmarks] = useState<BookmarkForCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!smartCollectionId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await collectionsService.getSmartCollectionBookmarks(smartCollectionId);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setBookmarks(result.data);
      }
    } catch (err) {
      setError('Failed to fetch smart collection bookmarks');
      console.error('Error in fetchBookmarks:', err);
    } finally {
      setLoading(false);
    }
  }, [smartCollectionId]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    refetch: fetchBookmarks
  };
}

// Hook for collection operations (add/remove bookmarks)
export function useCollectionOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCollection = useCallback(async (input: AddToCollectionInput) => {
    setLoading(true);
    setError(null);

    try {
      const result = await collectionsService.addToCollection(input);
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to add to collection';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCollection = useCallback(async (input: RemoveFromCollectionInput) => {
    setLoading(true);
    setError(null);

    try {
      const result = await collectionsService.removeFromCollection(input);
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to remove from collection';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    addToCollection,
    removeFromCollection,
    clearError: () => setError(null)
  };
} 