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
  return <div data-unique-id="7c66a620-c0c7-41ef-9069-980a31e910fe" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="0116ae9b-8722-4f23-b5b2-1ee1cf5dbe04" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="c9ad027f-c033-4b1a-b544-c00dcd6e9f98" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e83bb3e6-5cc3-41ae-86a6-7d46c587898e" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="ef37fb1e-3da9-4c6e-991d-2bb0802b33b9" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="23b96ae3-564e-4c24-96c5-5d92522cc568" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="ea5bc431-2d8a-460a-8cd5-2358ec9c61bb" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="8d7ba4d6-42ef-493a-a806-66cdf422510b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="a676a2c5-3b44-47e2-94b8-b0bf34858f1e" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="0f7353b2-6f77-427e-865b-5376ab0ecde7" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="aa5c670f-cf90-46d8-99c7-51524b6833b5" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="680afc7e-c824-453d-b643-ee795f0661c9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="799a0372-3c2c-43e3-a024-61a1aeebd70f" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="50e74d63-c6a7-47b3-91ab-c5faa3d5814b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4f57f6f1-8444-4763-89ca-2e4781cabb66" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="42f71fe1-e3ea-47e4-a458-114cfaacf61a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6bb730d9-dfce-4334-b1d1-4ee6a7dbc097" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="a8b39908-f27e-4c89-bafd-6e165a1eb0de" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="1ade4c8f-7290-488a-ad9a-5515b36b7d24" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5f212e61-b1ef-49a2-a787-5cd945ca6135" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d0b2f40a-0d45-4497-a50c-d1defeaf75aa" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="bc18da21-29d2-441d-bbf0-8463f50171dd" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="d8780f47-0efd-4e42-bb74-8639c315ae6c" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="735bdf63-6bd6-4474-8476-87e38194e35e" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="c0c44055-d9bd-4e56-bb21-557a200f15a2" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="71400ba8-1706-4d58-bc15-56c3aaaba86c" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="c1ce8597-ff56-4131-bc1a-5b699c3ae5ba" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="28d11c10-e398-49e8-aa40-7778f8b6e15d" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="5a82ea31-3610-4fcd-a2fc-c07a9faa2c0a" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="5513eeeb-f332-4b23-a54a-8f9889e034b0" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="e8c48ac3-c719-4436-8f11-bbe52049f584" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a46fb960-2698-46fa-9274-88b6575d36b5" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="9b5c5985-0cd8-4b38-b571-a903e0e2afdf" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="c40d1acf-0e92-43c5-92d6-c958b0744556" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="13da29bd-68bd-438c-a58e-e8424c8a8a27" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="7c06591a-91ee-4573-b56e-3c702500bd02" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="569665f0-532f-417b-aa7a-1aff76ef2223" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="461ed6a8-c554-46de-a292-f79fe0618ab6" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="3e08b251-8d42-478c-820e-a5404f94e79d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="41185908-30d6-4305-8daf-33ff32cf80ea" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="72c9b136-cd96-41f5-b377-d76917c65bc9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d2e71576-502e-44e4-8283-8054cc186f42" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="161e928a-a1a6-446f-82fa-54e5e6f956da" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6bf093c0-e0f1-4be7-8ba2-ce723d498ef0" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="6ac35879-82ff-449b-8d07-96047fdd9d25" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="79d2df50-e8b5-4bff-bed1-d1e0d6f47034" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="2f78a9fc-c070-469b-a279-8ed308519dd3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2dc56310-e8c5-405d-82d1-c6a0c70641b5" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="40b6744e-6bbe-4bfd-8cb2-345dc7153c7b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="765fe795-a1a8-4c87-abb9-e1c9a1542a5a" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="a3af0805-055c-4ed1-818e-11313454b32f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="772927ac-2a05-4a7e-8a00-e27971d479a0" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="ee9b02f8-c6f9-41a3-97a7-c27e77ce720b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a72df351-8561-4b46-a26d-9da8deb12d49" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="654b5286-1849-41ef-af33-dada3a93e33e" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="9f6292c7-72e8-4923-bcdd-b4bcf13bd2ac" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="b5851f76-0d34-4f1a-b7d3-4b275c0ed879" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="977fc4f5-df69-43a1-9ad4-002758ec9591" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="cacacd09-ab92-4bc9-80a8-1f75896d3fc3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c9742641-9d3e-483d-8e5a-bc2cbde556d5" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="97d077ae-578f-4861-8985-0ccb6297d8aa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c8cd75dd-c71f-4046-a043-7b2f7986dc42" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="fc817269-72d8-41c6-ac21-5291d1560c0b" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="e9d41e54-335b-4d8a-8f75-8faa81b4a0a1" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1dd35db3-5aea-45d6-96e0-86bad76fdf88" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="4b5f8da0-5d96-4abc-a871-b8af5349c119" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="01a08c5e-a053-4020-a757-c7ecd8bdac1d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="37cf4d0a-1c25-4c5f-8a5f-3f5a12e40cb0" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="f6bdd9c3-373d-40b9-9d95-f17b69540967" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2fe35d31-b779-47b0-9c49-6ded17d4ac05" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="586a7925-0a31-44f3-95cf-79315ddce225" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="5a58dfe0-be3e-452e-893f-a645aa127a0a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="d8f8cac9-c9f7-4993-8b84-2f926b58a322" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1f28ac9a-b64c-40f4-8a8f-8e1fea4e6c0c" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="a10e5d0c-7907-4343-a0bd-559371fa6e89" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="f3052e56-1d2e-4e52-87fc-db5a7efad992" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="702e4c96-955c-4cf5-9d0b-6a4c178e5979" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="c82c8407-0f1d-4be9-8632-856cecd08f00" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="89538fda-6c33-43f1-b5e3-577969f17c7d" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="ef5c539a-71f8-4d17-8203-aa7abd6d44c7" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="30ee374c-bd69-4aaf-9a01-eda07b8c4b78" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="7bb8b03e-3e37-4cfe-8938-be98515e69d9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="147638c4-50a2-45f9-b36f-2c517f7daa4a" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="98801613-a34b-4d1d-94b1-98e8a82e4fe0" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="28ae34ab-bf09-4276-9ab9-5208831a149c" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="d95e3885-a550-4f05-94a7-75f8cd91c82b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="51cbddc7-93e4-4fa7-b308-091901475a2a" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="dafe7d4a-f2ba-40f0-b80d-43374e5c8863" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="465b3a96-9d5c-4a22-a914-8eaf63dcacef" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="69744665-98a2-4032-bf1b-b582970f27a6" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="ca7983c3-6c13-4a2c-a8bc-09cbaf04992a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f590dc46-6a75-4b97-9d6d-609783acf45f" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="49ffa7dd-32e1-4876-8fd9-7888ddc2db97" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1dfd41c7-1e3b-413d-9315-3cf9ad1975e3" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="34fa09a3-36fe-467f-af85-ea3aa126456e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f47aa69-1cc5-4d01-beb8-de3d8015eb9b" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="06bfed05-25b4-473f-b0ed-fc6415cab445" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="ccc58780-8dd5-4ee0-b694-7f0db5053279" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bb6725f2-9157-492d-9b36-502c23831bc6" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="995d284d-2f03-4595-940c-92ae5f77107a" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="e13b8c00-c50a-4b37-885c-b6e8c0debe0f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d186f090-4b3c-40d2-91f5-6dce861c5175" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="36292cfe-054b-424e-ae86-2681a88c21a6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a4c1dcce-c972-4ad4-bc1c-fc57052f61f1" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="15fb89f7-43c5-4934-8bdf-b40129a2a571" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a5585955-b825-4657-95c8-b90916c47f28" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="1f3f06ae-0455-4216-96b9-2aa4e8350615" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c9a7699c-d8b8-4395-a9df-55ce7b74e1c9" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="b5d71b71-05b9-4703-afa0-a1aa36cda6da" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c27a5a42-7f5e-4b07-a71f-0f62cc4510f4" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="4785e010-9097-498c-9ca3-f1a7a67252d6" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="4fad75ff-da44-47f8-97c5-992dcdd8cea7" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="fd9d4bc5-904a-4e9d-af86-8e5486a987ad" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="56697bed-1524-4761-a579-a51d2b729527" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="78e89484-e3e0-4ff3-afb3-750642c3ddb3" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="d1d42dd8-6c55-49d6-9894-2169ba8876db" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7f0dc7d3-072b-49da-a78f-92e791585944" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="62afe9e7-f6fb-4106-8345-9b8d6fb30ecd" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="8d4024c6-7e93-451a-84f7-23b14f55c20a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a7248a47-6794-4b63-b12a-e63816d72f7b" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="7f3e95c5-65fd-4d20-8ba3-282d26aab2d5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9aa6b616-da57-4087-b175-d52f7f127d6c" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="78a9cc4c-0bd7-4ce4-9e8b-afbd950fa6b2" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="c3e02f6c-70bf-4577-af6b-defbcc1e2bca" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="a8593f79-06b7-4cf3-a8d0-68a9507b8ca8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c64f7596-c0fe-4687-bed6-69380fb30be5" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="7ba33a42-b02a-486c-8293-88a684945b2e" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="1a039bbb-e5e2-4139-a66f-8e8189c05325" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="3e594120-6198-45c4-b49d-d937e82ee7e2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f04e8390-4d7c-436c-81e2-e6586af30af7" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="2281410c-dd4f-4d19-b9b4-e37c149728e6" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="5103cc4b-c5e9-41fd-aaa5-9b3c594d5221" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a925dda1-fe42-4fc1-b12f-77e24d7bcfa7" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="dc709411-b82b-4520-a8df-8e4b7c1e7f03" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="64169e50-a3e1-49f8-85c5-d5ed8995d9c1" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="51dc802f-6bf4-4255-88d0-7da21f8592b0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="234428d7-efeb-4c35-b0bc-ba30ac929231" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="7edc6286-2a9c-4eac-b90b-c5a057cd3d9f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="500ac1b8-2682-40bb-851f-2ce874a3f5a7" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="3cc79b19-3edc-495f-a80d-719481d55784" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="df676b29-c8fc-43d6-b99d-8be9e7bdada1" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="0f04ca9c-97cc-4758-9a6a-7b5051213ef2" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="69c9d7f7-134c-4af1-accd-136c3db6dec3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="abe65af8-cecd-4e6d-ab2c-c9a0af3e8093" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="3a01e01a-5b3a-4074-8676-c977d71a7e34" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="9b6f4721-21ec-4f01-869a-7ad2d914c47e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="62c6e794-ad9f-4938-a7ec-f9b4a9696657" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="6fa9322a-36b1-442f-a5d7-cc2fcbdef6c7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d944a461-0499-4575-801d-40e824250e12" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="e22e0439-ea25-4a0c-aeb3-2b204e6f8aca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="69ede9a4-1aad-48ef-8c06-c00e4672dad6" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="c1b6558a-1777-4780-854b-837bd90f49a0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5e627fa2-a85d-4cc6-ab89-a70ebb43e3a9" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="58a6b581-3708-4bd0-bd14-84a41bc58387" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0c3f776a-28db-429c-8994-cd2fc4b3ce2d" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="fcdf3417-5b6d-4646-b5d3-a43a03b7d3ad" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8f601c10-9211-4813-960b-227ed4557498" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="a7f112d6-00fa-42ec-92bb-700a700b9ffd" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="09ea6710-ca1d-4ebd-9258-e5273477c8cb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ef973d1c-85d1-45e6-80e6-8a3ba7bacac9" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="4456d3d2-0846-4661-9144-763f9a4c5385" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="727fb535-9aa1-47a7-9e55-b20b12c79cb6" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="e517a875-0457-4131-8d57-4b933b352e90" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="74dae56f-9bb5-417c-9383-556ba7013af6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9d350e31-54bb-448e-9d74-7108087b9c8e" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="05628ceb-0eef-437b-8188-a2938bcac6b9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a66abe7a-46aa-4ce5-9e07-a5903db9d18d" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="af3c88f4-5d95-45dd-956c-23fe63c479a4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="3b0ad5fa-5e9a-40b0-9d50-e4fcb2d5630a" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="d789f644-7657-429a-aa30-ea6005f29c61" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="ffc09d4d-f87c-4f42-8311-9afff8511c93" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="cf9cdcdf-cd7a-4406-9ed7-2118913103b2" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="5cd43a10-de1b-41d0-bf21-2f39d3849988" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d2367889-387e-48c3-8c68-ba9fb59291ff" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6d2362f6-6bca-4662-b12c-f79cd2bc746d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7ad9265a-2295-4419-8fd8-7300a851f48e" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="dde780a4-a71d-4070-997e-973c4b7c016a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="5bafe5bb-c16b-4e21-8652-7cf4e8aaa0a3" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9f6b0992-5337-47b6-81af-21a82fbfc79d" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="75b1d94b-8268-4139-a885-11359da6e012" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="e3def4b5-a954-4da2-8bc6-a9991b4a6f7c" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="65554d47-21e0-43d8-ab4c-984277a06492" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="369ccf4d-b75c-4156-8e0d-b25a583e7933" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="52247312-be19-46c1-9fcb-32bb84899d0e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d70b7899-5971-43eb-9888-c5a926c27166" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="385bf968-203a-49b8-83e8-3ee6acbfdfff" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="186be83a-d3c3-4f72-83de-76f5bcb134ec" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="a65560bd-377e-41d1-980f-b26e01f9e82e" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="019f8f08-9f09-4e23-88ba-c3060ecfc343" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="2d386ac8-52d4-4d5b-b7e4-0600d8351f25" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="80625393-2671-4350-ad0d-9037e70a18fd" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="cad2c287-dad7-4836-a08f-72fc378f3826" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="9f75d63c-0ce9-497c-997b-64ca13a90cea" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b2d0bfaa-61e5-4e09-9673-37786abd20fa" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="a0a0d69b-7935-4f29-a229-f6ad3d46f995" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="970851d0-1932-4e12-be91-9436aba5797d" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="21c07727-c28c-49ca-8acc-ec2146b233c7" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="1daf8a12-374b-4f4f-9fcb-91dacb4019e2" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="6b27afa7-d02a-4050-8850-52e3bfd0e39b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="04a8d68b-1b4d-4a0a-899b-7f4a8eb76b9f" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="e99c21b6-b793-49f8-bada-150d41fe9800" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="4b7892dc-e1ee-4da2-9cbb-cc9f6dc4635b" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6bde28ba-3e89-4a6e-aa9a-9a256c6e98e7" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="01708556-3da2-487f-8d9c-11bbd761720a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd7719b1-a67a-4d90-ac02-b895cf771e08" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c8357f64-b188-4e80-9f40-577bbebb450a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd3ff630-1e58-470f-a3ed-fe0aa28aeef5" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1cd88691-6636-4a04-b9da-eafbee3fb295" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="7a50fc27-1cc4-47f1-904a-cc70126a16bc" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e6c1c74f-690c-43f3-82bf-eeda2dde678c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="fa7dc69e-37c0-4485-a576-eced26e994f0" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="704337ff-cf0c-4fd2-b618-ca9d6871e0bf" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="d45e0443-3c38-406f-b9c8-77c9c787b01b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="da7ae178-72f9-4be2-9c2f-226b18cfd1cb" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="3e9a3286-7e74-4209-a0b7-9d17654d9682" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="caee1d9b-6947-4fd6-8ce3-059ddfe148fb" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="7fdb35e5-d80a-4e8b-926b-a8af9b00c456" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="b7e0adcb-5161-4386-add6-3965b81869b0" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="bf5eb597-ea34-413a-9d03-03293245f500" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="44b832a6-da78-4903-9062-f3daa22574c4" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="1f6a305b-1dae-4058-8c41-039f045a1137" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="de0a4182-0d55-4757-92d8-036fa196054f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="da16af98-2fd0-4ed2-8b45-08e5a3ad939b" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="8bb91551-08ee-474a-9f08-7d29f80c4717" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="47c400b1-3a09-4cb5-9711-476df02dd0f4" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="75d0afdd-cd23-4bd4-a618-c4e5f0e52296" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="751cd502-b997-41c3-9b39-3b4d0ffdb52b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="2693b22f-217e-4154-8f72-fc4c11c356d0" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a9a10a2a-7421-4e14-9215-bcb79eb6997c" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f29ae197-a586-4183-b093-d954764d8b56" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="89fcac67-16d3-40c7-8999-fa3b32366f44" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d8dd4056-1a05-4111-a56b-1c763f97e5dc" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="107c595e-f06b-4504-94a5-068cef8fa26d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="45320a1a-50d0-466b-828e-27ccc3180492" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="bd73a41a-0a4d-4279-bd05-85b1306d2fc6" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="85219ce9-90ff-4e3d-a9a3-f528da4221d5" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="c6f7832c-bc6f-4d2f-99d4-1bbd25a4e5a1" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="23b1254d-830e-4089-8cb4-685901c6865a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="4ce04a3c-c88f-499e-a075-53bf8b19efc5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="507b6b22-8874-469e-8d93-0512855ca9e7" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="9b98bc16-5202-4fa4-a80d-8619df79f695" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="e93e3174-7a9e-4a55-b886-f383b17e1016" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c26a559c-9292-4822-b9e4-b68c58358893" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="566c0f70-4241-45c5-a0a6-d16d35801cae" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6eed297f-e5b5-4803-9bd9-bd84d1e2c3db" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="77b6b42c-7b67-4b39-9df6-cc7895c9ca49" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="05268705-806e-4699-8b7f-1191a9c5bc66" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8aa4858b-3f48-43d7-abcf-a2ebab8074af" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="607a65f4-1a29-4e01-b73d-cb09ec0adedc" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a438e274-3982-46e6-93e5-ff3614af3831" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="5c60bfe9-f25a-4eff-8e43-d59f53854715" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fa25243c-c97e-49af-9896-1c7a143a52cb" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="791f432b-9085-41e4-ae00-ae85354c2671" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="7c3fadae-b05d-47e6-a225-f28494dfdbf4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ec02b09c-20c8-468e-acf7-21d51bb22d4e" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="6f0fa084-4702-403e-8845-221fe5d568b5" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a1663c32-ba8a-403e-96f9-578107c45bc3" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="7e0a6d20-8c3d-497f-aac0-f1ba5224a237" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="acd94206-4717-4120-86ee-8eb3dc7c350b" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="dde6f5bb-728b-4a3c-ad25-407d58cc5469" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="651d84f7-ccb5-4481-9d05-5377b42d5c36" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b4bcef6d-06eb-4480-be72-93293e4aea80" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="82e4afb7-c2bd-4a93-91c1-bf3edb80643c" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="0252bfb3-9fd7-4ffb-af7c-e7b1b3b19728" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="fe73ff07-50e9-49f9-aa3d-d57640fe76b2" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}