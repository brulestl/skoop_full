"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Github, Twitter, BookmarkIcon, Code as StackOverflow, MessageSquare as Reddit, Star, Tags, Trash2, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

// Enhanced sample data for recent saves with more details for bento grid
const recentSaves = [{
  id: 1,
  title: "Advanced TypeScript Patterns for Building Robust Applications",
  description: "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
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
  return <div data-unique-id="b3623911-f0c2-4ef3-979e-a1382677140a" data-file-name="components/dashboard/recent-saves.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="0eb73b3d-7ed1-411c-b874-95a0e4de5f27" data-file-name="components/dashboard/recent-saves.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="492e194e-72e9-4a2c-a384-971bba627a04" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="d5f8f9fb-f070-490c-b952-fd5eca896465" data-file-name="components/dashboard/recent-saves.tsx">Recent Saves</span></h1>
        <div className="flex items-center space-x-3" data-unique-id="07537b8f-518c-4e0c-9a7b-c23802e1dcc7" data-file-name="components/dashboard/recent-saves.tsx">
          <Button variant="outline" size="sm" data-unique-id="897dc4e6-672a-46e5-97b2-7545858b1e31" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="eefe7061-638f-4dae-9bfd-c587e5a045d5" data-file-name="components/dashboard/recent-saves.tsx">
            Filter
          </span></Button>
          <Button variant="outline" size="sm" data-unique-id="5d22fc92-2847-4f5e-ae2b-697de29e2148" data-file-name="components/dashboard/recent-saves.tsx"><span className="editable-text" data-unique-id="5193abb2-7681-4dd2-8756-dc2b0cce08dd" data-file-name="components/dashboard/recent-saves.tsx">
            Sort
          </span></Button>
        </div>
      </div>

      <BentoGrid className="auto-rows-[180px] md:auto-rows-[240px]">
        {recentSaves.map(save => <BentoCard key={save.id} name={save.title} className={save.className} background={<div className="absolute inset-0 z-0" data-unique-id="709920e0-fd4b-4ee0-8445-15f7aefdc696" data-file-name="components/dashboard/recent-saves.tsx" data-dynamic-text="true">
                {save.image && <Image src={save.image} alt={save.title} fill className="object-cover opacity-20 transition-opacity group-hover:opacity-30" data-unique-id="9cdee747-9906-41bd-a35d-afa9c0cb425a" data-file-name="components/dashboard/recent-saves.tsx" />}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" data-unique-id="e2ca839b-587b-4122-a47b-8051cb9ab84a" data-file-name="components/dashboard/recent-saves.tsx" />
              </div>} Icon={() => <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="e3c8749f-48b9-4bc6-84c1-5bf89343d7f1" data-file-name="components/dashboard/recent-saves.tsx">
                <SourceIcon source={save.source} />
              </div>} description={save.description} href={save.sourceUrl} cta="View Source" />)}
      </BentoGrid>
    </div>;
}