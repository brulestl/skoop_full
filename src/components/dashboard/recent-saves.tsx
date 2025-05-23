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
  return <div data-unique-id="562dd1e7-f892-4a92-adfe-caf5302d90e5" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="61fe0e06-bbdc-452f-9ed5-1dccf8c01424" data-file-name="components/dashboard/recent-saves.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="b4511378-b354-4e1b-9544-98c7046648bc" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="eae05ca6-1bbd-4546-a7b9-6119d101b39a" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
        <div className="flex items-center space-x-3" data-unique-id="9e2c1d95-0a63-48de-a13a-346f39e263d9" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="outline" size="sm" onClick={toggleModel} className="flex items-center" data-unique-id="c751a58a-cd3a-4a72-9ed2-bc57196b0c78" data-file-name="components/dashboard/recent-saves.tsx">
            <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
            <span data-unique-id="b1dae2ad-5df8-4910-806d-6e048f145013" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="1a8af5cb-3427-43e5-b08f-298ce9cad389" data-file-name="components/dashboard/recent-saves.tsx">AI: </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}</span>
          </Button>
          
          <div className="flex border border-border rounded-md overflow-hidden" data-unique-id="ac55584f-a1d7-4c70-bd59-e347494e4fab" data-file-name="components/dashboard/recent-saves.tsx">
            <Button variant={viewMode === 'bento' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('bento')} data-unique-id="30a7feef-58b7-4013-8ef9-b4959a762dab" data-file-name="components/dashboard/recent-saves.tsx">
              <span className="editable-text" data-unique-id="db5e5a44-614b-415c-aaae-14edcdb84e36" data-file-name="components/dashboard/recent-saves.tsx">
                Bento
              </span>
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-none" onClick={() => setViewMode('list')} data-unique-id="dc5836f7-a875-45df-a2c1-dad965aa5c5d" data-file-name="components/dashboard/recent-saves.tsx">
              <span className="editable-text" data-unique-id="38bc29b3-f255-4815-81d9-507c0355847f" data-file-name="components/dashboard/recent-saves.tsx">
                List
              </span>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'bento' ? <BentoGrid className="auto-rows-[180px] md:auto-rows-[240px]">
          {recentSaves.map(save => <BentoCard key={save.id} name={save.title} className={save.className} background={<div className="absolute inset-0 z-0" data-unique-id="0e89d270-64e2-4542-a094-a61eedfe2862" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.image && <Image src={save.image} alt={save.title} fill className="object-cover opacity-20 transition-opacity group-hover:opacity-30" data-unique-id="3e8826c8-0b0d-412b-850c-d1f953637749" data-file-name="components/dashboard/recent-saves.tsx" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" data-unique-id="5343b0de-6356-4141-a31a-c64730f3896e" data-file-name="components/dashboard/recent-saves.tsx" />
                </div>} Icon={() => <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="4105c494-cf46-4b89-938e-f0e5fd635e8f" data-file-name="components/dashboard/recent-saves.tsx">
                  <SourceIcon source={save.source} />
                </div>} description={<div className="space-y-1" data-unique-id="188386c4-ea37-4ac4-8d5e-3b370605ebcf" data-file-name="components/dashboard/recent-saves.tsx">
                  <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
                </div>} href={save.sourceUrl} cta="View Source" />)}
        </BentoGrid> : <div className="space-y-4" data-unique-id="995a94b1-3446-42a6-9aba-186b7d33399f" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
          {recentSaves.map(save => <motion.div key={save.id} className="skoop-card p-4 group relative" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }} onMouseEnter={() => setActiveItem(save.id)} onMouseLeave={() => setActiveItem(null)} data-unique-id="1e6f12b4-61aa-453f-93c0-6473ce216182" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              <div className="flex gap-4" data-unique-id="8e6d0c1a-daaa-4fdc-aac9-dbfaeb188e2a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="5ead0904-d0f4-40fb-b993-a71f612c1fec" data-file-name="components/dashboard/recent-saves.tsx">
                    <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="58ab31a2-5d3b-42f1-aed1-cd4806d2fc02" data-file-name="components/dashboard/recent-saves.tsx" />
                  </div>}
                <div className="flex-1 min-w-0" data-unique-id="e93919e6-f567-4abb-b53c-76a608931f71" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="flex items-center gap-3 mb-2" data-unique-id="b6c24ffb-5008-48d8-96a1-7618c8df6763" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="32bc1fec-484f-429a-acbe-babf54faa453" data-file-name="components/dashboard/recent-saves.tsx">
                      <SourceIcon source={save.source} />
                    </div>
                    <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="792a3c6f-9895-46bc-ba12-9b74bb94b0e3" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      {save.title}
                    </h3>
                    {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
                  </div>

                  <div className="mb-3" data-unique-id="ab6b5c8d-9112-416d-8d08-6c4458e61241" data-file-name="components/dashboard/recent-saves.tsx">
                    <AISummary title={save.title} url={save.sourceUrl} description={save.description} content={save.content} />
                  </div>

                  <div className="flex items-center justify-between" data-unique-id="e69e7078-964c-42bd-9cf4-d21b4e25019b" data-file-name="components/dashboard/recent-saves.tsx">
                    <div className="flex items-center gap-1" data-unique-id="3f302b83-026a-42eb-9a48-ee9f68aeb206" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      <Tags className="h-3 w-3 text-muted-foreground mr-1" />
                      {save.tags.map(tag => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="3e77a546-5b87-4ed9-8b85-a6782d56d753" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                          {tag}
                        </span>)}
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="be3c4363-b888-47d8-aa51-a3052c6bb3c4" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                      <span className="editable-text" data-unique-id="a7e3ed5b-b76f-4a52-b398-64728e96c27f" data-file-name="components/dashboard/recent-saves.tsx">Saved </span>
                      {format(save.savedAt, "MMM d")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons - visible on hover */}
              <div className={`absolute right-3 top-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="968a3598-7253-4564-9238-ffe5a15c6845" data-file-name="components/dashboard/recent-saves.tsx">
                <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="c991bea1-71f0-459b-80d2-8b20d22d0d2d" data-file-name="components/dashboard/recent-saves.tsx">
                  <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
                  <span className="sr-only" data-unique-id="f18fbfff-2779-40f7-a82a-3a209016e589" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="ee499826-43d5-408c-bbb4-11c8578a0cd9" data-file-name="components/dashboard/recent-saves.tsx">Star</span>
                  </span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="9ed5bcfe-ff8a-418e-9ab2-e43eea14df7a" data-file-name="components/dashboard/recent-saves.tsx">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only" data-unique-id="5416dc45-d456-411f-a454-2419114a15c7" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="c3215622-acc4-4766-976f-f41684cf3f63" data-file-name="components/dashboard/recent-saves.tsx">Open</span>
                  </span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="2f20e584-3921-4fd0-bd4d-655f217f5585" data-file-name="components/dashboard/recent-saves.tsx">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only" data-unique-id="edcede00-df0b-46ad-95eb-c0e5f2219c0b" data-file-name="components/dashboard/recent-saves.tsx">
                    <span className="editable-text" data-unique-id="7b920637-05f2-4693-b97c-717905fa69cd" data-file-name="components/dashboard/recent-saves.tsx">Delete</span>
                  </span>
                </Button>
              </div>
            </motion.div>)}
        </div>}
    </div>;
}