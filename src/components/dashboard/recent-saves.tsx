"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, Tags, Trash2, ExternalLink, ArrowRight, Sparkles, FileText, X, ChevronRight, FolderPlus, TrendingUp, ArrowDownAZ, Calendar, Heart, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AISummary from "@/components/ai/summary";
import { cn } from "@/lib/utils";
import { generateText } from '@/lib/api/util';

// Sample data for recent saves
const initialSaves = [{
  id: 1,
  title: "Advanced TypeScript Patterns for Building Robust Applications",
  description: "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
  content: "TypeScript offers powerful type system features that can help you build more robust applications. This guide explores advanced patterns like discriminated unions, which allow you to create type-safe state machines; branded types, which prevent type confusion between semantically different values; conditional types, which enable complex type transformations; and mapped types, which provide ways to transform existing types into new ones. These patterns help catch more errors at compile time and make your code more self-documenting.",
  source: "github",
  sourceUrl: "https://github.com/microsoft/TypeScript",
  savedAt: new Date(2023, 4, 18),
  tags: ["typescript", "programming", "web-development"],
  starred: true,
  engagement: {
    stars: 4256,
    forks: 782,
    saves: 980
  },
  image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop"
}, {
  id: 2,
  title: "Thread: 10 tips for better React performance in 2023",
  description: "Must-read performance tips for React in 2023, focusing on useMemo, useCallback and React 18's new concurrent features.",
  content: "1. Use React.memo() sparingly and only for components that render often with the same props. 2. Properly implement useCallback() for functions passed to child components. 3. Apply useMemo() for expensive calculations. 4. Use the new React 18 concurrent features like useTransition and useDeferredValue for smoother UIs. 5. Virtualize long lists with react-window or react-virtualized. 6. Split your app with code-splitting using React.lazy() and Suspense. 7. Avoid unnecessary re-renders by lifting state up or using context selectors. 8. Optimize context providers to prevent massive re-renders. 9. Use the profiler API to identify performance bottlenecks. 10. Consider using useEvent() hook (RFC stage) for stable callbacks without dependencies.",
  source: "twitter",
  sourceUrl: "https://twitter.com/dan_abramov/status/1234567890",
  savedAt: new Date(2023, 4, 16),
  tags: ["react", "javascript", "performance"],
  starred: false,
  engagement: {
    likes: 3821,
    retweets: 1432,
    replies: 341,
    saves: 6754
  },
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop"
}, {
  id: 3,
  title: "How to optimize PostgreSQL queries for large datasets",
  description: "Comprehensive guide to optimizing PostgreSQL queries for large datasets, covering indexes, query planning, and configuration tweaks.",
  content: "When working with large datasets in PostgreSQL, performance optimization becomes critical. This guide covers essential techniques: 1) Proper indexing strategies using B-tree, GIN, and specialized indexes 2) Query optimization with EXPLAIN ANALYZE to identify bottlenecks 3) Partitioning tables for better query performance 4) Effective use of prepared statements 5) Configuration tuning for memory allocation, work_mem and maintenance_work_mem 6) Vacuum and analyze scheduling to maintain statistics 7) Connection pooling implementation 8) When and how to use materialized views 9) Query rewriting techniques to leverage indexes better 10) Advanced PostgreSQL features like parallel queries for multi-core utilization.",
  source: "stackoverflow",
  sourceUrl: "https://stackoverflow.com/questions/12345678",
  savedAt: new Date(2023, 4, 15),
  tags: ["postgresql", "database", "performance"],
  starred: true,
  engagement: {
    votes: 758,
    answers: 24,
    views: 45692,
    saves: 2341
  },
  image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=500&auto=format&fit=crop"
}, {
  id: 4,
  title: "Designing beautiful and accessible UI components from scratch",
  description: "A detailed walkthrough of building UI components that are both visually stunning and fully accessible.",
  content: "Creating UI components that are both beautiful and accessible requires careful attention to design principles and accessibility standards. This guide walks through building components from scratch with a focus on inclusive design practices. We'll cover semantic HTML structure, ARIA attributes for enhanced accessibility, keyboard navigation implementation, focus management techniques, color contrast requirements, responsive design considerations, and animation guidelines that respect user preferences. Each component includes examples with both CSS and JavaScript implementations, along with testing procedures using screen readers and keyboard-only navigation.",
  source: "reddit",
  sourceUrl: "https://reddit.com/r/webdev/comments/12345",
  savedAt: new Date(2023, 4, 12),
  tags: ["ui", "design", "accessibility"],
  starred: false,
  engagement: {
    upvotes: 1254,
    comments: 87,
    awards: 3,
    saves: 843
  },
  image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=500&auto=format&fit=crop"
}, {
  id: 5,
  title: "Next.js App Router deep dive: Server Components explained",
  description: "Everything you need to know about Server Components in Next.js App Router and how they change React development.",
  content: "Next.js App Router introduces a revolutionary approach to building React applications with Server Components at its core. This deep dive explains how Server Components fundamentally change the React programming model by allowing components to run at build time or on the server, significantly reducing the JavaScript sent to the client. We explore the mental model behind the Client and Server component split, streaming and progressive rendering capabilities, nested layouts and routing patterns, data fetching strategies with and without fetch(), caching behaviors and revalidation techniques, and optimization strategies. The article includes practical examples showing migration paths from Pages Router to App Router while highlighting key architectural decisions.",
  source: "github",
  sourceUrl: "https://github.com/vercel/next.js",
  savedAt: new Date(2023, 4, 10),
  tags: ["nextjs", "react", "server-components"],
  starred: false,
  engagement: {
    stars: 1754,
    forks: 245,
    watches: 89,
    saves: 678
  },
  image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop"
}, {
  id: 6,
  title: "Modern CSS layout techniques with Grid and Flexbox",
  description: "A comprehensive overview of modern CSS layout patterns using Grid and Flexbox for responsive designs.",
  content: "CSS layout has evolved tremendously with Grid and Flexbox providing powerful tools for creating complex interfaces. This guide examines when to use each technology and how they can work together. We explore Grid's two-dimensional layout system perfect for overall page structure, alongside Flexbox's one-dimensional approach ideal for component alignment. Learn techniques for creating responsive grid systems without frameworks, mastering the fr unit, implementing auto-fit and auto-fill for dynamic layouts, building card interfaces, creating masonry layouts, and handling complex nested components with a mix of both technologies.",
  source: "github",
  sourceUrl: "https://github.com/css-tricks/css-grid-examples",
  savedAt: new Date(2023, 3, 28),
  tags: ["css", "frontend", "web-development"],
  starred: true,
  engagement: {
    stars: 3245,
    forks: 542,
    watches: 167,
    saves: 1845
  },
  image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop"
}, {
  id: 7,
  title: "Advanced Git workflows for team collaboration",
  description: "Learn efficient Git workflows that help teams collaborate more effectively on complex projects.",
  content: "Effective Git workflows are essential for team productivity and code quality. This guide explores several advanced patterns including Gitflow for structured releases, trunk-based development for continuous integration, GitHub flow for simplicity, and Git forking workflows for open-source projects. We cover practical implementation details like branching strategies, merge vs. rebase approaches, effective commit message conventions, handling merge conflicts elegantly, using Git hooks for automation, implementing code review processes, and integrating with CI/CD pipelines. Each section includes real-world examples and commands for implementation.",
  source: "github",
  sourceUrl: "https://github.com/gitflow/gitflow-workflow",
  savedAt: new Date(2023, 3, 23),
  tags: ["git", "workflow", "collaboration"],
  starred: false,
  engagement: {
    stars: 2456,
    forks: 389,
    watches: 124,
    saves: 1247
  },
  image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=500&auto=format&fit=crop"
}, {
  id: 8,
  title: "Building real-time applications with WebSockets and Socket.IO",
  description: "A practical guide to implementing real-time features using WebSockets and Socket.IO.",
  content: "Real-time functionality has become essential for modern web applications. This guide provides a comprehensive overview of WebSockets and Socket.IO for implementing features like live notifications, chat systems, collaborative editing, and real-time dashboards. We cover fundamental WebSocket concepts, the Socket.IO library's advantages, handling connection management and reconnection strategies, room-based communication models, scaling considerations with Redis adapters, security best practices for preventing common attacks, and performance optimization techniques. The article includes complete code examples for Node.js backend and React frontend integration.",
  source: "stackoverflow",
  sourceUrl: "https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets",
  savedAt: new Date(2023, 3, 18),
  tags: ["websockets", "socketio", "real-time"],
  starred: true,
  engagement: {
    votes: 965,
    answers: 42,
    views: 67254,
    saves: 3214
  },
  image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=500&auto=format&fit=crop"
}, {
  id: 9,
  title: "Building microservices architecture with Node.js",
  description: "Practical patterns for designing, implementing, and deploying microservices using Node.js.",
  content: "Microservices architecture offers many benefits for complex applications, and Node.js is particularly well-suited for this approach. This comprehensive guide explores microservice design principles, service decomposition strategies, inter-service communication patterns (REST, gRPC, message queues), data management across services, implementing the API Gateway pattern, handling distributed transactions, effective service discovery mechanisms, containerization with Docker and orchestration with Kubernetes, monitoring and observability with tools like Prometheus and Grafana, and implementing resilience patterns like circuit breakers and retries. The article includes architecture diagrams and example code for each pattern.",
  source: "twitter",
  sourceUrl: "https://twitter.com/nodejs/status/1234569876",
  savedAt: new Date(2023, 3, 14),
  tags: ["microservices", "nodejs", "architecture"],
  starred: false,
  engagement: {
    likes: 2540,
    retweets: 986,
    replies: 142,
    saves: 3765
  },
  image: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=500&auto=format&fit=crop"
}];

