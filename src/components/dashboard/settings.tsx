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
  return <div data-unique-id="4bb6c9ec-9101-4c8b-900c-36bcd90e6397" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="c5cf6f56-afce-48ca-b6e9-991a7090375a" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="a1c8e622-a295-4dcb-9ebc-10e64d133b5a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dce45950-9047-4827-98aa-fa8f9aeb0260" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="86ec1e66-6dcd-46a3-9880-7353619ef94e" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="fcfc29c1-3b4a-4d5b-a9b2-3737293fcdea" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="ffae3d49-cd46-4d90-838b-1956464fdca5" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="d17e5e4e-4816-460f-926d-bf957a23fba3" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="5e136bc6-0c25-4555-b472-11be042dbd07" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="ab3d9234-754b-48ac-b7e9-071eea36bab6" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="8b9d009b-cfd7-47f4-b898-e064499f686a" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="27b0935a-f95d-4e64-b216-dc535bd92a0c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="4952ffa6-44e1-43b7-8107-d85fbc0d85b0" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="f974c347-4380-4df7-8de4-494d6f9c253c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e7562666-9f99-4948-a149-e8da3669ac8f" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="d3cbe265-a034-43a6-b53f-d81432f98041" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="47a24b6f-2fa1-4251-8d79-346029c0d369" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="d1e3d072-c263-4345-88bb-7bacd1df9da4" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="f7603c62-bafa-44e3-8f23-18e87b5719ef" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="02c06981-2d7f-4ee4-bafb-2351e98aa5e9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ca5bba25-5852-48c8-9c92-d299249ff796" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="0b1883ab-af8c-4d34-8b0c-e8994869a643" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="1619e7f5-fd92-4d91-abc2-a09353fddb80" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="baec8243-3fdd-4048-b8a3-49437643e5b9" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="e311f796-e5df-4eb5-a9eb-b98e97c32acc" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="4913094a-24c2-41b3-9f42-a094ff3529ab" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="3f829f1e-d113-4dca-bfe8-067a19704ce5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="20944296-c663-49a9-ba47-896a2ec80620" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="86e56a7e-5895-4fff-ba60-47b94274bb64" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="330c8a17-022c-4aa9-85ba-84ae1c111bdb" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="0d417f03-a602-468a-9599-043ca4d3d5f6" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="ece679e8-ef80-4699-9815-75a9af84a77a" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="ee0b6d5f-cfb6-4c13-800f-bb0d70753e40" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="3267410e-05d2-43df-98ae-7ba0e8333452" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="2cc1ecce-1899-472c-a124-fa0f0eff89fb" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f2476a5a-f806-4c8a-b38a-e6cd386d473e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="49fbe02a-7df9-4634-abdd-a04e7e26dbf6" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="71d9d1a9-944d-4a7d-87c4-052ef21fcd3d" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="44cac8ee-973f-416c-8951-3246427a7258" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="21383b47-3ad5-4b96-b198-949041c400f1" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="055636b0-fc11-4af2-803b-9ad5cbb89459" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="eb44ff2d-e507-4c4d-b5f2-023b69802477" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="6abab775-3cba-425d-8d2d-ced63ff4b772" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac90fe94-2853-41b2-9ea4-fa5d111b19d8" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="9e7ca4a3-c42f-4463-abe4-154a1073ed4e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d128cf59-8457-455c-9360-c8a54d0ead10" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="66ad1e72-8135-4e41-b5d1-daa8db5ab7ae" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2cc8d3f4-6c0d-4a30-a620-09e97e2539b0" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="df33fbbd-593e-4295-91b0-d741eb363693" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="85348f0c-506d-4da7-b12c-a27a98dbb9bc" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="642f06c9-c1d1-4153-ab05-6edb7f586e01" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="edec0665-b704-40c5-bf5a-fefcfd6b0855" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="5034df3a-578d-4874-b62d-29f1cfc12a45" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b835aa68-db38-4f43-9571-ad241ef0e3ce" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="a3c482fb-37d2-4608-92aa-3f0cb4d76053" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2acc174a-6908-4c03-99d1-97c2fe0f12de" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="b315f286-26d8-4695-9bfb-0e0ac955b9e0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e48af6dc-138f-4466-8681-f84b330ea7eb" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="f413a960-f96b-4bd6-983f-8640f55c60dc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a24151f4-d9f4-494e-89bc-fbf85f636459" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="6a18c773-5af6-4e0d-99f9-e642e6ca543c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="80460ec3-da45-417e-87c1-9b23095ee733" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="43ee3bf8-5939-454b-aada-1d86d2220eef" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="fdc6a236-4629-42b4-97ef-21d0be328fe9" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="32335aa5-5738-4fe6-bb48-1114746198d5" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="6ece2389-6078-48be-92db-91571f43775c" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="5ae246e7-4d11-4020-b1d0-53cd7134acbf" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c3a3010a-3daf-4b9c-bcbb-b545bbc5f40f" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="6e10443c-34ea-44ca-aac4-8c9f3fd99362" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9cb230d4-35ae-4c64-ac0c-d3875b45c4ed" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="66fb1d42-014e-4217-920e-779a250ab443" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="2a496922-90f2-4ee1-8dc4-7e2b33e46dbb" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="53a83a3d-5fee-4622-b43b-ec3001f4191e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="385a6cf4-d0d8-424e-b62f-1ef4520cbd15" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="ad7bf17f-6a86-467c-b804-da7978e5d92a" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="04712390-eb41-4254-9654-c676c02a23a0" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="7a1da2d1-6ef4-4b18-8e88-b9cd6844eac6" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="278ea051-327a-4072-a597-a55ccc2bb1f2" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="90ce8164-3096-4ef3-b693-9dcc35b635c9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="7ce92c44-11c8-421c-a689-ef892b436949" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="4d3e4912-45f6-4551-97df-5d336b3ded7d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f52bac4f-0c0e-4119-b134-79f1a1ac8355" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4a013557-e50f-4eb4-abfd-08cde2afd8ec" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="92cd9527-2c9f-4b9d-a327-e27f194c847f" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="ec58c7fd-6fe5-4873-92e8-95ef5b0277bc" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="4228300a-b300-42d2-b9db-96e1cedc8635" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cc87fca6-0cf5-4186-9591-aa9d14367d12" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="df831776-9d5d-41d8-b4de-4f40a1a88302" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="93da6d63-80d6-4928-a28e-57da972e857f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9a6b468f-55b5-42fd-8b88-15b43b71cb56" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="d715d5a6-cf52-49b3-8d73-0f55fe6527af" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b6662683-1e8d-4a40-a973-1b1e0929d84b" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="c3e7515d-9218-4ec8-b728-a3d3534741de" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bdb8e0d4-62c5-4d33-adad-49e0728863b3" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="0eda0e89-329b-411f-bb71-8d99fa5204d5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="da0c55bf-a7d2-4f17-b521-1dc2cba96fb5" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="098d7ae4-9ccd-4345-96c5-da878bfb3cab" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="38ed7dc2-ca81-4f73-9977-0604d19489ff" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6cb115a3-4158-4070-94e8-2696b37a2577" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="c013e0e5-1eca-467d-9375-f3a509cce737" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="d8942308-9bb4-4f66-91b2-b63a6f695cf3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="776f4639-ec0e-4c76-a652-b29e983d6cc6" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="09608faf-c948-4a1a-b325-bf48925d9130" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="04dc9536-a046-4ff6-b7c9-31534e444e53" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="6a5c3d54-0c8d-4b51-8d14-3af7548ed7e2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c6133772-b9f8-4bc9-960c-8ebac597887c" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="b5527289-0162-42f5-bd00-81eafd04c040" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f476c4b-abba-4c2b-b026-6682b3688972" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="67e1b212-a984-466f-92af-56c4cd059d86" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="279239ae-9708-4ede-89a5-c2e7605627c5" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="7a9a2e61-9051-46aa-9c34-bda4a9d548af" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="d0d15add-efb0-4d2b-9970-fbfb941fb59d" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="7a2dcf12-5427-4cc4-8af2-df835a8653cf" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="041857b4-ca9d-4dfe-a56d-ce63087cad93" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="1d6e9088-1ce5-485a-9938-803f7707cb3d" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="d6a832a8-292f-476b-abc1-138a433989ba" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7f17d3fb-e09d-4dde-aa88-5ffaba731a88" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="49937a3c-5ca9-40a8-b45e-afc7f8c3ea55" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="dfc118b4-a57e-4db3-918a-c7b3085d96ee" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f855d9a4-f47f-4bff-9895-b922c56f7aa1" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="a6bab7c0-46a1-41b8-a23c-eaa5c8a7fee9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d190e16e-29f2-4235-be90-b68f89cadd6d" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="27a50890-68c3-4c39-b208-39e0799e3936" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="139146b4-6418-430c-9ab1-0a7bef3c09c5" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5a001411-cbf1-41c0-9ad3-add7bc8ab1da" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="89f6878b-5438-46c9-b2d8-6e4ca6dc3b92" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="2d4c6cb3-96ea-4d36-88ec-0d6546b490f2" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="548271f4-dc82-4b52-8401-5fc6c32c7051" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="9ac168f5-4b36-44aa-8c78-1d80fe6b271e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="48333cb7-05f7-4bbf-ae45-0813ffddb6ea" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="5ef2ac97-57f5-480f-9197-3de9c6cb99f7" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="66b78bd7-b488-4bcd-a264-c5f058b29a2c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="de85f3c5-8a23-457b-8f9e-b55696b4afe7" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="b1109560-4615-4391-91b0-ef80099733e2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c4beeab9-30ab-4921-a14f-d123582df9e1" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="8e3e78e4-543d-4712-b2f2-28326653563b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dc5d1cae-c63e-4fcd-b8fd-189be70de703" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="c26e6a09-46bb-45a5-8678-73582c5cb13b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="363bf156-d924-4867-88d1-8ea493c4e15d" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="5091774b-6327-4d1f-86aa-c2ed8572f629" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6544ea8a-f8e6-4efd-b496-f940c1c43c98" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="e6631d1b-9ef7-4491-9180-f751ac98822b" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="05529775-5e92-4f93-87ea-ab2e386f66b7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="69582abc-1bfb-4f71-9b56-7a0d71c10fa7" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="c9e695e5-a642-4293-bb9e-821619c3984d" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="93ca4996-a3fa-44dc-801b-6120c050f3ae" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b4323c64-aa93-424c-8fdb-036366e346ba" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="5e8d60fc-454b-4370-994d-49205ed43a1e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9739d4e7-3fb1-4f46-a10b-604aff060d3e" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="eec20dab-a3c4-432c-a05a-c789e9d90243" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fc0fada3-7537-476b-8c70-8ec4b2bfbe22" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="8337b0dc-9b61-48a1-8603-aaef44aaad2f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6798931e-5c5e-484a-a2b2-85df284c9e55" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="d40da36e-765a-438e-9307-c0de718dbc38" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a5fca16b-6fc0-460d-8b37-755e02702321" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="0650ae1c-bf82-4442-a106-7e72fe23ab02" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a9088adc-c3df-41ae-a661-3e8b40be8980" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="899e20d5-12e9-427f-bbb3-afd730c42477" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="64c4ec24-fe48-4eca-b137-4c9c96ec5253" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="38fe2951-6d7d-4bb7-a683-100d086549c0" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="c72189b2-5b89-490e-9a77-96212e62fb91" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="79c995ad-98ec-44b4-bfde-3aea3881f779" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f7429ca3-7c4b-408b-99b9-a5bc7bb4a4da" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fe9c68da-ac3e-4188-96d0-9f51dcf5cefd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="46638b2e-79fe-4c3a-9a13-773c75c48dc3" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="e68d034e-9473-40e0-baec-586c9fa0a4ec" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="42e01735-1e73-4fd9-a91b-0294a961215f" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="34d28a3b-df1b-4780-bade-e4fe324d774f" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="18818014-1c53-45a7-926d-76e3d885a192" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="a519d19d-8062-422f-8fdf-9bb8fa11d138" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="c9126c11-d981-49a7-b99a-005751dce330" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="21bad55b-5b7b-4532-93e0-c6c32184663c" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="7bbb9010-fb98-4669-9bdc-3587172758c0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3bdaf0fd-dd47-4aa9-89df-b3112ff9a02d" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6473bf5b-4020-4831-8645-3263790a295e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="51b5ffff-f626-464a-8f95-0fc09daf814b" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="47f38dca-e044-4090-95a6-293bb4871ecd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="8c5971b4-bf2f-4c17-882d-8d5b0e8f6d81" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="1cff065b-9738-476b-99e4-1960fdf73ba0" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="1ffb64c6-3ee2-4e74-9771-d32b92444b6a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="427eec83-bc43-498e-a2f6-450cdda955ff" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="086fea61-01bd-48ed-b40d-0dee26e5f043" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4beb2293-df0f-442f-972d-4138433f8271" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="4b75d97a-cdb8-472e-9ba1-ac9265a42da2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8eacbf0a-48bd-4738-aea7-e290b381d52f" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="942c9097-0139-4a11-b9d4-734291be1e8a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="0c4fc661-0620-4ccc-b4d1-2173a73fc57b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e2be2fbf-7baa-4269-a886-4f5ce98eb652" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="4abb1e19-b7d4-4aa5-850c-c58aa6b0d154" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="01b87742-2551-4664-a57e-8fd0ef4e10d5" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="c1526949-7e45-4b69-a6fa-342f18c25e2e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="f626ac1e-bd84-4f4f-9c40-122bdfe05152" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="7b95d6f8-0e89-4613-8410-79f33c469d7d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1a617297-8491-492a-b764-59d80c665b8a" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="d6ddc9aa-ff0e-40b0-8347-976016727237" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="94211018-7df2-4e49-bc9b-4ff2604789a9" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="5752f4db-e7ae-4140-b3f0-afbd230d85d4" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="65e41e5f-bbe0-4734-8785-771849cafc4d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="d2817c12-87ab-48dd-8b88-e6400d17ef80" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="04684c04-544e-4d55-b28d-f09fd8c78bec" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="d2144f4f-f7ac-4d48-b652-e2ce89583684" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="18ef3bae-9722-4cc0-9beb-bf1e0320e30c" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2a2a1d20-648c-4f10-91a5-14a2bda7b653" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="488f1187-eef1-415f-998d-9431d4f97344" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6b81bff0-9f6a-4974-8027-fc368b70ed3d" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="aedd7ac3-549e-414a-943d-749484992220" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="58ab353e-3932-4b48-99a4-f098d4622065" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="9c6a1e7f-eb3e-4c4b-b1d5-094beceec136" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="ed35ec82-cd3e-4751-879f-e8e09cb40492" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="5ab54ed7-836a-4d71-8d13-938a1d776c8b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a199438c-84cf-45c6-a332-dbda00b1f943" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="55f5718f-5fc0-4dde-82d1-69a54e527b7a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="b2d10ca5-1a15-468a-88f3-8ce2d2d9f097" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5e8cf565-b72d-4220-a71b-b8c5cb71c473" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="5b3122c1-9075-4278-b1ef-94b5f5675e70" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ad695542-b3b2-43a3-a82f-700fade54118" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="26da3d08-fa85-4f40-911d-65ec603a52bd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="dac40b41-b43a-4c0f-ab3c-161c5b8f5e2a" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="93434104-1322-4940-904b-905781a8977c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a7a81c2c-db59-4009-9f0a-837c63a81fb2" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="4504d49c-f2f2-4eee-a4e2-7694136d2672" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="cc204b53-52f7-4424-a35d-b3e4c6bdd7c8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c43457e0-dd03-459c-9534-54ab9833a10b" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="1a11ec92-07f8-4ce2-b147-2c9f4216496b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4f3847a1-6598-451f-961a-aeb00bc4e529" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a07e6b17-c823-4adb-972b-fe4cd3c809ac" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="fbe5d98d-3863-4d8a-9f86-31d749d496c4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b4c93b51-3d48-4c73-b3ed-ea4841854896" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="e08d6899-5f29-4630-9931-bfd2e34dd70e" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d6301078-0f7a-499c-b19d-307bfd798a71" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="337192f5-ae7b-4390-928d-55abca37169a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="433f4a28-0b97-488e-9ac6-8f3cde5b94ce" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b11fe33d-dcf8-40dd-87f3-afe2aab81c13" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a42b2d63-5034-4dfa-8bc7-6ecde0850ff6" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="0f9e6f11-4bd9-4442-a00d-77fdede88f67" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="5901e6c4-6c00-479e-96c4-aee514eba619" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b291abaa-5662-4201-8016-e5395ca548f9" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="3071afd9-f1b5-4970-bb59-dea6b41aede1" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="241f2c4c-05e5-4880-8ea0-8310f2d88113" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f7d8fc0a-5834-4d6d-8810-0b535f82e13b" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="f6e57c1e-db1a-4cdc-9da8-cc4fd42a36eb" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="68de883f-8dea-48e7-acf1-ffb4f8f9e5ec" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3fc97b62-5194-4f24-86a2-875a408374f0" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a17680a2-e7f4-4717-879e-ce1a9d8ae40c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0ae6897f-9227-449d-b550-31d5c62e7688" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="4ddd78b1-f52d-4061-9906-634e69691900" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="23913728-1985-4196-8df1-f13b0cc041ea" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="69ee5c55-4bf8-4ea7-8dba-f293cf358f80" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="d99d4dd5-22fe-4eda-aaa5-a5800f5493b3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d486dd20-99fa-4d8b-a435-7df3a8bbb134" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3c5ae50d-1f11-4dfd-a3c3-91bf3714f76a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="52c2e03f-faff-4b29-82bf-ca3ea537601c" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="3edfc3cf-c9bb-49fc-8b53-82baa50ad753" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="84d597ab-02ad-4d84-9853-88dcd3bbc84d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="757482e7-2091-49cc-9c38-b7da4898125d" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="adcc4fa2-0750-432a-b91d-ebcfc20329a9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="fd7c47c6-b09d-420c-b9f8-d0f1fe5065cc" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="7cf4fde6-a26f-45c3-ba29-9eb5de9d3e7b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a020e283-6e2d-477e-a76d-e106d6f6cb69" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="952d93d5-c6dc-4b98-92c4-6662547ad4f2" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="b73289d3-0bcb-4d95-9d49-ab4d95313a54" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="df8a8a69-9118-4687-8314-2bdfe581e2e5" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="6f795dcc-a7e0-46fc-8365-712e46560bb1" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="ed20ba31-c890-4202-a577-7917da01e6f7" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="ae04ae1a-22da-404c-a1b3-c079638a0015" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}