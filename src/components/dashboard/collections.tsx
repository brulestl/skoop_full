"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderIcon, FolderPlus, MoreHorizontal, Plus, Star, Tag, Bookmark, PenSquare, Trash2, X, Check, CheckCircle2 } from "lucide-react";
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
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  return <div data-unique-id="2cff7c63-ebb6-440d-8fd4-5339e21d7031" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="36c15727-877c-4baf-91a2-807146615233" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="8b0bf854-766e-4616-84e9-fa42af2f5a25" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2a0247db-a977-40db-a609-c1832b2a7b95" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" onClick={() => setNewCollectionOpen(true)} data-unique-id="19470970-cdb9-498c-bc98-29ae39b4b9f7" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7ca86048-e059-4211-8163-8061876724d6" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="df8acba1-f82f-4ea0-8085-f98898be617e" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="15a1dd7c-3823-4641-ae2f-b5ee65375c90" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1413c073-f126-44d4-a8a1-d44edf902d44" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="d42afdc0-40c2-40fd-8a61-ec30710969de" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="f1d264b6-f7b9-4201-a0bc-b5ec26ba0a2a" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="2cfeefdd-dd4b-47b7-bf2a-59b77382f26c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="e6b817e3-9a52-4ac1-8e84-0154134c0060" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="8dd6dbe5-6a4a-405d-b316-3fe61131abdd" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="450cdd1e-1b46-470a-93fb-050089131e12" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="62bf4043-641c-47b6-93da-c6223b724ca3" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="910ce1c8-7b3a-4dd1-bf8a-68a43089dff8" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="052bdd8c-439f-4424-9c73-b3546d94fe45" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="4b60ea1f-98c6-4e4f-a43e-826bb7a92aac" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="622a3bdc-3eff-4c66-8247-1e16716cbcf6" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="d1565e0a-de21-48f7-834c-2500d4940618" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="5d5dd337-3e16-4fae-8d23-d8175b19f7ce" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
          </div>
        </div>
      </div>
      {/* New Collection Modal */}
      <NewCollectionModal isOpen={newCollectionOpen} onClose={() => setNewCollectionOpen(false)} />
    </div>;
}

