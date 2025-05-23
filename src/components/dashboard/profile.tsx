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
  return <div data-unique-id="486e449c-a503-40f1-a900-7348070b5d2e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="47dbe0ae-1df9-4a5c-9363-32b2f47bb043" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="0d84f01a-d58f-478c-9430-741eddb6d5a1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="29d6f3a9-fe94-4eaa-9d04-dbd954a7ef74" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <Button className="skoop-button-primary" data-unique-id="3f9b07e9-37d4-4cec-b3a8-0f8f74900424" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e23db348-0ad3-403a-8aa8-a6368bf49139" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8" data-unique-id="3893a2b2-6d10-431d-8822-c7ec5e6f2e1e" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="e0fe5fbe-5483-4ccf-9f9b-751de4849fbc" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="bb856fe8-75c3-47f9-8120-0083cec43e9e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="817902fd-a048-4a85-97a2-b3f82fa506bb" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="ee571ce7-b05f-4102-bd0e-ba83b3766a8c" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="7d63713c-697b-404c-b89b-c3a6cde1153d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4af8205e-e0b9-454d-b067-4c247fdd1026" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="9550b523-7e92-4031-8e83-e875063dfaed" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="573b56ce-f403-4860-a8ed-45a0e4615a1c" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="2cbf9c73-f068-48d2-92e1-319cab95d1a1" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="ccdd3b3c-115c-4245-bc7e-d08adf142c79" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="df7155b9-24f0-4264-9b36-9727cbb1f255" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="5c7f7a71-a4d8-431a-8a22-9cb7a218298f" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="db6b764d-89d4-47db-8b53-2f5f2e7d3a12" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="1ba6f9b1-4083-4890-b3c8-2cdfad21bea4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f6702601-5199-4155-a2d1-8538e4eff271" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="9fe636f1-f4b4-42fb-9043-189772f99464" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b738a5b6-183b-43d3-bb8f-073168a45a14" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="cb260997-9a26-40da-b6c4-15a4c304780e" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="9b01721f-0507-4518-af9f-50919922407b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="98a99d03-bd45-4b4c-b673-89d7f4a55f5c" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="804e6426-9094-4d02-a441-564acd5dd6c5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4974d62c-940d-4d6a-8c0f-a298e59518b8" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="f2001013-9fb8-41f6-9be8-940428ebb345" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="9ef0fb7d-5236-4bf5-93f9-d7d1fd4f925c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6e9b6a12-9593-440b-8bd3-df530ac908af" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="3ed7fd2f-7e4b-447f-93ab-23894c81a225" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cafa391a-9805-4447-87b2-0554a54e7d47" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4" data-unique-id="c1cf797b-0f96-4fd1-8483-a90abed05e9c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4a827d13-9616-422f-83e8-425557a245b6" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
      <div className="space-y-4" data-unique-id="33a51839-73e1-4dfc-ab7c-2d47b41c1762" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
  }} data-unique-id="b8dc3d51-372c-401e-ad8e-c9160779d2f5" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="38519064-a964-4fa2-9c5a-659d3b058757" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="7ebfee49-608c-41d4-aa70-c7525306b8c2" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="ec310af7-d1db-4479-bbb5-cddb82834727" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="3455e6fd-f6f9-4486-b5e5-f4fc0fe143e7" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="e7a9096f-067a-4322-99c6-8b32303130f1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="2b317052-2260-40a0-b689-298b5822ca15" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="7a5a8d50-2dae-46b7-8a02-9d9b495efd80" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="f597ac27-b775-44be-bd1c-818863d1ed03" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="1568b1f1-7195-4bc5-a247-6bbb97653195" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="b6fed824-003b-4a92-84e8-815dff763921" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="4cdcd732-83aa-4d09-9f31-3a4d7687bbc1" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="762cf3fa-04f3-421c-9984-c9aafd93940e" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="fd811ac3-d917-4480-834d-e4666ac0204e" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="d1f1b5c2-0dcc-4c15-be96-69c3a6ec283e" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="7f585692-3a4f-4c4b-9355-aa18a2f6a5e6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="b40f47d8-3a70-4e4e-bee1-43a193697788" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8e3c93f4-181f-40f7-b530-1165bfcd034d" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="4b27130e-2e4b-4550-aaa0-66cebd0af984" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="3158256a-29e4-407f-acf3-4ebb3728eb21" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="c5d12525-f743-4ddb-b0cb-c697e783baa6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3daad4fa-6a67-44f8-8273-4c5dec6c3f30" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="826c1340-5221-4331-9f62-57e27dfdea14" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="436cdad0-64f4-45e7-b373-280c49313e6d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="74610464-598b-45a4-98ec-41ea48af8996" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="90210876-2d21-4971-b912-fadaded27b57" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="349582be-c6cf-46c3-b54e-235807e1a72a" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="f33683cc-ad16-4c93-bae0-b4817dfd8131" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c67e6682-8edf-44b2-b999-1c31e30b2c4a" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="4a0e8e21-8d5d-44e9-8b6a-fc7fbf59a37d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="38a59381-e3b2-4829-a4c4-fcc35a838635" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="000b6488-12aa-4d96-b69f-b7335801f449" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2d55331e-7837-49e7-ae22-f4b13ff4238b" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="845f6fa8-5e30-4e2b-9a36-d06b815db434" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="6cdb6e1b-897e-4d41-bf5f-1b7f2d41e7aa" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="dec88061-e42e-45b5-82b9-9cbc1475597a" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="2e817b58-f586-4a53-8af8-aafbaf402748" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6964cedb-1d35-4131-a6fa-3ee02119ed8e" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="9bb446e5-f184-4a8e-b3f3-b8c1cdd188d9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="183bd8e2-cffa-4c32-83aa-aae3932e0bdd" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}