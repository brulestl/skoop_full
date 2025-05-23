"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
interface SearchBarProps {
  minimal?: boolean;
}
export default function SearchBar({
  minimal = false
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  return <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="c1c8b50a-cc5b-4bb4-99c3-9543db1f84bd" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
      <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="a5858351-5303-4c57-9f17-fd7286e1f2db" data-file-name="components/dashboard/search-bar.tsx">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <input type="text" placeholder="Search across all your saved content..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} data-unique-id="2bba202e-b89b-453d-94cc-a52ef9bc2a7e" data-file-name="components/dashboard/search-bar.tsx" />
      </div>
      {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="7b2998aa-62e8-4f4c-8282-49c9b25e7329" data-file-name="components/dashboard/search-bar.tsx">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="b750fb05-0157-46b2-84c1-30a8a3e674fc" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="af33b005-dfc5-42a8-8c98-4bcb86d360ea" data-file-name="components/dashboard/search-bar.tsx">
            ⌘K
          </span></kbd>
        </div>}
    </div>;
}