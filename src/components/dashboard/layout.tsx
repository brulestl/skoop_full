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
  return <div className="h-screen flex flex-col" data-unique-id="25255302-c8c8-4e53-8de2-92416512264a" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="e353b8f4-3f22-4be8-8f3e-779810d135c6" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="51e8cdfb-7db1-4a20-8dfd-06e2453fc83e" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="9b88b627-0bc1-42d3-ae17-0277dc1691d9" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="08a05814-8198-4d04-913c-23467d9b33ee" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="3522445f-02c5-42af-9b05-bd47e369c003" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="78b77a37-8e70-40d6-bbde-5232c0f00485" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="25b2ea9e-ec6f-4915-a271-405e97b21916" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9543c8d9-4e87-4b6b-a869-d6561e988421" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="a769d7c4-46ad-4a27-9d8b-4f58d52ce1f8" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="20233c3f-69ac-4062-aa91-8fd781f29fe2" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="57b443cc-f6c8-4ca0-9273-66c9d7a9fd5c" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="7f8c0be6-f8db-471f-a6a0-9c645702e3f3" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="16e048b7-e2d8-495f-a27a-25a6a9603116" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="eec7aeea-44f8-4ad7-952a-582eae1e709e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="6dd58e32-7d2b-489a-871c-ca5ab44df9f5" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="8d8038f2-8f90-4e43-94d6-dec0b22472b0" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="3c8d078f-8609-44bd-a149-0e3d96ac72df" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="3e559ab3-bb8d-40d9-9378-18ee9c5aa3a6" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="fdf4b81c-e5ce-4cec-9dde-ac942ac1350a" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="105b2f9f-18b3-45ce-b135-1eeee402f4d4" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="8ad643eb-0b8b-4a67-a906-142139569cd1" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="f2e9433b-a8c8-4e10-8153-52e4b5744362" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="a102a4b9-3403-4f9e-8375-4e29d1a84c6b" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="f694bb15-5d38-433b-9584-59ae066c0378" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="c7c98872-14cf-485a-8ea6-0bf59e59e89f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="c03a521e-e43c-43f2-9ee1-ad7a771e5210" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="ff94b4a3-d75d-444d-8dfd-bc5d57679056" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="a3e06a66-94ce-4f29-a45f-fcf751cec9d5" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="4e185053-6dae-4337-83d5-ec9bf9e28766" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="33d36b98-54cf-494c-b1e6-8321328be6b7" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="a5e5f6c0-a8be-4107-9954-08ebab71dec1" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="546bf92b-3f68-4b41-b4ae-d2891a46282f" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="cd45c6f2-edf7-4395-aefc-bd1339852be0" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="984c2ed5-e86d-4aa1-b4b8-0e980a273932" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="31dc13eb-a508-4136-9a58-6749fe9be7a6" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="fe462ec3-bed6-4534-9607-5d27e7d994a8" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="4b857753-1f50-44ff-9664-09f2283f46ed" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="18414697-2900-46e1-ad67-55848a8b050b" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="cf3528ef-4d36-4a28-a362-cbdd3d3c606f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="mb-8" data-unique-id="3aef9c1d-61c1-44a7-a463-7525b40fcaf0" data-file-name="components/dashboard/layout.tsx">
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