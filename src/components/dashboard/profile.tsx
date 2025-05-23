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
  return <div data-unique-id="041d8e50-18d9-4d71-bc76-b37d69edc2cb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="8279eb8c-da51-4e50-a6ca-dfb4df9b901c" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="1b0ac76c-1611-4c8f-8546-85695c7e5ca3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d3fb8b93-136a-4c3f-ad0f-a08fe3464514" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex space-x-2" data-unique-id="9dd1c807-2cd5-4316-9d5a-35b399264c66" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="ef25f1a3-dcf2-411a-a406-d526b777b931" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2d4c2644-dbf4-43f2-a6e7-9df00ab6aff8" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="e8a411f3-afff-4aae-b1b0-b3c1ac43ffa7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2d7388c9-fa11-4e50-8929-0b2f6ac24406" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2" data-unique-id="a935f0ec-7ce1-49ae-a318-81d6942269e5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="160de1d7-f4ea-44ac-9ac3-20d0f96fde7c" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="6c28f6eb-d0ae-4605-80b1-7946045e90d3" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="77b528f2-cecf-48c0-8c24-3ea9d2df6296" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="81166a56-a7b9-433c-9de0-d1305b4627e4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2bc408c7-d3da-4729-8e55-e27063110861" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="918531b8-2b9f-4002-9f1f-9dfa13a1dffd" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="200d1484-5a3f-4640-8230-bb7e43d04d91" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="df7504f7-21ca-49ae-aac9-ee7040f7241b" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="9835f907-0c51-4857-acbd-ba3093fbdc14" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="336752d5-a0c6-40c7-9bc1-745ed28293b2" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="7b9d0c34-6ff1-409f-a7aa-d394bfd7366a" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="110bd9c0-48c0-480b-bb35-f0c49fa75e09" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8ff31796-7f82-486e-a3ea-937d76220bfb" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="74d1e503-5f41-43f2-bb1d-c0bf3a702c46" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="52fed91d-40bf-4ca1-9617-6a9b25b91ecf" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="7101ab95-7b66-4b80-b667-83299487126c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9edb0602-b3e2-44e3-bb26-902fa8d0e06e" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="bc06e980-384e-4382-8d9a-c754201357e9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7b24c69f-314b-40e1-9680-b0f22f6d3a5c" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="0ff565f3-7367-4e9f-ae19-4c8f3ef1c97e" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="51a2d9f0-209c-45ea-925b-2ff346c3b156" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e19eeb44-f9d0-4106-b380-40c7c40bed07" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="d6122002-4c5b-4472-9507-e5dc55769bae" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="04c0adb6-6c94-4da1-9ad9-3b19e2856d61" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="c523c7cb-c5cf-4c78-81b3-cf1133a03a57" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="99e92adb-3141-438b-b7b0-9eee8b2b97ea" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a856cc24-d2a7-42b5-ab17-87b876ffaea4" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="621dd7dc-80cf-46de-93dc-f456bc1ef54c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3e10d3aa-d113-4107-96a0-a59bed837fcc" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="b281f22b-5649-4eab-842d-3897676a3ce4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="51c58eca-8474-455d-9684-001ea1344321" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="0d44809c-b2c4-4a32-bc0f-696ee5caa231" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
    name: 'Team',
    description: 'Collaborate with your team',
    price: {
      monthly: 19,
      annual: 190
    },
    features: ['Everything in Pro', '5 team members', 'Shared collections', 'Collaboration tools', 'Advanced analytics'],
    cta: 'Upgrade to Team',
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
      return <span className="text-3xl font-bold" data-unique-id="b1193554-a99a-420b-bd56-bc7e3710b029" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0219f486-c216-4bab-b01e-20fae28a2a75" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="b7dd2267-a838-4a8b-9eb7-c3998d9bb526" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="434ad949-b719-4322-b91b-2b2df79d809c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a292711b-c7df-4252-8ac8-ad208d4e3a4f" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="2f34ad83-8636-4f79-a086-7db2e8a33fa5" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="89a20008-5fb9-41bd-8955-cf9a5d4e7a47" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="b4bd48b2-8ef4-430f-9109-c9f9efde1f2e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="087173c4-cf8d-4815-bc0b-e54223433e89" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="a22857c9-2983-4b89-a8b6-255a9b1500b3" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="8c23f94d-2fde-4a35-84b7-5ab3cf8ef85c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="a2a25898-fb8d-4517-96af-c6970c3e8eff" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="7e41f76e-8548-47a6-927e-7e75c90edd71" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="66669646-826c-4ca6-a674-14646de318d7" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="3ee71bae-9e18-43b3-b4b7-360b2bbbe836" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="d06d27b4-f8cb-4312-bc5c-8f89a4080a9a" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="d5a78a58-b03b-4676-a74b-85a6c5cdea62" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f6b25935-65b9-4c16-85cc-a26704772155" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="13efb337-7e8c-4cf1-bac6-615065a954e3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5837c263-d6cd-401b-a9f7-647485750c04" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="a0273a40-b7fe-4045-bc0d-427bb2e63e8b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="9ff87037-df93-4da6-ac38-b4438080b7f9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="fed4bb91-cf94-433d-a201-59e4b34c3b17" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="81cc0735-51fe-4472-833d-458268700223" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="0f43d89a-23c0-4949-abc2-bc7852712127" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="853d6a8b-0735-487e-8e21-fe30e94b4b95" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="7e21f3a7-8cf5-43e0-951c-240e7f956093" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="44a67a28-04cf-44e6-bb83-642baee9f64a" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="1a467daf-1ed1-470b-a6b6-51455c74d12a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="455425b1-e53e-4766-a9f2-11b33f501dc6" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="e9201fa4-aaa1-4ef1-81e1-7a76b8abbe00" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="f27828bf-8444-46e7-8360-55abdc737ef4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="04d7da0d-9d06-4a2a-bbc6-5dd34be0557d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="ffe6ad8f-a9b5-4035-8324-ee390f235331" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="a63c2726-0f3e-4a8e-8c01-f6ad3fc36f80" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="d0dfa3a2-e016-4c95-b502-00d3a542a8eb" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fb8d1983-b32b-42c6-a42c-45705a72fbde" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="c192900a-3c1b-4d39-bd95-9b9f6eb01883" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1adf1f74-af7d-4705-ab49-837347013683" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="ad65c17b-dae5-495a-98cb-df2633f6c7e6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="819eb49b-8a67-48a1-b4ef-8046dcb89e86" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="48f211b1-7563-48cd-aabf-ac5b5f36843f" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="4a29b667-80c4-4e68-821e-4782a80f6f7e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="223cdc06-c0bc-443a-86a7-8ecacffb3418" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7c37df70-6992-49bd-955b-82056e9d4cfa" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="31ce8706-0e5a-4a5c-8228-0ba2923cbf02" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="6cb10032-999d-4126-83cb-eeb67eaa6def" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="86fc4675-69b3-4a07-b4a2-82acc921b9a1" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="6d03aba9-b544-41ac-b4b5-11b6d1decb3e" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="0b4c73dc-672f-4085-bc2b-ce898119937f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="3cc038af-1f95-4a68-be65-74f7584313b2" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="407e94bf-c534-4fc0-9934-2ad206ad1725" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="c58643ac-4d80-4d1f-8e2a-db329b281333" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="fc7606f7-38a7-4d43-9528-0a62a3aa7ad1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="cb114d45-4236-4aef-8b7d-0dcafe8c8b09" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="40aa9bf7-6b8c-431a-b388-b343bc4de949" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="488132cc-e438-46d7-90ff-a5368d276959" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1cd0a76e-4b2f-4ddf-bee4-c12a18ea06d2" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="3b07f233-6761-4558-b47b-e5fc36bebf98" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a5da2658-6634-412f-bcbb-38553e03d21d" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="79f8b1c8-73b4-43ac-98ca-03c31542f6fb" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="e36c509b-c4cd-4857-b8bb-641b82632e8e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ed34bd0b-4f66-4477-9a53-62625027f2c1" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="0c283cdc-c191-4a7b-b925-7d52a4aaa279" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="25c7fb51-9fb0-4555-9e0b-3023247f9799" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="1d8a6885-3307-4fc4-8c02-53c0f4d87fa8" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="3afbf6ab-aab7-4f16-8b5a-63a18afb5899" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="8a712231-1b3e-41b3-b296-db66a08d2a74" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8d4ad704-910a-4d56-b7f4-345c5f45df2d" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="742cce11-daa1-426b-8a37-f2eee5a927a3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4d128ecb-61fa-43ad-a4da-00b608e892ff" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="24e583b5-0aa6-46e4-9c21-fe4df74c4152" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="32e79f94-2918-447d-957d-afbeca9da3c3" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="f3ab44e2-b8fe-4319-b8e5-0df33b70761b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2ea2f640-7d22-4a41-a3fb-03f0a6da9c3e" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="3d11a15f-86ed-4ee0-828a-26ec965af950" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="b1e6ac26-2320-41c3-8c31-5c3889452193" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="91f1e790-9365-495a-8e92-ec024b219f28" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="37146764-72a1-43c9-a8fe-4aab645533ec" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="7c64e844-0a48-4522-8693-60c70bda3560" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="f6179826-b2f3-4c4b-aaa2-c4bec7d41150" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="670f8d7d-b2dd-4e58-bd6e-247a63766455" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="3e013f22-19c7-4340-92b2-a5f573ab8eaf" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="d8f3af17-f734-4141-b16d-e97da7e78992" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="80da5774-68d9-49f8-8ef5-f71908e920a7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8eaefcb1-fbea-44f9-b553-796389ef1ac5" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="cb6418b6-6d37-40a7-8fd0-aadb9eeaa5ab" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="ad4cf808-b2d8-4924-b90c-082777af1ba7" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="dfce1023-1f8c-4459-b64b-0b3195b0d34a" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="7909db64-dfdc-4eb2-a31e-7db647e55810" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="c68f4d26-38e9-4ac8-8d67-07e65d9889c2" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="0b4c9d88-c4d2-45a1-a323-06e8026ce27d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="406ecc93-7b4d-4cd3-93d0-fb0587996417" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="f8d6c4b8-c14a-4f43-9564-1a9b10c7d526" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="91910a71-aa8f-4f93-9579-bc572dd768de" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="0ff8d4cd-8658-4610-a0e1-0da46cba675a" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="160afc8c-75c3-4615-8ea7-5dc3db7434de" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="9db3e23e-0a7e-4e14-b1d4-109a8619d52c" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="5fc031ec-65c0-47c6-bdf8-2c7c4861e48c" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="9deb4fce-c5bd-4248-a194-2e4fd88797f9" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="c73ee983-93cb-4b06-a2e5-1c252b88a0cc" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="807d0286-c184-4732-94f9-d98461c56507" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="a20bc3e5-c350-4cb5-b672-2da12fc7377a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bfaad470-22b1-4d81-9e64-34dc7c548242" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="56cf09b6-29c1-4647-adb3-5c84ec1d3ccf" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="73511743-e2cf-4bf0-889d-9b07c9cfc9da" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="aceaa733-7091-4024-845d-32174474df0e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="966815c9-9041-44f4-9886-47c3ad062484" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="82bb5720-5740-4d03-9f01-9ed8d35167b9" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="cd02af59-6403-4107-af41-727c803004e9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="910d5740-6b61-4ff3-aec9-c6b628c69845" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="ee596774-665d-4fad-9ad9-07c537a80d92" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="a3d06fd8-e3d4-419d-8536-552ad7c2dfb3" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="1bb73957-9d7b-4f09-b861-9ed27d283e02" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2ee568f4-b878-4d0f-9260-ea951b590222" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="c3573d52-ccc6-4aa0-aeb0-aecd5be58110" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="cc8075b6-c741-4f05-bc04-f57338d87de6" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="728c51e9-c818-4681-9209-718ff5e5f66e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="51b4cc16-1f15-41ed-b0d5-65fa7fbc2c3f" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="d8d245cc-a93d-4ae4-95e9-411901891abf" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="e8b9e52e-36dc-4636-8959-552031193107" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="5f567639-0fdc-41e6-8edc-eb58e479d701" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="0b3f47e6-d693-4d9a-9d25-7abf55eac1a9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="74a5e121-ed86-4037-9f97-3dba03e99c42" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="269676d5-b56d-41d7-918e-7363b7cebcec" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="636ed680-e51f-40f3-81d5-0aba07c92aea" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}