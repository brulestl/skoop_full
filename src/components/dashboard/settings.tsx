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
  return <div data-unique-id="bd50d4cb-137b-4c96-b4c3-fd6b47a87c74" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="c75197dc-8ad1-4a82-bb56-4a30f986fb53" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="4b066324-f955-4e2b-a2af-8f01f0ad12c5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5811a1cf-17ba-4cc5-9edb-1de1d898acf1" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="8683b4cb-165e-4f72-a388-1e8019611bd8" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="5b554734-99c6-45f8-b047-2b02c943c462" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="a407ed70-0497-41ef-abe4-d1d3253c1d56" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="49e2886e-7409-498b-b881-55a33798473d" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="985e7c45-55e3-4a54-a8e3-36eb93e798d9" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="a00a6c7f-7ad5-4d09-ba44-8a991ca905f4" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="b26e9684-7323-496c-a7d4-3a786c99a8a4" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="5fe1c578-f435-4536-a3fc-634ef8af8a96" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="ca587493-0c47-4208-864a-c15bf2c2de0c" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="3eccc7ec-741f-4ad6-89ae-729d232d7f7a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c14ced7-b85a-4f0e-90a5-50aef1e3e02a" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="e66da0d9-464c-4e1b-bff5-4e889a92fbc4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cfeec942-5749-4156-a18b-063b00550a42" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="d7f5e2af-5072-47a3-ae4e-4bf279f7f44a" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="1a45d183-c5a2-406d-b6bb-c98a5ef108c4" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="93163998-0ac4-433d-89bf-eae06e5db077" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a33036d2-1c93-49b9-bea5-1a42c0a824aa" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="2618f3be-dd62-4b2c-9791-20e9f72fd85c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="c196dfb5-39b8-408a-bf2a-04e3dc7862fb" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="4c316e62-7dfe-4025-bc89-c220b2c9c8a5" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="4905aa36-524e-4f80-9f16-b2d3872a4340" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="0a14fe6a-4b8d-48ac-b8ee-1ee414041786" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="380462d6-ed00-4324-bcaf-89c6bc7127f3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd822f41-df08-4ed1-b19e-0f63d574ae8d" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="6ccf3759-4df8-4b6a-95a2-b01d4652b921" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="547df20e-c4c3-49e7-898d-5fc7ad1a42e9" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="6ee1d264-966b-491e-a740-1d7ecb5e0e04" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="829abfc9-41b7-4eff-9332-cf2b2bc3b377" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="bf1f219d-63ce-4045-ac22-44239a47fe37" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="097b088f-78c2-42d6-b1de-79795f405d42" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="88041a3e-48d2-4e2f-9b36-7cbaf023189a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="fa944c0e-4114-42dd-bb39-c7c89572eb7f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="86635fd3-4002-41c1-abfe-0a184aa89c3b" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="62085e6f-e82b-464f-9df7-15f44d42dd7e" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="be63524e-a109-422b-8152-3697f26e21b6" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="64329498-b5ce-42de-80e1-ce37dcf3529c" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="8699843a-4275-4c48-969f-09c72ef22f8d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7a9413a9-070b-4b7a-b427-4f31838c8e9e" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="3e6c0fe0-af56-4bb5-82a0-5f2e7e278613" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e945d966-c846-4612-a27e-db2b72b121b6" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="f7d174fc-0f8f-4085-b8e2-57d4d1a72745" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7d2fac03-3726-4db9-89c5-7cfe56a3d48a" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="4a1ede2a-ae7c-4ad2-bcca-b12fa8a2b7aa" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2ea113e4-7057-4f29-99b1-9c5b9bba0e1e" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="3353a86f-238f-4017-b6e9-03d3c742659d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="51046ead-7d63-46e3-929c-c5739cb00dd0" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="0894f43d-8767-4d5f-b176-8d7406bae57e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="101a4eba-ed6e-410c-b998-8f6761a51a0c" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="77ab36f2-076e-46aa-88b8-9500893023b0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="436bb386-f2e1-4a7b-8fd8-4d5bcc26dd2d" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="272c4c00-55c7-48e0-8370-6023e2cf0ccc" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ebb8c837-7087-420e-b058-b6a1fe0f0604" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="86442bc3-98da-4c49-a85d-72805ca563bf" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8230a21b-f86e-477e-a51b-8f072c0b8420" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="103e9f43-822d-4e60-8e86-229642ca85f5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7998f6e5-afd2-4ef3-b5ad-299b29a300e2" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="c11f7ab7-c27c-434c-9341-8fa1e26a33c0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f23a455-5826-47b2-9ff2-ce80530ca973" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="a0b97181-37a8-4bdc-a09f-c37a01dff171" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="ce81524e-7187-4339-95e4-1ff14c19d705" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="39ee6621-afba-4a4f-a80f-623e4b65c8c4" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="946c13dc-cab4-40de-8a28-56bffb8888e1" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="712c032e-ea95-4166-bc4a-f90fb3c107c9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bbf7ea32-7871-4318-bd25-043e5af1c417" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="94150c40-5542-44f5-a641-fe6df6b34583" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e9d21a90-b86f-4cbb-8c6d-b7795e2c213d" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="277fc4c1-91b2-4ba0-ba86-960ad3fbd022" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="cbabead6-28db-4aba-9310-a13b7bed9ae4" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="43e7402c-7315-447d-9112-dd2c1f92832b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7bd99d5f-5c7c-4f85-9371-81b25b3f865c" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="840518eb-9833-47f0-bc33-3cb91cb2320a" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="21caa9c1-92b5-477c-b37e-65d555991e54" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="bb71ec22-84ca-4771-9e71-1628c2a1fa2e" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="74f24802-bd30-481f-8f38-b69c56aa445e" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="67570a44-c836-49ab-80fe-652f4c75dc72" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="53b8b887-177c-41f8-9ea1-9e02852674da" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="742c10fd-82cc-4cb8-8c2c-187b1d4f3b72" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="fe0629b3-4e70-4e32-85d4-57cce0bc1de2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e446fdc9-c7de-4881-99b2-17662611c4e0" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="30b64887-eb64-4ba3-b4e2-56a039a33075" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="4c6038a3-ea9d-4da3-8d0c-5577978dcbb6" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="0d4845cf-5d0a-4af7-9530-bb96733d6a0d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="eb88ab17-00d9-4a1f-b281-f58e3ecfecff" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="d1f1ebc9-96a3-4b0c-a251-2f4eedda08f1" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="4fa70ae8-8de1-494a-a2f5-6436e6b63fde" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4033794b-58e5-47d8-95d6-c0e112b41423" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="951ce0b1-dc43-460e-b2c2-09f65aab938d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="32b1b7a7-f3a5-46f6-aad8-9caa86726d26" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="6c4aa108-df9b-4dce-ad12-4ab95a596bbe" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b7be6dd4-4e39-4b0c-928d-be14db8a848e" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="62cc6509-6429-4334-a5f5-c968a05f4e5f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c5e323d2-55e8-4d17-b050-1cfe8a4513b7" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="e51d7159-37fa-4983-b670-e29688d1503e" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="adb54839-1e17-42a1-84e9-0491cfcafb52" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7b4c953f-1ade-4684-9a77-5191148ed549" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="62a4d664-eff8-47f4-be69-485a35241f3e" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="8c5dc824-c8a7-4468-a4c3-a163b26441b0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5a625816-8d97-49ef-ab8a-1a6ac3c6c303" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="bb103203-681a-40a8-9c47-ca21d9f4c432" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="818b8b8a-1406-4637-ab22-1db934a93128" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="35ea8156-a61b-4160-b1dd-da6cc048fef8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6f272b1e-5b77-4d10-aab2-2ca54958db26" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="220e8a66-884e-421f-95aa-4d0e1a4cdbab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6f35adb3-a6d1-43b4-8082-71065b306830" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="d98f22c9-9192-4e83-b13c-3dcb3e867fcd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="39b1fbe6-3f9d-425d-9628-44d8b5c9084a" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="f7a0f378-fc0f-46dc-8d6d-f68318e8328b" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="bf71ab02-2f7b-463e-b99d-5ef3607a6106" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="675d31ba-e51a-4d2e-b22f-3c57efab1149" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c786652c-7d3d-45f7-9cec-61de05e4365c" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="8778ca83-d2fa-422c-87ba-92566e1d43ad" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="07ea7a14-9123-4375-a95b-5418065f8b6c" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="59ff9682-a59b-4d2e-93c2-0a50cdc2db45" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="5675a27a-35b3-49aa-b892-cd92082ee46e" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="02878fed-5c28-4e21-beb3-68b4ec6d9be3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="66f1abca-c36d-4d8f-87cb-be127a6250d0" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="20b2e021-c6ea-496c-8372-82b6776950f7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4e481558-9ca5-4cc4-aa28-403ce9d0cef3" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="40527e73-908b-4a18-9295-27f7518e06a8" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="e21bb1c5-646a-46ce-bb47-7a55bfcdb556" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="4afb8091-d785-4857-a1d9-d95e70b77d3a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="496f0a37-174f-4f45-8509-966840782676" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="99f7060c-6cde-4997-b0a3-cbcb4f5746de" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="42fde91a-91f5-481b-b074-90d5b2d212a0" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="b8229bc2-940a-47e3-b22f-ae75eeef97f4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="890f48dd-3e51-4e8c-959d-a0a194d76d12" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="f2ef3d38-e0a5-4f10-8c83-cd2955ea60b4" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="9a93dab6-fb4b-44df-a3aa-239951f8ad96" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="aa566b67-508b-4de1-bd37-45bfdb0acd67" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="ba805134-9f92-42f0-86f5-bc0c9ff01cb2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b1f0865d-39ba-4754-8f49-3909225d2af4" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="3ce2573e-9426-4051-8b13-f79b1622052b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2e2c61cd-4750-4a50-9965-7c8907d1ce0c" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="b3f36e30-f7ad-48d7-a0c4-4072413f4293" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5413f2e4-1bb7-487b-ad91-5a53461cad41" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="fc42c870-6f17-4509-b0e5-d42a85add2cd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7dfdeef9-b241-4b45-a35b-b7c484e5c8e1" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="059934db-d04a-4897-b7c0-c9716cb7a09a" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="bfb43574-c895-41a1-9b1b-1059ef28f391" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="16f0c64f-ce05-4b8b-a4a8-bdefa5a5b279" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="e78b7207-a9d4-48c2-9897-14d268d1e3d7" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="b0755f3d-7dcf-456c-91ec-1a4d5af02353" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b9a187a8-28af-4152-9967-054aa298d52b" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="74ad44d4-1c28-4b07-91ba-d51d93b53253" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cc693303-2fc3-41e6-bb16-85b96b21e1f2" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="920cd8a7-97a7-48dc-ae73-69eab7c91a45" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4638aabf-2f3f-44c4-8849-6ad365b31da2" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="d71f12d3-899e-49b8-af89-47366b5aa480" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c3660a12-f09f-4d43-a1be-90c0bd65e862" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="2a8c5426-8a00-430b-bb30-ec7d09493cac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5e8f73de-dd16-479f-bb3b-4db7cda01f71" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="11859e7d-7e8d-448a-8303-a81f60399690" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="16c063c4-211d-4bc8-a5ee-39a60aae662d" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="e8bf4dd8-1f42-41bc-a596-ef3558a1aa80" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="431ccbbc-d986-40d1-90f8-e1d42ea95ae3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c192e926-743c-4def-98b6-19134020448b" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="045fd5c5-3260-4512-8cc1-4a1dad0ae907" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="17574907-6806-430e-92b1-aacedb04be05" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ed9a53bd-da6e-444d-be05-85252e6ea625" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="6dfc4f04-0084-49dc-af74-a54a149fa99a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e3ad12e8-dd4f-41b3-b94a-54a4c75680f3" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b2b869b3-06c4-4161-bd66-c0ed1a8fb78a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="12c3e36f-a9dd-48ff-be6d-fb27248d75e0" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="0d1e4d6f-2cef-487a-afb6-fb73fba35d0a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="67138bb7-49ed-4d65-a628-d867439eb264" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="630b4276-89e8-4447-bf37-4ace03dabf2b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="84b6ef7f-4d5b-4d55-a1bd-c1023999a498" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="7864b432-0abd-43e7-bffd-9c361f9d7841" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="9cd27799-5fa7-4634-b430-04d4b2021488" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9f8e8d1e-e269-44dd-9d04-cc0b614b5fb6" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="9f06bc6c-546a-440d-b6e8-89ca72ca2a5b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="95e27b16-58fa-45c9-bc56-17e6f1664954" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="3a0a1076-92b7-4269-a04d-64ae220c76b4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="32cdafa2-4598-430d-8bc7-476d40018ac2" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="6f334a62-65f9-40ea-8775-f36bc494c9aa" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="c7a6a65c-4aee-4c86-ad22-385fced9af32" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="1ecbbfb3-8329-4329-af40-e01a8aa678db" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fbc8827f-240d-43b1-9ba6-5c8734d64d85" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ecfa6a43-5592-4dc9-95ed-353682c7c408" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="e9f3363f-5e46-4719-93b5-7c0ca8cefe6c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6318041c-9b4e-48e8-90b1-aeccfcda160d" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="732044e7-4563-4c2a-bd1c-4225f05e6d1d" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="821b3f31-6382-498e-824e-dc52c7f66556" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8b4fc2e8-2391-492e-9a00-5aee749e8a7f" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="f293c2e3-ba29-4a26-b704-ca73ee392559" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="f79e109e-80f4-4c33-a6c5-7e7fc3bb0616" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="4e2afeac-80b5-46ab-9bd2-aaf8653630a7" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="f1251a09-3601-4b62-bd97-7b3030744e21" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="41345452-c30e-4b21-808c-fb37644600fa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f8085b84-fa68-4515-b724-8919b112f0bb" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="835a15c2-7d76-4b84-bfb5-5d88217cbeb5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9f536b3f-7b55-44ad-bf42-2b3ac58ab614" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="346e6dde-038c-429c-9b7d-cfa8b5cb2ec2" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="65b9405c-9f62-4d29-9dc0-cf6bb4d014bd" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="4355f832-6f52-4c89-8510-cffbff2df78e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e7878611-9611-49fd-921e-7857a05cc49d" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="3c90890e-8773-41c3-8d71-10f2c123f86a" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="c6794651-d8b8-4147-bd13-affc22e2fa17" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="60d66538-de0e-47b5-98e1-60468b47c6ee" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="f0cc888f-1cb6-4876-8ec9-51abe7316d05" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6dd4f5c7-1a23-4137-9972-2ce4303a0863" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ae47cd76-7686-4e62-be4c-ff0d3f247cec" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1c146724-e03a-4941-bfbc-5b0d79b89098" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="b14e4d6f-0f98-4441-b0c0-f67909f8910c" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1145b74c-c3d3-40ad-ae75-ef699c8f99e8" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="19e9f855-2524-43c3-ab7b-b4707a934577" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="215d0898-3277-42f0-b6b7-c00d93830e44" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c8faa47d-a87d-4258-b649-f875b93f75fb" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="714ea38c-45b3-4d65-bdd8-11e18888146d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="96d1292c-7fb5-475c-80bf-683aa5000674" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="9ab3f865-aed0-4a8f-bc7d-59a79f57d8b5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f740e004-8847-46ca-a15b-93d8b03d13c5" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="52ac82d5-99b0-4ada-90b4-bf567c4f6729" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="8dde6196-7788-450f-baca-500b7a0536f5" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="5e0fbdb0-e4bc-4605-a625-ae636bdaeb73" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="843bb618-fdc7-4728-9fe5-3522f83f9302" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="614e9732-4e25-4f96-9893-f729ee2b5a94" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="0e4cfb4d-c91e-4051-a871-e0e3adf000aa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="75557ae9-ce60-4e99-a8d6-27cf49f47b96" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="003cf3b8-b94c-4ef2-b654-5da1ad2300f6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="eccc79b7-36fe-4ca8-90aa-670099ee0186" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="48d62377-ebe6-4401-af4a-7a4406bad2f0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="101049fc-73ef-4f6f-b1dd-eb35ecc49069" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="262fbf79-4ec4-46cd-ac3e-8d27bf4c99bf" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="bd26e497-07b8-4951-9d07-e6fce995b9cd" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="5d56c115-eeef-4e35-ab8d-b26e783ea294" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a30ba5ad-b71d-4da5-8dda-98cceb7bbaec" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c7ac565b-30b3-45b6-aaf1-616903b88ea8" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b334131d-6fcd-4b71-a4d8-181a0555e888" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8d58fac4-d45c-4ea6-9eae-1278d17bf115" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="554ee675-4e4d-4a14-b1f7-7d08b5c0db09" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="5fcd6410-42ab-4826-8f80-c2deddd64e9d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="61df5881-51ad-4ce0-ae8b-d1a48b210854" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="249d9815-e2e6-4130-8162-241d286a9a19" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="edc19eef-1b02-466a-a7ed-f9363e5d8983" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="48b48029-b546-45fc-9906-043ff98cce44" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="3ff29e5d-5a95-4667-b86f-85756848b119" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="9118920e-ce89-4935-b037-68670798467d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="801b2121-a388-4756-8bd9-66f860527e2d" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="70f2c176-28bb-405e-8716-dca549d2a036" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c8c573b8-16cf-4aa9-bdaf-ec47806aa28b" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d8a5d433-68d1-4429-8522-713641d515ba" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="5f429c02-03b5-403b-b033-e7e7470a73ac" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="7622c74e-7548-4fff-896c-45868a66b45c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a7fc71fc-f1d8-4ee6-8b30-b2b39a6af6c3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="990f1fb3-920a-47d2-a8c3-a69e3438988a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e7f8d720-590d-4f3e-889f-a50b96732807" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c327134-76b0-4db9-abd4-0acdf9618723" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="2a6e7522-8742-4cf3-96d1-9c7d831136ee" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="f669a928-ec80-4954-b5d3-8bbf133f69dd" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="80da4411-940a-402c-a9ab-619ef5ae4447" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="c30198ea-ecf0-4300-be7b-608dc4782bff" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="cedf87ec-4fac-4739-8b49-5b349d50d124" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="cfd63555-5fcd-48e0-b176-272d5c8f9621" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2ae0500a-f925-469b-b066-3606c2dc617a" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="52c1f2c0-7253-4da6-b6d9-d4c5e4092a19" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="f8c018cf-e17a-48a2-8460-1040c4178e7b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="4cafd6c4-939e-4ec0-b1e6-637e2ad06261" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="246a30f4-7041-422a-b0e1-ca6134c247fa" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="bcc532bb-bd68-41ee-9ee7-307482be2b55" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7a06e077-ba29-4f0e-a001-5faee57a3822" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}