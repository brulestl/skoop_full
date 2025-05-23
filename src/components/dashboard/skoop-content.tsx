'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X as XClose, Settings, MoreHorizontal, RefreshCw, Github, X, MessageSquare as Reddit, Code as StackOverflow, ExternalLink, Star, ArrowUp, MessageSquare, BookmarkCheck, Folder as FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock content for the feed columns
const contentStreams = [{
  id: "twitter",
  title: "X",
  icon: X,
  color: "bg-black",
  items: [{
    id: "t1",
    author: "Theo",
    handle: "@t3dotgg",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop",
    time: "2h ago",
    content: "Just launched a new React hooks library for managing animations with zero dependencies. Check it out:",
    link: "https://github.com/t3dotgg/react-hooks",
    likes: 345,
    replies: 42,
    image: null
  }, {
    id: "t2",
    author: "Sarah Dayan",
    handle: "@frontstuff_io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
    time: "4h ago",
    content: "Here's a thread on building accessible components in React. 1/10",
    link: null,
    likes: 890,
    replies: 36,
    image: null
  }, {
    id: "t3",
    author: "Lee Robinson",
    handle: "@leeerob",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    time: "5h ago",
    content: "What are your favorite Next.js 13 features? Mine are Server Components and the new App Router.",
    link: null,
    likes: 1200,
    replies: 154,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
  }]
}, {
  id: "github",
  title: "GitHub",
  icon: Github,
  color: "bg-gray-800",
  items: [{
    id: "g1",
    repo: "vercel/next.js",
    description: "The React Framework for the Web",
    link: "https://github.com/vercel/next.js",
    stars: 14823,
    language: "TypeScript",
    updated: "1d ago"
  }, {
    id: "g2",
    repo: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development.",
    link: "https://github.com/tailwindlabs/tailwindcss",
    stars: 8945,
    language: "CSS",
    updated: "3d ago"
  }, {
    id: "g3",
    repo: "pmndrs/zustand",
    description: "Bear necessities for state management in React",
    link: "https://github.com/pmndrs/zustand",
    stars: 5621,
    language: "TypeScript",
    updated: "6d ago"
  }]
}, {
  id: "reddit",
  title: "Reddit",
  icon: Reddit,
  color: "bg-orange-600",
  items: [{
    id: "r1",
    subreddit: "r/reactjs",
    title: "What's your preferred state management solution in 2023?",
    author: "dev_enthusiast",
    time: "3h ago",
    upvotes: 127,
    comments: 83,
    link: "https://reddit.com/r/reactjs/comments/example1"
  }, {
    id: "r2",
    subreddit: "r/webdev",
    title: "Show off your portfolio website - Monthly thread",
    author: "mod_webdev",
    time: "1d ago",
    upvotes: 356,
    comments: 194,
    link: "https://reddit.com/r/webdev/comments/example2"
  }, {
    id: "r3",
    subreddit: "r/typescript",
    title: "TypeScript 5.0 - What features are you most excited about?",
    author: "ts_lover",
    time: "2d ago",
    upvotes: 245,
    comments: 67,
    link: "https://reddit.com/r/typescript/comments/example3"
  }]
}, {
  id: "stackoverflow",
  title: "Stack Overflow",
  icon: StackOverflow,
  color: "bg-orange-500",
  items: [{
    id: "s1",
    title: "How to properly type React useRef with TypeScript",
    tags: ["react", "typescript", "hooks"],
    votes: 45,
    answers: 3,
    views: 1253,
    time: "8h ago",
    link: "https://stackoverflow.com/questions/example1"
  }, {
    id: "s2",
    title: "Next.js API routes vs. tRPC for type-safe backends",
    tags: ["next.js", "trpc", "api"],
    votes: 32,
    answers: 5,
    views: 987,
    time: "1d ago",
    link: "https://stackoverflow.com/questions/example2"
  }, {
    id: "s3",
    title: "Best practices for handling authentication in React applications",
    tags: ["react", "authentication", "security"],
    votes: 67,
    answers: 7,
    views: 2345,
    time: "3d ago",
    link: "https://stackoverflow.com/questions/example3"
  }]
}];

