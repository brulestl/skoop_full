"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Github, Twitter, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, MoreHorizontal, Star, Tags, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for recent saves
const recentSaves = [{
  id: 1,
  title: "Advanced TypeScript Patterns for Building Robust Applications",
  description: "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
  source: "github",
  sourceUrl: "https://github.com/microsoft/TypeScript",
  savedAt: new Date(2023, 4, 18),
  tags: ["typescript", "programming", "web-development"],
  starred: true
}, {
  id: 2,
  title: "Thread: 10 tips for better React performance in 2023",
  description: "Must-read performance tips for React in 2023, focusing on useMemo, useCallback and React 18's new concurrent features.",
  source: "twitter",
  sourceUrl: "https://twitter.com/dan_abramov/status/1234567890",
  savedAt: new Date(2023, 4, 16),
  tags: ["react", "javascript", "performance"],
  starred: false
}, {
  id: 3,
  title: "How to optimize PostgreSQL queries for large datasets",
  description: "Comprehensive guide to optimizing PostgreSQL queries for large datasets, covering indexes, query planning, and configuration tweaks.",
  source: "stackoverflow",
  sourceUrl: "https://stackoverflow.com/questions/12345678",
  savedAt: new Date(2023, 4, 15),
  tags: ["postgresql", "database", "performance"],
  starred: true
}, {
  id: 4,
  title: "Designing beautiful and accessible UI components from scratch",
  description: "A detailed walkthrough of building UI components that are both visually stunning and fully accessible.",
  source: "reddit",
  sourceUrl: "https://reddit.com/r/webdev/comments/12345",
  savedAt: new Date(2023, 4, 12),
  tags: ["ui", "design", "accessibility"],
  starred: false
}, {
  id: 5,
  title: "Next.js App Router deep dive: Server Components explained",
  description: "Everything you need to know about Server Components in Next.js App Router and how they change React development.",
  source: "github",
  sourceUrl: "https://github.com/vercel/next.js",
  savedAt: new Date(2023, 4, 10),
  tags: ["nextjs", "react", "server-components"],
  starred: false,
  image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop"
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
  return <div data-unique-id="0278947a-100d-4538-8b89-8ff986fb7987" data-file-name="components/dashboard/recent-saves.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="754cb5a4-1e6a-4224-adab-5848347a38b2" data-file-name="components/dashboard/recent-saves.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="7cc4f670-20d4-40d7-8076-0db2c75727a4" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="180282b9-961a-42aa-853d-1699bd1eac8d" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
        <div className="flex items-center space-x-3" data-unique-id="41b7e50d-1e84-49fc-b245-7ee5d431db73" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="outline" size="sm" data-unique-id="b1bc0672-b9d2-4fc6-bee3-ffb8431042a7" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5b88f32f-509d-4ed7-919a-d6d429f38058" data-file-name="components/dashboard/recent-saves.tsx">
            Filter
          </span></Button>
          <Button variant="outline" size="sm" data-unique-id="c5377db0-20ed-4617-be9d-44e2fc386df5" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d45c1c56-672e-478e-b1ac-746a850676a0" data-file-name="components/dashboard/recent-saves.tsx">
            Sort
          </span></Button>
        </div>
      </div>

      <div className="space-y-4" data-unique-id="00aac383-9d72-4522-8980-c6b7765f72a0" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
        {recentSaves.map(save => <motion.div key={save.id} className="skoop-card p-4 group relative" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }} onMouseEnter={() => setActiveItem(save.id)} onMouseLeave={() => setActiveItem(null)} data-unique-id="56a726c9-4580-417a-bb06-ec97203ca4ea" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
            <div className="flex gap-4" data-unique-id="c3c89c7e-39d5-4d65-9c3b-7a306ddb5b47" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
              {save.image && <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0" data-unique-id="4fd49429-8ced-48a8-8236-96adcccd4c0f" data-file-name="components/dashboard/recent-saves.tsx">
                  <Image src={save.image} width={128} height={80} alt="" className="w-full h-full object-cover" data-unique-id="f9e5099c-d194-4605-92f1-4b28a60fc7a9" data-file-name="components/dashboard/recent-saves.tsx" />
                </div>}
              <div className="flex-1 min-w-0" data-unique-id="840ee715-3640-4afc-b2c9-f37da3925c52" data-file-name="components/dashboard/recent-saves.tsx">
                <div className="flex items-center gap-3 mb-2" data-unique-id="51d1c86e-1800-45a5-959f-abee7adde60a" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="89894e38-5e4a-41c2-8d22-b4be68d26c92" data-file-name="components/dashboard/recent-saves.tsx">
                    <SourceIcon source={save.source} />
                  </div>
                  <h3 className="font-medium text-foreground line-clamp-1" data-unique-id="ff9f7f56-1278-4d5b-a909-5e9931ab4939" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    {save.title}
                  </h3>
                  {save.starred && <Star className="h-4 w-4 fill-accent text-accent" />}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-unique-id="cdb0b8e2-a3b0-46f3-94ea-e373645f5f78" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                  {save.description}
                </p>

                <div className="flex items-center justify-between" data-unique-id="608dc614-6286-4922-b539-aba57e93ac2a" data-file-name="components/dashboard/recent-saves.tsx">
                  <div className="flex items-center gap-1" data-unique-id="eb16cf7a-752a-4571-b88d-bac356351564" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                    <Tags className="h-3 w-3 text-muted-foreground mr-1" />
                    {save.tags.map((tag, i) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1" data-unique-id="00b9b54a-2463-4d6c-9599-cd72f4c343f7" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                        {tag}
                      </span>)}
                  </div>
                  <span className="text-xs text-muted-foreground" data-unique-id="c8c370fc-d5c8-4ad6-9c9e-6739e954a0af" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ac414a2f-6c42-4ce2-88a4-befc01f1276f" data-file-name="components/dashboard/recent-saves.tsx">
                    Saved </span>{format(save.savedAt, "MMM d")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons - visible on hover */}
            <div className={`absolute right-3 top-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`} data-unique-id="b878c8ad-9b4e-4712-bc55-398bb0c9f10c" data-file-name="components/dashboard/recent-saves.tsx">
              <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="04858cf4-e79f-43b3-972d-a9c8e12a0a42" data-file-name="components/dashboard/recent-saves.tsx">
                <Star className={cn("h-4 w-4", save.starred && "fill-accent text-accent")} />
                <span className="sr-only" data-unique-id="e79440d0-d36c-4a68-9b5a-80529016f1c1" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="68d745cd-180f-4eb3-b04d-6ce26c0ec5b8" data-file-name="components/dashboard/recent-saves.tsx">Star</span></span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" data-unique-id="620e7d72-917b-48bf-ba47-b23fbca9021e" data-file-name="components/dashboard/recent-saves.tsx">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only" data-unique-id="672e53a9-0889-427d-a582-42da37681c71" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="81f9c282-225e-4828-97ca-6d792901d407" data-file-name="components/dashboard/recent-saves.tsx">Open</span></span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" data-unique-id="f0463640-5ae9-4610-9231-82843ef589ef" data-file-name="components/dashboard/recent-saves.tsx">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only" data-unique-id="97554d30-074e-4db0-9607-a1648486645e" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="80add758-c491-48ae-a849-814e18b9f698" data-file-name="components/dashboard/recent-saves.tsx">Delete</span></span>
              </Button>
            </div>
          </motion.div>)}
      </div>
    </div>;
}