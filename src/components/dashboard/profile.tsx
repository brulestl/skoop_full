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
  return <div data-unique-id="0f8778e8-ee88-4d6b-9af8-621eb4db08c7" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex flex-col gap-3 mb-6" data-unique-id="cf7083da-3198-46c9-8213-f34dc4628c0f" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="c24b3c15-e2d9-496a-8200-320e1e541dd8" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f50e4fb3-341c-40a4-a9b9-391ed685a36a" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex flex-wrap gap-2" data-unique-id="1e56a609-e3b6-4d6d-97bf-df56e5316d60" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="caf31e9d-5913-481c-96e7-1fa094d93912" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bff0a562-4577-4de1-957d-0747cd20b0eb" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="68335fe8-fd10-4c2c-b5ef-cfe872fc7df5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="06a44a4e-85b4-461b-97b3-6729e6e92bc7" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary" data-unique-id="d3662f4e-c4ee-40a9-8539-2da096a54b1f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2b21f9ff-d585-4f2e-94f7-0c0fbdc4aa59" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="6abbdd47-cf40-4af0-89c5-7aa9f29a230d" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="ea9863ea-59ed-41b3-9231-17ebc0ed4189" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="9569a4db-de91-4501-968b-d5e460e4da97" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="15714835-00d1-4e75-8c32-f6555a728929" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="c8fe8125-f2b8-443e-98a4-c8acb4a8919d" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="5d7d1d27-d24c-4067-9431-f78a8dd810b3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9c3f51d9-6e1d-487f-abaf-6ceac8af53c5" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="04c0aad2-3b76-40d2-bce5-05ce945f45e8" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8bac760f-24ba-4568-b87c-20da097eabb4" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="d133ff38-57aa-4060-8381-c1759fd8a007" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="676410d6-59b1-491b-811d-73f1837adef9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d482eac1-140a-40c9-af6b-6b2c404f24c4" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="859cd4b4-13ed-4002-ba33-7d6087adf221" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="6d6769fe-13f2-4ac8-b835-7c19e0bf71c9" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="8d8f6232-c6a8-44fd-96ec-18dcdfcbcf00" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d0f96755-d0ac-46d0-bb5d-65725a8ed977" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="af52a30f-67d2-4230-80c5-a5f3ababa686" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="452763ea-1fec-466f-8411-db43e753e0b4" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="c9cbbc70-291a-4552-a1b0-4d6650a8c8e6" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="6be7e7b4-635c-43bf-ae20-c8f45b67d3c5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="84935f5d-e825-43dd-9ccd-b4463e074275" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="b01ed6ca-9239-43eb-b0dc-88142e0f122d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="af911390-696e-4ff8-97bf-5aa60c4a9f62" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="2ac8ac1a-4c2d-4512-8961-31b6aac1aad4" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="ee627b97-2246-4971-aa4d-113920318b4e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="904710c5-bd41-44e8-a4e3-52142dffe0ff" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="4ca81a50-e386-466e-b4e7-27afc3835c76" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6d37445f-e9c3-496a-a73a-7c98fce90bf6" data-file-name="components/dashboard/profile.tsx">March, 2025</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="7ff419f6-80fe-49f7-84f6-5ec72fa9e3d9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f908165f-c482-4820-8937-72ef7b8dbe26" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="bb70fbf8-d924-439f-89c2-31fa30c53a53" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
    date: 'May 1, 2025',
    amount: '$90.00',
    status: 'Paid'
  }, {
    id: 'inv-002',
    date: 'Apr 1, 2025',
    amount: '$90.00',
    status: 'Paid'
  }, {
    id: 'inv-003',
    date: 'Mar 1, 2025',
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
      return <span className="text-3xl font-bold" data-unique-id="f0d1eeb3-2be6-4996-8cc5-998a51219423" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="522ba5ee-c1c7-42b2-be63-fee9b4b1702f" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="4e2085d6-321f-46f6-a3fd-b5776e3079e2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="9e02b186-be69-4df1-a130-10937a8fd95c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8a084fbc-7392-473c-9c51-4302c946cab2" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="4e57e433-6702-4dfc-8d7a-8eb044ea6cd8" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="16bd1e56-81f4-44b5-99e0-834edb7c2b0d" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="ed48b873-70f1-40de-bfd1-d05ef641b5de" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b7ad9fe3-e3e7-4fe4-8f2c-efde81e6897b" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="bd961eef-8b56-49be-9c44-1ccfb92b97db" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="2877ef6a-0732-4840-b15c-56fd468555bc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="577cbb3c-7750-4a11-b9e6-69587511c13a" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="13a13376-ae37-4778-a9f9-e784f09701e1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="57c1ccef-2d3d-4f7a-bf31-10bbcb04e5a7" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="30182d4d-6a58-47e1-8a5d-c8f9213a0754" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="2b69c359-4f16-44ae-b836-b24ebe4c80be" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="dd1f4349-ef2e-441d-80ec-193f7b931936" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c8bc5d57-896e-427b-bd14-5d07e3a30311" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="7d370f50-8d00-41aa-a78a-698bcd60707e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1027c605-b2d6-44a6-b61f-acef1edb229c" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="6945f5cd-d20e-4d99-91f0-35ae903f19a3" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="b38a6351-3ee8-481c-aacc-3c6c0cde5569" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="9d06b405-ca3c-4e33-9359-d86cfe46f7af" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f2d707fe-0e37-44e7-a7ee-8c2a2fd5360d" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="c4bf19cb-dadc-449c-8a67-100dc475d4f4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="47439709-727a-46ca-9c5e-a852d7ded87e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="c91b197a-34ff-4a4e-8f8b-58629794e660" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="1dff7e13-8292-4ff2-a7a0-a12b71083f91" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="bacbeb91-71de-4485-bdca-9f6ebc99dad9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="ebef1ad8-e864-431a-b49c-39f4378d9926" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="3a0bd15d-1342-4fd7-9b28-cfc268a97b83" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="b10552b2-e5a5-413e-98e5-1a7919640f5d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="b1e7406b-6129-4fd7-b4e6-0ec9d1f04c37" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="8b99ac6c-f02c-4291-84ad-efffca7a1103" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="4116ecf7-690d-4f98-9a4e-54c045e37b18" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="0fdab9f7-e80b-4559-8c19-2024d1724187" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="35a63aa6-65c8-497b-81c1-38d1e4da7c73" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="2f1ae8c9-e37d-4bff-a386-b772ad60f82e" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="1b74c707-ec40-40d6-ad68-ddee685b323f" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="7fd95ccd-8c5e-43cb-8db9-6b42a91dd8aa" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="3b29f14e-bdc7-4311-9871-4f153a159e6d" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="71faf9cc-1897-4bd5-8ffc-5379a5694bbf" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="7f749a90-f2b4-4ba5-a462-1134bc909927" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="3a7ed01e-cac1-4326-965c-9e2180f0d716" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4a2bf45a-93aa-4091-9937-ba3ff46197a4" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="a8250a62-c74f-476c-a1b8-b4e228d1fc60" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="875d7141-dbec-42b8-a2a8-088a7f08732e" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="fa8c305e-999e-4579-a06d-2472cb216eb4" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="168d5b8a-ca85-4702-85d5-31b7096efa2b" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="741341bb-afcf-448a-8734-43d49c168113" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="3fc24fc8-4591-4e73-b306-12d19f408454" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="928fd46f-3ca7-4d8f-b1ec-d5cae1e5c62e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="188eafd6-56ea-48ec-826f-9bf78d3ce275" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="76c0253c-6c12-49c2-a3ef-b6f10e250da2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="ec4879a0-1ca8-425e-ab40-5f4fea78a144" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c9a3aeec-95f5-4e05-81dc-9cc6973c811d" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="1cdf4b22-c6da-407b-8b33-f9f391194436" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="566e62d2-31cb-4123-987b-674261dbcba1" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="1109a06b-f79f-414e-a025-f204c7de78f9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="30ecbc44-6f27-4e25-9c8a-b7f0207dae5d" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="7a725733-6804-4946-9f28-102920537d30" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="6c93c0dd-fa7a-4548-99bc-a6c922247723" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="01237038-9344-4f51-a230-0ae4ec0b9564" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="da28a847-263d-490f-9def-3a874378c3a2" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="ea536a22-be5a-4e9c-91c4-5a4898d3e1d8" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="4c36bdc9-d0a7-4a1a-b76d-11a7937ca05a" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="9235d00b-e17f-44ab-aa71-829513b7323e" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="b35fdea8-cd7e-4935-918d-43efe7c9d591" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="52281a46-4764-4170-aebb-46cc9d414ece" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="c8d1771a-ae19-46da-bace-779e7de4e13c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5addc141-2b84-4957-8c36-f4f30361af6e" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="3416ae34-01bc-4d4a-b9b0-7f4e42e8787d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c54dda24-5932-4515-be5e-c3413280e0c0" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="3903e80f-4fef-4a42-aebb-7d7ed94072cd" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d74ea21b-673c-46df-9cc6-fb8c4216bbd7" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="28df83bc-cd9c-4e05-8eae-c2f699d57e14" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="f63dcfcd-028b-4229-a3c2-91a66eefb694" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="39300ba9-0ecd-422d-aeb9-85f7acaf41f8" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="6f3b2383-926b-4d3d-90f3-55ca73394833" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="696212bc-1a88-4acb-95d9-088062aa4b0e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="4598a9e4-b7b9-40e2-b185-bbce42805772" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="897f96b5-24c9-41ed-8355-d12345fa3594" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="c68442c9-a18c-44f7-85da-7fb462e8f47f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="dee5d498-f048-4094-8bc1-6f492ea5001d" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="35816512-c74e-4f64-ad36-4bfb35b3d3ea" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e88c3bf6-4870-434d-8af3-6f188ca5a130" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="d61d0cbe-8dc7-4653-820f-1ee2449249da" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="f03699eb-1496-4da1-be26-174c674b8d92" data-file-name="components/dashboard/profile.tsx">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-unique-id="c9488cce-e50c-4c7c-bc01-f8fc761b4636" data-file-name="components/dashboard/profile.tsx">
          <div className="flex items-center" data-unique-id="b694ac43-fed2-49c9-8fae-e025d488fe4a" data-file-name="components/dashboard/profile.tsx">
            <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="10c355cc-d1f2-4cdc-9040-d13527552c51" data-file-name="components/dashboard/profile.tsx">
              <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
            </div>
            <div data-unique-id="be071744-9273-46a8-b80c-a110db174945" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="ba058bfa-ba5b-46f8-9252-c8955c67e7e6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="font-medium" data-unique-id="4794c151-16e3-49d8-94ec-5dd068725529" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
                {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
              </div>
              <p className="text-sm text-muted-foreground" data-unique-id="25062e8d-dd86-41ea-87c3-831ec36d9683" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="104f81b1-f8dc-4432-aeb4-d9c09c2902a3" data-file-name="components/dashboard/profile.tsx">
                @</span>{account.username}
              </p>
            </div>
          </div>
        
          <div className="flex items-center space-x-2 mt-3 sm:mt-0" data-unique-id="f26a605e-5067-45bf-9ec6-649d0daa6d24" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="7bf410e4-bbf8-46eb-a8b1-752fe6f8f3a7" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="eab0e22c-bdd8-408a-916a-b4f41767c48c" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="c586c2b9-ca9d-4a01-af5e-a2009227aefd" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
          </div>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="5091e9f4-9acd-4313-b7e9-e8f92cc93b03" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="25b66ca5-6689-46a7-87bf-475a3691ac6b" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="42526b38-d681-4379-826d-7ea8e21e1952" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="44aa8f59-3fed-4de9-8f2b-bb6656a19b27" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cd611871-04bb-436a-906a-86aec89cb67b" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="9018a8ae-95e8-4c0a-a439-48eb4ba6b24a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="c3e52b0d-f84b-45a6-9e7d-dc98e93eb66d" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="50d5ee4e-9ec7-4013-9c85-10935e0024e7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b26ad4e7-8fb4-4808-8def-47c0ffd4597e" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="2ca32c3e-9f7c-45a8-821d-8ffb132bb84e" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="b2d7b09d-bd26-442d-8864-a13cc25f48ce" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="012b0959-e522-4821-8ccc-fe60bb87eac3" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="0627d310-e646-4833-ab56-db61b618ec8f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="2e7966de-5d38-4078-9436-ad81de96a5e2" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="ea6d8e4c-23af-443e-971a-2ed94062eb6d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bdff3c89-6906-4b2d-88a3-47c4901f531d" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="eb076bbb-ec77-48cd-85f4-438203cb6481" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="34a5544c-27fe-4109-a0b9-ef304fa7545b" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="8d3429c8-3db6-465f-8115-d3c915c193a0" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2c43f552-5fed-48c0-8de4-6a84067eb2f6" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="27a6eb4e-229d-4e16-b6e7-15a633c9c9bf" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="b01c52e7-e1cd-49f7-81ab-854020187943" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="52dea004-b774-4d9a-ac4d-e6c400b8d45d" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="cee6a756-a50a-4b55-8d44-4ad43bbd52de" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4dd37124-ad70-4c6b-baa6-fcbf57db0485" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="16ea1706-430e-4383-a87f-e5c2200ea37b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b065fd80-f3bd-4efd-9658-c832bb095f57" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}