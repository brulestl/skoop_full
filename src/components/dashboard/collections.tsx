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
  return <div data-unique-id="064b5eb5-9bf5-463a-9cb0-6de8e723df3b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="3fb00a1c-ef0f-4194-aef9-6829b36e3a1b" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="f8e03fc7-e3b0-4944-b3ff-971e142be3d7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="8ffad457-b2b0-47ad-a52a-4d359fd89134" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" onClick={() => setNewCollectionOpen(true)} data-unique-id="07592673-8187-4dc6-b29d-c53ad0b389bf" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c79e09aa-3650-4659-bab9-840ab46e1c4e" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="71c194cd-92c2-4cb0-a610-afeb92805e43" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="d4dc81cc-419a-46bf-acbc-63ca11525bac" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="7f80b37d-9de1-4cc2-978b-b391505b79b5" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="e1b9c02b-7482-4064-ac83-ec6c20bfc234" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="72da7a0a-90e6-4de2-9d67-4badd62a4db1" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="e2e31789-44e5-444e-aada-a9c196dfcc12" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="5498576a-8eeb-4898-bbcc-065f9d70642d" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="fce7f308-6826-4f41-b297-33a13989816d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="939b8ad6-78be-4304-90b3-e02e1b4b37c5" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="2a139704-aef7-4743-a8fd-edd6cbdf42ff" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="69fdc7c7-48d2-4f55-bc41-55c350ab9c71" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="936e0b93-94f6-4dd0-a146-0f4a88968be6" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="bb40572c-9c69-4926-adf7-12f9fd2b018d" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="6c14d452-fc47-4c9e-9775-7f4e55751021" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="0b308d73-c692-4f68-ab9b-eedd51c4155e" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="3d33d034-b61d-4da0-b48c-b7af172f9c38" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="1ccd4168-e521-44fb-8b1c-1156e7d54f88" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="28f61883-2e3a-4922-8fef-16f66f308642" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="7add4fe9-adbd-4448-82f5-3c011d33f77d" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="b6eb0a46-c648-44b9-ad88-16b1a8677307" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1d4b85a3-0079-484f-adf7-a77aa41a651e" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="64e07057-60ee-4582-9184-2d2682bc7b6b" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="e91014d8-18f8-4e40-816f-45ebe15a2ea5" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="fd26b0d0-a256-4180-bff7-94109e6bdf8b" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="586222b3-1ff3-4b01-97de-d589c7dd949e" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="7e10fbd3-8937-4b7b-b61b-c4a8117f57d4" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="053cb004-9048-4ccc-b970-d85785744987" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="0524714b-e70a-4002-b7b9-f82e90c65ac5" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="1448e256-5788-4237-a107-7a797df8b35c" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="dd444e63-6830-4e3c-b007-4fc6e91e6b8c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="10c95cb8-7c6e-4c13-baef-93a6c9654ca8" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="da5a7fe3-8667-4f19-9873-ff3a4f527c26" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="c95dc4ff-5298-4eff-bf37-71d6eba30cd1" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="9dd79911-4b8a-4cfd-b4a9-d2a4499fe560" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0167e3d4-4396-4723-bd1a-6a535d11b1a8" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="e35fc424-0927-4e0e-bd3c-7d2476dad1f5" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="ec4fed4a-9b48-495e-9689-292f283ed1f2" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="55ffdc33-076e-4d0c-8b59-d58834d13a67" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="d1dad885-16fe-4ffb-adfc-432289075a3d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="b535aa48-da5e-4dd0-ab94-4fd901921c3e" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="158ceb73-0d05-4d9b-94e1-324eb47ceba0" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="82d443a9-c2d6-4d5b-9c60-d8784fa274b8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="4462723f-7da2-49b4-bb12-a2235e7bea6d" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="1ae0561c-8b91-4379-9558-53cd82f840ea" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="b42898e8-fe3d-4c05-9d9e-9592488dcf51" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="4075a091-e2a5-49ab-bdd8-b82ce37e20af" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="20278af5-78bf-480d-9071-3e1ca2699040" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f4daea62-4cc3-4546-996f-de6f83f899c3" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="11de990d-986a-4f3e-99f2-3659bfe44148" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="50f999b1-776a-4a10-b292-5aa684a1641d" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="93a43ad7-b4f8-4b3c-8fa6-f2f90a942c1c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="f707d5a5-6377-4c89-a708-5f4a2eb36ae7" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="c8eb3db1-3811-477b-bd9e-ed9b11224071" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="f053bf7c-266a-4b99-aa77-1db0052370d5" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="95aaa15b-5f04-4ba9-bc47-e7f8edd154fb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="e2abdccf-0183-4bb7-b386-ea0ec185f06b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="768ebab6-eee4-452e-92d8-120ce3231d54" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="d62d0db9-7410-4c59-b8b9-ac4c6e33e919" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="6270a4ac-5203-4f5f-b5a8-0b781039fd1f" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="6460065f-4431-4251-9fb1-26915834907a" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="a0d35a83-d80d-45fa-8d41-3db0835ab7b7" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="32efddef-56d4-43c7-82dc-6ebcd2376572" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="6f31ffa4-087d-41b5-bb15-ecbc81eb871e" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b44b82df-3310-459f-a1a4-b04eeaaa59dd" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="dc7c914c-147c-47fd-bb4d-5706c5419773" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="a075324e-6335-4be4-8ae2-a04445590928" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ee8f9cc7-0773-48f7-a4de-6b2725437544" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="b0407b2c-72cb-40ee-976a-a84adb33a056" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="2a0925b0-6157-494d-938d-824858a14a93" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="68e062a2-d0d7-42a4-9dbf-5e7d389b64a4" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="2ddb6205-2f43-4b7e-a1c4-ffb029ccf4e1" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="b0dc9228-6c7e-456b-9375-cfbf90d38271" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="9f580e35-f42d-4152-8a15-b70a4bed41e8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="8eb032f1-10b5-406c-ad4d-7a7e7d49d84a" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="4f12980c-1f0e-42e5-8128-923533f7f01a" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="05525bbb-a8e8-4b31-a1c2-959337b6f2f0" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="71151d3f-d170-400e-8c2d-8b1482dfc230" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="89f45df4-7308-4b7f-a471-7dc64b720521" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}