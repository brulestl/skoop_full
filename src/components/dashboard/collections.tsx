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
  return <div data-unique-id="904417f2-be3c-42e2-a594-644e984baf88" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex flex-row items-center justify-between mb-6 gap-2" data-unique-id="f8a7740f-5c08-407d-a2ce-650951e8d452" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="9cb4d857-f11a-43e4-972a-b248f884b5d7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="572ed150-9bd2-4bf8-8b8b-5ec9bddc0e6e" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" onClick={() => setNewCollectionOpen(true)} data-unique-id="a9363629-904c-4b8b-b82e-f69644095180" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b423a145-3f64-46f4-a61d-c0a9c88843b5" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="2f1fe888-4509-42db-8194-386666f08b77" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="3fd51187-f169-407e-9599-45ef318df61c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="6ea4119a-c98d-4b38-af65-0d2118634b18" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="6c9162d0-f1f1-4067-8347-8fc96eec3d46" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="bf6dd1c8-08a0-47e8-a131-a41e3262fdb1" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="be1aff50-e072-42da-9a7a-cce4e6705c91" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b1614f91-243d-4168-9fb1-3e6e9f04e5a3" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="5fef3a16-d31f-447d-9e53-319e7dc8992c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="2bc6d31c-1288-411b-9f27-f1ce2b2ca97e" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="1fe28d7f-fa53-4212-8275-8a6ab0da14cf" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="da48a34c-2817-43ca-adb2-7c711ee8eb1a" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="cdf1a68a-f626-418a-8473-14ce3513c887" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="402805cd-e98b-4f3f-97c8-b9bafed6a8ca" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="fdf8e773-466b-4c8a-9726-024696e42d2e" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="7891b5cd-1206-4c90-ac58-a34560d81972" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1f863de9-f3ed-4538-b529-fbbb0bf77bd5" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="24b4953c-fbda-4a4a-8104-75b127ba17cb" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="72f50a25-c6fe-4964-8dbd-7f0df19d006d" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="5df7afdb-d980-4883-ac6a-30bb448ba51c" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="2d47e604-718a-4a6c-b002-de47bd00d84b" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="4b4ba7dc-8657-4167-9cc4-5df42b3ecd0d" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="93052cea-d808-4b7b-9190-36a464f629c4" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="05aa23a0-b211-4fbb-9e7c-141901a2b894" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="cd4dc9bd-afa1-4365-b759-a9f47e09efae" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="d0b2db8b-2501-4c8f-bdd8-6053566439a8" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="d881f9b6-c69f-4981-87b4-fb59e4aa63ed" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="5b086392-9e63-42d9-8cdf-58d542900ae7" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="f90067a5-a035-47c9-babd-f23ee97948ea" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="c1796b0d-5420-4579-b91d-fa24332e905c" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="ef12ab5b-32a8-41bd-8b45-4245cde763af" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="7a9c982c-f1e2-4167-939c-83eae496e87d" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="71f8ac2f-96cd-407e-8a16-1b4ad10fc65b" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="ed168479-1e8f-440d-a623-8cc5e95a063f" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="8033053a-eb38-4e69-b795-9f81b70b161d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2979f894-68ac-4478-8108-d064c22b5336" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="79d0b7c0-323e-4f6a-8c47-a55659924be9" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="d8df7c7d-32b1-4ccb-89a4-4cbfc2250eeb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="5476e4ee-75d6-424d-9c2a-ad48d087cdca" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="afff20d8-8326-417e-b82b-64958fec5301" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="df068c61-ebe2-42ce-963f-bb257d6d00d5" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="036e0cd5-8489-426f-8b81-a06b4e311fd0" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="6aee3444-f3b7-43f9-a7d2-1ba00e04473f" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ef0b81be-3bba-4012-908b-c7f75ed744a1" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="4c2f10ef-a50e-4386-a426-e83c9368265b" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="44e59644-7502-47d9-a235-cd7061359da4" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="e66ffaf7-2365-4088-88d4-ef286cbd13c2" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="f79d198b-9c41-48b8-a774-c829bc265b07" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="534711af-2cf1-4556-be03-b8b4e6182e68" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="406fc631-b994-4cd8-9806-16698188b737" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="febdc925-44c2-4ca4-9d87-16c72143c9f6" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="e603444d-5c7e-4602-bacd-d7ff7aae2dfb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="fd1be3df-1c53-4d5c-8496-2076132a6452" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="44cb1f7a-596e-4d77-9e65-15a9d3e9a8b7" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="693134de-da87-410d-8141-7185009e74e3" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="27742043-c489-42c6-b47e-1afae7b30f54" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="183f935d-510b-40e0-b5ff-c808f52aa6e1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="5f84f8c2-466b-4f2d-b4f5-307ac5cb5c9e" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="c4773c8e-aa84-4844-b81e-44bb520c336d" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="fa987cc5-5966-4288-82f5-6a398275dbc7" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="78270ad1-08cc-45b6-8d58-db9738c2bef1" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="3ab5029d-8219-463c-9a2e-f023a10c63ce" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="1f1f8b2a-9bc7-4a30-9b3c-19ffa5d3341e" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="076fb10f-24a0-41a2-a305-4ac77b3020bf" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f839cb6f-ce98-43b8-806e-b2cddea9054e" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="9c8be567-baee-49d3-a593-e705e5e61100" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="c799a7c6-5c23-425c-8b66-99ec0c6c490a" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="cede0b77-6818-4ea0-b973-3980b96b98a4" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="803fcec8-c087-450a-bad0-f83ac6c031ea" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="cc2e8356-8f26-403f-b361-e268f510e0a1" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="c8726407-834d-4355-942d-6682565a9f6a" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="ac48b36a-c741-4221-a28f-7d71bcac0d34" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="1bb8987c-0e70-4263-90ae-9a5d17b1d5be" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="548cb282-c349-4a8f-b892-a8f4a7b9e766" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="9557d499-8492-427d-9013-9146c524aa92" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="953a4b57-551e-4537-8d40-a968f70f9ee1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="f808f178-afe8-446b-82a0-1008eebc4292" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="234f6081-1720-4c2e-99fa-7f7d753187ea" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="775bafd8-160a-4477-a793-0a374a838be4" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}