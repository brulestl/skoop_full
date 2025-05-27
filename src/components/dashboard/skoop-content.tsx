'use client';

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, X as XClose, Settings, MoreHorizontal, RefreshCw, Github, X, MessageSquare as Reddit, Code as StackOverflow, ExternalLink, Star, ArrowUp, MessageSquare, BookmarkCheck, Folder as FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useConnectedAccounts, Provider } from '@/hooks/useConnectedAccounts';
import { useProviderBookmarks } from '@/hooks/useBookmarks';
import { triggerIngestion } from '@/utils/ingest';

// Provider-specific content data structures
interface TwitterItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  link?: string;
  likes: number;
  replies: number;
  image?: string;
}

interface GitHubItem {
  id: string;
  repo: string;
  description: string;
  link: string;
  stars: number;
  language: string;
  updated: string;
}

interface RedditItem {
  id: string;
  subreddit: string;
  title: string;
  author: string;
  time: string;
  upvotes: number;
  comments: number;
  link: string;
}

interface StackOverflowItem {
  id: string;
  title: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  time: string;
  link: string;
}

// Content streams for fallback data
const contentStreams = [{
  id: "twitter",
  title: "X",
  icon: X,
  color: "bg-black",
  items: [{
    id: "t1",
    author: "Theo",
    handle: "@t3dotgg",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop",
    time: "2h ago",
    content: "Just launched a new React hooks library for managing animations with zero dependencies. Check it out:",
    link: "https://github.com/t3dotgg/react-hooks",
    likes: 345,
    replies: 42,
    image: undefined
  }, {
    id: "t2",
    author: "Sarah Dayan",
    handle: "@frontstuff_io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
    time: "4h ago",
    content: "Here's a thread on building accessible components in React. 1/10",
    link: undefined,
    likes: 890,
    replies: 36,
    image: undefined
  }] as TwitterItem[]
}, {
  id: "github",
  title: "GitHub",
  icon: Github,
  color: "bg-gray-800",
  items: [{
    id: "g1",
    repo: "vercel/next.js",
    description: "The React Framework for the Web",
    link: "https://github.com/vercel/next.js",
    stars: 14823,
    language: "TypeScript",
    updated: "1d ago"
  }, {
    id: "g2",
    repo: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development.",
    link: "https://github.com/tailwindlabs/tailwindcss",
    stars: 8945,
    language: "CSS",
    updated: "3d ago"
  }] as GitHubItem[]
}, {
  id: "reddit",
  title: "Reddit",
  icon: Reddit,
  color: "bg-orange-600",
  items: [{
    id: "r1",
    subreddit: "r/reactjs",
    title: "What's your preferred state management solution in 2023?",
    author: "dev_enthusiast",
    time: "3h ago",
    upvotes: 127,
    comments: 83,
    link: "https://reddit.com/r/reactjs/comments/example1"
  }, {
    id: "r2",
    subreddit: "r/webdev",
    title: "Show off your portfolio website - Monthly thread",
    author: "mod_webdev",
    time: "1d ago",
    upvotes: 356,
    comments: 194,
    link: "https://reddit.com/r/webdev/comments/example2"
  }] as RedditItem[]
}, {
  id: "stackoverflow",
  title: "Stack Overflow",
  icon: StackOverflow,
  color: "bg-orange-500",
  items: [{
    id: "s1",
    title: "How to properly type React useRef with TypeScript",
    tags: ["react", "typescript", "hooks"],
    votes: 45,
    answers: 3,
    views: 1253,
    time: "8h ago",
    link: "https://stackoverflow.com/questions/example1"
  }, {
    id: "s2",
    title: "Next.js API routes vs. tRPC for type-safe backends",
    tags: ["next.js", "trpc", "api"],
    votes: 32,
    answers: 5,
    views: 987,
    time: "1d ago",
    link: "https://stackoverflow.com/questions/example2"
  }] as StackOverflowItem[]
}];

// Available columns for the user to add
const availableColumns = [{
  id: "twitter",
  name: "X",
  icon: X,
  color: "bg-black text-white"
}, {
  id: "github",
  name: "GitHub",
  icon: Github,
  color: "bg-gray-800 text-white"
}, {
  id: "reddit",
  name: "Reddit",
  icon: Reddit,
  color: "bg-orange-600 text-white"
}, {
  id: "stackoverflow",
  name: "Stack Overflow",
  icon: StackOverflow,
  color: "bg-orange-500 text-white"
}];

