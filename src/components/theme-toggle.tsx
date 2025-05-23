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
  return <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-unique-id="bf65563d-0fac-4f68-ae7d-4e41374ba533" data-file-name="components/theme-toggle.tsx" data-dynamic-text="true">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only" data-unique-id="142b848b-bf57-429c-9e86-05b0742aa334" data-file-name="components/theme-toggle.tsx"><span className="editable-text" data-unique-id="861ec1b0-7554-4d00-a1e8-648a651e189c" data-file-name="components/theme-toggle.tsx">Toggle theme</span></span>
    </Button>;
}