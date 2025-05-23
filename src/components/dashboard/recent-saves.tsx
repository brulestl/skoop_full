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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="2824caa1-1d2a-4efe-a6ae-0984b18a0eb9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="6ac218f5-d8ea-489b-944f-ec21c0449237" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="0ef9ec34-17c8-42ea-b85d-6a7b64263ed4" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="a498d3ff-1a16-4cee-8df2-fa38c83d2f6f" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="a90a7c42-8f27-48cf-b636-cba37da33b4b" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="3dd31d3a-8f70-490f-82ed-996820ce5fe2" data-file-name="components/dashboard/recent-saves.tsx">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"} data-unique-id="f6b208a9-cd11-4721-a3a8-df3fa292e40e" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs" data-unique-id="3fff71dc-d693-4725-be95-4a5726ccd89f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium" data-unique-id="5d00bbbd-3de5-4648-88a6-4be0fd2be3ee" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="8a79df6e-ab4a-4aec-99dc-914ee7d559ec" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="5ca5ab12-73c6-44f3-a87e-1dcb94e1c502" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="0c998c25-1625-4945-9f2e-e7619450e9dd" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="be03aecd-0b5b-4ac1-aa70-c27c9330587e" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="25d56d68-9897-4398-af31-430e2fcd0a1e" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="f835532d-d8e7-45b9-801e-681cd9f41560" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="bdfeeee8-b0ea-4faf-a81e-e41e8bacb5a4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0da2843c-0fbf-4ed0-bfee-ced19d061715" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="64a53e70-5b27-4210-a783-4a1213180b36" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="b74484f6-ff8b-40a5-b21c-cbd15a36c34c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="781afc52-52be-49ac-85a5-edd0e34f0694" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="bcea09ee-fc0c-4521-a661-4fff19b8aca3" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="2b0d41a3-98d8-4fff-829d-e816bc2ea9ab" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="c65a9ec4-6772-4a70-8140-e2e6de635e61" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="7661c259-4065-4c36-9bad-431af4ca9f19" data-file-name="components/dashboard/recent-saves.tsx">
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="d5b7df97-7473-4824-93f2-7dd48ab90a1f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="a8a8c51c-3f96-4ef5-ac30-daf19fabd38f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="ff9bc386-a8dd-4b60-acd3-ea701af911c0" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="50b89e8a-f08e-49ae-ac9b-d380fdad852b" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="8bbd3fa8-a1b2-4260-90c9-25f991761575" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="bb5b2c39-776f-413e-908f-e97346bb41d9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="38fea41e-f87f-429e-a108-89c3042aec4a" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="a09e2259-28e0-473a-bccb-54df01de777a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs" data-unique-id="d7255480-6a0b-40b0-a8a3-6a39ef8cf050" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {engagementMetric.icon}
                <span className="ml-1 font-medium" data-unique-id="033aa4db-9d51-4149-8fc6-282a2c8217e4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground" data-unique-id="405f4cbf-e992-4118-a4d5-35c9817f3175" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3" data-unique-id="02e56c0c-93cb-4dc8-936d-18f158131d5a" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="3c85f397-a308-4cb0-adcd-9ec75d9acd15" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="ed89444b-5f83-42e2-8f8b-0bb5d2b9d0c4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="61ec22bd-7e37-4e9b-9a39-ad708dd9082c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="d1192506-d80f-4bb6-84d8-e1aaa1cba1e9" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a3461421-2cce-4af5-bc6c-0796745dd83c" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="cfe6d152-5462-4a8c-9367-71b6ed612fd8" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="1af8e94b-34b9-41f5-9568-565f0c586c11" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="6f8c8a03-860e-46b3-9857-4ba917e0ccf3" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="be5f1c4d-7603-451f-8bac-918bdc4047d1" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="57a473e5-bc0f-4761-8569-26dc60f9dca1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="658a3daa-ed4a-45cd-bf38-53ea40e80f77" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection" data-unique-id="87a7f75e-7be0-4232-9fd3-cf3a028fa584" data-file-name="components/dashboard/recent-saves.tsx">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only" data-unique-id="4e0d694d-815f-407c-aada-b0b5f2578be6" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="93291649-dea3-4fb5-aa08-ea981b51e263" data-file-name="components/dashboard/recent-saves.tsx">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="e43039c3-e4d4-4c44-a841-dbb6db22e2fc" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="d791fa15-287a-432c-9d92-8a3dbdb86fc4" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="03d8ffb1-fc26-427b-99cf-095c54232d42" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="05e0023e-4838-400a-979e-c4034227c1b8" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="45811641-af95-4dfb-b065-00e3bbe63f71" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="541bb62b-ab30-45d4-9c20-29e32963da1e" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="e820eeae-c3b2-4b32-9970-e5ff06b14e9e" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="14b09b9f-08d4-4405-b3dc-cc8956b11bb6" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="69a86b9a-dcba-442f-b785-c0adf47930f1" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
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
    }} data-unique-id="3a253af9-69c5-4d9e-8a51-adc68e2870d5" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="181b2d1e-d2fc-46f1-9b84-c31726e589ce" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="71c54b77-27d7-4ddf-a28f-e60a7b5e716a" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="9028c3e8-c859-4a8b-b17b-10658b9736c4" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="ac74c156-09e4-428c-81b8-5c882abe9fd9" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="3bbf6023-81d6-4800-9ec9-789b13be56f3" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="0dcc1bc2-9ccf-4ada-be1e-62fccf1ea3e1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="dda5ceb9-82c5-4844-a305-15588d554013" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="db6a8eb8-318c-43c8-ba13-de17cb105d91" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="8ae4e362-4db8-43fe-84b2-418476181d09" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="2f3aa5ed-8e57-4cb4-ad8a-00b206518587" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="a1ca7797-e209-4693-b057-4e5a3d967a49" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="d9edd756-e8d0-400c-9bdc-515d3e5ec18c" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="253618e3-e100-48ee-8613-e0ee23515d1b" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="0365b4a1-d49c-4d53-ac88-02c26375fbf4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="0a4e1268-23fc-4052-918c-09ce3c9b44a7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="347fa050-bc8a-4ab7-b5e1-760d487db2d4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="dad92932-29d7-4dd5-ab17-3e2687e4e2d1" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="220953b0-bbce-48e0-a8b3-e5fe53749275" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="e9026cc6-8f22-4a5e-a98e-fb8a7afc8739" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="401f7f4e-1708-44f8-96e4-13bbe841dda5" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="4cc7784e-9ee9-443e-a020-d57b7ff34114" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="aad36b92-23ed-4203-a763-93be06324531" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="37102591-2d4c-4f7a-8db2-f3956469d83e" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="5b6095b8-4450-4f47-b973-4681e1419c49" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="d1888b99-a787-4691-9e0d-3861de790562" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="4e29cfb2-f50d-459f-b9b0-76806348feef" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f94a9bca-eb44-45ce-946a-1936e8cd1c82" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="52edeaa6-16ff-4c8c-ba99-d1e215d56759" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="6f4cbbe2-0f7d-41a6-8699-81a7e1e2d409" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="8f301fd9-3916-45f9-b623-dc6ccdd1df8e" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="5b579982-fd84-435e-9a30-9dddc0b2f7d9" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="83eb7338-b9e1-445f-8aa5-c3ce97a318c1" data-file-name="components/dashboard/recent-saves.tsx">
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
    }} onClick={onClose} data-unique-id="03755a0c-2798-40e1-af83-15604967b99d" data-file-name="components/dashboard/recent-saves.tsx" />}
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
  return <div className="flex flex-col h-full" data-unique-id="bb7bfaea-81a5-49a7-aa7d-0406a7d0c69b" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="d2b03af0-88f5-4534-85cd-e632662b18df" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <div className="flex items-center justify-between mb-4" data-unique-id="60c59ae7-7435-403e-a046-2aeb22dfe14b" data-file-name="components/dashboard/recent-saves.tsx">
          <h1 className="text-2xl font-semibold" data-unique-id="e9583a20-7cbb-4a14-b2e7-66b3a3add2b5" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="c31d698e-5623-4491-abec-a8c1aa8776c8" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
          <div className="flex items-center space-x-3" data-unique-id="f76de735-de65-4d7c-baf6-89e104a9ccc8" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="892eeb4e-2cef-4013-afc8-a93cfb99584c" data-file-name="components/dashboard/recent-saves.tsx">
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              <span data-unique-id="0201a36b-38d1-4c60-87cc-81a0cc290fe0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a57ed4a1-f2e0-4bfe-8b20-018638081a78" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="bdd9f0ed-fdc7-4598-b043-dcb48bdfac8f" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('card')} data-unique-id="6492df49-034b-43a0-b8e6-88da938b9277" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d95b6d4a-1356-40d1-bc87-a9d6bf9d3341" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="164a5fdf-9371-4e54-b191-c7dbcacad060" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="c8e60d17-fc68-4952-8586-69cfbb30b85d" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex items-center justify-between" data-unique-id="39567a05-2aad-4def-9155-606bd3843a22" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="text-sm text-muted-foreground" data-unique-id="b40c959e-ebba-4cf6-a18b-06dfc452ffc0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9687aafa-57fb-40cf-bf30-ecaf1f093618" data-file-name="components/dashboard/recent-saves.tsx">
            Showing </span>{visibleSaves.length}<span className="editable-text" data-unique-id="7a7ff80d-d39f-48c9-a9bb-c545a610db70" data-file-name="components/dashboard/recent-saves.tsx"> of </span>{initialSaves.length}<span className="editable-text" data-unique-id="0d04cdf1-fc4a-479e-b4dc-c08a442fc668" data-file-name="components/dashboard/recent-saves.tsx"> saves
          </span></div>
          
          <div className="flex items-center space-x-2" data-unique-id="7a07a838-e7b3-4d2d-90ec-7d7d139dab85" data-file-name="components/dashboard/recent-saves.tsx">
            <span className="text-sm text-muted-foreground" data-unique-id="b793efcd-fd1e-4d1e-80ad-9c39e432adf1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="0d8dbea7-a59f-41af-8f53-0c2471d453ce" data-file-name="components/dashboard/recent-saves.tsx">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="c5d54915-602a-4fef-b1b3-a0ea591556ad" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="318e98c4-efad-43de-aae0-9bc47590839d" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="043d89f6-5779-48f1-b462-51ecac361d4f" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="75ebe0d8-426a-4c0d-b6f0-9c88ab244959" data-file-name="components/dashboard/recent-saves.tsx">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="3c234395-3137-409c-9f55-8f198fc6adfc" data-file-name="components/dashboard/recent-saves.tsx">
                <Calendar className="h-3.5 w-3.5 mr-1.5" data-unique-id="bf851095-ec87-4bbf-81a4-1155662a0c9a" data-file-name="components/dashboard/recent-saves.tsx" /><span className="editable-text" data-unique-id="ec982a29-9a41-418f-b53b-8a965bf383ac" data-file-name="components/dashboard/recent-saves.tsx">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }} data-unique-id="6289da89-0d6b-4a11-a984-0779208bfd97" data-file-name="components/dashboard/recent-saves.tsx">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="507cab04-7a45-4128-b17a-be86f7915939" data-file-name="components/dashboard/recent-saves.tsx">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="747b4e77-2d8d-4bc5-b31b-73e1826f1730" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="9d20f068-bbb1-40d5-b29d-2821c591c603" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4" data-unique-id="f537e472-cc76-4f84-9efa-f87ee1c5acd0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="32b57143-de2e-486f-a4ed-83fc01c1796c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="38eedaae-d23c-4700-b86a-9a7af570a71c" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="245d7a48-33d2-404a-bd9d-a610817d7ea8" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="911e7d7e-d96a-4a40-ac18-f9595b609de8" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="c29dbb5d-111e-4d57-b9dc-e0c48b0964df" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="38fee35a-2ed2-4663-9ec6-b35db4ed44e1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="1fbdcca2-d5ee-4a0c-9c47-b05ac17406ff" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
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
    }} onClick={onClose} data-unique-id="a76c8c56-c966-42ab-b8a6-fbb49f8fe224" data-file-name="components/dashboard/recent-saves.tsx">
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
      }} onClick={e => e.stopPropagation()} data-unique-id="10efb225-8ed3-4a79-87da-2510ce3040b0" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="p-6 border-b border-border" data-unique-id="cb58be75-2a5a-4b26-b975-b0806e65727d" data-file-name="components/dashboard/recent-saves.tsx">
            <h3 className="text-lg font-medium" data-unique-id="a22b249c-e681-47e1-b692-ae48cae98bd0" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f4f6a3b2-aa8a-4861-bc3d-c60769a17b5c" data-file-name="components/dashboard/recent-saves.tsx">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1" data-unique-id="6e39dab2-e104-4f51-b57c-279e4c959a56" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="3c90e6af-3f49-4919-9f95-73ff76781a2b" data-file-name="components/dashboard/recent-saves.tsx">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto" data-unique-id="c6521bfd-445f-404d-81cc-adcb3503854f" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="space-y-2" data-unique-id="dd88e841-681f-4ba7-8af9-f1766c8060a3" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)} data-unique-id="8115af1f-a2c2-41df-8f4b-d42d73bb18ba" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="41cac154-4b24-4ced-a0e3-0fb578f9df5a" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")} data-unique-id="5cd03818-bc70-40ed-8d40-eba95012938d" data-file-name="components/dashboard/recent-saves.tsx">
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div data-unique-id="3acb2c6d-5870-49b3-bd68-d84c0f06a555" data-file-name="components/dashboard/recent-saves.tsx">
                      <div className="font-medium text-sm" data-unique-id="2917fe7d-2162-45bb-aac0-80eb8c94fb32" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.name}</div>
                      <div className="text-xs text-muted-foreground" data-unique-id="923cf009-6bde-4f81-9ada-b616edabc26c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{collection.count}<span className="editable-text" data-unique-id="148d65d9-0d0d-4e6c-98d1-7f0de3b97968" data-file-name="components/dashboard/recent-saves.tsx"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center" data-unique-id="a8cb53c8-cc11-43d2-b474-ddb7c70358e0" data-file-name="components/dashboard/recent-saves.tsx">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2" data-unique-id="f82efd40-a6fa-4cf7-bff6-d25bceabd682" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} data-unique-id="6b0a1286-785b-4630-ad2e-6d0072cb2b51" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f809be8f-3ed8-4f7e-9d49-94ff3ffd118e" data-file-name="components/dashboard/recent-saves.tsx">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting} data-unique-id="b5d5d160-7e6b-4bf3-9796-1a237feb4425" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {isSubmitting ? <>
                  <span className="animate-spin mr-2" data-unique-id="7dbb2357-2f78-47dd-b492-30ef3435e3a8" data-file-name="components/dashboard/recent-saves.tsx">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" data-unique-id="ef6b26d2-f632-402f-9a84-8b856ef920f8" data-file-name="components/dashboard/recent-saves.tsx">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span data-unique-id="5ab18c09-750e-4e91-b781-1202d6d300c4" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b61658cc-2598-44cf-ad39-4d38b5c3ead3" data-file-name="components/dashboard/recent-saves.tsx">Adding...</span></span>
                </> : <span data-unique-id="d9e64d31-5d2b-4bf2-97cc-abcf8a55ab60" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="85b33a26-553b-4fd4-8667-8cec17b1ef37" data-file-name="components/dashboard/recent-saves.tsx">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};