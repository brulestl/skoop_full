"use client";

import { useState, useEffect } from "react";
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
  return <div data-unique-id="ade03ec6-cc45-4ca3-a765-bf978fabdcf1" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="281c5d0c-c00a-4a4d-afd8-ff8d8c26a001" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="6e21ca4d-45df-4823-a940-f48a9070af26" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="df572fc1-9270-45a6-9605-769777e16d49" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="1f39723a-0581-4a3f-9c63-45a6a1dd3092" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="314c68e5-0b17-4a10-b9fd-c37d99499549" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="e8077a9e-48c8-4a8c-bbc0-7c7fb02b6f60" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="74b24f6d-f1aa-4d30-bb5a-cc2f2590a0da" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="84e38517-d409-4475-ae62-9f6f1f9cd370" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="01659865-216b-4457-a8e8-344a55fb313b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="7def9915-0386-4bd5-b3b7-db4ee59ac4a2" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="b3a817b4-d212-4a50-bab0-7715e674cbf1" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="7a5285a6-524a-4153-a77e-1ffca6500290" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="73738e68-8e6c-41f8-ad92-21102254bd7f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="53ab9f60-caf7-4b60-a3b2-71fae37211a5" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="bcea91fb-2bfd-4cb9-9cd6-4183149e3ddc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="eeb14d8a-2597-4951-b13f-43e588f27e8b" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="6c33386f-92d6-4153-8b68-354c3f78553c" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="e093ed1c-34ce-413d-8802-c8d52908af8f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="df43a71b-505d-420d-a81f-5af6616411d9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fe49f660-0c9c-460d-8812-d9ecea040297" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="b8e31d3c-c145-4df5-bc0f-1069e766163b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="2ef1c6ce-2979-4be7-92b3-c3c4ecf510bd" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="502fadcc-d5ff-405a-ae65-046d7ad42af7" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="08f4f9eb-79de-42fa-b281-c0f1696ffda1" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="53ff75e8-c977-4873-b2f9-bd4f652babef" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="dbc338e5-16f5-4f94-8600-234df6b6ca3a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b85baaf8-9e55-4d7a-9533-2b3c1e84e845" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="c19b244c-205a-4baa-a830-636bde474c2c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="ba0d585a-55f9-48e9-ba52-edf9caee7e71" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="a55d50ec-1086-4fbb-9d3d-145e2cdb5999" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1666152f-1b48-459c-819e-b380f09d5e4a" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="41b83b20-04c1-4a33-a66b-7ff43b6887e0" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="3a89afad-f963-4fdd-9993-af0db068544d" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="8c4ed96a-d423-4961-8a1b-c0c650412825" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5280e85a-fb54-4d6c-ad66-1b000380e624" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="60873388-ce89-4390-850c-ecb737fd931c" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="1022fded-d2fa-44ba-a0f8-20b7192e4a5b" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="a4ae8b29-801c-4e90-b13d-0e757ee2a2a6" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="91dd1cf8-83fe-4b0d-936c-13b9eef9dc64" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="7bf68ea7-b47c-4384-a1d2-b2bd01162101" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0bd1e94d-9e91-4ac1-9f35-cd3f5c6be5d5" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="d109825b-bc62-4d20-8e7b-3790e0de231c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="de1d08d3-fff4-4515-b492-6c90cac6feb0" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="28d70706-cc01-466b-9bb6-14fe1e1b78a6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6d658243-ab23-497f-8a1c-5015305ceb75" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="fab41304-1ec5-45b7-909d-71da811d10a1" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="8c8140d2-8795-42df-895a-a95585bfc942" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="b3d873d0-bab0-4f3d-bd71-4a9577f12b47" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1ccf9172-6c05-4ded-9f46-2da8e760d7ff" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="a1dcec12-b0ec-4d27-85d1-0c389856f54a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="343388a5-dcc0-4f2b-b010-849bd918ec26" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="5311bd1d-154a-483a-a98b-73938de9f850" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="03570eaf-96bb-4689-9c26-6ff1d485c63f" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="2ba62f48-75f8-4e98-8a30-eb50b64d00cf" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="10b06bfb-3846-4ee7-94a6-0c2ed6631ef1" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="7396f717-29fb-4cb1-b9f6-922494d7eed5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="475760a8-c106-412a-b15a-265403dc47c3" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="b3543350-bc35-4c4c-9670-c4a77a7fc971" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cfbc6bde-9030-42b6-b66d-1a29c0f3d5d2" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="279511c3-9605-4a03-93b7-a6ae465c5650" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac2a4450-e772-46d5-93bd-51ba228b54e9" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="f6f0dc35-33ef-4a19-9b4a-34a0b5584cf1" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="ce648171-c9fd-4748-8455-fb1bf508f8fd" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="dbfc0c59-cfb0-4824-8621-3b4a1443aa49" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="bd54fdb5-9b4b-4de7-8aee-96f134a6e16a" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="74cc5eec-c220-45de-a07e-499d47a4fd57" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd8b4801-07f5-4a08-b4f3-859ef7325d6d" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="5c5e4baa-7128-4470-86b6-c82d7f028f13" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d3b3efde-b747-4418-a3d0-97111bc4b391" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="4030b418-c3e9-47f6-9ce4-bd7f530d5068" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="d3522088-fb26-4398-8db2-cbbab0d60551" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="90242903-5947-4b27-9b92-f8a68d360c9d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e16d36d2-aca4-417e-bb47-b6338fa2ff4a" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="c32352d3-452b-4f16-897b-44f81dceed5c" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="803d41e6-4f90-4a99-8313-7fef45bbedfb" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="d2a45cc1-a414-4208-8dfe-63e86759f321" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="ed66fc78-0c57-4ae9-b044-e8a8cbf5d590" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="982ecb29-2513-4bb0-9427-e69e8dc0130f" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="b5915f7e-f13a-4dd5-99df-52c40b4ef3a3" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="4165d9a5-112f-4ccf-9f45-a27815905d1c" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="dce48be2-8986-40cc-932c-d8ab7f514cad" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cf256708-7de8-4a61-bf54-6ba71947e386" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="506c4acb-b979-43ab-b76d-ff7713cfe968" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="fa61a7e1-c1b0-41fc-bbf6-97c6f1089ab5" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="3e662f4e-a8b9-4a56-814c-e8d40d84ff91" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="431da3e7-475e-4c89-a6fa-ff9f4fb9eae8" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="4cfbc424-497e-4080-8aec-afe701d2e5df" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="30085dd0-89d1-4244-a6e7-519599eae137" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="44c8fe66-1aab-4867-91b3-d6bd18839d4a" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="9d6dce4a-a02e-4334-890f-f610ae1ff0b8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a0c5863a-3e31-4952-b0ab-7d4b78490231" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="3ca0e57a-38bb-4046-a69f-659b18e8ec17" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="812b1fa9-5c77-4394-833a-ab6770d08fb3" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="43e98a32-944a-43b5-9e6d-4b490fded99e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="aaaf19fc-617b-409f-9fd5-74c09f944b77" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="3d9b1242-74db-4460-ba8f-79fa6d0488c9" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="5410ad57-83dd-4394-a7cb-fb5a5b391488" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2668da44-d19b-4b2d-858f-455fb3cabdc6" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="6ee7699b-d22e-4a9a-8a8e-8130805cba10" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="f6b91287-14f8-4fa5-b409-386f55923afe" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b2cdac17-6506-43d3-9b58-348b723ab234" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="e8a03c44-91a1-4c42-8da5-c8a6d11c37bc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="292401ed-7d45-455a-ae4c-60437b6cbfc5" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="5006a298-57a3-48c6-9761-1d7e9fa6d920" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="88d17afb-a63e-4b6f-8527-868a58b95e08" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="5fc917da-8d13-48d1-8300-5396e77b87f0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e00fb982-bf82-4fbc-8ebb-ad3e7c95a925" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="2d4211a2-201c-4fed-a833-31c4fd96e33d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8e2fc23d-2dc5-42f1-bc50-6aa14fc3f735" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="98bf0394-369a-431b-9415-a58ecfd0dae1" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="b841d27e-3af1-4839-ad33-c017951de485" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="7f490918-bbe9-4f88-a8ff-b7f1575c3300" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3db0f2c8-a908-4f15-aab5-b6704d85fbe3" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="a03a91fa-66d2-4518-be21-14e0203fead5" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="2b6a437a-9658-4392-92c1-fbfa276fbbc2" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="bd4cceb0-a450-4bc6-b76f-a313fdf91d82" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="f4f9a881-d4db-4343-addb-56ca1432d493" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="beab1ed2-c1a7-4002-a985-d0e9434f5164" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="62c657b3-c6b9-471c-8e32-783846fdc5d2" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="c1b38645-2b4e-4e7b-a199-9f5dcc037487" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="07ae56ef-db7a-4b42-82fe-57d3892d64bd" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="58def10f-8e57-4472-8e20-946acc1b5216" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="4c9e13b2-93df-48dc-854c-1ee7c638bcb8" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="9b5482e8-e891-493c-8bcb-9ae28cbc6f21" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bc2e357d-4eb0-420b-afff-f2eda2c8de9d" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="38cc7a80-7191-41e6-9162-9a55c2ba1842" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="f079f777-be25-410d-9302-151892bb829a" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="d33621ad-9593-47eb-ac5f-67cacf55c294" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ea965c51-417f-450c-a4a6-f62d5e05e938" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="dc33b66f-78a4-4d4d-aa9e-bb055e69ccfb" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="03377284-2a81-458c-a50b-ce97ea68a3c4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="503e9202-f2c7-4b76-b10b-e3aec34b4e0f" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="47b7cda6-7f1b-4f28-baf2-39ef08a456b8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="17b096be-6389-4df6-b2bb-642a62cbe880" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="94f78ab9-93bc-48d4-9b70-2e4a82a39f1a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8b37e691-45dd-4106-8c81-86e6dff43e13" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="4faa910e-a036-45a0-9847-84eb94674480" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c59940af-eab1-4d57-a720-f29ca28e4b0f" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="c28a41db-de2b-4ae4-a148-c47b3c93e5fd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f76ddd42-78b2-4469-8aeb-62ef693d1b37" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="c7e249d8-385d-4ec6-8254-1869e22a5749" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="9981c718-bf69-4333-805d-3e2995a45338" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="37c245cf-6d8a-4ef9-a00a-e130a1e44cf4" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="67dc26d2-7cdb-47b9-9c6b-bd94983fbc15" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="659f0efd-bcbb-49e7-81c8-eb61268be027" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5928a892-028a-418c-a64d-601b85d628cf" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="d6d57441-5bcc-4467-a601-78c05bd7594e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="989a1189-73c6-427c-a335-cdd218d00e64" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="b8d039d0-8cb8-4180-84ce-6c8184fcc226" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e9a2e452-f61f-4e16-b4d4-7c4a4c272d2a" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="ab05ffb3-53b4-4790-be48-842706bdbd0d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="782600f1-d27a-4aae-83ef-2eb1b467b49f" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="9a0f02f3-7ad0-49cc-a1fe-a29d659f2929" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f1509d8-c974-4b11-b0f7-3a70f4407b5e" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="01abe70a-5f36-4722-8476-de68c1059330" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1b4c0b7b-1c10-4eff-95fa-e4947abfcd98" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="1b491fa7-0b51-4f03-a68b-bf47a53ba8d5" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="707b1684-25f5-47de-bf39-bfa718a36f6a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d4882036-3357-46cf-a198-1e82d9fda036" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="f8f151a8-7896-46e3-bdd3-c5d60e5e2c70" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="ad00fd3b-2a28-4e46-8e42-a25dee701b15" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="101e2d28-b476-4131-a6ba-2001b425ed94" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="83a7cf67-42e4-4a84-982c-72ee5aa8b305" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a2f38bef-ead0-467a-8c7c-c204dc4ac000" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="27824c8c-1046-4147-add7-23b8bf6cca14" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f344e2f7-2f17-4def-8077-51d0bfecc101" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1203ce7c-d7c0-4d00-8192-0d2717a18f69" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="295319c6-412f-4ae5-9fbe-02b1d0428700" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="0df56801-a604-4e25-b4b6-f89fbd0b7043" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="2e2448ad-7165-46b3-81fc-3d438d06763e" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d2c92b9d-d964-4fb6-85eb-e8f7fd186620" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c20e6200-75e3-427e-8c5a-fe97a67b2e25" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4ca01043-ce20-437f-a5d7-514b372e1e78" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="2ec3b892-e4a1-40fa-8da3-24b1c6b708ab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="081ce6c9-68c7-4569-a8ba-7a6e6805f3ba" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1993e6b4-3a6c-40cb-aacd-75555dc0f2e2" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="72c2b140-fb47-46ac-840f-596ef41fa019" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="0f8f866a-e384-49c9-b4b1-aab96d0825d9" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="c3bbb9e5-7dde-47a6-80b5-c8e5e7443aa8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c505d9cb-3998-4242-aac1-3bfd428e59ae" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="ddbac83d-b236-4e37-8c42-34050bee0fce" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="adf26783-9ed7-49f3-be7f-7cf71b3bd4c1" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="d4a3bc71-0732-4cf3-8733-7c75b15f22db" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7f06b0bc-ed88-41f3-97b4-24c6ffd04c63" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a3b578af-a2b3-47a0-ac39-b72754da09fd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="f89d282b-d507-4291-a433-312ea2439f65" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="0da30a1c-a378-46c6-859f-e99736cba91e" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="12d1aed1-5771-4d22-aaac-8ada2afb7d30" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="787f9290-1c26-4df7-a626-023dc70f62ad" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="3a7eb0b3-1ccd-4204-bda8-05df027b9720" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function AIModelSettings() {
  const [selectedModel, setSelectedModel] = useState('claude-bedrock');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setSelectedModel(storedModel);
    }
  }, []);
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredAIModel', model);
    }
  };
  return <div data-unique-id="4ffde381-733c-4583-ae9f-9f9650bc6037" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="e773d4ce-09bd-4275-ab41-e19c0e5956d3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b95f2994-3f2c-4643-be73-e09d90063064" data-file-name="components/dashboard/settings.tsx">AI Model Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="256b82b3-06fe-410e-a5e1-a5529e036963" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bda0b76d-8dcc-4c42-9735-333c506c6aa5" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for summaries and search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="a22f903d-5819-44e2-b9c8-566e194a9431" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="920c3784-37d0-493d-8986-23f4eab6d650" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="ef9e674f-9e43-409d-937e-e6f69c66de4e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c392ff37-11fe-42c9-81dd-0271c3d3998d" data-file-name="components/dashboard/settings.tsx">Default AI Model</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="e31f65bd-142f-4903-b1b1-8474462a1940" data-file-name="components/dashboard/settings.tsx">
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'claude-bedrock' ? "border-primary bg-primary/5" : "")} data-unique-id="860b5756-f1d9-41d5-b6f2-985324ab835f" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'claude-bedrock'} onChange={() => handleModelChange('claude-bedrock')} data-unique-id="1c554a81-85f1-4125-ade8-ad9fd8b3346c" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="2b5ecdc7-7a4e-426f-ad2e-6811af529a18" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="88200da4-21b8-4bce-af92-1c6056d8bdac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4ffc276e-fd62-4c2d-8ed0-94b0f3a31497" data-file-name="components/dashboard/settings.tsx">Claude (Anthropic)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="9021b868-915b-40e1-ad16-5a39e40de43c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d5595766-f1b8-4d4b-9ee2-eeb4f13ef305" data-file-name="components/dashboard/settings.tsx">Advanced understanding with nuanced responses</span></div>
              </div>
            </label>
            
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'azure-gpt-4o' ? "border-primary bg-primary/5" : "")} data-unique-id="f2515b86-cd30-4175-9248-131812a91dde" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'azure-gpt-4o'} onChange={() => handleModelChange('azure-gpt-4o')} data-unique-id="69b09c6f-209e-4b6f-8322-fdd09759360f" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="822a9d0f-3e7c-4040-bc98-56452ce899ec" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="3d1fccb4-f5c1-4724-a487-ea12603261c5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="20e76536-7fa8-44ae-880c-7b1dd422e4ed" data-file-name="components/dashboard/settings.tsx">GPT-4o (OpenAI)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="5cfcdec8-4e62-45f4-a39c-4f45d43b85ab" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac17d017-a040-4880-9caa-300a9ba7402e" data-file-name="components/dashboard/settings.tsx">Powerful reasoning with technical expertise</span></div>
              </div>
            </label>
          </div>
        </div>
        
        <div data-unique-id="6acfd901-2191-4bc2-91ec-ca4a10145f70" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="3a307c91-8606-4f98-a16e-22c1cc9ca42b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="920de535-7f43-435e-8657-fa7eb69a4885" data-file-name="components/dashboard/settings.tsx">AI Features</span></h3>
          <div className="space-y-4" data-unique-id="f43439d2-35b2-4def-9cb6-1726352bda8c" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="080f861e-1779-47fc-8cf1-2b69556b9761" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="be136353-d22c-40d7-93d9-a57f1b9def52" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fd7108be-6c57-4fd9-9ebb-4f81ccca893e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4a889a77-2085-48e1-8c5d-b70b6c3f2249" data-file-name="components/dashboard/settings.tsx">Content Summaries</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b860cebf-7b12-43c9-b931-655a35fb29a0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="83f0f2ee-6355-4972-a449-b54a5029f468" data-file-name="components/dashboard/settings.tsx">Use AI to generate summaries</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="08a28ff5-0f68-4432-a0e5-5365150a0afd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="99942d21-2a6d-4f55-b2c2-53023938b2de" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="90001163-2ea0-4322-b594-dd4cba04dcf0" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="f1735976-ba7c-4298-8d45-93a0e7a3a26d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d8d93540-0053-4d79-a79f-064aa67e6e66" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="be643de6-49f2-409f-8101-5e2b3b5289eb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ec8f8c3d-70d6-456a-9bc5-0cbf64f55638" data-file-name="components/dashboard/settings.tsx">Smart Search</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6863503e-041d-455f-9a6d-59ced9b3c802" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7e282988-7355-49a4-9ef0-7fbbd6ffa069" data-file-name="components/dashboard/settings.tsx">Use semantic search for better results</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="262239d2-1f49-4a68-a893-fbc64d1caf0b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="12dff8ae-30ae-42a2-acae-47c3c1b8b537" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="6261c92c-eba3-4e0f-818c-78b076545aa3" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="0005ca41-c0e0-485c-960c-b767a391b87c" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="01e27a10-a2af-47b0-8398-1fc6ae1ff629" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="28ed93dc-a4d5-40c7-b60b-34bfa237bc1a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3c79bbb9-fead-442d-bb6f-b73c21d1671c" data-file-name="components/dashboard/settings.tsx">Auto-categorization</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c5224965-c14d-4138-b663-99ba988b1da7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f5c09c3c-d8c9-4c70-a008-3f7992e2bcfb" data-file-name="components/dashboard/settings.tsx">Automatically categorize saved content</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6011a3cc-ef8e-46ca-b158-ac2b4886d0dd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="c44e2c7a-1fca-48a4-8e64-fc05a24a0741" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="7af0a83f-7418-4202-971d-48d05113bcef" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="d99a370c-1f56-4c17-85fc-e7c83e983a24" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="e097871a-ec86-480b-9dc4-2d65a54578b7" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="0d7fe7e8-dc2c-44ef-a2e7-b761e89e7828" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="eeda86f1-6fe7-4ddf-ab88-3d614ee7e8ad" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="5c0b24a7-5a76-4ff4-a211-6b12d6050b92" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="59ee48ef-213c-4a67-a89b-3be5a1c1f380" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="fbd1c65e-cd46-4128-93fc-37f029fb14be" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="963d8520-0d38-48ce-a203-a90233432460" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="e9040d54-6190-46a5-9f7c-a41230e38ca6" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="ad137dde-9d8c-477b-9acd-1be91830bacf" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="0121bd26-da04-4030-9085-23a74cf1bd45" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0aa423ef-ed20-40c0-8e87-bd2682b2ef17" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="688fb2e5-3d2d-43b1-a424-1df2cf58caa8" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="51b590dc-24e1-4320-811d-9fdcc70b9a39" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6d73541d-dd41-403f-b14f-a2930db4d866" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="6b007c75-68be-45e2-8d8e-f69233410bef" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="95aaec79-8325-45b1-9252-706ad7b5bcc2" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c41a13c7-c753-4c3e-bd3e-e0eca606dff7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b7e8ad51-4aff-45f3-ae25-92a848266d5a" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="aab7e094-2064-4f1a-b6da-825f53cc5b50" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="6d107df9-dd28-4369-845f-d11540af53d4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="1661282c-8e04-4c1a-b3de-3dd3335405cb" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="b431d7e4-e3fb-4504-afe0-a56b5db1c6f9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6dedb1ed-9d13-49cf-8bca-6ddd9d9a3f29" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="869e7c42-c8e5-4fd4-8167-40d50d94afd7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="23811b24-e218-4bd6-abb2-59a86be6a29f" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6966bbdc-4c0c-4b4e-af92-4308414a6ebd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d6fcda3f-5aae-4556-9481-48ebc122093b" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="59b6cab6-f336-49b4-9b27-fc899f1c29d8" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="9ce9c662-75d1-4ca8-980a-24106d6bc60d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="d64cd47d-77c0-4825-ad09-fa92532178f3" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="0193b505-57dd-4b42-9d31-7781e764df16" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="a8c271cb-e663-4ebc-b904-5b66e2744cae" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="4713f68c-a0f0-40ef-882b-b23533e90dd2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6b1468f5-76f1-46f9-8d89-5fef09c4c3a6" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b082f666-6968-41af-b19a-9da08d0f46f8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3b040950-840e-4a1b-9b1d-eec5b5638523" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="263ffe75-de89-42d7-b0c9-efa8aca446b9" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="ea6ebf19-5e2c-4778-9fda-6a486949e659" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ce6f930d-1188-4184-8ee0-7f52076a7dfb" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="5d375a57-b596-4ebc-87b8-bbcee2db603f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="043f2b35-fb73-4e95-9ff0-b32e83380ce3" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="74934dfd-f90d-47da-8fe8-9e08318a0a61" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="32be779c-a2cc-4024-a831-37b71762bbac" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="b27c192b-0b6b-4f31-8419-e1061f6bbbca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9c7e60be-48ab-4efc-adf7-d2c32df50ad4" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="86950d86-ad2e-40cd-8695-2d47ed0f4e74" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="aed78c49-8445-4404-bf26-aa303c3bb1f2" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="37097a9f-65b8-4310-b97b-9b7d3ecac7a7" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="6f24adff-d4a4-4f42-b521-7033e088fcc9" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="58b6f967-2cd1-4dbe-89b8-0d59e79017e8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="02872201-1909-478b-a364-f7e8b9186579" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="0d79c48a-d12d-4f4f-8f12-55505d9bb878" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="b2a3c47c-fe56-4232-8b35-238dbef2dfe9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="cf32bf01-1065-4db2-a861-da265a6fa4d1" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="068423b2-8098-4d4e-9553-f6248be82866" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="42d6c219-e9d0-4af8-bb7f-f5e83bfd3cd3" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d603fdef-10c9-4a32-a1e9-df742810f283" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="c13ad26b-2fb3-4bef-a8cf-47a0aac82e30" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9c7d3a1d-fb42-46d1-92fb-ed9ec3cf6025" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="b00e432e-0875-438f-bd61-bbfc13f112b4" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="796ba4cb-f52e-49fd-9c7f-6e7d8135a406" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="57b789a6-6082-45d2-9d73-5687f3c48e41" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a791e769-dc68-4904-89d3-fafa6dd5d3db" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d4f0a62d-5a33-4782-9997-d346959da050" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="57decec6-5625-4317-a7fc-26fc006fec38" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="2655e736-5131-4584-b97b-eac76c538c2b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="abb790cb-5972-46de-a222-4d9899a2510a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d579c919-4bbb-40dd-b6f2-8158a8c83778" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="878fd3f5-a6f5-4dd8-b1c6-b255888dcdb7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="deb887e4-1668-445f-a66c-410920bced07" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="5052c83d-00fb-4c70-b0d9-df75dc91c9e1" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="86fe6553-0fe9-428a-91d8-79241b4ae292" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9fcf585b-0be0-4d99-810d-0ba61b34741b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="327a0cbd-3444-44ac-8ddb-9591a0d9c535" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="551053ea-58b1-4382-a55b-e493981accd4" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b5814aaf-4a75-4306-b302-488a715dc80a" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}