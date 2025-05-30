"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, ArrowUp, Sparkles, ExternalLink, FolderPlus, TrendingUp, Calendar, Heart, CheckCircle2, RefreshCw, Trash2, FolderIcon, Filter, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AISummary from "@/components/ai/summary";
import { cn } from "@/lib/utils";

import { useBookmarks } from '@/hooks/useBookmarks';
import { transformBookmarksForUI, UIBookmark } from '@/utils/transformBookmarks';
import { useCollections, useCollectionOperations } from '@/hooks/useCollections';
import { analyzeBookmarksForCollection, SemanticSuggestion, SemanticAnalysisResult } from '@/services/semanticAnalysis';
import SyncTelegramButton from '@/components/dashboard/sync-telegram-button';

// Source icon mapping
const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case "github": return <Github className="h-4 w-4" />;
    case "twitter": return <X className="h-4 w-4" />;
    case "stackoverflow": return <StackOverflow className="h-4 w-4" />;
    case "reddit": return <Reddit className="h-4 w-4" />;
    case "telegram": return <Send className="h-4 w-4" />;
    default: return <BookmarkIcon className="h-4 w-4" />;
  }
};

// Card component for the grid view
const SaveCard = ({
  save,
  onShowAISummary,
  onAddToCollection,
  onDelete,
  bulkSelectionMode = false,
  isSelected = false,
  onSelect
}: {
  save: UIBookmark;
  onShowAISummary: (save: UIBookmark) => void;
  onAddToCollection: (save: UIBookmark) => void;
  onDelete: (save: UIBookmark) => void;
  bulkSelectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: (bookmarkId: string | number) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementMetric = () => {
    switch (save.source) {
      case 'github': return { icon: Star, value: save.engagement?.stars || 0 };
      case 'twitter': return { icon: Heart, value: save.engagement?.likes || 0 };
      case 'stackoverflow': return { icon: ArrowUp, value: save.engagement?.votes || 0 };
      case 'reddit': return { icon: ArrowUp, value: save.engagement?.upvotes || 0 };
      default: return { icon: BookmarkIcon, value: save.engagement?.saves || 0 };
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
      className={cn(
        "group relative bg-card rounded-lg border border-border hover:border-primary/20 transition-all duration-200",
        bulkSelectionMode && isSelected && "ring-2 ring-primary bg-primary/5",
        bulkSelectionMode && "cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => bulkSelectionMode && onSelect?.(save.id)}
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
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            {bulkSelectionMode && (
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center bg-white/90 backdrop-blur-sm",
                isSelected ? "border-primary bg-primary" : "border-white"
              )}>
                {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
            )}
            {save.starred && (
              <div className="p-1.5 bg-amber-500 rounded-full">
                <Star className="h-3 w-3 text-white fill-current" />
              </div>
            )}
            {!bulkSelectionMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(save);
              }}
              className="h-7 w-7 p-0 bg-red-500/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete bookmark"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        {!save.image && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <SourceIcon source={save.source} />
              <span className="capitalize">{save.source}</span>
            </div>
            <div className="flex items-center space-x-2">
              {bulkSelectionMode && (
                <div className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center",
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
              )}
              {save.starred && <Star className="h-4 w-4 text-amber-500 fill-current" />}
              {!bulkSelectionMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(save);
                }}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete bookmark"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              )}
            </div>
          </div>
        )}
      
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {save.title}
        </h3>
        
        <div className="mb-3">
          <AISummary
            title={save.title}
            url={save.sourceUrl}
            description={save.description}
            content={save.content}
            bookmarkId={save.id.toString()}
            className="text-muted-foreground text-sm line-clamp-3"
            showRefresh={true}
          />
        </div>
        
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
        
        <div className="flex items-center justify-between min-h-[32px]">
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
          
          <div className="flex items-center space-x-1 min-w-[96px] justify-end">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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

// List item component for the list view
const SaveListItem = ({
  save,
  onShowAISummary,
  onAddToCollection,
  onDelete,
  bulkSelectionMode = false,
  isSelected = false,
  onSelect
}: {
  save: UIBookmark;
  onShowAISummary: (save: UIBookmark) => void;
  onAddToCollection: (save: UIBookmark) => void;
  onDelete: (save: UIBookmark) => void;
  bulkSelectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: (bookmarkId: string | number) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getEngagementMetric = () => {
    switch (save.source) {
      case 'github': return { icon: Star, value: save.engagement?.stars || 0 };
      case 'twitter': return { icon: Heart, value: save.engagement?.likes || 0 };
      case 'stackoverflow': return { icon: ArrowUp, value: save.engagement?.votes || 0 };
      case 'reddit': return { icon: ArrowUp, value: save.engagement?.upvotes || 0 };
      default: return { icon: BookmarkIcon, value: save.engagement?.saves || 0 };
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
      className={cn(
        "group relative bg-card rounded-lg border border-border hover:border-primary/20 transition-all duration-200 p-4",
        bulkSelectionMode && isSelected && "ring-2 ring-primary bg-primary/5",
        bulkSelectionMode && "cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => bulkSelectionMode && onSelect?.(save.id)}
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
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {bulkSelectionMode && (
                <div className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center",
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
              )}
              <Calendar className="h-4 w-4" />
              <span>{format(save.savedAt, 'MMM d, yyyy')}</span>
              {!bulkSelectionMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(save);
                }}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete bookmark"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              )}
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {save.title}
            </h3>
          
          <div className="mb-3">
            <AISummary
              title={save.title}
              url={save.sourceUrl}
              description={save.description}
              content={save.content}
              bookmarkId={save.id.toString()}
              className="text-muted-foreground text-sm line-clamp-2"
              showRefresh={true}
            />
          </div>
          
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

            <div className="flex items-center space-x-1 min-w-[96px] justify-end">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
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
  const [refreshKey, setRefreshKey] = useState(0);

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
                Detailed AI Summary
              </h4>
              
              <AISummary
                key={refreshKey} // Force regeneration when key changes
                title={save.title}
                url={save.sourceUrl}
                description={save.description}
                content={save.content}
                bookmarkId={save.id.toString()}
                long={true}
                showRefresh={true}
                onRefresh={() => setRefreshKey(prev => prev + 1)}
                className="prose prose-sm max-w-none text-sm"
              />
              
              {/* Context information is already included in the AI-generated summary above */}
          </div>
          
            <div className="flex items-center justify-center mt-6 pt-4 border-t border-border">
              <Button variant="outline" size="sm" asChild>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Original
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Collection Modal - fully functional
const AddToCollectionModal = ({
  isOpen,
  onClose,
  save
}: {
  isOpen: boolean;
  onClose: () => void;
  save: UIBookmark | null;
}) => {
  const { collections, loading: collectionsLoading, createCollection } = useCollections();
  const { addToCollection } = useCollectionOperations();
  
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionColor, setNewCollectionColor] = useState<'primary' | 'accent' | 'destructive' | 'secondary'>('primary');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [semanticAnalysis, setSemanticAnalysis] = useState<SemanticAnalysisResult | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SemanticSuggestion | null>(null);
  const [showSemanticSuggestions, setShowSemanticSuggestions] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedCollections(new Set());
      setShowCreateNew(false);
      setNewCollectionName('');
      setNewCollectionColor('primary');
      setError(null);
      setSuccess(null);
      setSelectedSuggestion(null);
      setShowSemanticSuggestions(false);
      
      // Perform semantic analysis on the single bookmark
      if (save) {
        const analysis = analyzeBookmarksForCollection([save]);
        setSemanticAnalysis(analysis);
        
        // Auto-show suggestions if confidence is decent
        if (analysis.suggestions.length > 0 && analysis.suggestions[0].confidence > 0.4) {
          setShowSemanticSuggestions(true);
        }
      }
    } else {
      // Reset all state when modal closes
      setSelectedCollections(new Set());
      setShowCreateNew(false);
      setNewCollectionName('');
      setNewCollectionColor('primary');
      setError(null);
      setSuccess(null);
      setSelectedSuggestion(null);
      setShowSemanticSuggestions(false);
      setSemanticAnalysis(null);
    }
  }, [isOpen, save]);

  if (!isOpen || !save) return null;

  const handleCollectionToggle = (collectionId: string) => {
    const newSelected = new Set(selectedCollections);
    if (newSelected.has(collectionId)) {
      newSelected.delete(collectionId);
    } else {
      newSelected.add(collectionId);
    }
    setSelectedCollections(newSelected);
  };

  const handleCreateNewCollection = async () => {
    if (!newCollectionName.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await createCollection({
        name: newCollectionName.trim(),
        color: newCollectionColor,
        type: 'manual'
      });

      if (result.success && result.data) {
        // Add the new collection to selected collections
        setSelectedCollections(prev => new Set([...prev, result.data!.id]));
        setShowCreateNew(false);
        setNewCollectionName('');
        setSuccess(`Created collection "${result.data.name}"`);
      } else {
        setError(result.error || 'Failed to create collection');
      }
    } catch (err) {
      setError('Failed to create collection');
      console.error('Error creating collection:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCollections = async () => {
    if (selectedCollections.size === 0) {
      setError('Please select at least one collection');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const promises = Array.from(selectedCollections).map(collectionId =>
        addToCollection({
          collectionId,
          bookmarkIds: [save.id.toString()]
        })
      );

      const results = await Promise.all(promises);
      const failedResults = results.filter(result => !result.success);

      if (failedResults.length > 0) {
        setError(`Failed to add to ${failedResults.length} collection(s)`);
      } else {
        setSuccess(`Added to ${selectedCollections.size} collection(s)`);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError('Failed to add to collections');
      console.error('Error adding to collections:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const colorOptions = [
    { value: 'primary' as const, label: 'Blue', class: 'bg-primary' },
    { value: 'accent' as const, label: 'Orange', class: 'bg-accent' },
    { value: 'destructive' as const, label: 'Red', class: 'bg-destructive' },
    { value: 'secondary' as const, label: 'Gray', class: 'bg-secondary' }
  ];

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
          className="bg-background rounded-lg border border-border max-w-lg w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
            <h2 className="text-lg font-semibold">Add to Collection</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {save.title.length > 50 ? `${save.title.substring(0, 50)}...` : save.title}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {/* Smart Collection Suggestions for Single Bookmark */}
            {semanticAnalysis && semanticAnalysis.suggestions.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Smart Collection Suggestions</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSemanticSuggestions(!showSemanticSuggestions)}
                    disabled={isSubmitting}
                  >
                    {showSemanticSuggestions ? 'Hide' : 'Show'} Suggestions
                  </Button>
                </div>
                
                {showSemanticSuggestions && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on this bookmark's content, here are some intelligent collection suggestions:
                    </p>
                    
                    <div className="grid gap-2 max-h-32 overflow-y-auto">
                      {semanticAnalysis.suggestions.slice(0, 3).map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 bg-background transition-all"
                        >
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="font-medium text-sm">{suggestion.name}</p>
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded-full text-xs font-medium",
                                  suggestion.confidence > 0.7 ? "bg-green-100 text-green-700" :
                                  suggestion.confidence > 0.5 ? "bg-yellow-100 text-yellow-700" :
                                  "bg-gray-100 text-gray-700"
                                )}>
                                  {Math.round(suggestion.confidence * 100)}%
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{suggestion.reasoning}</p>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSuggestion(suggestion);
                              setNewCollectionName(suggestion.name);
                              setShowCreateNew(true);
                                                    }}
                        className="ml-3 h-8"
                        disabled={isSubmitting}
                      >
                        <FolderPlus className="h-3 w-3 mr-1" />
                        Create
                      </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Collections List */}
            {collectionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : collections.length === 0 ? (
              <div className="text-center py-8">
                <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No collections yet</p>
                <Button 
                  onClick={() => setShowCreateNew(true)} 
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Your First Collection
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Select Collections</h3>
                  <Button 
                    onClick={() => setShowCreateNew(true)} 
                    variant="outline" 
                    size="sm"
                    disabled={isSubmitting}
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Collection
                  </Button>
                </div>

                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {collections.map(collection => (
                    <div
                      key={collection.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                        selectedCollections.has(collection.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => !isSubmitting && handleCollectionToggle(collection.id)}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        selectedCollections.has(collection.id)
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      )}>
                        {selectedCollections.has(collection.id) && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      
                      <div className={cn(
                        "w-6 h-6 rounded flex items-center justify-center",
                        collection.color === 'primary' && 'bg-primary',
                        collection.color === 'accent' && 'bg-accent',
                        collection.color === 'destructive' && 'bg-destructive',
                        collection.color === 'secondary' && 'bg-secondary'
                      )}>
                        <FolderIcon className="h-3 w-3 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{collection.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {collection.count} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create New Collection Form */}
            {showCreateNew && (
              <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Create New Collection</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCreateNew(false)}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Collection Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Enter collection name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Color</label>
                    <div className="flex space-x-2">
                      {colorOptions.map(option => (
                        <button
                          key={option.value}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            option.class,
                            newCollectionColor === option.value
                              ? "border-foreground scale-110"
                              : "border-border hover:border-foreground/50"
                          )}
                          onClick={() => setNewCollectionColor(option.value)}
                          disabled={isSubmitting}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCreateNewCollection}
                    disabled={!newCollectionName.trim() || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Create Collection
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddToCollections}
              disabled={selectedCollections.size === 0 || isSubmitting}
              className="skoop-button-primary"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add to {selectedCollections.size} Collection{selectedCollections.size !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Bulk Add to Collection Modal
const BulkAddToCollectionModal = ({
  isOpen,
  onClose,
  selectedBookmarks,
  bookmarks
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedBookmarks: Set<string | number>;
  bookmarks: UIBookmark[];
}) => {
  const { collections, loading: collectionsLoading, createCollection } = useCollections();
  const { addToCollection } = useCollectionOperations();
  
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionColor, setNewCollectionColor] = useState<'primary' | 'accent' | 'destructive' | 'secondary'>('primary');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [semanticAnalysis, setSemanticAnalysis] = useState<SemanticAnalysisResult | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SemanticSuggestion | null>(null);
  const [showSemanticSuggestions, setShowSemanticSuggestions] = useState(false);

  const selectedBookmarksList = useMemo(() => 
    bookmarks.filter(bookmark => selectedBookmarks.has(bookmark.id)), 
    [bookmarks, selectedBookmarks]
  );

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedCollections(new Set());
      setShowCreateNew(false);
      setNewCollectionName('');
      setNewCollectionColor('primary');
      setError(null);
      setSuccess(null);
      setSelectedSuggestion(null);
      setShowSemanticSuggestions(false);
      
      // Perform semantic analysis on selected bookmarks
      if (selectedBookmarksList.length > 0) {
        const analysis = analyzeBookmarksForCollection(selectedBookmarksList);
        setSemanticAnalysis(analysis);
        
        // Auto-show suggestions if confidence is decent
        if (analysis.suggestions.length > 0 && analysis.suggestions[0].confidence > 0.4) {
          setShowSemanticSuggestions(true);
        }
      }
    } else {
      // Reset all state when modal closes
      setSelectedCollections(new Set());
      setShowCreateNew(false);
      setNewCollectionName('');
      setNewCollectionColor('primary');
      setError(null);
      setSuccess(null);
      setSelectedSuggestion(null);
      setShowSemanticSuggestions(false);
      setSemanticAnalysis(null);
    }
  }, [isOpen, selectedBookmarksList]); // Now safe to include selectedBookmarksList since it's memoized

  if (!isOpen || selectedBookmarks.size === 0) return null;

  const handleCollectionToggle = (collectionId: string) => {
    const newSelected = new Set(selectedCollections);
    if (newSelected.has(collectionId)) {
      newSelected.delete(collectionId);
    } else {
      newSelected.add(collectionId);
    }
    setSelectedCollections(newSelected);
  };

  const handleCreateNewCollection = async () => {
    if (!newCollectionName.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await createCollection({
        name: newCollectionName.trim(),
        color: newCollectionColor,
        type: 'manual'
      });

      if (result.success && result.data) {
        setSelectedCollections(prev => new Set([...prev, result.data!.id]));
        setShowCreateNew(false);
        setNewCollectionName('');
        setSuccess(`Created collection "${result.data.name}"`);
      } else {
        setError(result.error || 'Failed to create collection');
      }
    } catch (err) {
      setError('Failed to create collection');
      console.error('Error creating collection:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateFromSuggestion = async (suggestion: SemanticSuggestion) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Determine color based on suggestion category
      const getColorFromCategory = (category: string): 'primary' | 'accent' | 'destructive' | 'secondary' => {
        switch (category.toLowerCase()) {
          case 'technology': return 'primary';
          case 'framework': return 'accent';
          case 'language': return 'destructive';
          default: return 'secondary';
        }
      };

      const result = await createCollection({
        name: suggestion.name,
        color: getColorFromCategory(suggestion.category),
        type: 'manual'
      });

      if (result.success && result.data) {
        setSelectedCollections(prev => new Set([...prev, result.data!.id]));
        setSuccess(`Created collection "${result.data.name}" from smart suggestion`);
        
        // Hide suggestions after successful creation
        setShowSemanticSuggestions(false);
      } else {
        setError(result.error || 'Failed to create collection');
      }
    } catch (err) {
      setError('Failed to create collection');
      console.error('Error creating collection from suggestion:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCollections = async () => {
    if (selectedCollections.size === 0) {
      setError('Please select at least one collection');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const bookmarkIds = Array.from(selectedBookmarks).map(id => id.toString());
      const promises = Array.from(selectedCollections).map(collectionId =>
        addToCollection({
          collectionId,
          bookmarkIds
        })
      );

      const results = await Promise.all(promises);
      const failedResults = results.filter(result => !result.success);

      if (failedResults.length > 0) {
        setError(`Failed to add to ${failedResults.length} collection(s)`);
      } else {
        setSuccess(`Added ${selectedBookmarks.size} bookmarks to ${selectedCollections.size} collection(s)`);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError('Failed to add to collections');
      console.error('Error adding to collections:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const colorOptions = [
    { value: 'primary' as const, label: 'Blue', class: 'bg-primary' },
    { value: 'accent' as const, label: 'Orange', class: 'bg-accent' },
    { value: 'destructive' as const, label: 'Red', class: 'bg-destructive' },
    { value: 'secondary' as const, label: 'Gray', class: 'bg-secondary' }
  ];

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
          className="bg-background rounded-lg border border-border max-w-lg w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold">Add {selectedBookmarks.size} Bookmarks to Collection</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Selected {selectedBookmarks.size} bookmark{selectedBookmarks.size !== 1 ? 's' : ''}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            )}

            {/* Selected Bookmarks Preview */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selected Bookmarks</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {selectedBookmarksList.slice(0, 5).map(bookmark => (
                  <div key={bookmark.id} className="flex items-center space-x-2 text-sm">
                    <SourceIcon source={bookmark.source} />
                    <span className="truncate">{bookmark.title}</span>
                  </div>
                ))}
                {selectedBookmarksList.length > 5 && (
                  <p className="text-sm text-muted-foreground">
                    ...and {selectedBookmarksList.length - 5} more
                  </p>
                )}
              </div>
            </div>

            {/* Smart Collection Suggestions */}
            {semanticAnalysis && semanticAnalysis.suggestions.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Smart Collection Suggestions</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSemanticSuggestions(!showSemanticSuggestions)}
                    disabled={isSubmitting}
                  >
                    {showSemanticSuggestions ? 'Hide' : 'Show'} Suggestions
                  </Button>
                </div>
                
                {showSemanticSuggestions && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your selected bookmarks, here are some intelligent collection name suggestions. Click "Create" to instantly create and select a collection:
                    </p>
                    
                    <div className="grid gap-2 max-h-40 overflow-y-auto">
                      {semanticAnalysis.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 bg-background transition-all"
                        >
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="font-medium text-sm">{suggestion.name}</p>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-xs font-medium",
                                  suggestion.confidence > 0.8 ? "bg-green-100 text-green-700" :
                                  suggestion.confidence > 0.6 ? "bg-yellow-100 text-yellow-700" :
                                  "bg-gray-100 text-gray-700"
                                )}>
                                  {Math.round(suggestion.confidence * 100)}% match
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{suggestion.reasoning}</p>
                              {suggestion.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {suggestion.keywords.slice(0, 3).map((keyword, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                                      {keyword}
                                    </span>
                                  ))}
                                                                {suggestion.keywords.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{suggestion.keywords.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCreateFromSuggestion(suggestion)}
                        className="ml-3 h-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <FolderPlus className="h-3 w-3 mr-1" />
                        )}
                        {isSubmitting ? 'Creating...' : 'Create'}
                      </Button>
                        </div>
                      ))}
                    </div>
                    
                    {semanticAnalysis.patterns.technologies.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Detected patterns:</p>
                        <div className="flex flex-wrap gap-1">
                          {semanticAnalysis.patterns.technologies.slice(0, 5).map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                              {tech}
                            </span>
                          ))}
                          {semanticAnalysis.patterns.technologies.length > 5 && (
                            <span className="text-xs text-muted-foreground">+{semanticAnalysis.patterns.technologies.length - 5} more</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Collections List */}
            {collectionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : collections.length === 0 ? (
              <div className="text-center py-8">
                <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No collections yet</p>
                <Button 
                  onClick={() => setShowCreateNew(true)} 
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Your First Collection
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Select Collections</h3>
                  <Button 
                    onClick={() => setShowCreateNew(true)} 
                    variant="outline" 
                    size="sm"
                    disabled={isSubmitting}
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Collection
                  </Button>
                </div>

                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {collections.map(collection => (
                    <div
                      key={collection.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                        selectedCollections.has(collection.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => !isSubmitting && handleCollectionToggle(collection.id)}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        selectedCollections.has(collection.id)
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      )}>
                        {selectedCollections.has(collection.id) && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      
                      <div className={cn(
                        "w-6 h-6 rounded flex items-center justify-center",
                        collection.color === 'primary' && 'bg-primary',
                        collection.color === 'accent' && 'bg-accent',
                        collection.color === 'destructive' && 'bg-destructive',
                        collection.color === 'secondary' && 'bg-secondary'
                      )}>
                        <FolderIcon className="h-3 w-3 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{collection.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {collection.count} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create New Collection Form */}
            {showCreateNew && (
              <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Create New Collection</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCreateNew(false)}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Collection Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Enter collection name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Color</label>
                    <div className="flex space-x-2">
                      {colorOptions.map(option => (
                        <button
                          key={option.value}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            option.class,
                            newCollectionColor === option.value
                              ? "border-foreground scale-110"
                              : "border-border hover:border-foreground/50"
                          )}
                          onClick={() => setNewCollectionColor(option.value)}
                          disabled={isSubmitting}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCreateNewCollection}
                    disabled={!newCollectionName.trim() || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Create Collection
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddToCollections}
              disabled={selectedCollections.size === 0 || isSubmitting}
              className="skoop-button-primary"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add to {selectedCollections.size} Collection{selectedCollections.size !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main RecentSaves component
interface RecentSavesProps {
  searchResults?: any[];
  isSearchActive?: boolean;
  onClearSearch?: () => void;
}

export default function RecentSaves({ searchResults, isSearchActive, onClearSearch }: RecentSavesProps = {}) {
  // Add new state for sort and filter
  const [sortBy, setSortBy] = useState<'created_at' | 'source'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Default providerFilters to include all available providers including telegram
  const availableProviders = ['github', 'twitter', 'reddit', 'stackoverflow', 'telegram'];
  const [providerFilters, setProviderFilters] = useState<Set<string>>(new Set(availableProviders));

  // Add new state for tracking filter changes
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const filterChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update useBookmarks call to use the new parameters
  const { bookmarks, loading, error, hasMore, loadMore, refresh, deleteBookmark, totalCount } = useBookmarks({
    sortBy,
    sortOrder,
    providers: Array.from(providerFilters)
  });
  
  const realBookmarks = useMemo(() => transformBookmarksForUI(bookmarks), [bookmarks]);
  
  // Transform search results to UIBookmark format
  const searchBookmarks = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    
    return searchResults.map((result: any) => ({
      id: result.id,
      title: result.title || 'Untitled',
      description: result.description || result.summary || '',
      content: result.summary || result.description || '',
      sourceUrl: result.url,
      image: null, // Search results might not have images
      source: 'bookmark',
      tags: result.tags || [],
      savedAt: new Date(result.created_at || Date.now()),
      starred: false,
      engagement: {
        saves: 0,
        stars: 0,
        likes: 0,
        votes: 0,
        upvotes: 0
      }
    }));
  }, [searchResults]);
  
  const isUsingMockData = realBookmarks.length === 0 && !isSearchActive;

  // Fix: Only use mock data when there are truly no bookmarks AND no filters are applied
  const shouldShowMockData = totalCount === 0 && !isSearchActive && providerFilters.size === 0;

  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
  const [selectedSave, setSelectedSave] = useState<UIBookmark | null>(null);

  const [addToCollectionModalOpen, setAddToCollectionModalOpen] = useState(false);
  const [saveToAdd, setSaveToAdd] = useState<UIBookmark | null>(null);
  
  // Bulk selection state
  const [bulkSelectionMode, setBulkSelectionMode] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Set<string | number>>(new Set());
  const [bulkAddToCollectionModalOpen, setBulkAddToCollectionModalOpen] = useState(false);

  // Add state for dropdown
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setFilterDropdownOpen(false);
      }
    };

    if (filterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterDropdownOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setSelectedModel(storedModel);
    }
  }, []);

  const loadMoreSaves = useCallback(async () => {
    // Remove mock data logic from loadMoreSaves - only use real data
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
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
  }, [hasMore, loadingMore, loadMoreSaves]);



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

  const handleDelete = async (save: UIBookmark) => {
    const success = await deleteBookmark(save.id.toString());
    // The bookmark will be automatically removed from the list when the data refreshes
  };

  // Bulk selection handlers
  const handleToggleBulkSelection = () => {
    setBulkSelectionMode(!bulkSelectionMode);
    setSelectedBookmarks(new Set());
  };

  const handleBookmarkSelect = (bookmarkId: string | number) => {
    setSelectedBookmarks(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(bookmarkId)) {
        newSelected.delete(bookmarkId);
      } else {
        newSelected.add(bookmarkId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const currentBookmarks = isSearchActive ? searchBookmarks : realBookmarks;
    if (selectedBookmarks.size === currentBookmarks.length) {
      setSelectedBookmarks(new Set());
    } else {
      setSelectedBookmarks(new Set(currentBookmarks.map(save => save.id)));
    }
  };

  const handleBulkAddToCollection = () => {
    setBulkAddToCollectionModalOpen(true);
  };

  // Clear selection when switching modes or when data changes
  useEffect(() => {
    if (!bulkSelectionMode) {
      setSelectedBookmarks(new Set());
    }
  }, [bulkSelectionMode]);

  // Clear selection when filters change to prevent stale selections
  useEffect(() => {
    setSelectedBookmarks(new Set());
  }, [providerFilters, sortBy, sortOrder]);

  const currentCount = isSearchActive && searchBookmarks.length > 0 
    ? searchBookmarks.length 
    : realBookmarks.length;
  
  const totalDisplayCount = isSearchActive && searchBookmarks.length > 0
    ? searchBookmarks.length
    : totalCount;

  // Add handlers for the new sort and filter controls
  const handleSortChange = (newSortBy: 'created_at' | 'source', newSortOrder: 'asc' | 'desc') => {
    setIsFilterChanging(true);
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    
    // Clear the timeout and set a new one - shorter timeout since cache handles empty results
    if (filterChangeTimeoutRef.current) {
      clearTimeout(filterChangeTimeoutRef.current);
    }
    filterChangeTimeoutRef.current = setTimeout(() => {
      setIsFilterChanging(false);
    }, 200); // Reduced from 500ms since cache shows empty results immediately
  };

  const handleProviderFilterToggle = (provider: string) => {
    setIsFilterChanging(true);
    const newFilters = new Set(providerFilters);
    if (newFilters.has(provider)) {
      newFilters.delete(provider);
    } else {
      newFilters.add(provider);
    }
    setProviderFilters(newFilters);
    
    // Clear the timeout and set a new one
    if (filterChangeTimeoutRef.current) {
      clearTimeout(filterChangeTimeoutRef.current);
    }
    filterChangeTimeoutRef.current = setTimeout(() => {
      setIsFilterChanging(false);
    }, 200); // Reduced timeout
  };

  const clearAllFilters = () => {
    setIsFilterChanging(true);
    setProviderFilters(new Set());
    
    // Clear the timeout and set a new one
    if (filterChangeTimeoutRef.current) {
      clearTimeout(filterChangeTimeoutRef.current);
    }
    filterChangeTimeoutRef.current = setTimeout(() => {
      setIsFilterChanging(false);
    }, 200); // Reduced timeout
  };

  // Add handler for select all in dropdown
  const handleSelectAllProviders = () => {
    setIsFilterChanging(true);
    if (providerFilters.size === availableProviders.length) {
      // If all are selected, deselect all
      setProviderFilters(new Set());
    } else {
      // Select all providers
      setProviderFilters(new Set(availableProviders));
    }
    
    // Clear the timeout and set a new one
    if (filterChangeTimeoutRef.current) {
      clearTimeout(filterChangeTimeoutRef.current);
    }
    filterChangeTimeoutRef.current = setTimeout(() => {
      setIsFilterChanging(false);
    }, 200); // Reduced timeout
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (filterChangeTimeoutRef.current) {
        clearTimeout(filterChangeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border">
        {!shouldShowMockData && totalCount > 0 && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Showing your real bookmarks ({totalCount} total)</span>
            </div>
          </div>
        )}
        
        {shouldShowMockData && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700 text-sm">
              <BookmarkIcon className="h-4 w-4" />
              <span>No bookmarks yet - connect your GitHub account in Profile to sync your starred repositories</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              {isSearchActive ? 'Search Results' : 'Recent Saves'}
            </h1>
            {isSearchActive && onClearSearch && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearSearch}
                className="h-8"
              >
                <X className="h-4 w-4 mr-2" />
                Clear search
              </Button>
            )}
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
          
          {/* Add Telegram sync button */}
          <SyncTelegramButton 
            size="sm" 
            variant="outline" 
            onSyncComplete={() => {
              // Refresh bookmarks when sync completes
              refresh();
            }}
          />
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground hidden sm:block">
            Showing {currentCount} of {totalDisplayCount} saves
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={bulkSelectionMode ? "default" : "outline"}
              size="sm"
              onClick={handleToggleBulkSelection}
              className="h-8"
            >
              {bulkSelectionMode ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Selection
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Select Multiple
                </>
              )}
            </Button>
            
            {!bulkSelectionMode && (
              <>
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <div className="flex border border-border rounded-md overflow-hidden">
                  <Button 
                    variant={sortBy === 'created_at' && sortOrder === 'desc' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className="rounded-none text-xs py-1 h-8" 
                    onClick={() => handleSortChange('created_at', 'desc')}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    Latest
                  </Button>
                  <Button 
                    variant={sortBy === 'created_at' && sortOrder === 'asc' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className="rounded-none text-xs py-1 h-8" 
                    onClick={() => handleSortChange('created_at', 'asc')}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    Earliest
                  </Button>
                  <Button 
                    variant={sortBy === 'source' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className="rounded-none text-xs py-1 h-8" 
                    onClick={() => handleSortChange('source', 'asc')}
                  >
                    <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                    Source
                  </Button>
                </div>
                
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <div className="relative" ref={filterDropdownRef}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    Platform
                    {providerFilters.size > 0 && (
                      <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                        {providerFilters.size}
                      </span>
                    )}
                    <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                  
                  {filterDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                      <div className="p-2">
                        <div className="text-sm font-medium text-foreground mb-2 px-2">Select Platforms</div>
                        <div className="space-y-1">
                          {/* Add Select All option at the top */}
                          <div
                            className="flex items-center space-x-2 px-2 py-1.5 hover:bg-muted rounded-sm cursor-pointer border-b border-border mb-1"
                            onClick={() => {
                              handleSelectAllProviders();
                            }}
                          >
                            <div className={cn(
                              "w-4 h-4 rounded border-2 flex items-center justify-center",
                              providerFilters.size === availableProviders.length
                                ? "border-primary bg-primary"
                                : providerFilters.size > 0
                                ? "border-primary bg-primary/20"
                                : "border-muted-foreground"
                            )}>
                              {providerFilters.size === availableProviders.length && (
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              )}
                              {providerFilters.size > 0 && providerFilters.size < availableProviders.length && (
                                <div className="w-2 h-2 bg-primary rounded-sm" />
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              {providerFilters.size === availableProviders.length ? 'Deselect All' : 'Select All'}
                            </span>
                          </div>
                          
                          {availableProviders.map(provider => (
                            <div
                              key={provider}
                              className="flex items-center space-x-2 px-2 py-1.5 hover:bg-muted rounded-sm cursor-pointer"
                              onClick={() => {
                                handleProviderFilterToggle(provider);
                              }}
                            >
                              <div className={cn(
                                "w-4 h-4 rounded border-2 flex items-center justify-center",
                                providerFilters.has(provider)
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground"
                              )}>
                                {providerFilters.has(provider) && (
                                  <CheckCircle2 className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <SourceIcon source={provider} />
                              <span className="capitalize text-sm">{provider}</span>
                            </div>
                          ))}
                          {providerFilters.size > 0 && (
                            <>
                              <div className="border-t border-border my-1"></div>
                              <div
                                className="flex items-center space-x-2 px-2 py-1.5 hover:bg-muted rounded-sm cursor-pointer text-muted-foreground"
                                onClick={() => {
                                  clearAllFilters();
                                  setFilterDropdownOpen(false);
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="text-sm">Clear All Filters</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Bulk Selection Action Bar */}
        {bulkSelectionMode && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="h-8"
                >
                  {selectedBookmarks.size === (isSearchActive ? searchBookmarks : realBookmarks).length ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Select All ({(isSearchActive ? searchBookmarks : realBookmarks).length})
                    </>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedBookmarks.size} bookmark{selectedBookmarks.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBulkAddToCollection}
                  disabled={selectedBookmarks.size === 0}
                  className="h-8 skoop-button-primary"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add to Collection
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Only show loading spinner if actually loading and not just filter changing */}
        {loading && !isFilterChanging && realBookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Loading bookmarks...</span>
            </div>
          </div>
        ) : isFilterChanging && realBookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Applying filters...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-red-500 mb-2">Error loading bookmarks</div>
            <Button onClick={refresh} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : (isSearchActive ? searchBookmarks.length === 0 : realBookmarks.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            {providerFilters.size > 0 ? (
              <>
                <Filter className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks found</h3>
                <p className="text-muted-foreground mb-4">
                  No bookmarks match the selected platform filters: {Array.from(providerFilters).join(', ')}
                </p>
                <Button onClick={clearAllFilters} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <BookmarkIcon className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground">Connect your accounts to start importing bookmarks</p>
              </>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(isSearchActive ? searchBookmarks : realBookmarks).map(save => (
                  <SaveCard 
                    key={save.id} 
                    save={save} 
                    onShowAISummary={handleShowAISummary} 
                    onAddToCollection={handleAddToCollection}
                    onDelete={handleDelete}
                    bulkSelectionMode={bulkSelectionMode}
                    isSelected={selectedBookmarks.has(save.id)}
                    onSelect={handleBookmarkSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {(isSearchActive ? searchBookmarks : realBookmarks).map(save => (
                  <SaveListItem 
                    key={save.id} 
                    save={save} 
                    onShowAISummary={handleShowAISummary} 
                    onAddToCollection={handleAddToCollection}
                    onDelete={handleDelete}
                    bulkSelectionMode={bulkSelectionMode}
                    isSelected={selectedBookmarks.has(save.id)}
                    onSelect={handleBookmarkSelect}
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
              {!loadingMore && !hasMore && realBookmarks.length > 0 && (
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
      
      <BulkAddToCollectionModal 
        isOpen={bulkAddToCollectionModalOpen}
        onClose={() => setBulkAddToCollectionModalOpen(false)}
        selectedBookmarks={selectedBookmarks}
        bookmarks={isSearchActive ? searchBookmarks : realBookmarks}
      />
            </div>
  );
} 