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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="76852262-4de4-443a-8c3f-553f500b0036" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="b09d7f04-9703-4920-acbf-6ece3907940d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="8d912d4a-c320-4a24-a736-e886d670c85b" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="c75d1440-59dc-4cb1-962f-96f25cde842f" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="0b980dad-4eff-4694-81f9-541f6e214598" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="b7bca4f5-1af5-45f5-b4ba-5c7b7782d3d7" data-file-name="components/dashboard/recent-saves.tsx">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"} data-unique-id="f299ac73-feea-4181-94e9-988092515761" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs" data-unique-id="fd1d5c0a-32a2-4bff-ae08-d1beb033aa8a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium" data-unique-id="81f2d4f3-851c-4473-8f15-b0cb8c9e9dc7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="ec139e7d-5f04-4f33-abd7-c8ad390480ea" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="29aa84e8-4f8b-4b63-b9d4-534c387a2cc5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="58bdcc11-3427-4daf-9d3b-ef78bd1f5eaf" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="fd6a4ee4-9579-424b-92fa-1e54fb0a46d1" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="aaf3be0f-f54e-4726-8333-5fe4d5dd96a9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="43377a20-b598-41a2-9da7-5f48a968a3d1" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="f57416a8-91dc-4ba6-8b42-28eb59515181" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="7dbf2e5a-fee1-4cab-b15a-b84123f422cd" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="ecb1a749-3398-4778-b42f-fb139844e93a" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="691d3d83-8ae4-4adb-b558-b403bd613d9b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="88cbd30b-225c-46b3-b8b6-ff30a9811745" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="adbb09bd-eccd-481a-b840-b8f2937c27a9" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="7866239c-7620-4cf4-994a-9468c7d7364c" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="b24957b9-99f1-43aa-bd0e-c343593c02eb" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7a1f7a7c-c9bb-4126-b5fb-e782413b7c02" data-file-name="components/dashboard/recent-saves.tsx">
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="d6b9759f-5dc1-4c71-876d-143ffe83a156" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="4853ac6e-f79d-4d98-9178-f96e0e674bf4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="ef6dfc15-b28b-4664-9a52-1e9394241053" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="90f86020-b822-4d48-97b2-3e9646fee0c2" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="fd0d87ff-c799-4016-8cb8-3b128b5f3c06" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="015e2504-94d2-4c48-8526-2446a8faca24" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="b62f54c4-31b7-465f-b9f6-e22a55215c0f" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="2dde5819-3b2f-4456-ab3f-e39c8f48be5e" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs" data-unique-id="3f899080-366b-44b7-a9c6-9b0a387182ff" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {engagementMetric.icon}
                <span className="ml-1 font-medium" data-unique-id="3bbbe772-4759-4a27-a4a8-763c4b89205c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground" data-unique-id="0cc3c283-3fb8-4f35-8328-b56e871f335b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3" data-unique-id="4fd58f23-9b17-47f3-a3e5-d084ee2f7cc5" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="b51e9973-caf0-4599-a6ca-a43f9b73d200" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="3b7c6048-95e0-49a8-8648-5baf8909ad76" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="d153050a-d340-4361-87b5-dc49bfc5e856" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="a2131ebb-6c08-4a85-a39b-4265f2be44df" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="be1e0aaf-4277-4539-a02c-2dd7753fd42a" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="ae20b54a-40bf-44b6-aea1-8e00ef445cfc" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="96256685-79d4-4e0e-9667-7037aefdbd2d" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="3a222acc-da7c-40ac-adaf-a60cdb396226" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="c4bfe08c-bb66-45d4-bdaa-95ef8fa2ce1f" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="0fa9d388-62f1-4108-b829-ed9636a303e8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8bfc7e13-30d1-4687-891b-b1087768fb0a" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="bc483529-309d-4264-8aea-72679413107c" data-file-name="components/dashboard/recent-saves.tsx">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only" data-unique-id="2c859fac-ea04-4fa3-a021-4de3f4dae0d7" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="1ef07863-c695-4152-b219-6686da7d3d9c" data-file-name="components/dashboard/recent-saves.tsx">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="ad9c408f-2b52-41ff-9b76-5c8ad482b934" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="04318c68-d10c-4a08-ba4d-0303144b969e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7a01dd2f-d2f3-4525-82df-86d1219b6754" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="69845806-1994-418a-8979-95335b994a05" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="ff97c029-eb0c-44f1-a0d7-9b298f4cd4fe" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="9c8ab29d-7e1d-4065-b1e3-04f0213ce15f" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="7227dc7c-37b2-4a62-97ea-d0512bdc29ad" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="80270dcd-5a45-4a16-9c00-8ad512eee62f" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="9462ec9a-52fb-4cc8-899e-03d0db5da930" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
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
    }} data-unique-id="345dd10d-bcf0-4907-a689-ccd5e8bc2b08" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="bd53ff96-5790-4932-99ae-d72dcb16f0df" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="4cf54f76-944a-4802-945c-8c620fa764a0" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="35a0a2e4-7644-43ee-9de6-69574117a9b0" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d84eba93-cbc5-418f-848f-323d24806909" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="d9ca3bea-77be-40ca-9de0-a86cd088cbbf" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="ade9e621-cfd2-40bc-8cb4-ec9671e0c2e7" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bb5583a7-135c-4d7b-9127-94f8acc456f0" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="fd965f1e-e36a-4ed4-838c-0b0930b7054b" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="becbc5a6-1fc4-4c3b-b19d-5880b66a9d31" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="3caf047e-dfaa-45ab-8780-982a96f143d0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="632e4f70-22eb-4380-8c85-b160a68319e9" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="bbdfeb5f-0032-4ed0-a7d2-e00dcdcd2726" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7784affa-8bde-48cf-8193-44195ee5625d" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="6129b4b1-a1c5-44a7-804d-723a43447c56" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="43f83f18-ee39-4c0c-83ba-779793cf30c6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="e52e3b24-e409-4ec6-81df-1bed57f8a5f4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="670d25ff-fa63-42cc-8787-deccc3911c44" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="de2ba2d3-650d-4459-b1e3-1c6f33617f33" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="2e758bb1-c073-46a3-870c-cd72104ffcf7" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="82c45088-2dc7-46f4-88ef-bd955c47578a" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="de56d3de-269b-4639-9c3e-581cfd257a50" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="9de6f072-401e-438f-852f-8bfc09e6bbc5" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="f095d2e6-9a99-433d-b8ff-d91f3b2a5bca" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="2ff91399-b21a-4b78-91e9-2af3f73111ec" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="457fbe81-3508-4381-89a4-ce2b0b65e47f" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="10edaea3-a52b-4433-a5d7-f53742eb1fd1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="78e4e879-9a26-498d-8b79-3a202d89531c" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="cc0dc2f0-de2f-4d5d-a4ae-7e0ffc1eb717" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="aeb865e2-57b8-4de2-9090-847e695cf210" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="af201425-02d3-4e8b-8195-4183ee5fc8ad" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="f03be240-73c5-43f1-9520-e89062aaf4f9" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="27a0bf22-5e50-4d5a-a10e-f0bf421acc33" data-file-name="components/dashboard/recent-saves.tsx">
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
    }} onClick={onClose} data-unique-id="ea249290-a8ae-4aa6-aedb-db89fa58d43c" data-file-name="components/dashboard/recent-saves.tsx" />}
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
  return <div className="flex flex-col h-full" data-unique-id="6185479d-9b3d-4ae7-b4aa-1badee574ced" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="03655bec-b5cd-4580-b000-7da27210fea1" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <div className="flex items-center justify-between mb-4" data-unique-id="3241ac10-6b1d-4d4c-8fb2-009ea9d0e698" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3" data-unique-id="3d553e80-4d42-437a-b992-40fd8892efd9" data-file-name="components/dashboard/recent-saves.tsx">
            <h1 className="text-2xl font-semibold" data-unique-id="196205aa-2628-4a9c-aff0-7992feee001c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="763d51fd-f526-4e7c-aeb7-4b0f2516bb30" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="3975b4b6-3a4d-4b6c-8b59-2d36d7f88fa3" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none h-8" onClick={() => setViewMode('card')} data-unique-id="a841cfb5-57ee-4cfd-8a2b-007b5c8e7d9a" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="20a48d6d-7eec-4efa-9523-6816b5579bb2" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none h-8" onClick={() => setViewMode('list')} data-unique-id="3af5a7fb-7de1-448d-8171-fa327a14fea7" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="9ec1d93b-e018-43b8-a987-2d56e9cd2bbf" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between" data-unique-id="56d53b6e-1c22-4ad7-a11b-4385cdf322c6" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="text-sm text-muted-foreground hidden sm:block" data-unique-id="9d16acb5-0f1e-4044-a267-3f50ae165833" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="6584d955-ffed-41b0-9f03-b7aa08e933a0" data-file-name="components/dashboard/recent-saves.tsx">
            Showing </span>{visibleSaves.length}<span className="editable-text" data-unique-id="df515c70-67db-44af-a48c-e9ca517912f9" data-file-name="components/dashboard/recent-saves.tsx"> of </span>{initialSaves.length}<span className="editable-text" data-unique-id="9521fd11-c2cb-4040-b98e-e8c06ad909e5" data-file-name="components/dashboard/recent-saves.tsx"> saves
          </span></div>
          
          <div className="flex items-center space-x-2" data-unique-id="86701672-9450-48b2-bf30-be5b3dd9ad54" data-file-name="components/dashboard/recent-saves.tsx">
            <span className="text-sm text-muted-foreground" data-unique-id="f7209634-baac-4a69-b672-fa2ab5d394a1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d2e9f7a8-dece-408d-aa5f-b055b28fff7a" data-file-name="components/dashboard/recent-saves.tsx">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="f227e786-b4b7-43d9-8b39-412019107d9c" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="7238b3c4-7ef7-44b0-a45b-57d88473f44b" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="57476fb5-e67b-4e03-bf71-b6e36bbda8ad" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="332d97df-12b2-4386-a3c4-1a34d958fad6" data-file-name="components/dashboard/recent-saves.tsx">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="1d4ad73e-6b53-4a23-9bc4-7126cc6de220" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="1fc268e5-70b6-4545-b3e2-3ca6b2864100" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="519f749a-eb42-45cb-859f-f2b426a45fa5" data-file-name="components/dashboard/recent-saves.tsx">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="294e1e2f-e95b-4ddf-90f6-0e7fcd419488" data-file-name="components/dashboard/recent-saves.tsx">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="064b7105-687a-48da-abdd-6f96623e68df" data-file-name="components/dashboard/recent-saves.tsx">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="f247d209-1091-412b-8e55-a0b6e0144149" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="5af42404-6328-4c5b-9af8-0fb895ae4efe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4" data-unique-id="0ac5c972-0179-4e36-82e2-a9f7a5c00f1b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="f9b66807-3075-4036-91ba-9cb763580661" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="bfc46e00-60e9-4c4c-b531-7ee285d34cc9" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="08368362-427e-4524-9d73-ee8d620f6e8e" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="c71123ee-c7e4-4e67-a811-8117b86eac49" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="2ce3bae2-f8ad-4b76-87d8-236c2eebc7ab" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="cd0006e6-fa1e-484b-af8b-230f1ca84e4b" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="9973f07d-a07f-4807-a4b8-23d51bcf94ca" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
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
    }} onClick={onClose} data-unique-id="abd459dd-c645-450f-aea7-91654227dc80" data-file-name="components/dashboard/recent-saves.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="1350768c-9bd1-46c1-b46c-a277b238d3a9" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="p-6 border-b border-border" data-unique-id="66048f83-c4d3-4097-9011-4a5fe0f8347a" data-file-name="components/dashboard/recent-saves.tsx">
            <h3 className="text-lg font-medium" data-unique-id="f84d6dfc-2ef6-4f67-8f25-83589fc72eaa" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ab7254ad-19ef-41b2-91b5-154e10393740" data-file-name="components/dashboard/recent-saves.tsx">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1" data-unique-id="5428cce1-5a33-48cb-9328-9d8fa57f902b" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="43a52c4c-344a-4d11-a71e-7487fb4e914f" data-file-name="components/dashboard/recent-saves.tsx">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto" data-unique-id="fca2ffdb-a962-4910-b914-be2bc9e25aaa" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="space-y-2" data-unique-id="98d2ac26-aeb3-42fc-87e3-07a8abac07bd" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)} data-unique-id="c9e853fe-fc39-4ddc-aa14-3cd3da76fad6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="07d64773-df48-4512-aadb-0d2169e7aa00" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")} data-unique-id="777d1834-c3d4-4af1-9eb4-ecfb491903cb" data-file-name="components/dashboard/recent-saves.tsx">
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div data-unique-id="8e0fa272-91d2-4b46-825a-4f575981ea6d" data-file-name="components/dashboard/recent-saves.tsx">
                      <div className="font-medium text-sm" data-unique-id="80f84492-6e38-4dd9-af45-f3fa9dcf7c39" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.name}</div>
                      <div className="text-xs text-muted-foreground" data-unique-id="63d8fb72-e3db-4b06-8242-e4fdaabb4d1e" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.count}<span className="editable-text" data-unique-id="b8b27d4d-0f12-4ccd-a61c-9cc2404c36cb" data-file-name="components/dashboard/recent-saves.tsx"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center" data-unique-id="3072f79b-9868-4090-9f6e-8455ebdc9f68" data-file-name="components/dashboard/recent-saves.tsx">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="fcee7555-a76b-4cdd-8537-e449a2b2d08c" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="2bffffcd-78c7-4357-9d18-9b240f932fa8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="35539853-a3ba-450c-a086-542001e0ed67" data-file-name="components/dashboard/recent-saves.tsx">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting} data-unique-id="8e1d97c2-e16d-4f3b-a154-7cb4630b72e6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {isSubmitting ? <>
                  <span className="animate-spin mr-2" data-unique-id="883d90d2-ba7d-498b-8261-3229f723b0ca" data-file-name="components/dashboard/recent-saves.tsx">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="b4e4dd2f-0c5f-4ff6-88e5-e59beedea0b3" data-file-name="components/dashboard/recent-saves.tsx">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span data-unique-id="c9234817-cb12-4e0f-8aaf-c7d8968f15fa" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="6d7d191d-ec91-4a6d-ba90-0b8bedda27fc" data-file-name="components/dashboard/recent-saves.tsx">Adding...</span></span>
                </> : <span data-unique-id="d296afc4-6a67-4481-a8d0-7c5047be966c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="33a5f8af-2592-4521-91d5-8b749281921f" data-file-name="components/dashboard/recent-saves.tsx">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};