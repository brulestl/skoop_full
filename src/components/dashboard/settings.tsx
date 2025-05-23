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
  return <div data-unique-id="97130f4b-0dec-4e2a-aeca-1fae0a03b127" data-file-name="components/dashboard/settings.tsx">
      <div className="flex items-center justify-between mb-6" data-unique-id="06220165-7a50-486b-8a1d-0dec3fb180f1" data-file-name="components/dashboard/settings.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="9fe430ba-e7da-4364-aaf6-ef65ad101005" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a296c61a-0bd6-453f-9996-131129ab8b3d" data-file-name="components/dashboard/settings.tsx">Settings</span></h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6" data-unique-id="f1541302-0c96-4471-a5c7-313ffa874fa7" data-file-name="components/dashboard/settings.tsx">
        <div className="md:w-64 flex-shrink-0" data-unique-id="20d3aef6-d030-439d-b5c8-44ed1a38d165" data-file-name="components/dashboard/settings.tsx">
          <div className="sticky top-4" data-unique-id="991dfa1f-cfa4-45bf-aec6-a7734c014382" data-file-name="components/dashboard/settings.tsx">
            <div className="skoop-card divide-y divide-border" data-unique-id="bc5a9fc3-2a10-4543-ae76-399e30f81ccc" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
              {settings.map(setting => <button key={setting.id} className={cn("w-full flex items-center px-4 py-3 text-left", activeTab === setting.id ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/50")} onClick={() => setActiveTab(setting.id)} data-unique-id="dc909796-cd8d-402b-8b0d-de8463694b72" data-file-name="components/dashboard/settings.tsx">
                  <setting.icon className="h-4 w-4 mr-3" />
                  <span data-unique-id="12edd036-0eca-4c9b-804f-61155b44af9b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{setting.label}</span>
                </button>)}
            </div>
          </div>
        </div>
        
        <div className="flex-grow" data-unique-id="d7764ce8-86dd-44c2-91ec-93bbf4eb7180" data-file-name="components/dashboard/settings.tsx">
          <div className="skoop-card p-6" data-unique-id="5bd4ad9e-0d08-4ce3-9c1a-5011fca0ab70" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {settings.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>;
}
function SyncSettings() {
  return <div data-unique-id="4309dfdd-16ee-4741-87f6-9293f99b0ea5" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="d6257e5d-a7cd-4d82-9047-20f5b51b2d04" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bfb9a5f9-6571-4039-a517-e0ff84aa8f6e" data-file-name="components/dashboard/settings.tsx">Sync Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="04d0ad41-3cb1-4c0b-989a-6d83f674bb4b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="cd52ec67-5122-4688-a711-7fcac54889e5" data-file-name="components/dashboard/settings.tsx">
        Control how often SKOOP syncs with your connected platforms.
      </span></p>
      
      <div className="space-y-6" data-unique-id="18618b0e-af19-41e2-9b07-f1d3257b5eb8" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="09e3ec2e-e718-4786-8242-49e6956f6bc0" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="1fe2b34b-7eec-491a-a5b9-4ec78e5419d2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="67720d23-91af-4452-9a98-d571f4971b3b" data-file-name="components/dashboard/settings.tsx">Sync Schedule</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-unique-id="81f0ae19-e7e0-449b-adbe-160ea851ab6b" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["Every 15 minutes", "Hourly", "Daily", "Manual only"].map(option => <label key={option} className={cn("border border-border rounded-md p-3 flex items-center cursor-pointer", option === "Every 15 minutes" ? "border-primary bg-primary/5" : "")} data-unique-id="f202a538-3a01-4f73-abcb-4c024588bd22" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="syncSchedule" className="mr-3" defaultChecked={option === "Every 15 minutes"} data-unique-id="4047ce8c-165e-47c2-bfec-ac5842c0d7c8" data-file-name="components/dashboard/settings.tsx" />
                <span data-unique-id="9782bd3d-a304-4066-819a-66a06053c458" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{option}</span>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="80c92ad9-4d22-474c-b079-f602c90b57b3" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="be6f0aea-c120-47d5-85df-6d5c85f10d90" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ac1c454f-7c6f-478d-b6b3-93720715c522" data-file-name="components/dashboard/settings.tsx">Platforms</span></h3>
          <div className="space-y-3" data-unique-id="81a6c758-4181-474a-8a14-60b3d6eaf1c9" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
            {["GitHub", "Twitter", "Reddit", "Stack Overflow"].map(platform => <div key={platform} className="flex items-center justify-between" data-unique-id="de2fec3d-5232-44c8-b7c7-20d47cf33f63" data-file-name="components/dashboard/settings.tsx">
                <span data-unique-id="cc29a797-37bc-4d0c-a4c3-745034dcd69f" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{platform}</span>
                <label className="relative inline-flex items-center cursor-pointer" data-unique-id="67435c51-0c2c-4a8b-b4aa-b09c933edef2" data-file-name="components/dashboard/settings.tsx">
                  <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="ff7f4291-3143-40a0-9061-122e92d203b1" data-file-name="components/dashboard/settings.tsx" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="883c5071-5209-4a55-a5cc-7f9955166e16" data-file-name="components/dashboard/settings.tsx"></div>
                </label>
              </div>)}
          </div>
        </div>
        
        <div data-unique-id="44bbdc24-b8a4-45e3-98fe-95e4db202539" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="976c8b59-6360-43d9-960f-4d0f3af703fd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5967f75f-0122-4b51-adf3-853b5ccded25" data-file-name="components/dashboard/settings.tsx">Sync History</span></h3>
          <div className="text-sm border border-border rounded-md divide-y divide-border" data-unique-id="c3a4b0f1-9a51-4770-9f5d-f1a87904ccb6" data-file-name="components/dashboard/settings.tsx">
            <div className="p-3 flex justify-between items-center" data-unique-id="0f9aee56-715b-4c29-a057-c0678b82ebce" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="ca615c5f-591f-46cc-99c0-af5a16ff79ab" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="e1e5e995-429d-44be-8f86-623cfeadecc2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8963ee70-b798-4e2d-8890-1c01c111f164" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="b31406ed-abf6-44c9-9998-81132b24d0a6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d51a1846-274b-4ecf-b540-85767d77b55f" data-file-name="components/dashboard/settings.tsx">Today, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="d8f4b770-4753-4936-bf8a-c6eb35c5861e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="22bcb4f9-3549-43cf-9440-f825facf17ee" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="8f6f2e40-afae-4d79-9fe1-535c24112d18" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d6b1f0ca-1504-40bc-8490-f437c01d74c6" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="4748c7bc-9777-4514-b6bc-cd3a9b680689" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e28ab6cb-4746-47d9-9669-4f672318f4ec" data-file-name="components/dashboard/settings.tsx">Manual Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="175c17b9-1ab8-468b-8f6e-51676a4519e3" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="19ce0b3b-79d1-4ed1-8798-eadbd72da7d7" data-file-name="components/dashboard/settings.tsx">Yesterday, 3:22 PM</span></div>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="6256315c-4799-41bb-b625-ec400ceef415" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="66e73bbc-cd0a-4518-922d-3bcf8de2af97" data-file-name="components/dashboard/settings.tsx">
                Success
              </span></span>
            </div>
            <div className="p-3 flex justify-between items-center" data-unique-id="5577057b-c30b-4711-ad74-03632eefdd88" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="3bfac6f9-d42b-4ecc-a045-a40b040ca604" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="8a825364-2fd6-4c48-b791-2fdd757e8e03" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="759c93d4-7717-45f9-bba0-f651a44da639" data-file-name="components/dashboard/settings.tsx">Automatic Sync</span></div>
                <div className="text-muted-foreground" data-unique-id="c9e9ff8b-25f9-42ec-92b3-1dae01295941" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4c0d48b0-fa22-464d-a954-872ed6c3e0d0" data-file-name="components/dashboard/settings.tsx">Yesterday, 11:45 AM</span></div>
              </div>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full" data-unique-id="da528625-51a2-4664-89e9-76e6c297b0d5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e4c94408-650f-4efa-b476-debfad947a22" data-file-name="components/dashboard/settings.tsx">
                Failed
              </span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="caa30fa6-b48a-4586-978a-7bdf225d0e5e" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="431d6820-b97b-4966-b337-32644aa93e17" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="38b4ff5d-0dca-4427-b1f4-fe9159b86c9f" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function EmbeddingSettings() {
  return <div data-unique-id="008bfd2a-6e39-4617-9144-0ba9a6492249" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="d9a4e2c5-a7c1-4ef5-8c5c-4e56cba1b92e" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="052da4f6-731c-4985-a1eb-58fea16505ea" data-file-name="components/dashboard/settings.tsx">Embedding Model</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="0615d8d5-d9aa-4c6f-aa19-50eb2b1cd7a8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1e8fcaba-3d4e-46e5-8479-28c96ac90269" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for generating embeddings and semantic search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="7392f950-18d7-4006-b3db-b0f3e23b96d3" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="811d1bed-18e8-46ab-8f36-3bd4ed532f9e" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="a7aaa2b3-a805-4a55-9be5-cf8246ac573d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="bcc88100-f5f2-41d0-8eda-aa426710ae98" data-file-name="components/dashboard/settings.tsx">Model Selection</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="186169c3-3464-4c99-9c10-59bc2e46a473" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">
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
          }].map(model => <label key={model.name} className={cn("border border-border rounded-md p-4 flex items-start cursor-pointer", model.name === "OpenAI - text-embedding-3" ? "border-primary bg-primary/5" : "")} data-unique-id="e59238e7-15a8-4315-80f7-0450a62d5744" data-file-name="components/dashboard/settings.tsx">
                <input type="radio" name="embeddingModel" className="mr-3 mt-1" defaultChecked={model.name === "OpenAI - text-embedding-3"} data-unique-id="1e054748-0bfa-4109-aa12-c82e54aa5168" data-file-name="components/dashboard/settings.tsx" />
                <div data-unique-id="a3b0e094-6938-4a7e-a826-501f10a29dc7" data-file-name="components/dashboard/settings.tsx">
                  <div className="font-medium" data-unique-id="d54405dc-1015-481b-92a1-a66d9bcbaa6e" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.name}</div>
                  <div className="text-muted-foreground text-sm" data-unique-id="eb396284-f34d-4097-8561-5afbe0dd989e" data-file-name="components/dashboard/settings.tsx" data-dynamic-text="true">{model.description}</div>
                </div>
              </label>)}
          </div>
        </div>
        
        <div data-unique-id="1605fefe-ff1c-49cb-adcb-499b32fb4f26" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="5a579406-5bb0-45c4-a275-fd7ca90b635f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d2730eeb-5306-4795-8a7e-1795115517e4" data-file-name="components/dashboard/settings.tsx">Advanced Settings</span></h3>
          <div className="space-y-4" data-unique-id="843fa55c-6f2e-4eb3-9552-a111592d7b16" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="526472b0-bdff-4aa3-a796-d786cd9d51ae" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="4d70d7a9-8ba0-4d76-bea7-867c0e179084" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="36c491d6-63fe-4efe-9a9c-0c9f2341ce08" data-file-name="components/dashboard/settings.tsx">Vector Dimensions</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="14c37096-5cbc-40c6-a080-4abe1982e910" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="2db97967-19aa-4a82-ad1b-9e5cb89376ac" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c1df8f3c-b498-4139-9889-14e584e81e44" data-file-name="components/dashboard/settings.tsx">1536 dimensions (default)</span></option>
                <option data-unique-id="891995d7-e603-440d-9191-456865307175" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1f0d92c8-425c-42f6-9f17-4d34a9b68c0a" data-file-name="components/dashboard/settings.tsx">768 dimensions</span></option>
                <option data-unique-id="0715d9e3-f93d-4c8f-aa3c-8dd72bd2bb47" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d9fb3435-4ab7-424c-abd2-65cebe19cc52" data-file-name="components/dashboard/settings.tsx">384 dimensions</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="c5827a80-56cf-459e-8ffe-91791cc90936" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8aba32de-29e0-4f6d-bac8-b5902d7c33ac" data-file-name="components/dashboard/settings.tsx">Higher dimensions provide better accuracy but use more storage</span></p>
            </div>
            
            <div data-unique-id="073f6dca-fbf2-43b2-8887-a06b3ad1bb2e" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="409996d9-420e-49cb-9afc-ea2be9212b94" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="d8c8d92b-a5a2-47ae-bd76-84468da4cb02" data-file-name="components/dashboard/settings.tsx">Re-embedding Schedule</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="bc705fb2-d774-4277-a1de-f63f38a09874" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="db3a2464-e592-4dfb-ba1d-1d6825723e05" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="33fa97d3-fb33-46a8-abec-4ef3a66a4365" data-file-name="components/dashboard/settings.tsx">Never re-embed</span></option>
                <option data-unique-id="49c876af-7660-4e28-9233-26fe4ddfe064" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0fdfffff-eefb-4fa6-ac52-43f2c46a36dc" data-file-name="components/dashboard/settings.tsx">Weekly</span></option>
                <option data-unique-id="7787225d-b9d0-468f-8fd0-f95a1958aeaa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="05607ce1-0a3f-4847-bcde-e33106b7be17" data-file-name="components/dashboard/settings.tsx">Monthly</span></option>
                <option data-unique-id="7c37f019-49f1-4958-8897-c99072440f43" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="18ff6b9e-48f4-495e-96a4-b9b24acbb2fd" data-file-name="components/dashboard/settings.tsx">Quarterly</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="79db0d3b-45f2-49ad-a8f6-ae30ccffd2c2" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2b9d6a35-7d41-41aa-8de2-8f90686dc6d4" data-file-name="components/dashboard/settings.tsx">How often to refresh embeddings to improve search quality</span></p>
            </div>
            
            <div className="flex items-center mt-4" data-unique-id="8680eb12-f11e-49d5-b0f3-007d8995e609" data-file-name="components/dashboard/settings.tsx">
              <input id="chunking" type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked data-unique-id="8ff0343f-6cf3-4da7-ab01-e1853dd55c7d" data-file-name="components/dashboard/settings.tsx" />
              <label htmlFor="chunking" className="ml-2 block text-sm" data-unique-id="df192f56-82c7-4c6d-8eda-b742f4b757e1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c92d3a52-4ac1-4e67-8e6f-e46b0b258fd1" data-file-name="components/dashboard/settings.tsx">
                Enable document chunking
              </span></label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="8dcec4a2-1c85-4c0a-99b8-e7dc7d018253" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="54e860d9-7162-4db9-af91-af6337ea2bbd" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="67d72757-ae32-4437-94f7-61ca0651f804" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function PerformanceSettings() {
  return <div data-unique-id="9d72a044-2cfc-4d25-9960-eab8d0b69251" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="1628cc94-58c7-4084-8edb-0750fd73236c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9cc12835-91c2-4266-9928-3578174e170a" data-file-name="components/dashboard/settings.tsx">Performance Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="b8eece5f-cc3f-4fa9-b005-2b68ecc3cdea" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="02f6df51-81ad-4a1f-abfa-e7c6daaf9a51" data-file-name="components/dashboard/settings.tsx">
        Configure how SKOOP uses your system resources.
      </span></p>
      
      <div className="space-y-6" data-unique-id="d8446232-285e-4d52-839b-7f47468a72e1" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="d87258b7-9821-485b-9e53-da070af6d64c" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="70d3bd63-e81a-49ea-9ca8-af4396652c0b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="237cde4d-bb72-468a-a568-806cb49bace3" data-file-name="components/dashboard/settings.tsx">Cache Settings</span></h3>
          <div className="space-y-4" data-unique-id="bf4bc37c-dbff-414e-980d-81381e076e07" data-file-name="components/dashboard/settings.tsx">
            <div data-unique-id="02a77402-de20-4b33-af99-7152ed571dba" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="d1c7044d-805e-46ae-b8d3-44714ebdc48d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b95cc8e2-8263-4bd8-8718-d73fac156dc3" data-file-name="components/dashboard/settings.tsx">Cache Size</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="4ab28df8-b90c-449f-b177-b6079684928a" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="c23b8939-de60-4f54-8bbb-616ca72290b5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b4fcc3be-5504-40cb-aabd-765fd9576c6c" data-file-name="components/dashboard/settings.tsx">50 MB (default)</span></option>
                <option data-unique-id="8f66ae93-4ed0-46b8-8c02-13aaa611eabc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="09cd6750-f210-4bd4-ad5a-7f90a95b54a2" data-file-name="components/dashboard/settings.tsx">100 MB</span></option>
                <option data-unique-id="1f10ef15-94e1-45d1-b802-ca202d85a042" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f7556ae6-b8cb-4824-85de-f16e570880e2" data-file-name="components/dashboard/settings.tsx">250 MB</span></option>
                <option data-unique-id="bb2cd6ab-2e3b-413a-90ce-f4a56c2197c8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="226483f5-69c3-4dcf-b3a8-5fdbc505a1f5" data-file-name="components/dashboard/settings.tsx">500 MB</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="3b6277f2-ce32-4881-bb6a-9f693aee980d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8bd1534a-b1a7-4f77-8b2b-accc4408b533" data-file-name="components/dashboard/settings.tsx">Larger cache improves performance but uses more memory</span></p>
            </div>
            
            <div data-unique-id="0393bed9-abd8-44bd-a10a-b8df7218d037" data-file-name="components/dashboard/settings.tsx">
              <label className="text-sm font-medium" data-unique-id="2a551a90-ee8d-4f26-b4fd-61990048290a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="24b16ed1-f23b-4056-b02b-3b46b59fce78" data-file-name="components/dashboard/settings.tsx">Cache Duration</span></label>
              <select className="mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-sm" data-unique-id="49bff837-8237-4501-91c3-6232bb4f1b88" data-file-name="components/dashboard/settings.tsx">
                <option data-unique-id="6a10bd5a-d2d2-4d11-a707-0954ccedf422" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="64b2cc40-6f67-48de-a5dd-9b9ec966fc3b" data-file-name="components/dashboard/settings.tsx">1 day</span></option>
                <option data-unique-id="252e6290-a648-4028-9a2c-3a4853e03f9b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="fadb4d81-97bf-442a-addc-b72e12343738" data-file-name="components/dashboard/settings.tsx">1 week (default)</span></option>
                <option data-unique-id="2430299a-4026-4a35-af2d-323200408699" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4d86f631-26d0-48e2-8efa-3b766789fb56" data-file-name="components/dashboard/settings.tsx">1 month</span></option>
                <option data-unique-id="48394184-3da9-4d5c-b976-514f2eaedaf0" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a3176fd4-0030-4a19-b77c-cc2a76fe8b48" data-file-name="components/dashboard/settings.tsx">Never expire</span></option>
              </select>
              <p className="text-xs text-muted-foreground mt-1" data-unique-id="9a7cd939-2a80-41ee-a615-efff31134c77" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ba0fc9d8-4052-4d05-b5e2-7a58f4fd6b5a" data-file-name="components/dashboard/settings.tsx">How long to keep cached data before refreshing</span></p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-2" data-unique-id="71d812d0-71b4-400a-b617-e7ce19189131" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="e9e42f40-7742-44a0-aa02-8ca1d826ca9e" data-file-name="components/dashboard/settings.tsx">
              Clear Cache
            </span></Button>
          </div>
        </div>
        
        <div data-unique-id="7fd2a21c-da32-471e-9fd3-1a461c324aad" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="829fdcaa-6196-4783-99dc-e7d7cca206fc" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="93ccaec3-0cd1-4791-a62c-8ee58f88bda7" data-file-name="components/dashboard/settings.tsx">Network Settings</span></h3>
          <div className="space-y-3" data-unique-id="b27c5968-e1ed-4b12-8e31-aaa1ddf70b79" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="22a259ed-8db4-420c-9245-8c1e7e522bde" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f68bc534-d927-43cc-be6c-d846eea25f6c" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="0b13af59-6c13-43fa-a4b0-109b9882e8a5" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b4d193a3-3e62-47b8-8d2c-9ac54dbf2def" data-file-name="components/dashboard/settings.tsx">Background Sync</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="429ad18a-a862-4f00-9a96-7b6f64ac541c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="514e435a-5f49-4e46-ad40-6edf66f4cde2" data-file-name="components/dashboard/settings.tsx">Sync when app is not in focus</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="ef5a9556-f550-421e-8afa-3c89a9b320e7" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="1342ada4-723a-4dd7-88f1-6e9990dc91fa" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="e8851142-d020-4b33-8277-17a1bd33ca4f" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="93bb9dad-a700-4566-8dd7-e36a0adbc04a" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="317f1df4-f6a4-48d5-be07-8f42fb4e5b6b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="0d402cd4-4102-4613-b308-cc3ccc7d7a98" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="0a073c33-56a5-4420-89e4-46fdc436c6c8" data-file-name="components/dashboard/settings.tsx">Aggressive Prefetch</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="f6376500-8289-4b57-aec8-5918eb792e08" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9ff094ec-de47-4836-9d4d-7b618e92d165" data-file-name="components/dashboard/settings.tsx">Preload content you might need</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="c87a73cf-1024-4252-b8d8-e4338aafd2b8" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="d38ba210-edb6-4824-a593-09e33573a7cf" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="b991efd0-25fa-4212-9835-6c044064b0d2" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="d454a5cf-118f-4aa4-a59a-1bf7d43b5a65" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="7b9c8afd-8f8e-492e-bcd5-e04b03fab524" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="8b3c1dc5-c4ff-4697-a3bf-fd872159710b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4a716037-ca79-4ba3-b46d-823042997336" data-file-name="components/dashboard/settings.tsx">Data Saving Mode</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="583f26c0-237d-4c3e-aaba-92588963ec1d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="2f044597-531c-496a-a5c9-e88dce90ad9c" data-file-name="components/dashboard/settings.tsx">Reduce bandwidth usage</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="3445648d-b836-496c-a019-eff0a0ae6623" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="5cec1db3-dba2-4525-b32e-b352b2bcc70a" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="05076878-8738-4ae4-b829-8a5ae633687d" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="115dac2e-9aeb-446b-a447-5dafc5b04f60" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="07b022e7-4728-4020-8b98-1641f7ea6d3f" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1d6a655f-3c4a-4e5f-9eab-9ae021b8669c" data-file-name="components/dashboard/settings.tsx">
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
  return <div data-unique-id="a6060941-532e-470d-a015-6d65681cd397" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="a431af05-cc88-4df9-b03b-90adc5b860aa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="53cd3692-2750-4639-8c39-ba05b9f38467" data-file-name="components/dashboard/settings.tsx">AI Model Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="93921116-2995-4c0a-b869-6887834d34ec" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="9a365d41-bb5c-4884-b2fb-525822de0ec5" data-file-name="components/dashboard/settings.tsx">
        Choose which AI model to use for summaries and search.
      </span></p>
      
      <div className="space-y-6" data-unique-id="6cdd09d8-a9f5-4539-aa49-bb374020c275" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="0ddcb090-b835-400e-bdc6-267c07c7ecb9" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="567a3745-75a7-4508-a00f-b23d1ee0d511" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4a5c3bc6-164f-4c6d-89c0-5c2a7c1d759c" data-file-name="components/dashboard/settings.tsx">Default AI Model</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-unique-id="13b387ab-28c6-4797-b212-74f28ccec9de" data-file-name="components/dashboard/settings.tsx">
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'claude-bedrock' ? "border-primary bg-primary/5" : "")} data-unique-id="9372f84e-6541-4bee-bd34-d5d67b63ba3c" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'claude-bedrock'} onChange={() => handleModelChange('claude-bedrock')} data-unique-id="9db96b24-1f7c-4fdd-8d24-79bad5dddc1e" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="11ba29e1-06c6-459d-b396-40e34816ecfc" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="489d77f1-6f15-4338-bbe4-90c02eed03e9" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="713ac271-a76a-490a-bf73-1b1ed05de900" data-file-name="components/dashboard/settings.tsx">Claude (Anthropic)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="00b71049-2cd4-4886-955a-405e8299c757" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b02ce79b-6ffe-48ba-95fa-6b8465d9a5f1" data-file-name="components/dashboard/settings.tsx">Advanced understanding with nuanced responses</span></div>
              </div>
            </label>
            
            <label className={cn("border rounded-md p-4 flex items-start cursor-pointer", selectedModel === 'azure-gpt-4o' ? "border-primary bg-primary/5" : "")} data-unique-id="d912f161-f23d-44ec-8cdc-14858bfe1c48" data-file-name="components/dashboard/settings.tsx">
              <input type="radio" name="aiModel" className="mr-3 mt-1" checked={selectedModel === 'azure-gpt-4o'} onChange={() => handleModelChange('azure-gpt-4o')} data-unique-id="fe8d9db8-5b39-44ef-a1bc-3d34bbb03dc9" data-file-name="components/dashboard/settings.tsx" />
              <div data-unique-id="0195a1ee-c529-40ef-bf4e-bcfe4b192fbd" data-file-name="components/dashboard/settings.tsx">
                <div className="font-medium" data-unique-id="29460bc9-8252-4c9e-9cd7-47d322f06d35" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ea5269dc-b6c5-47c6-b961-55cd37eaa99a" data-file-name="components/dashboard/settings.tsx">GPT-4o (OpenAI)</span></div>
                <div className="text-muted-foreground text-sm" data-unique-id="4f043d6e-24f4-42ab-a06b-b65539beaf1d" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="07fb5206-42b5-4135-9e77-6ee4b252273d" data-file-name="components/dashboard/settings.tsx">Powerful reasoning with technical expertise</span></div>
              </div>
            </label>
          </div>
        </div>
        
        <div data-unique-id="5104993e-64c9-4431-9b45-924837666e2a" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="549ef131-9785-405d-bd98-a14727c96be6" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a2166736-7ec5-43c6-b35e-ebdfb368e088" data-file-name="components/dashboard/settings.tsx">AI Features</span></h3>
          <div className="space-y-4" data-unique-id="feec6c2a-8a2c-4f34-ae38-891252d7b5b9" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="fe089be9-93e7-4b25-b822-2ab1ab5520af" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="473eb70b-7945-443a-8f83-f2669cae4a6b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="41a393ee-f779-41a4-bd64-235caf4f93e7" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5ae9d7bd-5d76-455a-b828-05b481d57e99" data-file-name="components/dashboard/settings.tsx">Content Summaries</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="2353aa9a-7e8f-4891-b822-d8b7a2251146" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dbed0d64-823b-4b24-ba30-5d1f21b1e664" data-file-name="components/dashboard/settings.tsx">Use AI to generate summaries</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="742f0dcd-bee2-46f6-8758-90f1c304fdf4" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="c302653a-c23e-4bdf-84ef-13e55aef2c3e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="9ad9391c-6a99-45ca-8cfe-858390831114" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="f476f243-1c52-464c-a51d-36b907827aa8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="bfaac9cc-5c32-411a-8d9b-311f16fa5406" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="fc3d008f-bf83-4fb7-b283-8181570bf18a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="869b7453-aa2a-4841-9fda-1432d956c5fa" data-file-name="components/dashboard/settings.tsx">Smart Search</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="a82bb952-d513-4949-87d6-0602398bd11f" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="384c266e-f342-43ac-985a-7acb1c98d24e" data-file-name="components/dashboard/settings.tsx">Use semantic search for better results</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="865afbd3-d89c-4bf8-b15e-48f737dbd488" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="fd937e2b-139a-41fa-9cea-878f2f1aea53" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="ac960055-4f43-441d-b959-b41d1d6f43a8" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="1b4a6ae8-e8c3-4ea8-bb54-5d2d9c8c57c0" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="7ef744e8-b970-474f-953a-fdb9d3ffdced" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="8660a17c-7320-4a92-b26a-94cf01083d41" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="8825215b-4d69-4ee8-854d-a8f7232d38a6" data-file-name="components/dashboard/settings.tsx">Auto-categorization</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="6af7e815-7934-45e9-a45c-bb5ba50dadf1" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="11050e16-4c76-4de1-bc9d-b145ce5d9636" data-file-name="components/dashboard/settings.tsx">Automatically categorize saved content</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="16ea9908-2031-4458-8441-5861dddf2911" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="05a23cdd-6f51-4d11-ad54-0363dc3d5f5d" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="179d0ed0-e224-448d-8f93-91696ef21c6f" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="b9c5180b-7960-4dbf-ae74-7287c95cfa24" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="e78ae24d-389a-40a0-979b-86bdcdbba9e6" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="18ce2174-a187-498a-90c5-af3416cc77b6" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}
