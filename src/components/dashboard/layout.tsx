"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, BookmarkIcon, FolderIcon, Settings, User, Menu, X, ChevronRight, LogOut, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "@/components/dashboard/search-bar";
import RecentSaves from "@/components/dashboard/recent-saves";
import Collections from "@/components/dashboard/collections";
import Profile from "@/components/dashboard/profile";
import DashboardSettings from "@/components/dashboard/settings";
type Tab = "recent" | "collections" | "profile" | "settings";
export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("recent");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const navigationItems = [{
    name: "Recent Saves",
    id: "recent" as Tab,
    icon: BookmarkIcon,
    count: 124
  }, {
    name: "Collections",
    id: "collections" as Tab,
    icon: FolderIcon,
    count: 15
  }, {
    name: "Profile",
    id: "profile" as Tab,
    icon: User
  }, {
    name: "Settings",
    id: "settings" as Tab,
    icon: Settings
  }];
  return <div className="h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only"><span className="editable-text">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg text-primary mr-2"><span className="editable-text">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground"><span className="editable-text">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button size="sm" variant="outline">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")}>
          {sidebarOpen && <div className="flex flex-col h-full">
              <div className="p-4">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2">
                <div className="mb-4">
                  <Link href="/">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                      <Home className="h-4 w-4 mr-3" />
                      <span><span className="editable-text">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")}>
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5"><span className="editable-text">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3"></span>
                        <span>{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border">
                <Button className="w-full" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {activeTab === "recent" && <>
                <div className="mb-8">
                  <SearchBar />
                </div>
                <RecentSaves />
              </>}
            
            {activeTab === "collections" && <Collections />}
            
            {activeTab === "profile" && <Profile />}
            
            {activeTab === "settings" && <DashboardSettings />}
          </div>
        </main>
      </div>
    </div>;
}