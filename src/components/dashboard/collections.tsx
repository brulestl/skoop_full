"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderIcon, FolderPlus, MoreHorizontal, Plus, Star, Tag, Bookmark, PenSquare, Trash2, X, Check, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCollections } from "@/hooks/useCollections";
import { CollectionWithCount, SmartCollection, CreateCollectionInput, CollectionColor } from "@/types/collections";

export default function Collections() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  
  const { 
    collections, 
    smartCollections, 
    loading, 
    error, 
    createCollection,
    updateCollection,
    deleteCollection 
  } = useCollections();

  // Handle collection creation
  const handleCreateCollection = async (input: CreateCollectionInput) => {
    const result = await createCollection(input);
    if (result.success) {
      setNewCollectionOpen(false);
    }
    return result;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-destructive mb-4">Error loading collections: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const pinnedCollections = collections.filter(c => c.pinned);
  const unpinnedCollections = collections.filter(c => !c.pinned);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <Button 
          className="skoop-button-primary w-full sm:w-auto" 
          onClick={() => setNewCollectionOpen(true)}
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>

      {/* Pinned collections */}
      {pinnedCollections.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Pinned</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedCollections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                onHover={setHoveredId} 
                isHovered={hoveredId === collection.id}
                onUpdate={updateCollection}
                onDelete={deleteCollection}
              />
            ))}
          </div>
        </div>
      )}

      {/* Smart collections */}
      {smartCollections.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Smart Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartCollections.map(collection => (
              <SmartCollectionCard 
                key={collection.id} 
                collection={collection} 
                onHover={setHoveredId} 
                isHovered={hoveredId === collection.id} 
              />
            ))}
          </div>
        </div>
      )}

      {/* All collections */}
      <div>
        <h2 className="text-lg font-medium mb-3">All Collections</h2>
        {collections.length === 0 ? (
          <div className="text-center py-12">
            <FolderIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No collections yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Collections help you organize your bookmarks by topic, project, or any way that makes sense to you.
            </p>
            <Button 
              className="skoop-button-primary" 
              onClick={() => setNewCollectionOpen(true)}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Create Your First Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpinnedCollections.map(collection => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                onHover={setHoveredId} 
                isHovered={hoveredId === collection.id}
                onUpdate={updateCollection}
                onDelete={deleteCollection}
              />
            ))}
            <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full mb-2"
                onClick={() => setNewCollectionOpen(true)}
              >
                <Plus className="h-5 w-5 text-muted-foreground" />
              </Button>
              <p className="text-muted-foreground text-sm">Create a new collection</p>
            </div>
          </div>
        )}
      </div>

      {/* New Collection Modal */}
      <NewCollectionModal 
        isOpen={newCollectionOpen} 
        onClose={() => setNewCollectionOpen(false)}
        onSubmit={handleCreateCollection}
      />
    </div>
  );
}

// New Collection Modal Component
interface NewCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateCollectionInput) => Promise<{ success: boolean; error?: string }>;
}

const NewCollectionModal = ({ isOpen, onClose, onSubmit }: NewCollectionModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<CollectionColor>('primary');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
      setColor('primary');
      setError(null);
    }
  }, [isOpen]);

  // Color options
  const colorOptions = [
    { value: 'primary' as CollectionColor, label: 'Blue', class: 'bg-primary' },
    { value: 'accent' as CollectionColor, label: 'Orange', class: 'bg-accent' },
    { value: 'destructive' as CollectionColor, label: 'Red', class: 'bg-destructive' },
    { value: 'secondary' as CollectionColor, label: 'Gray', class: 'bg-secondary' }
  ];

  const handleSubmit = async () => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        color,
        type: 'manual'
      });

      if (result.success) {
        // Close modal (form will be reset by useEffect)
        onClose();
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

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-medium">Create New Collection</h3>
              <Button variant="ghost" size="icon" onClick={handleClose} disabled={isSubmitting}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Collection Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background" 
                    placeholder="Enter collection name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Description (optional)
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" 
                    rows={3} 
                    placeholder="Enter collection description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1.5">
                    Collection Color
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorOptions.map(option => (
                      <div 
                        key={option.value}
                        className={cn(
                          "relative flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all",
                          color === option.value 
                            ? "border-primary ring-1 ring-primary ring-opacity-50" 
                            : "border-border hover:border-primary/50",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => !isSubmitting && setColor(option.value)}
                      >
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} />
                        <span className="text-xs">{option.label}</span>
                        
                        {color === option.value && (
                          <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!name.trim() || isSubmitting} 
                className="skoop-button-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function to get color classes
function getColorClass(color: CollectionColor): string {
  switch (color) {
    case 'primary': return 'bg-primary';
    case 'accent': return 'bg-accent';
    case 'destructive': return 'bg-destructive';
    case 'secondary': return 'bg-secondary';
    default: return 'bg-primary';
  }
}

// Collection Card Component
interface CollectionCardProps {
  collection: CollectionWithCount;
  onHover: (id: string | null) => void;
  isHovered: boolean;
  onUpdate: (id: string, input: any) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

function CollectionCard({ collection, onHover, isHovered, onUpdate, onDelete }: CollectionCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${collection.name}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await onDelete(collection.id);
      } catch (error) {
        console.error('Error deleting collection:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div 
      className="skoop-card p-5 relative group" 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => onHover(collection.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`}>
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {collection.description || 'No description'}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
          {collection.count} items
        </span>
        
        {collection.pinned && (
          <span className="text-xs flex items-center text-muted-foreground">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" />
            Pinned
          </span>
        )}
      </div>

      {/* Action buttons - visible on hover */}
      <div className="absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
          <Trash2 className="h-4 w-4" />
          )}
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </motion.div>
  );
}

// Smart Collection Card Component
interface SmartCollectionCardProps {
  collection: SmartCollection;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}

function SmartCollectionCard({ collection, onHover, isHovered }: SmartCollectionCardProps) {
  const IconComponent = collection.icon;
  
  return (
    <motion.div 
      className="skoop-card p-5 relative group border-primary/20" 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => onHover(collection.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{collection.name}</h3>
          <div className="text-xs text-primary">Smart Collection</div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
          {collection.count} items
        </span>
      </div>
    </motion.div>
  );
}