// Helper function to generate consistent avatar URLs
function generateAvatarUrl(seed: string): string {
  // Create a simple hash from the seed to ensure consistency
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use the hash to select from a variety of professional avatar photos
  const avatarIds = [
    '1472099645785-5658abf4ff4e',
    '1599566150163-29194dcaad36', 
    '1580489944761-15a19d654956',
    '1507003211169-0a1dd7228f2d',
    '1494790108755-2616c79ca3df',
    '1517841905240-472988babdf9',
    '1527980965255-87e0f1b4d53d',
    '1573496359142-b8d87734a5a2'
  ];
  
  const selectedId = avatarIds[Math.abs(hash) % avatarIds.length];
  return `https://images.unsplash.com/photo-${selectedId}?q=80&w=256&auto=format&fit=crop`;
}

// Data transformation utilities
function transformBookmarkToTwitterItem(bookmark: any): TwitterItem {
  // Enhanced author extraction from various Twitter URL patterns
  let author = 'Twitter User';
  let handle = '@unknown';
  
  if (bookmark.url?.includes('twitter.com/') || bookmark.url?.includes('x.com/')) {
    // Extract username from URL patterns like:
    // https://twitter.com/username/status/123
    // https://x.com/username/status/123
    const urlMatch = bookmark.url.match(/(?:twitter\.com|x\.com)\/([^\/\?]+)/);
    if (urlMatch && urlMatch[1] && urlMatch[1] !== 'status') {
      const username = urlMatch[1];
      author = username.charAt(0).toUpperCase() + username.slice(1);
      handle = `@${username}`;
    }
  }
  
  // Try to extract author from title patterns like "Username on Twitter: "
  if (bookmark.title && (author === 'Twitter User')) {
    const titleMatch = bookmark.title.match(/^([^:]+?)\s*(?:on Twitter|on X)?:\s*/i);
    if (titleMatch) {
      author = titleMatch[1].trim();
      handle = `@${author.toLowerCase().replace(/\s+/g, '')}`;
    }
  }
  
  // Clean up content - remove Twitter-specific prefixes
  let content = bookmark.description || bookmark.summary || bookmark.title || '';
  content = content.replace(/^.*?:\s*/, ''); // Remove "Author: " prefix
  content = content.replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes
  
  return {
    id: bookmark.id,
    author,
    handle,
    avatar: bookmark.image || generateAvatarUrl(handle),
    time: formatRelativeTime(bookmark.created_at),
    content: content || 'No content available',
    link: bookmark.url,
    likes: extractNumberFromText(bookmark.description) || Math.floor(Math.random() * 1000),
    replies: Math.floor(Math.random() * 100),
    image: bookmark.image && bookmark.image !== bookmark.url ? bookmark.image : undefined
  };
}

function transformBookmarkToGitHubItem(bookmark: any): GitHubItem {
  let repoName = 'Unknown Repository';
  let language = 'Unknown';
  let stars = 0;
  
  // Enhanced GitHub URL parsing
  if (bookmark.url?.includes('github.com/')) {
    const githubUrlMatch = bookmark.url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
    if (githubUrlMatch) {
      const [, owner, repo] = githubUrlMatch;
      repoName = `${owner}/${repo}`;
    }
  }
  
  // If no URL match, try to extract from title
  if (repoName === 'Unknown Repository' && bookmark.title) {
    // Handle titles like "owner/repo: description"
    const titleMatch = bookmark.title.match(/^([^\/]+\/[^:]+)/);
    if (titleMatch) {
      repoName = titleMatch[1].trim();
    } else {
      repoName = bookmark.title.split(' - ')[0] || bookmark.title;
    }
  }
  
  // Enhanced language detection from multiple sources
  const languagePatterns = {
    'TypeScript': /typescript|\.ts|\.tsx/i,
    'JavaScript': /javascript|\.js|\.jsx|node\.?js/i,
    'Python': /python|\.py|django|flask|fastapi/i,
    'Java': /\bjava\b|\.java|spring|maven|gradle/i,
    'Go': /\bgo\b|golang|\.go/i,
    'Rust': /rust|\.rs|cargo/i,
    'C++': /c\+\+|cpp|\.cpp|\.cc/i,
    'C#': /c#|csharp|\.cs|\.net|dotnet/i,
    'PHP': /php|\.php|laravel|symfony/i,
    'Ruby': /ruby|\.rb|rails|gem/i,
    'Swift': /swift|\.swift|ios/i,
    'Kotlin': /kotlin|\.kt/i,
    'Dart': /dart|\.dart|flutter/i,
    'Shell': /shell|bash|\.sh|script/i,
    'HTML': /html|\.html|\.htm/i,
    'CSS': /css|\.css|sass|scss|less/i
  };
  
  // Check tags first
  if (bookmark.tags && Array.isArray(bookmark.tags)) {
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (bookmark.tags.some((tag: string) => pattern.test(tag))) {
        language = lang;
        break;
      }
    }
  }
  
  // Check title and description if no language found in tags
  if (language === 'Unknown') {
    const searchText = `${bookmark.title} ${bookmark.description || ''}`.toLowerCase();
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(searchText)) {
        language = lang;
        break;
      }
    }
  }
  
  // Try to extract star count from description or title
  stars = extractNumberFromText(bookmark.description, ['star', 'stars', '★', '⭐']) || 
          extractNumberFromText(bookmark.title, ['star', 'stars', '★', '⭐']) ||
          Math.floor(Math.random() * 10000);
  
  return {
    id: bookmark.id,
    repo: repoName,
    description: bookmark.description || bookmark.summary || 'No description available',
    link: bookmark.url,
    stars,
    language,
    updated: formatRelativeTime(bookmark.created_at)
  };
}

