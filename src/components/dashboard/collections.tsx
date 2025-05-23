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
  return <div data-unique-id="d6e9afe4-93b4-41c1-8540-bc1b0483413d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2" data-unique-id="924cec02-9d97-4d36-b70c-31fced538e8a" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="438272ac-9db6-4922-8335-c0191aca2c2d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="5bdd9e31-581c-494b-8a17-9118cc1a7d2b" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary w-full sm:w-auto" onClick={() => setNewCollectionOpen(true)} data-unique-id="f4f3624f-fcfe-497e-9234-2ccbfae3b27f" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="486cb632-b33e-40f0-b6c5-ad48835f7bb0" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="c94db6ae-43aa-415b-b49b-ca139ee769a7" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="6ab5d497-1d19-49aa-8079-bbf2cc1e5959" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="3556107b-f1c2-46b5-8821-09f718182c51" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="07df142e-d907-43df-8a70-ee21227a70d7" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="0071b1c5-f0a1-44f7-a13d-2a498814033a" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="9b187d95-521e-43fa-bd6e-4a08ccbfe507" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ab380a52-b928-43df-b679-4c014f0e2dda" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="0edc41d0-f7e0-486f-927b-0f99619a3095" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="5ee0e93e-1618-4d81-aa5c-47fb25006176" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="e71915c3-31ab-4f65-8107-78f68f993cea" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d39a2499-2469-4504-a39d-1f15e05fbb52" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="dc2dde80-f555-45bc-af88-996cb72d9a66" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="4ed0f383-7ed1-4961-b957-177e27b74d67" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="6648ac52-b475-4c16-8000-5fd1fd8b1693" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="16fa3217-a09d-42cd-abd4-03ef540bdfed" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="969385f2-3a08-4b33-bf50-93a330ded622" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="6af89b3f-6249-4ba9-a7f5-5e343b8775db" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="afa65a23-eb7f-4d91-b308-0974f2db9aac" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="48ef65f9-b0b3-4df7-ba97-3bfb46f0a40a" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="61e39f73-e154-4a0d-82c5-6b1afdab479c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="c50e994e-7d07-4d63-b156-db9868d53657" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="6177fc86-bfac-4ca1-b24f-cade64a15f37" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="2f893363-134b-424a-9c52-772a2e5ec773" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="8eeb20d2-d0eb-4656-9ac7-cba1f52aa0fa" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="08791330-abe3-4d28-a931-4ba379c3d855" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="0e99e997-2cc7-48d2-8e45-c6c95e13c5a9" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="7dcf22d5-7c23-4d99-ad92-a0f44593a2d8" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="7ee8e0de-ed54-4f8a-af89-d9673d4f1941" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="a63d0947-5431-43e6-a250-16a9edbac099" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="9afd3c5c-055a-4940-88c1-60bf5e241aad" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="db4f2ca2-ec74-4492-9d80-cf8d55b3d102" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="c0adeb02-0e20-403f-9aec-4ab94d4baa12" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="363a9579-e052-4bfe-86d8-c2f4f8f3f936" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="e904be5e-6fd3-4cb1-8b7c-445a369fe0ca" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0db4a0a5-45b5-4055-839c-d74da612ca0f" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="12e9ab63-4840-4d3c-ae95-f6d49cb7ec08" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="f38cfe40-605b-41cb-b79b-1e5859e5efd2" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="039ab088-d2f9-43ae-a064-5a56285cd2b1" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="a3c321d4-60d1-4f7d-bb2e-2f5b382b8143" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="0d5cafbc-19e5-4300-a9b9-96ceb3be8272" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="fe96ec97-b050-4337-8b9c-71a0710e75d6" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="adbde162-8336-4b52-ac1d-f61fb309f9f6" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="06c6b588-2787-4efb-b665-23455a453a80" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="539a3e38-acc3-4361-8092-42236f8667fa" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="f7557ba0-d03e-47fa-a94c-05d561956725" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="2f8181f0-1497-4497-ac3b-162284fddba8" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="2df90d9f-d7be-4382-b86f-6e3fdd1e508c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="376517f8-3154-41f7-b334-917a353618e2" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="0432545a-0883-4d46-bc41-d9a975fd2548" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1c98451c-d9dc-4e1a-8c35-ca61e518b819" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="27f67cc6-e70f-4d26-ad04-1d60f2b17cc7" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="c854362a-4544-4980-9de8-db2b009bebff" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="802607d6-aeaa-45f1-bb67-7cb8299ff914" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="170b225b-1536-4a66-a32b-d16550c55b4a" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="2b001493-d20f-422e-9d8a-45fdd214d49c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="a3804b7c-03f5-4b52-945d-0b20338f0658" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="410a4104-49cf-4aff-bf33-ab9df10e6c00" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="8608d1b0-67e4-4d0a-bde1-11ee6fcb4723" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="4c304a48-bbdc-4365-a0a7-8f8cff5b0362" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="41ef885f-0756-4f17-a65d-547446f4de01" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="83e0a3cd-5df1-404c-8f71-49407ae1b9b6" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="6224c0f4-dc9b-4f6e-b2af-4117d6cf2aa8" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="cb98a984-a1bf-4191-bd01-c567bae7e4ba" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="c509a56d-7f63-459e-b39b-096d6af705ab" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="c9a4bae3-28d7-4d03-91a0-af13493081bb" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="1705d3c2-c081-4cd7-a75f-bc2d1b0b445d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="07f0ec9a-f36f-4dc0-acfa-7e7dfd36b800" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="a2ac524a-d024-4f01-b787-f68f7a51b872" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="ff0cf59a-06fe-44d8-b690-e29774023289" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="40c43b8b-d2a7-4bda-9685-349b5eacee7f" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="06e214ae-ee44-4903-8d19-ea0c21540fa1" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="3dbffcee-46e6-44af-be93-25e0a3cccfe2" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="3495c1e3-c79f-47e1-9894-f71acdf37292" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f1b47b83-13b7-43b8-91e2-0543e005b34f" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="e4e790da-acc6-4134-9858-c7b141a8761e" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="ecfcabd0-306c-4b6c-bf8e-1f88a00fa3aa" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="97b8bf9a-1bd2-42bb-8883-cf740b2d3acb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="11bc558d-7a00-463a-9e80-46925ca0536f" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}