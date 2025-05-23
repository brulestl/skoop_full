"use client";

import { useState } from "react";
import { Clock, Database, Gauge, Save, Settings2, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const settings = [{
  id: "sync",
  label: "Sync Settings",
  icon: Clock,
  content: <SyncSettings />
}, {
  id: "embedding",
  label: "Embedding Model",
  icon: Database,
  content: <EmbeddingSettings />
}, {
  id: "ai",
  label: "AI Models",
  icon: Sparkles,
  content: <AIModelSettings />
}, {
  id: "performance",
  label: "Performance",
  icon: Gauge,
  content: <PerformanceSettings />
}, {
  id: "notifications",
  label: "Notifications",
  icon: Bell,
  content: <NotificationSettings />
}];
export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState("sync");
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold"><span className="editable-text">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="skoop-card divide-y divide-border">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)}>
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span>{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="skoop-card p-6">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div>
      <h2 className="text-xl font-medium mb-4"><span className="editable-text">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6"><span className="editable-text">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")}>
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} />
                <span>{option}</span>
              </label>)}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Platforms</span></h3>
          <div className="space-y-3">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between">
                <span>{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border">
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium"><span className="editable-text">Automatic Sync</span></div>
                <div className="text-muted-foreground"><span className="editable-text">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"><span className="editable-text">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium"><span className="editable-text">Manual Sync</span></div>
                <div className="text-muted-foreground"><span className="editable-text">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"><span className="editable-text">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium"><span className="editable-text">Automatic Sync</span></div>
                <div className="text-muted-foreground"><span className="editable-text">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full"><span className="editable-text">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div>
      <h2 className="text-xl font-medium mb-4"><span className="editable-text">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6"><span className="editable-text">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[{
            name: "OpenAI - text-embedding-3",
            description: "Best quality, higher cost"
          }, {
            name: "OpenAI - text-embedding-ada-002",
            description: "Good balance of quality and cost"
          }, {
            name: "SKOOP Local",
            description: "Privacy-focused, runs on your device"
          }, {
            name: "SentenceTransformers",
            description: "Open source, free to use"
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")}>
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} />
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-muted-foreground text-sm">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Advanced Settings</span></h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium"><span className="editable-text">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option><span className="editable-text">1536 dimensions (default)</span></option>
                <option><span className="editable-text">768 dimensions</span></option>
                <option><span className="editable-text">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1"><span className="editable-text">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div>
              <label className="text-sm font-medium"><span className="editable-text">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option><span className="editable-text">Never re-embed</span></option>
                <option><span className="editable-text">Weekly</span></option>
                <option><span className="editable-text">Monthly</span></option>
                <option><span className="editable-text">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1"><span className="editable-text">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="chunking" className="ml-2 block text-sm"><span className="editable-text">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div>
      <h2 className="text-xl font-medium mb-4"><span className="editable-text">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6"><span className="editable-text">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Cache Settings</span></h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium"><span className="editable-text">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option><span className="editable-text">50 MB (default)</span></option>
                <option><span className="editable-text">100 MB</span></option>
                <option><span className="editable-text">250 MB</span></option>
                <option><span className="editable-text">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1"><span className="editable-text">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div>
              <label className="text-sm font-medium"><span className="editable-text">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm">
                <option><span className="editable-text">1 day</span></option>
                <option><span className="editable-text">1 week (default)</span></option>
                <option><span className="editable-text">1 month</span></option>
                <option><span className="editable-text">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1"><span className="editable-text">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2"><span className="editable-text">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Network Settings</span></h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Background Sync</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function AIModelSettings() {
  const [selectedModel, setSelectedModel] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferredAIModel') || 'claude-bedrock';
    }
    return 'claude-bedrock';
  });

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredAIModel', model);
    }
  };

  return <div>
      <h2 className="text-xl font-medium mb-4"><span className="editable-text">AI Model Settings</span></h2>
      <p className="text-muted-foreground mb-6"><span className="editable-text">
        Choose which AI model to use for summaries and search.
      </span></p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Default AI Model</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'claude-bedrock' ? "border-primary bg-primary/5" : "")}>
              <input 
                type="radio" 
                name="aiModel" 
                className="mr-3 mt-1" 
                checked={selectedModel === 'claude-bedrock'} 
                onChange={() => handleModelChange('claude-bedrock')}
              />
              <div>
                <div className="font-medium">Claude (Anthropic)</div>
                <div className="text-muted-foreground text-sm">Advanced understanding with nuanced responses</div>
              </div>
            </label>
            
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'azure-gpt-4o' ? "border-primary bg-primary/5" : "")}>
              <input 
                type="radio" 
                name="aiModel" 
                className="mr-3 mt-1" 
                checked={selectedModel === 'azure-gpt-4o'} 
                onChange={() => handleModelChange('azure-gpt-4o')}
              />
              <div>
                <div className="font-medium">GPT-4o (OpenAI)</div>
                <div className="text-muted-foreground text-sm">Powerful reasoning with technical expertise</div>
              </div>
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">AI Features</span></h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Content Summaries</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Use AI to generate summaries</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Smart Search</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Use semantic search for better results</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Auto-categorization</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">Automatically categorize saved content</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text">
          Save Changes
        </span></Button>
      </div>
    </div>;
}

function NotificationSettings() {
  return <div>
      <h2 className="text-xl font-medium mb-4"><span className="editable-text">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6"><span className="editable-text">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Notification Preferences</span></h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Product Updates</span></span>
                <p className="text-xs text-muted-foreground"><span className="editable-text">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-3"><span className="editable-text">Delivery Methods</span></h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium"><span className="editable-text">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="skoop-button-primary">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