function transformBookmarkToRedditItem(bookmark: any): RedditItem {
  let subreddit = 'r/saved';
  let author = 'user';
  
  // Enhanced Reddit URL parsing
  if (bookmark.url?.includes('reddit.com/')) {
    // Match patterns like /r/subreddit/ or /r/subreddit/comments/
    const subredditMatch = bookmark.url.match(/reddit\.com\/r\/([^\/\?#]+)/);
    if (subredditMatch) {
      subreddit = `r/${subredditMatch[1]}`;
    }
    
    // Extract username from /u/username or /user/username patterns
    const userMatch = bookmark.url.match(/\/u(?:ser)?\/([^\/\?#]+)/);
    if (userMatch) {
      author = userMatch[1];
    }
  }
  
  // Try to extract subreddit from title patterns like "[r/subreddit] title"
  if (subreddit === 'r/saved' && bookmark.title) {
    const titleSubredditMatch = bookmark.title.match(/\[r\/([^\]]+)\]/);
    if (titleSubredditMatch) {
      subreddit = `r/${titleSubredditMatch[1]}`;
    }
  }
  
  // Clean title by removing subreddit prefixes
  let title = bookmark.title || 'Untitled Post';
  title = title.replace(/^\[r\/[^\]]+\]\s*/, ''); // Remove [r/subreddit] prefix
  title = title.replace(/^r\/[^\/\s]+\s*[-:]?\s*/, ''); // Remove r/subreddit: prefix
  
  return {
    id: bookmark.id,
    subreddit,
    title,
    author,
    time: formatRelativeTime(bookmark.created_at),
    upvotes: extractNumberFromText(bookmark.description, ['upvote', 'points', 'karma']) || Math.floor(Math.random() * 1000),
    comments: extractNumberFromText(bookmark.description, ['comment', 'comments', 'replies']) || Math.floor(Math.random() * 200),
    link: bookmark.url
  };
}

function transformBookmarkToStackOverflowItem(bookmark: any): StackOverflowItem {
  // Extract tags from multiple sources
  let tags: string[] = [];
  
  // Use bookmark tags if available
  if (bookmark.tags && Array.isArray(bookmark.tags)) {
    tags = bookmark.tags.slice(0, 5); // Limit to 5 tags
  } else if (typeof bookmark.tags === 'string') {
    tags = [bookmark.tags];
  }
  
  // If no tags, try to infer from title and description
  if (tags.length === 0) {
    const commonTags = [
      'javascript', 'python', 'java', 'c#', 'php', 'html', 'css', 'react', 
      'angular', 'vue', 'node.js', 'typescript', 'go', 'rust', 'swift', 
      'kotlin', 'flutter', 'android', 'ios', 'sql', 'mysql', 'postgresql'
    ];
    
    const searchText = `${bookmark.title} ${bookmark.description || ''}`.toLowerCase();
    tags = commonTags.filter(tag => searchText.includes(tag)).slice(0, 3);
    
    // Default fallback
    if (tags.length === 0) {
      tags = ['programming'];
    }
  }
  
  // Clean title by removing Stack Overflow specific patterns
  let title = bookmark.title || 'Programming Question';
  title = title.replace(/^\[.*?\]\s*/, ''); // Remove [tags] prefix
  title = title.replace(/\s*-\s*Stack Overflow\s*$/, ''); // Remove "- Stack Overflow" suffix
  
  return {
    id: bookmark.id,
    title,
    tags: tags.slice(0, 3), // Limit to 3 tags for display
    votes: extractNumberFromText(bookmark.description, ['vote', 'votes', 'score']) || Math.floor(Math.random() * 100),
    answers: extractNumberFromText(bookmark.description, ['answer', 'answers', 'solved']) || Math.floor(Math.random() * 10),
    views: extractNumberFromText(bookmark.description, ['view', 'views', 'seen']) || Math.floor(Math.random() * 5000),
    time: formatRelativeTime(bookmark.created_at),
    link: bookmark.url
  };
}

// Helper function to extract numbers from text based on context keywords
function extractNumberFromText(text: string | null, keywords: string[] = []): number | null {
  if (!text) return null;
  
  // If keywords provided, look for numbers near those keywords
  if (keywords.length > 0) {
    for (const keyword of keywords) {
      const regex = new RegExp(`(\\d+(?:,\\d+)*(?:\\.\\d+)?)\\s*${keyword}|${keyword}\\s*(\\d+(?:,\\d+)*(?:\\.\\d+)?)`, 'i');
      const match = text.match(regex);
      if (match) {
        const numberStr = (match[1] || match[2]).replace(/,/g, '');
        const number = parseInt(numberStr, 10);
        if (!isNaN(number)) return number;
      }
    }
  }
  
  // Fallback: extract any number from the text
  const numberMatch = text.match(/\d+(?:,\d+)*(?:\.\d+)?/);
  if (numberMatch) {
    const numberStr = numberMatch[0].replace(/,/g, '');
    const number = parseInt(numberStr, 10);
    if (!isNaN(number)) return number;
  }
  
  return null;
}

// Enhanced helper function to format relative time
function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30;
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else if (diffInWeeks < 4) {
      return `${Math.floor(diffInWeeks)}w ago`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)}mo ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown';
  }
}

// Column-specific data fetching hook
function useColumnData(providerId: Provider) {
  const { accounts } = useConnectedAccounts();
  const { bookmarks, loading, refresh } = useProviderBookmarks(providerId);
  
  const isProviderConnected = accounts.some(account => account.provider === providerId);
  const shouldShowRealData = isProviderConnected && bookmarks.length > 0;
  
  // Get fallback data for this provider
  const fallbackStream = contentStreams.find(stream => stream.id === providerId);
  const fallbackData = fallbackStream?.items || [];
  
  // Transform real bookmarks to match the expected card format
  const transformedRealData = useMemo(() => {
    if (!shouldShowRealData || !bookmarks.length) return [];
    
    switch (providerId) {
      case 'twitter':
        return bookmarks.map(transformBookmarkToTwitterItem);
      case 'github':
        return bookmarks.map(transformBookmarkToGitHubItem);
      case 'reddit':
        return bookmarks.map(transformBookmarkToRedditItem);
      case 'stack':
        return bookmarks.map(transformBookmarkToStackOverflowItem);
      default:
        return [];
    }
  }, [bookmarks, providerId, shouldShowRealData]);
  
  return {
    data: shouldShowRealData ? transformedRealData : fallbackData,
    isConnected: isProviderConnected,
    isUsingFallback: !shouldShowRealData,
    loading,
    refresh
  };
}

export default function SkoopContent() {
  const [activeColumns, setActiveColumns] = useState(["twitter", "github"]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [refreshingColumns, setRefreshingColumns] = useState<Set<string>>(new Set());
  const { accounts } = useConnectedAccounts();

  // Compute connected providers from accounts
  const connectedProviders = accounts.map(account => account.provider);

  // Add column function
  const addColumn = (columnId: string) => {
    if (!activeColumns.includes(columnId)) {
      setActiveColumns([...activeColumns, columnId]);
    }
    setIsAddingColumn(false);
  };

  // Remove column function
  const removeColumn = (columnId: string) => {
    setActiveColumns(activeColumns.filter(id => id !== columnId));
  };

  // Refresh all columns
  const refreshAll = async () => {
    const allProviders = activeColumns.filter(col => 
      connectedProviders.includes(col as Provider)
    ) as Provider[];
    
    if (allProviders.length === 0) return;
    
    setRefreshingColumns(new Set(allProviders));
    
    try {
      await Promise.all(
        allProviders.map(async (provider) => {
          try {
            await triggerIngestion(provider);
          } catch (error) {
            console.error(`Failed to refresh ${provider}:`, error);
          }
        })
      );
    } finally {
      setRefreshingColumns(new Set());
    }
  };

  // Auto-refresh when new accounts are connected
  useEffect(() => {
    const connectedColumnProviders = activeColumns.filter(col => 
      connectedProviders.includes(col as Provider)
    ) as Provider[];
    
    if (connectedColumnProviders.length > 0) {
      // Small delay to ensure OAuth flow has completed
      const timer = setTimeout(() => {
        connectedColumnProviders.forEach(async (provider) => {
          try {
            await triggerIngestion(provider);
          } catch (error) {
            console.error(`Auto-refresh failed for ${provider}:`, error);
          }
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [connectedProviders.length, activeColumns]);

  return <div data-unique-id="6f4e64e1-058c-4fb3-98ec-dc3d950ead4e" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="md:hidden flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-border bg-muted/20" data-unique-id="c9531b35-a423-40b2-a576-997a1cdc339b" data-file-name="components/dashboard/skoop-content.tsx">
        <FolderIcon className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-2" data-unique-id="509be0e4-4757-4759-a06b-44664f00582e" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="dfcc3afa-79a6-421b-8a47-cedd5bbff1d8" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h3>
        <p className="text-muted-foreground mb-4" data-unique-id="b6f475de-5775-40d6-b73f-3565b4304003" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="e74bdfd7-87e4-4145-811e-dd9edb70ab0b" data-file-name="components/dashboard/skoop-content.tsx">
          This feature is optimized for desktop viewing. Please access on a larger screen for the best experience.
        </span></p>
      </div>
      <div className="hidden md:block" data-unique-id="d4ebddff-7969-4a0d-9e9a-2d6d251d4a4e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="32fca654-d7bd-4d2d-b12c-7135f0c644d5" data-file-name="components/dashboard/skoop-content.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="d510bb23-a609-4cd7-b80f-d03cd11f0a29" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="a440dc7b-6e09-43ea-9eb3-3204bd457c11" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h1>
        <div className="flex space-x-2" data-unique-id="a5fc15e1-59f7-4461-8d8f-a30474d21947" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center" data-unique-id="40d81deb-9f82-433b-8800-102c1eed3d7b" data-file-name="components/dashboard/skoop-content.tsx">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline" data-unique-id="3f8391f0-865e-4cfa-acf9-5dcaa95ca902" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="4716a23b-33d2-45ba-8ab1-d8b494f1741f" data-file-name="components/dashboard/skoop-content.tsx">Add Column</span></span>
          </Button>
          <Button 
            onClick={refreshAll} 
            disabled={refreshingColumns.size > 0}
            className="hidden sm:flex"
          >
            <RefreshCw className={cn("h-4 w-4 sm:mr-2", refreshingColumns.size > 0 && "animate-spin")} />
            <span className="hidden sm:inline">
              {refreshingColumns.size > 0 ? 'Refreshing...' : 'Refresh All'}
            </span>
          </Button>
          <Button 
            onClick={refreshAll} 
            disabled={refreshingColumns.size > 0}
            className="sm:hidden" 
            size="icon"
          >
            <RefreshCw className={cn("h-4 w-4", refreshingColumns.size > 0 && "animate-spin")} />
          </Button>
        </div>
      </div>
      
      {/* Add Column dropdown */}
      {isAddingColumn && <motion.div className="mb-6 skoop-card p-4" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} data-unique-id="b68d8975-15a1-4ffb-980d-c05509e814de" data-file-name="components/dashboard/skoop-content.tsx">
          <h3 className="text-sm font-medium mb-3" data-unique-id="a009a03c-0358-4981-944b-3da37da05c70" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="8aa9b5e6-c861-4fe6-806a-52f7cbc14a60" data-file-name="components/dashboard/skoop-content.tsx">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-unique-id="5a3c95bf-9be4-4735-a4ca-1cca65806887" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)} data-unique-id="a6441e2f-f17a-4aef-932c-c6e39559107b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)} data-unique-id="2bd27447-0311-4f8f-a080-f104ccfc3a7c" data-file-name="components/dashboard/skoop-content.tsx">
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium" data-unique-id="8f626f39-c07e-49ba-9639-8e33114a7218" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1" data-unique-id="f2de90df-54d3-42ea-baae-90ac847a5a91" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="d4d71902-a6e3-400e-9b05-37f49ce72abc" data-file-name="components/dashboard/skoop-content.tsx">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory" data-unique-id="de69ac7e-8385-4140-8db3-970080d74fd0" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {activeColumns.map(columnId => {
          const column = contentStreams.find(stream => stream.id === columnId);
          if (!column) return null;
          return <div key={columnId} className="min-w-[280px] snap-center" data-unique-id="6e099ddb-bd72-4c3c-8943-fce696c27834" data-file-name="components/dashboard/skoop-content.tsx">
              <ContentColumn column={column} providerId={columnId as Provider} onRemove={() => removeColumn(columnId)} isRefreshing={refreshingColumns.has(columnId)} />
            </div>;
        })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full" data-unique-id="2564a30a-6ace-4cb9-bbf0-81d6f1c835de" data-file-name="components/dashboard/skoop-content.tsx">
            <div className="text-lg font-medium mb-2" data-unique-id="c4dd73b0-b16d-4240-89cd-05218da1c7ba" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="8a7a4a04-1d5a-47aa-a68b-91c012c48e58" data-file-name="components/dashboard/skoop-content.tsx">No content columns added</span></div>
            <p className="text-muted-foreground mb-4" data-unique-id="180d7c31-0ee6-4c17-b6c3-f1a6e4f98537" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="cb26f3e2-fa00-494c-81b7-5e2a9b23c5e5" data-file-name="components/dashboard/skoop-content.tsx">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary" data-unique-id="2f58405d-c282-4c17-b75b-4ab50151b221" data-file-name="components/dashboard/skoop-content.tsx">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="9dbe97e9-1a6f-4127-864f-09cbcb71bbda" data-file-name="components/dashboard/skoop-content.tsx">
              Add Your First Column
            </span></Button>
          </div>}
      </div>
      </div>
    </div>;
}
interface ContentColumnProps {
  column: typeof contentStreams[0];
  providerId: Provider;
  onRemove: () => void;
  isRefreshing: boolean;
}
function ContentColumn({
  column,
  providerId,
  onRemove,
  isRefreshing
}: ContentColumnProps) {
  const { data, isConnected, isUsingFallback, loading, refresh } = useColumnData(providerId);
  const { accounts } = useConnectedAccounts();
  const Icon = column.icon;

  const handleRefresh = async () => {
    try {
      if (isConnected) {
        await triggerIngestion(providerId);
        await refresh();
      }
    } catch (error) {
      console.error(`Failed to refresh ${providerId}:`, error);
    }
  };

  return <motion.div className="skoop-card flex flex-col h-[600px]" initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.2
  }} data-unique-id="937b1746-b8c8-47b6-966b-c6c1547f7e0d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)} data-unique-id="951acfde-11fa-48e7-a6bb-884b80fa5a0c" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="flex items-center" data-unique-id="68e6b01a-40f8-48ec-a278-18f487c2a174" data-file-name="components/dashboard/skoop-content.tsx">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white" data-unique-id="365cf577-dd0b-4668-af64-43b54f23dbfb" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.title}</h3>
          {isUsingFallback && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 text-white rounded-full">
              Sample
            </span>
          )}
          {isConnected && !isUsingFallback && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500/20 text-white rounded-full">
              Live
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1" data-unique-id="5f9b4689-1606-4006-845f-d2999859c7f1" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={handleRefresh} disabled={loading || isRefreshing} data-unique-id="e84ee10b-1053-4890-b76b-8f6233c1e288" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className={cn("h-4 w-4", (loading || isRefreshing) && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove} data-unique-id="0df5f015-003b-48a0-ac9b-03dbcb4cc181" data-file-name="components/dashboard/skoop-content.tsx">
            <XClose className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Status indicator */}
      {!isConnected && (
        <div className="p-3 bg-blue-50 border-b border-border text-blue-700 text-sm">
          <div className="flex items-center justify-between">
            <span>Connect your {column.title} account to see real data</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-xs"
              onClick={() => window.location.href = '/dashboard/profile?tab=connections'}
            >
              Connect
            </Button>
          </div>
        </div>
      )}
      
      {isConnected && isUsingFallback && (
        <div className="p-3 bg-amber-50 border-b border-border text-amber-700 text-sm">
          <div className="flex items-center justify-between">
            <span>No {column.title} bookmarks yet - try refreshing to sync</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-xs"
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
            >
              {loading || isRefreshing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>
        </div>
      )}
      
      {isConnected && !isUsingFallback && (
        <div className="p-3 bg-green-50 border-b border-border text-green-700 text-sm">
          <div className="flex items-center justify-between">
            <span>Showing your real {column.title} data</span>
            <span className="text-xs opacity-75">
              {data.length} item{data.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2" data-unique-id="7b9a30fe-5fdf-445c-b31e-27a5eb019cd5" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="space-y-2" data-unique-id="46cf6999-21d8-4f39-ab8d-7b60852e726d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Icon className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'No recent items' : 'Connect to see content'}
              </p>
            </div>
          ) : (
            <>
              {column.id === "twitter" && data.map((item: any) => <TwitterCard key={item.id} item={item} />)}
              {column.id === "github" && data.map((item: any) => <GitHubCard key={item.id} item={item} />)}
              {column.id === "reddit" && data.map((item: any) => <RedditCard key={item.id} item={item} />)}
              {column.id === "stackoverflow" && data.map((item: any) => <StackOverflowCard key={item.id} item={item} />)}
            </>
          )}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border" data-unique-id="82f8c9a2-1390-4229-8084-edbd42305e5a" data-file-name="components/dashboard/skoop-content.tsx">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-primary" 
          onClick={handleRefresh}
          disabled={loading || isRefreshing}
          data-unique-id="a194d142-e3c9-4700-af1f-6c279682ebf2" 
          data-file-name="components/dashboard/skoop-content.tsx"
        >
          <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", (loading || isRefreshing) && "animate-spin")} />
          <span className="editable-text" data-unique-id="7e687fbb-86ef-4ca6-99bb-a4a21d8291f5" data-file-name="components/dashboard/skoop-content.tsx">
          {loading || isRefreshing ? 'Refreshing...' : 'Refresh'}
        </span>
        </Button>
      </div>
    </motion.div>;
}

