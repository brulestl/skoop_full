// Collection types based on database schema and UI requirements

export type CollectionType = 'manual' | 'ai';
export type CollectionColor = 'primary' | 'accent' | 'destructive' | 'secondary';

// Database collection record
export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  type: CollectionType;
  color: CollectionColor;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

// Collection with item count for UI display
export interface CollectionWithCount extends Collection {
  count: number;
}

// Collection item record
export interface CollectionItem {
  collection_id: string;
  bookmark_id: string;
  created_at: string;
}

// Input types for creating/updating collections
export interface CreateCollectionInput {
  name: string;
  description?: string;
  type?: CollectionType;
  color?: CollectionColor;
  pinned?: boolean;
}

export interface UpdateCollectionInput {
  name?: string;
  description?: string;
  color?: CollectionColor;
  pinned?: boolean;
}

// Smart collection definition (for auto-generated collections)
export interface SmartCollection {
  id: string;
  name: string;
  description: string;
  count: number;
  icon: any; // Lucide icon component
  query: (userId: string) => any; // Supabase query function
}

// Collection service response types
export interface CollectionServiceResponse<T> {
  data: T | null;
  error: string | null;
}

export interface CollectionListResponse {
  collections: CollectionWithCount[];
  error: string | null;
}

// Bookmark type for collection operations
export interface BookmarkForCollection {
  id: string;
  title: string;
  url: string;
  description?: string;
}

// Add to collection input
export interface AddToCollectionInput {
  collectionId: string;
  bookmarkIds: string[];
}

// Remove from collection input
export interface RemoveFromCollectionInput {
  collectionId: string;
  bookmarkIds: string[];
} 