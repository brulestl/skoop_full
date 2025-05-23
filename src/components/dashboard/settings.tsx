"use client";

import { useState } from "react";
import { Clock, Database, Gauge, Save, Settings2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const settings = [
  {
    id: "sync",
    label: "Sync Settings",
    icon: Clock,
    content: <SyncSettings />,
  },
  {
    id: "embedding",
    label: "Embedding Model",
    icon: Database,
    content: <EmbeddingSettings />,
  },
  {
    id: "performance",
    label: "Performance",
    icon: Gauge,
    content: <PerformanceSettings />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    content: <NotificationSettings />,
  },
];

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState("sync");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="skoop-card divide-y divide-border">
              {settings.map((setting) => (
                <button
                  key={setting.id}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-left",
                    activeTab === setting.id
                      ? "bg-primary/5 text-primary"
                      : "text-foreground hover:bg-secondary/50"
                  )}
                  onClick={() => setActiveTab(setting.id)}
                >
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span>{setting.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="skoop-card p-6">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
}

function SyncSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Sync Settings</h2>
      <p className="text-muted-foreground mb-6">
        Control how often SKOOP syncs with your connected platforms.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3">Sync Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map((option) => (
              <label
                key={option}
                className={cn(
                  "border border-border rounded-md p-3 flex items-center cursor-pointer",
                  option === "Every 15 minutes" ? "border-primary bg-primary/5" : ""
                )}
              >
                <input
                  type="radio"
                  name="syncSchedule"
                  className="mr-3"
                  defaultChecked={option === "Every 15 minutes"}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3">Platforms</h3>
          <div className="space-y-3">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map((platform) => (
              <div key={platform} className="flex items-center justify-between">
                <span>{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3">Sync History</h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border">
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">Automatic Sync</div>
                <div className="text-muted-foreground">Today, 11:45 AM</div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Success
              </span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">Manual Sync</div>
                <div className="text-muted-foreground">Yesterday, 3:22 PM</div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Success
              </span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">Automatic Sync</div>
                <div className="text-muted-foreground">Yesterday, 11:45 AM</div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                Failed
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function EmbeddingSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Embedding Model</h2>
      <p className="text-muted-foreground mb-6">
        Choose which AI model to use for generating embeddings and semantic search.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3">Model Selection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "OpenAI - text-embedding-3", description: "Best quality, higher cost" },
              { name: "OpenAI - text-embedding-ada-002", description: "Good balance of quality and cost" },
              { name: "SKOOP Local", description: "Privacy-focused, runs on your device" },
              { name: "SentenceTransformers", description: "Open source, free to use" },
            ].map((model) => (
              <label
                key={model.name}
                className={cn(
                  "border border-border rounded-md p-4 flex items-start cursor-pointer",
                  model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : ""
                )}
              >
                <input
                  type="radio"
                  name="embeddingModel"
                  className="mr-3 mt-1"
                  defaultChecked={model.name === "OpenAI - text-embedding-3"}
                />
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-muted-foreground text-sm">{model.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3">Advanced Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Vector Dimensions</label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option>1536 dimensions (default)</option>
                <option>768 dimensions</option>
                <option>384 dimensions</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">Higher dimensions provide better accuracy but use more storage</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Re-embedding Schedule</label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option>Never re-embed</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">How often to refresh embeddings to improve search quality</p>
            </div>
            
            <div className="flex items-center mt-4">
              <input
                id="chunking"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                defaultChecked
              />
              <label htmlFor="chunking" className="ml-2 block text-sm">
                Enable document chunking
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function PerformanceSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Performance Settings</h2>
      <p className="text-muted-foreground mb-6">
        Configure how SKOOP uses your system resources.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3">Cache Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cache Size</label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option>50 MB (default)</option>
                <option>100 MB</option>
                <option>250 MB</option>
                <option>500 MB</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">Larger cache improves performance but uses more memory</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Cache Duration</label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option>1 day</option>
                <option>1 week (default)</option>
                <option>1 month</option>
                <option>Never expire</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">How long to keep cached data before refreshing</p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2">
              Clear Cache
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3">Network Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Background Sync</span>
                <p className="text-xs text-muted-foreground">Sync when app is not in focus</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Aggressive Prefetch</span>
                <p className="text-xs text-muted-foreground">Preload content you might need</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Data Saving Mode</span>
                <p className="text-xs text-muted-foreground">Reduce bandwidth usage</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Notification Settings</h2>
      <p className="text-muted-foreground mb-6">
        Control when and how you receive notifications.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Sync Completed</span>
                <p className="text-xs text-muted-foreground">When content sync finishes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Sync Errors</span>
                <p className="text-xs text-muted-foreground">When a sync fails or has issues</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">New Content Recommendations</span>
                <p className="text-xs text-muted-foreground">When we find content you might like</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Product Updates</span>
                <p className="text-xs text-muted-foreground">New features and improvements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3">Delivery Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">In-app Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Desktop Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
