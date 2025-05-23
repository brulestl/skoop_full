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
  return <div className="h-screen flex flex-col" data-unique-id="e90e0c34-8f6a-4702-ae9c-6fd49e3b31d0" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="b0ab5d4d-55f8-45bc-8883-5e0765fdde77" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="6bd6a6d3-29eb-4194-a97c-3b8db4943794" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="9d74c205-4e98-446c-bcbb-ba45bda67cb9" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="3d0c77ef-b0a9-4950-9504-3b81d8265013" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="a06d253c-e892-4d51-979e-c2906a794325" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="08cc6c51-a721-468c-8966-002c113dbd3f" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="f4823e03-4bf1-4b2b-9ca9-963ca43e1b35" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="048d1dc3-b3bd-4692-a3fa-1191d9316872" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="1b9f39c9-869e-4ad8-9f98-c98a44a48677" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="8cae9381-ff50-4bd4-85f3-23eaec914fc0" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="efa237a3-5b24-4d21-bed6-a214dfe73bc4" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="0912fc8a-28a9-4920-bf7c-24a469f4f7a7" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="f9cc788e-e61d-4252-b80f-40cb79d54dca" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="5a995604-9548-4a16-9f37-0002bcdd2daa" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="bb0c5455-4918-4fdd-a022-5794af31209e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="b1657ede-0cdb-48b2-a777-93046a13fb8b" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="9464002e-a73f-4d0d-b6c1-43e9f062bf26" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="e6a70375-c88c-4593-9a03-826c75bfe403" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="3a2dc2ee-43d1-4128-8891-6a882d32fa9a" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="be3cc9d1-d756-45ca-8d19-6b70cfc8f05f" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="707ef95f-0833-4bce-aacf-78a321e4024e" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="95c8e049-5865-4fc6-9dfb-5d6d5da4549d" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="b66a9af3-a526-49d2-9b26-e562e1cc33f1" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="80e9d0ee-8f04-4270-90a2-2cd8fcda0c39" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="21499365-a7a9-49e9-9323-3241907694ec" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="b79c8ca1-b101-489e-bc46-66641f436b40" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="0ce1a6f7-2928-48d0-98d2-9494dfd53fc0" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="9b6c2094-1fa6-4d62-9147-a0096536649b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="8e45aea9-520c-49f5-9db6-1e5b8c58df5a" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="9289b994-c595-4037-86cf-9c9af3a84549" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="86dcbe1d-cdb9-4d66-8447-7291a528e850" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="2c75095a-7e64-4540-898f-2651e0865e31" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="5116a402-0c72-46dd-b079-5b39a8b0e2de" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="5e41bf42-bf43-448f-ab8b-13e5b491351f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="422c738c-c9c2-4e3a-81cc-5619c194a8b4" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="1de715fe-466d-406e-a731-b1aecd77b159" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="fec735a1-5185-4ffa-9aa0-ecec6bb2cf59" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="b891d7d3-0f62-4885-97cb-8795c44a36de" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="6741a340-7a50-46c4-87ff-07bff65a0fe8" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="e3b6d13f-28cc-4fe9-95c6-197f1571d11e" data-file-name="components/dashboard/layout.tsx">
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