// Available columns for the user to add
const availableColumns = [{
  id: "twitter",
  name: "X",
  icon: X,
  color: "bg-black text-white"
}, {
  id: "github",
  name: "GitHub",
  icon: Github,
  color: "bg-gray-800 text-white"
}, {
  id: "reddit",
  name: "Reddit",
  icon: Reddit,
  color: "bg-orange-600 text-white"
}, {
  id: "stackoverflow",
  name: "Stack Overflow",
  icon: StackOverflow,
  color: "bg-orange-500 text-white"
}];
export default function SkoopContent() {
  const [activeColumns, setActiveColumns] = useState(["twitter", "github"]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  // Add column function
  const addColumn = (columnId: string) => {
    if (!activeColumns.includes(columnId)) {
      setActiveColumns([...activeColumns, columnId]);
    }
    setIsAddingColumn(false);
  };

  // Remove column function
  const removeColumn = (columnId: string) => {
    setActiveColumns(activeColumns.filter(id => id !== columnId));
  };
  return <div data-unique-id="392ddff1-eeae-4454-99fc-65652414e27f" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="md:hidden flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-border bg-muted/20" data-unique-id="a1ca9ef4-084f-47ee-8b8a-b86a2802017d" data-file-name="components/dashboard/skoop-content.tsx">
        <FolderIcon className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-2" data-unique-id="043f1d74-f826-4c98-9281-26ec5c6da57e" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="2a8ace26-5520-4fb4-84a2-32604ca65604" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h3>
        <p className="text-muted-foreground mb-4" data-unique-id="d9bc8ff2-40ab-4c33-9a6d-1b0ea0842ced" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="3de2f59b-3d8e-4caf-8be7-2b22d2ffd91b" data-file-name="components/dashboard/skoop-content.tsx">
          This feature is optimized for desktop viewing. Please access on a larger screen for the best experience.
        </span></p>
      </div>
      <div className="hidden md:block" data-unique-id="f35f43ec-13d2-4290-b5d1-fe7245f33ebb" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="d7496e0d-235b-4a93-8e78-f22805e96e98" data-file-name="components/dashboard/skoop-content.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="5e18ddf9-c541-4d5d-8653-dce2e5fca4e8" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="b05435c0-d71a-4e70-9b6d-2621553a48cb" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h1>
        <div className="flex space-x-2" data-unique-id="906d3f40-4cb3-48a8-b29b-3810fa31017a" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center" data-unique-id="e731c9d6-81f6-4a48-9af8-d0acca37ee05" data-file-name="components/dashboard/skoop-content.tsx">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline" data-unique-id="47341299-cc80-406e-9cbf-3db091c739e3" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="77265137-cee9-4f43-bcbd-21fecec6202b" data-file-name="components/dashboard/skoop-content.tsx">Add Column</span></span>
          </Button>
          <Button className="skoop-button-primary hidden sm:flex" data-unique-id="424943af-e01e-4eac-992b-89900816c23e" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline" data-unique-id="a0006d8c-863f-41ff-8a85-33a6d3bba11b" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="ce8138a5-e842-43cc-99bc-c0ac3ec69a19" data-file-name="components/dashboard/skoop-content.tsx">Refresh All</span></span>
          </Button>
          <Button className="skoop-button-primary sm:hidden" size="icon" data-unique-id="70f5dbef-2959-4e3a-ae19-224e6f7ee225" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Add Column dropdown */}
      {isAddingColumn && <motion.div className="mb-6 skoop-card p-4" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} data-unique-id="ff290894-7d9a-4764-8806-194c8673784c" data-file-name="components/dashboard/skoop-content.tsx">
          <h3 className="text-sm font-medium mb-3" data-unique-id="8d5e8516-8d33-4f88-946b-253a867f659c" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="7b1b5641-c386-4bcb-90bb-b736616b9666" data-file-name="components/dashboard/skoop-content.tsx">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-unique-id="544a84f0-234b-4730-ab4f-bf4e473fd24a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)} data-unique-id="680a5ed5-e676-4167-aab6-3a749dab2cb1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)} data-unique-id="de10f84e-7112-42ec-b021-1c88ddef4635" data-file-name="components/dashboard/skoop-content.tsx">
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium" data-unique-id="e8aa7025-66f0-4e38-b1ce-c7b6bc0342ed" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1" data-unique-id="dc0feed8-1617-45ee-8a39-d6ef8c84dc04" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="d2bc8396-1cb7-4827-8a5b-6ea322315f70" data-file-name="components/dashboard/skoop-content.tsx">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory" data-unique-id="a3655633-a627-4bb3-a124-6e14e9c17033" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {activeColumns.map(columnId => {
          const column = contentStreams.find(stream => stream.id === columnId);
          if (!column) return null;
          return <div key={columnId} className="min-w-[280px] snap-center" data-unique-id="1fb241b0-25d7-4902-bc35-5ac73cd01c29" data-file-name="components/dashboard/skoop-content.tsx">
              <ContentColumn column={column} onRemove={() => removeColumn(columnId)} />
            </div>;
        })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full" data-unique-id="8edb6c68-2e2f-4aa6-a8ea-63cb09c4f3a3" data-file-name="components/dashboard/skoop-content.tsx">
            <div className="text-lg font-medium mb-2" data-unique-id="f06b9ecd-6a2f-4d16-b04a-780e7bf93a7f" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="d6193988-e028-44e7-ad45-0fe9f4757f47" data-file-name="components/dashboard/skoop-content.tsx">No content columns added</span></div>
            <p className="text-muted-foreground mb-4" data-unique-id="5531f5ec-db87-49f5-9520-032e480a7013" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="c3e7f862-9952-4cdc-9f8b-dffe60d7bb1a" data-file-name="components/dashboard/skoop-content.tsx">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary" data-unique-id="ba9fc06d-2e71-4ca3-a79c-0066cb4a9c4d" data-file-name="components/dashboard/skoop-content.tsx">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c7379ab5-291c-4c09-9956-591b34f617b6" data-file-name="components/dashboard/skoop-content.tsx">
              Add Your First Column
            </span></Button>
          </div>}
      </div>
      </div>
    </div>;
}
interface ContentColumnProps {
  column: typeof contentStreams[0];
  onRemove: () => void;
}
function ContentColumn({
  column,
  onRemove
}: ContentColumnProps) {
  const Icon = column.icon;
  return <motion.div className="skoop-card flex flex-col h-[600px]" initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.2
  }} data-unique-id="b3cd9e0e-e337-4cb9-9b2c-77c9afec703b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)} data-unique-id="eff71182-9f90-403b-a22d-f0ca94bcf35f" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="flex items-center" data-unique-id="05b7d47d-0f84-40fd-9347-72af760147d6" data-file-name="components/dashboard/skoop-content.tsx">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white" data-unique-id="a8bc48a7-8db2-49c0-ae51-74211f2572b6" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.title}</h3>
        </div>
        <div className="flex items-center space-x-1" data-unique-id="5f8a89b0-5b7f-4794-8505-8dd8356b4ab0" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" data-unique-id="16106813-51d1-4c5c-9835-68deb099f6bb" data-file-name="components/dashboard/skoop-content.tsx">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove} data-unique-id="8fa9e9cb-6856-452b-a0d9-14fb1010e130" data-file-name="components/dashboard/skoop-content.tsx">
            <XClose className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2" data-unique-id="0185493e-2038-4871-b4e1-c4520623e911" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="space-y-2" data-unique-id="c9dd3c0d-517d-46f1-aaa9-e145184bde91" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {column.id === "twitter" && column.items.map(item => <TwitterCard key={item.id} item={item as any} />)}
          
          {column.id === "github" && column.items.map(item => <GitHubCard key={item.id} item={item as any} />)}
          
          {column.id === "reddit" && column.items.map(item => <RedditCard key={item.id} item={item as any} />)}
          
          {column.id === "stackoverflow" && column.items.map(item => <StackOverflowCard key={item.id} item={item as any} />)}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border" data-unique-id="eb241923-9ec4-4370-be9b-a13aec886646" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="w-full text-primary" data-unique-id="c99d55b2-7047-4877-a007-61aef515df30" data-file-name="components/dashboard/skoop-content.tsx">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="b901889d-edb5-4169-8d72-a80a53466f5f" data-file-name="components/dashboard/skoop-content.tsx">
          Refresh
        </span></Button>
      </div>
    </motion.div>;
}

