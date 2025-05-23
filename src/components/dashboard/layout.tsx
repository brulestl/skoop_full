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
  return <div className="h-screen flex flex-col" data-unique-id="84e316c6-e66e-437c-b593-f133ed6cfacb" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="c665cbdd-ef76-48de-bb9a-9edad75f6fd4" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="54f9b92b-a118-42b6-9624-04e564ebb5d1" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="b0978af2-246c-46b4-b566-9eece16fe5da" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="646e809f-8cb6-4a1d-ac0e-1a0f2785cad6" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="39749b79-b0cf-4de8-8237-046f55a1665e" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="090a059d-2d64-46da-ba81-bc4c021b87b6" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="2c6380ae-4bad-4086-b2b8-23a2ea17ac9b" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="4f3f7320-3553-4499-8416-bd9cb024d838" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="33f2cb01-a936-41ae-b45e-7ebc561201ca" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="b7ac4684-98be-47fd-b95e-15495e3af42a" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="5130cb14-73b2-4471-982e-5aac55589559" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="47c0ad13-a2da-44e0-a9b5-3947dc9ba1a6" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="ed6c5ec3-a800-4a84-88e7-595a66f0ac77" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="4ccc1bc9-a77b-4c76-855e-1cdfa1732fa4" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="40b9c16e-86be-44f9-9bae-d80b5ca07eb2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="cb41121c-16c7-46c8-8139-c7ced9d67139" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="973ce199-603e-48a3-92e9-dbf3c2b72e72" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="cc468f82-80c2-4804-92e4-80d92036b984" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="41030486-90d5-4ef4-b8a2-bf3895250404" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="a5bed7b2-859c-4dfd-84f1-b547d3c7a121" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="d07bc41d-4185-496d-9566-c3139f2ab2a5" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="71d42869-6ebc-49cf-819b-0c319fa312ef" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="3711c238-d5b1-4f70-bdb0-3e6a37e71083" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="bcb8b4bd-dfb2-4b86-b2ea-f78feb66f477" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="20f45a40-9aab-457d-8832-23fc70485802" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="d0581466-6c04-4a5f-9de9-560d005f96f6" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="7bf0eb83-dcc2-40c7-a689-aac37e6082a8" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="c6a6abef-5ee6-4cd0-a9fe-b1fe775aa74b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="9a56018a-c571-4693-adca-b75a710c14ad" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="ec5995b1-2c08-4c35-86df-3c1b16690cb9" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="32921886-29f9-4b9d-af86-514681cf430c" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="3342fab5-f1d8-40d8-9248-c20dc9d2ed3b" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="cc3648ca-4a2c-46d1-afbc-cac6c85737fb" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="2c445668-4d79-44bf-9117-087c524809a9" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="617c3346-4a68-4619-955a-8076cc079806" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="f82caec1-e42b-41ef-9993-777c2f95ca73" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="304a4db3-f695-4d7d-9fbe-b1ea5ce30913" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="ebcc8b97-0df4-4171-bf49-d26a22b1ba68" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="9844d436-08b9-4961-84d8-5adf50640fd4" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="mb-8" data-unique-id="91349da5-92f9-4c97-b22d-5c6904da1ac9" data-file-name="components/dashboard/layout.tsx">
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