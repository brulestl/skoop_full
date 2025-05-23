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
  return <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-unique-id="12775dfa-ac76-4d13-9bf3-8e880bf55626" data-file-name="components/theme-toggle.tsx" data-dynamic-text="true">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only" data-unique-id="b4219f69-2c13-4c34-8904-606e5b2fe87e" data-file-name="components/theme-toggle.tsx"><span className="editable-text" data-unique-id="65d7d375-e0e3-4bf2-8bc5-942dc3bc6774" data-file-name="components/theme-toggle.tsx">Toggle theme</span></span>
    </Button>;
}