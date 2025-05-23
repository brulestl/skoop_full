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
  return <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-unique-id="f7bf2987-2725-42a4-b12d-30c3f12a5956" data-file-name="components/theme-toggle.tsx" data-dynamic-text="true">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only" data-unique-id="ef35a6ab-c376-42dc-b939-cd0112a1de94" data-file-name="components/theme-toggle.tsx"><span className="editable-text" data-unique-id="636384c0-1348-4618-a258-689d6ebdc307" data-file-name="components/theme-toggle.tsx">Toggle theme</span></span>
    </Button>;
}