// Source icon mapping
const SourceIcon = ({
  source
}: {
  source: string;
}) => {
  switch (source) {
    case "github":
      return <Github className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "stackoverflow":
      return <StackOverflow className="h-4 w-4" />;
    case "reddit":
      return <Reddit className="h-4 w-4" />;
    default:
      return <BookmarkIcon className="h-4 w-4" />;
  }
};

// Card component for the grid view
const SaveCard = ({
  save,
  onShowAISummary,
  onAddToCollection
}: {
  save: typeof initialSaves[0];
  onShowAISummary: (save: typeof initialSaves[0]) => void;
  onAddToCollection: (save: typeof initialSaves[0]) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to format engagement numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  // Get the right engagement metric based on source
  const getEngagementMetric = () => {
    if (!save.engagement) return null;
    switch (save.source) {
      case 'github':
        return {
          icon: <Star className="h-3.5 w-3.5 fill-accent text-accent" />,
          value: formatNumber(save.engagement.stars),
          label: 'stars'
        };
      case 'twitter':
        return {
          icon: <Heart className="h-3.5 w-3.5 text-red-500" />,
          value: formatNumber(save.engagement.likes),
          label: 'likes'
        };
      case 'stackoverflow':
        return {
          icon: <TrendingUp className="h-3.5 w-3.5 text-orange-500" />,
          value: formatNumber(save.engagement.votes),
          label: 'votes'
        };
      case 'reddit':
        return {
          icon: <ArrowDownAZ className="h-3.5 w-3.5 text-orange-600" />,
          value: formatNumber(save.engagement.upvotes),
          label: 'upvotes'
        };
      default:
        return {
          icon: <Share2 className="h-3.5 w-3.5" />,
          value: formatNumber(save.engagement?.saves || 0),
          label: 'saves'
        };
    }
  };
  const engagementMetric = getEngagementMetric();
  return <motion.div className="skoop-card h-full overflow-hidden flex flex-col" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="0a1c60d4-bf84-46db-bc10-5fb1e5f599da" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="faa8dc14-41b3-49ec-b117-feba13d80d7a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="16fd09f6-9e68-43c2-84d2-a259f69b87cc" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="f6f748f2-b9b4-4120-af32-96492d3bf73f" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="cf510385-cb0b-4255-b4dc-00a0d829eeed" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="4a42af2e-c82d-4530-af97-d87bbef8e0a2" data-file-name="components/dashboard/recent-saves.tsx">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"} data-unique-id="35abb840-e10e-4230-a13f-f1da7bdbc12e" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs" data-unique-id="388252e8-71c3-41b9-b5dc-5c37b9d34f4a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium" data-unique-id="a1507882-ba62-449d-9f6d-432c0fd82b84" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="fb5ca681-198f-4718-9114-dfbb6e49996a" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="e38ce6b0-3ede-4e4b-ae97-b00f13e530a6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="bfcc7099-99fe-47d3-80fc-66d4d9377569" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="86301785-82fe-4215-a1a2-e8ff968e645a" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="30dd268e-e72b-467e-b4bc-1ee4292feb1f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="c6b701b6-1649-49a9-ad1d-87fae5669ebc" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="1fc699bb-d56e-4687-8d7e-71a8c4bb8bc0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="4f39261c-59e3-4fa9-bd7e-818cf9d47f5f" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="6d990857-a87f-41e5-b1c5-099efc0a0cbc" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="2a861324-6c0d-4253-a6ec-1a3afc88f694" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="5b582621-74fb-46a0-a847-07f4ac04feac" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="1b9e040e-9b1c-4076-a469-f5622be2d09f" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="55e9bdd2-14ac-43e2-96fc-0fc1804da4b4" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="7e65d3e1-1799-451c-996e-3a870e42c3fb" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="a80a534a-9071-43c4-a940-1077ef4daa62" data-file-name="components/dashboard/recent-saves.tsx">
              View Source
              </span><ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>;
};

