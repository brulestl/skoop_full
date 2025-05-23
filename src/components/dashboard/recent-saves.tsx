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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="6c4f3e1e-0f2b-46b8-bd34-b4c762b25206" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="2b9975d3-4eca-43a3-93f6-8913d171add5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="976494da-4a76-49a1-bde0-16b53aae37b5" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="85d48331-3c42-4f85-94bb-f724255c98e5" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="d78c8917-32d0-4782-8234-eeabda86a193" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="5d3198a7-a411-4058-8ed6-75e09a11f43d" data-file-name="components/dashboard/recent-saves.tsx">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"} data-unique-id="bc72275b-c412-4192-9f0e-46c652b3c1f8" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs" data-unique-id="7cdca966-4a49-49c4-896e-934ead8471a5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium" data-unique-id="348aa0d9-b19b-44c6-a67f-9c9a234194aa" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="03bc189a-f46a-4f54-a695-c008b39ac98a" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="fa33cf5b-7147-4b74-8b5d-74563360ce33" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="20fefa59-12f8-47d6-842f-617fd7564720" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="1d50f1c4-e666-40a2-bceb-1e9adffbcb5a" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="a4b48504-b783-4967-9039-c8fcff9920e4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="0c54dab3-4b7e-436e-bf1a-01b3762f016a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="6578c602-6f12-4b89-ad03-ff6599936cfe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0d7fbcb9-2625-4be1-af07-715347ce1147" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="4ffb6c2c-cd23-4786-8c56-a84599a025e4" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="e733be59-1025-4f30-8d10-28e2bea2f071" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="0c7b0eda-6e0e-4a66-9060-b6ca6e97e98b" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="a4069ef7-e0de-44ac-92b2-fee4d46367aa" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="9022d143-7799-4705-8778-52e512794bf1" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="fe69d96f-2201-46b8-83e2-37d1641bea29" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b47797ce-1bba-4e65-9b6c-a3cd4641c5f2" data-file-name="components/dashboard/recent-saves.tsx">
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="e5d66aac-6ee4-4495-afdf-4c2f7ba53070" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="32a8c018-2d51-4661-ba6a-2ce9fb070740" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="5e1585ca-9c47-4b05-8294-1a1800c05b88" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="124d1632-4e7a-4fb7-83ab-520c6c46a03a" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="85fe7cc4-78e3-4b88-b7be-30b32e6dad5b" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="507e04c3-41cc-4903-844c-c5fd3e42314c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="e0e21cbb-9efc-4865-a3e7-731f6eb35bae" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="59958a0f-c115-4454-b677-d943427c0696" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs" data-unique-id="f736c047-e9ff-4c17-aaf0-ccc79b802264" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {engagementMetric.icon}
                <span className="ml-1 font-medium" data-unique-id="00bcba9b-38b8-4190-ae8f-92d640366238" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground" data-unique-id="31bdac54-e4d7-4037-8fe8-fe228baef277" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3" data-unique-id="c393ac81-0dbb-4ea1-8636-60c568a1e8b2" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="bc9bbda1-c15b-4060-b77d-059ea8b38186" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="f3f077ff-4b7e-4759-b5b6-277c7a05e1ba" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="19d2b812-437a-4d23-8f35-927e2408f862" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="2fd81bbc-3f58-4330-9158-f368a7dd35c8" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ae1f9f58-884a-4028-a42a-28c48e163ecb" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="aff480d8-e865-42c9-86f5-f69ae3db11c5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="646e78bb-638a-4665-a6f8-8663da1226d8" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="aaad4c82-daca-4dfd-95f1-764dce6a16aa" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="59f9e133-cba0-4f48-995e-3b36887e7d68" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="e9c19de1-e308-4e02-a589-1c46fa103334" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="af3ee159-4cce-4a36-87c0-e902c6477ae7" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="ab5958f2-9794-48b4-8426-c726dbb20759" data-file-name="components/dashboard/recent-saves.tsx">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only" data-unique-id="1befdfb1-2342-4501-b272-36f00fc137e2" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ce668788-5765-4272-8c79-08bf29b5cdcf" data-file-name="components/dashboard/recent-saves.tsx">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="6fc134b9-0cbf-41ea-8a42-92aaa6d3004c" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="98e1688d-908b-4802-bcef-fe5de67eef52" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7aaee576-24e8-4131-bb33-1db806069ffe" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="943a1d01-acb2-4cd8-95b3-ec2130b15ca5" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="d370b691-99c0-446c-903c-2b430ed8a7cf" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8a6cd546-c07d-4aeb-a263-16e3f5e617dc" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="81d3399c-96e6-45ee-aac1-024daa7c4da0" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="3abfdbfe-a318-4139-8464-9585300934ef" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="0634ddce-5e1f-43c2-9ace-2dbfb0843435" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
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
    }} data-unique-id="84171a69-572c-41fe-ae84-07025365cbe3" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="ce65feb9-c9f7-4dea-9d18-e1a85f6a5646" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="cebd7e32-05e5-47d3-bdc5-5da911b3f418" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="98000442-c323-43a2-ab28-69e39039db7c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="23db30c0-cebb-4108-83eb-76b86bb43b7a" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="41ae14cb-555e-4925-96df-50b74b998dd2" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="f65b4064-ba40-4844-bb1f-ef3d745f1982" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b963dac2-eafe-4182-a8cc-3c867e77c40c" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="9f04e838-53ba-4555-8b2b-fec3b9f7a411" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="25c37ccf-94f0-4972-94c5-9841ca301e13" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="d478ce9d-cc49-4224-b50a-1a3dfe428ac3" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="6cc2c0b1-597c-4d18-ba0f-c047fbfefa92" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="8949d85f-5cbe-42f5-87b2-50e4beecd3f5" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8a31c7f6-9260-4c39-bb89-1dcb1e980f64" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="e9848414-2d44-4f47-8650-68cf2370a31a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="7145d476-9e11-4802-8ae1-8424418a8103" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="8018d285-52b3-4223-b6dd-4dbf6163dbbe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="522d3b45-1bdc-4c00-8bc6-65036b6c7bd5" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="42f8a4bc-fd38-4357-a274-676f2e873913" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="a39bf64b-aaf0-40f2-a5d1-ab20c35783b1" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="228c42ab-42b5-4b8f-af62-82c657b15a61" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="e53928a4-1ba6-45a6-a553-2afc9b29436a" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="b581817d-f437-42c6-997f-8b65eefde491" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="584577e1-551c-42fc-ad98-36fc28388f0c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="eeb1d409-acd2-44e3-adcf-d02eeb7d3048" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="a8e666bd-c414-493f-a562-e077d4dd290c" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="6780e4ce-fd6d-4c8e-9d77-dfd7530ad635" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="1d474675-cf99-4793-812c-9973d8c40ee4" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="8983c535-93b5-4927-bb88-1b0bf64cbfa7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="f72655d9-3c9b-43f9-bf61-14b9086e50e0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="be373362-f7d7-4391-87e0-8f0850321843" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="2660fc62-ab34-4d00-880f-c969399a2d96" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="bd81dd81-7679-4b69-ae8d-4e0e8d3b9340" data-file-name="components/dashboard/recent-saves.tsx">
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
    }} onClick={onClose} data-unique-id="980ec161-a468-4a64-bbc9-cdf16a585218" data-file-name="components/dashboard/recent-saves.tsx" />}
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
  return <div className="flex flex-col h-full" data-unique-id="75e20d49-d0ed-421c-a1c8-4abdd8e38867" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="e1a265d3-3c6f-4681-ad1f-451206094bfe" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <div className="flex items-center justify-between mb-4" data-unique-id="84d6547e-cb4d-4f00-87a9-0e0a4dc7b1e2" data-file-name="components/dashboard/recent-saves.tsx">
          <h1 className="text-2xl font-semibold" data-unique-id="b4256bb8-372c-4595-a89c-63eec0155603" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="dd8de0bf-7a36-4f52-963e-80c83ecbd120" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
          <div className="flex items-center space-x-3" data-unique-id="f5da82fb-ba9a-4cd2-8456-52c981a946e1" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="09976f5a-4385-4cbd-a1af-56ed7bca6111" data-file-name="components/dashboard/recent-saves.tsx">
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              <span data-unique-id="d0e899ad-195f-4b80-a5a7-5d101daef082" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="bb091303-e0d0-4abe-a6b0-aa5d537d247a" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="5393a768-fec1-41d5-8b6e-0067c201fdd0" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('card')} data-unique-id="e5f279aa-5992-4fb9-8efa-d6ad7fa88b79" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8111cadc-efb9-4892-942d-0d91eb3b81ef" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="a05b550f-fdbd-4796-8065-fce200bc234f" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="55f90fef-c8a8-4311-bdbf-c81bddb3dc36" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex items-center justify-between" data-unique-id="6e386fee-eb5c-4f95-8b65-7d34cdc9332f" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="text-sm text-muted-foreground" data-unique-id="9c114e99-bb36-4209-9ccd-e0cc6a72e504" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e2c17775-e2dc-43e8-a12d-e37ec57684fa" data-file-name="components/dashboard/recent-saves.tsx">
            Showing </span>{visibleSaves.length}<span className="editable-text" data-unique-id="fa701d8c-ba20-41ce-ac0b-b8b81b2ad93f" data-file-name="components/dashboard/recent-saves.tsx"> of </span>{initialSaves.length}<span className="editable-text" data-unique-id="0875b36b-f011-487c-8b1e-137660070cc6" data-file-name="components/dashboard/recent-saves.tsx"> saves
          </span></div>
          
          <div className="flex items-center space-x-2" data-unique-id="50339264-38e4-41a7-a8eb-7db5a9360d46" data-file-name="components/dashboard/recent-saves.tsx">
            <span className="text-sm text-muted-foreground" data-unique-id="cda0faff-5baf-46aa-a203-61d3614f8beb" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="11c3d937-14a0-4a3f-bed5-347239feab5c" data-file-name="components/dashboard/recent-saves.tsx">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="a51a2f5e-580c-46cf-8fa1-ded03bb3a6a7" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="5f3e31c5-ae03-4359-bca1-c7d3d68c2bd5" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="dadbc58b-21e3-4f6b-bf0d-982a22d0ce29" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="59ee29e3-ca8b-485e-b656-4d7893072bc0" data-file-name="components/dashboard/recent-saves.tsx">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="7d4fca71-2c6d-444c-8149-ab8e05d65d6c" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="8320a8a9-52a3-425f-8c52-6f33ebe2865f" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="61231407-bf49-46f8-bdd4-8050de59cc91" data-file-name="components/dashboard/recent-saves.tsx">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="e3e8da01-ccb7-4c42-abdc-ce4468b836a7" data-file-name="components/dashboard/recent-saves.tsx">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="17f54b8e-4868-4f68-823c-ff6f39e1a6cb" data-file-name="components/dashboard/recent-saves.tsx">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="3322a39a-8954-43a1-b736-0f6549df06e2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="a662aa6d-265b-4a1c-8edb-a0e0ef52cadd" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4" data-unique-id="97eacc26-3a5e-4736-b4ff-824ba199677d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="2b6f1e7f-b645-4f22-acbe-5bd5111d91cc" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="adda8cfd-e46e-45fb-84cd-94f19cc54016" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="645f633f-115b-4f8e-bced-5489059f8000" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="5bde50a0-9f62-45bb-87fe-fd576bcb574b" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="844b8539-93dd-4a82-acd3-7db4b1490790" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="44a8b82b-d13f-4926-8301-82b915b179f8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="6bb0b143-39f4-4f5c-b200-31936901b907" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
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
    }} onClick={onClose} data-unique-id="f415002e-ca8b-4897-b2ab-0a8c80f8813a" data-file-name="components/dashboard/recent-saves.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="82190e92-8fec-42a0-a62d-bdb51a9503e8" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="p-6 border-b border-border" data-unique-id="71fc0b83-b802-4def-8666-5ff3b0dc82c9" data-file-name="components/dashboard/recent-saves.tsx">
            <h3 className="text-lg font-medium" data-unique-id="9b2d3897-e163-4308-b1f4-50a9e4c68d86" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="33998c4e-ce43-4a5a-b8a2-de2e899384ce" data-file-name="components/dashboard/recent-saves.tsx">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1" data-unique-id="8700bd6b-257a-4dc7-b6f8-5ee38a3f32c5" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="3385eabd-a9ac-4acd-be39-212cac7c9eab" data-file-name="components/dashboard/recent-saves.tsx">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto" data-unique-id="3bdca982-585a-4aca-a9bd-01d428382470" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="space-y-2" data-unique-id="f6e0cae1-d145-4e75-b4f6-1373e63180f2" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)} data-unique-id="1685cd6f-8f02-496e-bdbf-d7e424a3dd4b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="8ba5683e-fc09-463e-aeb4-ea53a4133a52" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")} data-unique-id="0357a205-212e-4503-b972-61e32eb4f7d0" data-file-name="components/dashboard/recent-saves.tsx">
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div data-unique-id="58b56579-7ca5-4257-b3fc-a09b107734e6" data-file-name="components/dashboard/recent-saves.tsx">
                      <div className="font-medium text-sm" data-unique-id="a86c5f21-1b66-47e6-9f8a-c3d420cafe63" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.name}</div>
                      <div className="text-xs text-muted-foreground" data-unique-id="8cd00b43-b6e6-4183-9e67-653d8170acba" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.count}<span className="editable-text" data-unique-id="ed1b0fb2-7827-4a6e-8336-9bc925806b89" data-file-name="components/dashboard/recent-saves.tsx"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center" data-unique-id="885afbdf-290e-414c-b98f-69d31f78ebb6" data-file-name="components/dashboard/recent-saves.tsx">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="0e37e80f-dcca-4cec-8130-7e5ed47298fe" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="faf23d7d-66ea-4bc3-9ef0-2f71aa9a3e1f" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="1a3e2387-9401-4013-a51f-61cb25cb5e79" data-file-name="components/dashboard/recent-saves.tsx">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting} data-unique-id="891bc058-9705-407b-afe4-a315226baf4a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {isSubmitting ? <>
                  <span className="animate-spin mr-2" data-unique-id="2f36edd2-e85f-4a30-b43f-ad2ba4725fee" data-file-name="components/dashboard/recent-saves.tsx">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="bf2873f2-463d-4ce9-9991-8f5699193d60" data-file-name="components/dashboard/recent-saves.tsx">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span data-unique-id="7dedaae6-5554-4521-8fa1-ef1453ed34a1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="23fdc78a-2df5-48b6-b315-e8f065e2a76f" data-file-name="components/dashboard/recent-saves.tsx">Adding...</span></span>
                </> : <span data-unique-id="bfcf42ae-3674-4552-8ff9-b45003a64d20" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d36cd7b6-3048-4dea-9760-f6a1aaa40d87" data-file-name="components/dashboard/recent-saves.tsx">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};