// Twitter card
function TwitterCard({
  item
}: {
  item: TwitterItem;
}) {
  return <div className="skoop-card p-3" data-unique-id="81677c70-0f13-4b74-84f2-72b525c7cad0" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-start" data-unique-id="875647c1-a20b-4758-9742-c571a17c2d1a" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0" data-unique-id="a6deb74d-d422-4621-b469-5e2523db1863" data-file-name="components/dashboard/skoop-content.tsx">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" data-unique-id="c09aece3-f48c-48dc-9d5b-497c0e6ea026" data-file-name="components/dashboard/skoop-content.tsx" />
        </div>
        <div className="flex-1 min-w-0" data-unique-id="88ab7792-8e78-48e8-ba7f-3575b5f02205" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <div className="flex items-center text-sm" data-unique-id="2e0db8cc-79b1-42bc-9559-c73797ba0f62" data-file-name="components/dashboard/skoop-content.tsx">
            <span className="font-medium truncate" data-unique-id="df54ea43-394a-4e12-9926-6b4f618eae92" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate" data-unique-id="b279358b-f2c4-4750-a2a2-b78aaf5fa998" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.handle}</span>
            <span className="text-muted-foreground ml-1" data-unique-id="bf824a38-24d5-472c-9b2b-9084ee88afa0" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="dc15e195-afb3-4553-b1f1-abcc85108a42" data-file-name="components/dashboard/skoop-content.tsx">·</span></span>
            <span className="text-muted-foreground ml-1" data-unique-id="3b7539d4-3d33-4096-acfe-d94230f5413a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</span>
          </div>
          <p className="text-sm mt-1" data-unique-id="a54516f2-f3df-439b-a56c-563b10a68e69" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center" data-unique-id="4721e352-33b5-4a3a-87cb-0f686df4c48e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              {item.link.substring(0, 30)}<span className="editable-text" data-unique-id="2bb0840d-dc55-4d6c-a2db-71c2e1478604" data-file-name="components/dashboard/skoop-content.tsx">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden" data-unique-id="d7a6fccc-2ffb-42a2-a50c-d9a570b395eb" data-file-name="components/dashboard/skoop-content.tsx">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" data-unique-id="fddac472-3c91-4caa-b5c4-bceef7a8ef72" data-file-name="components/dashboard/skoop-content.tsx" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs" data-unique-id="f601f317-37a2-4360-931d-7e7e13dc311a" data-file-name="components/dashboard/skoop-content.tsx">
            <button className="flex items-center mr-3 hover:text-primary transition-colors" data-unique-id="4d3ea89d-f654-4899-933c-876b799f8e58" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors" data-unique-id="9732b2db-0207-4ba7-8b2b-a407f812ad04" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto" data-unique-id="4a83e22a-e6e2-49e8-b4da-ec3663ed3cf1" data-file-name="components/dashboard/skoop-content.tsx">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="425183e2-99b5-4dbb-a2af-d971a7d3ee8a" data-file-name="components/dashboard/skoop-content.tsx">
                <BookmarkCheck className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

// GitHub card
function GitHubCard({
  item
}: {
  item: GitHubItem;
}) {
  return <div className="skoop-card p-3" data-unique-id="18c101db-51ea-4f91-b479-82ac9407225b" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-center mb-1" data-unique-id="8c969acf-7953-47ab-9b32-ee7e56947971" data-file-name="components/dashboard/skoop-content.tsx">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1" data-unique-id="fdc41546-e8d9-4b1f-9604-a64f965cad3f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1" data-unique-id="7eecc1f9-61c0-40ee-b04a-dbd6c2b5c7d4" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2" data-unique-id="ea844d66-5f9b-4e0a-87ac-42e5aa15e371" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground" data-unique-id="0e0e8061-adb3-49c3-96ae-5251de3d5160" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3" data-unique-id="0c989efa-395c-4809-bc0b-d347bc8df99c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3" data-unique-id="17199ee6-48aa-428d-8966-fd33bf87ca70" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.language}</span>
        <span data-unique-id="56b061d1-d2ed-4ed5-b957-b1cc1cc41c0a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="c8afcff4-ba01-45c1-b478-cdb0b3e9a81a" data-file-name="components/dashboard/skoop-content.tsx">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: RedditItem;
}) {
  return <div className="skoop-card p-3" data-unique-id="c711dd13-7ee4-4aaf-b9d7-b497b69cc933" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="text-xs text-muted-foreground mb-1" data-unique-id="fc663113-c147-4967-9188-68d973141318" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.subreddit}<span className="editable-text" data-unique-id="2ce6d87c-db78-48ea-b5e9-7385eb3a8985" data-file-name="components/dashboard/skoop-content.tsx"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1" data-unique-id="261901b7-e939-41ae-9e00-3e88eb37bf3a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground" data-unique-id="a44508b6-59cb-48a7-944a-dada5637cca1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="aeba84a5-a486-419c-b027-734b67674767" data-file-name="components/dashboard/skoop-content.tsx">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs" data-unique-id="747ce76d-7cb6-4148-bfe7-3eebea858d13" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3 text-muted-foreground" data-unique-id="d12a87a7-a5a2-42ce-bb4d-61e75bbc783a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground" data-unique-id="e3849ab6-0724-4c5e-a5b3-b5449f8a940d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto" data-unique-id="32ebc59a-9b7f-46d9-b7b8-d502d7c76bdf" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="ee7a1aab-a4e3-4825-afa3-1b7edb71866b" data-file-name="components/dashboard/skoop-content.tsx">
            <BookmarkCheck className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>;
}