// List item component for list view
const SaveListItem = ({
  save,
  onShowAISummary,
  onAddToCollection
}: {
  save: typeof initialSaves[0];
  onShowAISummary: (save: typeof initialSaves[0]) => void;
  onAddToCollection: (save: typeof initialSaves[0]) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to format engagement numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  // Get the right engagement metric based on source
  const getEngagementMetric = () => {
    if (!save.engagement) return null;
    switch (save.source) {
      case 'github':
        return {
          icon: <Star className="h-3.5 w-3.5 fill-accent text-accent" />,
          value: formatNumber(save.engagement.stars),
          label: 'stars'
        };
      case 'twitter':
        return {
          icon: <Heart className="h-3.5 w-3.5 text-red-500" />,
          value: formatNumber(save.engagement.likes),
          label: 'likes'
        };
      case 'stackoverflow':
        return {
          icon: <TrendingUp className="h-3.5 w-3.5 text-orange-500" />,
          value: formatNumber(save.engagement.votes),
          label: 'votes'
        };
      case 'reddit':
        return {
          icon: <ArrowDownAZ className="h-3.5 w-3.5 text-orange-600" />,
          value: formatNumber(save.engagement.upvotes),
          label: 'upvotes'
        };
      default:
        return {
          icon: <Share2 className="h-3.5 w-3.5" />,
          value: formatNumber(save.engagement?.saves || 0),
          label: 'saves'
        };
    }
  };
  const engagementMetric = getEngagementMetric();
  return <motion.div className="skoop-card p-4 group relative" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="c081051e-6544-4442-9a0f-143c1c26b132" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="d2f85ff1-424f-45f4-bb35-5e9a76727dbc" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="af9a0d3a-2bae-4bfa-9bd2-07585f610164" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="ba2ea41a-71ad-4d82-952a-16f233479d6a" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="1ed296b0-a412-4d81-be19-88e3d81f2039" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="36503886-39da-43d6-80bf-07f8d110abd2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="e524e355-264f-4c29-ad88-6679ba19f9ef" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="ae61dd70-9789-4bc1-a881-719d57d05e64" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs" data-unique-id="a736cbcf-936e-40a3-a1b8-c4d16d861122" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {engagementMetric.icon}
                <span className="ml-1 font-medium" data-unique-id="0a1a248d-9ed1-4e6b-8079-75e617f8572e" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground" data-unique-id="6f164c32-24bf-4879-a318-c378c368cb09" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3" data-unique-id="a9079419-23c1-4df4-b6b1-18bdd0754324" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="047f1d41-e37c-4cbd-92dc-dee9db14189a" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="20b05421-2bd9-4e32-a24f-007ae0dad04c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="30264a30-3bb6-434f-b2e0-11e9fce3064a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="b281d140-ffed-4a24-ab09-c7252d55ba48" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="33884f66-dfa4-47b6-b86c-94781183ef21" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="566bc7f4-4294-4307-b827-2689fc4d07e6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="2a701e6d-c5ff-4197-882b-e47e0b38140d" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="1d07768e-4be2-43c4-bb9e-eba33e5934fe" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="df495d90-2bd3-4970-8229-fe6504bf39b5" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="de7f7437-c60c-44ce-88aa-8fe3c923f08b" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bc816e63-4966-406f-8d22-3bffac79c99a" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="e71d6c08-1809-4b86-9c5c-f21898cb5045" data-file-name="components/dashboard/recent-saves.tsx">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only" data-unique-id="7f302a5a-3c67-4fea-93c4-8d23f839c3b8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7a36ddfb-49a9-449d-982a-b74e4e53cadb" data-file-name="components/dashboard/recent-saves.tsx">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="da8c7b12-e52c-4066-abcf-ba33ad5c48d0" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="a8ed078f-7168-42cb-8ee9-05fd658733bc" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="73be328e-bc1f-47aa-a93d-59507fb415ef" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="135c5861-8b5a-49ca-8b60-7707fd37cd91" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="d01ecbe8-a300-44e2-a62e-3f70356c3335" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bef251eb-6c2f-465a-aad4-d030b03058ca" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="e799c4aa-2982-4fbb-9559-ec3901e3abe3" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="06ee33a8-2597-4cf1-b5bd-be127dfe6c4e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5763fc71-51df-41a9-b246-832f7db229d5" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
        </Button>
      </div>
    </motion.div>;
};

// AI Summary Slide Panel Component
const AISummaryPanel = ({
  save,
  isOpen,
  onClose,
  selectedModel
}: {
  save: typeof initialSaves[0] | null;
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
}) => {
  const [fullSummary, setFullSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const generateFullSummary = async () => {
      if (!save) return;

      // Check cache first
      const cacheKey = `full-summary-${btoa(save.title + save.sourceUrl).slice(0, 32)}`;

      // Try to get from localStorage
      const isBrowser = typeof window !== 'undefined';
      if (isBrowser) {
        const cachedSummary = localStorage.getItem(cacheKey);
        if (cachedSummary) {
          setFullSummary(cachedSummary);
          return;
        }
      }
      setLoading(true);
      try {
        // Generate a more detailed summary with the selected AI model
        const inputText = save.content || save.description || save.title;
        const prompt = `Provide a detailed summary of the following content in about 300 words. Focus on the main concepts, key ideas, and practical applications. Use clear paragraphs and highlight any important technical details or insights:\n\n${inputText}`;
        const result = await generateText(prompt, selectedModel);
        const summaryText = result.text.trim();

        // Cache the result
        if (isBrowser) {
          localStorage.setItem(cacheKey, summaryText);
        }
        setFullSummary(summaryText);
      } catch (error) {
        console.error('Error generating full summary:', error);
        setFullSummary("Failed to generate a detailed summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (isOpen && save) {
      generateFullSummary();
    }
  }, [isOpen, save, selectedModel]);

  // If no save is provided, don't render anything
  if (!save) return null;
  return <AnimatePresence>
      {isOpen && <motion.div className="fixed inset-y-0 right-0 w-full md:max-w-md bg-card border-l border-border shadow-xl z-50 flex flex-col" initial={{
      x: "100%"
    }} animate={{
      x: 0
    }} exit={{
      x: "100%"
    }} transition={{
      type: "spring",
      damping: 25,
      stiffness: 300
    }} data-unique-id="def09f46-1e96-4ccf-b084-7d42b5577396" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="1ec307f1-b4cf-4bd4-99c1-f45721cbf093" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="f8027d2c-33e5-47fc-a200-0334e59e2682" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="159c9c4c-78b5-49fb-a030-6250903f9eaa" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bc0fbb7e-8f3f-452d-8ded-59efabcf644c" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="b22d747c-d67a-42db-a3ee-b545acddd751" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="cc931154-a0cf-4dc3-a07e-098eadcb7932" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ecf05be8-d9cc-499b-8176-56b932616282" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="5b5af8c0-fe51-4d15-98cb-f466b6ce54da" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="e31ba704-0ac8-4c75-9440-c2d449fba885" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="1399e6bc-d22a-4244-8f94-eab1d8a2332a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="20290c55-4ad8-482f-b902-58675810e46c" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="366f96f2-7497-4400-acad-3708152a12cf" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="447d080a-f7e0-4a5f-bccd-6146d35bb9df" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="0cc0cd49-ce8e-4807-97da-822251503ad1" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="6cfac11f-3a33-42cf-8bb8-496afae8bfff" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="6cdbf222-33fe-469d-9538-e3b5a551a1df" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="888286a8-6f8c-48e4-83e7-2d7c36da92df" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="7877cf64-3956-458f-8f22-f47ef6af2f13" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="36a102e2-f4f0-4208-beb5-40f31c1c58b0" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="c038eae9-324a-496d-80d9-40fc59c89c96" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="454b6dc7-aaf6-494a-a2b5-87ea04fda774" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="9296564f-8359-4254-bc83-66dca1f83c1a" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="e4cf2f2d-aa9b-4fa7-86fc-29a049329dbe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="f4feeff7-14f0-42e6-b2fd-cab860371abe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="8e30e415-e4b0-4770-93de-ee7f9ffcd8b0" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="df96a70b-02e1-4a66-8d8a-520c534b3dc1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="a256e340-acb3-41e8-9535-17806d36f0ae" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="9bae8210-04f2-4334-933a-2de898ac0014" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="306835cd-1eec-4ec5-9857-c26b2204bd51" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="ee234532-227d-4cd6-ba85-bead9cb7f8cd" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="c5811eba-cdfc-497a-adcf-23737ccdb0ad" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="4ef5a5a5-4883-4b41-af75-5f312e1fb99e" data-file-name="components/dashboard/recent-saves.tsx">
              View Original
              </span><ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>}
      
      {/* Backdrop */}
      {isOpen && <motion.div className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} data-unique-id="294e3bb8-fdaf-4d09-a6fe-32f2a23fb255" data-file-name="components/dashboard/recent-saves.tsx" />}
    </AnimatePresence>;
};
export default function RecentSaves() {
  // State for loading more content
  const [visibleSaves, setVisibleSaves] = useState<typeof initialSaves>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // State for panel and view options
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
  const [selectedSave, setSelectedSave] = useState<typeof initialSaves[0] | null>(null);

  // State for collection and sorting
  const [addToCollectionModalOpen, setAddToCollectionModalOpen] = useState(false);
  const [saveToAdd, setSaveToAdd] = useState<typeof initialSaves[0] | null>(null);
  const [sortOption, setSortOption] = useState<'latest' | 'earliest' | 'popular'>('latest');

  // Sort and filter function
  const getSortedSaves = () => {
    let sorted = [...initialSaves];
    switch (sortOption) {
      case 'latest':
        sorted = sorted.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
        break;
      case 'earliest':
        sorted = sorted.sort((a, b) => a.savedAt.getTime() - b.savedAt.getTime());
        break;
      case 'popular':
        sorted = sorted.sort((a, b) => {
          const aPopularity = a.engagement?.saves || 0;
          const bPopularity = b.engagement?.saves || 0;
          return bPopularity - aPopularity;
        });
        break;
    }
    return sorted;
  };

  // Simulating loading more data
  const loadMoreSaves = () => {
    setLoading(true);

    // Get the sorted data
    const sortedData = getSortedSaves();

    // Simulate API call delay
    setTimeout(() => {
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      if (startIndex >= sortedData.length) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const newItems = sortedData.slice(0, endIndex);
      setVisibleSaves(newItems);
      setPage(prevPage => prevPage + 1);
      setLoading(false);

      // Check if there are more items to load
      setHasMore(endIndex < sortedData.length);
    }, 1000);
  };

  // Handle infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreSaves();
      }
    }, {
      threshold: 0.5
    });
    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }
    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [hasMore, loading]);

  // Initial load
  useEffect(() => {
    loadMoreSaves();
  }, []);

  // Handle model toggle
  const toggleModel = () => {
    setSelectedModel(selectedModel === 'claude-bedrock' ? 'azure-gpt-4o' : 'claude-bedrock');
  };

  // Handle showing AI summary panel
  const handleShowAISummary = (save: typeof initialSaves[0]) => {
    setSelectedSave(save);
    setSummaryPanelOpen(true);
  };

  // Handle add to collection
  const handleAddToCollection = (save: typeof initialSaves[0]) => {
    setSaveToAdd(save);
    setAddToCollectionModalOpen(true);
  };
  return <div className="flex flex-col h-full" data-unique-id="90ee202f-b0ce-4ae1-a40f-b4fd94f085f7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="26bf8272-3fa2-4413-b0a2-ca61c7ce668d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <div className="flex items-center justify-between mb-4" data-unique-id="921ba572-8659-4149-a17c-01fd1e30f814" data-file-name="components/dashboard/recent-saves.tsx">
          <h1 className="text-2xl font-semibold" data-unique-id="a0406055-ba78-4f9c-b5cb-634d0bc25213" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5b4d3525-9dd0-4684-a404-5ac6278b56b8" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
          <div className="flex items-center space-x-3" data-unique-id="793ed8ec-8161-498f-897c-8ce5b5b1cee3" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="dc345ac7-59d8-4738-a9c4-8d19e761ef5f" data-file-name="components/dashboard/recent-saves.tsx">
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              <span data-unique-id="a55673cb-75cf-4e3e-b390-830bbc37873b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="f7037caa-12a9-43db-9336-d9228bd40727" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="b602c3d3-05ec-46f0-9454-93204dd41a44" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('card')} data-unique-id="7f7bb371-b764-48d3-8570-8ed812aa5420" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="df14f63b-c321-41ef-8391-c7de23308581" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="e8204505-d545-46bd-8ab5-7dbdc1d6d692" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="40db4a45-0a43-4678-959a-63c5b2eb43ae" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex items-center justify-between" data-unique-id="7012d1d2-b3d1-4624-9b81-e9b9b9fbd028" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="text-sm text-muted-foreground" data-unique-id="14ffb5a2-b785-43f4-917c-029dfb786419" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="3319bc2e-18ad-437f-8d6e-53023346c9fd" data-file-name="components/dashboard/recent-saves.tsx">
            Showing </span>{visibleSaves.length}<span className="editable-text" data-unique-id="fe8bb618-9757-4bb0-80d3-e32ffad98fc6" data-file-name="components/dashboard/recent-saves.tsx"> of </span>{initialSaves.length}<span className="editable-text" data-unique-id="53c26b91-89d2-4c51-a7cc-b12a52d20465" data-file-name="components/dashboard/recent-saves.tsx"> saves
          </span></div>
          
          <div className="flex items-center space-x-2" data-unique-id="3a6e5c7b-9d05-4de0-94ec-debedf19a4ff" data-file-name="components/dashboard/recent-saves.tsx">
            <span className="text-sm text-muted-foreground" data-unique-id="9efef920-d2b7-4b01-bc0c-66f32415f998" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="c45ddc06-e335-41ba-b492-b0f8f61ac5a4" data-file-name="components/dashboard/recent-saves.tsx">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="5300075e-0ead-42c4-b3a4-0f299009be3f" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="e0f4c143-73d9-4ca8-94b5-4fdffeb1e925" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="cb613534-f01e-46ff-bbb6-4c2533afc098" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="e5b9212c-6c1e-46fe-b778-14b8067309d7" data-file-name="components/dashboard/recent-saves.tsx">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="3bf3ee87-dfdb-4058-bc2f-cdc75ca9695a" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="899143c4-e83a-441f-a95b-9b6b2c7b0dc2" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="f460048f-9a45-411e-885b-8afab3dcd1ed" data-file-name="components/dashboard/recent-saves.tsx">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="52e9c994-6368-470c-bdb0-6cf7da0c5a1d" data-file-name="components/dashboard/recent-saves.tsx">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="310c5ce7-4691-45e7-907c-be11176d0dff" data-file-name="components/dashboard/recent-saves.tsx">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="2664eb8a-4327-4fbd-a824-6c1a59ce7538" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="f552820b-914b-4364-a52d-ec5626983d94" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4" data-unique-id="6560ad69-7061-40b0-bfca-169662b56fb2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="8ab942a4-91e0-4fa7-a061-2e0782d35ea4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="f0b0484d-33a7-4191-99cd-cb5407015a3c" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="2f383bd4-d15a-4ccb-93e9-84e70e187ce3" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="d7a7da99-7331-44da-9e81-df6750415b53" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="e3920cf3-9489-44c9-85d5-d2cc31ca927e" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="94039299-77d2-46f7-8b40-a2446ac9d1ce" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="801c1c0e-80a1-4fdd-b2a4-7fd65d76bd74" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
        </div>
      </div>
      
      {/* AI Summary Panel */}
      <AISummaryPanel save={selectedSave} isOpen={summaryPanelOpen} onClose={() => setSummaryPanelOpen(false)} selectedModel={selectedModel} />
      
      {/* Add to Collection Modal */}
      <AddToCollectionModal isOpen={addToCollectionModalOpen} onClose={() => setAddToCollectionModalOpen(false)} save={saveToAdd} />
    </div>;
}

