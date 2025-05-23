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
  return <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="68f721f4-a5dd-42ef-8072-27f7cdc08dde" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
      <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="fe655184-4a2a-469c-abf7-2dfa4d6b82db" data-file-name="components/dashboard/search-bar.tsx">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <input type="text" placeholder="Search across all your saved content..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} data-unique-id="0161f04e-6bd8-4b2e-ab4e-cec1c00d67cb" data-file-name="components/dashboard/search-bar.tsx" />
      </div>
      {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="6a80bd25-daba-4a98-a4c3-7c810fd1c537" data-file-name="components/dashboard/search-bar.tsx">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="d4cae3fc-7d9a-43f7-904e-a4be62c7042f" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="8dfc23a6-87ef-4360-8d1f-4566665c6294" data-file-name="components/dashboard/search-bar.tsx">
            ⌘K
          </span></kbd>
        </div>}
    </div>;
}