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
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold"><span className="editable-text">Profile</span></h1>
        <Button className="skoop-button-primary"><span className="editable-text">Connect Account</span></Button>
      </div>
      
      {/* User info */}
      <div className="skoop-card p-6 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4"><span className="editable-text">
            JD
          </span></div>
          <div>
            <h2 className="text-xl font-semibold"><span className="editable-text">John Doe</span></h2>
            <p className="text-muted-foreground"><span className="editable-text">john.doe@example.com</span></p>
            <div className="mt-2 text-sm">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full"><span className="editable-text">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <div className="text-sm text-muted-foreground"><span className="editable-text">Total Items</span></div>
            <div className="font-semibold text-2xl"><span className="editable-text">299</span></div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground"><span className="editable-text">Collections</span></div>
            <div className="font-semibold text-2xl"><span className="editable-text">15</span></div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground"><span className="editable-text">Member Since</span></div>
            <div className="font-semibold"><span className="editable-text">March, 2023</span></div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4"><span className="editable-text">Connected Accounts</span></h2>
      <div className="space-y-4">
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
  }}>
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")}>
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground"><span className="editable-text">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}}>
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1"><span className="editable-text">Status</span></div>
              <div className="flex items-center">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm"><span className="editable-text">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2"></div>
                    <span className="text-sm"><span className="editable-text">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1">{account.error}</p>}
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1"><span className="editable-text">Last Synced</span></div>
              <div className="text-sm">{account.lastSync}</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1"><span className="editable-text">Items</span></div>
              <div className="text-sm">{account.itemCount}<span className="editable-text"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between">
            <Button variant="ghost" size="sm" className="text-destructive"><span className="editable-text">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center"><span className="editable-text">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}