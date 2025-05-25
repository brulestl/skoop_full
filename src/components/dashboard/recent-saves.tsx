"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, ArrowUp, Sparkles, ExternalLink, FolderPlus, TrendingUp, Calendar, Heart, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AISummary from "@/components/ai/summary";
import { cn } from "@/lib/utils";
import { generateText } from '@/lib/api/util';
import { useBookmarks } from '@/hooks/useBookmarks';
import { transformBookmarksForUI, createMockBookmarkData, UIBookmark } from '@/utils/transformBookmarks';

// Source icon mapping
const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case "github": return <Github className="h-4 w-4" />;
    case "twitter": return <X className="h-4 w-4" />;
    case "stackoverflow": return <StackOverflow className="h-4 w-4" />;
    case "reddit": return <Reddit className="h-4 w-4" />;
    default: return <BookmarkIcon className="h-4 w-4" />;
  }
};

// Card component for the grid view
const SaveCard = ({
  save,
  onShowAISummary,
  onAddToCollection
}: {
  save: UIBookmark;
  onShowAISummary: (save: UIBookmark) => void;
  onAddToCollection: (save: UIBookmark) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementMetric = () => {
    switch (save.source) {
      case 'github': return { icon: Star, value: save.engagement.stars || 0 };
      case 'twitter': return { icon: Heart, value: save.engagement.likes || 0 };
      case 'stackoverflow': return { icon: ArrowUp, value: save.engagement.votes || 0 };
      case 'reddit': return { icon: ArrowUp, value: save.engagement.upvotes || 0 };
      default: return { icon: BookmarkIcon, value: save.engagement.saves || 0 };
    }
  };

  const primaryMetric = getEngagementMetric();
  const IconComponent = primaryMetric.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-lg border border-border hover:border-primary/20 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {save.image && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={save.image}
            alt={save.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <SourceIcon source={save.source} />
            <span className="capitalize">{save.source}</span>
        </div>
          {save.starred && (
            <div className="absolute top-3 right-3 p-1.5 bg-amber-500 rounded-full">
              <Star className="h-3 w-3 text-white fill-current" />
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {!save.image && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
          <SourceIcon source={save.source} />
              <span className="capitalize">{save.source}</span>
        </div>
            {save.starred && <Star className="h-4 w-4 text-amber-500 fill-current" />}
      </div>
        )}
      
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {save.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {save.description}
        </p>
        
        {save.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {save.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
              >
              {tag}
              </span>
            ))}
            {save.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{save.tags.length - 3} more
              </span>
            )}
        </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <IconComponent className="h-4 w-4" />
              <span>{formatNumber(primaryMetric.value)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{format(save.savedAt, 'MMM d')}</span>
            </div>
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center space-x-1"
              >
                <Button variant="ghost" size="sm" onClick={() => onShowAISummary(save)} className="h-8 w-8 p-0">
                  <Sparkles className="h-4 w-4" />
            </Button>
                <Button variant="ghost" size="sm" onClick={() => onAddToCollection(save)} className="h-8 w-8 p-0">
                  <FolderPlus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                  <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
    </motion.div>
  );
};

// List item component for the list view
const SaveListItem = ({
  save,
  onShowAISummary,
  onAddToCollection
}: {
  save: UIBookmark;
  onShowAISummary: (save: UIBookmark) => void;
  onAddToCollection: (save: UIBookmark) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementMetric = () => {
    switch (save.source) {
      case 'github': return { icon: Star, value: save.engagement.stars || 0 };
      case 'twitter': return { icon: Heart, value: save.engagement.likes || 0 };
      case 'stackoverflow': return { icon: ArrowUp, value: save.engagement.votes || 0 };
      case 'reddit': return { icon: ArrowUp, value: save.engagement.upvotes || 0 };
      default: return { icon: BookmarkIcon, value: save.engagement.saves || 0 };
    }
  };

  const primaryMetric = getEngagementMetric();
  const IconComponent = primaryMetric.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-lg border border-border hover:border-primary/20 transition-all duration-200 p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        {save.image && (
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={save.image} alt={save.title} fill className="object-cover" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <SourceIcon source={save.source} />
              <span className="capitalize">{save.source}</span>
              {save.starred && <Star className="h-4 w-4 text-amber-500 fill-current" />}
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(save.savedAt, 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {save.title}
            </h3>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {save.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {save.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {save.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                    >
                  {tag}
            </span>
                  ))}
                  {save.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{save.tags.length - 2}</span>
                  )}
          </div>
              )}
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <IconComponent className="h-4 w-4" />
                <span>{formatNumber(primaryMetric.value)}</span>
        </div>
      </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center space-x-1"
                >
                  <Button variant="ghost" size="sm" onClick={() => onShowAISummary(save)} className="h-8 w-8 p-0">
                    <Sparkles className="h-4 w-4" />
        </Button>
                  <Button variant="ghost" size="sm" onClick={() => onAddToCollection(save)} className="h-8 w-8 p-0">
                    <FolderPlus className="h-4 w-4" />
        </Button>
                  <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                    <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
                    </a>
        </Button>
                </motion.div>
              )}
            </AnimatePresence>
      </div>
        </div>
      </div>
    </motion.div>
  );
};

// AI Summary Panel component
const AISummaryPanel = ({
  save,
  isOpen,
  onClose,
  selectedModel
}: {
  save: UIBookmark | null;
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
}) => {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

    const generateFullSummary = async () => {
      if (!save) return;

    setIsGenerating(true);
    setSummary('');
    
    try {
      const prompt = `Please provide a comprehensive summary of this content:

Title: ${save.title}
Description: ${save.description}
Content: ${save.content}
Source: ${save.source}

Please provide:
1. A brief overview (2-3 sentences)
2. Key points or takeaways (3-5 bullet points)
3. Who would benefit from this content
4. Related topics or technologies mentioned

Keep the summary engaging and informative.`;

      const result = await generateText(prompt, selectedModel);
      setSummary(result.text);
      } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please try again.');
      } finally {
      setIsGenerating(false);
      }
    };

  useEffect(() => {
    if (isOpen && save) {
      generateFullSummary();
    }
  }, [isOpen, save, selectedModel]);

  if (!isOpen || !save) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-background rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
            </div>
              <div>
                <h2 className="text-lg font-semibold">AI Summary</h2>
                <p className="text-sm text-muted-foreground">Generated with {selectedModel}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <SourceIcon source={save.source} />
                <span className="text-sm text-muted-foreground capitalize">{save.source}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{save.title}</h3>
              <p className="text-sm text-muted-foreground">{save.description}</p>
            </div>
            
            <div className="border border-border rounded-lg p-4 bg-muted/20">
              <h4 className="font-medium mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Summary
              </h4>
              
              {isGenerating ? (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm">Generating summary...</span>
              </div>
              ) : (
                <div className="prose prose-sm max-w-none text-sm">
                  {summary.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
                  ))}
            </div>
              )}
          </div>
          
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button variant="outline" size="sm" asChild>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
              View Original
                </a>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={generateFullSummary} disabled={isGenerating}>
                  <RefreshCw className={cn("h-4 w-4 mr-2", isGenerating && "animate-spin")} />
                  Regenerate
            </Button>
          </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Collection Modal placeholder
