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
  return <div data-unique-id="337ea3fb-4095-42d1-b780-854f4510576f" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="d6c4a105-2dce-4c42-b0ab-607ff12a4c17" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="087e072b-4ee2-4605-b63d-df32c497303c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d0fb5999-c7c9-46c4-bef2-bf8c1a2ad62c" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="390080df-412e-45c9-9433-ba00cbac83b9" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="a5feb601-2c8c-4a88-8e53-267c74f98357" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="bdb02abb-c878-4082-b73b-167d35fe1ebd" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="c4da3bd1-11c5-4c3c-ae10-5f60bb4bb8a4" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="5aa8b763-b314-4983-a518-97bd164f2b56" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="4915032d-90bc-4db0-88d2-dfc21d0da070" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="c4b0c1b7-abad-4df3-b59b-bdde953bf187" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="205baabc-20d4-4c12-88a9-f19f2ceb0a26" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="50bb187d-6151-4c7f-afca-f96ee428c931" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="aa66e73e-11a7-4acb-8120-cf330a6d9137" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1c4a4ad7-1abc-4e11-ba4b-ec4ecd97d264" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="9b0c436f-f8ca-4805-9c21-f50b70b1aea0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cf3ff4a2-0c92-4393-b3f4-3652e3d6f33a" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="69915fb4-db52-42f3-a636-81275cd824f0" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="757e7522-381f-4e66-b8b4-5806319067b3" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="38f92afe-5077-4d30-bc0a-6050ecbb7e88" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e7522956-c298-420b-bf58-2611211f954a" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="f9a34caa-d122-4739-876a-21256da8f949" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="11c2deda-48a1-4dec-b07e-cfe6dbed45c2" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="99dca7f1-c751-4cfc-9f2c-27e2df9b0471" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="17c4c41f-ab9f-47b8-9f4d-3440b54f0f70" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="7f40c9a4-1fb2-4c94-8e71-604b3a9f55c0" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="982d1437-9500-43e2-bdc8-cd1ce2db7fba" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e2cf90bc-58c1-4e13-9a74-9af77fcbd694" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="4cffb07c-0f69-40a7-9621-b668600a2164" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="4889114c-2a50-4bb4-93ff-278ea872b935" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="5ab57fcc-b3df-4d11-8ec8-785dc80a39a5" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="00ac3f9d-ccdc-41e5-9941-847220761583" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="c3150450-aad7-41a5-b61a-cee51f8abe10" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ddc282f5-a3af-4f67-9f4d-786689fc935d" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="cb1cc6e7-4676-4061-8693-ff26e4c427a2" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="a43bb296-9c90-467b-9e47-75fe374bac36" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ab374231-443b-4c4c-8067-84aad1ed6823" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="e14268fa-3e0d-49cc-b9a9-31924ad44b3b" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="f89a3f91-8c47-4f70-95e0-005d26ed0586" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="666b805c-81e7-4f19-9293-2e2e3d9d78ce" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="40f67468-54ee-46d9-af0c-1603d1177d6a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="308fd831-1c7a-4f1a-ae4b-7c30047fd855" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="f2cbfaad-c43c-4a05-a817-0e10de1d80c2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="074f31aa-f5f2-4c65-a911-caf9192bdc91" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="875a2929-4123-4094-9d90-5b734cff535a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c3d701f8-7d04-4548-b1d5-6d2098194781" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="5f48bd40-5f9f-47cb-93e6-1c4d0a3233e3" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f547f056-10ee-400a-818a-cf18d99a8d5f" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="94a306f8-1a3e-4568-a564-9f665045614b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="08a20f7f-f9e7-499c-9e32-f42e46a8a1eb" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="8f4c0790-28d7-415b-8d66-f1bdf08bccdb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a79aa54b-950c-4469-aad7-bb8f4ae6d255" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="e6192a4b-b8c3-4f71-92ac-c9835e702233" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9e62f7ea-7cac-4359-8462-9f737ce346e1" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="d1cac4f4-e3f8-4754-9f90-5fd255659582" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="b8425261-52af-4ad0-b69d-52e9f3aee288" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="db54113f-ed6c-41af-a4ea-769904188a2d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4cce3e3c-9886-41eb-9941-df03fd1ecf1c" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="c7c097a3-6ebd-4ebd-9d8d-a588d9e862ff" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5d204b70-6107-4de8-883c-8e1d922a1368" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="57c9d619-c3e6-42d3-bda0-7a8f6f501cd4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0f96f288-1d4a-40d0-8016-df3a74351b6e" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="fd407292-9d74-4e82-afbb-616b569e598e" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="c963fefd-87eb-4c1d-bb0e-c4b871c2625a" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="dce6cf14-d41f-41e4-85b0-2e0698ae3353" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="e37eaf10-afae-4d7d-9aad-e5ee02e94c0e" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="8bb80784-ede2-4962-a080-1bd4071ab2a7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="32ebf59d-2065-41c0-9f47-8b84972d91d9" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="f9b15a39-4ec1-4803-baa8-a3bf93bf5f26" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d9f20b66-0de6-488f-a08f-2dab26edb4da" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="fbe4a741-9917-4180-9ec4-5b3113b60435" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="fed00d82-cec8-449a-a899-1723385cdbc6" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="79379698-2d99-4cdf-9101-be4d88e4429c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7ae912d3-5443-4687-94ad-429279af35bd" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="1520c846-df6f-4d62-b80f-bf05f2490ce0" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="1bb7a098-111a-4b74-950d-c25e6297bf58" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="cc1dd134-9b51-4505-90a3-33578f9e57fc" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="15fb8d00-b5ab-4d40-8f99-4e52e9c700d0" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="7c71e19a-2820-46bc-aba0-c6666a2f9280" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="547feb4e-1a3c-4d8c-93cc-cc59c35cf8af" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="2f4a96d3-6e6e-452a-8bb0-a48f2a1d412e" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="eb985441-1afc-4df9-802d-dc5b75526572" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d08882af-55af-43c2-9baa-3c95a264d610" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="93d1691b-c7ba-46fb-ba9c-5cef82bdd9a7" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="d242ce03-ed03-437a-be2f-04099376dcbc" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="e1b4f900-393d-4681-9e59-668ffc60e39e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac22ab42-5d60-4fd0-b670-c1530fce4a90" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="67d77612-d8ab-40d0-b9fb-759824453efe" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="ee1139f0-9302-4c1d-b71b-b8bd5496554b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e21c515c-6d31-48f1-98ce-86685bd88acd" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="9dee9410-2ea8-4425-bfd3-4a5a4228d901" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="08d55061-7d03-4e6f-b1f3-6332c46647d8" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="12a60918-2aec-41bd-a90a-76d619ff60c0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="49ff076a-05ad-43b4-b3e6-4321f1e8ed78" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="8b8d8dfb-b1eb-43e3-bcdc-83b6759289cb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="42819939-ce57-43c7-bb86-7a7b3d7a291e" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="db96a998-8d4e-4994-8823-4bcbccc16f5c" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="127f0859-3718-4fb9-8eb6-1996681343b1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c36b472b-dc8e-4041-9d9f-0ce2caf50361" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="27ead9c1-a1af-4cf5-a520-d55e41d3c5b3" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="69869060-ec91-4a48-8c5b-4ce19addabb4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d0d8783b-2dcf-4fb2-aa9a-d46303d67f7f" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="0e3869ed-c865-40fe-bf1b-f8af1220c2ce" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c8e2cdea-473f-48d3-890d-d67245c178f2" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="8af3435f-63ee-465d-bca2-24d7aa3bb04c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2eed6eec-dacc-4853-97a3-ab4ab0a338cd" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="1fdb4b08-6f43-4bfd-841e-6e72f43f80f2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6a2d7f31-456e-4d62-9b21-d7ee7949093a" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="9aeee2fb-7f5a-4ca4-8d9e-a99a4b825e8c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="130a301f-5b78-4cf3-8a14-07cf54ff80f7" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="876f8b46-c203-47b2-8a1e-b455da025ca5" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="fa576860-d643-438f-ae0f-223ffe985ad0" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="a35cda3e-3002-40ef-b0d4-139196f16290" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6817d6e6-ba4f-469c-947d-bab8f2e05f83" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="6cea97e4-cf43-47b7-9a44-50484bdf8440" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="d39a06ae-f651-4d08-bb8c-9e88a60371c5" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="ab5350dd-3ef2-40f9-a8c1-599db9811a0e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="dcdc39d3-b56b-4d47-a2cf-1858acff4272" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="a47a1533-7f5e-48c7-b28b-48fd77d9cfb2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ace48366-144f-481c-afb6-e2e43040700e" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="0eed1437-c7b8-433a-8628-b3b9a46760e4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2825bf16-5a32-4c3c-b3f6-89883743650b" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="1e319ba4-8627-4c2c-93c9-f61539fa511a" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="2df3e40b-e747-4b06-b3ae-8d58f652051f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="9683e21d-43c2-4b9a-888f-7b46f7a0a138" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f9197991-a232-47cf-9b93-7cb0f4799fb8" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="be0f41cc-9d37-496b-8914-b1f93297cf2f" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="f561e8ec-a3ba-4afe-99f2-ae82b942ad3b" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="6b41e863-c60d-4236-a24e-b4ed6c6d28e4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d78e77b3-b1a4-458e-ae7a-235842223506" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="cf877fbd-3ebf-4caa-a09a-ad5f959efbd1" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="d3c326c3-273e-4ca9-922f-90fb3a697339" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="efe1614c-1283-4be2-a7c7-95dd0b3357df" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="ff9ad575-55fa-4f7a-901a-56f8ff3f5fc4" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="61b98040-57b4-4db3-b3d9-376f4d24b328" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="a2ad98ce-dda7-46d9-88bb-72f5d1d3023b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1e4774e1-7658-4bb6-900f-30fcadc7701d" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="15bfea9b-9c33-49c0-a827-2378561a5d32" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bd0a5c13-c235-4066-960a-2f1e8e1d2ef4" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="1a9a990d-09d1-4b61-a46b-70078ed1ad8a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b22bedac-8efd-474e-bdc3-e7a2eb426384" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="471b26a3-c7ed-472c-8413-cfa4a9d81bd2" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="6ca8f513-0f3e-4686-b701-b401142805a1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="37ded087-b9b8-4fcc-be6e-600c39b54239" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="1c639e5e-290c-468d-9cfe-e339b72d53ea" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="4c316417-1d29-4f70-96b8-56dd89bc8c29" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="07fe4318-39dc-4812-a1b4-928c885de39f" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="934b0bc2-1072-48ac-8c2f-21ffe607812b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a7494e9c-a8b1-46a8-b739-0806c078605d" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="10e95799-4386-4c99-97d1-52e743915a52" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="46eb29b2-b527-4f8b-81cd-453a6b93b81f" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="76a25043-7473-4c61-9a72-588b017d2afd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e1d24444-9a7e-46f0-a240-f09ca151c1eb" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="a90422a1-0bd4-41ae-8f84-6b6563615f3e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="32889293-bacf-41af-b0f0-43a13f0d868b" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="5b301117-5e6c-4d7e-a065-395c89bd2c69" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="37420056-1650-4124-9376-32c5f691c4e0" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="56506de0-26b5-4e32-a839-5a441635f124" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="8fa4d603-ed0a-408d-ab4b-830b9fa33b3a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a1987271-4ea8-43e5-ae37-aa9f21c485cf" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="1ec03588-7fcf-40ca-8279-a104e7d97b47" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="b11ce76a-8a73-4b76-b4a4-688e2098b83a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="01089774-76b2-4ff9-8057-6157d556be40" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="c43fd30d-86a5-499b-9a25-befbf7a7f342" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8120c60b-5f46-4ed8-8422-048f6c01c68e" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c917ef05-f00c-4429-929e-1c4bbc58e4f0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cf3abfce-5902-4713-aadd-2abf832d3296" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="75aeb040-140a-4439-a69c-ef16bfff6ad8" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="b2925175-d704-494b-8bf8-a22625f7b7f1" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="3081bf79-e09f-4897-afbc-b14cc639269c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="97959129-d2da-4d21-8f13-0cdbaf659c07" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="bc510d14-115b-4ff0-b4ad-1b81f8a00a53" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="dfee7b74-bdc0-4322-9d97-337b37bb2962" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="02c9203d-9a2d-4beb-a038-374cb9e725d8" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="7ff0e4ca-b73a-42f8-b1e4-3ed1af0d47a3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="74a44073-1e9b-4cb3-9118-4db3d3a2720d" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="a565fc80-511a-4822-aa69-262a515347e0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="662af54f-f5ff-40f4-844b-18e55cfbf1d4" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="23538eb0-8323-4e62-b760-590d3de24c55" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="1df9d3e7-9417-46f2-b68a-91799ff89400" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="02226c12-02e6-4a47-b14f-a44cdae9d043" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3ccbc104-3a3c-46bb-a7d9-d4c03135d3e1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="afa36796-913b-4797-b315-c7d79456ed74" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="16762e8f-9437-4aca-a58a-99974e7d0cd3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="37b793b8-5809-4a30-b401-44d9414921b8" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6036b02d-ddbc-48a8-8225-1335a3f1a998" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="680afcf3-960e-44f1-9cb2-0617e2c751af" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ba8f25ec-0f09-4943-8da8-ceba0555e469" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="1c670639-326e-459d-a093-02ded2aba659" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="45909215-2147-44b6-9a5e-bcc71602a68f" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b452fbed-ddc3-4e7a-b01a-bfd6369a91e2" data-file-name="components/dashboard/settings.tsx">
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
  return <div data-unique-id="7d7d9ac1-c98a-4d2b-95db-9174dfb0fc04" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="06f2f28f-064a-46f7-a333-78c88c3effdc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="68358307-8fe2-4992-b116-de4410c34b4b" data-file-name="components/dashboard/settings.tsx">AI Model Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="a219e41c-857f-405f-a3cc-f8c33d52556e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="3bf84fff-22cb-4168-b3f8-9c9a41c3e0da" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for summaries and search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="a3b9e1a4-d4a0-41c7-902a-d37e2dfd1a43" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="967cec99-3f59-4cda-8cb4-fb8c6de25b6e" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="596287a4-c942-435a-8748-891474666c93" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0090cd23-0f6c-4602-b12c-313099af9004" data-file-name="components/dashboard/settings.tsx">Default AI Model</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="a8179a6b-c534-466f-8186-21c5ec8eff47" data-file-name="components/dashboard/settings.tsx">
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'claude-bedrock' ? "border-primary bg-primary/5" : "")} data-unique-id="7fc313e2-9a49-46bc-a8bf-603ebe07a406" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'claude-bedrock'} onChange={() => handleModelChange('claude-bedrock')} data-unique-id="d1c77b9a-9b80-4377-8433-feb8b0f4b8d1" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="bf736378-2cc1-40b6-a515-d42f2ab70e56" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="730ca898-430d-4a70-95fa-92cfa9d811ad" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="159c65f3-ca51-4259-b365-130daf1efe21" data-file-name="components/dashboard/settings.tsx">Claude (Anthropic)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="60b23fc6-1ace-4de8-b664-f01627c553eb" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e948d635-0528-4b10-8dea-54c090ee6867" data-file-name="components/dashboard/settings.tsx">Advanced understanding with nuanced responses</span></div>
              </div>
            </label>
            
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'azure-gpt-4o' ? "border-primary bg-primary/5" : "")} data-unique-id="22e761b9-b4d9-46a5-b0a4-fbceff9bf9d3" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'azure-gpt-4o'} onChange={() => handleModelChange('azure-gpt-4o')} data-unique-id="cbdc0538-7188-48a1-8432-f8958fc65655" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="957c3b5a-4b2b-4136-833c-b57668cda5cf" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="96ee04a4-5001-4f70-b728-17cb9db7cb38" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="97afb542-4579-4719-96e2-2ec3547d26ad" data-file-name="components/dashboard/settings.tsx">GPT-4o (OpenAI)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="5459d260-e8f8-43f2-8102-5a100b3c5524" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7c4cfbee-ca8b-4be5-af73-6289cedc8f74" data-file-name="components/dashboard/settings.tsx">Powerful reasoning with technical expertise</span></div>
              </div>
            </label>
          </div>
        </div>
        
        <div data-unique-id="e9dd2dcd-74be-4f0a-855a-388a3f72d95f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="15e889f8-8006-45c0-b88a-d95839e76143" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e3f63869-a65f-4947-996f-93b6e233ea29" data-file-name="components/dashboard/settings.tsx">AI Features</span></h3>
          <div className="space-y-4" data-unique-id="fc33faf7-7009-42c8-849b-4737496b5e5a" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="0a2e4373-60aa-4f0d-a1ba-a69a2795f40f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="7468e106-efe6-4b71-90af-5947bb790bac" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="05716710-1570-49f8-be21-446774fc96c1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c1ce5bf4-e7ba-4a95-bb5f-0d2184cfece8" data-file-name="components/dashboard/settings.tsx">Content Summaries</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="ac238666-e076-4189-a7ad-824005c04e25" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e5a28c52-13f6-46e2-80fa-fe6e3a4d2af3" data-file-name="components/dashboard/settings.tsx">Use AI to generate summaries</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="daec6cc8-2159-40bd-8e15-ba78eab6bfd9" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="e7cbd74d-6aed-423f-924e-e60564059bfd" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="dfa7af86-0c61-47ef-9b74-5e3eb3c107c1" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="9bf1d78f-7769-4382-9019-248084e1ca0d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="801e58d4-582f-445e-9525-4664330bc49a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="1e7f5022-1113-40d1-a1dc-76ef8bb12696" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e301d16e-43c9-4bed-88bb-b32f6bbd17a7" data-file-name="components/dashboard/settings.tsx">Smart Search</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="cf7ba44a-e7fc-48c8-8933-2e8439d6203d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="93722203-19b7-4408-9c6a-4f9cbd719291" data-file-name="components/dashboard/settings.tsx">Use semantic search for better results</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="718bef5b-5afd-4ec7-ba07-368e942e35ef" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="fc8ec62e-a95b-4caa-8a9d-0e3798402030" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="5ab4dbdb-7673-4997-8919-b67852ed8635" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="f627d27d-c490-4d94-af38-8cbeb1b7dbd4" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="7eee3bdd-1fbb-489d-8f86-3b295b8cf9e8" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="940c136b-3cc1-4cb1-bf70-2eb6dc5c3e9c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cd5289fe-b1e3-4288-89bc-2be82b7a3f65" data-file-name="components/dashboard/settings.tsx">Auto-categorization</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="4483deff-9c81-48f9-88fe-28554340da0d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c2dbc475-eb46-4a08-a965-5e9e0f226d4a" data-file-name="components/dashboard/settings.tsx">Automatically categorize saved content</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="e395f806-b778-48be-8fd3-4e786a11e2a9" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="016ff212-b29c-4de5-89a8-3b5614379743" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="d7f7fca5-8c6e-4f45-983b-b7af8e068b3f" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="51334cb1-a54f-49ed-aa50-a770abfec67e" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="6435204e-bca2-47f9-ab6d-769990039fa0" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="45beee62-eecf-4fa8-a1a1-56bd86cd9a4e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="584bab6f-b68b-4c6f-9bd0-8d34bb02f787" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="fb68e9b2-0681-499f-8d08-6f13641c3767" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="7ffa1594-e4fe-417f-9e58-17b6569132b4" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="4fd96f52-e11c-4b12-883d-6f8df0a2f5f7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5ed5667b-f8b2-44eb-a950-1397a1aabadf" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="83dcc196-e572-40dd-9d79-84beccae72fb" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="59c1b70c-7ffe-4ca5-8f1e-74d58b9d838b" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5da6e117-f461-40b9-92a0-6293dc5a4801" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5bcc96e3-5ef0-4e03-9b41-d6b229757aa1" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="7aa792f8-a756-49dd-8158-4608a24f41b1" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="2150af10-72b7-4800-ae14-0505491c39d4" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="c34efb71-a7a4-4743-b643-452a35f0f069" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="d61c5671-6c7b-45fa-bdc9-0ae918752dd0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2c961a08-f146-46e2-8143-b67f3e5811a1" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="62b275d6-0fd9-41c5-9f99-53951d83e479" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a5b8e91c-57cb-4be2-9b18-f9f94741aae4" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d2207375-e365-40bf-8bae-efdb541c483d" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="d4a18bfd-8ea8-43eb-b31b-9625b12dd171" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e220ce12-ba28-4a71-9a56-ce278bc02324" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="7c55ec24-00e3-47e6-91dc-b24f406b666c" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="65125ccb-de4b-4d60-97e7-62cd81499635" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="046c07cd-683d-4218-aad0-4a2ee7da06d3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="304c563e-e7e8-44f4-b183-67f890985ec4" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="c854692f-5d9d-4930-aaa9-8ee4ce4d68f6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fabec8de-7929-4e89-8096-636ab32265b8" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="4fb53dc1-7620-477d-95ce-29afa9144b7a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="6eaf9bc5-4c92-453b-acf3-34ed4237c872" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="49b26fe6-80cd-4d50-af0a-d40ee69b1854" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="89e6bee3-22e7-4658-8a26-438f4d372041" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f30d5738-4d50-4e1e-824e-9827011118ca" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="f2ac7ea9-f582-4992-ac31-cd17ae7ab7af" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="98b3f24f-e4f4-448a-9bf8-4e3a7a99ad79" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="cf2231eb-46eb-4edf-b324-310730625378" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8109ba1f-9c68-4d66-b97b-8f86cda34007" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="8ef99b32-feb1-404e-8fc4-4c874e251823" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="7538561c-fbc4-4739-b7f4-51112a6b3a4e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8a4c2a4c-5f69-4e67-bf2d-db4c9743155c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="411519e1-1a65-4ea0-b718-9d5df23a167d" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="76c97185-68b4-460d-bbba-50a25c82fa67" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="ebf15fd3-7361-4653-b023-670e40feb83b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d2f9be9f-4753-4a46-bef2-4ed004de8248" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="820c47ae-0450-40fa-a158-c2a395c73214" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b1801b9d-dbfb-47d9-b2dd-c76efd4ae5f4" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="67621318-bf3b-4171-9993-3663507b4fcd" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="d8dc55a5-5a6e-47e0-8e88-3182464d675b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b41143d9-8152-4137-b8da-404ba8d6a7f0" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="d904e1a3-d856-4f6d-872d-8c695add5613" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="75dabb13-7804-4e28-9204-e0f2c2f0045b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="378524e4-32e0-49dc-be37-102ab2c7dfdc" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="a288b223-22ec-45c5-8729-179ce042dcd0" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="3f42ba4e-fc3b-416d-8e39-a749f07043b9" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d690b514-f921-4453-81f3-f3d20beb3be7" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="17c00634-9244-4233-9c27-84e862887865" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="82b57176-ab42-465f-9fdb-da1680fb3ffb" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="37cfac5d-bcf1-4614-8413-c819b7c97246" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="a2184115-aa85-4a18-a196-cec35013418a" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="59f0a1cd-7d6d-4453-86fc-00388e6b70c3" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="03dc1f51-2456-4e86-9c07-4bf0953a74ca" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="aed89070-a611-4ec9-a0cc-ec32c1903cc1" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="7af34b90-15de-4513-b40f-2baa38302ad7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1b6674cf-ebb4-44ef-a931-ca6f0bfcb183" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="46738ab3-78ea-421d-9c5a-e263964cdc75" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="d3ce3daa-0f88-4815-9e8e-9c17b4e2561f" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8e689ac7-bc8e-4b7f-aee1-f3eec1932b5b" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="be997b01-078d-419e-ad14-6985dfd53136" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="10179038-23ba-4262-b993-24c9eab5c3b5" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="b009ce53-0491-4f23-a893-32058a9896d0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f5bf1b13-5a99-47e8-b396-230a4acee507" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="63392caf-84f6-41ba-9574-5181e2eee17b" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="5ded2529-663a-475f-96c8-e109e08a61e6" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="837ffa87-762b-46a9-b216-467d191f6563" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="3a52acdb-bac9-488e-b88b-93aee695f036" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="8f56a576-8a11-4261-8160-574bb098901a" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="d3506514-7d8d-4f50-a3c4-f7572e00afbf" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}