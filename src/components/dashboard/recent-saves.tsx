"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, Tags, Trash2, ExternalLink, ArrowRight, Sparkles, FileText, ChevronRight, FolderPlus, TrendingUp, ArrowDownAZ, Calendar, Heart, Share2, CheckCircle2 } from "lucide-react";
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
  savedAt: new Date(2025, 4, 18),
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
  savedAt: new Date(2025, 4, 16),
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
  savedAt: new Date(2025, 4, 15),
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
  savedAt: new Date(2025, 4, 12),
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
  savedAt: new Date(2025, 4, 10),
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
  savedAt: new Date(2025, 3, 28),
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
  savedAt: new Date(2025, 3, 23),
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
  savedAt: new Date(2025, 3, 18),
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
  savedAt: new Date(2025, 3, 14),
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
      return <X className="h-4 w-4" />;
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="3d660621-b47f-4100-bcc0-6bf890bde06a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="8b8bdbdb-5443-41cd-8992-b1edb5e2db4d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="0f8f5130-9bb5-4946-b5be-9c5ab229df30" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="2f61f322-597a-4881-8ea4-313cbd2868c4" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="2d42672f-b18a-4539-8980-0f9159908528" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="56f58a3e-3356-4880-86ed-c59eac025c2c" data-file-name="components/dashboard/recent-saves.tsx">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"} data-unique-id="b00ba3e5-6d85-4507-b784-a38c03b958e8" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs" data-unique-id="c8ddb98f-92f4-44d2-9473-d3d743a608f4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium" data-unique-id="12fc5fae-57be-431d-84d4-76c139d592f2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="507e6f83-c66e-4deb-a41e-a1d1f246bcd6" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="0f384920-bdba-487d-9f9e-d0f530207fba" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="e00ae423-8abe-471a-adf2-c6a9cf6f29d8" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="d8fc9a54-5ffa-4577-aa60-c82b96e3a698" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="b1a06b7d-208a-40be-8302-f80ee3afa211" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="7d287f3e-8631-4f3f-a93e-b04fae9e42d4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="3699de0c-fd6e-4b0c-84db-c22d3179a008" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="c427a79d-af21-466a-9a40-920df681735d" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="9ba0ffda-cc14-4627-86dd-8769666c3b86" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="6a188710-01c6-4b88-9710-f4280cee0581" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="f82a6d54-a41b-4b97-ab59-dfee3099bb66" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="c40a2b40-0d4b-41f7-873b-0bea59bffc96" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="04a874be-4c3a-471a-82e6-889a1b312085" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="f0770877-cc32-4b22-9240-cca9b2849e3d" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="6899b41b-6056-41a0-af4b-1901c6528350" data-file-name="components/dashboard/recent-saves.tsx">
              Source
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="a0522c40-2c34-4bed-ae9d-727689de0905" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="7f4dd255-13b9-4351-842f-a8b86b99697b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="b0e152e8-d6fe-4609-88b7-e9cc909b866d" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="b0c7aa03-6097-4890-abf2-8543e01bb0f3" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="fa7eeb03-3d3c-4533-8af8-1277c0ad366a" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="31334b4f-37ca-4523-a205-b116a7ce1d50" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="ca1a7fc6-3f10-4fac-831f-8c80a8f6f8e3" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="33ac1673-9bcb-4fad-8015-27ee9564a029" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs" data-unique-id="fba1b13c-fd94-4eb7-b7d5-2021d2c8a7f9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {engagementMetric.icon}
                <span className="ml-1 font-medium" data-unique-id="55214029-ed2f-4b7f-8e2e-373f0e8545f0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground" data-unique-id="94067281-4f6c-452d-bc1f-fc1ad83a95eb" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3" data-unique-id="7c20af4a-3fd1-4fb8-8180-30a086bc6b31" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="fa093d30-560e-41b2-bce4-45add48c590e" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="e93b53a0-683b-4989-ad69-0190866dc7b7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="069e0865-90bb-40c8-b2cb-8540d934bcb2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="0f7209f8-48aa-495f-aa49-98a84a6ed481" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="52390bd8-41dc-48eb-a299-ecb4e6a7e065" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="d9856e6b-95c1-4c84-89ba-6a912db7d2b8" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="e862fc77-94a0-4a88-a2d4-9c6784f6c39a" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="a7a9e1d3-a99b-430a-9b3f-0443f0a2e268" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="724b1b3d-e50d-4877-bd12-4cc97ffa5442" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="3ae73db1-259d-45ae-94b6-d1776a843f2a" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="52abcb48-bd19-486c-a515-482e150855ee" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="dbfc4979-46f8-419a-8830-988c9ee0367b" data-file-name="components/dashboard/recent-saves.tsx">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only" data-unique-id="0428e0e3-84e7-4612-bbb5-c0a827f17bce" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ca93c835-a31b-4073-81ac-9d1716070e95" data-file-name="components/dashboard/recent-saves.tsx">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="5ae879a8-12be-48fc-ab75-9d10a7fcd340" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="0b664a00-90a8-45e8-8fc5-8894522844de" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bc2641bc-cd65-4330-924e-7a79ed3a3205" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="be0e65fa-3a60-4d6f-817c-752708df1693" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="40e9c7f8-6870-4c02-bbf9-3a017c33dc05" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="756166f2-b788-4c46-8dba-008fd1bea63f" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="46b6cbc2-5a1e-46dd-87f3-8d97eb6d8c37" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="e0c883c9-1db4-47a9-9384-55c4b7a85b5b" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="04d04c37-b52e-47df-a681-a6328e41b3c7" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
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
    }} data-unique-id="b073bfc7-f92d-4d04-af6e-e4a31b2c23f1" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="7636f2c1-8578-4411-a47d-1ad0d0f6feee" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="06dc2e75-11f3-4571-adc8-cb724060b935" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="c129c509-d828-4a56-802b-e613f7bcbc52" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="db56c120-2314-41a0-ba2e-b8c72f2baeb3" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="65897e60-1b2d-41af-8dd1-c100ee47c2cd" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="73f08a01-f9e9-45cc-a576-4b2cab397378" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="e764a475-f9a9-4fcf-b76b-0144733aeab4" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="6cc729a2-3316-4fea-9864-0bb1d63cead8" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="51928f70-8328-4447-8355-53012892d586" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="b3a4851e-183f-4c3d-87d8-fa9cae1cf860" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="3213b1e4-deab-4598-ad23-fd791f554035" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="26f86ef9-e880-4cb2-887c-db3eb01f2f88" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="484f5cd2-6a2f-4248-b206-e004b9474ce2" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="cde3a54d-9c50-4857-8fcf-18f86081056d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="d6c3e35d-a597-4701-bbe9-5b52cba126c9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="300825c4-b9f3-471a-8725-5edc1e931eb9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="61c50c8d-4fbe-4e12-ab0d-3dee66034294" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="e5fce264-4dd8-4c56-a997-e90752d0ab41" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="5efbbb18-3f64-41b3-94da-8247a0456294" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="86746c6d-1a9d-4504-a5bf-717afbe2ec37" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="5c082f37-3bce-4ae0-be8d-3ea485999838" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="d7b842a0-5262-4cc6-9df1-2fc6ae781a34" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="d66f7e62-a042-47cf-a02f-8581bd8bcdf6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="96997b4e-1254-4ffc-aa9e-5794ac546d0f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="e8c2928e-4916-4e84-911f-5297b0513200" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="6e9e6add-c35a-4e58-9770-2bfb086916f1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="09e0c832-3c44-4df3-9611-bb99554dfc50" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="ef3ec0b8-332f-468d-8919-12d311d1871f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="7f968ed6-fc92-4f57-ac4d-b8eb0be125ea" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="b586a473-3cb0-4e17-9d5a-438824358f77" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="cb409590-be50-4fb9-a15e-4f68eff9d456" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f055c4ed-019c-49a4-8d61-67c73cf7681b" data-file-name="components/dashboard/recent-saves.tsx">
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
    }} onClick={onClose} data-unique-id="f0dc8439-2dfe-4d6e-bf9e-c5a41099022f" data-file-name="components/dashboard/recent-saves.tsx" />}
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setSelectedModel(storedModel);
    }
  }, []);
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

  // Handle model selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredAIModel', selectedModel);
    }
  }, [selectedModel]);

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
  return <div className="flex flex-col h-full" data-unique-id="2c4d1d60-9408-40e9-b537-f20103efd519" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="e41b6235-91e9-457b-b6f2-2d5793f9a4e0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <div className="flex items-center justify-between mb-4" data-unique-id="cc41f4e7-960c-4543-9346-624622aeb420" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3" data-unique-id="1813221e-cc58-40eb-9d0d-4f86f5485a79" data-file-name="components/dashboard/recent-saves.tsx">
            <h1 className="text-2xl font-semibold" data-unique-id="172c2c5e-7364-410c-aa76-aae9a55a195d" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="410d0c01-4270-4943-b99e-a3b47970be68" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="276a829b-3323-40d8-a33f-340d775a4c4b" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none h-8" onClick={() => setViewMode('card')} data-unique-id="7092af71-665c-4cbf-be30-e69e3be4569c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="0b039d2f-85ca-4c2e-b89e-626c114c35a6" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none h-8" onClick={() => setViewMode('list')} data-unique-id="8dddfab0-607e-4bba-bf81-4a898bb0c69c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bc9f3f57-957f-4101-8762-869f6c64afec" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between" data-unique-id="4862c0a3-23eb-4d4b-9762-8ebdc8676294" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="text-sm text-muted-foreground hidden sm:block" data-unique-id="4b3c8146-829c-4275-add4-4071d2ba4aab" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d10ffe1d-c179-4713-af0c-4a85b1eb2484" data-file-name="components/dashboard/recent-saves.tsx">
            Showing </span>{visibleSaves.length}<span className="editable-text" data-unique-id="adebaa6e-5d35-460b-80f1-f9535b5774f3" data-file-name="components/dashboard/recent-saves.tsx"> of </span>{initialSaves.length}<span className="editable-text" data-unique-id="73875750-2fd3-4523-a2db-4de2cf9f8595" data-file-name="components/dashboard/recent-saves.tsx"> saves
          </span></div>
          
          <div className="flex items-center space-x-2" data-unique-id="122ab1c2-ef24-4f96-b6d5-aff58070f7ba" data-file-name="components/dashboard/recent-saves.tsx">
            <span className="text-sm text-muted-foreground" data-unique-id="e6e3ad94-d09f-42ea-a1c0-c656ec39a616" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7f40fa13-18a0-48bb-a6e6-2e1b6d7d9c68" data-file-name="components/dashboard/recent-saves.tsx">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="1b1bab09-a619-4c63-840c-2e85805f31f0" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="fa513f01-87d6-4f11-82ad-0ec9e8f1a109" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="4332df0e-fc8c-45b7-a1bf-74caaa0a1203" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="9e4c643a-f0fa-4ecc-80c4-725487bd2f1f" data-file-name="components/dashboard/recent-saves.tsx">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="460c2ad2-af41-4bc9-b9c6-7815bb10ad84" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="44d26a4a-d49d-4c9e-86a4-8fc22db7e6e3" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="7b144f7c-ec7e-43ee-9cd4-70a396e4996d" data-file-name="components/dashboard/recent-saves.tsx">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="5e87824b-f14d-4cec-88ae-d31054deea7c" data-file-name="components/dashboard/recent-saves.tsx">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="0ec4019a-3179-42ab-8d51-fefa42febb61" data-file-name="components/dashboard/recent-saves.tsx">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="70715f68-6d44-418a-b0ce-05f6c6e0dcde" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="46796f76-db71-45ad-8e95-858586933a3b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4" data-unique-id="f798e285-9119-426d-b2c3-3cd709d555f7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="07d5f188-a25e-4e96-ae43-505416395724" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="fe470a58-fd29-40cc-9560-512be0643962" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="75719157-bbb4-435a-afdc-57e7a997d054" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="7b8c24d2-a327-46b0-b9f6-2ee0cf8dbcb2" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f02541aa-1b3d-4f02-bb71-1c7e1271bd28" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="6cfab840-fea5-47eb-a4b1-8bae63d3b1cc" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b738a9ab-e7d3-455c-88f0-c143b40c2150" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
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
    }} onClick={onClose} data-unique-id="8f8bf271-cc45-42fa-bb06-319f440eb80a" data-file-name="components/dashboard/recent-saves.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="1fb28f00-b39b-40e5-b427-562aaa5aedee" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="p-6 border-b border-border" data-unique-id="fbc9f5d1-cccb-4513-a390-1be690088e02" data-file-name="components/dashboard/recent-saves.tsx">
            <h3 className="text-lg font-medium" data-unique-id="d6f8e253-aa83-4c03-92bc-1298cb2ba87c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b72f9b7b-3bb3-488a-938d-f4cac0461af3" data-file-name="components/dashboard/recent-saves.tsx">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1" data-unique-id="26dbe1d9-e33a-45b1-9969-f7a96c3178b2" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f0d28799-013c-4220-8e7d-3724ad7fff9c" data-file-name="components/dashboard/recent-saves.tsx">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto" data-unique-id="06df1074-b470-41af-b8d8-43025e9a524a" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="space-y-2" data-unique-id="b17e06bf-a008-4a48-bce4-87f12ed4e645" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)} data-unique-id="c26c5a7e-dc42-41d2-b9b1-bba1f2271697" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="93f236da-541e-4379-b7e6-d76e2a5cbc2f" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")} data-unique-id="5cce2065-3209-4008-bb97-ea1126bd1749" data-file-name="components/dashboard/recent-saves.tsx">
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div data-unique-id="97956da1-9662-4d37-812c-b36bfcd04c7b" data-file-name="components/dashboard/recent-saves.tsx">
                      <div className="font-medium text-sm" data-unique-id="90ba9e7f-2da4-4ffb-954f-532df5a1edbd" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.name}</div>
                      <div className="text-xs text-muted-foreground" data-unique-id="49d8ade1-3734-41d4-bf92-3c3c549583a2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.count}<span className="editable-text" data-unique-id="c7cc3691-affe-439e-8333-e8e52acefb04" data-file-name="components/dashboard/recent-saves.tsx"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center" data-unique-id="ef9f3a33-3e0d-48e8-872e-1cf4187c8802" data-file-name="components/dashboard/recent-saves.tsx">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="83c73377-68cc-49f8-a870-4ab898f19471" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="545e9f47-d286-4d36-8cff-b1f6a4efa1d0" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="e83d2538-484a-414a-83e3-3e9d93427072" data-file-name="components/dashboard/recent-saves.tsx">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting} data-unique-id="cf66f220-2d9c-4903-9d05-6eb264ae9eaa" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {isSubmitting ? <>
                  <span className="animate-spin mr-2" data-unique-id="4b59a2c1-f452-41f5-8306-2c0a41ed1f00" data-file-name="components/dashboard/recent-saves.tsx">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="cc3d1369-0375-43f8-a4ed-562129bde1a7" data-file-name="components/dashboard/recent-saves.tsx">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span data-unique-id="0fc7883c-516a-4219-9929-032769a58c89" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="1c602aa5-427e-4341-a1a8-f709d4faeb24" data-file-name="components/dashboard/recent-saves.tsx">Adding...</span></span>
                </> : <span data-unique-id="68ea1793-35ab-409a-97c7-3a57f76dffd6" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="eeaa4b51-652b-41d8-9823-7e9ce8ea4e08" data-file-name="components/dashboard/recent-saves.tsx">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};