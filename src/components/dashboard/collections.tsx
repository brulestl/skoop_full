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
  return <div data-unique-id="c82c32d0-6737-4ce0-997f-17b7647afeee" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2" data-unique-id="8eceae72-1db3-41fd-9405-6bd6ded45b43" data-file-name="components/dashboard/collections.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="dc0e0c42-c32c-4fc7-a7d8-e316f205e6b3" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="f869b58f-e008-41c3-b463-c5a32368f7ab" data-file-name="components/dashboard/collections.tsx">Collections</span></h1>
        <Button className="skoop-button-primary w-full sm:w-auto" onClick={() => setNewCollectionOpen(true)} data-unique-id="90aca3ce-3fc0-4ca9-be20-8c4b0a31ecfb" data-file-name="components/dashboard/collections.tsx">
          <FolderPlus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="70a924b3-3677-4ca9-8c76-219d96b077ff" data-file-name="components/dashboard/collections.tsx">
          New Collection
        </span></Button>
      </div>

      {/* Pinned collections */}
      <div className="mb-8" data-unique-id="20fd6f25-a4ac-439c-86e7-15569996d597" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="ecf16b18-b469-4899-8587-0b721f867e27" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ad254ba7-1435-4967-b674-be0840ebdaf3" data-file-name="components/dashboard/collections.tsx">Pinned</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="0b437215-c21a-4294-a9e0-420869be79b2" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* Smart collections */}
      <div className="mb-8" data-unique-id="57784dea-3dab-423a-a56e-449cc3f38418" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="847a2f2d-5b40-4503-af98-6bdc9e2f6966" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="b62ac29e-f8d4-4ec2-b4c3-bea5f7e22835" data-file-name="components/dashboard/collections.tsx">Smart Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="6019be46-0989-49b0-a05e-d66959901a7d" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {smartCollections.map(collection => <SmartCollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
        </div>
      </div>

      {/* All collections */}
      <div data-unique-id="5d201356-2d20-4e6b-bb9e-65a4bff6e50f" data-file-name="components/dashboard/collections.tsx">
        <h2 className="text-lg font-medium mb-3" data-unique-id="7d16da9b-c439-4f69-b1ee-bc2745833de8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="34ed04da-9671-42e4-908c-e5ac6c2ffd7a" data-file-name="components/dashboard/collections.tsx">All Collections</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-unique-id="8be6da05-43be-4c06-af96-1cc80d0aa7d8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collections.filter(c => !c.pinned).map(collection => <CollectionCard key={collection.id} collection={collection} onHover={setHoveredId} isHovered={hoveredId === collection.id} />)}
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] p-4 flex flex-col items-center justify-center text-center h-40" data-unique-id="30b2f226-8c26-4cc9-9103-512e9c0096f1" data-file-name="components/dashboard/collections.tsx">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mb-2" data-unique-id="718a4ea3-477c-4dad-97ac-1c705170b396" data-file-name="components/dashboard/collections.tsx">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="text-muted-foreground text-sm" data-unique-id="be6068d1-6f16-4f6b-9ba1-457a36d3c3d5" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="ed983e7c-fb62-49af-ac8a-c6274e606ab3" data-file-name="components/dashboard/collections.tsx">Create a new collection</span></p>
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
    }} onClick={onClose} data-unique-id="746490b0-eaa6-491a-8460-3396f669014b" data-file-name="components/dashboard/collections.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="2907fcfa-dc94-46b7-a8b5-15997f91b64d" data-file-name="components/dashboard/collections.tsx">
            <div className="flex items-center justify-between p-6 border-b border-border" data-unique-id="8a40a5b8-b011-4d22-9951-110f18ee95a1" data-file-name="components/dashboard/collections.tsx">
              <h3 className="text-lg font-medium" data-unique-id="fd05d527-b51e-4d64-8a90-1cadba046236" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0ea2667b-3dec-4437-93cf-1ab4491348cd" data-file-name="components/dashboard/collections.tsx">Create New Collection</span></h3>
              <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="f446b0ab-6010-4884-a559-3521e93ca08f" data-file-name="components/dashboard/collections.tsx">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6" data-unique-id="19ef272a-0ef9-4a3b-a4e9-3f2ecc56b2fe" data-file-name="components/dashboard/collections.tsx">
              <div className="space-y-4" data-unique-id="6fde4c5e-ebec-4c76-a31e-bc0940436d59" data-file-name="components/dashboard/collections.tsx">
                <div data-unique-id="7e86e463-2eb9-4a11-bbf0-00e92f482420" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="8884b15e-1f73-42f0-9af5-aa4b4ed345e1" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="146eb7a4-f6f2-47e1-9065-022c5049aa18" data-file-name="components/dashboard/collections.tsx">
                    Collection Name
                  </span></label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md bg-background" placeholder="Enter collection name" value={name} onChange={e => setName(e.target.value)} data-unique-id="bcc540cb-913e-49c3-ad3f-95d81f3e83f2" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="da03d0c3-da72-46ad-8582-d1e8ad348e00" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="d5f422c9-8261-4115-8942-a3f537ab3369" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="060f058c-5af3-4ff9-8ca6-4bb72b006bca" data-file-name="components/dashboard/collections.tsx">
                    Description (optional)
                  </span></label>
                  <textarea className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none" rows={3} placeholder="Enter collection description" value={description} onChange={e => setDescription(e.target.value)} data-unique-id="e75b7e09-a206-47f0-b0c5-9a80c7c80e62" data-file-name="components/dashboard/collections.tsx" />
                </div>
                
                <div data-unique-id="ff57f3bc-bc34-414c-809c-dde576f94f93" data-file-name="components/dashboard/collections.tsx">
                  <label className="text-sm font-medium block mb-1.5" data-unique-id="089fdb51-02db-4c69-adb4-4610f883c47d" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="da08586c-7a7f-4cb3-b93d-1b0674ac6778" data-file-name="components/dashboard/collections.tsx">
                    Collection Color
                  </span></label>
                  <div className="grid grid-cols-4 gap-3" data-unique-id="07d3338e-5545-4b89-8d31-fa5bbf53228f" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                    {colorOptions.map(option => <div key={option.value} className={cn("flex flex-col items-center justify-center p-3 rounded-md cursor-pointer border transition-all", color === option.value ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-border hover:border-primary/50")} onClick={() => setColor(option.value)} data-unique-id="e3adacf6-6789-4414-9b15-40bee0399deb" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                        <div className={cn("w-8 h-8 rounded-full mb-2", option.class)} data-unique-id="dcf8ea33-867e-4654-8ba6-ad6c4ae3a109" data-file-name="components/dashboard/collections.tsx" />
                        <span className="text-xs" data-unique-id="b4ac22a1-9625-4705-9af4-cf28c968a4e8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{option.label}</span>
                        
                        {color === option.value && <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center" data-unique-id="2383dd81-f574-4354-bf69-9e9645d5af2c" data-file-name="components/dashboard/collections.tsx">
                            <Check className="h-3 w-3 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="622a73bd-0321-43ab-8706-0d884c7dad54" data-file-name="components/dashboard/collections.tsx">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="83470b3e-f147-4af8-b6dc-f47be7e015aa" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="9ae87305-ad3f-4c28-a530-d8245007fe0c" data-file-name="components/dashboard/collections.tsx">
                Cancel
              </span></Button>
              <Button onClick={handleSubmit} disabled={!name.trim() || isSubmitting} className="skoop-button-primary" data-unique-id="2337b2a6-e8b7-41e3-bbba-effbe017bf9f" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
                {isSubmitting ? <>
                    <span className="animate-spin mr-2" data-unique-id="19e0fa39-90f6-4e79-b07c-b418444840d5" data-file-name="components/dashboard/collections.tsx">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="f953b275-a827-48c4-a89f-3294ad547c97" data-file-name="components/dashboard/collections.tsx">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    <span data-unique-id="f9f2dd4e-d73c-4805-af94-8f8d931b2f6c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="68340f81-f53b-4178-aa4d-4f474026edb7" data-file-name="components/dashboard/collections.tsx">Creating...</span></span>
                  </> : <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    <span data-unique-id="99c6f089-a2e1-4c21-bb6a-92368be2669c" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="0979f46c-cdc7-4d0a-be53-e597e96a95be" data-file-name="components/dashboard/collections.tsx">Create Collection</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="1399c5e6-0a60-4b41-8cb4-7306a71e5a60" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
      <div className="flex items-center mb-2" data-unique-id="1eb06edc-0ff0-4dfe-9b1c-e0007a639273" data-file-name="components/dashboard/collections.tsx">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getColorClass(collection.color)} mr-3`} data-unique-id="c1b7a88a-731a-4ea8-954c-1d8097e1875d" data-file-name="components/dashboard/collections.tsx">
          <FolderIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium text-lg" data-unique-id="0bc7b2c2-f8e9-4a33-b2b1-10b55d61d214" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-unique-id="9848534f-7096-432c-9f52-4f1a3f52c821" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="b4401d20-1909-455c-b5e0-9643dfa301b4" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="50868305-1b7a-486e-96ec-b0a32f84f710" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="b4a05d98-737f-4b71-a4e1-a95bea4fbb93" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
        
        {collection.pinned && <span className="text-xs flex items-center text-muted-foreground" data-unique-id="de9edd0a-3c91-4387-820d-974075bbad5a" data-file-name="components/dashboard/collections.tsx">
            <Star className="h-3 w-3 mr-1 fill-accent text-accent" /><span className="editable-text" data-unique-id="4ae8ec3f-cb04-4651-843e-37f3c3e1364e" data-file-name="components/dashboard/collections.tsx">
            Pinned
          </span></span>}
      </div>

      {/* Action buttons - visible on hover */}
      <div className={`absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="3ea8eebc-cbda-432a-ba23-9ba96a4f37f7" data-file-name="components/dashboard/collections.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="e729e8b5-333d-4700-a2d4-dbfcff6d4384" data-file-name="components/dashboard/collections.tsx">
          <PenSquare className="h-4 w-4" />
          <span className="sr-only" data-unique-id="41369cac-d36e-49ba-9866-1cfc09a2b4c8" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="780f8eb6-14f5-4320-92e7-c6cf4fdba792" data-file-name="components/dashboard/collections.tsx">Edit</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="c3b7226b-e863-4d43-9f8d-15fc266647da" data-file-name="components/dashboard/collections.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="3807ffef-b8ce-4d7b-bec8-82620ba5436a" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="2a221deb-c9f5-447d-a2a2-ea2ce55885fc" data-file-name="components/dashboard/collections.tsx">Delete</span></span>
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
  }} onMouseEnter={() => onHover(collection.id)} onMouseLeave={() => onHover(null)} data-unique-id="0046f025-2f6a-4298-b1a9-9838dd847df7" data-file-name="components/dashboard/collections.tsx">
      <div className="flex items-center mb-2" data-unique-id="20a30edd-0584-46d8-8976-e7bab2a17b61" data-file-name="components/dashboard/collections.tsx">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-primary/10 mr-3" data-unique-id="d8507191-893f-4c80-9e46-fcdbc3621958" data-file-name="components/dashboard/collections.tsx">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div data-unique-id="9641ab30-78c6-4abd-a2fb-e9aa8a2bf556" data-file-name="components/dashboard/collections.tsx">
          <h3 className="font-medium" data-unique-id="a6b5642a-7cf0-401e-b8bc-dc8673a5f018" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">{collection.name}</h3>
          <div className="text-xs text-primary" data-unique-id="ffe2a00d-7872-4487-be47-bf608edd0d37" data-file-name="components/dashboard/collections.tsx"><span className="editable-text" data-unique-id="6b80ccd3-a29b-47a7-a4d5-fbab1b57b302" data-file-name="components/dashboard/collections.tsx">Smart Collection</span></div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3" data-unique-id="300d9934-3f27-4eb3-a77e-dc0a80808eb8" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
        {collection.description}
      </p>
      
      <div className="flex items-center justify-between" data-unique-id="76c231cc-4f90-40a7-bfdd-9c835abfe6db" data-file-name="components/dashboard/collections.tsx">
        <span className="text-xs bg-secondary px-2 py-1 rounded-full" data-unique-id="d006d2ad-bcd4-4525-98e9-ab8ee6380aa7" data-file-name="components/dashboard/collections.tsx" data-dynamic-text="true">
          {collection.count}<span className="editable-text" data-unique-id="108e98db-3e4b-4fe7-b857-ea7991a8f8f8" data-file-name="components/dashboard/collections.tsx"> items
        </span></span>
      </div>
    </motion.div>;
}