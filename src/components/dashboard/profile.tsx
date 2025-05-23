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
  return <div data-unique-id="e65c4703-7af4-4759-8628-274a5501175e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="09055948-479b-4f95-a65a-eadf03cc89ff" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="2386a812-8b7f-4cd6-b733-4784381d4de4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4c2c46d5-7a8c-4cca-8c77-7282b660799a" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <Button className="skoop-button-primary" data-unique-id="81f7530d-9980-4820-a281-5cfbc7044024" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="59d85d7b-3811-4875-a796-17fa5a8f35b8" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8" data-unique-id="ab9d4d7c-cbc6-4b79-87ba-1802b8451d81" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="3e0ebb0c-f367-4d73-96e6-468fd7b4ff18" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="f1e6f763-1d96-4ae2-baee-821a21b9b639" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e9383d5f-9201-4e7e-821f-8004c75c2e69" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="b4024df2-6c88-4e6c-890e-8226e2c27317" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="ff6e7fa2-9b7c-4035-9ec9-9986615b5164" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="23900455-7d6d-4f65-bae6-b74ef641667a" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="8562f25a-d5db-4523-a10f-f40e6225da46" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1291c232-e5af-4feb-9b40-e67c62ee517e" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="394c88ee-697c-48b3-842a-6d862ac1f92f" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="fc720ec2-4d04-42da-b0c5-404dab444cac" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="336849a2-b3ca-4ad4-929a-919f6a0edc6a" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="cb2d41f9-060f-4077-b401-e53764f0f92f" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="64508d83-4a79-4d23-9a78-a49d16d08d7b" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="34a88abf-2a62-48e9-a015-710f9357c6ed" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="93a53391-4da4-4c18-8eb0-461d8bee57be" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="a2c4a9b2-a393-4859-addf-198fd1bb87c8" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="20b48026-037e-490d-9eb9-c0d45bb83c2c" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="f69d8b4c-9d33-4b0d-b3dc-03e70c882af7" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="5ead7153-9cba-4b3e-8e5e-32d8841220e4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1a88fb07-b9d4-45b9-835b-c87ce7861181" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="cead2de4-785a-40da-81cb-7f169a5b2754" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2e7953d2-9197-4035-8aec-7ec391983974" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="e49e6f61-dc55-4582-aadd-ed24da02a63b" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="f935f69f-be73-43fe-a7a2-ee1a933c5c47" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="65333256-bb66-4508-9ae9-17e336288e14" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="72957fc6-dbe5-4fdb-8a03-ec6007d939b6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="26127537-af33-4561-84c7-be0007db1a0d" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4" data-unique-id="eb353a1c-0b97-4a41-8bb6-1b8c7c7360d3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="36326b6f-663d-45d5-9a23-c10eea177f8e" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
      <div className="space-y-4" data-unique-id="228d2563-360d-4d64-9187-ce578f760111" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
  }} data-unique-id="3a872140-6088-4a29-9a01-ca6ccc5b5a1f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="9d119f93-ad19-46a7-b3eb-01e4188dba2a" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="894a7270-7c75-4dec-832b-6537bc9f4cf0" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="57451f2a-aef3-45ac-b7e2-cebad91263fd" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="35bc22a8-ce8a-4a28-9b02-f076ab0df414" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="f4d00fce-888e-40f6-a3d2-768c7235a544" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="77cd2cbb-fa0b-43df-9e96-e0427f2acb5a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="a2f910e8-141c-4636-a2b3-eb9efdf011b6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="7fd73a3c-548b-4fc3-b8eb-c63fba99995e" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="f62fa538-008d-42d1-9640-188cb84b4670" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="07afcce4-6ab8-477e-9bc9-8535d44b3af4" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="f024b274-676a-4313-be1c-ad1f3f5f62f0" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="2da5cda0-751d-4d78-83b1-a916bee5f27c" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="88b76a21-c25d-4bde-8fa2-98771f5d424f" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="01b73bd8-0eaa-4848-8f6a-1836f2092a24" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="a41fcf69-75be-4f51-9f27-21ff155a847d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="85001fdc-ca6e-4671-ae3b-6ebf3ed62380" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7847d836-1df5-4665-bd15-7c14409696f5" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="80630335-3f25-482a-bbec-2e14d9cd2257" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="806fddd9-1660-4188-9392-e16e663694bc" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="90ebb758-d893-44eb-8d12-1d9dd163da73" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="539f9250-4368-424a-8e82-422780fa4ae6" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="a9377290-a718-49a2-88fe-41fe13453c07" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="a17090c8-2429-4d74-9899-f9c43f5c59a2" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fe104b59-fdf0-4a46-bf5a-72dfe839140e" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="89b2b28c-66e7-4dc6-8e50-54b4317e4e89" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="660e6195-016b-479d-ae81-ac54bd871e0a" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="740ef158-5788-4923-8be6-64fa69b2875c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="70430b47-7732-4e4a-a6b8-f2e27de9431f" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="33fc92bc-0181-4fd7-bd5c-7cf3676a9532" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="f56dd707-101f-4f74-9839-6bd10ec496e6" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="76ee9fde-0af8-489d-bbdf-8a9b8416802e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0a1e9115-009d-45bd-bb68-43069e061422" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="3afc1194-162d-445b-8451-dd9eb5f17e84" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="1c4ee1bb-d8b3-4959-af8e-ad9470cc6f58" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="2365d964-e791-4995-81d2-3249ff4a4abf" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="27c73f6c-c005-49da-9c5b-a40a39c50a67" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="42c1cfbd-1dfd-455e-97a4-0da1d104ab83" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="fefff824-e4b0-459c-a0c9-357ba4dcbf29" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e626f7b0-f44e-4cce-a575-f5da7fdf7b58" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}