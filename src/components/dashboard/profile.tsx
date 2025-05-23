"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, AlertCircle, CheckCircle, RefreshCw, ChevronDown, ArrowUpRight, CreditCard, PiggyBank, Shield, Zap, Clock, Users } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile');
  return <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold"><span className="editable-text">Profile</span></h1>
        <div className="flex space-x-2">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')}><span className="editable-text">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')}><span className="editable-text">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2"><span className="editable-text">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
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
        </> : <BillingSection />}
    </div>;
}

// Billing Section Component
function BillingSection() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'team'>('pro');

  // Payment cycle state
  const [annually, setAnnually] = useState(true);

  // Plans data
  const plans = [{
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: {
      monthly: 0,
      annual: 0
    },
    features: ['500 saved items', '2 connected platforms', 'Basic search'],
    cta: 'Current Plan',
    disabled: false
  }, {
    id: 'pro',
    name: 'Pro',
    description: 'For power users',
    price: {
      monthly: 9,
      annual: 90
    },
    features: ['Unlimited saved items', 'All platforms', 'Advanced semantic search', 'Smart collections', '15-minute sync'],
    cta: 'Upgrade to Pro',
    highlight: true,
    disabled: false
  }, {
    id: 'team',
    name: 'Power',
    description: 'Collaborate with your team',
    price: {
      monthly: 19,
      annual: 190
    },
    features: ['Everything in Pro', '5 team members', 'Shared collections', 'Skoop Content columns', 'Collaboration tools', 'Advanced analytics'],
    cta: 'Upgrade to Power',
    disabled: false
  }];

  // Payment methods
  const paymentMethods = [{
    id: 'card-1',
    type: 'visa',
    last4: '4242',
    expiry: '04/25',
    isDefault: true
  }, {
    id: 'card-2',
    type: 'mastercard',
    last4: '8210',
    expiry: '09/24',
    isDefault: false
  }];

  // Recent invoices
  const invoices = [{
    id: 'inv-001',
    date: 'May 1, 2023',
    amount: '$90.00',
    status: 'Paid'
  }, {
    id: 'inv-002',
    date: 'Apr 1, 2023',
    amount: '$90.00',
    status: 'Paid'
  }, {
    id: 'inv-003',
    date: 'Mar 1, 2023',
    amount: '$90.00',
    status: 'Paid'
  }];

  // Calculate discount percentage for annual plans
  const getDiscount = (monthly: number, annual: number) => {
    if (monthly === 0) return 0;
    const monthlyCost = monthly * 12;
    const annualCost = annual;
    const savings = monthlyCost - annualCost;
    return Math.round(savings / monthlyCost * 100);
  };

  // Get price display with monthly/annual toggle
  const getPriceDisplay = (plan: typeof plans[0]) => {
    const price = annually ? plan.price.annual : plan.price.monthly;
    const discount = getDiscount(plan.price.monthly, plan.price.annual);
    if (price === 0) {
      return <span className="text-3xl font-bold"><span className="editable-text">Free</span></span>;
    }
    return <div className="flex items-baseline">
        <span className="text-3xl font-bold"><span className="editable-text">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1"><span className="editable-text">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10"><span className="editable-text">
            Save </span>{discount}<span className="editable-text">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8">
      {/* Current Plan Section */}
      <div className="skoop-card p-6">
        <h2 className="text-xl font-medium mb-6"><span className="editable-text">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6">
          <div className="bg-secondary rounded-full p-1 flex items-center">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)}><span className="editable-text">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)}><span className="editable-text">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")}>
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg"><span className="editable-text">
                  Popular
                </span></div>}
              
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)}>
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium"><span className="editable-text">Payment Methods</span></h2>
          <Button variant="outline" size="sm">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold"><span className="editable-text">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div>
                  <div className="font-medium">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground"><span className="editable-text">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"><span className="editable-text">Default</span></span>}
                <Button variant="ghost" size="sm"><span className="editable-text">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm"><span className="editable-text">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6">
        <h2 className="text-xl font-medium mb-6"><span className="editable-text">Billing History</span></h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-sm font-medium"><span className="editable-text">Invoice</span></th>
                <th className="p-3 text-sm font-medium"><span className="editable-text">Date</span></th>
                <th className="p-3 text-sm font-medium"><span className="editable-text">Amount</span></th>
                <th className="p-3 text-sm font-medium"><span className="editable-text">Status</span></th>
                <th className="p-3 text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-3 text-sm">{invoice.id}</td>
                  <td className="p-3 text-sm">{invoice.date}</td>
                  <td className="p-3 text-sm">{invoice.amount}</td>
                  <td className="p-3 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right">
                    <Button variant="ghost" size="sm"><span className="editable-text">Download</span></Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
        
          <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}}>
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
          </div>
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