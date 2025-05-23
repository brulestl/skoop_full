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
  return <div className="h-screen flex flex-col" data-unique-id="d0661801-99a3-4ed3-b0d7-3fc20ab18ee2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="e7ab4615-9be9-4fee-948e-083566d5a297" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="e83745ce-0683-4b93-ade5-28e1932ec86c" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="e8fd70e9-a3db-447f-a0da-84151dbbf03e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="300522fd-4e8f-47bd-bbe3-958a28683f96" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="0e2aafb1-1d21-4168-b41c-e965c88ca63c" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="2311bca1-f69b-4598-9aa8-f217b8c88219" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="5391813a-f33c-4cf3-9ace-ef27ddda9fda" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="ecd727b9-199c-4886-b141-a76d2c4fa16f" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="7a5b594b-a965-43ce-ac28-c9a69d5ffd81" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="d33594b4-6a88-4d2e-9591-758812740704" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="57e6accb-a782-4487-8253-9bedc4a939d8" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="2db303ff-9087-4292-b683-917db13cd4f9" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="dc481ee2-f047-4a0d-922b-eabf32da3f8e" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="773fae64-104b-45b0-aff8-401f902addc0" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="f1b52ad8-a3b0-44c3-90dd-3602bf5d0aa1" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="7a94b590-5339-448c-9aaf-72bc034908dd" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="63f29d1c-c187-4338-a510-933cede1acb7" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="ff166cae-d52f-4dd5-bcc9-802dda5b1868" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="b493da73-9c3b-470d-b157-368d43fca50a" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="f8de75d7-a461-40be-b82e-cd1bd770553e" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="eca5257d-e042-49b2-a636-b362ebf1a19c" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="50092c38-babe-4f23-bf9c-d9b9ec0ab9cb" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="d0d50880-3cb6-4e5f-b3c6-d8cfb3957b18" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="2f81ba07-f538-429d-a796-39b3243f7a39" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="550174c7-ac34-4e82-8e43-ee5925c5053f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="a1c5a660-c68a-4283-8ffd-30999514de5c" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="0bd76bb1-29d0-4401-8908-50608faea498" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="ce8f882c-f003-4fc7-bbc0-aa632d1d1689" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="2eac87eb-6ad5-4f16-9a45-7c29d829a42a" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="413716ef-1e61-4abb-8420-6a9c59ee2388" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="c7600618-c483-4f00-a15d-d7159a9e08e0" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="5a2160f0-ad62-4a34-bd9c-5ce5b4297f4a" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="acd5616a-02bb-47e7-afc7-a3468b78eef1" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="f6ef8cd2-a4a1-4419-9130-06fe0626ad05" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="86397a38-d5a7-41d3-91d5-492e375d9902" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="6ec31859-ae79-4e8c-97ea-f3a842ef9c03" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c8a6f502-1080-4483-ad5c-f41b8879c1a9" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="0c7517d4-9070-4537-83a6-08c62cedeb44" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="d85e8903-88cb-4bc2-a750-9853617dfd00" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="82b84e7b-43c4-4c7c-a101-6fdeccba1a73" data-file-name="components/dashboard/layout.tsx">
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