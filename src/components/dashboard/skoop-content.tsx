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
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold"><span className="editable-text">Skoop Content</span></h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsAddingColumn(!isAddingColumn)} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" /><span className="editable-text">
            Add Column
          </span></Button>
          <Button className="skoop-button-primary">
            <RefreshCw className="h-4 w-4 mr-2" /><span className="editable-text">
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
    }}>
          <h3 className="text-sm font-medium mb-3"><span className="editable-text">Add Content Column</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableColumns.map(column => <button key={column.id} className={cn("p-3 rounded-lg flex items-center justify-center flex-col text-center transition-all", activeColumns.includes(column.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer")} onClick={() => !activeColumns.includes(column.id) && addColumn(column.id)} disabled={activeColumns.includes(column.id)}>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2", column.color)}>
                  <column.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{column.name}</span>
                {activeColumns.includes(column.id) && <span className="text-xs text-muted-foreground mt-1"><span className="editable-text">Already added</span></span>}
              </button>)}
          </div>
        </motion.div>}
      
      {/* Content columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
        {activeColumns.map(columnId => {
        const column = contentStreams.find(stream => stream.id === columnId);
        if (!column) return null;
        return <ContentColumn key={columnId} column={column} onRemove={() => removeColumn(columnId)} />;
      })}
        
        {activeColumns.length === 0 && <div className="skoop-card p-8 text-center col-span-full">
            <div className="text-lg font-medium mb-2"><span className="editable-text">No content columns added</span></div>
            <p className="text-muted-foreground mb-4"><span className="editable-text">
              Add content columns to see the latest updates from your favorite platforms
            </span></p>
            <Button onClick={() => setIsAddingColumn(true)} className="skoop-button-primary">
              <Plus className="h-4 w-4 mr-2" /><span className="editable-text">
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
  }}>
      {/* Column header */}
      <div className={cn("p-3 flex items-center justify-between rounded-t-[var(--radius)]", column.color)}>
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-white mr-2" />
          <h3 className="font-medium text-white">{column.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Column content */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {column.id === "twitter" && column.items.map(item => <TwitterCard key={item.id} item={item as any} />)}
          
          {column.id === "github" && column.items.map(item => <GitHubCard key={item.id} item={item as any} />)}
          
          {column.id === "reddit" && column.items.map(item => <RedditCard key={item.id} item={item as any} />)}
          
          {column.id === "stackoverflow" && column.items.map(item => <StackOverflowCard key={item.id} item={item as any} />)}
        </div>
      </div>
      
      {/* Column footer */}
      <div className="p-2 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full text-primary">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text">
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
  return <div className="skoop-card p-3">
      <div className="flex items-start">
        <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0">
          <Image src={item.avatar} alt={item.author} width={36} height={36} className="object-cover h-full w-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm">
            <span className="font-medium truncate">{item.author}</span>
            <span className="text-muted-foreground ml-1 truncate">{item.handle}</span>
            <span className="text-muted-foreground ml-1"><span className="editable-text">·</span></span>
            <span className="text-muted-foreground ml-1">{item.time}</span>
          </div>
          <p className="text-sm mt-1">{item.content}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 hover:underline flex items-center">
              {item.link.substring(0, 30)}<span className="editable-text">...
              </span><ExternalLink className="h-3 w-3 ml-1" />
            </a>}
          {item.image && <div className="mt-2 rounded-lg overflow-hidden">
              <Image src={item.image} alt="Tweet image" width={500} height={250} className="object-cover w-full h-auto" />
            </div>}
          <div className="flex items-center mt-2 text-muted-foreground text-xs">
            <button className="flex items-center mr-3 hover:text-primary transition-colors">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {item.replies}
            </button>
            <button className="flex items-center hover:text-red-500 transition-colors">
              <Star className="h-3.5 w-3.5 mr-1" />
              {item.likes}
            </button>
            <div className="ml-auto">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-1">
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
  return <div className="skoop-card p-3">
      <div className="flex items-center mb-1">
        <Github className="h-4 w-4 mr-2" />
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate flex-1">
          {item.repo}
        </a>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-1 ml-1">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
      <div className="flex items-center text-xs text-muted-foreground">
        <span className="flex items-center mr-3">
          <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
          {item.stars}
        </span>
        <span className="mr-3">{item.language}</span>
        <span><span className="editable-text">Updated </span>{item.updated}</span>
      </div>
    </div>;
}

// Reddit card
function RedditCard({
  item
}: {
  item: any;
}) {
  return <div className="skoop-card p-3">
      <div className="text-xs text-muted-foreground mb-1">{item.subreddit}<span className="editable-text"> • </span>{item.time}</div>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-1">
        {item.title}
      </a>
      <div className="text-xs text-muted-foreground"><span className="editable-text">Posted by u/</span>{item.author}</div>
      <div className="flex items-center mt-2 text-xs">
        <span className="flex items-center mr-3 text-muted-foreground">
          <ArrowUp className="h-3.5 w-3.5 mr-1" />
          {item.upvotes}
        </span>
        <span className="flex items-center text-muted-foreground">
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {item.comments}
        </span>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-1">
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
  return <div className="skoop-card p-3">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline block mb-2">
        {item.title}
      </a>
      <div className="flex flex-wrap gap-1 mb-2">
        {item.tags.map((tag: string) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary">
            {tag}
          </span>)}
      </div>
      <div className="flex items-center text-xs text-muted-foreground justify-between">
        <div>
          <span className="mr-3">{item.votes}<span className="editable-text"> votes</span></span>
          <span className="mr-3">{item.answers}<span className="editable-text"> answers</span></span>
          <span>{item.views}<span className="editable-text"> views</span></span>
        </div>
        <div className="text-right">{item.time}</div>
      </div>
      <div className="mt-2 text-right">
        <Button variant="ghost" size="sm" className="h-7 p-1">
          <BookmarkCheck className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>;
}