// Twitter card
function TwitterCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="cc8b69fc-c479-4be6-819f-a92aff5fbb79" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-start" data-unique-id="1ff4c0bd-4906-41a7-839e-d07097ba149a" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0" data-unique-id="b6bfa428-69f8-41e4-961f-88409f91ad86" data-file-name="components/dashboard/skoop-content.tsx">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" data-unique-id="d5897777-2854-469d-828a-d29f1a1a659f" data-file-name="components/dashboard/skoop-content.tsx" />
        </div>
        <div className="flex-1 min-w-0" data-unique-id="865e3927-da0b-4ed3-9b07-5e0a882b631c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <div className="flex items-center text-sm" data-unique-id="446c67c7-1c9f-431d-ae4e-9d4d2383ee57" data-file-name="components/dashboard/skoop-content.tsx">
            <span className="font-medium truncate" data-unique-id="f75c9016-6935-4c42-ad67-dd3363c6efbe" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate" data-unique-id="3d9e5cc1-fc90-4ae9-8898-4cc60e51b568" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.handle}</span>
            <span className="text-muted-foreground ml-1" data-unique-id="0c33e0cb-f410-4c14-90e0-0c961d2ddf11" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="6698a443-8784-44aa-a867-a367e541d728" data-file-name="components/dashboard/skoop-content.tsx">·</span></span>
            <span className="text-muted-foreground ml-1" data-unique-id="cf266682-f560-4f10-af80-dd133f51d69b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</span>
          </div>
          <p className="text-sm mt-1" data-unique-id="17db5dee-c06a-4085-8e0e-a382a694c5a8" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center" data-unique-id="1f0a017d-a956-458b-9ddb-a0e0f9db7303" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              {item.link.substring(0, 30)}<span className="editable-text" data-unique-id="8611dc23-4c65-4758-96b2-39efd75c9fd8" data-file-name="components/dashboard/skoop-content.tsx">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden" data-unique-id="d23e4bdc-411a-41e5-b4bb-88aafc72f590" data-file-name="components/dashboard/skoop-content.tsx">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" data-unique-id="82e2b2ee-49ab-440e-8fca-5fe3d131387c" data-file-name="components/dashboard/skoop-content.tsx" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs" data-unique-id="33a1726e-1460-4a93-9e08-8378561cfba6" data-file-name="components/dashboard/skoop-content.tsx">
            <button className="flex items-center mr-3 hover:text-primary transition-colors" data-unique-id="7bf0fbc9-ca1a-4a40-9099-6248db15ca39" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors" data-unique-id="b8f99fbe-a00e-483c-9759-3d14b22cc100" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto" data-unique-id="912fd680-0386-4689-a90e-3e6ac91dd734" data-file-name="components/dashboard/skoop-content.tsx">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="3a9e5947-9163-4c0b-be46-8cd53294636b" data-file-name="components/dashboard/skoop-content.tsx">
                <BookmarkCheck className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

