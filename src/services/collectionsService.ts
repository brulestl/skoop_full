import { supabase, getCurrentUser } from '@/lib/supabase';
import { 
  Collection, 
  CollectionWithCount, 
  CollectionItem,
  CreateCollectionInput, 
  UpdateCollectionInput,
  CollectionServiceResponse,
  CollectionListResponse,
  AddToCollectionInput,
  RemoveFromCollectionInput,
  SmartCollection,
  BookmarkForCollection
} from '@/types/collections';
import { Bookmark, Star, Tag, Clock, Heart } from 'lucide-react';

class CollectionsService {
  /**
   * Get all collections for the current user with item counts
   */
  async getUserCollections(): Promise<CollectionListResponse> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { collections: [], error: 'User not authenticated' };
      }

      // Get collections first
      const { data: collections, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching collections:', error);
        return { collections: [], error: error.message };
      }

      // Get counts for each collection
      const collectionsWithCount: CollectionWithCount[] = [];
      
      for (const collection of collections || []) {
        const { count } = await supabase
          .from('collection_items')
          .select('*', { count: 'exact', head: true })
          .eq('collection_id', collection.id);

        collectionsWithCount.push({
          id: collection.id,
          user_id: collection.user_id || '',
          name: collection.name,
          description: collection.description || undefined,
          type: (collection.type as 'manual' | 'ai') || 'manual',
          color: (collection.color as 'primary' | 'accent' | 'destructive' | 'secondary') || 'primary',
          pinned: collection.pinned || false,
          created_at: collection.created_at || new Date().toISOString(),
          updated_at: collection.updated_at || new Date().toISOString(),
          count: count || 0
        });
      }

      return { collections: collectionsWithCount, error: null };
    } catch (error) {
      console.error('Error in getUserCollections:', error);
      return { collections: [], error: 'Failed to fetch collections' };
    }
  }

  /**
   * Get a single collection with its bookmarks
   */
  async getCollection(collectionId: string): Promise<{ data: CollectionWithCount | null; error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data: collection, error } = await supabase
        .from('collections')
        .select('*')
        .eq('id', collectionId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching collection:', error);
        return { data: null, error: error.message };
      }

      // Get the count of items in this collection
      const { count } = await supabase
        .from('collection_items')
        .select('*', { count: 'exact', head: true })
        .eq('collection_id', collectionId);

      // Transform the data
      const collectionWithCount: CollectionWithCount = {
        id: collection.id,
        user_id: collection.user_id || '',
        name: collection.name,
        description: collection.description || undefined,
        type: (collection.type as 'manual' | 'ai') || 'manual',
        color: (collection.color as 'primary' | 'accent' | 'destructive' | 'secondary') || 'primary',
        pinned: collection.pinned || false,
        created_at: collection.created_at || new Date().toISOString(),
        updated_at: collection.updated_at || new Date().toISOString(),
        count: count || 0
      };

      return { data: collectionWithCount, error: null };
    } catch (error) {
      console.error('Error in getCollection:', error);
      return { data: null, error: 'Failed to fetch collection' };
    }
  }

  /**
   * Create a new collection
   */
  async createCollection(input: CreateCollectionInput): Promise<CollectionServiceResponse<Collection>> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('collections')
        .insert({
          user_id: user.id,
          name: input.name,
          description: input.description,
          type: input.type,
          color: input.color,
          pinned: input.pinned || false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating collection:', error);
        return { data: null, error: error.message };
      }

      // Transform the response to match our Collection type
      const collection: Collection = {
        id: data.id,
        user_id: data.user_id || '',
        name: data.name,
        description: data.description || undefined,
        type: (data.type as 'manual' | 'ai') || 'manual',
        color: (data.color as 'primary' | 'accent' | 'destructive' | 'secondary') || 'primary',
        pinned: data.pinned || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };

      return { data: collection, error: null };
    } catch (error) {
      console.error('Error in createCollection:', error);
      return { data: null, error: 'Failed to create collection' };
    }
  }

  /**
   * Update an existing collection
   */
  async updateCollection(collectionId: string, input: UpdateCollectionInput): Promise<CollectionServiceResponse<Collection>> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('collections')
        .update({
          name: input.name,
          description: input.description,
          color: input.color,
          pinned: input.pinned,
          updated_at: new Date().toISOString()
        })
        .eq('id', collectionId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating collection:', error);
        return { data: null, error: error.message };
      }

      // Transform the response to match our Collection type
      const collection: Collection = {
        id: data.id,
        user_id: data.user_id || '',
        name: data.name,
        description: data.description || undefined,
        type: (data.type as 'manual' | 'ai') || 'manual',
        color: (data.color as 'primary' | 'accent' | 'destructive' | 'secondary') || 'primary',
        pinned: data.pinned || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString()
      };

      return { data: collection, error: null };
    } catch (error) {
      console.error('Error in updateCollection:', error);
      return { data: null, error: 'Failed to update collection' };
    }
  }

  /**
   * Delete a collection
   */
  async deleteCollection(collectionId: string): Promise<{ error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { error: 'User not authenticated' };
      }

      // First delete all collection items
      const { error: itemsError } = await supabase
        .from('collection_items')
        .delete()
        .eq('collection_id', collectionId);

      if (itemsError) {
        console.error('Error deleting collection items:', itemsError);
        return { error: itemsError.message };
      }

      // Then delete the collection
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting collection:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Error in deleteCollection:', error);
      return { error: 'Failed to delete collection' };
    }
  }

  /**
   * Add bookmarks to a collection
   */
  async addToCollection(input: AddToCollectionInput): Promise<{ error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { error: 'User not authenticated' };
      }

      // Verify the collection belongs to the user
      const { data: collection, error: collectionError } = await supabase
        .from('collections')
        .select('id')
        .eq('id', input.collectionId)
        .eq('user_id', user.id)
        .single();

      if (collectionError || !collection) {
        return { error: 'Collection not found or access denied' };
      }

      // Verify all bookmarks belong to the user
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('id')
        .in('id', input.bookmarkIds)
        .eq('user_id', user.id);

      if (bookmarksError) {
        return { error: 'Error verifying bookmarks' };
      }

      const validBookmarkIds = bookmarks?.map((b: any) => b.id) || [];
      if (validBookmarkIds.length !== input.bookmarkIds.length) {
        return { error: 'Some bookmarks not found or access denied' };
      }

      // Insert collection items (use upsert to handle duplicates)
      const collectionItems = validBookmarkIds.map((bookmarkId: string) => ({
        collection_id: input.collectionId,
        bookmark_id: bookmarkId
      }));

      const { error: insertError } = await supabase
        .from('collection_items')
        .upsert(collectionItems, { 
          onConflict: 'collection_id,bookmark_id',
          ignoreDuplicates: true 
        });

      if (insertError) {
        console.error('Error adding to collection:', insertError);
        return { error: insertError.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Error in addToCollection:', error);
      return { error: 'Failed to add bookmarks to collection' };
    }
  }

  /**
   * Remove bookmarks from a collection
   */
  async removeFromCollection(input: RemoveFromCollectionInput): Promise<{ error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { error: 'User not authenticated' };
      }

      // Verify the collection belongs to the user
      const { data: collection, error: collectionError } = await supabase
        .from('collections')
        .select('id')
        .eq('id', input.collectionId)
        .eq('user_id', user.id)
        .single();

      if (collectionError || !collection) {
        return { error: 'Collection not found or access denied' };
      }

      // Remove collection items
      const { error } = await supabase
        .from('collection_items')
        .delete()
        .eq('collection_id', input.collectionId)
        .in('bookmark_id', input.bookmarkIds);

      if (error) {
        console.error('Error removing from collection:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Error in removeFromCollection:', error);
      return { error: 'Failed to remove bookmarks from collection' };
    }
  }

  /**
   * Get bookmarks in a collection
   */
  async getCollectionBookmarks(collectionId: string): Promise<CollectionServiceResponse<BookmarkForCollection[]>> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      const { data: bookmarks, error } = await supabase
        .from('collection_items')
        .select(`
          bookmark_id,
          bookmarks!inner(
            id,
            title,
            url,
            description
          )
        `)
        .eq('collection_id', collectionId)
        .eq('bookmarks.user_id', user.id);

      if (error) {
        console.error('Error fetching collection bookmarks:', error);
        return { data: null, error: error.message };
      }

      const bookmarkList: BookmarkForCollection[] = bookmarks?.map((item: any) => ({
        id: item.bookmarks.id,
        title: item.bookmarks.title || '',
        url: item.bookmarks.url,
        description: item.bookmarks.description || undefined
      })) || [];

      return { data: bookmarkList, error: null };
    } catch (error) {
      console.error('Error in getCollectionBookmarks:', error);
      return { data: null, error: 'Failed to fetch collection bookmarks' };
    }
  }

  /**
   * Get smart collections (auto-generated collections)
   */
  async getSmartCollections(): Promise<{ data: SmartCollection[] | null; error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      // Define smart collections
      const smartCollections: SmartCollection[] = [
        {
          id: 'recently-added',
          name: 'Recently Added',
          description: 'Bookmarks saved in the last 7 days',
          count: 0,
          icon: Clock,
          query: (userId: string) => supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at', { ascending: false })
        },
        {
          id: 'starred-items',
          name: 'Starred Items',
          description: 'All your starred bookmarks',
          count: 0,
          icon: Star,
          query: (userId: string) => supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', userId)
            .contains('tags', ['starred'])
            .order('created_at', { ascending: false })
        },
        {
          id: 'github-repos',
          name: 'GitHub Repositories',
          description: 'GitHub repositories and code resources',
          count: 0,
          icon: Tag,
          query: (userId: string) => supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', userId)
            .ilike('url', '%github.com%')
            .order('created_at', { ascending: false })
        }
      ];

      // Get counts for each smart collection
      for (const collection of smartCollections) {
        try {
          const { count } = await supabase
            .from('bookmarks')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('created_at', 
              collection.id === 'recently-added' 
                ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                : '1970-01-01'
            );
          
          collection.count = count || 0;
        } catch (error) {
          console.error(`Error getting count for ${collection.id}:`, error);
          collection.count = 0;
        }
      }

      return { data: smartCollections, error: null };
    } catch (error) {
      console.error('Error in getSmartCollections:', error);
      return { data: null, error: 'Failed to fetch smart collections' };
    }
  }

  /**
   * Get bookmarks filtered by smart collection
   */
  async getSmartCollectionBookmarks(smartCollectionId: string): Promise<{ data: BookmarkForCollection[] | null; error: string | null }> {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return { data: null, error: 'User not authenticated' };
      }

      let query;
      
      switch (smartCollectionId) {
        case 'recently-added':
          query = supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at', { ascending: false });
          break;
          
        case 'starred-items':
          query = supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .contains('tags', ['starred'])
            .order('created_at', { ascending: false });
          break;
          
        case 'github-repos':
          query = supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', user.id)
            .ilike('url', '%github.com%')
            .order('created_at', { ascending: false });
          break;
          
        default:
          return { data: null, error: 'Unknown smart collection' };
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching smart collection bookmarks:', error);
        return { data: null, error: error.message };
      }

      // Transform the data to match BookmarkForCollection type
      const bookmarks: BookmarkForCollection[] = (data || []).map(bookmark => ({
        id: bookmark.id,
        url: bookmark.url,
        title: bookmark.title || '',
        description: bookmark.description || undefined,
        summary: bookmark.summary || undefined,
        tags: bookmark.tags || [],
        created_at: bookmark.created_at || new Date().toISOString(),
        updated_at: bookmark.updated_at || new Date().toISOString()
      }));

      return { data: bookmarks, error: null };
    } catch (error) {
      console.error('Error in getSmartCollectionBookmarks:', error);
      return { data: null, error: 'Failed to fetch smart collection bookmarks' };
    }
  }
}

// Export singleton instance
export const collectionsService = new CollectionsService();
export default collectionsService; 