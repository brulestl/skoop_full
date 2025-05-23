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
  return <div data-unique-id="2e897b8a-cb1a-49dc-8c44-7525cec4e631" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="65267d5e-805a-46db-9d44-066b66d2f08a" data-file-name="components/dashboard/skoop-content.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="9a4ece42-052c-4d18-b072-f14574187350" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="faebe975-f906-46c3-aa06-1b276d414a7a" data-file-name="components/dashboard/skoop-content.tsx">Skoop Content</span></h1>
        <div className="flex space-x-2" data-unique-id="639d85d1-a9ab-4fe7-9643-55543d886298" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center" data-unique-id="db214c03-bcb0-4177-852b-9d94963b2192" data-file-name="components/dashboard/skoop-content.tsx">
            <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c1011cbe-563a-4bc5-bd64-ef11d59a39e0" data-file-name="components/dashboard/skoop-content.tsx">
            Add Column
          </span></Button>
          <Button className="skoop-button-primary" data-unique-id="54ec3ab4-f2e1-49ef-96ac-a60f04aa15d8" data-file-name="components/dashboard/skoop-content.tsx">
            <RefreshCw className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="2e3278d4-d999-4f6d-8ab6-3eba0bd2e691" data-file-name="components/dashboard/skoop-content.tsx">
            Refresh All
          </span></Button>
        </div>
      </div>
      
      {/* Add Column dropdown */}
      {isAddingColumn && <motion.div className="mb-6 skoop-card p-4" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} data-unique-id="cde053ae-e981-4ff1-8530-33425bed7afa" data-file-name="components/dashboard/skoop-content.tsx">
          <h3 className="text-sm font-medium mb-3" data-unique-id="1d4afb14-2c69-4744-85c9-af29def7b66f" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="68ae3ed9-a778-49d7-aeb4-bbe7d5868246" data-file-name="components/dashboard/skoop-content.tsx">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-unique-id="e2f67640-1b34-48bc-9f6b-2243de76ecc5" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)} data-unique-id="dcfb3307-5aa1-4260-8364-970ac76ce31d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)} data-unique-id="0dde8a1c-bccc-473b-a649-cec0be05f2b5" data-file-name="components/dashboard/skoop-content.tsx">
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium" data-unique-id="27874a15-5f10-4e1c-aca1-8d92ec1d266c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1" data-unique-id="70b01f0c-647c-4164-8988-e5788d26e023" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="bfcf6691-ca77-4dc7-8f1e-dfa9da5c21d4" data-file-name="components/dashboard/skoop-content.tsx">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto" data-unique-id="d9ac8a7c-e532-457d-80c3-ef320e293327" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {activeColumns.map(columnId => {
        const column = contentStreams.find(stream => stream.id === columnId);
        if (!column) return null;
        return <ContentColumn key={columnId} column={column} onRemove={() => removeColumn(columnId)} />;
      })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full" data-unique-id="8c4df249-e0fb-45c8-9c07-f983e39126f8" data-file-name="components/dashboard/skoop-content.tsx">
            <div className="text-lg font-medium mb-2" data-unique-id="e1eb0021-256b-4f74-b0b9-38542661f323" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="b01adaf5-3271-43e8-b132-f90d7c68f4c2" data-file-name="components/dashboard/skoop-content.tsx">No content columns added</span></div>
            <p className="text-muted-foreground mb-4" data-unique-id="5dc2251f-08ab-4186-9a7e-ff2c0c1ae64c" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="265ea9bf-02dd-4b10-8a30-6af5d2707a18" data-file-name="components/dashboard/skoop-content.tsx">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary" data-unique-id="9b2b8ea5-68b7-45fb-93a5-73fc264094a3" data-file-name="components/dashboard/skoop-content.tsx">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7f0191d3-839a-403c-a9c7-1d37e83b38ee" data-file-name="components/dashboard/skoop-content.tsx">
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
  }} data-unique-id="09c91fbf-f84b-4143-aef3-984b576c5b71" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)} data-unique-id="e01c34f7-28cc-479e-bca1-a1de7f964d65" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="flex items-center" data-unique-id="9fb33e81-a5d9-4e3f-9ffc-bb73e9f88f35" data-file-name="components/dashboard/skoop-content.tsx">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white" data-unique-id="0c94a848-c348-4f0f-b9dd-4536226fb4f3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{column.title}</h3>
        </div>
        <div className="flex items-center space-x-1" data-unique-id="22c99e25-d4b1-4975-b2ce-d384a7d219e5" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" data-unique-id="0efd3c15-700c-4f2a-9567-4576827a775a" data-file-name="components/dashboard/skoop-content.tsx">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove} data-unique-id="d5cf9d47-0c6a-4666-b579-bfd2a9d395cc" data-file-name="components/dashboard/skoop-content.tsx">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2" data-unique-id="891311df-6868-449c-a991-ec80b071ef97" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="space-y-2" data-unique-id="c2abfb1c-7e5b-4d3f-8abc-934ced88c03d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {column.id === "twitter" && column.items.map(item => <TwitterCard key={item.id} item={item as any} />)}
          
          {column.id === "github" && column.items.map(item => <GitHubCard key={item.id} item={item as any} />)}
          
          {column.id === "reddit" && column.items.map(item => <RedditCard key={item.id} item={item as any} />)}
          
          {column.id === "stackoverflow" && column.items.map(item => <StackOverflowCard key={item.id} item={item as any} />)}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border" data-unique-id="72b5362a-696a-4675-a6f4-cdeb47dcf074" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="w-full text-primary" data-unique-id="9d39303f-ad52-4028-8468-dca9c70b3ecc" data-file-name="components/dashboard/skoop-content.tsx">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="6203214a-cd7f-47b9-9203-fefc3032c087" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="c9728531-6c37-449e-ae13-35ce3b84d9b4" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-start" data-unique-id="63acb9b2-908b-4388-9bc0-e068a6959286" data-file-name="components/dashboard/skoop-content.tsx">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0" data-unique-id="d79ade8b-e792-4045-83ec-0e465ca6c648" data-file-name="components/dashboard/skoop-content.tsx">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" data-unique-id="f63758be-79bb-4dd8-ba61-eaf40b7f180b" data-file-name="components/dashboard/skoop-content.tsx" />
        </div>
        <div className="flex-1 min-w-0" data-unique-id="2c4d14df-6cf6-4631-94c4-5b629c58e01c" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <div className="flex items-center text-sm" data-unique-id="3cafad66-213b-4c9e-acfc-5b7839b1b920" data-file-name="components/dashboard/skoop-content.tsx">
            <span className="font-medium truncate" data-unique-id="69d3c331-5023-4a0e-b79a-0055977110dc" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate" data-unique-id="2b4bdf7e-e60d-4d67-abdd-a9ac6566eff3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.handle}</span>
            <span className="text-muted-foreground ml-1" data-unique-id="c6d6f355-3780-419a-8723-158ee6c3233e" data-file-name="components/dashboard/skoop-content.tsx"><span className="editable-text" data-unique-id="99ec71ba-cb1a-49af-a13d-125ddb013ffd" data-file-name="components/dashboard/skoop-content.tsx">·</span></span>
            <span className="text-muted-foreground ml-1" data-unique-id="e8d3cfc6-7c42-4087-95aa-1f42a2519460" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</span>
          </div>
          <p className="text-sm mt-1" data-unique-id="ef1b09a1-ae78-4eba-a0d6-1464689b23dd" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center" data-unique-id="74a36116-7770-4e61-a3fe-d88452dc669d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              {item.link.substring(0, 30)}<span className="editable-text" data-unique-id="6a6d1978-8e4c-4e1f-bf2e-6aa4376e340d" data-file-name="components/dashboard/skoop-content.tsx">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden" data-unique-id="a6aa4a16-861f-474f-b99b-f9a520b8bf68" data-file-name="components/dashboard/skoop-content.tsx">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" data-unique-id="1b0abc32-70d1-4d96-ae89-2c9e56558e86" data-file-name="components/dashboard/skoop-content.tsx" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs" data-unique-id="a13157db-e38c-4bed-a3a7-f64f30740616" data-file-name="components/dashboard/skoop-content.tsx">
            <button className="flex items-center mr-3 hover:text-primary transition-colors" data-unique-id="a0ee21a4-797f-46c5-8083-43ca6cd2875b" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors" data-unique-id="6b78fefe-ced6-4225-a438-18894af6fdd3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto" data-unique-id="664e361e-889f-4fee-a111-7533abc2645e" data-file-name="components/dashboard/skoop-content.tsx">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="f4d1ebab-611a-486c-9ac3-69168628eb4e" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="1d4dc8ae-7a4c-427c-ab06-0e4e936a505b" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="flex items-center mb-1" data-unique-id="d2ec08c1-58bd-4cdd-b750-7724aa929b33" data-file-name="components/dashboard/skoop-content.tsx">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1" data-unique-id="206ea675-8546-4f6e-b3a9-257cd784de7e" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1" data-unique-id="dfc7279f-888e-4941-bdca-33641703a554" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2" data-unique-id="d6e0476f-b69a-4593-87c3-f2c4c157c1ab" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground" data-unique-id="8a5ecdbe-de0f-4d81-bf11-7d9490adb4db" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3" data-unique-id="34d8e43a-c8ac-42dd-9fb2-8d414f721bc9" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3" data-unique-id="7d5e5dc6-ec2f-4094-94bf-d0ff7c3a1f54" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.language}</span>
        <span data-unique-id="6d365a6d-9b11-4da5-b57d-306eb4235321" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="99355b36-80db-4f55-bebb-5c1f6b0a3e57" data-file-name="components/dashboard/skoop-content.tsx">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3" data-unique-id="bb9e737b-a688-4545-88e7-1a15ecbc220d" data-file-name="components/dashboard/skoop-content.tsx">
      <div className="text-xs text-muted-foreground mb-1" data-unique-id="502b949d-711a-4b64-9a07-980ac312814d" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.subreddit}<span className="editable-text" data-unique-id="db65b3bd-8e10-417a-abcd-6068fedb9812" data-file-name="components/dashboard/skoop-content.tsx"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1" data-unique-id="47035472-8839-4442-8279-27d78a952dd3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground" data-unique-id="450b2337-b123-45ab-bad2-252eea8f43ce" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="142c300e-9998-44ce-981b-1182e6aa95e6" data-file-name="components/dashboard/skoop-content.tsx">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs" data-unique-id="b6e9e0b2-5f22-4687-bdf3-49ac66251364" data-file-name="components/dashboard/skoop-content.tsx">
        <span className="flex items-center mr-3 text-muted-foreground" data-unique-id="e3091d7f-d6bb-49e2-a198-6b1277429799" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground" data-unique-id="d7ab03c8-72d7-41d5-8581-69d62f0f0c34" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto" data-unique-id="87419aaf-72f4-4f60-8ed2-dbe557b1d1d6" data-file-name="components/dashboard/skoop-content.tsx">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1" data-unique-id="72343d0f-98ba-42f2-b528-e2a31e073023" data-file-name="components/dashboard/skoop-content.tsx">
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
  return <div className="skoop-card p-3" data-unique-id="488116ec-4565-477f-b55a-4d8518fc4d8e" data-file-name="components/dashboard/skoop-content.tsx">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2" data-unique-id="727d6d81-dffd-485c-90bd-ed6304b45edb" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2" data-unique-id="1eddea42-998c-4104-9461-c16379df52fb" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
        {item.tags.map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary" data-unique-id="645739db-9863-4474-ac31-679e25a541f3" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between" data-unique-id="d5006b63-0464-40b2-b04e-03021a26be44" data-file-name="components/dashboard/skoop-content.tsx">
        <div data-unique-id="12d2a21e-31e3-437b-9f88-bd4c58f24636" data-file-name="components/dashboard/skoop-content.tsx">
          <span className="mr-3" data-unique-id="843d42d1-eb6e-479c-a799-c5647b5e766f" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.votes}<span className="editable-text" data-unique-id="ce931c09-5f2d-4379-b436-149c53e431c3" data-file-name="components/dashboard/skoop-content.tsx"> votes</span></span>
          <span className="mr-3" data-unique-id="3a17a04e-367d-4f34-b51d-c49642a762a0" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.answers}<span className="editable-text" data-unique-id="c0d92c19-58c9-444d-a9fa-312c3bdc7481" data-file-name="components/dashboard/skoop-content.tsx"> answers</span></span>
          <span data-unique-id="b383636a-c187-452a-89e2-edbe2a21b5cd" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.views}<span className="editable-text" data-unique-id="73dd2954-9d96-4e7d-9e35-b2bfc05f76a9" data-file-name="components/dashboard/skoop-content.tsx"> views</span></span>
        </div>
        <div className="text-right" data-unique-id="ca27e7ce-c8d0-4843-a47f-93df730eac1a" data-file-name="components/dashboard/skoop-content.tsx" data-dynamic-text="true">{item.time}</div>
      </div>
      <div className="mt-2 text-right" data-unique-id="a2475649-130b-4ee9-83e4-3c65eece4b9f" data-file-name="components/dashboard/skoop-content.tsx">
        <Button variant="ghost" size="sm" className="h-7 p-1" data-unique-id="700a401e-ba88-4fba-bd7b-0b5880d294a5" data-file-name="components/dashboard/skoop-content.tsx">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}