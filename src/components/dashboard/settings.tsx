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
  return <div data-unique-id="26a725ec-a954-43c6-9c47-e32c49b6d675" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="a462a67c-6295-4500-a2be-01577723f467" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="96a33458-9671-46a1-ad69-1a2ab6ed0069" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e2e235b3-9f54-4409-a2a8-0945974a2d34" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="4d2449c5-8245-4b44-a89b-71f317877190" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="44cf7a86-b88a-4c75-ace5-bdcf31bcb754" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="9bbcee56-224c-49d7-a032-aa700834b81c" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="2017b648-2c79-4261-9825-9b09cb90aae7" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="fa9609e0-448d-499f-bc2e-0618b81372c1" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="65df7bff-a716-421f-bdfe-478e110756c8" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="b7853a82-65e8-4984-8c74-f4e6cea9ee27" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="10325c3d-07f2-48cc-b9b9-3e1a34410e1b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="7b3daa66-95f1-4cb3-addb-7aaaf49049a8" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="2d85b19d-909e-44a4-bc2f-ba525d422feb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ced3ebfe-bcc5-41b9-9f9d-b2e9b822517b" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="fbebb5f7-e8ee-4e56-8840-31b8c479dedd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="794c85d5-ee21-4465-8dd2-1873b1ad50d0" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="5ea7921c-4cea-4424-9b49-814ab5687b4d" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="eb22fa13-f85d-4a69-a6b2-ffb45229369d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="24f9226e-b702-4881-a4b9-5fede93881b5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="428f257d-d22f-420c-8324-5cc0114d6537" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="22d81d96-f6f8-4a10-bea2-889033325ecd" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="baa9ed84-7312-449d-b2db-657a3d0c6c34" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="2b562a92-6c51-4873-87a7-451ef1cd746b" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="4e172038-b461-4caf-8434-ef1b427f634e" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="c70f6159-c379-45cb-948e-6b37aba1f29c" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="2d0d341e-4a15-4bc6-8143-7c2929878bb8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4d76f257-39af-4723-b05f-fa68a08ea93a" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="4c5066fd-3bc0-4517-bfb4-f3a2e02808f9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="d0996f12-96ba-4b0f-9d7f-79a83bd7c073" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="c3d53fe5-cb33-412d-a5a6-262d7c10e40c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="b8ae8bfa-7931-4b12-86f7-a82e3c530b5f" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="be251f8e-b25a-4c55-ade7-8e27994b84b5" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="1f29449f-de65-482d-a212-c170e18def28" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="96c26294-cca2-4ebd-af40-dbf12ca51bac" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="6cf87ef4-53ca-4cd0-9b28-2fa9d5335d75" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8be9c94c-dceb-4f58-b0cc-0e344252d96c" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="fe1fb156-1db3-4047-a402-6466eb7e845e" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="0cb91b24-af33-4b41-b1c2-98f4cfccfdca" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="40784b78-0f87-477e-8deb-949cb5ec83c3" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="3af04c74-e5d0-4eb4-8641-9fcd5c678843" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a1045291-c37e-407a-b97e-eb0f5671aef5" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="ebf390d8-8711-4623-ba82-b7d16a8459d1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4f78444b-3cc2-44d2-87bf-a98ee0b5271b" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="885941af-e271-4510-96c5-33982df4ae3f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5fa45d02-9193-4a2f-b70d-7400840a1479" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="9d4dfd74-3dd9-4b3c-acd9-40f7603d6b23" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ee21d0c3-bbd8-4555-af0f-ef9a7e652dbd" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="24d6238b-f5f4-44b7-8301-e465149ebee1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3049016f-a46d-45ae-9b47-b80a2146f33d" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="49de5c19-faa9-4864-a9f3-cfa077420a81" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7bff1bf3-8d88-41da-b9d1-86d4f9921de7" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="3a6d0fe6-7af7-4bcf-ac34-e933ed86f6af" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f6915871-1f07-4ac3-9b55-2a4fb9fe5ea8" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="7ade9947-c66a-4bbc-bc0b-66fe22f70136" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="db14aedc-4ebf-4190-9c99-e1cb0c6d8570" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="cf4e1fcd-1a30-4710-b012-a1372e7ba879" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e474c48d-a684-46c1-b946-52d95b3f6f89" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="37eacb82-db52-4929-aa99-374439b9b767" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1eb3cb6f-9a3e-4b8d-bb53-1716eb45d06e" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="67a7d861-6d65-43e5-b32d-4538c39b211a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9b595c4b-440e-4522-9afe-a61518152e5a" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="dfa23ac6-f668-4a87-9cf0-750b2b1cf33a" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="cc670d84-e0de-4fd1-98f3-972bd5d46ff1" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="a867e7c1-e54a-4852-b124-0ad6b1b7b988" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="d89a27ec-1b92-40a1-b1d9-2b623e9208b3" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="4f1a2288-1ca2-4877-91e9-3a7ece72d079" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4fa7ea73-2b8c-4cdd-8caf-04bf9a94a3cd" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="ea9d8c2e-a530-41a4-b5b5-0c473ac51743" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fd8fc4c9-50fd-4b18-96e9-dfca70a0d9e1" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="210dff00-e33d-4c91-9beb-ba873eab246f" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="a0c0a3bd-528a-47a0-95be-747f9b6339cd" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="26f32cb4-05b3-4c8f-8741-9a4b419af00d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f2bbd15d-3ffa-4f83-8f3e-06782f421aef" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="24da1142-1f02-4bcf-80b4-224759320844" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="8ebb490f-3dd3-4fbe-8e9f-4538093a8911" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="d611c56b-da37-4f94-a16b-08b360f85201" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="94921f03-cb8a-4781-9afc-4d9c945acaa8" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="e1b7e24a-c2d5-4236-9e6e-d13dd2e90181" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="b9842062-e1b3-49a0-bab6-ae77b82dae36" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="0df4a0ae-b8ae-4d28-bf53-cbd27ccd8376" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="ad74cb2b-0e02-463a-bc53-6396a302854f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b763c2d2-7cc2-43f3-a3b8-ad49d8ffed92" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="469a7c86-d0f7-493b-b25a-003106192837" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="42275305-6504-4a7c-8746-cf8dae4382dd" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="dd058fdc-7c80-4938-bfd2-bad55ad83a9c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fc885cfb-56d4-4c53-853b-8b4f4d1fe829" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="6d721602-3182-4639-98c6-f380d15c9fd6" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="c46760b0-2c93-46b4-8d4a-a2320d3a9ad0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="975c1701-0fc0-4275-8931-2c12f8d8f0df" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="b1184403-27e0-4c7e-830e-b358e1e34ede" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ca2041f6-08bb-45e4-a9e0-15216c4847cb" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="01faf585-284a-4244-8750-8cdaecbd81da" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7b35e24c-0736-4e4f-a6cc-c3b8fbdf1fae" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="d9976261-8fd3-4096-8624-94a1d05702c1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d0367703-e0ac-4e80-b0ce-6a655a627a33" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="be4bbe9f-d8cf-452b-8e68-7671ed461514" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e028612d-c776-4705-aaf8-2a1888402fbf" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="be204793-f66f-472d-8e6e-762d73ebdf7d" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="de9ce8d3-4628-4bb2-b95a-14fa1b687de8" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="f49a41d8-08d2-4b59-a9af-1598426a1101" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0e7f7df7-05d8-43da-9289-84bb9a2b52fd" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="96a8eeba-03ec-41c6-89df-59d0d32c7d18" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="70fbf966-a8ca-4c8d-a58e-751990008819" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="9f1206db-c8db-4ab5-85cb-45f8d07c411f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f72a30ad-22df-4648-a8d7-0f32dd255607" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="7f55e43b-db13-47d8-b546-d6702c50c456" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2c50923f-5358-41db-8c98-6ba1d90ea900" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="92c8851b-c273-437f-9bdc-711a0183ad68" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="670206b0-94ce-4a26-85c9-c04525239bca" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="52f09248-1293-4681-8217-a108864c0296" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="3de7e0c7-b9e0-448d-9c07-a4f831f2300f" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="af2f18f6-f8fe-4280-a8ac-18b54885ed4e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fc961600-74a6-43a8-afba-0cdfc263e2cc" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="994d1135-b308-48ac-9697-5f3c27c45a26" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="7b2f58f4-cbc6-4756-b446-f43c5a1177a6" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b3ea0451-d8d0-4440-a85c-2f7737bfa6e3" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="94313ef8-3199-479c-a8ad-d8c0d8d399ba" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="e0b49806-14b5-4070-abf9-93fbb6d81b0e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="89c691f4-f6f6-40ce-b402-d54108b0c16a" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="b06032d9-5adb-4a9d-b2c9-2db1fdcc4ea5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c70672b0-7c03-4c29-abc6-1f29a6a24b6e" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="d69825e4-f724-4212-9df6-699289c1d25e" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="130a00b7-e091-4040-91fe-00b3e7f11607" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="c167995e-2e7e-4a84-8d2f-0fb5a13ecb9b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3f0a9c9d-f653-400a-9521-6ee2c6641535" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="dda3f22e-defc-47f1-9475-b1a90a531964" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="04d7feb1-ae3a-43d3-89ac-e2318b7be2a4" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="fa190d0d-a9a8-4601-b4d9-ca48203c15a5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f2a98075-6282-43ef-a41f-0c7d484cffce" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="4b9411d3-b9e6-49fc-b87b-9e72eef860f7" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="4a795eb6-3664-4be3-a869-bfdde9a5e7b5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7dd02720-7447-4dde-a1a6-01c2263de9b2" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="0c86da72-1647-45d9-b1f2-e90ab2b63aa4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="640ec5d6-085d-4d9a-ae28-0c83d3a960b5" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="cc9794c4-d8ef-4975-8e5e-c8e22a45fe42" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3295b706-634a-420c-b56c-395aca4e6450" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="a0de3c06-aff4-40ce-bf40-a4d6b800f434" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a1cd2357-053a-443d-bd15-614676d13f24" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="3323f9d0-4203-48d7-b18e-306084382c68" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="13fc3ada-4a84-4584-be6d-a8d05804a831" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="a613c80f-c169-4362-aaf7-16dd32c1a30b" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="94f01c21-7662-4912-8d16-6dd713c0ddbb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9f40b7eb-52c1-4c21-9615-b17a35541562" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="2bdc7f94-8a1e-4d57-ad37-5f91d42f6f8b" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="ac182600-6564-4abe-8469-9b0d69594ef8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="22500e1e-c549-4b3d-b4e5-b09897d05f20" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="5092fb9c-2cb3-4a12-9f54-568940c9a80c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bca1f1ad-65bf-4492-b664-2db2fe024db0" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="355b5e7b-5cba-4388-9894-c9ab94591f46" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8a995be4-1600-406f-b4fb-e4563f0f1f3e" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="4ab24249-d8ca-4915-9105-d72d669e9c74" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dcb6f4a6-5960-47e7-8e1d-0191a749e193" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="c464dd03-cb6b-485b-baf5-235e6d4b61b6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f020e1d7-895a-4c82-910c-bcb2d2a9f65e" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="9a8614c4-f457-40b7-8780-c63d69d48ed5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="afee0caa-285e-48e4-9113-fce04dc5c288" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="cf6091ac-6268-4d1c-8e6a-011d8a753666" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="c7f03cbe-6bfe-448a-8be1-a21a7f83c256" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="91be37f7-1ef4-4573-abc5-52f790deacef" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="a1ac299b-85fa-4a9d-9da6-119aaa7272ce" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="faf0f214-7157-4cc1-a383-9605222ac188" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="e96b5a47-8522-4e44-8e8a-8a7982c34205" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="07a342f1-b4e7-4e84-9611-cb9b7e95670b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="287d5738-c6dc-4360-8f59-367e3bddac7c" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ad47586a-3b15-42f7-b775-e0fd44b331e9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac0b7295-f34f-4224-a839-05900083ea6a" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="9109c2b0-5784-4abc-b98a-d34e5a9b2c7b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="29da43d2-2685-4816-bfe8-216ec7ed3c5e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="f09097c9-01b8-41d0-ad2c-3565092cd9f2" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="879c4e50-54f1-43e7-bd23-c34a5e67b30f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="8577daf6-f8d4-4eb9-b6c4-a77711dfdced" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="cd342d67-0c7b-44c1-90db-00372fc5e3de" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="99f57cd3-791e-44d5-abc4-87d4c219bdfc" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c71798ce-d6d1-4908-84b2-d0483f7c6b97" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="977032d0-496c-45ba-aad3-3384117ef61f" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="9e3abeaf-c59b-42de-a170-40c3b785ac07" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="094bc9f7-c68e-4242-9339-7555dae46ee6" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="aae51e39-5428-4155-a61a-408c0cddd948" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="d526b2e1-62e1-41a6-a1d3-227161bc17f1" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="52e006d1-4392-49e3-af83-490d85813345" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3cc4aac7-6f88-4146-97e8-767a91bee800" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8746549d-10b5-40b0-aa1b-d1643332f793" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="43f88e0c-5466-4a04-be42-8173812ae928" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1a813bda-b680-4d57-bcfa-1d8f56fea0f6" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="de6431f0-d454-4eca-9fcd-b2e0da8daa11" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="52176cd4-77fa-4981-b618-4b4c3de1f85b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="00a2def0-bbe4-4892-90e8-64af800dab74" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="e13d31e9-2793-402f-bb43-23d9d200c945" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="050d608c-9ed4-49c5-9e21-91dc9f7a8d51" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="dc867357-bd45-4dd2-ae54-76fd50ed3dab" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="21f96119-d1bb-4867-95cb-363acd1f01c1" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="cabd89d2-8e07-44fd-9f95-d5187df50a85" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5ed62cf2-ec83-47d0-a914-4cd8314309a8" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="3681cc3c-503c-4a26-9deb-bd7176183a72" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b5f3ec76-c8fc-467a-8781-c47d29e3ec8d" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="f11c3ffc-f2fa-4982-9f87-fe6a78d92289" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="0c94bcd8-d821-44c4-a399-d39fd33dedfc" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="7a2849ae-246e-4b2e-8b67-a0d3b5809dc8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="018dc90b-3ab1-4297-bb90-4fe1b2856cab" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="0bcd3e31-fe4c-44fa-b45b-b85b2d127a47" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="7999128a-6105-4075-8bcd-6b972a8664d3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d22cdd7b-71ae-4538-9cc9-d815e5e80109" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="78a575e7-f4fb-4eac-904e-349e37aa4f6d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="34cdca2a-efa5-4211-8325-882dc805b2d7" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c810175f-8097-4cb1-a3ab-8b18f46e75b6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fa5a313f-a63b-41bd-9cf7-7cb2b304f5a6" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="9c3d358e-d170-42c9-81e9-efef2503b94e" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="6902f523-3570-48c6-97f2-dc57becbdb68" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="14aadd68-89bd-4016-9a75-09ab2f1eb7dd" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a8f7dad8-a610-47cf-a797-12db21c81b4d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="56d37de1-0081-41e8-8eac-d9402bf4ddbf" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a2d9c13e-c81d-489b-807c-87efbc57ca36" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c9babb25-c800-41d7-af42-0f4dd2c9f403" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="56b26e6d-6908-4436-a905-cf9e6dd9b4ca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a359a506-efd7-400b-abd1-d1aad42d3c80" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="cbdbc73f-14d3-49f1-a98f-c82858851206" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="c3de1675-2ab6-45ea-8046-3772c45a4598" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e409ca16-0f86-4b88-8ed2-70fcdf918853" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="18e90778-e118-4134-8963-7feba4b8eb3d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f8f5648c-e8a0-4e0c-92e4-9a348c37abc6" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e6ca95d5-8182-4ffe-9136-879557bc5921" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e7d324d2-6356-4586-ae99-be7cbc1afa3e" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="31ea1a36-7dd2-49fa-860c-6f4250652e91" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fb2fb280-7a38-4f97-9d16-6eac08979773" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a246bea5-67e4-4446-814c-bee1cdbe74c4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="83deb9e9-ecdf-4935-929b-3c97e1f9f16f" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="5899d9d8-0a8b-42f0-a9cc-806305d2f270" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="d277ab42-4c7c-480a-9c7e-7a914b8a20a1" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a6600cc1-375f-4e01-be99-dde68933bb10" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="550a79de-fc6a-432f-949a-6e7242e080b6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7281bdfc-668e-4bb0-b1e1-c99e10d545c6" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c17bfc58-0be0-4918-ad4d-00935ef84acd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="44c97fc0-476d-498c-b6df-be1500a6d041" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d9aab815-2003-4e37-91f5-f4a8671aad47" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="df856d27-33b9-46ff-a26d-747d51c222ee" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="27c346f8-86a9-4105-ab58-4186e5d5c4fb" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="9582dcc3-72ac-4e02-9a29-d9446b9c057a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="1a4f43d0-69a5-4712-94ac-9830a42bebb0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f7e2310b-6dd5-469c-a3e9-bec26fdd1908" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="3111001e-2683-4846-b556-f16ebb66cc61" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="2a8082e4-0f61-4bc0-beee-462df760d684" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="927b6b74-9fec-4471-bcf2-0490e3787d36" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="7d633ae0-4d15-49f8-b5d4-f4dc6aff9ed9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="10703284-5507-453f-b5f2-243617f40b11" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="b61a3a10-6375-4193-8f89-93b27304af69" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="7ca85a9d-17f2-4904-ae6b-3e2e032d3cd3" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fc5bae31-64d2-4adf-965b-4e8274f84450" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="4ce71a8e-46c9-4990-ada1-f2fa58a26cd8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="55729a1c-1791-4f61-b1aa-df92cb8463d3" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c5b70bc4-3984-4ff1-a72a-ccdd586669ad" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="09efda15-37a1-46dc-972a-b27495f9b0c1" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="aa6cbaaa-b84d-4581-a6e7-016bffcda044" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="b729a8ef-e9b2-4744-be2b-31266ecb5c4f" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="c2970ee8-50c5-45c6-aac3-1d69bceda3cd" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="6073ea6d-c5ff-434b-b725-8ff08c268777" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="67a82b6f-4262-447c-b598-4fb8886bed51" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="521b47a7-fed8-4236-9901-dc104c691753" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1d5cdd53-47c0-4ea7-922c-2f6ea5f832db" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a312b3ad-f06c-4cb2-a190-ee99ec062ac7" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="8bcc2129-d2b8-4601-9912-8533fa56bdae" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="eaf0c1fc-6ced-418e-a69b-5adadae47790" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="8ba1ef47-e1e5-4231-ba0a-f91bdcfd6043" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="5d03a4a6-e02e-4f6e-8d24-6041add6efce" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="5e2b06f7-957e-49bb-b5f4-587b63fc67e5" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}