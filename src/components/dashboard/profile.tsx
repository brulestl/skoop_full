"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, AlertCircle, CheckCircle, RefreshCw, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for connected accounts
const connectedAccounts = [{
  id: "github",
  name: "GitHub",
  icon: Github,
  username: "johndoe",
  status: "connected",
  lastSync: "Today, 11:23 AM",
  itemCount: 124
}, {
  id: "twitter",
  name: "Twitter",
  icon: Twitter,
  username: "johndoe42",
  status: "connected",
  lastSync: "Today, 10:45 AM",
  itemCount: 87
}, {
  id: "reddit",
  name: "Reddit",
  icon: Reddit,
  username: "john_doe_reddit",
  status: "error",
  lastSync: "Yesterday, 3:15 PM",
  error: "Authentication token expired",
  itemCount: 56
}, {
  id: "stackoverflow",
  name: "Stack Overflow",
  icon: StackOverflow,
  username: "user123456",
  status: "connected",
  lastSync: "May 20, 2023",
  itemCount: 32
}];
export default function Profile() {
  return <div data-unique-id="fe44a729-6ef1-42d8-80b1-826cecad2b4d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="c219d2d9-8baa-4e4c-ad78-1e64d0db3505" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="d37689b0-56dd-46f3-bb74-4fdc33588a1a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fe16f77e-a850-42a1-8d62-f6c864b91043" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <Button className="skoop-button-primary" data-unique-id="dfa7a929-3f88-4f68-8381-44564daa9be5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="44b0ae8a-d7c4-4adf-a262-4e032f39b452" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8" data-unique-id="d11bf466-261c-42a3-bf49-a5fcc1ae38f3" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="32b0720a-a2cc-484b-8b5f-e36958833158" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="19314dfd-eb6b-4af9-abae-1e24e59c56e0" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="aa0f72ca-c81c-4505-ae1a-cd5690c218e7" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="b035353a-5b9c-49bc-9a89-d42af3400faf" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="065ae957-fca2-4a36-b62b-9ec70e6978c9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="66a8f0ed-92c6-417f-9f3e-40a182e540ee" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="ae18d76b-60c6-48d7-9b76-38d0c824a716" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6a72f67d-cec7-451c-95bd-46bd25d67906" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="e5481451-3717-494a-9415-1bc2654dd5e9" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="29290400-cb1c-4d26-8e0d-34d40eb30286" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2814ce7a-7330-4a8e-8fcb-ea7ebf7bc186" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="ed8d7f48-c876-4130-a31f-d45001c2b0ae" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="f5319c18-43c0-4a51-bf9f-7e7ea238926c" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="74b4fa67-cb25-4b15-bec9-7ef4eb933f51" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5754ada6-4b3e-47c3-96cb-6d5ff98618c8" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="7b013b9d-6511-45d8-9a01-63935cfec0bc" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4f11ffa7-913c-4ef0-ab84-302a3612fae0" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="1a4b68a2-1993-48cc-920b-cf5f21c6f33e" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="c679d4d5-1b54-462e-add1-22712bd4880e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e53f56ed-9af6-4836-99f1-9e4c86205308" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="2de59296-c008-480e-b27e-5ffa16043a25" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="39e64960-d721-490d-b067-fc517a747b97" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="f57b1b09-873d-483a-8dc1-6fe60f9ee0a0" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="72f05b95-300f-45d3-be91-3c800a218fee" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9f37491a-7fe7-4584-b1a0-a6f005f482ec" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="6030dcee-a028-4132-af07-6e0dae1c7aec" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f0449ba9-ce92-427b-89d9-c8682160fc2f" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4" data-unique-id="8f590d2c-abea-45e9-bfcf-f3678dfa65c6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c07e59b1-cff4-46d9-b624-b997b431c035" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
      <div className="space-y-4" data-unique-id="5fdcfde2-c9da-4a02-b383-57bade71816e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        {connectedAccounts.map(account => <ConnectedAccountCard key={account.id} account={account} />)}
      </div>
    </div>;
}
interface ConnectedAccountCardProps {
  account: typeof connectedAccounts[0];
}
function ConnectedAccountCard({
  account
}: ConnectedAccountCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = account.icon;
  return <motion.div className="skoop-card overflow-hidden" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2
  }} data-unique-id="389baf1b-c4cd-4bc3-b4f9-eb8b32769874" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="6552345a-0b61-4871-8d92-0cf3af3c7a4d" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="90e97a75-4e22-4aac-8ac6-3539469f455f" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="b478befe-c9a9-4236-b477-8c93e55e3726" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="966c7235-a2c2-4d39-b9b6-62b4f2160afb" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="e1537130-5e1e-477c-a7e5-ecd8deb40966" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="75e50032-fe70-412f-b0d1-7319637299fe" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="c84a6a73-0aad-46e9-9125-bbdb99a86508" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e02f18a7-4be4-4559-a896-297c3284888b" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="5280e90f-a3f0-4341-90d2-7611ce308a76" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="023a4740-1f39-427f-8403-83e157275b6a" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="21779ba4-720e-445d-aa4c-eb13a0d91c7e" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="8b46c2b9-0078-40c2-b08c-8ae1be3a5dbd" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="561c498f-1749-48c2-8075-aa2703f1c078" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="3a2e1fe9-5050-49ab-8a87-944cbc89e9b1" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="c383a1a6-2e8a-401a-9aee-cc0dce737331" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="77a205a3-6129-4701-b0b5-17230dbcdee6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d9a81790-a290-44f3-8349-96c8360148b8" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="dbabedc7-7fb6-425e-9554-fd6ef156fb5c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="f990d1ab-30d4-4db4-b1d0-dbb4a63d7ed2" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="fc160e7a-c4a0-4aff-abd2-143d183140e3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="361169e4-ade2-4d74-96bd-81ab13f07fc1" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="23f25823-271f-40d1-8297-11502618f694" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="e21db0d4-f185-4883-8c54-6a79a952fb27" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4bc1d800-6d0b-4339-be63-a71f527e40ed" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="564a8e85-e9d3-4a7f-99db-d8801026e07c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="05151225-c624-4c51-94e1-7cdc14dd0944" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="93ba65a7-972d-457e-928e-5fd044151246" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2eabe21a-7803-4eb4-a96a-9f6b20daa0a1" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="f3a4def7-737c-4092-8fb4-e1a3f9c38b05" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="8d515961-8855-4e81-8a61-6e504be1f27c" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="69f7dabf-10e7-4fa0-9140-7a55b6be9e19" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6f4f7016-4c8d-40c0-978d-e096228d1dee" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="3412fee1-bb7b-4a86-ae54-e26a9fa17462" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="1c2ee41a-e5e0-4d8c-a9be-599daf74014d" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="359b269d-6188-4f8f-805f-a250dd8a4d44" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="4c1921b3-32a9-410d-b828-ea450f40607c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="afb1c160-59fc-418e-8e73-6075b123aafe" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="d56df27a-406b-41f9-aba3-149b06786f85" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a46790a5-013c-4144-81a0-0b21ba702ddb" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}