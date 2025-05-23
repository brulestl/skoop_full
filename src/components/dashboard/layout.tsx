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
  return <div className="h-screen flex flex-col" data-unique-id="5cdaf788-6efa-4b83-9c80-fe8aeba98250" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="ab6b855d-33a1-46c0-af03-ff1f82bdcf1b" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="f9f3dfd0-c7ad-4a07-8932-879f893f91d4" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="dce291d1-b1d8-47e9-8454-2a6b1df0e336" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="fbb88f59-b890-4951-ae26-33c83f028867" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="46a438fc-9175-4ad0-818e-fb98c1b7d335" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="ef542426-aa39-48bb-9e8f-04b31af245ca" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="eeb4f25e-6a88-4b30-91f2-a3c3a1b74bb1" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="b0e4da0f-1ef2-4d61-8e5d-178f3340e031" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="56c80ba9-9cd6-4dd4-b47e-c619ce5a1351" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="1e6c31fe-4269-4fb8-839c-d2717974f481" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="226f6dad-770c-4772-a174-d6bfb563e07c" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="2d8b6e0b-9373-44a3-8cd5-e55831117ec4" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="a5dc137a-c594-4c34-8cc0-dd477321192f" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="2bf11596-920f-4cc2-9927-89fd5765f7d6" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="7cb81e94-d25d-4329-a3b9-5651a5055325" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="ed866d6a-6bfb-401e-86f7-b5821aeacd43" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="cc7ea2b6-c04c-4e4c-9c0e-1ec89c7b670e" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="950cd9d1-32c1-4c20-8a7a-2a1a63521a12" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="b5f6765c-17d1-4b31-9794-d121f4bbd410" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="6981154f-ad21-4134-a8cd-3dc9bf5b0c70" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="b164140f-ee83-41ac-ab4a-919d598ba518" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="20b02878-b9c6-4145-8aa9-471d59aaf61b" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="90504aae-e964-41ee-89b7-ea93c654d123" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="5ffee169-2c02-4d29-8c90-b84463b998fe" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="a2c64131-c796-443d-bf58-d43623932b6e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="19a9fe7e-af41-4f9e-96d9-71b34146df27" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="90470446-51c6-4752-bd92-4e471ce81c7a" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="b456b923-7406-4eed-adaa-5e20123810f4" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="53bcdc62-1a29-4b27-bed4-5cdedc584283" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="d897e91c-8e6c-47b0-a7d5-1caa904b126b" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9052684a-1e8b-4dc6-88bd-5f0a6117eef6" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="2d4ea6e4-3baf-4bf7-983c-4ea93c81a0b4" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="08350273-6fa5-4e99-a0fe-f66b0f8e416d" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="4d3bc456-c189-400d-835e-e0c7c4e4be84" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="bc364322-44d8-4f1e-8080-b271b058f5b0" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="f413e0b9-fde3-4459-804d-c7bbf76e3828" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="951bdd0a-b64f-4ed5-91e1-9b477aa223a0" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="751e8bfc-3552-46d6-a8f7-758ff1461f7a" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="b3f11f6e-b3c1-476b-bab8-1104e7cfe65f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="afcaac7c-3358-474b-bd7b-6d99e3254872" data-file-name="components/dashboard/layout.tsx">
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