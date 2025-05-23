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
  return <div data-unique-id="c7e295cf-2b03-4ed2-8820-27f1566fca2f" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="b016443b-1116-4474-9253-7c0c63488107" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="6204a172-1c1f-4d72-983e-9bc61eb6af13" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="cba53d63-4501-49aa-b296-fc8cad3739f0" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" data-unique-id="93a9480a-efe2-4b4c-b845-7f799c29f722" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="8dca791f-a725-49a8-90d3-71f2661e6321" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="270a97e8-6daa-4666-9c3d-063c4e9ee224" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="c3337e25-db09-43ed-aea3-13570fe0d577" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0eb899bc-28b7-43b6-ac52-8df7d0d15832" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="e624e9a4-1d5b-4d92-a0ef-fd3dc0b44883" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="69097ce6-c6ca-4478-8e5c-e16606b61648" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="7c89373e-a8b6-4b79-b3b6-09de29289e62" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d5e70a2b-88c3-49fc-a4a0-9c332fe16b85" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="9c0b4b68-6d44-49d5-96a5-e5fc6fe549f7" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="f2daf67c-8f73-4c79-9654-0bb9357914a1" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="9e481e11-9faf-4fd6-b355-b48f95fb02f7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d0da1d42-f11e-4196-997c-af1785f65da6" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="483f3426-03e7-4cff-a8b4-3d20b74e77c5" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="ace706a4-2666-4d73-af02-a6012a4ad227" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="4f0bd477-0ee8-4ba5-9ae3-2b37dbe6f00b" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="f09f84ea-ef17-4ead-8c2d-6a490eb4e7b0" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b3a719ff-b16e-43da-80e0-4cb5ff076713" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="95eeef15-fcfe-484e-ac45-9d3a36674bc9" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="d6ec2a36-2e19-47db-8d16-6b9aec3d4b16" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="d28f8bed-33a5-424f-b23e-a7a3cbf510ea" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="e381084f-86bd-4436-94a7-2ecc74fa44f1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="dba4e1cb-9026-4894-8d2a-55a886bd3052" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="1561e5ee-886c-445b-927f-8f02f1ee4686" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="e700ce6e-2f9c-4554-b849-ed55aed80544" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="cf6d7dc4-bde5-4010-9f71-2d0707181b1c" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="f77e00b9-beff-4397-9b90-76a6a9b10c47" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="91b079a5-8264-4eda-935b-ce1a6317a23a" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="a161add2-969b-4f2c-b086-83e6b4d54605" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="c9808756-3cfc-4b92-be69-42aad54b6372" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="2b78a16f-b75c-404c-a5af-a00c61e41959" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1291c379-1005-43b0-9d82-3b65d22aff2b" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="8151691c-a42c-4177-8d83-c6fea1b6868e" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="97f1badf-f364-4674-af68-f3703a1e75d7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="9b485f5e-c5b5-4b6b-a2d0-c2eb7edb00a7" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="03b33739-4a7d-4381-be74-7ab178798fbf" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="c6a890c3-70f5-41e3-adc4-d920e8b99fb2" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="d25cd2d5-4f09-405d-a67d-22a1a3f21853" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="f4c19971-5f74-4aaf-a5a9-62a695ac8bfa" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="6dc06ec8-95f9-44f6-ad7e-2ed630569366" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="7698ea1c-a0c4-40cd-aeb2-f58d756588dd" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="714962ba-1c75-4fe2-92df-628664c20fbb" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="712cd167-8c57-464f-a4f2-9215c215e986" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="60a07094-6fa9-446f-9fe5-85ce9cbea65a" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="a0056c80-b5d5-48e4-b49c-1c33ffa52ed8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="b6e79f8e-09f4-422c-ab28-116a47332669" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}