const AddToCollectionModal = ({
  isOpen,
  onClose,
  save
}: {
  isOpen: boolean;
  onClose: () => void;
  save: UIBookmark | null;
}) => {
  if (!isOpen || !save) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-background rounded-lg border border-border max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Add to Collection</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Collection feature coming soon! You'll be able to organize your bookmarks into custom collections.
          </p>
          
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main RecentSaves component
export default function RecentSaves() {
  const { bookmarks, loading, error, hasMore, loadMore, refresh, totalCount } = useBookmarks();
  
  const mockData = useMemo(() => createMockBookmarkData(), []);
  const realBookmarks = useMemo(() => transformBookmarksForUI(bookmarks), [bookmarks]);
  
  const isUsingMockData = realBookmarks.length === 0;

  const [visibleSaves, setVisibleSaves] = useState<UIBookmark[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
  const [selectedSave, setSelectedSave] = useState<UIBookmark | null>(null);

  const [addToCollectionModalOpen, setAddToCollectionModalOpen] = useState(false);
  const [saveToAdd, setSaveToAdd] = useState<UIBookmark | null>(null);
  const [sortOption, setSortOption] = useState<'latest' | 'earliest' | 'popular'>('latest');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setSelectedModel(storedModel);
    }
  }, []);

  const getSortedSaves = useCallback(() => {
    const dataToSort = isUsingMockData ? mockData : realBookmarks;
    let sorted = [...dataToSort];
    switch (sortOption) {
      case 'latest':
        sorted = sorted.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
        break;
      case 'earliest':
        sorted = sorted.sort((a, b) => a.savedAt.getTime() - b.savedAt.getTime());
        break;
      case 'popular':
        sorted = sorted.sort((a, b) => {
          const aPopularity = a.engagement?.saves || 0;
          const bPopularity = b.engagement?.saves || 0;
          return bPopularity - aPopularity;
        });
        break;
    }
    return sorted;
  }, [isUsingMockData, mockData, realBookmarks, sortOption]);

  const sortedData = useMemo(() => getSortedSaves(), [getSortedSaves]);

  const loadMoreSaves = useCallback(async () => {
    if (isUsingMockData) {
      setLoadingMore(true);
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      
      if (startIndex >= sortedData.length) {
        setLoadingMore(false);
        return;
      }
      
      setTimeout(() => {
      const newItems = sortedData.slice(0, endIndex);
      setVisibleSaves(newItems);
      setPage(prevPage => prevPage + 1);
        setLoadingMore(false);
      }, 500);
    } else {
      setLoadingMore(true);
      await loadMore();
      setLoadingMore(false);
    }
  }, [isUsingMockData, page, sortedData, loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && (isUsingMockData ? visibleSaves.length < sortedData.length : hasMore) && !loadingMore) {
        loadMoreSaves();
      }
    }, { threshold: 0.5 });
    
    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }
    
    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [hasMore, loadingMore, visibleSaves.length, sortedData.length, loadMoreSaves, isUsingMockData]);

  useEffect(() => {
    if (!isUsingMockData) {
      setVisibleSaves(realBookmarks);
    } else {
      setVisibleSaves(sortedData.slice(0, 6));
      setPage(2);
    }
  }, [realBookmarks, isUsingMockData, sortedData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredAIModel', selectedModel);
    }
  }, [selectedModel]);

  const handleShowAISummary = (save: UIBookmark) => {
    setSelectedSave(save);
    setSummaryPanelOpen(true);
  };

  const handleAddToCollection = (save: UIBookmark) => {
    setSaveToAdd(save);
    setAddToCollectionModalOpen(true);
  };

  const currentCount = isUsingMockData ? visibleSaves.length : realBookmarks.length;
  const totalDisplayCount = isUsingMockData ? sortedData.length : totalCount;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border">
        {!isUsingMockData && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Showing your real bookmarks ({totalCount} total)</span>
            </div>
          </div>
        )}
        
        {isUsingMockData && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700 text-sm">
              <BookmarkIcon className="h-4 w-4" />
              <span>No bookmarks yet - connect your GitHub account in Profile to sync your starred repositories</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Recent Saves</h1>
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === 'card' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-none h-8" 
                onClick={() => setViewMode('card')}
              >
                Card
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-none h-8" 
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground hidden sm:block">
            Showing {currentCount} of {totalDisplayCount} saves
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button 
                variant={sortOption === 'latest' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-none text-xs py-1 h-8" 
                onClick={() => setSortOption('latest')}
              >
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Latest
              </Button>
              <Button 
                variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-none text-xs py-1 h-8" 
                onClick={() => setSortOption('earliest')}
              >
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Earliest
              </Button>
              <Button 
                variant={sortOption === 'popular' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="rounded-none text-xs py-1 h-8" 
                onClick={() => setSortOption('popular')}
              >
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                Popular
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {loading && visibleSaves.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-red-500 mb-2">Error loading bookmarks</div>
            <Button onClick={refresh} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : visibleSaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookmarkIcon className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
            <p className="text-muted-foreground">Connect your accounts to start importing bookmarks</p>
          </div>
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleSaves.map(save => (
                  <SaveCard 
                    key={save.id} 
                    save={save} 
                    onShowAISummary={handleShowAISummary} 
                    onAddToCollection={handleAddToCollection} 
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {visibleSaves.map(save => (
                  <SaveListItem 
                    key={save.id} 
                    save={save} 
                    onShowAISummary={handleShowAISummary} 
                    onAddToCollection={handleAddToCollection} 
                  />
                ))}
              </div>
            )}
            
            <div ref={observerTarget} className="py-8 flex justify-center">
              {loadingMore && (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
                  <span className="text-sm text-muted-foreground">Loading more...</span>
        </div>
              )}
              {!loadingMore && (isUsingMockData ? visibleSaves.length >= sortedData.length : !hasMore) && visibleSaves.length > 0 && (
                <span className="text-sm text-muted-foreground">No more saves to load</span>
              )}
      </div>
          </>
        )}
          </div>
          
      <AISummaryPanel 
        save={selectedSave} 
        isOpen={summaryPanelOpen} 
        onClose={() => setSummaryPanelOpen(false)} 
        selectedModel={selectedModel} 
      />

      <AddToCollectionModal 
        isOpen={addToCollectionModalOpen}
        onClose={() => setAddToCollectionModalOpen(false)}
        save={saveToAdd}
      />
            </div>
  );
} 