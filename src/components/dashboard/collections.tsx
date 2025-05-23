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
  return <div data-unique-id="1596a5b6-3e6b-48bd-a3fa-17f2296b7e37" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="fd625057-bc64-4619-aff0-838a55b3a3aa" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="0e0c6c90-1063-4b32-9737-42b459f811ac" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="6b3b8560-4692-47c5-b796-1ef3483d6842" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" data-unique-id="cacdc277-2b93-4e2c-ba0d-ade4865aa47a" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="8b417dbb-bd97-41ac-b012-229c0e82a033" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="8c2e5d2b-8db8-43ea-9b2f-4910bd9e950c" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="0adff74b-ff45-40d4-aad1-68c92863f03d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f711837d-2e1d-483b-8a52-ab3ec6c53eac" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="8cb2fe75-4da3-4703-8ce9-d2a3b0efd914" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="e5232a88-f03f-4c0a-88a3-51c96e7434b1" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="65384dec-1253-4d90-95cf-fbcce080a3db" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="a8fd86bc-424e-40f0-b051-ab632665476b" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="800c1dcd-c937-404e-90b8-293bd5fb52e3" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="7004c486-15b8-4023-b892-3f45bab0b698" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="eca31671-e12a-41b8-a7ad-20d1aaab93e6" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="96d563e1-88c3-43bb-b4c1-0963ab9cd3fe" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="bf563785-d60e-4956-b325-91d17433223f" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="ee2d9947-5309-4d85-aa98-d689cb76b7aa" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="af24a39b-a5e5-4c65-a555-f30c1376209a" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="83f0c758-97af-47b6-899e-49fdcd897103" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="93c14b49-ccd6-49ec-9a43-7dd9b845f417" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="a86ff3c1-8aa5-4bbb-af26-a2ead50f9905" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="c9fcf751-ea1c-4a44-8126-9a2080890954" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="e5cf974a-10b5-4b9e-9f1a-312336edc770" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="79c8d847-5d2f-479a-846f-04e69b746a8b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="76c92cab-4cec-4132-a195-071b5503a47c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="d0bb4fa1-3e44-48ba-bbb7-d1ff9366d8dc" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="37c5c4e0-cd6a-49d2-a045-da85d1435c04" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="1eee0168-99f7-4639-8dbd-009bdad6bc5d" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="2b29b1ce-2881-44aa-8254-338d13d9d016" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="de2564c1-c161-4638-b105-b29881638de2" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="725b0f2b-2b33-40a7-ad15-505595b806f3" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="bb36c211-7882-450d-a4ec-94c2e3d3ccb3" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="af1f8714-29b9-4071-bb6c-49dda5a2bcd0" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="bb9780fb-94aa-4723-99f2-41fb6279a634" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="b7eebce8-654c-433b-b443-ea83fce34974" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="e9ae7f6c-a3c5-421f-9bef-af3a13ac1fa8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="8d24c9d2-d351-4f21-8cdf-14e99419e08d" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="5a0c121f-a8d1-4bd1-8db3-77c7d48bfa15" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="9569bc89-ce4a-42b4-b67b-748767f9baa5" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="3c93efe8-fc32-43aa-9881-90edb6a066f1" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="ca104d3b-f368-4f38-bb85-e5050bc39f38" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="de790a74-0b07-438c-9845-e100a6a506a2" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="7c857e77-ef6b-4677-b46d-b3723bd27acd" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2c4e4c81-331a-487a-a8da-b0c14283266d" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="f238d720-2bdb-4d31-95b4-b9882a9b00af" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="9e62fa6d-f409-4b95-8641-46b8032c4ec8" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="1521a310-ebd4-450e-93f2-08bab324f059" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="03fb32a9-2e9a-4e41-9d42-db7e7cc7f686" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}