function NotificationSettings() {
  return <div data-unique-id="7076cdb4-5a9c-4920-b11f-411c55b3d3c2" data-file-name="components/dashboard/settings.tsx">
      <h2 className="text-xl font-medium mb-4" data-unique-id="0f9c33fa-ced2-4e18-bedb-10e5727f36aa" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f2ea43b9-81a1-4f1c-a5bc-3d0deab82568" data-file-name="components/dashboard/settings.tsx">Notification Settings</span></h2>
      <p className="text-muted-foreground mb-6" data-unique-id="5c292098-5ad7-4317-b2d6-285f609cbdd8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="ca479baa-773f-4245-ad4d-cffd8114cc4a" data-file-name="components/dashboard/settings.tsx">
        Control when and how you receive notifications.
      </span></p>
      
      <div className="space-y-6" data-unique-id="e7882bc3-3bd3-4e85-bfb1-a01976d6638c" data-file-name="components/dashboard/settings.tsx">
        <div data-unique-id="c407a097-836f-4424-b1fd-14526aa51c5f" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="523d1958-baa3-4543-a47f-e4261d8d3415" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f3b8c951-e0d4-4467-a17f-c622058b0b52" data-file-name="components/dashboard/settings.tsx">Notification Preferences</span></h3>
          <div className="space-y-3" data-unique-id="0266c322-0b2d-41c6-a8d4-1a3181f54c15" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="c3a62cdb-b38c-4b3a-b0bd-afc8571d7bf8" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6bb8fc9e-3a97-4bc5-88b0-ae110b91657d" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="96e72438-8459-46ac-9761-da8e63bbf37a" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="81683677-6370-487a-85d8-877fc33f7eb0" data-file-name="components/dashboard/settings.tsx">Sync Completed</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="5ae740bf-937a-401c-b3d9-f67964f26d50" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="dcaf0fa3-6d06-4e59-9bc6-c67d6d2e1c99" data-file-name="components/dashboard/settings.tsx">When content sync finishes</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="0b5554c8-4911-4cb2-9c3a-f6d968fc67f5" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="b75d9eb0-9253-4700-bf11-59a25eeef65b" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="053ae857-ade4-4bbb-b418-584f68088ea0" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="4e8303f5-42dc-4916-a074-057f9444374b" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="272989f0-3b9d-4707-8889-066579b64abf" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="412e896e-84cb-4744-9e67-f1df2bb6ad73" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="4af4d438-10d0-47c8-b39d-49622d1c6f9b" data-file-name="components/dashboard/settings.tsx">Sync Errors</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="f62ca25d-f7e6-42ee-8272-5b876e028168" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="a77a7495-1581-4544-8e93-8f22d067a2ff" data-file-name="components/dashboard/settings.tsx">When a sync fails or has issues</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d9eb25b9-12cd-4db2-9bf2-d0b08e0910a0" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="a12b1c45-a5dd-4b61-acbc-a4383095481c" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="d6ca93b0-c9a9-4f2d-8550-9eea5070428c" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="d8394169-c071-4e22-a6c5-9cef9a8613cd" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="426e4732-dcc6-4b19-b14f-c2c10d19427c" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="dc3c0157-9503-4152-9bc3-ac7039c190e8" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="b23c815b-0a68-40d1-8db1-fb8ee9c1f434" data-file-name="components/dashboard/settings.tsx">New Content Recommendations</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="2a4df762-8078-4e29-a683-82d8838aa31b" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="c301d3ce-3895-47b8-92eb-cdecbf9ed667" data-file-name="components/dashboard/settings.tsx">When we find content you might like</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="d75de0e9-a623-47e8-b78f-94937ff8862d" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="7cfb4512-65af-4658-bf77-cfbd4ab2edb3" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="fd488b32-da17-4253-8bc6-e20e4eeb3f3d" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="99691398-0583-4950-9d3c-4ce9afab9f18" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="f2f49f56-4aa3-4b63-9da9-b6b0a5eceeb8" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="ad56306d-3f71-4262-bb83-cc3a8c114c99" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="6668aa9d-ba9e-4cb7-95b1-c9699cf0b626" data-file-name="components/dashboard/settings.tsx">Product Updates</span></span>
                <p className="text-xs text-muted-foreground" data-unique-id="f3edcb97-ce6a-4970-8224-6d767b07e839" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="5e8d2390-8a7f-4ce6-b29b-05220b9c7720" data-file-name="components/dashboard/settings.tsx">New features and improvements</span></p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="6bde260f-7526-4864-a4d6-e89ddebcd530" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="975fd43e-fc29-44cf-8d71-b6f1d7a1a73e" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="8ed3986d-d3ff-46fb-845d-c9efee9dba82" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div data-unique-id="6af6858b-1ad2-4ce0-86ef-5ba29c3afdc9" data-file-name="components/dashboard/settings.tsx">
          <h3 className="text-md font-medium mb-3" data-unique-id="99b37634-c971-4857-9eb5-ccc8ba8ab4cd" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="f87b356f-9c01-4d0b-a15a-d83176acb704" data-file-name="components/dashboard/settings.tsx">Delivery Methods</span></h3>
          <div className="space-y-3" data-unique-id="4d1a29ab-9945-44d6-bedd-e1ac93dbecef" data-file-name="components/dashboard/settings.tsx">
            <div className="flex items-center justify-between" data-unique-id="e2b9ef42-918f-439e-b3d5-38f9281e0e5f" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6f6c010a-8553-44ff-a821-098e5237d26a" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="558dc067-33c4-4b5a-bd6b-5ab578b0ee6c" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="84412db0-8c87-47a3-b496-71394bcfab40" data-file-name="components/dashboard/settings.tsx">In-app Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="10125250-a250-454f-85cd-301e43b7b284" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="bb38ac34-916d-4eef-9f8f-9e5e74807a75" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="43f3d2bb-9e8a-49e7-8e8b-d7faed071083" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="207ef951-c125-453b-b566-03c5d6e95c29" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="d771be50-3e90-420d-b153-90f705a4687b" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="3deac396-84a4-4425-8c12-4d465849f925" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="946a4d14-7d68-46d1-bd6b-1970a5afe21b" data-file-name="components/dashboard/settings.tsx">Email Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="e23ca16e-2187-4e01-8d28-c3140294e994" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" defaultChecked data-unique-id="bd06f2e3-4c30-4c1b-a456-8ed0e4582146" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="6597e549-12d0-4b08-afd7-40b8db40d57a" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between" data-unique-id="ed86b041-99b6-4b28-8d69-70714f6ecc92" data-file-name="components/dashboard/settings.tsx">
              <div data-unique-id="6ebb3f12-6985-401a-89fc-10d71167f3f5" data-file-name="components/dashboard/settings.tsx">
                <span className="font-medium" data-unique-id="e7dd60c3-0d0e-4382-8f3c-00b2813096ed" data-file-name="components/dashboard/settings.tsx"><span className="editable-text" data-unique-id="1c712291-9466-49e9-8bff-8917eadaf3ac" data-file-name="components/dashboard/settings.tsx">Desktop Notifications</span></span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" data-unique-id="c4638d6a-e078-4f21-a463-505d2f179a5a" data-file-name="components/dashboard/settings.tsx">
                <input type="checkbox" className="sr-only peer" data-unique-id="11caca1c-b195-4349-94dd-9b226607ff9c" data-file-name="components/dashboard/settings.tsx" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" data-unique-id="f1f2daf2-0b99-41d2-ac73-9e2cb38cb7eb" data-file-name="components/dashboard/settings.tsx"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end" data-unique-id="7f1f8829-e2e3-4198-b7b8-9fa58eb80b66" data-file-name="components/dashboard/settings.tsx">
        <Button className="skoop-button-primary" data-unique-id="0ad74a84-55be-4614-a28b-73b447871739" data-file-name="components/dashboard/settings.tsx">
          <Save className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="4e5e7a94-f73e-4969-bfa7-aa09d382fc1e" data-file-name="components/dashboard/settings.tsx">
          Save Changes
        </span></Button>
      </div>
    </div>;
}