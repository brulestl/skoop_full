'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Settings, MoreHorizontal, RefreshCw, Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, ExternalLink, Star, ArrowUp, MessageSquare, BookmarkCheck } from "lucide-react";
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
  return <div data-unique-id="986b3579-7ada-4586-a592-945c42bfbddf" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="2b23ba84-0c16-4c23-a5ba-6e785980d69c" data-file-name="components/dashboard/skoop-content.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="603a1c79-22d9-45cd-8400-85ebde903ca5" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="9160c49e-6752-4085-9c2c-0f91ac628192" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h1>
        <div className="flex space-x-2" data-unique-id="3b0e4a8a-6da2-4b2c-804e-c440bfe6f2f7" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center" data-unique-id="3a6f27f1-8881-4a9f-bdc1-2af1dbd22de1" data-file-name="components/dashboard/skoop-content.tsx">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline" data-unique-id="57f55f7b-f695-4a2c-9312-f5c52641c047" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="76436740-34af-4106-b857-c922dcbf9597" data-file-name="components/dashboard/skoop-content.tsx">Add Column</span></span>
          </Button>
          <Button className="skoop-button-primary hidden sm:flex" data-unique-id="23d26b4c-e1d4-441e-81de-0b97b9c29bf0" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline" data-unique-id="0391631b-12bd-4afd-86f5-eef2e84dfc95" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="5c0d469d-0492-4080-ad21-4c827e7f2c55" data-file-name="components/dashboard/skoop-content.tsx">Refresh All</span></span>
          </Button>
          <Button className="skoop-button-primary sm:hidden" size="icon" data-unique-id="9eb55eba-8ffb-4488-9d7f-35cc8983af66" data-file-name="components/dashboard/skoop-content.tsx">
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
    }} data-unique-id="32b0307f-e9a0-4141-ad66-f731e8153844" data-file-name="components/dashboard/skoop-content.tsx">
          <h3 className="text-sm font-medium mb-3" data-unique-id="951cdb45-765e-4b21-b2f2-01f810166d26" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="b7aeada1-0a54-4ccf-b9d5-8001d528071e" data-file-name="components/dashboard/skoop-content.tsx">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-unique-id="11fe44a8-c792-451f-9f86-c778dcf37055" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)} data-unique-id="91f363a6-a9fa-470b-9de6-66c98f784d29" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)} data-unique-id="7367085b-5efa-4e92-96c8-d2a7563e4b6a" data-file-name="components/dashboard/skoop-content.tsx">
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium" data-unique-id="07af2c90-dc38-4f43-9b18-8d326454ba03" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1" data-unique-id="7e5f6b53-a6b9-4b8e-a5b0-ac1f290b0377" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="652ddd59-bec8-41b3-b896-c9ca25928a4d" data-file-name="components/dashboard/skoop-content.tsx">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory" data-unique-id="29b70bd9-c347-43ab-89b3-730c9849d1ac" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {activeColumns.map(columnId => {
        const column = contentStreams.find(stream => stream.id === columnId);
        if (!column) return null;
        return <div key={columnId} className="min-w-[280px] snap-center" data-unique-id="7d79e0ca-bc9d-40b3-9b53-3d9c328864b8" data-file-name="components/dashboard/skoop-content.tsx">
              <ContentColumn column={column} onRemove={() => removeColumn(columnId)} />
            </div>;
      })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full" data-unique-id="893dedfa-81e4-49af-b20e-b38ccafe56ac" data-file-name="components/dashboard/skoop-content.tsx">
            <div className="text-lg font-medium mb-2" data-unique-id="61515aad-b1cf-4937-808d-eaae7fe2ab22" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="65b26cb9-56ac-4c6b-90bd-3f512a733aff" data-file-name="components/dashboard/skoop-content.tsx">No content columns added</span></div>
            <p className="text-muted-foreground mb-4" data-unique-id="3e28478c-52a2-4f56-ab2b-42073c4da451" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="b2ac12b8-6b0c-484d-8c13-55835a2432e3" data-file-name="components/dashboard/skoop-content.tsx">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary" data-unique-id="1515376e-8f62-4137-959b-8b713a8da15d" data-file-name="components/dashboard/skoop-content.tsx">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="749fd31b-ff03-429d-a79a-59d515ad6933" data-file-name="components/dashboard/skoop-content.tsx">
              Add Your First Column
            </span></Button>
          </div>}
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
  }} data-unique-id="c7408d2e-432b-47fe-8be3-746365c45f97" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)} data-unique-id="134dcc55-5e55-4e5a-b448-f8da1eef10b0" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="flex items-center" data-unique-id="36d2e98c-9fee-4b35-8d48-7fbb63b89d5b" data-file-name="components/dashboard/skoop-content.tsx">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white" data-unique-id="e8e8cbba-6aef-467a-9318-4e1b2be1918b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.title}</h3>
        </div>
        <div className="flex items-center space-x-1" data-unique-id="b81d984f-fd3d-4c89-8dc7-65cf376081b8" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" data-unique-id="35bd23f2-215e-49df-b2cd-1317b6615f6b" data-file-name="components/dashboard/skoop-content.tsx">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove} data-unique-id="dd3bfef5-afc9-41ed-9eb3-927cc4aaef50" data-file-name="components/dashboard/skoop-content.tsx">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2" data-unique-id="23c41bea-16f4-4190-9fb3-8a7f1d27b072" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="space-y-2" data-unique-id="5827332a-3234-4a04-81cc-a976a42806a4" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {column.id === "twitter" && column.items.map(item => <TwitterCard key={item.id} item={item as any} />)}
          
          {column.id === "github" && column.items.map(item => <GitHubCard key={item.id} item={item as any} />)}
          
          {column.id === "reddit" && column.items.map(item => <RedditCard key={item.id} item={item as any} />)}
          
          {column.id === "stackoverflow" && column.items.map(item => <StackOverflowCard key={item.id} item={item as any} />)}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border" data-unique-id="9350e12b-b00e-4faf-add3-3023499d7d6f" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="w-full text-primary" data-unique-id="aa7f1719-ead3-44e2-abec-9c921cef4f1e" data-file-name="components/dashboard/skoop-content.tsx">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="d8f36c47-f08a-49ae-b341-884a920a6ef1" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="955bc3a4-24f4-4a61-9057-df712d18933c" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-start" data-unique-id="d6c5e6fe-02bc-4f3a-a0f3-62b499a83e18" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0" data-unique-id="a8abcc67-3922-4eef-81bd-d83602394720" data-file-name="components/dashboard/skoop-content.tsx">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" data-unique-id="4f59c8bf-a9f7-481d-9cd2-3c6a25e9da1c" data-file-name="components/dashboard/skoop-content.tsx" />
        </div>
        <div className="flex-1 min-w-0" data-unique-id="f0df0461-ba50-4d2e-a6dd-7401e1777449" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <div className="flex items-center text-sm" data-unique-id="2366faf6-6f2f-4709-b8d0-c92ae44b9028" data-file-name="components/dashboard/skoop-content.tsx">
            <span className="font-medium truncate" data-unique-id="1a0ff092-a3a8-499b-a4a8-7ba2d6b10005" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate" data-unique-id="e0c2fea2-aec8-4629-a645-b48c1471b280" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.handle}</span>
            <span className="text-muted-foreground ml-1" data-unique-id="eeec0117-6ab7-407a-aa8a-15302804c109" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="9720a1fc-8739-413a-acc5-5f3a9f19b389" data-file-name="components/dashboard/skoop-content.tsx">·</span></span>
            <span className="text-muted-foreground ml-1" data-unique-id="df85cf5a-f477-4a67-9335-f7f529e6bbde" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</span>
          </div>
          <p className="text-sm mt-1" data-unique-id="f6d32da8-abeb-4442-96b3-260e2de30c3b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center" data-unique-id="294d9275-e833-4552-9946-18bb8f839c93" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              {item.link.substring(0, 30)}<span className="editable-text" data-unique-id="5816e6f5-691c-4085-aaa5-d2e8aceb5e10" data-file-name="components/dashboard/skoop-content.tsx">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden" data-unique-id="5cc81546-6e4f-4678-9867-bb8b637b4628" data-file-name="components/dashboard/skoop-content.tsx">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" data-unique-id="16ae2ea1-9a06-44a6-b07e-4c637d152b85" data-file-name="components/dashboard/skoop-content.tsx" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs" data-unique-id="e37abd27-e79c-4241-be0c-403bef3d8947" data-file-name="components/dashboard/skoop-content.tsx">
            <button className="flex items-center mr-3 hover:text-primary transition-colors" data-unique-id="0e64a4ae-4e84-4281-b7e9-c06c93d91fc3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors" data-unique-id="996d1dbe-eeaf-4b70-bf9c-1d792c4f2b4d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto" data-unique-id="497c133f-6b7e-43a7-b0b7-83225a42bedd" data-file-name="components/dashboard/skoop-content.tsx">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="d277facd-4328-43cc-9ed0-dbc5ab73d27b" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="996edc18-6817-4f0b-a4de-a27309446eec" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-center mb-1" data-unique-id="2cd115cc-e1b0-425e-a411-e3903119f532" data-file-name="components/dashboard/skoop-content.tsx">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1" data-unique-id="fce8453d-ef8b-44ff-8c63-83c73b3d6d7c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1" data-unique-id="c5dec57f-b38c-480b-8c5a-20f0da4a07e9" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2" data-unique-id="8e6b34b9-f0db-44e3-be4b-197ca24ebaee" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground" data-unique-id="2a2c8dc1-5694-493d-b8da-146bb7d4e2fc" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3" data-unique-id="4372524c-4d23-4c62-a5a8-ff0b0019495b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3" data-unique-id="d89cc40b-dbff-4864-9b77-4b8adef185c8" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.language}</span>
        <span data-unique-id="90205cca-21b1-4126-bb85-3d6edf63b0ea" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="db3a47cb-82ff-408b-87fa-e12147425c6c" data-file-name="components/dashboard/skoop-content.tsx">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="83106111-a453-41f8-b9dd-c8ad6b2d4cfe" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="text-xs text-muted-foreground mb-1" data-unique-id="8ba2f873-1f9e-47b6-9447-6f9ef3a36cab" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.subreddit}<span className="editable-text" data-unique-id="0b35db98-b04a-48c5-8ec7-ef478c605c20" data-file-name="components/dashboard/skoop-content.tsx"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1" data-unique-id="2095fc26-17a3-402a-95ff-ea4c9419ba8f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground" data-unique-id="27ebba37-2873-4470-a913-590de57f8803" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="eab6ab89-d19c-48f3-a5dd-be4dd85e4754" data-file-name="components/dashboard/skoop-content.tsx">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs" data-unique-id="28a19266-2f7f-4425-9401-dfe2f9925283" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3 text-muted-foreground" data-unique-id="9cf2db29-8864-4f14-94f6-8e8a2a4b3d4e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground" data-unique-id="08ed34f7-1814-478e-84d5-a50c363e67d6" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto" data-unique-id="ade1a75a-2c5f-4867-8db6-6889e6f482e0" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="f6b75339-473a-421a-9c79-94a8c29d1a7d" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="c67183db-a5de-4691-ae2a-994c7db06967" data-file-name="components/dashboard/skoop-content.tsx">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2" data-unique-id="2c088055-3936-454a-83b0-7a961fed3a3c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2" data-unique-id="83d3bf72-f2a5-4a0d-8edf-df7ebc783a20" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.tags.map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary" data-unique-id="04afe85b-4aba-46f9-9367-cfd78e60c23d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between" data-unique-id="3cc97864-9a8f-4138-8278-1100392c0e72" data-file-name="components/dashboard/skoop-content.tsx">
        <div data-unique-id="7c896ac6-0018-42ae-8c6b-84d012a9c946" data-file-name="components/dashboard/skoop-content.tsx">
          <span className="mr-3" data-unique-id="3051fa9e-09fa-42cb-bb7d-3e52c5b51de6" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.votes}<span className="editable-text" data-unique-id="ef67acc5-0c62-4e42-ad14-128db66c89b5" data-file-name="components/dashboard/skoop-content.tsx"> votes</span></span>
          <span className="mr-3" data-unique-id="88ca0904-f21d-48e2-be21-99d5f22bbf9a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.answers}<span className="editable-text" data-unique-id="438ab27c-ca20-4ed8-9fdb-3ffbccc11271" data-file-name="components/dashboard/skoop-content.tsx"> answers</span></span>
          <span data-unique-id="82833023-5a44-4609-a3cb-2308586cf882" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.views}<span className="editable-text" data-unique-id="98b8d416-e5f5-4e92-8286-6d723861b02c" data-file-name="components/dashboard/skoop-content.tsx"> views</span></span>
        </div>
        <div className="text-right" data-unique-id="96ff7ec8-27d0-408a-850d-d165bb1d66dc" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</div>
      </div>
      <div className="mt-2 text-right" data-unique-id="ce51918c-3e0b-4c29-8d2f-2f8080b7cb8b" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="h-7 p-1" data-unique-id="5e95af31-0a81-4e3a-8150-450c00a8905b" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}