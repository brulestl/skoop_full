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
  return <div data-unique-id="3a176e64-c79a-47dc-8ea8-6c18a3eb59b5" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="5a0958e5-5107-4db6-a337-3cb838e6e1d4" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="537bbefc-9073-4a8f-8a40-6b56d349e5eb" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="aa6d3f29-a8a5-4ff1-97dd-86ec1325322a" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" onClick={() => setNewCollectionOpen(true)} data-unique-id="9dae5537-acf6-4d96-b295-924470d7fd88" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="2ea60f0f-611b-4c29-87d0-e0134ee34cf1" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="8067a2af-c1b6-463c-8eaf-e5e39d427559" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="8752d8ee-f358-49c5-b676-172c8a68b402" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0a0a2e9a-bc79-4d72-b4a6-c02825d894d0" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="0118707c-3c5a-4279-a196-16f6a8bbe867" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="d5a1b677-2c2f-4e27-9c66-b4fc1187b73f" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="dfc027a7-45d1-454c-9c5d-ca52f5207433" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="8e232efe-bbbd-4854-a1ac-03dbff40fbf0" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="c3bfaa49-ddff-4364-923d-ae91c74b5d87" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="8e9f64fe-2539-4d0f-9763-e3ed79f34cba" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="2d311146-58b1-4d2e-9e10-d6571595b7a8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="656bfb7e-4710-42dd-8239-662b164a0000" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="4bf89cc2-d4f9-4410-9f30-ae33c21dd5af" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="3b268775-4346-4f3c-bb15-0f687e8bdd72" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="32ab81fd-32d4-4d84-acd8-57cdb04c2662" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="d404b975-b7b4-4e2b-a1da-8e6e71307f10" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ca944627-e7f8-4160-b2d4-f24b7718925d" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="33ddd768-9560-4db6-b2c6-5fa380f15f1b" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="e2daf696-59ef-4a51-8857-c098c42669c6" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="6b45e28a-11df-4c61-a4fc-10feeee7fea3" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="3ebce2d3-5fc8-4c58-9f4a-04c7d70f9bd7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2fd5e3d2-c1b2-4096-9c35-f5209021110b" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="59629c64-de7d-4103-9f56-6a816cd04492" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="16db3568-8a96-4658-bf49-0de666e972de" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="2cb0336e-e6aa-40ea-95ad-cb013b660e24" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="6f231c19-a8f2-4b03-a4f1-f6414bbfcdfb" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="8356712c-8087-4047-b386-17be274a08e1" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d4b6f58e-1d0e-4806-b261-66b5122d4ebc" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="f66ff531-aed9-4862-8903-c2dacc96ac77" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="f7d39273-7bdc-4a45-9d96-864acbee9dab" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="e5c7ce67-f118-4a96-bb27-044e85df41ea" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ddf5b5fe-a06f-4755-aca3-309401eb0104" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="9480b523-100b-496b-a466-1864874ab6fc" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="b9b50aec-37eb-4706-8872-53dcd4500637" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="34e49319-c5ca-4016-95a7-d5dfcc07d39e" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2c806f2f-2f42-4df3-9726-e2a803fd79f6" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="8950a575-bf57-4000-a978-2925cd012000" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="b4868062-7ae5-49b0-bc48-666c63b8db2d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="78eecd0e-cfc0-4b16-874a-518072fa2f1c" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="6223fd5a-03c0-49d8-9119-6f25bff023c8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="dc671ce8-3915-40dc-aa9a-8055719d67b4" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="798fb1d9-a003-410a-952e-9b0ce1d96cd4" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="f0e97957-a55d-4616-a3d7-9828cc8f5aeb" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="bdb15809-0fd2-4813-9d70-f4c182f405a8" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="04610d26-14ce-4354-bbb1-f3b93580a9eb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="e8d85e71-23d6-40fd-9fce-d244fce22cd9" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="f98965bf-ad51-4e61-b7d4-43051d5195bb" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="ce49b53e-afcc-4c6e-9c10-8d00e51cacc9" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="9c542801-01be-425f-8657-aa318460d188" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="37ccb543-c0a7-4b1c-a149-906f0abef5db" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d406c4e6-6c6a-407a-9455-5bf96def9c05" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="efb77ec3-f5e8-4be6-a520-3aff5602eb1b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="a0e9abd1-43a2-4240-addd-354d53534224" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="cefc7709-67d7-4cd4-ab12-b512644bbe09" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="89135579-5fa5-4458-9f05-f0d8fa7233ae" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="0dc910d5-a535-4304-81c9-0040bb6b8101" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="6528c873-fdb0-40d7-9989-6c1fbc4faf7f" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="0b2ff289-10c1-4503-9b50-a86aac51ed90" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="b4b23ae4-9a71-4d68-8612-463d8937b488" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="cbd4bf5c-abd0-4c87-8939-1da94b3bff33" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="70832d89-9175-4839-aad9-4b19e7526649" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="a47071bd-63a3-4e1c-b4aa-5f6137caaed1" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="d4c0e834-09f4-43c5-b56b-9ef7066f6639" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="93090686-a684-47d6-bbc6-6518bde8d936" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b0b9f310-88e2-4064-afc2-479773049d62" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="5fe02ad1-1c25-4c8d-aeba-8008b3df410e" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="f2dd3bb2-58be-4c8c-b45b-522cd0fa4186" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b5c3e452-25d2-4c5c-b78c-9f13f41340f3" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="2d934a43-8c84-41ff-8485-b95988f78002" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="a4f3bd58-620e-41c9-b07e-5b4d0e5634d3" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="6e336ba5-11bf-41a7-8756-297899127913" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="2f4768c0-fda4-4e22-9278-0c72bc9fd2ba" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="670ec507-d287-4edf-901a-d5fcc2ea4d70" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="a0e2499b-3383-407a-8123-e2210a555099" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="c16ec6a2-6c91-4e20-ae80-33b80c931991" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="caf4c3e1-f50a-4eb2-8ea8-07bd2d7e6a57" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="e53fe314-2d66-4244-b371-8206277fd7a6" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="6ec0228b-956e-4dd8-9210-3c4cef8efd9a" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="b57a80ea-638b-444f-b428-b8e67750460c" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}