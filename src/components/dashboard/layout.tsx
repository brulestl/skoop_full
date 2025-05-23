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
  return <div className="h-screen flex flex-col" data-unique-id="c24e166e-64e7-4051-862e-73ab7b1b20e3" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="455b55cd-89af-45df-b4cc-7d521781dbcc" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="36b2eace-52ba-40b9-b0d9-f494f5604e09" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="571ae65b-ac02-48dd-8c45-192aeb702972" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="0bb0325e-2992-4324-b99d-85bff5d9761f" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="a8ccfb99-f1f7-4206-8bcc-fb1941d8e702" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="b103d7d6-0de5-4b88-aa06-829ece8cbab9" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="49390367-9c44-4e87-bf8f-b0b51043b8c7" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="3b28d379-59a7-4670-bcbe-3de23e7588fd" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="876f0bc5-375e-4acd-816d-9d3e09516cae" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="74b4ec2a-8be3-4987-966e-6e0258236ae2" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="96bbc0e0-0195-4039-98a6-2dd28bd203ee" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="13ff7a5f-58fc-476f-a437-27a4592b91b0" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="9a9abcca-e895-4727-81bd-f91ff7b93e80" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="2aa6aa0f-87b4-493f-88a6-546c4fbc0dd8" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background overflow-x-hidden", sidebarOpen ? "w-64" : "w-16")} data-unique-id="2e03a116-6e2a-45ae-b9a6-497d6a790716" data-file-name="components/dashboard/layout.tsx">
          <div className="flex flex-col h-full" data-unique-id="20250feb-a355-4dba-8328-163e4c297065" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <>
                <div className="p-4" data-unique-id="8b2d7d93-7f7e-400a-a7b8-e27ac7b879f1" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar minimal />
                </div>

                <nav className="flex-1 px-3 py-2" data-unique-id="61ebae03-84d0-49c6-acc1-2e00066b5c4f" data-file-name="components/dashboard/layout.tsx">
                  <div className="mb-4" data-unique-id="86cb2da6-69da-462a-ae3b-10d35fcddec3" data-file-name="components/dashboard/layout.tsx">
                    <Link href="/" data-unique-id="ac5a9137-62d8-46e5-9fd7-0b5b4fd24428" data-file-name="components/dashboard/layout.tsx">
                      <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="df85c209-5194-4dfb-a026-a91d850e308c" data-file-name="components/dashboard/layout.tsx">
                        <Home className="h-4 w-4 mr-3" />
                        <span data-unique-id="9fec6e55-f21e-47db-9f2e-b592bdf36003" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="6c935f71-31a9-431d-b9b0-7c0abb141165" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                      </div>
                    </Link>
                  </div>

                  <div className="mb-8 space-y-1" data-unique-id="fcf90772-45d6-4fdc-9ec5-17250f33ce86" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="8d2e1f1c-3393-4170-831d-bdbc11da1f81" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                        <div className="flex items-center" data-unique-id="ba2bec5d-10c9-4bc5-91dd-54274448bcec" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span data-unique-id="21bf6814-ae20-4b63-a6cb-58439b5cdd9c" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                          {item.isPremium && <span className="ml-2 px-1 py-0.5 text-[0.65rem] font-medium bg-accent/20 text-accent rounded-sm" data-unique-id="4d161ebb-4ef1-43f1-a61d-b4a90cf3b437" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9644f26b-c54d-43ba-9e8f-e11e4b0633df" data-file-name="components/dashboard/layout.tsx">
                              POWER
                            </span></span>}
                        </div>
                        {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="6dc1ec51-928c-47ab-839c-161c6ffebcca" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                            {item.count}
                          </span>}
                      </button>)}
                  </div>

                  <div className="space-y-1" data-unique-id="e73cd60d-01c7-4b20-986e-e3f2bba8d56e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="0e2fd4af-1555-4cfd-ab27-24514d9c5b09" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="0cdc3067-5c63-4ea8-b953-c01951df3de3" data-file-name="components/dashboard/layout.tsx">
                      Connected Services
                    </span></h3>
                    {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="3ca92ce0-f7bb-4dff-8b96-7f63af939254" data-file-name="components/dashboard/layout.tsx">
                          <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="822d5603-869f-4ae1-a646-e2025c82ec21" data-file-name="components/dashboard/layout.tsx"></span>
                          <span data-unique-id="ef7a7237-523b-4e22-941c-bc68722b0191" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                        </div>)}
                  </div>
                </nav>

                <div className="mt-auto p-4 border-t border-border" data-unique-id="8550c39f-c7b4-47ef-8b9a-dd5bc0604720" data-file-name="components/dashboard/layout.tsx">
                  <Button className="w-full" variant="outline" size="sm" data-unique-id="eaf77016-2988-4e1e-ac38-bc9d944315cf" data-file-name="components/dashboard/layout.tsx">
                    <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="993367b5-6dbc-460b-b7ac-499974f1c539" data-file-name="components/dashboard/layout.tsx">
                    Add Connection
                  </span></Button>
                </div>
              </> :
          // Icon-only sidebar
          <div className="py-4 flex flex-col items-center" data-unique-id="5e3f1ef6-93b8-45cf-8386-412fbd7c6ba2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                <Link href="/" data-unique-id="f2345108-0335-4ccb-b080-9602362c0062" data-file-name="components/dashboard/layout.tsx">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-8" data-unique-id="567dbe81-45f3-4810-84c2-5a2f6e373431" data-file-name="components/dashboard/layout.tsx">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                </Link>
                
                {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")} title={item.name} data-unique-id="88d9a57b-3878-4480-a887-1508af9bb096" data-file-name="components/dashboard/layout.tsx">
                    <item.icon className="h-5 w-5" />
                  </button>)}
              </div>}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="4093f9a2-5172-47ec-be9f-ce1453c758eb" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="88c4e8dc-52fc-485a-b4ed-ba5b57cfd44b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="80b95eb7-b712-408b-b051-e8a386b5417e" data-file-name="components/dashboard/layout.tsx">
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