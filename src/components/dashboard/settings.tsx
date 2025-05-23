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
  return <div data-unique-id="fc7eaecb-436b-4e92-a5e0-4735d9e565a4" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="4986a943-2867-4e78-8e3f-cde3d827e902" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="c54301af-3d42-4927-8fc9-b2c42c6e781e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b473a8aa-7570-438a-a858-06d3426c54b9" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="f7fbb1b8-1724-418c-af74-924b4b45f71b" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="f2dceefc-9910-4859-8f84-73b98bc40038" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="7895ea77-9fbe-40c8-bff3-6fe1c61b6576" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="04849e65-323f-48d9-8940-ccbe967855a5" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="d9a8a981-11b6-45a9-8bcd-6624a57bd0e1" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="9a3b315e-017b-4a13-b7b7-84b1f067469c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="af63cef5-f50e-4a89-ac12-07d8ef50c14f" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="cb724414-140d-4a51-9ad0-8c7b73445947" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="a2bbf662-c3f9-4c99-8a36-4c88fc2274d1" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="79bab30e-c45c-4884-9f5c-277a7ffec65b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f7b9df6-a7df-46a3-a434-35388245e53e" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="fcae00cd-3f17-42eb-a0d8-9613f81ba20d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="52fd0357-2819-438e-be75-48370dc1f86a" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="dc99d088-7653-48bf-89fa-742cb0cb4081" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="b786a17f-6d1e-45c9-8fa0-fd0c89614d36" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5d2d8b9f-cb4d-4efb-b956-92285347e411" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4b45058c-2c22-4ab6-a868-d31c057efc94" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="befd9f88-a83c-4477-8542-978bc96a162d" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="594f7d47-e918-4bb1-8316-1c0cdcd37f8f" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="4c03c606-b88d-4f8d-a85d-4238b8de8f2e" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="0f7b1b1b-c012-4acf-9313-bf80695d042b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="34a7f11d-7149-47b4-90cb-757a32a5de6b" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="3ef184a4-8ee1-47d6-9512-a81f2cf642bc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="16b2bf23-7f02-48c5-a5a1-d094c32339b2" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="1cdc1fbf-bf1f-4d9b-b150-6b369e04e973" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="e4a7add6-644f-45ed-a56a-d7893db582d0" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="cbbe1582-4ec6-44b2-8e33-28676175e755" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="bbccabb3-e727-4f43-bfd3-16bf5bac1686" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="3f07c5de-d95c-41ab-91e4-7f0d2c2c4034" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="df20bc50-e098-4372-aa48-9242ae0ff724" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="b425c41e-3ee9-45bf-bdf7-47877ea1f5ed" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="0cd94090-3c9c-4ca7-b39d-d4bc0349e1b2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c117c37d-c87a-4776-8d85-baeafde17859" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="facc053b-c228-4c52-ab27-81a06ad20c56" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="abc5d832-4b9b-4079-98b7-6c094abce64c" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="de9c3587-48fa-43a1-8583-1d246fd4c3db" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="a4bb8867-7ec2-4a04-9f57-526733b29589" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cb17394b-7d77-4332-a418-4cb4287264b8" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="4c15231c-5bf8-45d1-94a9-04367a428eaa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f2851c8c-a59b-48d5-9e30-fa3269a0d1f8" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="8887d55e-a4b6-4f5f-b36f-507e9a3c4d24" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cbf36fea-3bca-4a45-9b46-9a65e46b66d5" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="6d383f58-e25f-47c1-aa05-114e83116166" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="bd6a4fff-026e-4d10-b999-76498ddef0d6" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="3f281995-79de-4b85-a495-39b556564e43" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="69d0c483-d981-4fd9-a098-f013f0e1ecd6" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="b9fbb534-0545-4d06-80ab-48a277b6cc82" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3b49b3a3-d061-4564-a3e9-660401e3cb9f" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="8a85ee19-5090-41e7-8fd5-a0ba550c45b1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bd1daf97-0481-484c-808c-5cf4d2fb208f" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="803f7771-cdc2-4b01-a4e4-7d4c12e09e8d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="981d349f-ab7e-421f-b22b-3bc30da84816" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="ff2719ad-be80-4cbc-ad8e-d7c4db993b29" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c706d431-7dfb-492c-8a92-fca7ee268ba5" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="028518c2-4ff1-4ecc-940a-09b8e12cee21" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ca35a88e-02ba-426b-8508-328611184bc9" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="7189dc59-375c-4f9b-b44a-dfd7d5303b62" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="19852a03-7261-4a91-a7fc-b265f7716174" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="22832399-95b7-443f-bcdc-7c3e0f09dc3f" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="470ebc13-71de-4bb1-b00f-b490fc0f2694" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="8731ded4-5327-4cee-b677-f1a60ba5fcfb" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="ecdc072e-390c-4a68-9462-276775e7cd9d" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="e44c0520-1773-4c72-a5f7-be5979652309" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0c13a467-ae8e-4849-9399-23156c14309a" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="218effa6-faa5-45fb-ab05-718e40085558" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f67ef84d-692d-40d0-81c8-39897dac887d" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="c01f69f3-4ef3-43b0-8161-f2bdc45631bd" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="a5d13827-2926-4ffd-a621-6a4dc1167599" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="2d225b26-027f-4134-974f-320f1883bd8e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="96a563df-9a2e-4ea6-b03c-81b1f4302ee6" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="9da00b09-c104-4b3c-beda-fda50dba030c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="93f77b54-5cca-4137-80bc-fa2f53fc1bf3" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="6557b138-cbdf-42c1-9e16-991e2a472895" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="4d2f4767-0864-4291-a8d3-870337315273" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="151f42e7-ba2f-4676-afd4-c6f1d7dc8d82" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="8efb0715-832e-431e-b7ce-2dc14d018d13" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="b685fda2-5164-449c-bbc3-f7e8f7593152" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="283d37eb-cbf8-4ba1-838d-89930aef7fb9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a2a501a4-840f-436a-ab66-70dad5af19e8" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="b4c346a1-ccd4-4a84-8f96-d60269f7a198" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="c0e23df0-7132-41ab-8ec3-3c036d87b77d" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e2b2920d-a1c9-4566-a3c5-e8fa7ffbe1fc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="271fa158-0196-498b-b260-771b463f3b00" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="2deab280-c635-4a09-b251-9f97608f332f" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="042e3096-cb26-4565-9294-55364b17daea" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0ce3198c-9a27-4c9f-8412-e49442e9f265" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="fc6c84bc-c820-4c9b-80f0-bd6d6b8001d0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c7d4d29-81e7-4fc9-8564-60fc2c10d68f" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="8bb947eb-f61c-4caa-914f-ebb9d50ce67c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bf1ea075-9423-414e-9ee5-d80f8b3e696a" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="ae56a31a-b52e-4fdc-a0c3-5a08c8c703cc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d10d7990-bab3-43ca-a333-73eceb49a75b" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="d0227df9-c8b8-478e-a3c4-20ec1d44ac1a" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="dfd4a9cc-15f9-4c19-b05f-42b5dd6eb240" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="57acd937-7373-4921-8d91-e4824262b9f6" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="3b52b951-3dad-4c7d-a80c-39d06ce81c3c" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="d996d22c-869c-41c7-8d2f-429d33db82fe" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="64da353c-d58c-42a4-9ea4-1c6a84bfadd6" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="cf5ba492-5619-49fe-a8bf-17eb5ef42920" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="72bfb924-6412-41e8-98b4-f21285a86f65" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="c60c4382-a42a-4891-b1ee-670fc7eb67e8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a245435a-43da-4915-bb6e-54eb4d1c9598" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="81d499f1-e434-4b1f-96b1-04134697811f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c36a9d6b-d451-4072-8d05-4ba28a91b6ca" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="964ee9ef-9903-4d33-942f-9a28940af2b7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7380ffab-4afe-48b7-8e28-4e8d7ef95eb3" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="bba211c8-db0f-48a8-bcac-6631f581a98f" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="af8a2c4e-0785-455a-8394-8e9d26197893" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="8e2e23f7-ff20-4eae-9aac-34dc7eee1c5d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6c11f249-97a6-43c3-837a-709b69026c4f" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="0f695025-4dc3-4059-b7c2-d1ea9bf68676" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="e4c698d3-a279-47be-86fa-f58df99806f0" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="75f25a5f-ce41-4a45-849e-9425af240508" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="81478d6e-fbd0-4506-a827-ed20b9761029" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="baa1adba-132d-4a78-a41d-3566d8686e22" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a78dd84d-c431-4dbd-abbb-f26ac57b50ad" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="857944a2-edd6-4bbc-a3de-656b30bb3601" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a792feeb-cd10-42f1-8067-6e3afa7edefd" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="60fbec2a-7ab1-4617-9cd7-b4b6cebcbb71" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="e579f502-a3c7-411b-854e-ac2b87c3d539" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="32cf4f46-0d35-47ba-9f14-5323e79e3616" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="eff4b33a-0e67-4cc9-9505-17ca15525959" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="e8864a80-c6b1-4b9f-b7b9-c814951ed4ae" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="255af147-9a52-455f-b489-41cf460d662d" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="db96ab89-5eb8-46c5-a2fd-350115997b3d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="11bc3746-372c-416f-82e1-f87f7093d7a3" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="0c84d750-e761-4ec8-8b98-895de6e49da9" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="371fbeeb-16b0-4535-9b40-4256375697dc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c5a9913-cd32-48b8-8754-22871802b9e1" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="dba1d24b-7dfc-4c58-a4c4-bd5fdec88129" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d56b57f6-6457-4cf2-8946-6c7df407588f" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="7dfec0ae-2667-48a4-8249-c48b1930a216" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e392f32a-d74f-4a33-9030-aed45c94f283" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="3d08be82-e306-4863-8805-2c4b09ff20c0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="305e90f7-f7b0-49b2-87c1-4c089dcbb05c" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="1d689c89-d4b4-4791-ab5b-b10e5f0d595c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4e08e996-51c4-4130-8345-513d9c8633af" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="a29098a9-0a3b-43d5-8655-b86e866d3040" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="59f4345d-a007-4b20-8ec5-13858d13682a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cfcd6185-9401-4e21-9809-50ea9ec35b21" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="bdc7fd06-3284-412c-84f9-9c4459064928" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="84d4c2a2-1ef2-4f68-969f-28a475e443d5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7906e956-3998-4a6e-953e-0e8968b3dc6c" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="e3ce95d2-8865-4cf0-8036-a4bd5ce40d4f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e7ed7fd6-71ca-4a16-baf6-b3732db2884b" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="1596158b-4dd2-4363-8a54-30bb369bc915" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2e2f1eb7-d0b3-4a4a-8a71-31edb4cb43f0" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="b625742d-d127-4d6d-afd1-fb71aee36f78" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0bcd112c-b257-40f1-adc7-c7051f68bd01" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="12f3cd82-8d0a-4d8b-bbe5-685a4313df7b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a936d03d-40f3-40cf-9457-a83bb8f06a51" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="b55aa259-8865-4801-9f5e-747015bf30be" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c57cda7-b4bd-42f5-82b6-1e67d5b41fbe" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="cfb13338-fe7e-40df-93ef-16b78f38b479" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="23215724-91af-4cf5-857a-532a338d441e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="92660323-daf5-4cf8-82fe-8415a81e4ee8" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="14b03bfc-17af-44ff-b9af-1c2c1a75466b" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="c6037bcb-23e3-4f45-b22e-7d1ab2a10cad" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f087bb10-669b-48cd-a7d4-c10e1a98bbf8" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3de5d83e-b6b5-45da-af79-7b4f7748da1d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a23f5840-ff3c-4c51-b591-5957227cb30f" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="25ac74d3-22ee-4954-8fc9-ab2c97c1d905" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7189f97c-c98f-48d9-acf4-b20ff179598c" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="35725adc-436c-4fc0-a9fc-b091b13cc639" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="32f5bf57-b288-4e92-a890-e044a69cd377" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="a0199b0e-5a9a-4523-8325-2a443cfb3e46" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="924e3908-1161-4331-8a62-800fb8e6eea5" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="0dbe660d-7f6e-49e8-93a5-284c089dd403" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="f718cfc4-aadf-4efe-b1c9-f59c215cbe7c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="624f4e4f-917a-4b75-8a03-0e0dd45654e5" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="2a3fcbdd-8ecf-44d2-8fca-ef27bf22a2e7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="54c4fd5b-d5e1-4168-84d2-6087814a1597" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6f023d1e-25c8-45e3-9a04-ccf858b4a9c4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="8d0ae064-ebc4-4ff1-8f69-9769d1b37295" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="c153a3af-bb66-41d0-a5d8-943892c6b474" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="1515d28a-febb-4220-8ee5-d056283aa9ad" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="55ee96fd-54e0-4e5d-a143-36d243812e32" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="54e725cd-64d3-45f5-8225-75bd78be72c6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fd1de128-ea48-4afb-9861-88898b523abb" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="194d5ac8-2e07-4523-b847-2161b5923484" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="90e8c67c-00df-4ed7-88c4-39e3c70b7815" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="caa7a338-f290-4ceb-96b4-2468b1b2c90a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="6528130e-17d0-4e62-8943-ab8acc457526" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="92a4b48f-b379-4577-b6ff-d8f8516b7acc" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="2fc6041c-75fe-473e-9ed7-2ef53f404eb3" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="eafb7a25-764f-4180-9575-236583800bd7" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="547acae5-8c26-49e6-a754-562059c356c0" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="2642c982-c83c-4f1f-ad7d-aa8b8a1a6c05" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="6139e3cb-7aa1-454e-96ea-940fe77db89f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="30ef4c24-0874-4af1-ba39-002aa53155fb" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="a23e1a2c-0955-4e8b-99de-370d58539c2f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="94ff4555-241d-49b0-96bc-d74306a6fa59" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="126f4cf8-7266-488d-b888-e8f60d47dc55" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="b965c0f2-bcdb-4b10-8f19-57c7f4b7ac38" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="05717cdc-6abd-4cf8-8dc8-0e831035fe5b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c4fdc13b-efd4-48fd-ab2b-edc340d0f6d1" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="2a902309-35a0-4078-8d93-996cb65ec8f9" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="d1f6ea20-041b-43e6-8799-b306b3f9b957" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="92a64646-9b07-451e-b759-6be08d844416" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="5a127978-1cf1-4f5e-bca8-616f1b739b9a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f1297263-b4ad-4883-8f1a-7a6301fddd5f" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="da11b9bd-4d68-4c11-b69a-f845ef4b6ceb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="52b58d02-baba-4f60-b857-802421a813f1" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="bd17a03d-a3bc-4767-834e-d38c5ea79b42" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="dc8b95ef-dede-4b2d-a71a-472934ccabd4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="38a93c77-5b38-459d-9b1a-b4e8a6f91c2c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="2dd523a6-a23a-4119-a038-5584726c88fb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ee5a1afa-cbcc-4091-9796-0687c8e1c7c8" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3f44a800-bb24-44e9-b4ee-e1d97895a4f7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="51444c7d-b59e-453c-9103-a9f28bc2783c" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ed7a62de-8825-4313-a7c8-c0a945693993" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4944ab82-1e6a-4ab2-bc54-9b63e946d767" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="385b7630-72ed-40bd-a1d0-e36cab2f492b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="cadf37b5-06bb-4dd0-853a-42e2f13db11f" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="dafc28b7-2ed9-46c1-9144-d5e64fd6d9b4" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="2a22ca6a-9568-41e7-8e74-23c1d46dbac4" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d42c692c-00c9-4a31-9088-12125ae5a862" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e8b0b746-a146-4ee4-8e60-44c7c94c62c9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c6f0941f-460f-4d8e-88c2-1dd948f33f0e" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="930f6507-8932-4eb7-9e14-861f2ba0eaba" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9f0caae3-da47-495b-8d0e-f622f500beff" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="028fa3a7-5e9d-462a-95d1-893c4fb9e771" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="37f7ffb3-9a60-441e-9acc-f65f7ad6f44b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="4bc4fab7-aaf0-428e-aed1-94e9712f0f50" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a4a0d204-47e8-417e-9636-cfd56f6f57fb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="4ffcc06e-c4e6-4b25-8556-079eca9e5a02" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c26bf4ef-95a8-458d-bbe9-a741f2cae9b5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1b64a6c1-7e06-4583-94f1-278b921e517f" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="7b2161de-113b-4c25-9d86-7f5fcffaf42e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b242762c-4f47-45d6-b697-ef26c91b534e" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="f7644b1d-034a-4b21-b879-fc43c0b1bf83" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="b2a90d52-bae5-4f54-bbda-1a28915fed2e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="13423c57-72a8-4718-8e51-72cd6ce36556" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="4beed9ad-3da9-43e3-8b4a-59762f12d15d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="4429b462-0f4f-4b6b-9038-904b84b74bf8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9ff6ac77-9255-4e47-9769-7d0f81b5cb6c" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="bd010cfd-bb12-4a83-908b-6002799485d0" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="ce5ea396-75ef-417d-9b70-14b240a5d641" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="fc3e4502-f3f2-4126-af1f-a18ada5ceb1b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="53a89e61-4dfe-49ff-a0fc-edfb395ae8ca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="56efe22d-2df7-4a08-9530-1f9972e7940d" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="75679e79-71fb-492b-9d51-fd845f8241c9" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="70fa7e32-f696-460a-9ea3-65a6d90a4429" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8d6fcbf8-fa58-4bb2-8a87-d6885e5e1de6" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="50045d52-8025-4fa8-92f0-951824ea87e2" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3c7cd681-af9c-4dd3-b394-1ac7a1ac3c2d" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="91ba8d57-1ae9-4551-b7ec-fa7b80e6e583" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="aaf5db43-f04c-4df3-b2c7-8d55fd1630ac" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="2c32e910-8fca-49f4-8ba5-fdeab67d6385" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="069b76a1-4f0e-4baa-bece-dd96a6096fe8" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="432ede24-aea8-4abb-9dbc-a9d4468aa879" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="264fa219-456e-44f7-b5b9-ec0a4cb6ca0d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="760a5763-0ee0-43b0-ab10-1af5a4b22c2e" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fc6870d8-9024-47a3-bca9-96d9ee7f9b51" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2ca6e42e-fba3-4a07-98b2-bbcbd24ce1a7" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a812e17c-e21c-4082-b5b9-5660f6d58f16" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="eab2eb6e-a636-4d27-b208-ad0987734eb3" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fb63cc92-e093-410c-9a16-0332503bfb72" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="80d11fec-6b5a-494c-ae19-7b7f08789337" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="c968f32a-40d7-46e1-bd73-68b4935a34af" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="2ccf2a15-088b-4834-bb27-a8287108f7a1" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}