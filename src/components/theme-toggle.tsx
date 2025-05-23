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
  return <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-unique-id="9279e997-6428-4a66-81dc-0058de4ad84b" data-file-name="components/theme-toggle.tsx" data-dynamic-text="true">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only" data-unique-id="703745af-aee6-4def-99bb-dd6fa9bd713c" data-file-name="components/theme-toggle.tsx"><span className="editable-text" data-unique-id="3941f444-86ab-4527-83f1-7d53e58cd3b3" data-file-name="components/theme-toggle.tsx">Toggle theme</span></span>
    </Button>;
}