// New Collection Modal Component
interface NewCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const NewCollectionModal = ({
  isOpen,
  onClose
}: NewCollectionModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<string>('primary');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Color options
  const colorOptions = [{
    value: 'primary',
    label: 'Blue',
    class: 'bg-primary'
  }, {
    value: 'accent',
    label: 'Orange',
    class: 'bg-accent'
  }, {
    value: 'destructive',
    label: 'Red',
    class: 'bg-destructive'
  }, {
    value: 'secondary',
    label: 'Gray',
    class: 'bg-secondary'
  }];
  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success - here you would actually create the collection
      console.log("Created collection:", {
        name,
        description,
        color
      });

      // Close the modal and reset form
      onClose();
      setName('');
      setDescription('');
      setColor('primary');
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <AnimatePresence>
      {isOpen && <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} data-unique-id="1f466c26-4574-4a25-a708-e328183a90d5" data-file-name="components/dashboard/collections.tsx">
          <motion.div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md overflow-hidden" initial={{
        scale: 0.95,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.95,
        opacity: 0
      }} transition={{
        type: "spring",
        duration: 0.3
      }} onClick={e => e.stopPropagation()} data-unique-id="2e984bdd-3d10-4c7f-b04e-6283486ea795" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="022b58d3-9fe5-4ac3-95ed-0dde4ae73339" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="0d9a0b78-6a7e-4f78-a9fc-947d585b7ed0" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="7f766b79-6ddb-4c25-a901-86daeb4691dd" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="de542427-cbb5-4044-9bb1-e866d5fba154" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="fca89c26-a747-46e6-9c6f-9a1012d55dff" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="8e8b592f-9c67-4214-bc67-5765f74a59b7" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="387b0419-f632-4096-b1e1-9611be13bcb2" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="ec2ad59a-6cd9-4078-bcd9-9ea8f4d6abd3" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="931957fd-a0fc-4a8d-adb6-471109305540" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="8cf7de78-9d97-4eea-8b0e-c9463e1aa561" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="bc627a23-1ae0-4bfa-912c-4081be46005a" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="8c296210-8c2d-4214-99c2-dc927dd29c7a" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="79dfb02f-3914-4eae-bb4b-cfdb4c0aa0cc" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="619fbd71-387c-43ab-9bb6-9984ef91740d" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="395b98eb-f8a7-4efc-bee7-25ef7650c5f7" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="2a277e44-16ff-4bed-b983-37bebd04077c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="4f415330-88f1-4f62-a03a-84f9f54d2b16" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="beb77a66-93bb-4a40-b4c1-d89cb03036ba" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="30911958-4648-443b-b0c4-a5f480cae70d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="71d6b1d9-cdab-4c5a-8634-af2bb1b269de" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="3d776f6c-4ef4-4f93-aea4-bb0932cd36e4" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="e0b5b056-5023-4aef-84d3-af61bd7c99eb" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="24ebaa93-6e0c-46e5-a8f7-cba988c286bf" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="5dcafe77-cc83-46be-aea8-52f83bc1b310" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0ebcf106-c394-4202-a907-645f1c52ee83" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="9cde5cb4-affa-4f93-b8bc-971a86d32248" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="1d2d5d5a-5d87-41af-9016-029e5f07f19a" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="91aff537-6f80-44cb-bf3a-e0d41d7b3ef5" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="fe5095b9-b159-4850-b201-ffaa2256f69a" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="80887c75-4fb7-4d67-a63f-6d9c1b0649e5" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="950e2d48-4ed0-4d87-b17f-c1480646b01d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="edd6dec5-03a4-4c25-a136-538cc72376d5" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
                  </>}
              </Button>
            </div>
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
};
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="8a353929-2fc9-4e14-92dd-d613a73c0e6b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="48ee9acc-0887-45ad-ac33-794ea664ee3b" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="9d175fd4-88d0-4f9b-9bba-887ef3260965" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="fdd959ab-b520-4bcc-82c7-8640038432aa" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="dc178e20-d55a-4e8a-8d33-e9a7341dd2ad" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="37ace99b-065d-4b3f-9601-4acdaff171a1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="0a42e880-d988-415d-8e1e-c0325c126276" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="9c01eb9a-990a-4756-bec8-8fd33cb32b00" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="936ae0e1-0f30-4a40-a90f-5f54967aa711" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="b0bc5876-35b8-48f1-915c-8593752a3d74" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="3e28d3a6-4d0c-46dd-83d8-31737bd87c8b" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="5eaeaa85-7ccd-4d70-b992-707ecb1f04f8" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="d259cc0b-344c-4529-b1d4-fe60c3e5a985" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="9cb60f06-fd9a-4ebf-8ad4-7c0e27283072" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="b079dbb3-d66b-404c-bfd8-5668fccbf21b" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="9a571876-82b4-4caa-aa71-e81275bc1667" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2cbafd35-6a43-43fa-a296-55ce1c3070e9" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="b3124dd3-4761-42e4-b1e5-d6faa0876599" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="ab88077b-b7c7-4605-abd4-7446d9e41670" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="abb401a0-e4ef-44bb-9ddf-0821a6bb1b63" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="9a65921d-124a-451a-af9d-615de663f137" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="0d54ae0d-d573-4aea-8c6f-f8f31f4f6eaf" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="fc0674fb-5661-4ac7-90d3-9e6a45ff90a4" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f35bebca-ffe7-4789-9dee-9415f493eca3" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="cc95c6c3-2bd1-45c7-b13b-3128fb0bb9fc" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="17a5445b-0668-4177-aa9e-14bdd3f75fa5" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="c49274bf-f07e-41da-909a-ec98a786e889" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="eb505d01-985d-4227-af02-b510136966da" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}