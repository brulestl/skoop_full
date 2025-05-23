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
  return <div data-unique-id="d9b2d2d8-581c-4330-bfae-73296e95ead7" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="907f3175-983c-410e-a8c2-74948cb1f8a9" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="2d405558-dadf-45ee-8065-4821c14386db" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f9f5458b-8d29-4039-8d06-c2696c91665e" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="0ae477c9-4803-446f-93d3-0c7e79869bdd" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="7361cab7-6be4-4034-943b-4e5a2c3587d7" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="dbb5c301-e639-494a-acb9-9ff830296c79" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="ea38af13-2dbb-4263-b91c-4d630133bd01" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="41dc9ead-6897-4e24-9380-28d79dc509ac" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="9257c8a8-a94e-4f60-af55-83b278c45a12" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="764bb95b-9fd9-4527-83a9-2a613158a791" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="fe47b7b5-c82a-423c-9311-20824dbc1248" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="90526c36-18b6-4041-8942-320e8f1ecf7a" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="c48b5a71-5175-4c9e-a08b-cba8b3ef4724" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="12a337f0-3915-4142-b5c4-53a96f303eca" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="d1c5cd0b-4406-471f-aaf3-034558e2440a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7b0eeeb3-6ccd-4724-a537-fd0156aac6d9" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="c200a7f1-0a0b-4acc-8e5d-b61154cc4642" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="915987da-fcc8-441a-91ba-8cedf8e78126" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="a52d3f49-3ae3-4677-9c87-b59158387a10" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e8821aec-4c9f-4122-88cd-1398c8e83e5e" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="037f1c29-453d-470a-8020-473212cb8861" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="e12a5f96-9c08-4a9b-a9da-38f434bc10dc" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="46a268b6-96ee-4ef8-827b-1beb795200ba" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="0d1115b1-d056-4314-abe0-0d26680a2920" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="a6306693-6a76-4222-ba72-70f23d40122f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f1176d54-5e7c-4274-bd9f-bac4bdfb73b4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="53876436-90a8-4bc4-95ae-b719646232fe" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="5b87df37-5761-4c7b-b803-291fe075b216" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="7a13d6d2-0a7f-4aae-84b5-fbbabe442947" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="4c938ad3-a4f9-4f9e-8776-4d86ffe933b6" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="10545cb3-8943-43e7-9a6e-9ae223dd75d0" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="13f2c640-4b39-4e18-a23a-1b4bdc685326" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fef47cd5-12a9-4082-8c37-a9c2162c85d6" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="356b06cc-7e1e-4861-bd95-27ef6c8f2125" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="e9176444-125c-43e9-88d6-fa79a77f811c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="662d13a6-ab46-4029-98a2-c46356bb4f78" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="45e2561b-4c47-44e6-9f7b-ac0fd00e3730" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="678bcb83-af47-4678-97d1-721812a11fb9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="375abf94-1fc9-4a9d-a959-d6a418b16465" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="2f2a7b44-258d-40d3-9b73-7fb3e8622cf3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5ab61071-65e6-4e1b-bd86-ef49d4478590" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="983d8b5b-ffad-4f14-9636-bcc86aec6d49" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="708430fb-1565-4f32-a3a8-70b38d14c07c" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="2e86c515-e2a7-4361-ac27-5543612b3ac7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2b5129ce-4f5c-4593-bae8-62eb1cfeb0ad" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="b9d3a751-cbf4-4bae-a8b4-388cc6ce67bb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ec5ed661-f8e4-4fbd-b647-b5685154abf4" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="de413781-4fee-4fd8-9e3a-b08ad3cd51b7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="83e9b2a7-04d8-4eb9-96d6-0d503a76c7d0" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="732585d3-4e4a-4d8a-ba86-1145bc65dc6f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="461a4c51-0bf1-445b-9825-a98feb3e9a12" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="0d52e49a-5761-4132-994d-12950c48572b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c30d79e5-7560-489c-ade8-fb1641140422" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="7df604ef-0ed7-4d57-a667-3df1d2a92333" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c1bbbb1e-c0df-48a1-854b-b35d9b6dbb0f" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="c78f8be4-47a3-41e9-85c8-867226ed730f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="365a474a-9a8a-4972-b649-b537e918fe6e" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="c9f3162c-0a6a-4f32-b7b3-e6dbf1ef8b71" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7df6f9e8-e98b-4ae2-8a22-18ea4b1d2dd8" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="3855099d-70e3-43ae-9c04-10f0b449116b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="747a7088-1881-4dfe-9fe1-68112dab0a46" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="b02be895-15d5-47be-b93d-60abe44ddbe9" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="de19b110-718b-4af3-a4b2-19190da3359e" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="7db09506-4846-4da2-9f31-f8c96d3e3c42" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="10200ba2-4347-4318-9129-5235ba9527b0" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="e0e837e0-3b35-4e5b-a55c-a5e17caeeb04" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0be1ff8d-d099-4e88-a167-ccd056722f62" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="8a8d768d-d8fc-4f34-9d16-3ce46a80744a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac4df1d3-d607-4262-bed5-313fa34a6f27" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="570a3d07-6871-4dad-bcbd-eae473d3b5a2" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="9add976a-8f66-4b62-9ef4-723ef06353a2" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="7d242d6a-1151-4660-8ecb-e3ed9fad1596" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="46d1ec96-1bf0-4ca1-8863-85f5648a2ae7" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="134111e5-f360-40e6-a8a5-299f52506d66" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="002f9fe1-f39b-4682-809f-1bedd04c874c" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="57a4aa6d-a7a4-4177-a698-789ded3f2ea1" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="30fcd14b-29a8-4751-8599-fc048a19e338" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="71598281-a4be-4fa9-b53d-de52250ab805" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="f4d2e296-41af-4ed4-a5e4-68beefb0d265" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="3fa02b52-91a5-4eb4-be3e-82b1c1c5c4ef" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="a0541618-c10a-4aaa-af6a-32aa50e49d6a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bc25b038-8c3c-4057-96df-cc7916a53371" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="cc39ea76-d58d-445f-adb5-22ab8b9c0dd4" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="7d4a1195-cd8c-46d6-adcc-6398e05038ad" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="5620861e-9bdc-4165-b455-5c627ac20a9d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9e0e6378-e9d8-4d02-b308-ebd8754c173d" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="b6332f00-5fa4-4ff5-a925-82901845b7b6" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="a4c00e61-e65a-4415-835e-5aa7c53b63d4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f34837a6-c749-4374-9817-82cd7cbcb130" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="b94b5101-a097-417b-bbd3-12f9f80db73c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="53a67bed-5903-4324-96c9-399ab78a0f57" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="b6baa6dc-24a2-47f2-8cbb-64f06c10ebaf" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2392b8f2-f740-48da-8442-06e036d6121b" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="18e68584-4bfc-4da0-a658-5813e984ded2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="82184434-fc36-42b0-89e7-5ef2596955c3" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="f1b7b89d-67ef-4444-b208-924679ac5488" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e194ec05-b352-4859-8c8d-c5d654f8bbf7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d4e75c07-bac4-476a-93bc-7535497caa85" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="27d2bf52-8e3e-4435-8b5a-8aae329a94fd" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="c95faac6-d84c-4652-94bf-18acee57d387" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6d35851f-e0e8-4c78-a9fd-700b90091855" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="5738a572-1904-4f10-bb0c-26e983500eeb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c10316a2-83cd-484d-91c0-aac0c97c3f4c" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="db663646-1442-4739-a1fd-417cee99bb69" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d4365c8b-c21f-4bb2-a489-990f918af701" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="048612a1-63d2-4b99-91f8-1d87029c4c56" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="40859f4a-6c13-407b-80c4-40ded9fcf1ab" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="666ce5bb-b151-4362-8194-467f45d2fb29" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2016c018-3292-41b4-8478-6878b3068ef1" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="e26afb16-4e1d-40b6-a999-12eb453fece9" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="2fb96ecd-3eac-4385-8014-204a2c7c2b9b" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="e0b37e1b-672b-4e63-91d8-dca87f4d0e14" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e34f0119-0c65-464b-b556-eea40895c63b" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="ae119305-68c7-4c05-befb-d41fd19bb32c" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="25587b10-6794-497c-9dc7-e8ed4a1cc015" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="d1618f41-bd23-484d-b37a-ddd3ae58f2f4" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="e1c3e9b6-b380-4359-8599-f7b822b9448d" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="d5253334-61ff-4fab-a705-e19f3add3884" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4bf35186-2d97-4fa9-aeaa-58ada610562b" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="92ff9cc9-bbfe-40c2-a450-f38e908bd813" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="326d95e1-2485-4251-a503-8b641e97c9ff" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="fd815816-2359-48f5-a41c-63d90137df8a" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="7555657c-ebd6-439e-ab08-32eb540905be" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="047069cb-b5de-4758-b8a2-839ed7fb4a9c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="919b2ecc-9594-4cd9-8c25-5a8c2b9dc1d6" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="3d3cda6e-a823-4b23-8746-256e4a14594b" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="8d3ed6b0-4898-48ca-9273-8e4ee4e8bb04" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="80bc73af-4ea6-4e06-b8e1-eadd1edcb2a2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bb0034ec-2205-48f7-aaaa-f198f57fe850" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="89b367a4-1c18-40fe-b85e-f09c3493a037" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="0fc3da8a-5820-4358-99f8-f6ebf21abfab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ea5cf901-c248-4445-9354-97e222b04996" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="6657ca25-4768-4bd0-aabd-58abcb9de50f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4d3fcb2c-90f9-48bf-b9ca-d1ec5f575fae" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="6ae3daf5-bb2d-4166-910e-2f2564fa12e2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d96673b2-e1f8-4ec1-8366-7fde41bb9f5b" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="e4e617f8-8c72-4b27-ad68-bd3aa966db55" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="30077cfc-a521-47a5-9e6c-9d1a7797bea1" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="aef44c9e-e1f6-4282-839a-1fd599750d90" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ed3720e0-4564-46ee-9b6c-05269bf5285e" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="6ead9ba9-696a-4496-a3eb-2150066f9b50" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="78fb427a-d1c6-4818-a1f8-90f8164083e4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e2231988-b19d-489f-bc26-e34d2fec6821" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="dd97d83b-97fd-47dd-b30e-82a5224d34f3" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="19789941-a998-49cb-8827-8ae68346fec2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c36362c1-7723-4163-983d-0e313c91d440" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="831f0593-c49c-45f1-bbd3-5fef50e55866" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e848af85-4f38-4db5-9355-e03e1d45fa4d" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="d887c9cd-8f14-421c-91de-f4a33c41943a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8e5c000d-da62-4606-b847-3918e6130073" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="25fbf726-b62e-4f7a-b968-b9045d7d6099" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="657a6907-e624-4a65-bb79-6d73faf4c17b" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="ea483ce3-398f-4b4a-abb4-10a990b9847a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="97c349df-fe79-48a2-83d4-c28b80f835ac" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="6b11c225-1f2c-439f-85b1-a52cb8ae1ea8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2cae0e84-7732-47bc-b131-44b7e3e782b3" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="13bb4abd-6d7a-425d-b26e-b2b7fb3f0af2" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="cf658f4c-0641-46da-b18e-efdb7707cd99" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7817ed34-cda4-417d-b6eb-ad0b3e4eb82e" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="870b58d8-ee5c-40dd-bfdd-648169722cea" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="a256f6dc-57bb-4760-9619-97a7eef83ad8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="8f6b534c-e124-4f01-a074-8c1f3124e7a3" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c1cd64c8-7f3c-49a4-93fd-bc258994b701" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ff28f677-3e0c-4736-b1b7-e93d3f081d8b" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="dca580fc-1ad8-461f-80df-5088c06cca48" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d2db5467-f966-4ddf-b275-25dae2bbb6e9" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1a68892c-eb1f-42eb-b05b-87795251efe2" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1b1b4a9d-34fb-438c-ba48-2f38102faa74" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="86c1ec96-4bd5-4fc9-8e36-368a22b0acbd" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="706cc377-6d74-4c2e-bd0e-f7a647a68a64" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="9a2bdab1-bafe-42f0-ad36-05ddbce69c41" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fa466064-5760-407c-b63a-6b8e7120a6e1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5c191a47-c41a-41c7-b456-2f48721de5b3" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="d23dd1ca-4fa6-4798-a3ef-c6512266c3d8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6019ed78-2363-404e-ab63-ebf1fcafbb4c" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="9000f6a0-c7af-48f4-97d0-3daf0ef38628" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="324b750b-373a-461f-90f9-5c0ff3ff103a" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="0a32e8d9-580a-4490-ad3b-61539df6fecc" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="cf967b65-23aa-4677-8c15-3bcddc615d9b" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="74445785-0caa-4fd5-81a3-39c7ebbed8f4" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="b726d3f4-5a0c-4d59-b233-e88669430f53" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="937fa91f-8c53-46c4-af4f-3597b14a207e" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="652e73bc-3b79-42cb-b8f1-8ed1ac64c663" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d12fd018-a891-4827-8a86-6d5c377173ec" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="f599a199-93e2-47da-8b76-ed85bc29cc8f" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="2c2946cd-d624-490a-a1a0-b9f937b857b3" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="2c4bd9d2-3943-4d9f-8ff8-edfac2c6c141" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="7c1caaaa-4e87-4ad8-9f65-ade66ec8573c" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="3afde5e5-cb2c-4143-9b08-7a11afefbd43" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="30705704-eda4-42e1-a73c-a231e9e8c03f" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="2664c8af-9491-4525-894d-8fd6fea3247a" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="1860fe04-3624-464b-946e-21abf7020212" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b6bb752a-6ce8-44b9-86e3-b0a44c76ee2f" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="88f49006-3c61-47bf-b356-4b6ea9154a10" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="367c16e2-5870-416f-9123-c2c06d9ccdb1" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="477cd76a-ddee-4a5b-86e1-6fea395a25b4" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="f71796f3-2e12-40ce-a2e5-52f7e7acffce" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="ebc9c14b-0231-45ff-86d8-9bb35b8a7580" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f6608539-0243-4a66-9391-b59f885c594a" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="8b63bad4-d01c-41b2-b238-aa8149c4ed46" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="e7a23d30-9ba5-43e4-a43b-9e42f882dc00" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="44be7f8d-ccff-4aa3-909e-8651b3f1ca0e" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a0f31159-4dca-4b7a-955a-90ba1a1eeceb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7b303fb9-1c3f-4947-b315-7d10618d0945" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6261b1b9-c86d-48f2-b78b-1bcc8314c8a5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d1daa211-7371-4ab6-8bb4-92318710d000" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="66798fed-fc3c-4617-aacc-ab09366b505e" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="2ef279b1-68dd-4e19-8f17-d370ef2e2c5d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b46eb906-b0ab-4442-8dce-4de17957ac2c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="8dd3b2ce-199e-4c48-83a3-8cd6ce8b554a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="1e2bb29b-96ad-4912-ad87-894592ecbc7c" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e0fccc25-b6fc-483c-90f9-003b5b3da9bd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d5b6a73c-3ee2-4e95-b9e5-36c2da53ebad" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="8a8b52c9-52a6-4d06-9056-a756a73e642f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a8476cae-47a0-4098-9483-2d4b57c23a48" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="df62163c-66a4-47a4-a368-22a76af46be0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="336d6b7f-305f-4d27-8725-eeedd0489c29" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="44e2187c-1eec-40e8-b89a-d9be4405ec71" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a6cdfc4d-56e7-4496-a091-d629f29d128b" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3840884e-5786-46fa-84d2-94947e28b5e0" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="dac50992-472e-4d36-bb5f-2486fca63761" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b9f588aa-d610-4ce4-8c54-ba42f5767af4" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ad396f56-67da-44a6-b999-c47325c7f4df" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bf54b82b-6d64-4586-a619-746d2ce8806d" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="710d5586-1aea-4006-a08f-b112c3eb8678" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="2feb44e0-4d7f-4023-90ac-11efb53382a0" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="f0f08a9e-68d7-450c-898b-5ce4e464bd85" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="14a6d35a-fbfd-4322-b40c-5001db8053f8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="57d50312-a052-4484-94ad-07898e108eb6" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="892ae9ed-e31e-4a41-a175-f83058f4c41d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d4318bb0-c5fe-4016-a55c-394992231d83" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="f7a9faab-982f-4e04-a6d8-ca8ae7ea6147" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="62d7bf12-40cf-43df-ab26-554a43bb2b17" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="ed81657a-be4d-47a5-8d11-dbb8ec3be4b2" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1ad5542a-678c-4aec-95e5-d5c0dac78f90" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="f02c344c-247a-4837-8294-3d0a22e30762" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="e8ae0629-1064-4196-88e5-f194f477c81f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="e55dd997-5549-4490-8117-f45c428ba77a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="239c2508-21c3-42b6-bc99-c4dea4fff053" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="6b145228-7d11-4f32-8287-19c476ab7ef7" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="0e7155fd-c29b-4489-8b40-dd0272b1f9b0" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2e60cb7f-3368-49a0-84fd-7e527ea2d974" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="4403e2de-9a3d-436a-a5ae-932764c878e3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f74a58c3-0bbc-49f0-9837-ed8ff38b10f5" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="7ca65c4f-d84f-4246-a5c4-a77fc7353864" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="a6a26dea-b26a-48dd-ae5e-72f13ed7260d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="99dc17d7-51ad-4e95-bc25-e72e5ade5d90" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="2be690bb-dc3d-48ee-a027-b92949c651fa" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3455c63e-3c96-47ed-9045-cdf906d9a0ca" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="65372739-da58-4061-ab46-0983357e87ac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d3c51b45-22e7-45c2-9d6b-9ec5bcb39989" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="f9855aec-7de8-4760-a39d-35f2d1ab2b5c" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="43916f69-ba26-4db1-b804-930247dbdffd" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="c79d8342-cbfc-4397-81e5-df9f7fcaf2ad" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="30e5a8a1-6bfd-46e6-bd30-a1edb7466110" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f53d69a0-c8f0-4aee-9fe5-74010c960361" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a1807626-aecf-4601-8027-ce72e016a671" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4570ec18-baf3-4848-a767-083be3612298" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="49e25ac9-48cc-48e7-a647-37fc22092a96" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="3904fa95-6b87-4788-9a5f-925732eae89c" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9fb2763f-32e9-4dbc-a617-67d16ccad6a3" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="7845c517-4e29-40cb-a961-4626a6fb0848" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="e4181168-77e8-4296-9d87-ecbb017be1db" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b77021a8-4061-4887-940a-5aa05570d60e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}