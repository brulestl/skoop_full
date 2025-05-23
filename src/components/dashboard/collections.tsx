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
  return <div data-unique-id="133f1822-239a-4239-94d8-324353a7425c" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="d7265f43-0f02-48b4-a25f-2fd78b0e7330" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="d58d640b-b69d-45cc-87eb-6867f6498040" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="50c2efc4-27a9-4e10-8daa-0a35c3c1ce36" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary" onClick={() => setNewCollectionOpen(true)} data-unique-id="cb3092e5-3ee5-4a92-b6d8-f16572028545" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="33054ea7-7b12-44a2-8fed-adda3e4a893f" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="b4063f54-90e3-43eb-9e8c-eb40b1e57fc0" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="7ae46169-4919-4ba3-a549-923ed1b20c3c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="a2c95094-7a3a-45e1-a5dc-b761facd3956" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="b81bc7fc-20ea-45fc-b161-8785f9dd7f5d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="e77902b9-835f-442b-9113-c5e6711a6e04" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="03e22b03-8a00-4526-9cd1-cbda2559b997" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="5465b549-891c-4154-8adc-9cc8bed50684" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="b2e3773e-5b99-404c-baba-1955e2b047e7" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="43438b24-632d-4672-b680-a410716485f3" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="c3a4a21b-aba2-4069-9918-ab8bb85c4b27" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="d66a42ab-f8b9-4269-ab0a-601c384459c6" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="b148aeff-2f45-463b-aadc-21d883006ecd" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="76fcaf1e-4bc0-45c1-98e1-e11c273af5e2" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="08ffaae7-cc7e-4798-8b30-4d94f86c5d79" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="2bc39aa2-cfc3-4226-8233-4c6abb2aebb9" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="1ff03f09-681d-4dad-93b6-f2ea1f585638" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="5bc49e6b-3159-4101-b192-22071510d3cf" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="9a327ead-00d5-42aa-8230-d81da605c9d2" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="8de0d2a6-91d6-4c56-ad7c-85969a268713" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="d47c07d0-96b2-412c-81f8-cdf11e2518f7" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="229afdd0-41ef-40b1-831b-2d41cad37d7f" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="f6e4a0ff-3db4-4578-b9f9-e97aa149c975" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="2c3ce1ce-e2b5-46c8-9591-0d6847e91d50" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="c8270c96-38d8-48ca-b008-f82a8effbbc7" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="6b5ed342-2fda-415b-89fe-4b07369af924" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="033cc526-182d-43a0-9b4a-88b5528aba43" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="6314bc8c-d9f8-4752-87fd-d0db9f76fd5d" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="0fbe6f97-b249-4173-94a8-4370483da448" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="593ad5b2-8bf1-45af-9c6f-46289c0440fa" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="d5c58deb-b747-4d74-aaa2-835ec2bb7c33" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="067c3750-149c-4af5-b280-873b63996ce8" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="412f3881-7be9-45db-90e3-5fa314cebdcb" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="95bd6c12-3ace-4894-b0b1-e9429051a9fa" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="7f78f708-567c-4931-8e14-0de6a3ad2f92" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="af680147-7d13-44c6-8cdc-5e3bbaeb737f" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="86719dc7-2b9b-4c5d-803a-d6678517e819" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="6bfe86e0-111f-4b9f-a68d-c6ea38079c3e" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="87ad190d-c846-459f-bcb7-6d1ff7b984ab" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="e5cea1b8-e0c4-4413-928a-8e914f3e8351" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="4af3b7f6-4f89-41bf-8076-68cfe2ceed7e" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="bedab43e-04ad-4d6e-b1b1-bfe09eb651df" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="36a73fe5-d1aa-453b-8b5f-ca16f7c02181" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="aa35a143-f712-4103-9005-aea110cdbf50" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="53328e03-babb-40f1-8f3d-6872047a9714" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="31e46d6c-2391-41c5-8f88-3ce53b0d6e47" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="5e58a7c2-4aaa-470c-81b8-c978865360ec" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="405e415c-f855-44fa-b9c2-1c4eb58a9990" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="8874f034-de35-4769-90ab-a422ba0557fb" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="0ef19788-9d18-4c36-a3ba-1e5d1c8a45d2" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="af4e66a8-f22c-4806-8a2d-a47fd628e197" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="a4b2482a-d70a-4a78-a1ff-1bb9b3100756" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="63d25afc-8f0c-4505-90ac-481d7c6953a6" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="5870d227-86e6-44df-a4a2-27020db96ad5" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="416f9288-9dfe-416c-b488-9a217859c2c3" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="6db723fe-eea3-4ad1-9729-2734109414d8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="4a55b6c3-cce2-4ce0-b824-d3819d2e8633" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="5d7aeb29-16a6-48b9-8600-c0d14c45b733" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="d49a9822-742e-4a59-b540-618ca662baf8" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="7e8ddbac-7994-4086-a2bd-db2393d8f51f" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="97c23e21-ff6d-46b1-b1b1-1b71c8a9ad1f" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="1b73682d-801a-47c7-9d21-b74cdbc2d9e0" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="cc983be0-f86f-4636-998b-37285fe7abbb" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="dc279bd7-d900-4fd9-a9b8-84c72728025e" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b1b57ff8-5f7d-4218-8b4d-3e851949667f" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="10f99083-d470-4a26-a2a4-f2babd4bd164" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="367033af-1554-4c6a-ab3b-c3a34d58d6df" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="810e7ad1-7119-4245-82b6-3bae78dc6ea4" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="dc6a8262-ce4a-4d4a-895e-7d1319ffb56c" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="b9d1ac3a-17f4-4bec-bda2-be32eec958fe" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="756c8476-50b5-4520-b65d-ec676138019c" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="ea9605a6-3b85-44ba-9bed-92ee9ad28840" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="5989acda-aceb-478c-8e8a-1f40ad6207fa" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="5b9ef50d-cfda-4ea3-b445-0958830f5229" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="bcaf829e-e749-43ae-95cf-f7b615a51e9f" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="469e265d-2956-4456-af3f-a08d4fcb56b1" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="457a1939-f5c1-40ce-b075-881abbe63ae3" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="63ac9dc7-f4f8-48c9-bfd9-fdb7a566133e" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="02ce3553-e3e5-4e85-8a1b-0f6a3ab1fa2b" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}