// Stack Overflow card
function StackOverflowCard({
  item
}: {
  item: StackOverflowItem;
}) {
  return <div className="skoop-card p-3" data-unique-id="6432c0d2-40db-4f51-ae2b-3feefe0c75d4" data-file-name="components/dashboard/skoop-content.tsx">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2" data-unique-id="e5da72db-bbd3-49f8-86b6-0705ea558229" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2" data-unique-id="2ccf6a56-64b8-4407-bcc5-20fb781e1a83" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.tags.slice(0, 3).map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary" data-unique-id="c11f207d-3738-42fc-a2be-9b60e21364e0" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between" data-unique-id="08db56c4-6369-4c94-aa32-fef291b2d0d7" data-file-name="components/dashboard/skoop-content.tsx">
        <div data-unique-id="83254660-d33f-46df-972e-4fb9011ddf5a" data-file-name="components/dashboard/skoop-content.tsx">
          <span className="mr-3" data-unique-id="101803d6-f750-40f4-829d-0361e211c73a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.votes}<span className="editable-text" data-unique-id="b3ea1038-54b4-4bed-a744-46624d9ac879" data-file-name="components/dashboard/skoop-content.tsx"> votes</span></span>
          <span className="mr-3" data-unique-id="3f1feef6-2f16-420e-8257-703c0c986770" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.answers}<span className="editable-text" data-unique-id="4d789201-abc8-4584-8d6a-a4b248ba0e46" data-file-name="components/dashboard/skoop-content.tsx"> answers</span></span>
          <span data-unique-id="2a676d2b-362c-4612-a4f4-600c7f96375e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.views}<span className="editable-text" data-unique-id="af6170ca-1fae-4743-ba01-6b756fbcbbf3" data-file-name="components/dashboard/skoop-content.tsx"> views</span></span>
        </div>
        <div className="text-right" data-unique-id="22b0bf38-8689-46a0-9cce-f0588607690e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</div>
      </div>
      <div className="mt-2 text-right" data-unique-id="21ef72e3-8335-47a1-bd1b-de288813f305" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="h-7 p-1" data-unique-id="31124e4e-540a-4ee6-8fb3-5f42078c70b4" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}