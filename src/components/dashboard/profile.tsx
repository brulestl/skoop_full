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
  return <div data-unique-id="44b9ab96-9cb6-401e-a83c-bcbf8628e8ba" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="9e1e0933-f784-409c-81be-ba62b3bc2eb8" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="e54fd8c3-68ee-4d34-a7da-6dfafaecd90b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3e8738d6-b78f-4a27-b2cf-9183eefd8870" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <Button className="skoop-button-primary" data-unique-id="b089c793-78cb-401d-a812-302b39085131" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="29efae94-67dd-4b76-8a87-327115e58481" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8" data-unique-id="340f6504-6f9e-49cb-8103-ef9cebea8d06" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="2ee86c70-8c67-4fe0-963b-7be62a1c7913" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="a2baeb6f-b584-4aee-8505-294559c57e4c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e656aaa1-5e7a-43ef-bede-ef2c9b1aba24" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="b417db4d-e5e9-4786-b893-f5ca63f42fcc" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="0477f5ce-3d72-4f3a-b364-c68ddeb6f08a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a6f0a87b-ccc6-4cae-961f-e85372eb5af3" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="6ff50b5b-faaf-4c17-b1eb-f49f043653f6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="813d7a28-caf1-4ae7-a936-f22b7f8baed4" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="8c90c812-bc5d-491e-a12e-653b2686173c" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="e1b8bf07-0787-4b07-8d88-2951f9adea3f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c4faba67-dbc7-4688-9639-1c1a6afa5b82" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="27e1517d-0006-40a3-aed4-3ce41a73ba6e" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="95252fb8-a7ef-4ebc-8372-cfe99d34e7d1" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="5fb7fb76-598c-43ff-a81f-7316a16dbbbf" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7b89833b-cfa6-40c1-9c5b-4e7179fb35c9" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="68d06568-3471-4700-8c7c-bb616ee9aa76" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2a055cdc-04e9-42f8-aaad-a0556840ea95" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="fd181e42-e765-4ed4-8be2-a4829999e6b3" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="9e3932bc-7a68-44ad-a578-1820376a1895" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c7af455e-bb91-4d68-a17b-eb3a6779a165" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="cdbddbbb-c665-4a95-97aa-f7ea3ed3dfd9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bc2c8e45-00cc-4dfd-949f-0ae666dc6942" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="d0c5b000-d27f-4d72-b329-fde82db89c65" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="c94b1e1d-17ca-4c96-96bd-e3bfe11182c5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d49c1791-c0ce-45d6-8f8b-23aba2fa726c" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="f693fc8e-1a60-4598-935e-b3d580fbd9d1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="35e1276e-e87c-47d2-8b34-7d617d8c2aad" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4" data-unique-id="28637bd6-c47f-404c-afd5-73628c67866c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="40bf7493-1c70-41e0-a710-3f78c39c28d8" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
      <div className="space-y-4" data-unique-id="45cb3a1f-4b4b-44d9-bc92-d539e5ef9664" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
  }} data-unique-id="e2a12723-912b-45c9-9b91-ca92630d98a0" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="e857cfac-b0db-4204-9455-a2239905edac" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="8f335747-b3d7-43db-a3ea-47a215271045" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="d51fce3e-362e-42f0-ae3a-cfc461682440" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="6fbc260f-6f68-415a-b6d9-d992773431a7" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="051ed17b-72c1-4703-a36f-831e6d7c8c5e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="0567cad8-c55c-46bd-9ba1-a82b905d7d5e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="c9003417-b988-43f9-96fb-fccf3a1e75b3" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="4be57502-6eeb-4e6a-8053-3d27fb3bfa19" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="20d295f7-aae1-4a32-9cd1-11559cdf917b" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="202d804d-ae4c-41c2-8a2d-00f10c15f18b" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="fafb30c4-5e60-4d35-9192-ae39ec7fdb62" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="7084c206-609c-43fd-81aa-135b66e878f9" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="c9f4d512-80f0-45cc-9343-17f5ec2a5d08" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="cc18da17-b98a-46fa-81db-5e15fce615b5" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="906e8408-440d-42cf-b3ee-aa13e3dc1e34" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="313fe51e-1123-4841-a8b2-101297ba6776" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ace7eece-6f88-4e4c-b2de-a4d99c5a4206" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="338c0724-06c8-4bb3-8065-ced95881efb4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="230dea7c-c149-49f3-a4fc-2dd83ebe2a12" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="d88fcaa0-6c20-4b62-af8a-74ce3fd8ab43" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5d8393c7-982e-401a-b648-47b030deb47a" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="00fe856b-15b5-4ec8-86fa-501b7bb88e4b" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="c05ce2ce-8a20-4bd5-9227-d60bff96d0dc" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="42fbe566-3b7d-4c67-af94-42f1dd0136b0" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="1bdbb6db-e6ed-4ac5-8ef8-b8ed4a631876" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="26af0ded-c71a-46ae-bfae-372b777689ae" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="42e26cca-fdb7-40b3-9e98-3c1e27b3602f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9d9544ea-bd73-4578-b301-9879d0ca5a06" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="fabc9dc8-c049-4bb2-96fb-816fca3738e2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="fc40f6f7-7c3b-4d8f-9dc8-bbcccbddfbe0" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="5e7f0959-2aa6-4b9d-acdc-eb71ca787be2" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5f47c6c2-ca5f-4779-999f-621650290035" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="f1ee3746-488b-4540-9f34-e3dfcf2dbf0a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="025e237c-de65-43d1-a414-63aae68c108b" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="1055d472-620b-4e34-a624-ed96a0c8fcc9" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="dd51318b-e450-4b4b-a288-4e22879e0387" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="48a08fa8-2ad0-48df-a013-e565991d66b0" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="9995682b-a84a-4f7b-94ff-7e4cd11156f0" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="65d85da0-1299-4c78-b121-b21eae3af378" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}