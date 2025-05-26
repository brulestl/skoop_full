"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { useAuth } from "@/hooks/useAuth";

type Tab = "recent" | "collections" | "skoopcontent" | "profile" | "settings";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("recent");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signOut, isAuthenticated } = useAuth();
  
  // Search state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Ensure consistent hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle URL parameters for tab switching
  useEffect(() => {
    const tab = searchParams.get('tab') as Tab;
    if (tab && ['recent', 'collections', 'skoopcontent', 'profile', 'settings'].includes(tab)) {
      setActiveTab(tab);
      
      // Clean up URL parameters after setting the tab
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('tab');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(pathname));
    }
  }, [mounted, loading, isAuthenticated, router, pathname]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle search results
  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearchActive(false);
  };

  // Show consistent loading state while checking authentication or during hydration
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

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
  return <div className="h-screen flex flex-col" data-unique-id="9b045611-b855-4e41-9773-c64b910f9618" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
      {/* Top navigation bar */}
      <header className="border-b border-border h-14 flex items-center px-4 justify-between" data-unique-id="cdbaa63e-cde6-4188-8e70-0f7121384976" data-file-name="components/dashboard/layout.tsx">
        <div className="flex items-center" data-unique-id="ee792bc0-b9d4-4f8a-ab92-b7958623a9b9" data-file-name="components/dashboard/layout.tsx">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2" data-unique-id="0db29d9a-6cda-48be-ab1e-f1d3465e788b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only" data-unique-id="0de5e467-7ae4-4b47-b0b3-7d923b78dfe8" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9b86998f-2e21-48f3-9ec1-e28402b3e17b" data-file-name="components/dashboard/layout.tsx">Toggle sidebar</span></span>
          </Button>
          <Link href="/" className="flex items-center" data-unique-id="470b1bae-d19b-4dfb-b12c-929db7cae6dc" data-file-name="components/dashboard/layout.tsx">
            <span className="font-bold text-lg text-primary mr-2" data-unique-id="b4474a78-2de3-45d2-aac1-ade8fab448cd" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="cafbfc15-4226-4abc-b76f-144236f4e810" data-file-name="components/dashboard/layout.tsx">SKOOP</span></span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground" data-unique-id="7f9905a0-cfab-4c32-8980-198496f3f52f" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="9210619a-3f95-44ad-b4dc-482a2be71178" data-file-name="components/dashboard/layout.tsx">Dashboard</span></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3" data-unique-id="e0be8e25-0c4b-468d-95a6-b084685109a4" data-file-name="components/dashboard/layout.tsx">
          <ThemeToggle />
          <Button size="sm" variant="outline" onClick={handleLogout} data-unique-id="ac274dd0-d140-4a94-a19c-7eff9589bb49" data-file-name="components/dashboard/layout.tsx">
            <LogOut className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b562cc7d-ccca-48f1-b029-6845b6e25e99" data-file-name="components/dashboard/layout.tsx">
            Logout
          </span></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" data-unique-id="e41fae28-bfa3-4948-925c-13b61b40a5a4" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
        {/* Sidebar */}
        <aside className={cn("border-r border-border transition-all duration-300 ease-in-out bg-background overflow-x-hidden", sidebarOpen ? "w-64" : "w-16")} data-unique-id="4033006e-b22b-4f78-8f92-631214624005" data-file-name="components/dashboard/layout.tsx">
          <div className="flex flex-col h-full" data-unique-id="17545461-7201-4b83-ac79-3df59f74573d" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {sidebarOpen ? <>
                <div className="p-4" data-unique-id="6a9a9b23-18b9-47ef-b4c2-b50eae4f4511" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar 
                    minimal 
                    onSearchResults={handleSearchResults}
                    onClearSearch={handleClearSearch}
                    isSearchActive={isSearchActive}
                  />
                </div>

                <nav className="flex-1 px-3 py-2" data-unique-id="bf48f1e6-8e51-4db5-ad7d-dc1b4fa3a653" data-file-name="components/dashboard/layout.tsx">
                  <div className="mb-4" data-unique-id="0674c714-3217-4fcb-8d5b-a28b6476b302" data-file-name="components/dashboard/layout.tsx">
                    <Link href="/" data-unique-id="7e221116-e16d-4f4a-8271-6e71c6d6936b" data-file-name="components/dashboard/layout.tsx">
                      <div className="flex items-center px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50" data-unique-id="c651d76d-d118-40d2-a0de-db64e6b77e67" data-file-name="components/dashboard/layout.tsx">
                        <Home className="h-4 w-4 mr-3" />
                        <span data-unique-id="d26f05e1-7fc6-4ace-8f4b-b4ebd184773c" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="21aa77f8-60d6-4479-b820-9023cb46652f" data-file-name="components/dashboard/layout.tsx">Home</span></span>
                      </div>
                    </Link>
                  </div>

                  <div className="mb-8 space-y-1" data-unique-id="0ee3baa2-97d4-4b25-b1db-962d826b9e4b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-full flex items-center justify-between px-2 py-1.5 rounded-md group", activeTab === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} data-unique-id="ee9b6983-0e3d-4996-8f2f-bccb9ecdba5b" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                        <div className="flex items-center" data-unique-id="a0c67824-9568-48e6-b2e4-e67bb24612d5" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                          <item.icon className="h-4 w-4 mr-3" />
                          <span data-unique-id="a74aff44-b375-458c-a852-a9c049ac3377" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{item.name}</span>
                          {item.isPremium && <span className="ml-2 px-1 py-0.5 text-[0.65rem] font-medium bg-accent/20 text-accent rounded-sm" data-unique-id="b9860c71-1adc-4f31-a4cc-7132e8cf3517" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="939e88d1-1d08-4e60-9e88-d2304cf8777e" data-file-name="components/dashboard/layout.tsx">
                              POWER
                            </span></span>}
                        </div>
                        {item.count !== undefined && <span className={cn("text-xs rounded-full py-0.5 px-2", activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")} data-unique-id="d8509bc3-c2a1-4805-ae40-0d339332485a" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                            {item.count}
                          </span>}
                      </button>)}
                  </div>

                  <div className="space-y-1" data-unique-id="af1f17b6-12cb-402a-b8cb-09b3f4dfcad0" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                    <h3 className="text-sm font-medium text-muted-foreground px-2 py-1.5" data-unique-id="79236574-97e8-4606-a8f5-da4504baa9f0" data-file-name="components/dashboard/layout.tsx"><span className="editable-text" data-unique-id="16a0a89d-90c6-431a-a6e4-37903ade0813" data-file-name="components/dashboard/layout.tsx">
                      Connected Services
                    </span></h3>
                    {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(service => <div key={service} className="flex items-center px-2 py-1.5 text-sm text-muted-foreground" data-unique-id="c2fb4664-d2b6-4849-a57a-c5802d17e43a" data-file-name="components/dashboard/layout.tsx">
                          <span className="h-2 w-2 rounded-full bg-primary mr-3" data-unique-id="ff3834a1-bdd0-444f-b9ae-2a4587b822e6" data-file-name="components/dashboard/layout.tsx"></span>
                          <span data-unique-id="b3802730-ad19-4d59-90ad-f46f44e1d28e" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">{service}</span>
                        </div>)}
                  </div>
                </nav>

                <div className="mt-auto p-4 border-t border-border" data-unique-id="637c77dd-3e1b-434b-92b2-060d5ff1d1da" data-file-name="components/dashboard/layout.tsx">
                  <Button className="w-full" variant="outline" size="sm" data-unique-id="6c4633d2-50fa-4ca1-87fe-965a7e40c197" data-file-name="components/dashboard/layout.tsx">
                    <Plus className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="07e7ab4a-1b28-4a31-8770-fa9bea3da178" data-file-name="components/dashboard/layout.tsx">
                    Add Connection
                  </span></Button>
                </div>
              </> :
          // Icon-only sidebar
          <div className="py-4 flex flex-col items-center" data-unique-id="0662d71c-b2ac-44d2-8f5a-fd566d9c9982" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
                <Link href="/" data-unique-id="9976e822-f2a3-4fdd-96fd-55ea6d25868d" data-file-name="components/dashboard/layout.tsx">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-8" data-unique-id="17252491-039a-4900-bc28-e9b64c9bbcce" data-file-name="components/dashboard/layout.tsx">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                </Link>
                
                {navigationItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")} title={item.name} data-unique-id="b2a1b545-07d8-42ef-8121-4c7a6e2ce90a" data-file-name="components/dashboard/layout.tsx">
                    <item.icon className="h-5 w-5" />
                  </button>)}
              </div>}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background" data-unique-id="08248ff2-4ef6-4098-9d91-9d15b97fff08" data-file-name="components/dashboard/layout.tsx">
          <div className="max-w-5xl mx-auto px-6 py-8" data-unique-id="60da8a4c-6600-4861-85a7-e44a014e39c6" data-file-name="components/dashboard/layout.tsx" data-dynamic-text="true">
            {activeTab === "recent" && <>
                <div className="sticky top-0 z-10 bg-background pt-2 pb-4" data-unique-id="03d7ced0-14b5-4de7-8f3a-e848fb991960" data-file-name="components/dashboard/layout.tsx">
                  <SearchBar 
                    onSearchResults={handleSearchResults}
                    onClearSearch={handleClearSearch}
                    isSearchActive={isSearchActive}
                  />
                </div>
                <RecentSaves 
                  searchResults={searchResults}
                  isSearchActive={isSearchActive}
                  onClearSearch={handleClearSearch}
                />
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