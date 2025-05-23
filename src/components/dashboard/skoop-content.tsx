'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Settings, MoreHorizontal, RefreshCw, Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, ExternalLink, Star, ArrowUp, MessageSquare, BookmarkCheck, Folder as FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock content for the feed columns
const contentStreams = [{
  id: "twitter",
  title: "Twitter",
  icon: Twitter,
  color: "bg-blue-500",
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
  name: "Twitter",
  icon: Twitter,
  color: "bg-blue-500 text-white"
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
  return <div data-unique-id="f0c37bf6-3253-40d6-bf6a-67d2359ce080" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="md:hidden flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-border bg-muted/20" data-unique-id="24559013-512c-41a4-b816-06d14842e9d9" data-file-name="components/dashboard/skoop-content.tsx">
        <FolderIcon className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-2" data-unique-id="14d08c43-752a-431c-96df-93c2229be8f3" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="0a8a4d9a-4759-4cf9-bac4-8723761bf9d5" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h3>
        <p className="text-muted-foreground mb-4" data-unique-id="e39e70e2-bb89-41d0-a673-3114058e6b1e" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="bd7de89c-0d2a-4d67-b34e-55bf0cb33e0b" data-file-name="components/dashboard/skoop-content.tsx">
          This feature is optimized for desktop viewing. Please access on a larger screen for the best experience.
        </span></p>
      </div>
      <div className="hidden md:block" data-unique-id="bcb50118-3ec2-45f6-bc3e-90bada516b1a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="c3c93438-7297-4efc-81ad-0f9e3804329c" data-file-name="components/dashboard/skoop-content.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="202a10ef-6134-4b6e-9da4-cae99875834a" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="667e756a-bf73-4c5a-b5d2-2a1fdd5a2e6c" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h1>
        <div className="flex space-x-2" data-unique-id="563fc8e2-7f50-4c31-b1f1-b5e0ea525c13" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center" data-unique-id="acfcd725-96b8-408f-99a9-043192879cb5" data-file-name="components/dashboard/skoop-content.tsx">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline" data-unique-id="c4bb2f6c-635d-45a2-9d9c-4a14dc4dda26" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="c2b08053-85a6-4f4e-bc6a-548494226af5" data-file-name="components/dashboard/skoop-content.tsx">Add Column</span></span>
          </Button>
          <Button className="skoop-button-primary hidden sm:flex" data-unique-id="8ae3eda3-b635-4c93-982c-f0f2d3fb70f7" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline" data-unique-id="87a88ce8-5081-477c-a6f2-31d8b523b465" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="4dd6e65a-f6f9-4743-b594-72e0c0644f0d" data-file-name="components/dashboard/skoop-content.tsx">Refresh All</span></span>
          </Button>
          <Button className="skoop-button-primary sm:hidden" size="icon" data-unique-id="f4f616a9-85c7-4ff6-b551-a98decb037b2" data-file-name="components/dashboard/skoop-content.tsx">
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
      }} data-unique-id="6027bce8-3a73-4a0f-b967-1df908f14d6c" data-file-name="components/dashboard/skoop-content.tsx">
          <h3 className="text-sm font-medium mb-3" data-unique-id="25155f3e-9ef5-4239-9154-030b098abecd" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="99eb86cb-e6e8-4d1a-9414-a43c3f7ce147" data-file-name="components/dashboard/skoop-content.tsx">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-unique-id="ece1e008-1c75-436c-9cb5-73090c0b2ad1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)} data-unique-id="16227313-e235-41c6-8d31-e8fc18a3a921" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)} data-unique-id="5286886d-107a-4f16-841e-34266fa23335" data-file-name="components/dashboard/skoop-content.tsx">
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium" data-unique-id="28f0a50b-d0cc-44f5-bf0a-ef8ba250ead2" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1" data-unique-id="3b0965a6-8cce-4893-9af3-53adc69a0391" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="581d5d2d-aed7-43a7-85af-265978399ad8" data-file-name="components/dashboard/skoop-content.tsx">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory" data-unique-id="949f718f-c00a-4439-91a5-1405ae1eb4e9" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {activeColumns.map(columnId => {
          const column = contentStreams.find(stream => stream.id === columnId);
          if (!column) return null;
          return <div key={columnId} className="min-w-[280px] snap-center" data-unique-id="75de83f9-c223-4c09-99e4-005252592072" data-file-name="components/dashboard/skoop-content.tsx">
              <ContentColumn column={column} onRemove={() => removeColumn(columnId)} />
            </div>;
        })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full" data-unique-id="c95de6b2-fb5a-471b-9ea1-d9ffa331c006" data-file-name="components/dashboard/skoop-content.tsx">
            <div className="text-lg font-medium mb-2" data-unique-id="41a368be-52bb-476e-bbf2-c46744ec44f9" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="3a785435-3e78-4337-bbf9-208133d674e7" data-file-name="components/dashboard/skoop-content.tsx">No content columns added</span></div>
            <p className="text-muted-foreground mb-4" data-unique-id="60b02634-e431-43ca-a6a0-65bfafebd300" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="f36f0d7b-8d0c-41ea-bc7b-482ade258870" data-file-name="components/dashboard/skoop-content.tsx">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary" data-unique-id="613c9274-fa7a-4f2f-b2b4-4b9a5c0a7fb5" data-file-name="components/dashboard/skoop-content.tsx">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="6a0a15f3-708f-4609-a671-0bd82bb88a88" data-file-name="components/dashboard/skoop-content.tsx">
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
  }} data-unique-id="4aef9216-f78e-489e-8eb4-8e616b080bc9" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)} data-unique-id="3495d8d9-ff7e-48c7-946d-684cd9370506" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="flex items-center" data-unique-id="d56141b1-626a-43f8-a33c-961f962d7f14" data-file-name="components/dashboard/skoop-content.tsx">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white" data-unique-id="cd9545ad-dfda-41d2-a564-343a5caf1925" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.title}</h3>
        </div>
        <div className="flex items-center space-x-1" data-unique-id="8d572320-cc1d-4b1a-9955-4e0cd9a5d55c" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" data-unique-id="6535d672-b557-4173-9779-1a3338391f51" data-file-name="components/dashboard/skoop-content.tsx">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove} data-unique-id="e9a12fad-96ed-4f91-bb1b-51da64ca2df6" data-file-name="components/dashboard/skoop-content.tsx">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2" data-unique-id="b6318e14-65cb-4db7-b03c-c4250c0660f9" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="space-y-2" data-unique-id="1d2cecd4-e23a-4a76-9f2c-a215be47b14f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {column.id === "twitter" && column.items.map(item => <TwitterCard key={item.id} item={item as any} />)}
          
          {column.id === "github" && column.items.map(item => <GitHubCard key={item.id} item={item as any} />)}
          
          {column.id === "reddit" && column.items.map(item => <RedditCard key={item.id} item={item as any} />)}
          
          {column.id === "stackoverflow" && column.items.map(item => <StackOverflowCard key={item.id} item={item as any} />)}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border" data-unique-id="51ce1e62-aa99-417e-b771-fd129ff33b09" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="w-full text-primary" data-unique-id="b7b25a13-c71d-49e0-b9c9-a230a97adceb" data-file-name="components/dashboard/skoop-content.tsx">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="ec731618-80a8-4d8d-9124-c97d98edadad" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="72b9da88-927b-4f01-a9c4-db1d3c966bcc" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-start" data-unique-id="ec106ae7-1c45-4a91-a41a-76404644692e" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0" data-unique-id="b41c61a5-62f0-4a02-b606-4372da4ecb94" data-file-name="components/dashboard/skoop-content.tsx">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" data-unique-id="5ca35179-0abb-4673-85d9-52c7b16382bc" data-file-name="components/dashboard/skoop-content.tsx" />
        </div>
        <div className="flex-1 min-w-0" data-unique-id="bc24fa9e-3ed0-45f1-af37-71a6a974b110" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <div className="flex items-center text-sm" data-unique-id="37915e61-1fb1-4104-b0a3-96d7f966840e" data-file-name="components/dashboard/skoop-content.tsx">
            <span className="font-medium truncate" data-unique-id="590205ed-f737-4aa8-9248-e75ed812177e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate" data-unique-id="9939813c-bf1b-4e26-9ae3-eda4d900f35f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.handle}</span>
            <span className="text-muted-foreground ml-1" data-unique-id="7932210c-a0a6-44b7-bc35-a26ff067a0da" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="8a0e09ee-a791-4298-bec8-8aa6c9854712" data-file-name="components/dashboard/skoop-content.tsx">·</span></span>
            <span className="text-muted-foreground ml-1" data-unique-id="9c468a05-3648-4605-8b8e-9cedf504a43e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</span>
          </div>
          <p className="text-sm mt-1" data-unique-id="51f508de-ce4e-47e7-9059-5b57ed6117b2" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center" data-unique-id="fddbbfa0-0824-474b-b600-ba1fb8dc8325" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              {item.link.substring(0, 30)}<span className="editable-text" data-unique-id="78a7073c-e126-4ffe-8374-5520d70fffb1" data-file-name="components/dashboard/skoop-content.tsx">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden" data-unique-id="d510942a-d174-4b80-b8c0-9c1b4860377b" data-file-name="components/dashboard/skoop-content.tsx">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" data-unique-id="fb74b875-12d7-4dc8-9efb-2ae85fecafd7" data-file-name="components/dashboard/skoop-content.tsx" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs" data-unique-id="56b1d79e-8e7f-4949-a748-563fdabe4a6f" data-file-name="components/dashboard/skoop-content.tsx">
            <button className="flex items-center mr-3 hover:text-primary transition-colors" data-unique-id="a1b3839d-f171-4085-864f-3692c56a5920" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors" data-unique-id="9708c003-b200-46bf-b209-38699bb718d6" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto" data-unique-id="d4145c1a-1fe6-4766-98db-c84408d01c8a" data-file-name="components/dashboard/skoop-content.tsx">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="1571bdb4-1291-435d-9e1a-c35775b1d15b" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="d087ea6a-a3be-48a3-b4a8-3d849c288156" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-center mb-1" data-unique-id="75940806-4e60-4963-9516-dda3c9b43f52" data-file-name="components/dashboard/skoop-content.tsx">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1" data-unique-id="c2bf8af1-cc45-4f55-a462-a3ca7e4ff0d2" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1" data-unique-id="a6371a99-ce95-4d01-8097-5e32a2ce1b14" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2" data-unique-id="0f16ec18-7e2c-4640-80b7-42608b0405c4" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground" data-unique-id="6ffcc4a5-bcf4-45fd-9b30-bca83b29bb11" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3" data-unique-id="2a6c4bc4-3bc7-47c8-bac7-50ff18eb4d12" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3" data-unique-id="3da3c846-7fc3-4023-b3e3-636ab772ac62" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.language}</span>
        <span data-unique-id="9876c05e-1426-4f2b-a4e1-12a3a0e3ad36" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b4dce026-a09c-41c0-b454-c1add8678285" data-file-name="components/dashboard/skoop-content.tsx">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="42c17c99-2a7c-4165-b734-bece8a97987a" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="text-xs text-muted-foreground mb-1" data-unique-id="92f8f887-0bf2-437a-a29d-7a2425bfffd4" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.subreddit}<span className="editable-text" data-unique-id="887ad43e-1bdb-457b-956b-4ca3fc295f1d" data-file-name="components/dashboard/skoop-content.tsx"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1" data-unique-id="6df406c6-3f43-4ef4-9441-451f59326fcd" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground" data-unique-id="638403c6-28ba-453c-8004-c587af29e0d4" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8ca22183-efbf-4510-821e-7a01ba9d9e5b" data-file-name="components/dashboard/skoop-content.tsx">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs" data-unique-id="7bb2349c-415c-4165-9e27-aecdd5779e89" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3 text-muted-foreground" data-unique-id="b94be2ee-36cc-4d37-9e15-5fa94b3c68df" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground" data-unique-id="63a8aef8-d48b-4e07-a81f-b9cf0dcc28f1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto" data-unique-id="05741aaa-ef9d-4a5b-9293-bce45eaf661d" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="c2d63d6b-ebd3-45fc-b08f-5e4c6b9887a8" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="93d85e93-ca7b-42c9-bced-954686c3ea71" data-file-name="components/dashboard/skoop-content.tsx">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2" data-unique-id="9ae4dad4-cc97-41ca-a6fe-e1bdf61cb023" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2" data-unique-id="324e1409-3e79-4f42-9842-ab5285c48d88" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.tags.map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary" data-unique-id="2a3d42df-0210-47aa-b3b0-de722569a2a9" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between" data-unique-id="fa22bff2-c159-4fa8-afbe-a6c31129dbab" data-file-name="components/dashboard/skoop-content.tsx">
        <div data-unique-id="5c9d8659-8306-4157-b07b-4e51348e5a9b" data-file-name="components/dashboard/skoop-content.tsx">
          <span className="mr-3" data-unique-id="21291854-d01a-45dd-964f-1ce65d14ddde" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.votes}<span className="editable-text" data-unique-id="b31a55f3-8f96-47fc-a63c-f78063e13251" data-file-name="components/dashboard/skoop-content.tsx"> votes</span></span>
          <span className="mr-3" data-unique-id="09d956bb-a23c-48a0-9968-36a75af4604a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.answers}<span className="editable-text" data-unique-id="a68e86a3-2f76-4189-8c90-e82c734c7898" data-file-name="components/dashboard/skoop-content.tsx"> answers</span></span>
          <span data-unique-id="502d5580-5aca-48b9-aeec-24dd617822e7" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.views}<span className="editable-text" data-unique-id="ea41d99c-bd3a-47b2-b90b-f688213458d3" data-file-name="components/dashboard/skoop-content.tsx"> views</span></span>
        </div>
        <div className="text-right" data-unique-id="f6f6e4cc-dc01-474e-9c6b-f7a5f71ad5b1" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</div>
      </div>
      <div className="mt-2 text-right" data-unique-id="e54a549b-fc7d-4e8b-8f12-e65b9d398b53" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="h-7 p-1" data-unique-id="6c2e630a-7060-43d5-a81a-88e192015ca1" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}