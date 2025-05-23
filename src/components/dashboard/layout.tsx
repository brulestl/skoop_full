"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, BookmarkIcon, FolderIcon, Settings, User, Menu, X, ChevronRight, LogOut, Home, Plus, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "@/components/dashboard/search-bar";
import RecentSaves from "@/components/dashboard/recent-saves";
import Collections from "@/components/dashboard/collections";
import SkoopContent from "@/components/dashboard/skoop-content";
import Profile from "@/components/dashboard/profile";
import DashboardSettings from "@/components/dashboard/settings";
type Tab = "recent" | "collections" | "skoopcontent" | "profile" | "settings";
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
    name: "Skoop Content",
    id: "skoopcontent" as Tab,
    icon: Layout,
    isPremium: true
  }, {
    name: "Profile",
    id: "profile" as Tab,
    icon: User
  }, {
    name: "Settings",
    id: "settings" as Tab,
    icon: Settings
  }];
  return <div className="h-screen flex flex-col" data-unique-id="8be64568-6a71-4fcd-96ed-9026cbb0209e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="05af4580-c190-41a2-9df5-ee85130b53e2" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="3a0bcce8-c6a4-4b22-bcff-cc2afe1a488c" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="39e20d59-e53c-4416-9e31-708bc27047fb" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="70d56a74-15f8-4148-883b-2f123bf422c9" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="e7932a4f-f465-4cba-8dc9-80d73dc8c2bc" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="62e03e54-4a01-46d5-a3aa-77e94e49f6fe" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="c917cc64-18d3-4fc3-bda3-f579e792866d" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="404d9803-e5aa-4558-974c-5b4da5ad3eea" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="ef8dc9ae-80de-411a-b5a0-cb1e7e6f4116" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="e78e0d9e-fe16-4f8c-b4c7-ad626bda6de0" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="9a7a08ab-22be-4b84-8eae-ebf41e45e406" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="426558c0-21dc-440f-a55e-4985b6570b9e" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1c1b8d15-d4a6-4d3f-9158-008552aa0738" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="880c419b-56b0-40f9-a6d6-45285cf2fd85" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="8e894308-99ed-4c25-bba2-d24aef7412da" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="ed207d21-990e-41e1-a2b0-fc2c735d7779" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="8ab93c1e-ece4-4e60-bc09-9afecfc63be4" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="abd3d7fd-c49b-425b-93f7-902793d4b3db" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="173d65cc-fcc8-4116-bf3e-ee6e953f2072" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="860b77df-14a1-4b5c-92ca-507063bf0ee5" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="bdff372d-12e7-4eb8-92ed-44bfd93c0216" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="77c4159e-eb32-4f28-8b79-f4905619fbb3" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="21355fb3-fabe-41cc-90b0-8152f605bd11" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="6c13c151-ffa9-45e8-ba89-bc552beaf061" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="1ee7df0b-547c-4355-bd4a-9994d64f1898" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="dfc286b6-e4f8-40c5-a784-0d31a5dc4c7d" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="626c54af-e499-44c4-a072-e419b2fa4c66" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                        {item.isPremium && <span className="ml-2 px-1 py-0.5 text-[0.65rem] font-medium bg-accent/20 text-accent rounded-sm" data-unique-id="319c6811-dacb-4b99-aa6c-121d6c4ba720" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="01281134-44b4-4137-bc70-a2033d178878" data-file-name="components/dashboard/layout.tsx">
                            POWER
                          </span></span>}
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="6a478cd1-06ac-4c47-9981-56af78472049" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="6e071cb5-5093-4f29-8da2-0ee7c7ea591b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="5e18a18d-e223-4771-9462-8815e7187f3e" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="d1d6f03d-2a5a-4d6c-b6a7-ba9488a8c6db" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="e3617cdb-5fbb-499c-8d26-5e775245c55f" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="ad767740-d5b9-4f2d-a6e0-e22c90b1b521" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="f7939eac-dd2d-4b21-bfe9-29cb0e6d3a1e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="863a2f1a-c58f-49dc-9cee-10099b30107b" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="faddf6ae-c196-4f49-b9e5-ec070b2ace47" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="3f6a13e9-db29-4a82-9a4c-aa9d47009df5" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="d7d5d9aa-184b-4043-8c39-33efa44bbc94" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="c63f408b-c66b-4e60-9536-8e3246b26b54" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="b06fd2e6-e2c4-4b50-b387-6bccd235cad7" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar />
                </div>
                <RecentSaves />
              </>}
            
            {activeTab === "collections" && <Collections />}
            
            {activeTab === "skoopcontent" && <SkoopContent />}
            
            {activeTab === "profile" && <Profile />}
            
            {activeTab === "settings" && <DashboardSettings />}
          </div>
        </main>
      </div>
    </div>;
}