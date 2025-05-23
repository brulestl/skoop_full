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
  return <div className="h-screen flex flex-col" data-unique-id="4e622440-3e9c-4033-bb6a-0fb2d6f25853" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="27fa9640-8aec-46a6-802b-92c4bb8c1e16" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="413f8b55-f51c-41e4-a490-d9c8c3393233" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="dad6c826-1ed3-4eff-9487-36d1f5d748f3" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="6badad56-38a2-496f-84b4-c7a397665199" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="672d09e4-4c7f-462f-a120-e3bb38f4ac08" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="0ad6c1ee-3b1c-4e95-ba42-1f3cb5489031" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="518934b5-5a08-4fa1-82a9-cb984a99487c" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="7fc12ce3-5267-44df-bfbb-382e4c25a068" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="c2d0660b-de73-4a67-8296-07ed117b0683" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="3ea6a294-8b77-4e9d-b26a-904e0c649bb3" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="172a1ccd-d5be-4087-903f-9d6bed9a1393" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" data-unique-id="69daff21-9a04-4728-8b5b-e418470589c0" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1f1af383-5f0f-46fc-a56e-a43daf97b6f5" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="dcb1332f-385a-4617-a11a-f9bbdf803fe7" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background", sidebarOpen ? "w-64" : "w-0")} data-unique-id="26dcff94-31ad-494c-9603-e6637236e180" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
          {sidebarOpen && <div className="flex flex-col h-full" data-unique-id="5bbb9213-bf4b-433f-b557-2faa7d68c148" data-file-name="components/dashboard/layout.tsx">
              <div className="p-4" data-unique-id="8d6e1ff2-67d8-48aa-b9ed-5a3b66dd3887" data-file-name="components/dashboard/layout.tsx">
                <SearchBar minimal />
              </div>

              <nav className="flex-1 px-3 py-2" data-unique-id="943399fb-aa44-4c4c-8a1c-69cd389b84d2" data-file-name="components/dashboard/layout.tsx">
                <div className="mb-4" data-unique-id="0ba0b02c-64ea-475f-9032-15e1898fbcdc" data-file-name="components/dashboard/layout.tsx">
                  <Link href="/" data-unique-id="26b612ae-5d68-4749-afde-7f33fcff0892" data-file-name="components/dashboard/layout.tsx">
                    <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="f77963b7-d9a9-47f0-9306-e64b7c5022bc" data-file-name="components/dashboard/layout.tsx">
                      <Home className="h-4 w-4 mr-3" />
                      <span data-unique-id="872fba7e-d8f6-443f-bd07-937d9f5f0d8d" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="1796d8d4-7c7d-4317-8a8e-4c48e94c48b4" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                    </div>
                  </Link>
                </div>

                <div className="mb-8 space-y-1" data-unique-id="62dbc742-2b87-4869-8d44-c7d76e09ac25" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="02eb2b5d-114b-42d3-b48d-3be36930ee81" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                      <div className="flex items-center" data-unique-id="7db2694b-4671-4039-af66-8aa953938f9c" data-file-name="components/dashboard/layout.tsx">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span data-unique-id="d94e0172-b481-455e-824b-8b5df2c3e353" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                      </div>
                      {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="e65bdc20-5221-4f05-8c1c-a21c2307364f" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          {item.count}
                        </span>}
                    </button>)}
                </div>

                <div className="space-y-1" data-unique-id="05b8d510-629c-4722-99f0-d5fe4e55625e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="8b8a2825-9db4-4376-90de-761c6c3ac0a9" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="ae0e456e-8130-4781-9293-95eb348e47bd" data-file-name="components/dashboard/layout.tsx">
                    Connected Services
                  </span></h3>
                  {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="06f58d74-b630-4255-9669-f480e6f1fe9c" data-file-name="components/dashboard/layout.tsx">
                        <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="e993106b-136a-459b-9620-7acc30cefa35" data-file-name="components/dashboard/layout.tsx"></span>
                        <span data-unique-id="66034e7a-cc3b-474b-9e17-c1cfb673e088" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                      </div>)}
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border" data-unique-id="b423187f-35b1-4844-a92b-f76ebe9d6a93" data-file-name="components/dashboard/layout.tsx">
                <Button className="w-full" variant="outline" size="sm" data-unique-id="71fd32d8-d4fd-43aa-aabf-a8069a46424e" data-file-name="components/dashboard/layout.tsx">
                  <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="ca937a9a-66bc-4a53-a953-31bb19f38beb" data-file-name="components/dashboard/layout.tsx">
                  Add Connection
                </span></Button>
              </div>
            </div>}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="b8431efc-e7d2-4968-a2f9-0c08054f32c3" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="5f68854b-9f32-41a3-94e3-e49299c91ff2" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="mb-8" data-unique-id="e6aba57a-f564-43b0-8823-bafc6b902077" data-file-name="components/dashboard/layout.tsx">
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