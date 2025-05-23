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
  return <div className="h-screen flex flex-col" data-unique-id="93c76e1e-e30e-4ed4-ba74-8cd574bda91d" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="441a0a4f-c460-46e7-88cd-1a941430c1ce" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="406e5c44-5fe2-4980-8d2a-a49e6d85ee8c" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="e85794e5-81e1-4b84-95f6-a2b1313dc8e6" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="e102424a-3880-4366-8fd7-8475a64ab622" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9575f9af-230f-4d35-b6ad-0d24e6871b8e" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="8d0969bf-f7cb-498d-aa25-3e53ebdd087b" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="76c62d46-932d-4585-8c70-cca62c1e7cbc" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="61352416-9e62-478b-8b30-7a375206873f" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="3066c772-7d63-4798-a5a9-c2aa2f73440f" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="0860b961-9e32-425c-afed-9e66473ed521" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="d9420fd8-9bd1-43df-aa91-1e58f21f7c4b" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="ac265a02-f417-4b26-8434-b921f6035d7d" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="a99ddd24-c9b9-4640-94cf-25d33a9ebef9" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="436327bf-a3bd-47dc-be45-372889be2b18" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="7a4f721c-124e-4dc8-a092-1ee7b6200fd2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="4421ae90-38e1-4533-90d2-c83752aafed7" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="c286dbec-a394-4f06-b13e-005c597f628f" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="880b7be9-8ad4-4cbd-bcd2-14590d1f6a6c" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="7a0fc062-adfe-490c-9e60-24c336c9a8be" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="6edc8d1b-8f47-4862-89a5-7e373dae6f33" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="4bbcbcba-963b-46c8-9df4-611b5a034ba7" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="f07306db-37a3-4ef2-b693-14a6beb3d37d" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="655b9ee6-b98d-48a4-a81c-5bcb4620a970" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="efc0d176-8b5e-42c8-9751-a4f5908bfe59" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="0eed3e71-c39e-4e18-b102-417365af8213" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="01174f1b-49e4-4b11-88b6-ecc9a503175b" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="af460d83-af07-4c5f-86fc-4469988b62f8" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="61541a87-40d0-462a-bac9-0d52514faa61" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="51143093-eaa6-456f-8105-d9fdfb2141cd" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="ba844c53-3450-4b75-b0e1-2f4148f7fc9f" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="71903e38-5148-411a-8530-5b0f2300a65f" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="66db3421-9ef9-4e40-83d9-069404d5d11d" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="d0154d98-f112-4751-819a-dd89a0316c87" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="2bbca377-35c7-48f5-ad15-b6b2996af601" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="1cd1b9ab-ec42-487d-8fbf-fb1bea13a0f3" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="259625c3-01aa-4921-9629-74ea4a1a634e" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="d5e78926-28d5-4e5c-8104-a5e74a9c4866" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="3650b783-898b-4c40-927f-f6547b24ed24" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="52380758-65ff-48bd-bfb3-292f1fd4dda9" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="mb-8" data-unique-id="4327a7b1-5a75-48fb-8800-7b8c3163f460" data-file-name="components/dashboard/layout.tsx">
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