// GitHub card
function GitHubCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="320ff043-fc56-49df-9273-024f5620bc64" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-center mb-1" data-unique-id="ebbed927-0cf4-4b92-bf87-33a447546da4" data-file-name="components/dashboard/skoop-content.tsx">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1" data-unique-id="36d1c6be-e655-4eb6-8f9c-a391ef3e4bf8" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1" data-unique-id="637db63d-0d68-4e55-b76a-2bf9e064faaa" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2" data-unique-id="16efcdfa-0baf-4db1-bbd7-875a84b4e978" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground" data-unique-id="51b14504-05f6-47b1-97ee-d400ca419100" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3" data-unique-id="7aad318b-e0cd-44a6-840b-c9422cb0b033" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3" data-unique-id="c77191e4-0c30-45b9-83ec-c0987f2dd3e8" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.language}</span>
        <span data-unique-id="cbcd9f68-1775-425c-8328-f26c1b275f80" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="08afef9b-489a-4d5b-9214-0c02dcfb61af" data-file-name="components/dashboard/skoop-content.tsx">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="bdf58718-9da5-4103-a269-d859ec39ed42" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="text-xs text-muted-foreground mb-1" data-unique-id="947c4aac-2890-45cd-8dde-2730b292fc85" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.subreddit}<span className="editable-text" data-unique-id="4177b350-32aa-4ca4-b5f4-6319544f4bbd" data-file-name="components/dashboard/skoop-content.tsx"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1" data-unique-id="a662c258-e08a-4b70-9287-95e034c9e204" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground" data-unique-id="57b59f93-c1ae-4eac-933b-860a442c53e1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e4de3e5f-32ff-4d1f-846c-de25fccc4346" data-file-name="components/dashboard/skoop-content.tsx">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs" data-unique-id="6f819c91-7d21-4203-81b7-44451e9af5ee" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3 text-muted-foreground" data-unique-id="8baa1857-6e8b-4e8c-b97b-568bc60a9558" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground" data-unique-id="ebb1c717-bb20-4f4e-a3f4-0f09d1998213" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto" data-unique-id="1e5dbc4e-5e01-4325-9daa-07d757d6715c" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="22220d25-38ff-42ae-b3bc-12c857d3838b" data-file-name="components/dashboard/skoop-content.tsx">
            <BookmarkCheck className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>;
}

