"use client";

import { useState } from "react";
import { Clock, Database, Gauge, Save, Settings2, Bell } from "lucide-react";
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
  return <div data-unique-id="ed18a163-3e31-4e66-a5bc-37646289b053" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="05f184de-dccd-4f7a-894f-c4259e0bcac5" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="686679b7-c450-4e04-af75-627cd82043c0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0549da34-5123-4f93-a820-2435d3a4d919" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="70b9a6ee-dcec-4adf-a05e-ef39c689f01f" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="190f999e-10b8-4c65-976c-567c06a06c75" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="d447fe10-fc8a-4c0a-8a14-0bc954a6510f" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="bbc92d5d-1fc6-4988-bfab-570d4d47317d" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="ffdd7db4-d637-46f0-8fd9-9dbd960937fe" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="8eca5040-f29a-4663-b804-2ad3a7b5b8eb" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="d3bae820-e9d6-4e70-8992-eb8da970911e" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="f5e0c367-4bc9-4814-8c48-8110a3fbc54a" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="c25a871a-e4f5-42d7-ba74-ae2393bd1039" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="8aed7e93-3649-488b-be69-a4927fd53a04" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="30df7174-00d6-4f6b-b283-6bdea5b6435a" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="5dd911e8-1525-423c-a5fb-89ea54e1a609" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b7c88ba1-5b38-441c-83d3-8bb4ce7266da" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="cefbaaaa-1441-409e-9f78-dd7cc334302d" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="8977925a-e469-41b4-8d41-d546baa85282" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="9687cb27-d634-4488-bff0-c50e6c0da990" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c99d3021-aee7-40f0-8073-07a854d18c25" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="f3b7fd17-2416-4cd0-a01d-5168e4a829c6" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="1e32d310-660a-4a84-96f8-e1f17c2f9b32" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="bc5f6116-8a79-47bb-a11f-e90c9511bc2f" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="d3928f1c-108e-4386-930b-bf164d8e5f2f" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="1c76a2b5-df26-4cd1-9425-037dafe95c44" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="d0d3fa14-13f0-4ce7-b1d7-57bf1e8026fc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d9a61e56-c0da-46ee-9c92-ea109e4894ec" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="ea96a47c-22d4-4a7c-8666-115a93b60a31" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="e77e723a-3302-4b9f-9f28-dcf4d1ebf0b8" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="1355b20b-9cca-473b-a79c-70e683db851f" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="30f87b91-ddb7-48a3-a202-de1e2697b01c" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1a2f833e-e75a-496b-8f4a-82c7128b9ba5" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="74ed3d8f-96d0-4d3c-a152-a5532dd2436a" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="f7a1b382-bd31-4492-8e7a-f53656978743" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="17aeb34a-f4b1-4035-b2d4-70bd4536461f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="74551c04-3f91-4471-9b50-5b6deb176b1d" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="a0f93dc2-f746-4dd0-8f84-678d320ac824" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="ea185c13-3652-446b-a3df-4ec703e2fd62" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="8d9c2312-110f-4ca8-9b65-72431652b092" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="cacc26fb-f249-437e-9674-b8b2c5ad2841" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="be72ecb3-ae1a-4164-be41-70422252b0af" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="eaa3b833-65c2-4159-ab98-668c8c3550cd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="291b0e29-fe99-4dcf-a363-ff939ce18d69" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="de554b22-f0d5-403d-9a31-fd54c6c02675" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c6fd649d-ac56-4903-92a5-4f25deae9388" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="c06ed622-5620-4053-9f61-44d3405e2ab9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a1f8c554-7e41-44f1-ba5a-12be842df7ec" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="8dc9a79c-6324-4748-a438-5bcf0b45c5e3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d1945ec6-0ebc-4b92-a20c-bc9bf4a07573" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="41b8617e-aaa8-4da3-8466-1fc89dafc854" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a740154b-2b87-44c7-a907-1b6e5044ff5f" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="b8aa7bc7-f6b3-42c2-9b44-5aa22d73857c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2c9f9845-3d96-4a50-b22c-eeabc91612ae" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="c8117765-bfc7-4955-bd93-0f35cab6a482" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="bc3aaacc-5a3a-4304-bc20-bd93ffd3c8f3" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="9f053b9a-9e75-4906-a7f2-8a1d3dc09297" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="49d1f0c9-9a94-496f-acdc-b9273d9cf7cc" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="d79864f0-47a7-485f-b753-c3be7471821c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9861ffc9-9ffc-44c3-9aea-aacba5d327c9" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="98ae3a8b-9580-4564-bf4f-b3abdaf48ecb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ba259976-58e0-42cd-b2de-07d8578a2159" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="14e3d730-dca6-4842-b063-5f8b352fae9f" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="6f457d9d-21ae-4308-b829-e60d14acc7a9" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="e6e7ec3c-7613-4019-b7a6-c3fff7194f2a" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="f81845b7-a369-4fc3-b7c5-2837726b3963" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="c94753ce-be63-40ed-9d0e-02e76bd13679" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="863ff6c1-71fd-4c3c-99c0-7fc1eac1d017" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="4ceab2fb-ca25-4923-90dc-74e760fca5a7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1d4625e3-686f-4920-9694-e148a598d3f5" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="93d7df6a-6c73-459f-aa6c-355357c11b2d" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="8ccde4b3-eeb0-4bc7-ae71-c0d4b8bde641" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="bace9b47-66a7-4f0a-9c3c-452c00664898" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2633620e-5f32-4e56-89e2-b48ecf085d0e" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="dcce66bd-0999-4b24-98cf-468b0e5b9606" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="ded80e4b-c092-4546-b040-eea87d722a0f" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="c4ae3435-cf75-4c87-a192-e2eadeae1386" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="3b1e8684-e32a-4827-8ea4-e3a8e9b7e869" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="6169e3b7-1db2-4364-98b8-6f7fe3b153e3" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="85c2414a-3d9a-443c-9a7a-8c59af44bc78" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="e1f44088-bdf0-4514-9359-620b74974f34" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="252ecacc-41a3-49b2-b40d-667aca73d1ba" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="447a73c0-3223-4093-badf-7233e1b3f935" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="8210438d-ce3d-4883-8992-e647767db3c8" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="3613e758-f10a-4fa6-88af-fc4ada1a295a" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e58a05cd-435c-480f-9e24-7a7806c4a0f4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c0163d8-47d1-40c1-a986-c4bf287cb213" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="0c7cd6f8-91b9-4f59-8911-416e9753579b" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="24f267e8-9b69-494b-869a-9d1e28f291cb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4917bace-22e8-4151-b3e0-8c0c2e707dba" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="10b8f909-dd3b-4331-80be-f2a64a52a8af" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1ecc55cc-65ce-4bfe-b9e4-05c85fed5e72" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="3302fad5-45a8-44a9-8e80-cbd744c3c013" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2cc1a403-40de-4142-b066-817058976996" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="13ab9bab-303b-43e6-ba37-07aeb2a04020" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d7dc4cde-7018-4140-a964-4e52ff146b01" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="88b83e5a-d3ff-40a4-af70-a27916aa3f0f" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="a651fcff-ba27-407c-a33b-2f0008a6d126" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b9679b17-6385-4911-b871-27a985ee4e47" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="d2933e29-7a72-4150-837b-9e3ba33c9a73" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="60e98027-2117-48f9-99d6-757412f8cd1b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="935c0617-ab7a-44d1-96a4-902adc6d6206" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="42d689a9-a52b-4843-bb97-681b2276504e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5e97bef9-8f8f-42fc-be2f-8e07462fd39b" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="7fdcdb42-edad-4bd9-9b72-ebec382087b9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8fa2c8a1-7023-42ce-9161-5a3e7650cf16" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="a9bc016d-cb60-4871-ab1b-1bb26faecd1f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="68871445-4623-4f0f-a42e-9bc76825365c" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="2eae3f25-7a31-4636-8b0e-f05cf4113190" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="692d90a4-5758-44a5-b9b7-0bc0ff14378a" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="6e64b490-619d-49fd-bd00-ad2b95048393" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="0b243fac-b1d2-4256-a7b6-6407dc8d0d37" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="6dbb5439-4c84-4840-9d72-326b516c3aa0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="90d69026-7b7d-4c61-8642-990a8f799847" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="9ca3b2aa-291d-469c-be87-9a9c6d1bf6ff" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="70aed738-d790-4ed1-b820-71b01d93e925" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c961be11-11c7-48a7-b711-c4fb5ec4f303" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="2fbca9a1-f86f-4c36-af27-d8e4ce1ed1a0" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="659959a3-9b54-4398-948a-c6b7dc108c12" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="72bebe05-36d6-4ca0-acdc-e135d9e35fca" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="e45c160c-3f94-420c-a400-38775b3d43b9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2a6b6532-6da1-4586-9c6a-a96cf4521e73" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="68d1c276-277e-4a09-9232-e6e66f529478" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="1c9b0dfd-80d4-4ba7-b1b9-f8c3b34a2a21" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f804f65b-83e8-46d4-b753-884939e2637a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ddd29c14-2fd8-4574-9583-e9028c8194d9" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="dd672143-0ab5-44fe-b03d-ff5198445ccb" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="2541d81b-3c78-49c5-babd-faa34605ef9f" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="73da74d0-0d1b-4525-afdb-34e46aa473a4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="caad6a31-e12d-4d3f-99b2-f61674d1e9fa" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="c0e3ad1c-0ff9-4b1c-aa10-965189c962dd" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="3497cb58-d550-4d90-9127-875b5bc06bde" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="03ca7a3c-8892-4784-b95c-c37dcb145056" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="ae2aec4e-7deb-4503-a80d-184c75f30e53" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="47463548-5731-4e59-9e43-6e441a7d6a1b" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="18684e55-8784-4fc9-9a9f-81eca718950d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0d5862aa-17fd-41c8-b788-c45989b4b7f9" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="43169576-dc5e-48cb-9e72-f361a1cae2cc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6498a2a4-2517-4900-a953-f35c0f2c780d" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="c00e7115-d0e4-4503-8e2a-864cc59d5615" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5d990aa4-9810-4945-aa6c-c9109598d199" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="4041b184-1789-4402-886c-ef87a5bc6054" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="9d69cf6e-5e55-41d5-b986-5ca05a7703ab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1670ed37-2d09-4cf8-82bc-f0e978295e8b" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="1e86133e-1e9c-4588-8ff5-ebc80a2209b7" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="00ba9194-ba36-4eed-aa8e-c724e907475e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="80efb5fd-2730-4af5-8469-0ccfb54c5a4e" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="7a106752-2ba7-4c03-84b1-63537fe54154" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1aa9d8b7-dd1b-4e8c-b10c-14dcba8f9e35" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="da322503-59f7-4c8a-ba5e-adff26703f00" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="767799b0-51ee-42b6-948c-20db4723979d" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="c9f4fada-2c2d-4baa-9aeb-1060631c0593" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8c82c205-05fd-41b5-9702-1110ccc73ff5" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="d2f6d2b1-745e-4180-aef8-47e6f0d9744b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="24f4a7bd-09fa-4faa-842e-47b8fdc202cd" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="f60fc8e2-cb00-4813-98c8-874103429658" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9134d1ef-4d40-41c7-b9bc-998dc182676a" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="e43c1ae6-86b0-430d-965c-5d1a6c135ddc" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="1130ee98-ea04-4ec4-81d4-d687b1447466" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d3b1b21f-8765-461a-8296-9154e2558e6a" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="a97bc95a-d95a-4e17-a504-ac3a322d6737" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="bc50245e-3223-4c84-81f8-7f2f917c39cb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="4697d9dd-1d4b-4748-ade2-02bc5bf6d72a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3442a5f6-f451-4f9a-bf9b-115704e9b883" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac423046-62f9-466e-aed0-9ad18d47b4cd" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="5417f8c1-6373-4f24-8c30-aaed15dad495" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3d681ceb-0256-4fb4-9e37-2d299828dc00" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="50e3b389-8c74-4caa-9d13-7842b20174b0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="e34d7bbb-c5bd-4d8e-b41e-625462f92777" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e8faee33-1f1f-484d-bc51-7cde42402c64" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="6b11429e-95d2-4f11-90dd-de90a06d4732" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3636a745-767d-42ed-9441-2cab623fd6bf" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="82c517f9-9271-43c8-aff3-820a38ad0fca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ee2aa244-e11f-404e-b102-218a74b716b1" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="a5f9440b-cb59-4a80-a42f-6d6b6f01a7cd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4e45b131-5be6-4247-bc41-99e06ef6566c" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="075e34b4-806d-47d8-9cf5-a13a4dc1acb0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="1802bd66-e60b-4006-9dd7-e6c5e92086ae" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="57f53bfb-4c0c-4fd8-9146-fdd3821269d2" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="dfc2b464-000f-4da8-8770-a2ace7d9736f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c58116af-6a92-4da6-92a1-29d071109781" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="ec41bb15-8c93-4bac-be86-f9dcc7b59936" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9be46656-3a98-4d87-8d48-d9f3c8da3777" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="5cb263bf-37b7-4972-af67-7b8054957ed5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9711c45d-c7d9-4068-9abc-9da6b203cfcb" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="8c457b42-7f1f-407b-a669-a6aa64089bc4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="86cf081d-cad9-40e8-8a62-4fd02da553fc" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="75dbcb07-c946-464c-a5bf-c5255cf3cef3" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="d82f028b-c554-4c20-92c1-5fc21f4c9f74" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="becd4d79-c171-4b88-a66b-163ba18d7bcd" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c051b61f-21db-4d76-a6b4-f75291ca7b98" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="211b8edc-94fa-43e3-8619-9aed026f960d" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="789488e7-1eee-4b61-9462-105f5cd2f510" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4345d1c2-7dcc-4471-8df2-2038d6c22fd7" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="5a2c3e87-9f6c-4bfd-ae84-c48dfe803874" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3a5e848d-3da9-4946-9878-12c517b6528e" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="29cd99c3-991f-4953-a1b3-9ecb4d0176b4" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="2b9f8205-fc15-4198-8cb4-ec7549465ac0" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="c441477b-19f5-40f6-b39d-4f29571ac1b0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="73dd6fd1-211d-4dd5-aec5-618b1115f27a" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="95c2dd1d-b7ee-4a92-b7a1-b6da414d7b91" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="c0db04d5-9774-48a7-9c16-de67e5667f09" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="61decca4-9962-4b64-86dc-b38cf88b6b96" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="107f7752-08f9-4c21-a035-1c9232aae99f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5613460e-aa03-4d6a-8af5-af09b3de3cf7" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="33831d0f-2e8e-457f-a90a-c8dcaf5c431b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e16ad59a-6523-4ae0-b239-524e6cbf41bd" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="74aba7f7-5186-4f2c-ac14-2fa26c101ef8" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="17170e96-43b4-4c3a-b790-565b4bdaa8f0" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="eb832841-ad39-4d4b-857b-4629d1f23110" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="f2111e8a-59e1-4831-bf4c-8f636a3e2bc5" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="b2335f3a-1513-4e9d-aa9d-f95e0ce31779" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="cca2225e-b7a4-4f30-afc9-c172d2a5666b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="091f192f-b97a-42bb-9d17-3bb3f42cc61b" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ffdccf81-5d59-4d66-b96f-48d4a0accb0b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5343a1c1-b9a2-4e57-84bb-7efccafcecee" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="21a87c7e-5b3f-4e97-93ee-b4ef34415852" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="967a5a7a-88fc-4596-9b1e-ed348c595efd" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="a9f8e70e-e5bf-4c92-a055-7a3c58b14d14" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="3ffe96cc-2e9d-4553-aee3-30ffbc6f464a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="15baae58-f281-4612-bb7d-6d02825717d0" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="ea474d1c-4a70-415c-8fc4-68d32e5f6e0a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="702741e3-aef3-4112-abfd-9ce5b3299c1c" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="8f3c4ff8-7909-441f-8151-9f0d81471364" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9a538d2f-0bf5-4de3-b73f-d5a9ee070fc7" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="732b4d69-d7ab-4b56-9cc8-146ca73da562" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="c6f3ed82-ce98-443e-b7e3-92a61ab695dc" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ca139503-86a6-4720-b613-b832c3cdc994" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="2f47ad9e-9c7a-4298-8902-0ff97f19b741" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="8c1945b7-94fb-487b-9ad6-1859cceeb0a5" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3bd10d2d-b22a-420d-b755-1b384a0e297d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="434cf3cd-928b-463b-9a71-8542abb1ad2f" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="78ebf2a0-e1cb-4798-8729-93517fc71e4c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="89f71581-edc7-4647-9506-ab3df5cd5481" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="f90b6182-73d7-4756-9f28-e9b3acd9f10d" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="ab1436f2-b0f6-48f5-8b3d-e4cca9cb6018" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="6263aeaf-044b-4108-9ccb-08105ffac912" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="ef43eadc-fd18-4040-99d6-67270a2ad1b6" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f1bcbec0-3080-4e9b-9348-31674d5de085" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="be65620f-b33a-4bd1-8051-ffce999a9f7c" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="1fd1e4b9-fbad-42af-bb2b-d76929535b25" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="92e8b98b-4268-439d-8e83-f5d20c1b4ba7" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ed539d1a-0864-498e-9299-5d8d1613c75b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3cd1ef1a-2684-41f4-834c-aa03bbd81386" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ff34cbca-5e5a-40b7-9976-adf0e12d5fa5" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="82a5f9f5-1008-4423-b71f-d4f292a3135f" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="af7f988b-91d8-46b0-b24f-e799e086f1b9" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="0647eaa8-92c0-4a6e-a53e-ffc61f301bc6" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="7475bb9f-3d87-4edc-9c26-35248a6a2f60" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f28fcb20-338a-4fa4-96da-11533d0eee6d" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fa8af370-064b-4f6d-aae3-24f5e26e4563" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="34542923-61da-4f0a-9996-a17b062e8a44" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="43fce901-2716-4b12-8560-afee74557874" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="4523b542-b491-4984-bbb3-1d72d25a45e4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="41d6d812-b484-4387-8820-c1d2bc47a1bf" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="7ce899be-9d84-4a8a-ae2e-9e3d5211a68d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d822033a-2442-474a-bc27-fd1a34b54e19" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="58740e80-83ce-40ca-88b1-3e8f9f98ce55" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8efee63d-72b0-4b30-aafe-ca8e1f879e8b" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1c0761eb-673a-4067-9220-913f4acab18b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="b9c1835d-ac45-49d2-9df8-b95d6c33d83c" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="502fd02b-62f0-4671-9090-7dd2c5565e01" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="9ccf34aa-f001-453a-a1df-c72e792b86a9" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="0ff9129f-1149-4eb1-a7bd-31e1b253e038" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="40d2d5d3-5a6c-4747-831a-705739ed124c" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}