"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  BookmarkIcon,
  Code as StackOverflow,
  MessageSquare as Reddit,
  MoreHorizontal,
  Star,
  Tags,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for recent saves
const recentSaves = [
  {
    id: 1,
    title: "Advanced TypeScript Patterns for Building Robust Applications",
    description:
      "Learn advanced TypeScript patterns like discriminated unions, branded types, and conditional types to build more robust applications.",
    source: "github",
    sourceUrl: "https://github.com/microsoft/TypeScript",
    savedAt: new Date(2023, 4, 18),
    tags: ["typescript", "programming", "web-development"],
    starred: true,
  },
  {
    id: 2,
    title: "Thread: 10 tips for better React performance in 2023",
    description:
      "Must-read performance tips for React in 2023, focusing on useMemo, useCallback and React 18's new concurrent features.",
    source: "twitter",
    sourceUrl: "https://twitter.com/dan_abramov/status/1234567890",
    savedAt: new Date(2023, 4, 16),
    tags: ["react", "javascript", "performance"],
    starred: false,
  },
  {
    id: 3,
    title: "How to optimize PostgreSQL queries for large datasets",
    description:
      "Comprehensive guide to optimizing PostgreSQL queries for large datasets, covering indexes, query planning, and configuration tweaks.",
    source: "stackoverflow",
    sourceUrl: "https://stackoverflow.com/questions/12345678",
    savedAt: new Date(2023, 4, 15),
    tags: ["postgresql", "database", "performance"],
    starred: true,
  },
  {
    id: 4,
    title: "Designing beautiful and accessible UI components from scratch",
    description:
      "A detailed walkthrough of building UI components that are both visually stunning and fully accessible.",
    source: "reddit",
    sourceUrl: "https://reddit.com/r/webdev/comments/12345",
    savedAt: new Date(2023, 4, 12),
    tags: ["ui", "design", "accessibility"],
    starred: false,
  },
  {
    id: 5,
    title: "Next.js App Router deep dive: Server Components explained",
    description:
      "Everything you need to know about Server Components in Next.js App Router and how they change React development.",
    source: "github",
    sourceUrl: "https://github.com/vercel/next.js",
    savedAt: new Date(2023, 4, 10),
    tags: ["nextjs", "react", "server-components"],
    starred: false,
    image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=500&auto=format&fit=crop",
  }
];

// Source icon mapping
const SourceIcon = ({ source }: { source: string }) => {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Recent Saves</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {recentSaves.map((save) => (
          <motion.div
            key={save.id}
            className="skoop-card p-4 group relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setActiveItem(save.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div className="flex gap-4">
              {save.image && (
                <div className="hidden md:block w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={save.image}
                    width={128}
                    height={80}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                    <SourceIcon source={save.source} />
                  </div>
                  <h3 className="font-medium text-foreground line-clamp-1">
                    {save.title}
                  </h3>
                  {save.starred && (
                    <Star className="h-4 w-4 fill-accent text-accent" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {save.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Tags className="h-3 w-3 text-muted-foreground mr-1" />
                    {save.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Saved {format(save.savedAt, "MMM d")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons - visible on hover */}
            <div
              className={`absolute right-3 top-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Star
                  className={cn(
                    "h-4 w-4",
                    save.starred && "fill-accent text-accent"
                  )}
                />
                <span className="sr-only">Star</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