// Add to Collection Modal Component
interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  save: typeof initialSaves[0] | null;
}
const AddToCollectionModal = ({
  isOpen,
  onClose,
  save
}: AddToCollectionModalProps) => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock collections data (normally would be fetched from your collections state)
  const availableCollections = [{
    id: '1',
    name: 'Frontend Development',
    count: 47
  }, {
    id: '2',
    name: 'Machine Learning',
    count: 23
  }, {
    id: '3',
    name: 'Design Inspiration',
    count: 35
  }, {
    id: '4',
    name: 'DevOps',
    count: 18
  }, {
    id: '5',
    name: 'Productivity',
    count: 12
  }];

  // Reset selection when modal opens with new save
  useEffect(() => {
    if (isOpen) {
      setSelectedCollections([]);
    }
  }, [isOpen, save]);
  const handleSubmit = async () => {
    if (!save || selectedCollections.length === 0) return;
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success - here you would actually save the data
      console.log(`Added ${save.title} to collections:`, selectedCollections);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error adding to collections:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const toggleCollection = (collectionId: string) => {
    setSelectedCollections(prev => prev.includes(collectionId) ? prev.filter(id => id !== collectionId) : [...prev, collectionId]);
  };
  if (!isOpen || !save) return null;
  return <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} data-unique-id="ec362599-9dfb-47ec-9e65-be1468807dba" data-file-name="components/dashboard/recent-saves.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="0751697b-02b3-4e67-9d9b-5517ef6a91d9" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="p-6 border-b border-border" data-unique-id="b9a51e2d-9844-4bc4-8d64-1907d5d5b898" data-file-name="components/dashboard/recent-saves.tsx">
            <h3 className="text-lg font-medium" data-unique-id="293f550e-38b5-47d0-97a7-5e168f85bac3" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5ef42800-ec01-4b08-91e0-a984b630f85d" data-file-name="components/dashboard/recent-saves.tsx">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1" data-unique-id="ca977321-eb8f-4e73-802f-9d04c26a875c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ce1b1c47-8be3-4a1f-89b3-2e5fa2be701d" data-file-name="components/dashboard/recent-saves.tsx">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto" data-unique-id="37384c74-7e24-4b4f-8002-0e244806d0ea" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="space-y-2" data-unique-id="9d8c95df-c715-46cf-97cf-4735ae042b5b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)} data-unique-id="7fc65a61-a8f9-4207-9420-5537f3aaae46" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="13875de4-7d27-4ed0-b93c-364ab2683ae8" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")} data-unique-id="12c0d9fb-1663-447a-bb6d-667da23ad923" data-file-name="components/dashboard/recent-saves.tsx">
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div data-unique-id="da27e58a-c64b-46a1-9e15-bcaca8e1256e" data-file-name="components/dashboard/recent-saves.tsx">
                      <div className="font-medium text-sm" data-unique-id="ebbd38ce-9524-4a95-9662-46bd1826109b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.name}</div>
                      <div className="text-xs text-muted-foreground" data-unique-id="e3bd88e2-b3a1-4d4a-8952-07eb9fd39172" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.count}<span className="editable-text" data-unique-id="5bebcf0e-7978-4096-ad58-7efd111af7f5" data-file-name="components/dashboard/recent-saves.tsx"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center" data-unique-id="38d34f97-880c-4e5a-b770-badf4473279c" data-file-name="components/dashboard/recent-saves.tsx">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="87317d00-d712-4f6b-b9f4-cfa758cb1b9b" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="13929d7c-1327-4496-be81-ef23e5303750" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8be7f42a-171c-4026-b470-33edf52f613a" data-file-name="components/dashboard/recent-saves.tsx">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting} data-unique-id="dd705ae0-954c-4e74-b8d9-c4b8d598ead6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {isSubmitting ? <>
                  <span className="animate-spin mr-2" data-unique-id="32d9fb9d-4b65-40cc-8bb6-65c0a4b69e39" data-file-name="components/dashboard/recent-saves.tsx">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="08477c4d-080f-4efc-a109-a113a90adb8e" data-file-name="components/dashboard/recent-saves.tsx">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span data-unique-id="3b455997-f929-4ae7-b8f8-8b25e1bc1f5f" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="29fa9298-3cee-48b7-b6ba-d7d092227129" data-file-name="components/dashboard/recent-saves.tsx">Adding...</span></span>
                </> : <span data-unique-id="6a55bf0d-a40f-460b-bf7e-753757dda5d8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f6e46084-2386-4188-97b5-c4b563c2598b" data-file-name="components/dashboard/recent-saves.tsx">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};