// Stack Overflow card
function StackOverflowCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="66f7d629-8e08-4d1a-a22c-c97fe20086fa" data-file-name="components/dashboard/skoop-content.tsx">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2" data-unique-id="ec16010f-7d94-4e30-9cef-4132975b060f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2" data-unique-id="74e855f6-e59a-43c2-a25e-53c0eb572eca" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.tags.map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary" data-unique-id="9e3936a8-fcc1-4186-8460-67ba9fe427df" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between" data-unique-id="c11bbcf4-fd21-4ea9-811e-715ff91c749f" data-file-name="components/dashboard/skoop-content.tsx">
        <div data-unique-id="e5ca9f02-6dec-4855-a364-c1abb6b02d08" data-file-name="components/dashboard/skoop-content.tsx">
          <span className="mr-3" data-unique-id="f52c6085-d14d-4f0a-967d-e23457e7cf23" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.votes}<span className="editable-text" data-unique-id="fe1adfa1-7ca9-4206-a0c6-4f95d9a7faf8" data-file-name="components/dashboard/skoop-content.tsx"> votes</span></span>
          <span className="mr-3" data-unique-id="d6513e37-52d1-4967-90e2-e713c05135f1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.answers}<span className="editable-text" data-unique-id="bbadfaca-b23d-4021-aeae-5e3bb070712d" data-file-name="components/dashboard/skoop-content.tsx"> answers</span></span>
          <span data-unique-id="6b1ef3bb-90f7-4f79-8941-198e81335b75" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.views}<span className="editable-text" data-unique-id="0db5e06a-0c78-4c85-b2ee-4f5ac8f34196" data-file-name="components/dashboard/skoop-content.tsx"> views</span></span>
        </div>
        <div className="text-right" data-unique-id="0b3bd049-c897-41c7-94fb-84ad56056897" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</div>
      </div>
      <div className="mt-2 text-right" data-unique-id="2a18ae73-542d-4e1d-b42d-911d5d626570" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="h-7 p-1" data-unique-id="60f9d99d-26b2-4b96-930b-bb1b516575a8" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}