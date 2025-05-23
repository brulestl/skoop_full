"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Github, Twitter, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, Tags, Trash2, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import AISummary from "@/components/ai/summary";
import { cn } from "@/lib/utils";

// Enhanced sample data for recent saves with more details for bento grid
const recentSaves = [{
  id: 1,
  title: "Advanced TypeScript Patterns for Building Robust Applications",
  description: "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
  content: "TypeScript offers powerful type system features that can help you build more robust applications. This guide explores advanced patterns like discriminated unions, which allow you to create type-safe state machines; branded types, which prevent type confusion between semantically different values; conditional types, which enable complex type transformations; and mapped types, which provide ways to transform existing types into new ones. These patterns help catch more errors at compile time and make your code more self-documenting.",
  source: "github",
  sourceUrl: "https://github.com/microsoft/TypeScript",
  savedAt: new Date(2023, 4, 18),
  tags: ["typescript", "programming", "web-development"],
  starred: true,
  image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop",
  className: "col-span-3 md:col-span-2 row-span-1"
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
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop",
  className: "col-span-3 md:col-span-1 row-span-1"
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
  image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=500&auto=format&fit=crop",
  className: "col-span-3 md:col-span-1 row-span-2"
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
  image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=500&auto=format&fit=crop",
  className: "col-span-3 md:col-span-2 row-span-1"
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
  image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop",
  className: "col-span-3 md:col-span-1 row-span-1"
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
export default function RecentSaves() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'bento' | 'list'>('bento');
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const toggleModel = () => {
    setSelectedModel(selectedModel === 'claude-bedrock' ? 'azure-gpt-4o' : 'claude-bedrock');
  };
  return <div data-unique-id="a9bcc8bb-da8d-49fb-ba19-a381dcccc6f4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="03833eb5-5fb4-40cc-a76f-a088aae9c167" data-file-name="components/dashboard/recent-saves.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="14d41b75-6342-4737-9581-6d27a92c6520" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="2008fbfc-ca1f-415a-a1e8-35da3a671121" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
        <div className="flex items-center space-x-3" data-unique-id="7a92d97a-f8e7-431b-bb62-83abb8d45440" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="c37a9c3d-0a89-4dbd-9520-dda8117b859a" data-file-name="components/dashboard/recent-saves.tsx">
            <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
            <span data-unique-id="db3e1c82-d8b8-4de7-98c3-053019d52035" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="1ce3beed-d4ff-49cc-b0e1-d693a8e82ef5" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
          </Button>
          
          <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="fcf9e6fa-0c94-49cc-8546-0bb9a81c25d7" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant={viewMode === 'bento' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('bento')} data-unique-id="09d53609-efbb-4b7f-9410-a85ef97231aa" data-file-name="components/dashboard/recent-saves.tsx">
              <span className="editable-text" data-unique-id="54efc3eb-dd44-48f2-a784-1aea02a76f76" data-file-name="components/dashboard/recent-saves.tsx">
                Bento
              </span>
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="12721b6a-afcb-42c2-ad54-67b4ac7220a1" data-file-name="components/dashboard/recent-saves.tsx">
              <span className="editable-text" data-unique-id="5fdaa7ca-6e1a-43d7-9b18-538ed2847270" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'bento' ? <BentoGrid className="auto-rows-[180px] md:auto-rows-[240px]">
          {recentSaves.map(save => <BentoCard key={save.id} name={save.title} className={save.className} background={<div className="absolute inset-0 z-0" data-unique-id="fa1bc6e5-4895-4ae8-a443-e2602bd81808" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.image && <Image src={save.image} alt={save.title} fill className="object-cover opacity-20 transition-opacity group-hover:opacity-30" data-unique-id="6662ca76-19ec-4712-8781-f8a0b187ce04" data-file-name="components/dashboard/recent-saves.tsx" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" data-unique-id="e88487f9-a635-4faa-a9fb-65b887450bed" data-file-name="components/dashboard/recent-saves.tsx" />
                </div>} Icon={() => <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="2fd204b0-ed9b-465a-9011-2d454bc15792" data-file-name="components/dashboard/recent-saves.tsx">
                  <SourceIcon source={save.source} />
                </div>} description={<div className="space-y-1" data-unique-id="5e5e278c-82f7-4f9b-ae1f-6f717490337b" data-file-name="components/dashboard/recent-saves.tsx">
                  <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
                </div>} href={save.sourceUrl} cta="View Source" />)}
        </BentoGrid> : <div className="space-y-4" data-unique-id="43ba3ef5-bd8b-4155-bb3f-05f5c9a358d5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {recentSaves.map(save => <motion.div key={save.id} className="skoop-card p-4 group relative" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }} onMouseEnter={() => setActiveItem(save.id)} onMouseLeave={() => setActiveItem(null)} data-unique-id="2b3e55d5-4bb5-4203-a490-2556987bdd8a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <div className="flex gap-4" data-unique-id="fb728fb9-6039-48da-8991-d5260c412442" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="62b2cfd4-8657-493f-a36c-b92a8e66a434" data-file-name="components/dashboard/recent-saves.tsx">
                    <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="e0d12d8e-4fef-4fe1-bff4-5804d17717ce" data-file-name="components/dashboard/recent-saves.tsx" />
                  </div>}
                <div className="flex-1 min-w-0" data-unique-id="8cd7a4cc-7ca8-4016-8da4-9278b14ea67f" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="flex items-center gap-3 mb-2" data-unique-id="7e633415-9810-43db-abba-584a32047afb" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="13ca0308-1c8c-4fdc-81a9-6acdcd013143" data-file-name="components/dashboard/recent-saves.tsx">
                      <SourceIcon source={save.source} />
                    </div>
                    <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="fa8dcaa8-7b4d-41c2-8703-1134f89e4978" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      {save.title}
                    </h3>
                    {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
                  </div>

                  <div className="mb-3" data-unique-id="eefd19c8-cbe2-4218-a4c9-83a997d6ff6b" data-file-name="components/dashboard/recent-saves.tsx">
                    <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
                  </div>

                  <div className="flex items-center justify-between" data-unique-id="9688492e-fd9c-4522-a811-be83607f6549" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className="flex items-center gap-1" data-unique-id="a23dee67-387f-4a55-9365-38a91df0362a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      <Tags className="h-3 w-3 text-muted-foreground mr-1" />
                      {save.tags.map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="8d025141-8047-4a81-8c8b-33f2eb376963" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                          {tag}
                        </span>)}
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="f2ff77e9-59f4-4df2-b094-ac9e92321219" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      <span className="editable-text" data-unique-id="0da4a3c5-cea7-4dff-ae86-598848bd1695" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
                      {format(save.savedAt, "MMM d")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons - visible on hover */}
              <div className={`absolute right-3 top-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="205095cc-fc1f-4d59-8d16-f83632d191a5" data-file-name="components/dashboard/recent-saves.tsx">
                <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="1b88a229-429d-455b-800c-015be6b09d71" data-file-name="components/dashboard/recent-saves.tsx">
                  <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
                  <span className="sr-only" data-unique-id="54d0e54c-5bd6-43d7-80e3-893abee36db1" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="8555939c-f5b8-4f89-81c7-81d648b78374" data-file-name="components/dashboard/recent-saves.tsx">Star</span>
                  </span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="98a7eca1-ee13-49ba-aff1-90b8a9e728ec" data-file-name="components/dashboard/recent-saves.tsx">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only" data-unique-id="4f2c0360-a949-476f-be20-2bcc978c92b1" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="16311502-20e0-4409-ab45-981d1144a1f7" data-file-name="components/dashboard/recent-saves.tsx">Open</span>
                  </span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="dc858c3e-6f6a-4a45-b560-e59725299b5e" data-file-name="components/dashboard/recent-saves.tsx">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only" data-unique-id="1ef1fde5-f00a-4efc-8cda-cf82e308f19f" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="7bac5db3-b4ff-4d83-bdb7-778849ad7f10" data-file-name="components/dashboard/recent-saves.tsx">Delete</span>
                  </span>
                </Button>
              </div>
            </motion.div>)}
        </div>}
    </div>;
}