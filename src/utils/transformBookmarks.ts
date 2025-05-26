import { Bookmark } from '@/hooks/useBookmarks';
import { Provider } from '@/hooks/useConnectedAccounts';

export interface UIBookmark {
  id: string | number;
  title: string;
  description: string;
  content: string;
  source: string;
  sourceUrl: string;
  savedAt: Date;
  tags: string[];
  starred: boolean;
  engagement: {
    stars?: number;
    forks?: number;
    saves?: number;
    likes?: number;
    retweets?: number;
    replies?: number;
    votes?: number;
    answers?: number;
    views?: number;
    upvotes?: number;
    comments?: number;
    awards?: number;
    watches?: number;
  };
  image?: string | null;
}

/**
 * Transform database bookmark to UI format
 */
export function transformBookmarkForUI(bookmark: Bookmark): UIBookmark {
  // Extract engagement metrics from metadata if available
  const metadata = (bookmark as any).metadata || {};
  let engagement: UIBookmark['engagement'] = { saves: 1 };

  // Debug logging to see what data we're getting
  if (bookmark.source === 'github') {
    console.log('GitHub bookmark:', bookmark.title, 'Metadata:', metadata);
  }

  if (bookmark.source === 'github') {
    engagement = {
      stars: metadata.stars || 0,
      forks: metadata.forks || 0,
      saves: 1
    };
  } else if (bookmark.source === 'twitter') {
    engagement = {
      likes: metadata.likes || 0,
      retweets: metadata.retweets || 0,
      replies: metadata.replies || 0,
      saves: 1
    };
  } else if (bookmark.source === 'stack') {
    engagement = {
      votes: metadata.votes || 0,
      answers: metadata.answers || 0,
      views: metadata.views || 0,
      saves: 1
    };
  } else if (bookmark.source === 'reddit') {
    engagement = {
      upvotes: metadata.upvotes || 0,
      comments: metadata.comments || 0,
      awards: metadata.awards || 0,
      saves: 1
    };
  }

  return {
    id: bookmark.id,
    title: bookmark.title || 'Untitled',
    description: bookmark.description || '',
    content: bookmark.summary || bookmark.description || '',
    source: bookmark.source || 'web',
    sourceUrl: bookmark.url,
    savedAt: new Date(bookmark.created_at),
    tags: bookmark.tags || [],
    starred: false, // Can be enhanced later with user preferences
    engagement,
    image: null // Can be enhanced later with metadata extraction
  };
}

/**
 * Transform multiple bookmarks for UI
 */
export function transformBookmarksForUI(bookmarks: Bookmark[]): UIBookmark[] {
  return bookmarks.map(transformBookmarkForUI);
}

/**
 * Create mock data with the correct structure for new users
 */
export function createMockBookmarkData(): UIBookmark[] {
  return [
    {
      id: 'mock-1',
      title: "Advanced TypeScript Patterns for Building Robust Applications",
      description: "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
      content: "TypeScript offers powerful type system features that can help you build more robust applications. This guide explores advanced patterns like discriminated unions, which allow you to create type-safe state machines; branded types, which prevent type confusion between semantically different values; conditional types, which enable complex type transformations; and mapped types, which provide ways to transform existing types into new ones.",
      source: "github",
      sourceUrl: "https://github.com/microsoft/TypeScript",
      savedAt: new Date(2024, 11, 18),
      tags: ["typescript", "programming", "web-development"],
      starred: true,
      engagement: {
        stars: 4256,
        forks: 782,
        saves: 980
      },
      image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 'mock-2',
      title: "Thread: 10 tips for better React performance in 2023",
      description: "Must-read performance tips for React in 2023, focusing on useMemo, useCallback and React 18's new concurrent features.",
      content: "1. Use React.memo() sparingly and only for components that render often with the same props. 2. Properly implement useCallback() for functions passed to child components. 3. Apply useMemo() for expensive calculations. 4. Use the new React 18 concurrent features like useTransition and useDeferredValue for smoother UIs.",
      source: "twitter",
      sourceUrl: "https://twitter.com/dan_abramov/status/1234567890",
      savedAt: new Date(2024, 11, 16),
      tags: ["react", "javascript", "performance"],
      starred: false,
      engagement: {
        likes: 3821,
        retweets: 1432,
        replies: 341,
        saves: 6754
      },
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 'mock-3',
      title: "How to optimize PostgreSQL queries for large datasets",
      description: "Comprehensive guide to optimizing PostgreSQL queries for large datasets, covering indexes, query planning, and configuration tweaks.",
      content: "When working with large datasets in PostgreSQL, performance optimization becomes critical. This guide covers essential techniques: 1) Proper indexing strategies using B-tree, GIN, and specialized indexes 2) Query optimization with EXPLAIN ANALYZE to identify bottlenecks 3) Partitioning tables for better query performance.",
      source: "stackoverflow",
      sourceUrl: "https://stackoverflow.com/questions/12345678",
      savedAt: new Date(2024, 11, 15),
      tags: ["postgresql", "database", "performance"],
      starred: true,
      engagement: {
        votes: 758,
        answers: 24,
        views: 45692,
        saves: 2341
      },
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=500&auto=format&fit=crop"
    }
  ];
} 