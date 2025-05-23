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
  return <div data-unique-id="457b6c97-f8fe-4ee4-9486-9530e0921c8b" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="6ffebe77-b08a-438e-8134-6ba591fc47d1" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="411364e3-ca21-4113-8f4f-fbbd05cadb26" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="daaad3b9-956e-4874-8437-341c28e3cf0b" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="511a841d-e239-4341-9519-8db01bcaea32" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="820b41bf-ffc5-464a-83f5-0a493c3fd10f" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="9bb0f09e-50b2-4129-8931-5f1213a9043a" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="b0c47c1d-18ff-4fb5-a15e-ba794d1b2fb6" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="8016ad01-85a5-469d-bb66-4e9ee809d53d" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="aa990c44-3568-483c-bcc6-91bb815d8d7b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="d95e0f9e-1410-4818-a1d7-ad744c1a46fc" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="c8c59eee-9b32-4ec7-a8f2-3fe7ec133ab4" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="52908827-9d01-4d5a-b271-93c77c68ce4b" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="c1b3e3e3-7f91-4b93-9118-6ab89614ea83" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ee6f6c1d-17b4-44df-98ad-e202be1ebea7" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="9e4be78a-0a2d-4b7c-90f9-6d0a411be96e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e3ebe085-6171-4dca-b448-0b010b1929aa" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="7e00b231-3d09-4a50-957a-4cb958e57bd8" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="34f13c32-a0ac-4970-b407-9e9be441e2dd" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="76cad327-173d-4325-9963-eb07eecf34c4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cf103a10-8ba1-4fd8-ba6c-5687b59036c8" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="916463d8-5d80-412d-b922-1da149b6aab7" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="819c3fdd-93d0-40e8-9431-ea1f8122f83e" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="d37299cf-2490-4558-b2f5-d67c147df407" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="500d6384-20c9-42d4-83d3-a5d3ee43f0e9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="910493a7-8030-46e8-bd37-ecf354c1102a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="f92ca6fb-6805-441a-aae9-9c444eb973ac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8fcd59f5-5bc7-40c2-8bc4-bbf8469273e4" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="c6be477c-bd01-4123-8094-ee340e570042" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="060e53b9-9789-4810-a709-9713218a2c25" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="fa41c4b2-4667-4c3e-80b1-45c46b277174" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="c6769013-1ee0-462b-a76a-ac6d1b1acd43" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="bc66ed2c-4f4e-4381-a75c-8d8f7d49d675" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="66c20bb6-c19c-4e4d-aebc-7ae9141dcb6d" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="d508c275-e7dd-4f64-bea7-17e6920fa1b9" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="fc5c08f9-4718-4551-bfd7-9289d3271120" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1c4ab756-88a9-4146-a361-4abc9c229ff2" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="f378d0f2-05de-4413-9600-4931b38b2169" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="01a67e65-ca7a-4385-8cef-da29502e37eb" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f1591f36-c915-47c7-85d3-bd9b0479ef6b" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="027f73f2-50cc-46e6-87af-fab062e60b25" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3217c2dd-0fb9-4f0d-946d-88b724d00abc" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="c1c5f86f-7e2d-4d47-8111-0296e2b26138" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1bbb0f1b-f350-49b0-a0d3-168a9791396f" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="420ff6df-5de4-42a2-8873-3c37161b6c94" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0826bad0-ecae-4bcd-a49a-c059f3d1e796" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="f3f641c7-bd7b-44a1-9b49-7abf2698a7af" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="9142d030-5b2b-486d-ac6b-aa74cdbc0129" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="ed367ef8-d97f-4ea3-b015-be060ea9558d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9381d7c9-697b-4b99-8090-468dfc389741" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="8122f68b-d556-45e4-aeed-dd5155461d35" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e9dd1988-dc9e-46fe-9f91-730e3d0545e0" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="7c4452f9-28a8-477a-99d0-4a6edbb5bd29" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9ea45e3d-c429-440e-b473-8209f02fd1cd" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="fc3cae12-9c4a-4cbd-a754-9527ddf6f03d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="b00fefad-8bf4-4671-9316-6aa4cbeb16f1" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="13fc74a4-bcb4-49fa-9eaf-cf996339ce1f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1acaa3ee-ab07-41b9-a5d9-03c477369b7a" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="b03ddbc6-a2c8-42ed-bfb7-dea7c8ef5ba1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b0045906-de52-4c29-95a4-29da1c278060" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="ac8aedcd-1fe6-4de8-8438-12c8d39c4ada" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b9c3d77a-f690-4047-a6cf-6c9c8353894d" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="1b34bcb2-c9ed-4ef9-8176-9a526acfa28c" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="53826ff0-e13b-475c-b24f-1f07f518b2da" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="5a9e545b-baa6-4682-a5f1-1038d63640c6" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="debb363d-53ef-424f-9f3b-79da8d6d0016" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="c0d86774-cceb-435e-8c87-b8ffa13f14ae" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f90dcac5-b6c8-4f95-91ee-dd6f6137a6c7" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="2f6e3db0-4a6c-43cf-893c-2cd635990dc5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="49a2ad38-c8ce-4bc5-a2f3-5c2aef3b8c60" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="6a1e3358-5367-42d8-b81c-c351ed0fb636" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="5d447e63-143d-45de-ab3d-ca8d5ff3045c" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="3b2c3065-0c88-4e1c-a6df-9a29fc8c0864" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c8be54a1-b33c-432a-bda4-f688f2ec2ab7" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="34db1d9d-3921-44d3-ba5d-030dc26f4978" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="722474ff-afd1-4677-ae8b-ed4d11a3be15" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="d4672f6f-0827-457e-a557-dab420aa2c93" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="8bf5b80b-c62c-4536-adf0-5fbf94c8f14c" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="7b6675df-a587-404b-b332-897096682e4a" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="04b959da-9ab4-48b9-92d7-026ac85ae9e3" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="f686597d-12fa-4c54-afc5-36cb0581cfd0" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="d27ba9ae-d9bd-487b-bf3f-6ba66e26152b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="59cb65e3-c076-4e86-b251-fb19b2b52cb2" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="4785255b-f456-487c-9b92-f8e557917e4b" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="5f421ca5-0be9-4805-ac1a-68f06b656a8e" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="87e87aa1-346e-48a3-8fbe-f34b156c7ad6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="07887348-9665-478e-a3bd-06b5029e9a1b" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="101e6837-b944-4f8e-904c-2b1b6ee0aa74" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="25d36015-0a7a-4c72-99cc-776a2ad54b83" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7e8e2fb2-d1be-4d69-9574-17c6a15e83f9" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="a14d494b-9d69-4ee9-aeff-84ba1cbf28ce" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="99efc0ef-072d-4cd4-bc34-22e7a2144e07" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="3f0b4038-d164-47a8-8fcd-b7937d44cb9b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8c31b70e-2404-470c-b22c-2cacb8b7bddc" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="ed237a54-324d-4742-b07b-b6fda625ce0e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e1fe274f-2048-4e11-ae49-e6dfa975812f" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="68d1a420-ffdc-4239-8692-733527a74a85" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="a2f895bd-d7e4-4c80-963a-30761c6139ff" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1599b569-610b-4ac9-8b83-f350ec872939" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="e447980b-0515-4479-9791-62a605dcf255" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="6b6bf661-c8e0-4097-9b52-eb579224d306" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="be1aa4d6-fd6c-4f1c-b8fd-ff2ccc41e55a" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="8bc0d1d0-fd20-4d8e-b9b4-25b7468a1035" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b3bf93ee-2e1f-4c80-8fe1-8f9850083768" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="3051ca68-eec2-4c68-aebe-1f0451f99a3a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ded38410-66db-40b7-93b7-07b841eeedcb" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="19ee398d-b6f5-416b-a66c-e9eed149beca" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="98423cc4-b0f5-42e6-a7f2-7cb1df7d5de9" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="b86c0488-5ad2-4e68-a93f-a5e160f42c2c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="35a18276-7a94-4b30-b870-6d9f543b163f" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="48c13780-7a6e-4d7c-ab85-d459d06165bb" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="0a9125bd-4290-49b1-a126-a5ea8bed2b69" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="f789c1c9-31dd-4be4-bcd0-d94db703432f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a8f6970c-8baf-4745-8b45-2dcfc78bf060" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="876c4752-ea91-4d9a-910e-1eed22bb5c26" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="7a91506f-46b9-4d66-b17d-90708864cea3" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="9e6f8cc4-24ec-43e3-9d7f-a43308942e61" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="54e35f43-cf03-4f13-a40c-3269a6da5800" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="38c76094-6fd8-4940-8d1a-4bc2ff4e4d0f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="268fe1a3-24d9-4cd7-8720-79525a0d78e5" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="f4a16106-96e0-4006-8ff4-ef061c69e012" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8dfb9a29-8dd7-48db-8e67-674c0d012dcd" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="8a737a43-08c5-4379-b91c-4c381049097e" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="1cbb1bae-f33f-46ea-b9c3-93f017c0ee9e" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="1ebba1a0-7cd0-4a87-9034-b44f703ae05b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ab53d87a-84a7-4585-93a5-21899ad699fe" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="90a76575-f5bf-4cce-9e8f-bff70b55641f" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="4f27e1fc-286c-4b52-9a56-53d23f13b352" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="20f38073-a562-46b5-993f-1c3c939864b3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ee568eb0-0b1c-49d6-8c89-660bb740407f" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="f3582c5b-e6fb-49d0-9ebc-1d5e259b2186" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="05e196ff-40ec-4c97-9af2-592b5d07015f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="21817d39-0655-4f05-8138-9dee470a35dc" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="9000382c-d35a-4b7e-bce9-198044e79c8d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d45df151-d42d-4c81-beaa-269f8fa897dc" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="4b36d6fa-018d-4fd0-bc66-4d4e179445cd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9e5719b6-26fd-462f-b43e-7f985da754d4" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="44ebdc25-be4d-4320-ae71-3a78428ee0bb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="42befd11-1b2c-496e-af88-96635c53eb7a" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="2e97ccfa-7614-422f-9e8b-a193f8ba52d6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f38b7455-be01-43a5-a7b4-78320d159d57" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="d4fae968-ff87-49a9-992c-a2b270f1f917" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="990cfbcb-65a5-434e-abd1-78325e0cbba4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fc4af6c1-71f0-4f87-b6b4-1701f0ba272f" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="6454a41a-04db-424c-80d4-6386eaceb5d8" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="cc3f5c43-d62f-4277-b446-3e7fad608ea9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6e13f73f-3628-49e7-a698-16cbeafdc44d" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="267cafcf-17c8-445b-9e49-1101c9fdf179" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4c8bc3ee-48ac-4726-9bf7-0935845b8289" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="d2c00c9b-4317-45c4-af84-261884134d98" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a27edd14-4e42-48a5-a07f-5ed115fbd379" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="f375d58f-4ed4-4d35-9a93-e21574c9de27" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e8865c84-209e-4ca7-a6ce-ba2125b94192" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="93136543-6bac-4a8a-9677-4cf90337927a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a61f91e0-ad65-4cd1-ae96-5dbe084eb542" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="c0031342-c4cd-4913-88e7-7c536ac822a8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="632788ee-6e76-43aa-ab7c-dad72a232189" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="d5f94030-4be0-4f66-973e-33f904bdc9b5" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="d1b3257e-7e5a-4f4f-803c-acea554e864c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dd651f60-293b-4640-b90e-f91bd28c4cd8" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="f0980fbf-19ad-48ba-8b80-ad24904bacd9" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="62029beb-5892-4ea5-8d33-c2d139080e8f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="5775a4fb-ab8f-42d8-be4b-b4637fd9214a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="1be90d30-b14e-495b-bce6-4112de97f508" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="23eec82d-bf70-4d46-a135-b9582a21ebbf" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="f29befaf-5a4e-438e-aab1-293503da26dd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2b9640d0-47e9-4206-8b1e-ac3167aef3a0" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="1ee157ae-37b3-48cd-868e-2b078a2d3573" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="42b7288d-31bd-42e7-8491-3df32867537e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="2c7f4113-2c4f-4788-b2b9-4eb4e42482a6" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="f05a18d6-a4ab-4357-beb4-48973d5653c3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="e776786d-7fb5-43bc-bc15-4db9ac2a8c45" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="9c2e53f5-dc09-4eaa-b29f-a0db3105e0df" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5f0b5780-b59e-486e-80b6-2687c4181ed2" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="5181cb03-2d49-4cb6-a569-643e26a6f31a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="98bef61f-e564-41c6-b9a7-266188a79909" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="dba91172-cca6-4a5a-b924-4ac600865c43" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="274df6cc-07a4-4bdc-aa4e-1a70f0116691" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="cf8601b0-4aa7-4a89-88e1-e5f889b87e47" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="a6dfc6a7-5cf7-4a97-8cac-bedea89631da" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c18e41f9-ceda-48db-a8e9-a99260d41d15" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="6dc4f436-1ab0-4d1c-ae6e-5bc8ea1a38b9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e0c718af-208e-4377-8ff4-4a41623be2c2" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="3537e13e-72f5-4044-bf6e-01423872e306" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="624b37c7-acf3-4ef2-be6e-f61e498d5f42" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="de2f81f4-950c-4c2a-9b62-220e34bf1fd7" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="dc3c7d46-5af7-4c33-9cca-c6243825f319" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8c5cf854-ccf2-4a73-9417-6d2ef34d27eb" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="0943fa01-29d9-4ee7-bab5-b4f4f9046c60" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="81adf854-ee2a-4c7e-9bb8-577679c08862" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="79536056-095f-45a1-ba67-eebcc152513d" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="66816a20-3064-4ecc-92b4-ecd782cd1829" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="84c47b3d-81f3-4068-bc4f-bdf076a8830f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5ae6afba-8599-433a-af40-d9e55542bf62" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="72122058-f8e1-432a-8959-3d7a87a92097" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a665d827-a8c2-4761-8a52-6fb01f32eb88" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="a8b7c641-1f4e-40cf-88e3-c3820fafb708" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="2317a5d1-3d81-4ee0-a380-c58f954bc76d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="ebc34b15-7a6e-41f2-8722-01994b8c44dc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dfcd7ec5-ad73-405e-aba5-4821f421f4e1" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="52b9c036-3b39-47ad-ae6f-8bf995487509" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="c77ecd8f-f2ea-4fa7-8e5b-949d4a07d669" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="eb957158-8c20-4e52-a462-adb730f79dc9" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="31237bbe-e461-4c4a-afb2-8b8d1812c141" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d82a22e2-3b3c-41a0-9bca-e3bf8f0c267e" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="362a4eac-fd42-4c0b-9102-fb3b37da09b0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1c714dd1-0a3a-4e2b-9054-dff0e637c7da" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6d46f42d-2f99-4c20-be3f-ed611a7dc783" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="991e27de-ecbf-4374-a286-65883accdddf" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="01b7a4c3-6c80-4a17-a349-cf334af3f908" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="e9ac29ca-1dd3-40b5-b724-420dd3def7e1" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="31ce6f96-bd6d-44c7-bea9-e4dca1332f55" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e5d56893-4d7c-432a-8944-b24cfa24997e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dcec3c48-bbf8-4d47-8011-ab0178cec9e7" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="465bb895-f8e4-4c02-8b17-c9f14aa367db" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="54637766-8c3e-4b34-bce1-c6229292b6f8" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6e9d86a0-f6ee-49cd-8574-bd0415a3c61e" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="7c91d2fc-66b6-49ed-a041-8c39f4a69666" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ec31392e-97e8-4894-8907-ab8d76610c2d" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="78ad6494-767a-4250-9572-ca3a5a963f61" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c7f5dfe5-dec3-44d7-8556-f82408c93bdc" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="bda370bc-0282-45d4-bb9d-1be6f96e5bdc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2ede8366-d217-4ab8-b947-76d29acc84eb" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="d43027c8-722c-4552-9492-dd6eedec4cf5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="03163f91-f8a9-4e49-8d4c-c6b26b680a51" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="f38d73f0-b7f4-4a2c-8a01-473c3b5da54a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="2feea955-e2ea-40f0-a8b9-e11dc5771178" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="133c243a-6728-48e6-bd0c-c9596cec1479" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="74817891-00b6-4289-b70f-42dcba6b74ca" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6ee973c6-ef20-4d7c-aef5-5b9288770409" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="a3009792-0621-4360-a89e-714a15ff4009" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="28559c9b-25a6-4949-ace2-415cb20fc9d9" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="169310dc-b922-47e3-8336-67c11798f1ee" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="10f0b333-652e-4545-bc97-3eb418cdc777" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="961c888d-f6a3-4052-b6a9-918a3cc640ba" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="45eb8a20-59a5-4bb9-b637-eaee8f1dd538" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9859aae8-6c8c-47e0-b74c-617a3fc56933" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="c697b3a2-d5e5-4dec-bfff-58587069404d" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="02eec756-50dc-441e-8e19-fb282c0f4565" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6714f683-c4bb-4b55-8da7-27b657a9cd21" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="9d355cff-d020-4df7-90a4-994bf8402a71" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="b9ec39b5-115c-4c16-94d1-9a0b578c3f56" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="93adabbd-2503-43e4-83a9-e2328611dfa5" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="0f6d6141-6604-421d-ae5e-e4de29fa7236" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c2acc6ff-169a-42f6-a4f1-4b58cb7c11b1" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a22fb7f9-9e0b-4763-9b42-91cf94a40ed7" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1d925e2a-eb0a-4669-94d7-2933c8792223" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="d172fdb8-53fc-40dc-b355-6cddf2cf0826" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="364e1f20-13a8-4131-b2b0-f6677b2d2a71" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="2800ef53-3a9f-4a90-8c49-6404edc6bb32" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c4a9624a-e44d-493a-b942-b1079fa22603" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8d3d8648-9be1-4f4a-931e-e8c9bc539039" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="fb173fd3-8f55-4196-a1ac-673bfb04cf30" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="200639f0-936f-4516-80be-a2580d5e36aa" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="3e189943-ab86-4469-8690-2a210705e0c9" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="3cd3e984-5c25-4164-a8a4-75ee68ba3ce7" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="feffe186-d0e0-4a5d-94a5-c7e9d387e0f2" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="04b17e89-fc73-4008-8538-6244d940eacc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="89c9a070-f86e-40f5-a55d-6fed66e93bfd" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6319ed04-7e03-4a34-8280-f674d1e88b7b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="1dfabc5a-cd09-43fd-99e8-84797513f600" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="1fee5f89-ad86-4ac8-bed2-4f111f07b72a" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="485965e2-9c0c-4287-a64b-ccbecbb204cd" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="ffdb72ee-48ff-4dd1-896c-e0a29d567d2a" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="93e2a2e6-29d5-4592-a11e-ec447fa7235e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}