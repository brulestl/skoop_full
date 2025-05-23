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
  return <div className="h-screen flex flex-col" data-unique-id="f89bfaaa-647b-4331-9424-eeedd73f8282" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="450c8f6e-f481-4026-8ef2-023ea746e188" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="4150d7f5-9d18-422a-b29d-3573f642e048" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="53c513fa-55a0-493d-b89f-6d05418db4b7" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="85f721b7-bc56-4f6d-92aa-c1ded6b97002" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="6ce69b0c-8227-41cb-9f41-c4214e7836e0" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="430e6a20-495d-49d9-9f66-b4dd8879fa62" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="8d3a0f7e-f932-4199-948d-e15d879b414e" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="0af5114d-ac0e-40b5-ab66-3d0201c77a7b" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="f2c547eb-2ac4-4e6c-9768-9a470853f0a8" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="30c5fa71-d801-4307-b218-68e63e812028" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="213301a0-5d0c-4a2d-96fa-ffc4deee2ea7" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="53fe1423-3507-4b6e-8797-2c4ed5a245cc" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="505ebd58-910d-400a-96fc-60fb8ee7ff58" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="62059d19-5878-43cb-9649-46c9f59ff262" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background overflow-x-hidden", sidebarOpen ? "w-64" : "w-16")} data-unique-id="a7493389-98d9-4a1b-be54-fb740f3849df" data-file-name="components/dashboard/layout.tsx">
          <div className="flex flex-col h-full" data-unique-id="afb13153-60f8-454f-945f-da06795f1c70" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <>
                <div className="p-4" data-unique-id="4560ba6c-8a0b-4af1-a8fe-b6863e12457c" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar minimal />
                </div>

                <nav className="flex-1 px-3 py-2" data-unique-id="27bff6a5-a71b-4f80-9b82-c5072ee9f2a1" data-file-name="components/dashboard/layout.tsx">
                  <div className="mb-4" data-unique-id="536718ae-aa67-432c-9fbe-b07e61883f23" data-file-name="components/dashboard/layout.tsx">
                    <Link href="/" data-unique-id="7c6a6aff-075b-45fb-aa2c-8a28877c34b9" data-file-name="components/dashboard/layout.tsx">
                      <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="97e54b02-6e3d-4968-be4f-d531a873ce3c" data-file-name="components/dashboard/layout.tsx">
                        <Home className="h-4 w-4 mr-3" />
                        <span data-unique-id="347f6af7-e3cf-4c2a-a32d-6417a319d60c" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="c6ce7c95-e3da-4116-be87-64f5ca515f0b" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                      </div>
                    </Link>
                  </div>

                  <div className="mb-8 space-y-1" data-unique-id="7a4dbfe6-09c2-4f38-bf93-d9b8b79b49d2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="ced7d5ca-aca0-463f-9a67-0a9107c32a02" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                        <div className="flex items-center" data-unique-id="b50852d3-1389-4af1-939e-5cdf52c2599d" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span data-unique-id="1f4cd9a4-c15e-4570-a726-4672e9546c52" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                          {item.isPremium && <span className="ml-2 px-1 py-0.5 text-[0.65rem] font-medium bg-accent/20 text-accent rounded-sm" data-unique-id="eafac878-52ba-4a75-bb13-6fcf15fcbbe6" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="e63c00d2-1651-4547-b3fb-ec25d0b4e991" data-file-name="components/dashboard/layout.tsx">
                              POWER
                            </span></span>}
                        </div>
                        {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="dcc83926-b26d-4406-af2e-8606a0741476" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                            {item.count}
                          </span>}
                      </button>)}
                  </div>

                  <div className="space-y-1" data-unique-id="3ce8e7eb-51d6-4b9d-97c8-d937495ea789" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="52a08fa1-5601-4a94-bcc4-811b4eb6ede6" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="15d28bb2-f3a8-4328-8626-e8ef11604ebc" data-file-name="components/dashboard/layout.tsx">
                      Connected Services
                    </span></h3>
                    {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="925f9f86-7b14-4362-8f4e-4a81afe490dc" data-file-name="components/dashboard/layout.tsx">
                          <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="5e63d45f-e169-41e4-8ad1-1e5e69562c1b" data-file-name="components/dashboard/layout.tsx"></span>
                          <span data-unique-id="13e7dc4b-a5e2-4648-8a17-ce605ba561a2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                        </div>)}
                  </div>
                </nav>

                <div className="mt-auto p-4 border-t border-border" data-unique-id="3ecbd11e-48f7-49e3-9747-b708369febd5" data-file-name="components/dashboard/layout.tsx">
                  <Button className="w-full" variant="outline" size="sm" data-unique-id="4d00ec75-bf0d-43cb-931c-13739c0b0af7" data-file-name="components/dashboard/layout.tsx">
                    <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="2bbc096a-a847-4c9e-be21-531958d5c48a" data-file-name="components/dashboard/layout.tsx">
                    Add Connection
                  </span></Button>
                </div>
              </> :
          // Icon-only sidebar
          <div className="py-4 flex flex-col items-center" data-unique-id="0c9aec78-86d9-4e07-96e7-abbf12ce4071" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                <Link href="/" data-unique-id="1f117e4a-30b9-4015-89aa-1cdf60265477" data-file-name="components/dashboard/layout.tsx">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-8" data-unique-id="d35fa638-d94d-4f8a-b9ff-911dd3421d8e" data-file-name="components/dashboard/layout.tsx">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                </Link>
                
                {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")} title={item.name} data-unique-id="e7666b2e-21aa-486f-a632-53c72bc7c415" data-file-name="components/dashboard/layout.tsx">
                    <item.icon className="h-5 w-5" />
                  </button>)}
              </div>}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="c44bcd16-6f07-472c-ac97-28a294ac9b0f" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="5fe917e1-2d8b-4b87-99a0-ca4e01941992" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="727be32b-9f17-4dcf-bfac-e84a177d0001" data-file-name="components/dashboard/layout.tsx">
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