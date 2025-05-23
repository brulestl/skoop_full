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
  return <div data-unique-id="a69d93f0-50bc-4467-a6b4-5d3ad83fe099" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="7310b94f-f73d-4e88-a0f0-0a5a23d4bc07" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="db3c8468-dfea-4221-8142-7930c0a28c84" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ee8b13d2-68ab-4725-ad2c-584a00598d19" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="e075873a-a552-41c8-a78c-9aebbf22ea2a" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="8a238f10-0e10-4f7d-865d-8d66b54f8247" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="bfb626bf-6275-49cf-bd01-f679b2c1b746" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="f0892345-6464-4ca7-9b63-0b0a29f5a090" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="5aa21336-598d-4c10-a6cc-cb44f0f4558d" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="3fa22389-5b59-4e19-ab35-55a6fe2fe595" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="c48e4a4f-92df-404b-86c3-c7b346d18cf4" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="bb323de7-b83b-4854-b356-84940cefab2b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="11c65766-d752-4b15-bde4-2c7130cbf03f" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="08eedd3b-bbeb-4497-885c-77ec42ad271d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3720f304-d068-4262-a630-025bfcfa0867" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="8c5c490c-e7e6-4eab-9fb2-68fddf108b91" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6ad0a705-a06b-4408-a048-71e3b7b18a34" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="6752fae6-ff1c-4a3b-93a5-7e50665290d5" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="3ebac79e-2a42-495e-b525-f0747ff9b7de" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="41ab1157-fa9a-484f-bd91-b27d1674de40" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2a04d775-8588-40fa-ae24-06389a40b800" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="ca07a754-fc19-463e-8ced-99a778091098" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="623100a2-de54-4944-81fd-348f76b16c22" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="6f2868ed-60f2-4f49-94c1-240232d7f3c3" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="10b1379d-629c-4831-83e0-e5c9cd691c97" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="cc86f4ce-67a6-42d4-842b-c07bbcccea9b" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="c490a070-e149-490c-9dd6-28751056d8c8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c2e8ced9-e446-4190-bf9c-cdd9bd1a6416" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="64bbe5f5-8d7e-42d7-891d-e9a7919af9b8" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="be46787b-3910-48ec-9c6e-9b51764b0a06" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="7ea4249e-65e3-4bf2-bbd9-05bdda82c88e" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="36b73007-2358-468f-a356-924a5c641766" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="a9f60b4e-9c81-4e6b-95da-f6164ce16307" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="67c4015d-8f2e-47bd-993d-afe3bcc4ceea" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="a32a12b6-c54b-4b8e-aa36-c853f7921f8e" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="b0f5dea4-6f75-481b-a532-1de37b23a498" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="05d60b77-1103-4669-af90-fcd1c0a0045b" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="04e80455-d98a-47bb-ac91-00050d9636c2" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="d0e8c3e2-ad39-4af9-b6ec-889a0be1d7cb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ac69bbc7-817a-4bf7-8431-bdf809212f33" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="6234eae8-3ff1-45df-bb4b-60687c90308b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d30d4d05-5d18-4d8c-a06f-4c0f51dc4db8" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="d42760ab-118b-4f16-a540-0aafd85a7f30" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7f97a6d7-8f5b-457b-9507-7b073c1b2c13" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="0ee4f9c6-eaa2-444c-b075-e51a64dbcdfe" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9bbd2340-6f09-4f2e-b2f7-0f1b92831928" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="5abbac79-a16c-4a46-afe3-f58e8916009e" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d4df6e1f-2500-4090-acf2-701d1993c842" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="c566a791-5478-4852-b1e8-418be82f388a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="23ef562c-2076-4596-bd04-196c6547cf6f" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="4795edf0-0197-4e01-9405-ac882748b436" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="19f3ba18-5265-41a2-bb40-ea8d198d5599" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="fdcd9d67-8f2f-4d49-85e0-d2ff5363a1de" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="61c77077-1fcc-49e3-b166-9bed581412f7" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="4099771c-7da8-4428-8834-a217d79702f2" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a6041c71-05d3-4468-b80f-82a3ff92a009" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="bfedcc41-878a-46fe-8612-8e89f219eb19" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4b88433c-5077-4496-94c0-f1a770f23c67" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="2e0c3826-a93a-46dd-a93c-1a411a8de870" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2b3c53c4-2e0e-4fe7-9a89-4b55f84d01a0" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="597778bd-ae42-4ae5-9203-5f39ce0af9cc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d52c168a-18d0-4e3e-8fb0-2a8bb3fe2c06" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="515415a3-70f9-4a4a-8561-88b314410f2d" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="f2691a15-ac66-4608-98e4-38f8cf28518e" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="ab40e883-1f20-4891-b79d-724735cd5979" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="ffe8416b-c46e-4806-96f6-834b0e36ffce" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="3164b635-d4c6-432d-8d4f-c295fac27a51" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="73844c2f-a863-4acf-a5cf-030c6a29d7aa" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="a0effc5e-b4e2-41c4-b280-1df766a9bbd0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9647081e-71fa-495f-bf29-290cd3b002ef" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="a6b106bc-b0f6-4191-b445-78d5db550755" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="9280336d-2a68-4482-8126-51e340efc586" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="0e6c6398-68b1-4f92-95c5-7e6e3550a72f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cd2e80d8-e394-4cff-ab6a-3c1a49c284d9" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="5ea11f28-ab01-447c-bdad-1221b8278e06" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="1940a3b7-b3d8-445f-bce4-ff82dc46f798" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="6826ec22-2dec-40f9-93c8-43d2123243d7" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="5bc54155-e003-46ea-96ed-b43a5721fa5e" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="3fb06028-e15f-44cc-a287-bf3a3bb1b9d9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="aed69681-8036-42cf-8a6b-9bf2b047bea9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="db0dd43a-9dc0-4172-b2a3-acc77ba656ba" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="4c9faf59-ad9a-4e7c-9fdf-b49d4bcb71ab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8d4df426-d14e-450e-9044-6153944308df" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="edcb1716-b0c0-4c1a-996f-69458c95d0cd" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="2ac1119f-51d7-4639-b3fb-f0dd41ee4815" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="75854c98-7592-4172-8fdd-424cfe28afc1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7103ae1a-19a2-4b00-bf71-0bf35268afb3" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="9043a3fd-f977-4c5b-a22f-7bd7cc07d02e" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="327e0610-528a-44d5-a095-35e959b27674" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="785d5592-b26f-420e-a505-416f7aebcf14" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="3022febf-8069-4d71-b751-2c47e470327b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2afe66d6-eb1d-4883-857d-46bd38a9fd48" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="95add498-63c8-4617-80d1-e75d3bd326ac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="520f1b14-67ef-4d5f-9e9c-2bcbb3177f71" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="1fa5c6e2-e6aa-4fab-869c-6f3a4950df75" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a2f97c9e-7a68-4374-ba96-000d7aa26b66" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="a8fb91d6-7ac7-4fa1-8584-bc5b6b157130" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="53ebc6c2-88de-4cfd-a215-1216dba2bb9e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1e17ad31-4177-44c2-811f-ad916911bcc1" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="23f902c2-e535-4011-85f1-955ca642536b" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="77996f91-7414-4ac3-99f3-659efde02ae9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c4bf6e51-6151-4a96-9589-7e0968da4f27" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="7df05173-8f03-4e14-9369-49bf5a29bc22" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e3111cf1-b65d-460f-a37e-f09455cdbe9e" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="5f45d0f0-c20f-4f80-822d-6cda9f7be268" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="843aec57-2367-4f9d-a605-63cc386e687e" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="1d6474e7-1f72-4ced-a5a9-fa86dd787dff" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b09a68f8-ecf9-4eda-8a43-8fae52dcca5a" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="a224304c-7f07-435a-beb3-733545dd8478" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a7871de0-9810-49d8-81d2-41b49d7e044f" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="3a9c9a47-ee6b-4c53-8203-c3cf0148ff16" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="3c7b0be2-9050-40c6-ac7c-6718eb9cea01" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="9cf9cebc-b33e-4cdf-a6ee-798dead18a36" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3bee2535-0f99-4625-b943-2b64eaaf1a80" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="829b7d1b-ca3a-4217-9ceb-fceaea2481c2" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="96a2c1a1-b77f-47d0-aaae-bd0675c795ee" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="3dff551f-43c8-4fe8-bf5d-90f592dafc2c" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="ae43c64a-5980-4205-a602-fb98f12dc282" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="5c42de12-7dad-4a58-aa80-efafd0946a0d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0665397c-0767-4d0f-a0c4-18dc5818aa82" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="3cc77cb5-ca21-474a-810c-acec63406bb6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="07745036-4854-4259-a54a-ff5b847561cc" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="ba2826ac-0d3f-43cb-ba50-a1af875f9a0e" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="a6ca04d1-5927-41ad-a5c9-e86271e87674" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="435b042e-0f7e-4ec2-858e-954ca8e47101" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dc17f7a5-37ef-4d1b-9ed0-b3f1a009c524" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="446f19cb-dfe9-4a04-860f-4e11c9e537be" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="f0d0f97d-306a-42e1-af9c-021c53e962f7" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="118e84dc-9bc6-42ef-86c5-45397bdcb786" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2bd17fb7-241f-43ff-9ef1-cc8467394995" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="9de1fa52-dc4f-4342-ba90-0ab85d2e8f03" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="9cc1d050-2a59-4de3-a837-1ebf5deb3e80" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="682b8a27-063c-4f6c-829f-dfc345ecb829" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="91a629c5-a145-4912-b31c-ff17041f2d52" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2a266d34-4578-4034-afbc-37af61490fe2" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="d59551c6-0337-4d27-b03f-be60fadf19c4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8148df42-4ad5-42e9-8d84-577993356ecc" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="2e46d430-e1f9-446a-9fe1-a2be692165f5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="abcc9a0a-4a60-4795-8101-bf71d2810b49" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="f316eda9-db44-438c-a4e7-8884a9883b90" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="10cc978f-ecac-4de2-a67a-9d84b56d3e24" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="bc9b24e1-5bab-4364-87e9-415622dd70ae" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e6c22d85-da21-4b8a-8e81-c9ecd7bcb517" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="de47994a-f2a7-4c2a-a84c-927c8c54780e" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="79b17b15-e8ba-4930-8989-362c8b7e9ca5" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="57392882-480c-4520-bd45-9e3515f10296" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2b467e4c-d680-4075-9299-0c3ad6b47c63" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="5394812f-a343-4b6d-85e6-5639a24cf4b9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ad332323-40b3-4f4f-a30a-218410e78ba9" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="fcb00f25-ab5a-4980-8287-7dd101ebdd44" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="05088979-41ff-44e9-aee4-6e8a78baaa29" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="155adb9f-68b4-41c6-b088-ad96161ce83b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7324debc-a7aa-40bd-b884-9cf7de0f656c" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="2fafe77e-540e-4f6a-abf6-7c9a81b0622b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="480d53a8-9dfc-4fae-8422-6211a72621bc" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="5023cc29-481c-49ba-be4a-1d4d3cb30a21" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f1d16b78-dbd7-4ca7-8058-b6b356800309" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="3f598da3-7920-45fd-9a50-d4f7b75b9742" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="1ee46df7-be97-4abd-a488-0bce737fb356" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4a171789-f70f-475d-ae1c-26a4e4bb6574" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="5c1829c2-2104-4be1-a144-53bfe8b48f33" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="bda5f6cf-dd5b-425a-aaeb-a46f0aa9777f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c96ffa68-dfeb-45ac-8c6f-b4d1eff508e2" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="92031f04-fdcc-4a88-a7aa-49365d85ab71" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d6069fc2-0763-4ba9-8a36-fe60fcf5b1a9" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="446022b9-6e02-46ac-9188-a918135da91a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="696a821f-6981-4d2c-bcb8-147be8b96678" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="27a4aae2-0fca-4ab9-be19-85d95399a3e8" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="9ae2bd98-eaff-4545-a85d-28d28bd135bc" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ccfc56b7-a797-4156-aa41-21b642836a0b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="afc95f5a-7b9b-47d7-af4a-1e5116ccd27a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d3fe61ce-f685-4288-85fb-5620d14f4d53" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="56c5c11f-a0ec-4985-afda-aaca442d6537" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c0814123-7219-45f5-9bd3-bd652645190b" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="9d4fe3ff-c60f-4c9b-917a-07a6d193caba" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a3dba270-2987-4fff-9509-567f2cfdae56" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="51949e9b-c00d-4cde-a816-b83f6e959a53" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="bae876e8-99b0-4135-a89a-47c3f7e41d55" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b017a26d-70d3-4a22-adcf-279854e6bd14" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="6aa3838a-a39b-4f30-8264-8ac530b72569" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3230b13b-f474-4b8d-974f-eb9a6bc95033" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="9d6e1b9e-06a0-4289-a2b5-8b4d33d2c1ff" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd9409bc-75c4-4288-b063-9d933e8d2295" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="22d959c2-e660-4c0d-87e8-220356a320f3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6a01a08e-2fc5-4ee0-9b23-7829deda03f6" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="2d28ff3d-2b0b-45e5-af48-9dc463814dfa" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="c3e48c55-7546-4e38-80ef-43ba1e02064d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b497b71d-26d8-4a2c-bfb8-e9289b0d7627" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="06693b44-ff71-4469-8e0f-670a1b8ea9d4" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="192c88f3-25cc-463c-9faa-e4630b473732" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="6260da3b-0dc3-4b30-ad49-47ca7b5ab6b6" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="4f7c778d-11c6-4796-aa59-db8937429c08" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="265e44b5-19ec-4e7f-93f8-b7d26225dec1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9cf7a62a-fa15-4792-a89e-9e45ed526971" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="2aa4ba73-1878-4d53-aba0-3afdd341b197" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="11cbe2f7-2643-449f-95c1-3dc5249baf47" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="f53da43c-9c92-45a0-b1e5-e9ee1695d349" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="abb58caa-aef0-415c-a4aa-c357f2447ddd" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="67b5d875-6903-4616-bc06-0390900c4e43" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="93079b94-4706-48c1-806a-af696c7a1116" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="de0c7007-e4ee-42e0-bbe9-92b9a3736c16" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="e051e472-af32-4d64-8d36-b6456d548459" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c6eb7462-fbc8-4a48-9194-971c9496fab1" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="28ba4a82-a7af-457f-bb2c-f9a429e2d42e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="32019cd7-2d44-4538-b02c-ec34c09f7f64" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="02d940ad-e5fa-424b-86ba-66cd13a0684f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="79b34ca3-69ba-4b3d-8eec-c44f9db93831" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="73ed4a51-c980-45b8-8012-a79b657f24c0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="0fd14347-4d28-4568-8fb5-e4d8c4389f27" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9359dfa7-cba9-48a1-9820-6ea8cc577987" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="b8c8a854-5eba-4aee-a321-4ac099aae5f9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="547435dd-5c3b-40d2-8638-c2d60c1bc1c1" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c6dcd53f-243a-493a-b20e-302b8e82e888" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="56801619-6c91-43cb-ae43-7a24f39789bc" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="2bde517f-73e9-4e09-8b06-fb1926c1710f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="23424395-bc4a-4983-80b5-8169019e7bf3" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="8800ce63-cc90-4c84-9e29-0302a2e3f027" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="56f1006f-0f2c-4486-9134-69e117126607" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fdcb466e-d8b4-4f4d-b10f-7c5e2c9c7d79" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="0f551635-aae2-4672-af93-31c7befbac05" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="17b306e6-acf0-4374-a196-f6d6d2e87496" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="f7486b11-d5e7-49be-973b-d4e121df2b45" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f14e3a91-a10b-400e-9bdc-144e2bbb876f" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ae781fe9-0726-4e24-a0f4-0009cddf8f79" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0c42d9f6-6549-47fd-a358-b622830f429c" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="06173c0e-03d8-4519-8034-57169b5a39c6" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="57b82fca-9b08-4924-8303-8f17a50219e4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="4db07719-f770-42ea-8fe7-1f8e44bd7258" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="70ee3b48-72de-4f74-9ced-06b8234978ea" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c6c85345-1dc9-43df-8f93-35518e7900da" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="9c72b851-8eaf-4a7a-a9a3-d5b62abb7cf5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1acdbb80-6712-4fa5-89b9-ae848a89d3c8" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ffa9b512-326f-43d4-a93e-98c9f1d681e8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="03956933-9f25-4c2c-b17c-4d1126411e19" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="7d3c777d-d92c-42c0-9e85-5fd1a4bc76c2" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1f9e61cf-5259-451e-8b5c-61256bf192f5" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="430c650c-9bea-4e7d-88f8-fcfbd7b68654" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="e3ea1ada-d4fa-4819-9985-ff3645bac777" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="0991f496-e428-48b3-a827-869eee9cd1e1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3f891d83-9020-4b0d-ab62-63e6340c6105" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="bd34af75-07c9-4c04-be7b-eefa74c88bbc" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="b273149d-470e-42e0-b44d-01c4d0a2f9ec" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ddfd5541-d56e-4bb3-9920-9afea660ad8b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="d72ce4b4-3815-4b11-82ff-450ea20bce87" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7c6a3496-e445-4101-8d96-c66a61037e68" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="61209d74-b2c6-414f-8d3e-b863965c52bd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="9bd7a4c7-c2ae-4141-b064-8ed05762eda2" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="69d0ff63-3f53-4fe6-98e0-25f4baadaad7" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="1cb8cdc1-8083-4f21-9231-ac974d13183d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="28f93965-c69e-4a71-9126-a3efa0f14f5b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="21c81c7c-57c5-46f2-9f75-dc8435ed6a3b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b7e5ac69-7dff-44b6-9d5f-66d0347b519d" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="c2746eb2-11f9-4c78-86c5-65152e0f8257" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="f955a97c-47ad-47b6-b8ac-85a2fbd00e84" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="068ac541-36c9-4bee-90a4-4f40126e2335" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="08178841-a3e7-4219-854f-8fa1cc076199" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2e55c430-de7c-44f5-a9d5-8e282fff8465" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="65ebd670-d9a7-4462-86f3-4ace93aebd71" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5792e7cb-10d0-426d-8738-79bf24f32c88" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="ae3af6e5-f005-4452-8072-9a541ec33f29" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="d338839f-3a2a-4c3e-a7a0-15b70aa3ae4d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fc35d555-97c4-452f-b8d6-8e60cd817fbd" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="752c55df-d98c-417f-8b9d-2b5fe95f6db8" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="f0b381ed-5093-42b2-8fa8-8cdc3294878c" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="88b6f1cc-304c-4902-9cf9-72f29054c54f" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}