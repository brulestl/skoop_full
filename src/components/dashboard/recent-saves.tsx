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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Card image */}
      <div className="relative h-40 w-full">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }}>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" onClick={() => onAddToCollection(save)} title="Add to collection">
            <FolderPlus className="h-4 w-4 text-primary" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" title={save.starred ? "Unstar" : "Star"}>
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Engagement metric badge */}
        {engagementMetric && <div className="absolute top-2 left-2 flex items-center bg-background bg-opacity-80 backdrop-blur-sm rounded-full py-1 px-2 text-xs">
            {engagementMetric.icon}
            <span className="ml-1.5 font-medium">{engagementMetric.value}</span>
          </div>}
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-lg line-clamp-2 mb-2">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"><span className="editable-text">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <span className="text-xs text-muted-foreground">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)}>
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')}><span className="editable-text">
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
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex gap-4">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" />
          </div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
            
            {/* Engagement metric badge */}
            {engagementMetric && <div className="flex items-center text-xs">
                {engagementMetric.icon}
                <span className="ml-1 font-medium">{engagementMetric.value}</span>
                <span className="ml-1 text-muted-foreground">{engagementMetric.label}</span>
              </div>}
          </div>

          <div className="mb-3">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"><span className="editable-text">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground">
              <span className="editable-text">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }}>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only"><span className="editable-text">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddToCollection(save)} title="Add to collection">
          <FolderPlus className="h-4 w-4 text-primary" />
          <span className="sr-only"><span className="editable-text">Add to collection</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)}>
          <FileText className="h-4 w-4" />
          <span className="sr-only"><span className="editable-text">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only"><span className="editable-text">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only"><span className="editable-text">Delete</span></span>
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
    }}>
          <div className="py-4 px-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold"><span className="editable-text">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only"><span className="editable-text">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span><span className="editable-text">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2"><span className="editable-text">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-medium mb-2"><span className="editable-text">Tags</span></h4>
              <div className="flex flex-wrap gap-2">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')}><span className="editable-text">
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
    }} onClick={onClose} />}
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
  return <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold"><span className="editable-text">Recent Saves</span></h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              <span><span className="editable-text">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('card')}><span className="editable-text">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')}><span className="editable-text">
                List
              </span></Button>
            </div>
          </div>
        </div>
        
        {/* Sort controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground"><span className="editable-text">
            Showing </span>{visibleSaves.length}<span className="editable-text"> of </span>{initialSaves.length}<span className="editable-text"> saves
          </span></div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground"><span className="editable-text">Sort by:</span></span>
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button variant={sortOption === 'latest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('latest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }}>
                <Calendar className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text">
                Latest
              </span></Button>
              <Button variant={sortOption === 'earliest' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('earliest');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }}>
                <Calendar className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text">
                Earliest
              </span></Button>
              <Button variant={sortOption === 'popular' ? 'secondary' : 'ghost'} size="sm" className="rounded-none text-xs py-1 h-8" onClick={() => {
              setSortOption('popular');
              setPage(1);
              setVisibleSaves([]);
              setHasMore(true);
              setTimeout(() => loadMoreSaves(), 100);
            }}>
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text">
                Popular
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div> : <div className="space-y-4">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} onAddToCollection={handleAddToCollection} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center">
          {loading && <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground"><span className="editable-text">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground"><span className="editable-text">No more saves to load</span></span>}
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
    }} onClick={onClose}>
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
      }} onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium"><span className="editable-text">Add to Collection</span></h3>
            <p className="text-sm text-muted-foreground mt-1"><span className="editable-text">Select collections to add this item to:</span></p>
          </div>
          
          <div className="p-6 max-h-[300px] overflow-y-auto">
            <div className="space-y-2">
              {availableCollections.map(collection => <div key={collection.id} className={cn("flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors", selectedCollections.includes(collection.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent")} onClick={() => toggleCollection(collection.id)}>
                  <div className="flex items-center">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", selectedCollections.includes(collection.id) ? "bg-primary/20" : "bg-secondary")}>
                      <FolderPlus className={cn("h-4 w-4", selectedCollections.includes(collection.id) ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{collection.name}</div>
                      <div className="text-xs text-muted-foreground">{collection.count}<span className="editable-text"> items</span></div>
                    </div>
                  </div>
                  
                  {selectedCollections.includes(collection.id) && <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}><span className="editable-text">
              Cancel
            </span></Button>
            <Button onClick={handleSubmit} disabled={selectedCollections.length === 0 || isSubmitting}>
              {isSubmitting ? <>
                  <span className="animate-spin mr-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  <span><span className="editable-text">Adding...</span></span>
                </> : <span><span className="editable-text">Add to Collections</span></span>}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};