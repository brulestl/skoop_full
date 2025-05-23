"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, Tags, Trash2, ExternalLink, ArrowRight, Sparkles, FileText, X, ChevronRight } from "lucide-react";
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
  onShowAISummary
}: {
  save: typeof initialSaves[0];
  onShowAISummary: (save: typeof initialSaves[0]) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div className="skoop-card h-full overflow-hidden flex flex-col" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="27738b7b-282b-4a3f-93b3-d86f1f3c6c7a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Card image */}
      <div className="relative h-40 w-full" data-unique-id="ac2a4422-daf4-4dab-b74f-2415a9cb9533" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <Image src={save.image} alt={save.title} fill className="object-cover" data-unique-id="464ed9c8-85a0-4e57-a620-1115f4bfff2e" data-file-name="components/dashboard/recent-saves.tsx" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" data-unique-id="b0c21da5-75b6-463e-b9ea-f5dd15851209" data-file-name="components/dashboard/recent-saves.tsx" />
        
        {/* Action buttons */}
        <div className={cn("absolute top-2 right-2 flex space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
        transition: "opacity 0.2s ease"
      }} data-unique-id="e750aa53-2402-40ea-af36-71ea80ef20b1" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background bg-opacity-80 backdrop-blur-sm" data-unique-id="e2fc79e2-0f09-4b6d-b4e7-fce6796d91c9" data-file-name="components/dashboard/recent-saves.tsx">
            <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          </Button>
        </div>
        
        {/* Source icon */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-md" data-unique-id="a6228c9f-b6f1-415d-9d44-e1ac0bd058b9" data-file-name="components/dashboard/recent-saves.tsx">
          <SourceIcon source={save.source} />
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col" data-unique-id="e9154d0a-53a0-4a93-a628-7738b37c557a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        <h3 className="font-medium text-lg line-clamp-2 mb-2" data-unique-id="80d324a4-4795-4257-a51b-6af67e40b5ce" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.title}
        </h3>
        
        <div className="mb-3 flex-grow" data-unique-id="7df0aa61-14d9-4e93-b77f-d755d263f28c" data-file-name="components/dashboard/recent-saves.tsx">
          <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3" data-unique-id="50640946-5ab0-436d-9571-4b8698239a18" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="714a9f5f-f810-4bbb-9bdd-443f9ed9572f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {tag}
            </span>)}
          {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="cb149917-3748-4a09-b64e-d7dfacb856bd" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0f0eab32-083d-4197-8e90-3f24dda3b773" data-file-name="components/dashboard/recent-saves.tsx">
              +</span>{save.tags.length - 3}
            </span>}
        </div>
        
        {/* Card footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto" data-unique-id="c07fb01c-e490-4ca1-8070-a7db4582fd98" data-file-name="components/dashboard/recent-saves.tsx">
          <span className="text-xs text-muted-foreground" data-unique-id="8418df6b-c904-4cbe-977c-9e092e98ead5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {format(save.savedAt, "MMM d")}
          </span>
          
          <div className="flex space-x-2" data-unique-id="f0ceca2f-031f-4baa-bf3a-328254cff8dd" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onShowAISummary(save)} data-unique-id="a7d24b38-857a-4d09-bc6b-87f532450547" data-file-name="components/dashboard/recent-saves.tsx">
              <FileText className="h-3.5 w-3.5 mr-1" /><span className="editable-text" data-unique-id="e3453ace-6011-4967-8938-918f60e42a0b" data-file-name="components/dashboard/recent-saves.tsx">
              AI Summary
            </span></Button>
            
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-primary" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="74aa2048-bb74-497e-b3e5-5f695fe35121" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="f3a1b63d-5902-4d2b-bff6-7e74a1d5ac63" data-file-name="components/dashboard/recent-saves.tsx">
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
  onShowAISummary
}: {
  save: typeof initialSaves[0];
  onShowAISummary: (save: typeof initialSaves[0]) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div className="skoop-card p-4 group relative" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} data-unique-id="0cad3df0-81f3-4c58-9c38-e3f765fb901f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex gap-4" data-unique-id="c2a05dc8-bda4-4c96-a026-227e8b6b5658" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="dd12f78f-18cf-46ff-b3aa-fbe6c8fcc195" data-file-name="components/dashboard/recent-saves.tsx">
            <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="f7ac24f3-2947-4424-84bf-7bd345b710f3" data-file-name="components/dashboard/recent-saves.tsx" />
          </div>}
        <div className="flex-1 min-w-0" data-unique-id="0a7f5847-bc45-4b8b-8c95-acda4a00938d" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="flex items-center gap-3 mb-2" data-unique-id="32eab061-dc33-4fd9-8881-2c63bc606a2d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="e1848799-df10-4da1-bd73-a8d37f6819f9" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
            </div>
            <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="002b37ad-291e-41dc-9b0c-ddeecb3646b6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.title}
            </h3>
            {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
          </div>

          <div className="mb-3" data-unique-id="abc03ab3-a0e1-4f0d-844a-91eb1bac65b6" data-file-name="components/dashboard/recent-saves.tsx">
            <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
          </div>

          <div className="flex items-center justify-between" data-unique-id="6248d58f-37f4-48fb-9b30-f2de706c3a0e" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center gap-1" data-unique-id="b09df506-8cb3-4694-91b4-31346ddcfc6c" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <Tags className="h-3 w-3 text-muted-foreground mr-1" />
              {save.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="550bff84-8866-44a7-83c8-c27ed1a92d41" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {tag}
                </span>)}
              {save.tags.length > 3 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground" data-unique-id="4ce0cd92-e705-40a2-8e65-7ccaa904efea" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="629cb563-0795-49eb-8c4f-bd711bf8c2ce" data-file-name="components/dashboard/recent-saves.tsx">
                  +</span>{save.tags.length - 3}
                </span>}
            </div>
            <span className="text-xs text-muted-foreground" data-unique-id="f5f75867-7b44-4f01-a372-12eb02296765" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <span className="editable-text" data-unique-id="fd4ff902-ac9f-4164-9cc0-b86aac5a94fe" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
              {format(save.savedAt, "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div className={cn("absolute right-3 top-3 flex items-center space-x-1", isHovered ? "opacity-100" : "opacity-0")} style={{
      transition: "opacity 0.2s ease"
    }} data-unique-id="4f5b63ef-b829-44d7-8acc-8e5df7c54181" data-file-name="components/dashboard/recent-saves.tsx">
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="3d607ffe-5402-4270-9dcc-ce3eb811b077" data-file-name="components/dashboard/recent-saves.tsx">
          <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
          <span className="sr-only" data-unique-id="c24b240a-9880-46da-af57-e392e8cf875e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="8c4e19d1-c56b-42af-aad7-f5068d169fa9" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onShowAISummary(save)} data-unique-id="5ea07b57-7699-4c94-bc58-f4f017a47911" data-file-name="components/dashboard/recent-saves.tsx">
          <FileText className="h-4 w-4" />
          <span className="sr-only" data-unique-id="f255ad12-f9cb-4a89-80f8-6f734ec1af9f" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b1457053-f387-44b6-bd22-6079443face0" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="ec09e055-2b1e-48ab-b89b-de11c4baf486" data-file-name="components/dashboard/recent-saves.tsx">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only" data-unique-id="38557ecc-2ba4-4c23-9215-a8fdd8a5ecaf" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="c74b2508-fff8-445b-ade7-17697ab0fb4d" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="57934b23-d739-4b72-8bee-47f6854655e8" data-file-name="components/dashboard/recent-saves.tsx">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only" data-unique-id="0bb73836-003f-431c-a4c8-9c5739297a30" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="fed012f2-de0b-43d7-8c23-3d1e5e9a2d76" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
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
    }} data-unique-id="ed9b87db-1fb0-4c06-be09-ff8e3c22eeac" data-file-name="components/dashboard/recent-saves.tsx">
          <div className="py-4 px-6 border-b border-border flex items-center justify-between" data-unique-id="b95bd89c-4537-45ab-ab51-ffcff12e03ce" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="flex items-center" data-unique-id="f7929b03-055f-47a3-a9bf-b110ceac9099" data-file-name="components/dashboard/recent-saves.tsx">
              <SourceIcon source={save.source} />
              <h2 className="ml-2 font-semibold" data-unique-id="6bb283c3-7377-4111-89fd-7ddc50ffd0f7" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="12abea40-9d43-4401-b988-b800783aaec8" data-file-name="components/dashboard/recent-saves.tsx">AI Summary</span></h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-unique-id="eb2ea0f0-3c27-4c20-84c4-1dc26801f3db" data-file-name="components/dashboard/recent-saves.tsx">
              <X className="h-4 w-4" />
              <span className="sr-only" data-unique-id="eb5f9894-d638-49ef-893a-8f05f29a29e4" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="3a873b14-ee76-49e6-9d06-a781b167150d" data-file-name="components/dashboard/recent-saves.tsx">Close</span></span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" data-unique-id="c11e71fb-e16a-4811-93ca-2e2147f28da7" data-file-name="components/dashboard/recent-saves.tsx">
            <div className="mb-6" data-unique-id="28afe40a-22c3-4282-abb7-7c65ab86df5c" data-file-name="components/dashboard/recent-saves.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="01cd2cc4-8ece-40f1-aae3-06879e377778" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{save.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground" data-unique-id="db41dc08-2ef6-43b9-860d-ad5be677037f" data-file-name="components/dashboard/recent-saves.tsx">
                <span data-unique-id="5b7b2590-de45-4cd3-b126-e469ee49215e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="abd5e88b-f35e-4a7d-a194-f734001d8120" data-file-name="components/dashboard/recent-saves.tsx">Source: </span></span>
                <a href={save.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center ml-1 text-primary hover:underline" data-unique-id="acdc54de-fc3d-4304-b9f8-e068cfd591a5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.sourceUrl.split('/')[2]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="mb-6" data-unique-id="38f01604-c116-416a-a18e-7e79b1ef254d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <h4 className="text-sm font-medium text-muted-foreground mb-2" data-unique-id="2e88dfac-df02-4a14-a092-1bff20d3ed40" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9aca8a04-f229-47d7-983a-357cdbbdde56" data-file-name="components/dashboard/recent-saves.tsx">AI Summary by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</h4>
              {loading ? <div className="animate-pulse space-y-2" data-unique-id="39f957c4-95af-4955-b373-65d067877e6f" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="a7078849-b256-406a-857a-f10aa0d70c14" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-3/4" data-unique-id="cf083a54-107d-40b2-81ca-b89a3dfb46c0" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-5/6" data-unique-id="cf261218-b319-4c73-b793-e6aec2c26acc" data-file-name="components/dashboard/recent-saves.tsx"></div>
                  <div className="h-4 bg-muted rounded w-full" data-unique-id="78484ac4-2f26-497b-ad79-48e1d2e363a4" data-file-name="components/dashboard/recent-saves.tsx"></div>
                </div> : <div className="prose prose-sm dark:prose-invert max-w-none" data-unique-id="482b73ec-b322-43e7-8744-e5a6f84bb8d7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {fullSummary.split('\n\n').map((paragraph, i) => <p key={i} data-unique-id="c8b4bbc6-abc1-455a-8d42-28df534d31b0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">{paragraph}</p>)}
                </div>}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border" data-unique-id="3a5b375e-39be-4bdb-9611-8590e8227f82" data-file-name="components/dashboard/recent-saves.tsx">
              <h4 className="text-sm font-medium mb-2" data-unique-id="57c2a0a5-1faf-4c7c-8f5b-bf815c6dfc81" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="83468872-cb3e-4670-a5c3-a8efe4671c29" data-file-name="components/dashboard/recent-saves.tsx">Tags</span></h4>
              <div className="flex flex-wrap gap-2" data-unique-id="906aa3ce-3efa-464d-ad6a-b839cb5d8442" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.tags.map(tag => <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs" data-unique-id="1e0c78ee-7e5b-4e64-ae3d-27f98d508bf3" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border" data-unique-id="d0acd44f-2f8a-4c6a-b122-836f5ec08465" data-file-name="components/dashboard/recent-saves.tsx">
            <Button className="w-full" onClick={() => window.open(save.sourceUrl, '_blank')} data-unique-id="6b39bcc8-5523-42a9-b02a-c14f01670612" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="b8425f3a-678a-4edd-8215-ea357748a1fb" data-file-name="components/dashboard/recent-saves.tsx">
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
    }} onClick={onClose} data-unique-id="141258f9-0f51-493c-9cde-88abe573e918" data-file-name="components/dashboard/recent-saves.tsx" />}
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

  // Simulating loading more data
  const loadMoreSaves = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      if (startIndex >= initialSaves.length) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const newItems = initialSaves.slice(0, endIndex);
      setVisibleSaves(newItems);
      setPage(prevPage => prevPage + 1);
      setLoading(false);

      // Check if there are more items to load
      setHasMore(endIndex < initialSaves.length);
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
  return <div className="flex flex-col h-full" data-unique-id="eb886eb8-42b1-41f8-90ae-307dada65b4d" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-4 mb-2 border-b border-border" data-unique-id="e675ddba-9d0f-4b8d-8b22-effb23e93291" data-file-name="components/dashboard/recent-saves.tsx">
        <div className="flex items-center justify-between mb-4" data-unique-id="7240357e-f0d4-4b59-bd42-439f9bf4923f" data-file-name="components/dashboard/recent-saves.tsx">
          <h1 className="text-2xl font-semibold" data-unique-id="7c2d4c8b-0a50-4b3f-ae5f-ad5e5881c210" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="dc110f81-a2f1-44a6-83d6-78feff975431" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
          <div className="flex items-center space-x-3" data-unique-id="45446fa5-cdb8-4f91-8b2f-3798b920e7f5" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="b47b580b-ff20-44d6-a59b-3f56ccb64587" data-file-name="components/dashboard/recent-saves.tsx">
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              <span data-unique-id="f780a08b-69fc-4157-8754-372ecc76c590" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="937ebae7-f15d-4473-a191-805b17d70346" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
            </Button>
            
            <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="2cb46b5f-92ec-44e4-972b-3a92c73c821f" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant={viewMode === 'card' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('card')} data-unique-id="9ce1229c-f1f9-4ade-9a74-87927f3d864e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5e3a3b35-502e-4c78-a5a0-c5b762f4aa6e" data-file-name="components/dashboard/recent-saves.tsx">
                Card
              </span></Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="3c40c38c-c782-4fa5-8a12-c07c14a4083a" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="345a6fe3-54b8-47b0-8e5e-26a91ed9a462" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden" data-unique-id="ffdf91b4-7e6b-4995-9dc5-43823055f0e6" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {viewMode === 'card' ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="4033badd-df5b-440e-8ab3-f0de6af1eba5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveCard key={save.id} save={save} onShowAISummary={handleShowAISummary} />)}
          </div> : <div className="space-y-4" data-unique-id="7847c0b0-263d-4af7-8ac6-df02d7359727" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            {visibleSaves.map(save => <SaveListItem key={save.id} save={save} onShowAISummary={handleShowAISummary} />)}
          </div>}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="py-8 flex justify-center" data-unique-id="16b1c752-d40d-434c-b373-6eade8601581" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {loading && <div className="flex items-center space-x-2" data-unique-id="4ee9d6bc-d682-41db-b197-43996ee3e85b" data-file-name="components/dashboard/recent-saves.tsx">
              <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="b8f222f6-e93c-4f6b-89ea-9283ee31daa4" data-file-name="components/dashboard/recent-saves.tsx">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-muted-foreground" data-unique-id="46193aae-0ce6-4404-b9e7-c2737d8f2272" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="826ed9ce-f8a9-4924-a8f2-78c7e8348d64" data-file-name="components/dashboard/recent-saves.tsx">Loading more...</span></span>
            </div>}
          {!loading && !hasMore && visibleSaves.length > 0 && <span className="text-sm text-muted-foreground" data-unique-id="c110cbe5-c926-4738-bcc9-ee46e300afe9" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="507c8571-34bb-48ca-83b8-6ecfc8e5fba5" data-file-name="components/dashboard/recent-saves.tsx">No more saves to load</span></span>}
        </div>
      </div>
      
      {/* AI Summary Panel */}
      <AISummaryPanel save={selectedSave} isOpen={summaryPanelOpen} onClose={() => setSummaryPanelOpen(false)} selectedModel={selectedModel} />
    </div>;
}