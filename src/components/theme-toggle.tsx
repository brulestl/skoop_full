"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }, []);
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  if (!theme) return null;
  return <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-unique-id="43cbd6a0-c752-462b-81e3-cf0241c9a9dd" data-file-name="components/theme-toggle.tsx" data-dynamic-text="true">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only" data-unique-id="0605e017-172b-44d7-ba00-3f65db83eedd" data-file-name="components/theme-toggle.tsx"><span className="editable-text" data-unique-id="ccef313f-07fd-4c8a-8aa6-3372cac9cc7e" data-file-name="components/theme-toggle.tsx">Toggle theme</span></span>
    </Button>;
}