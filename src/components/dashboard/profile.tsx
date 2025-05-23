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
  return <div data-unique-id="d1cff045-fbfb-4aa2-8892-8b7f3b7011fc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="ffaab374-b2a6-41e5-9866-568a91e73225" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="b478cb23-9c69-4406-8b59-9ef3e6c16e74" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="778f1765-d970-4430-9bcb-3eac9745d9be" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <Button className="skoop-button-primary" data-unique-id="4a3ef793-b106-4e25-b9cc-370a9d923d3d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8befd9c9-2e58-4606-9de8-2b66ec22e2fb" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8" data-unique-id="ede44e6d-47c9-4287-ad79-e0373eba5236" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="4acab0cc-274b-41d2-8ef1-88c2c359984d" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="03a0ed49-53b7-4cda-9faf-4ee7b3605248" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e38a94c3-82f1-4a1b-b808-a167e8f9b9ed" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="1bce7872-48dd-49cc-a95a-3e0eaf5c92d3" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="195b1f84-f85c-4e43-9c93-5e51fb28cb52" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="18ba75d0-4ff7-497c-ab16-92422106df40" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="5e666039-be9c-4a35-95e5-39a555370fda" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bb1f778d-7683-448f-abea-10554f2de78d" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="32e75fda-fe8b-4ae6-974b-180a54b8a05f" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="5ebcca52-da25-4fa9-b2f0-319702a4e4b2" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e689c2d1-63f4-4419-9f8b-0d46f45fc1d6" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="bdc02b99-e2e4-4966-a861-1e429ed3fa11" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="c2040041-4f49-4998-9fa4-c089b02b55f3" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="9745b51d-cc05-4898-961a-efabad69a4b6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e5f02efc-fff5-4d1d-8453-e6499a77a331" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="57fd272f-0936-41f3-abd1-1ae5b712ceed" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3444a30d-bb89-4d3f-b314-0f5688ff430b" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="375711ea-d27e-4d2c-a5a0-948f331e8b6d" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="ed87ab51-c557-4124-9737-616ee04e69ce" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6b490ace-a3cf-47a1-9684-c4170c355574" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="2c4d7f31-fa20-479a-bf0b-e602efc15621" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1fbc3f96-8ca6-446d-8e56-a6e895138c8c" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="5aa26ba6-fb36-40a9-a25a-a9c58cc09973" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="bcd38e20-1194-420d-a850-0b6ebe9bfd56" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0c6a70a9-ac4a-4b5f-bc71-21be3622531c" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="d39fda0f-5222-44bc-8bfc-1a025918d7d9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d4fdf0ba-7fe7-413f-aa38-6edab375e415" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4" data-unique-id="1c14c222-0037-4f02-8bb0-755cbbeca710" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e43a78ba-b92f-4884-b41d-c46d508233f1" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
      <div className="space-y-4" data-unique-id="df7ff29b-8281-4269-8db7-09aa75f6b4d7" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
  }} data-unique-id="9ada3a73-88d3-4df5-a40d-96dc2cd54fae" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="450614d1-f56c-41c6-a9e0-f3a9472b844d" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="fed6303d-7112-4302-94bf-21a86bb063ec" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="665182e2-a5a5-4a84-a4f4-0741f4ee897e" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="8a84e453-98aa-48d8-b50c-7553990858ac" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="669a08b7-0e3c-4b68-b9ac-00a571197847" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="08a68876-8767-4fce-89a1-ec82bda313e2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="bc1417d7-6a22-41e3-8af2-4aac356c4301" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0af8c72d-2ff5-4131-8ade-1c0d78a78afa" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="5778de07-2845-4c43-8bab-085d35b1f779" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="b087b4e9-94c9-4ed9-89e1-8bb0c8ea48c4" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="99b2ea1f-9ce5-4659-bb46-2c30c49e83e3" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="b7c9b463-1d7d-4429-9965-658d8966f51d" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="71a8ca69-cb0b-44c0-a085-0e1bd8e037f1" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="90965a46-539d-4b85-91a8-a750e3f9f542" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="a88ce51c-8d29-4422-9bc7-59dc4ea05a74" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="50b39707-53f6-4008-b038-4fecb58303b7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c3d6e267-888b-41aa-81ae-bfec023f0ad8" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="8e555372-8390-47c9-a911-74515c64fe7f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="7392b0f7-b275-462c-a952-c8565268452b" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="3bd4955e-b340-4d26-b05f-96db3d6b6537" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e46c0116-0b04-4059-9729-b37e86cd3f2f" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="8cef582a-bf97-44f9-8826-fa548a0185e2" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="88f3d956-a0ed-43ae-a0e7-6265ac3f0d1d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="18df8cc6-dd0a-4c40-97b1-4932c8271723" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="5ff89806-3d78-4176-8483-3ae07e4765f7" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="e6a807aa-a4c4-4488-8012-20e5acb9e7d7" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="7935e0f4-9918-4849-a9ae-282a6e39c5aa" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ec1252de-f1f1-4373-8eae-f6af863c36d8" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="57f606f2-a8d4-4ddc-ac5d-c78a89f500ad" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="a34819dd-ae9a-4af0-925c-e1b51df82a22" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="0fbe9708-4685-43f8-92cd-bc3b47b4401a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d5582151-db3f-40d5-9303-ddc4c2fb9759" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="f463e0c0-0306-49b8-a4cd-a55f3ce8491c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="280bf743-1132-4c4e-84a1-ba4570752076" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="682d2149-cabb-4ad4-9bbc-d2f8e695694e" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="62e31f53-117b-4b24-9658-0e312be3ef61" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="40e719b5-06b9-4bc5-9764-cc46d6e3c78a" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="d6f75030-9a51-408f-af43-5d48023f8b67" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="90586b18-4493-49aa-8198-007554a2c7b7" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}