"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderIcon, FolderPlus, MoreHorizontal, Plus, Star, Tag, Bookmark, PenSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for collections
const collections = [{
  id: 1,
  name: "Frontend Development",
  description: "Resources for frontend development including React, CSS and design patterns",
  count: 47,
  color: "primary",
  pinned: true
}, {
  id: 2,
  name: "Machine Learning",
  description: "Articles and papers about machine learning and AI",
  count: 23,
  color: "accent",
  pinned: true
}, {
  id: 3,
  name: "Design Inspiration",
  description: "Great UI/UX examples and design resources",
  count: 35,
  color: "destructive",
  pinned: false
}, {
  id: 4,
  name: "DevOps",
  description: "Container orchestration, CI/CD, and cloud infrastructure",
  count: 18,
  color: "primary",
  pinned: false
}, {
  id: 5,
  name: "Productivity",
  description: "Tools and techniques for better productivity and focus",
  count: 12,
  color: "accent",
  pinned: false
}];

// Smart collections (auto-generated)
const smartCollections = [{
  id: 101,
  name: "Recently Added",
  description: "Content saved in the last 7 days",
  count: 9,
  icon: Bookmark
}, {
  id: 102,
  name: "Starred Items",
  description: "All starred content across platforms",
  count: 24,
  icon: Star
}, {
  id: 103,
  name: "React Ecosystem",
  description: "Auto-grouped content about React",
  count: 31,
  icon: Tag
}];
export default function Collections() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return <div data-unique-id="2be2d68d-2faf-4fc7-8a57-52711157986c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="d1280602-d04a-452c-900e-1261000fcf18" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="929bf035-2b3f-419c-924d-84d1b33f2a24" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="c6ed736f-5570-4d8d-9976-8c17bf765344" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" data-unique-id="6a37feaa-057f-4f78-8461-74a50a9f9620" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="096caf39-7c6c-448a-87b3-16c07e904b6e" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="ac7cf065-0082-4f93-bcec-44f16794a6a2" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="132ed43d-0c9e-4c71-8cd6-3c95d4eb09e4" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="61be8db5-457a-4c99-b9b5-cfd6629c70b1" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="f0ac4218-5a0b-4a7c-a28b-23ccd4fd1fb6" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="a4e602ff-3163-4094-8e6a-877fb344b172" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="eda7a31f-63a8-4bca-9e1f-6faccb9f0750" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="781c7611-0cb4-4c28-8022-42d4040aa6dd" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="09d2e3f1-8912-4b0f-97d5-0935ae9266b8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="52fde452-6264-408c-a1cf-7dfedc33e3c5" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="214c5592-6bdf-42c5-933d-a80119eaae19" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1ff2fed4-06da-4a84-8eb4-7a8c0777b6a6" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="5d0cb715-a8c3-4e0f-aec2-ba3a66dd0921" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="c52e76c6-4823-4563-b9e2-31fac9d6365e" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="6acab34f-5d17-4b7e-ae14-6992090f835c" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="087e6d07-b367-43ae-9b75-4de0c852e892" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="54bd7c83-cedb-451f-8ada-30916a978e39" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
          </div>
        </div>
      </div>
    </div>;
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
function CollectionCard({
  collection,
  onHover,
  isHovered
}: CollectionCardProps) {
  return <motion.div className="skoop-card p-5 relative group" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="7d340934-81ca-48aa-8ad2-2c66bd7b9bc8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="ce4e2d33-c70a-4513-bd8a-8e6acdfcfdbd" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="c57137c7-831e-4d35-9347-e0d10314a428" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="06a0015a-fdf2-40e9-8fd2-910b7df2bbbb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="41adb869-f07d-4ad3-862a-15ff6f0807f1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="9c38c6e8-6ad0-46c1-9f6c-c843fc8dc726" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="7f3b4155-ade5-4be8-a1fc-64bca8dfbb6a" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="6d6556e7-c4e0-40d0-b40e-cf29141262d4" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="74c29c2d-b875-423d-a471-d166fec5e0f9" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="db6f0ecc-091b-472f-a2f9-67fcf2388de8" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="6c08cc38-6151-4cb3-870a-40aff33af1ce" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="8c033f39-e3f7-47d4-aec6-5d4a44408d69" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="0b0992bc-aa91-4c76-8d3c-29b8ddd105a6" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="395dfd13-3cde-492e-8983-6989c1d49c8c" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="141ca8bc-e13f-4ba2-8ae8-ae3a44f6878a" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="a54b7dc5-41b6-4970-b98d-bf6cbe7b51e6" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b1aac3ae-5369-4f5a-ba57-bc2b19c7f8ef" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
        </Button>
      </div>
    </motion.div>;
}
interface SmartCollectionCardProps {
  collection: typeof smartCollections[0];
  onHover: (id: number | null) => void;
  isHovered: boolean;
}
function SmartCollectionCard({
  collection,
  onHover,
  isHovered
}: SmartCollectionCardProps) {
  const IconComponent = collection.icon;
  return <motion.div className="skoop-card p-5 relative group border-primary/20" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="d59f08d5-1fd1-4ad3-b950-a0518589956b" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="c1860c02-bab1-4287-a677-f414290901de" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="87b1b710-4099-46d8-9dc7-cd711296bc9a" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="762b3085-acb5-4439-9fba-60a149b269b7" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="ee73e65e-42f0-47af-9656-f7b4d6d6086d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="4b1f7c3d-d91e-4aa4-a83c-fba8048b1dc6" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="a80cc9fc-24f7-44b0-8f2c-1fbbadf1809b" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="bbfde1d1-3e96-4ce9-aa87-2ab5c10b2b06" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="24690b2f-1aa5-4b14-ae49-80ecd7e4bd5f" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="d689c753-9365-4fe2-9926-669e628a297d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="74cfc7eb-c147-46d0-8a1e-459d4999dc36" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}