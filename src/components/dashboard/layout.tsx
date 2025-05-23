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
  return <div className="h-screen flex flex-col" data-unique-id="f1c085e6-7605-49ed-b569-070604669d0f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="440e7668-7141-46fb-920f-a4fe18aa4495" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="d83ba15f-fc4c-41e2-b3db-a8cababb746e" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="03b56231-d733-41f6-a778-443696f39b90" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="a7376129-98dc-400d-80e3-b266f97cf611" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="031ba2b1-2a89-4e03-ab27-18d185c8016e" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="bdec6dd2-ab13-426f-b7ec-82edae798f03" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="e776fc5d-cd53-4474-a07d-fbc93bbefe25" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="129ab7fa-a966-476d-9533-ea17d811a085" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="3c313b8c-be1f-4c8a-8252-c5a1f6450d69" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="ad170aba-9196-4126-a512-947eb672f355" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="a30d291a-412e-4568-af61-a14f71d2c1fc" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="7d30c9da-1749-4ef6-8a8c-a90d4053e291" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="6847e5e7-fa6d-4ced-a79f-b1f051cbb40c" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="e321dd08-de2a-4b86-abb9-c315bfdb8ce9" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background overflow-x-hidden", sidebarOpen ? "w-64" : "w-16")} data-unique-id="98ecbd00-614e-4a7c-8f57-ed5431e0bc7c" data-file-name="components/dashboard/layout.tsx">
          <div className="flex flex-col h-full" data-unique-id="ad0e9eb1-f22b-4953-b22d-59db50e6fba7" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <>
                <div className="p-4" data-unique-id="a864a711-ee19-4ffc-bd72-324ac932a06b" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar minimal />
                </div>

                <nav className="flex-1 px-3 py-2" data-unique-id="8a951bc2-7ae9-4a73-b791-90a0873a3c51" data-file-name="components/dashboard/layout.tsx">
                  <div className="mb-4" data-unique-id="426e39f0-9024-469f-b23c-d16f58a18b8d" data-file-name="components/dashboard/layout.tsx">
                    <Link href="/" data-unique-id="8054ba20-5d20-4fe4-abd2-904f1a776ec9" data-file-name="components/dashboard/layout.tsx">
                      <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="ba75ce7c-ae78-4f77-ade4-a480326c9477" data-file-name="components/dashboard/layout.tsx">
                        <Home className="h-4 w-4 mr-3" />
                        <span data-unique-id="88a69d79-b0c1-4322-b7bc-5f63e1018d45" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="3a970a15-cb09-4415-920e-63219ce5859e" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                      </div>
                    </Link>
                  </div>

                  <div className="mb-8 space-y-1" data-unique-id="a2b3b30d-59a0-460b-ac28-150e78add33f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="1e52791e-3c73-430e-879e-068421480359" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                        <div className="flex items-center" data-unique-id="e3fbf4fb-910e-47c4-ad86-38d1019834b2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span data-unique-id="d5842c92-7605-4474-ba72-146ceb746485" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                          {item.isPremium && <span className="ml-2 px-1 py-0.5 text-[0.65rem] font-medium bg-accent/20 text-accent rounded-sm" data-unique-id="1b40675d-d00f-4992-b749-e06b045a35a5" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="317d7a07-c12b-4dfb-9a35-9f1a524284ed" data-file-name="components/dashboard/layout.tsx">
                              POWER
                            </span></span>}
                        </div>
                        {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="25659903-18dd-4bbc-8d69-a57f44fbe2cd" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                            {item.count}
                          </span>}
                      </button>)}
                  </div>

                  <div className="space-y-1" data-unique-id="79be1960-38d8-455e-98b0-96f45bb0e471" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="f39daaf2-97c5-4d4e-b76c-7823ca2bcafd" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="636f2c45-2dd5-4c21-91ec-a55903636ba8" data-file-name="components/dashboard/layout.tsx">
                      Connected Services
                    </span></h3>
                    {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="0594d6e8-a491-4540-9b21-a600bc4dac22" data-file-name="components/dashboard/layout.tsx">
                          <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="ebf64878-906e-4103-963c-d7b595f81030" data-file-name="components/dashboard/layout.tsx"></span>
                          <span data-unique-id="c1168918-53a3-4e1f-aa85-351b21bebd98" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                        </div>)}
                  </div>
                </nav>

                <div className="mt-auto p-4 border-t border-border" data-unique-id="dcd97cca-987f-4407-b255-ceb25868e513" data-file-name="components/dashboard/layout.tsx">
                  <Button className="w-full" variant="outline" size="sm" data-unique-id="c0d6beda-750b-4288-98d6-d03aa6853371" data-file-name="components/dashboard/layout.tsx">
                    <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="54a9a6dd-092b-4938-91f1-7fa8c96c1d62" data-file-name="components/dashboard/layout.tsx">
                    Add Connection
                  </span></Button>
                </div>
              </> :
          // Icon-only sidebar
          <div className="py-4 flex flex-col items-center" data-unique-id="40b1faa2-adac-46d3-a14c-fe03bed133a4" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                <Link href="/" data-unique-id="bb234727-b00a-46c1-8ec9-97ba2eb2572c" data-file-name="components/dashboard/layout.tsx">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-8" data-unique-id="7e7b722a-b02c-4bcb-aaac-2f74070a5c63" data-file-name="components/dashboard/layout.tsx">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                </Link>
                
                {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")} title={item.name} data-unique-id="7936dff2-4014-489d-becd-0749f5eb9f04" data-file-name="components/dashboard/layout.tsx">
                    <item.icon className="h-5 w-5" />
                  </button>)}
              </div>}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="2bd80b59-6cd9-494f-895e-e1f6e7cc81ab" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="96b1b8db-cdd4-43b4-96e8-081369c8b0f1" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="1b5903c5-36fc-446e-97a9-1a565fb967d8" data-file-name="components/dashboard/layout.tsx">
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