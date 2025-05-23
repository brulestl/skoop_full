"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderIcon,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Star,
  Tag,
  Bookmark,
  PenSquare,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for collections
const collections = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Resources for frontend development including React, CSS and design patterns",
    count: 47,
    color: "primary",
    pinned: true,
  },
  {
    id: 2,
    name: "Machine Learning",
    description: "Articles and papers about machine learning and AI",
    count: 23,
    color: "accent",
    pinned: true,
  },
  {
    id: 3,
    name: "Design Inspiration",
    description: "Great UI/UX examples and design resources",
    count: 35,
    color: "destructive",
    pinned: false,
  },
  {
    id: 4,
    name: "DevOps",
    description: "Container orchestration, CI/CD, and cloud infrastructure",
    count: 18,
    color: "primary",
    pinned: false,
  },
  {
    id: 5,
    name: "Productivity",
    description: "Tools and techniques for better productivity and focus",
    count: 12,
    color: "accent",
    pinned: false,
  },
];

// Smart collections (auto-generated)
const smartCollections = [
  {
    id: 101,
    name: "Recently Added",
    description: "Content saved in the last 7 days",
    count: 9,
    icon: Bookmark,
  },
  {
    id: 102,
    name: "Starred Items",
    description: "All starred content across platforms",
    count: 24,
    icon: Star,
  },
  {
    id: 103,
    name: "React Ecosystem",
    description: "Auto-grouped content about React",
    count: 31,
    icon: Tag,
  },
];

export default function Collections() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <Button className="skoop-button-primary">
          <FolderPlus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Pinned</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.filter((c) => c.pinned).map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onHover={setHoveredId}
              isHovered={hoveredId === collection.id}
            />
          ))}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Smart Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smartCollections.map((collection) => (
            <SmartCollectionCard
              key={collection.id}
              collection={collection}
              onHover={setHoveredId}
              isHovered={hoveredId === collection.id}
            />
          ))}
        </div>
      </div>

      {/* All collections */}
      <div>
        <h2 className="text-lg font-medium mb-3">All Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.filter((c) => !c.pinned).map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onHover={setHoveredId}
              isHovered={hoveredId === collection.id}
            />
          ))}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm">Create a new collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorClass(color: string) {
  switch (color) {
    case "primary":
      return "bg-primary";
    case "accent":
      return "bg-accent";
    case "destructive":
      return "bg-destructive";
    default:
      return "bg-primary";
  }
}

interface CollectionCardProps {
  collection: typeof collections[0];
  onHover: (id: number | null) => void;
  isHovered: boolean;
}

function CollectionCard({ collection, onHover, isHovered }: CollectionCardProps) {
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
        {collection.description}
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
      <div
        className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </motion.div>
  );
}

interface SmartCollectionCardProps {
  collection: typeof smartCollections[0];
  onHover: (id: number | null) => void;
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
