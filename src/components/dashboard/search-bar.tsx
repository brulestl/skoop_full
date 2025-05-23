"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  minimal?: boolean;
}

export default function SearchBar({ minimal = false }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative",
        minimal ? "w-full" : "max-w-2xl mx-auto w-full"
      )}
    >
      <div
        className={cn(
          "flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all",
          focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "",
          minimal ? "" : "shadow-sm"
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search across all your saved content..."
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {!minimal && (
        <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono">
            ⌘K
          </kbd>
        </div>
      )}
    </div>
  );
}
