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
  return <div data-unique-id="4d3719d5-43d9-419c-a778-0201175e43cc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="0d8b337c-4b92-491e-b29a-c92626e86aee" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="56b6d51c-9752-4c9c-aecc-d5394a2dc4fc" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1fce289b-8aa0-4261-b4b4-c9a9d0031331" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex space-x-2" data-unique-id="cc090560-b95b-4bc6-b86c-c9782ac7b714" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="a3df543d-94df-461a-9922-a646a59fb4e3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7e264314-6889-41e9-b776-7d1a65642ff5" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="e634f48d-5650-4fee-b7e5-11b6a5ad354c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b6065ea3-31b6-4164-8414-bbbb22a97f82" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2" data-unique-id="e1361444-a74e-4cde-89d4-44695cd0d1c1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4b405ce0-e046-4e73-a76b-dcd7024cba76" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="179d603f-eb8e-4126-ba5c-927fb77675d2" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="783ee114-be5d-4e8b-95ce-1de564d4d894" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="345e18f1-b266-4f57-8856-3499117c394c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a6bda1ed-1035-491b-bf3a-b186a4a4c2a7" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="dc346fcc-de9d-4766-83e7-68b282c14dab" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="ce1a87b2-64fb-4822-a2a5-a66f8424614a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="60e3cca4-26e5-4747-93ef-cc4dffed2956" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="6133b371-4cf9-4d5d-8a78-9c5255920e04" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4c3f31d9-faf0-4afd-8187-fea992fd6ae8" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="25dbc722-27fa-4e58-ac3d-e0012218a586" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="d0b0b489-9e58-4e36-924b-b2f663071b76" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4b4c0361-8169-4461-8b9a-4c648d558e80" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="dd99c1a7-fde5-4e09-a5fe-3d90c137bb51" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="ddcdc6c6-95a2-49e4-98d8-f77038243d74" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="6705d020-7896-45de-80b9-6d0db0e51eb3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="636ec530-da40-449e-8b01-95fc93b56753" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="3a3beae3-f012-456d-ab18-2f159b627478" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="61de6dd8-72fa-4efd-b28f-940e9e23f580" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="0c238a94-0a51-4d4f-9203-0c738c245627" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="3237267c-119f-4c7c-8243-088979e37aae" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="73179cbe-d9af-40e8-b838-c0a88915d3a4" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="2b73efe4-f2bc-45ef-808b-1c392559d50b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f6e8f473-876a-47a8-83e8-06271e305381" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="73a12af4-2691-4a25-a604-0df5abfb77f3" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="0aa41ac7-4739-4556-be54-60f115b38368" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b9588969-9b99-40b8-a107-fd1f758f359d" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="9b0f28c7-e796-474c-bad8-6f26f683554c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="51aabd29-753d-4531-ba39-383514626f50" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="360b0c65-d046-4e9f-88eb-218b28836bfc" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2cba118a-30a4-41f3-a2b9-e5d00c878f95" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="67586a6c-5d7c-4034-8608-c186d2ee43ad" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
      return <span className="text-3xl font-bold" data-unique-id="f3c8c998-a669-41b3-b464-ca31ec5c3a2c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="440cc3e4-c980-4448-bcf5-72330e84c1f6" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="308b3cf9-bc07-4af9-a731-988a2d33b1f2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="453b35a7-88c0-4c60-923e-4ebd31ef21f1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="1cc08c4e-8472-4895-989b-f9fae2605d45" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="978a591e-3f72-4ba0-ba3a-1408d6c69a87" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="3a051426-6f76-4586-a08d-d136006ac48f" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="70bb5183-9c80-4fec-bf13-8690421f20c8" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="af8fddb9-c870-4311-a9f9-e438aac93c96" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="c5f48b67-e3c4-461a-a17e-4cafc22c56b0" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="6db9a827-473e-48ca-8deb-86b03a531418" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="d1aeeae1-7722-4c6c-b9db-b523b20d5c35" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="9084476f-d4c8-4538-812a-94551e476dbd" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e77e4110-20a1-4c08-8bdb-396941aa223f" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="df6129e5-a466-4191-a30b-e2e39181bcd7" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="4ece1fed-222a-4773-8d65-a95e9c667a96" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="a98ce9d4-a0e6-4749-b876-88de5e962195" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6be844fa-6ca7-467d-8529-a8946d6fc57a" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="b2ba8971-fa96-4148-a511-42980fb73ea5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8aba6322-24b9-4bfa-9f90-3573bf7e0cce" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="f74f6702-01f5-4e95-96d8-8a2a07ed95e3" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="5df80b95-a46d-44d6-aec0-1b847c5a7b83" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="6312b925-4be1-47c3-922a-ca81914fa65e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cba3fe7f-ad55-4187-9720-646a499ee608" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="5b5b4409-9ca7-4791-8b45-7b312ca41a89" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="a78a2002-29f2-47fa-9867-8e21a345a5f8" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="97bc6580-cddd-4998-9300-acf129e5bf1b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="6ecf8dd0-cb94-431b-994b-ffe7b9118348" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="6cda1658-cc10-464b-9a97-bfe8fbbd8c5f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="698395f6-7985-42f4-8db7-26447915143a" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="e4611ced-bc53-49b3-83e6-f99002ffdfa9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="5ed8f356-c1df-422e-a7ca-57ef78097ea2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="95970a3b-5804-42dc-a08f-476885e8ccbd" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="a054b173-dcc0-4c2c-89b6-2fb04c32bd22" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="4ca8219e-330d-4275-b1d0-63af6f61f7b8" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="dd308118-ea8c-4e85-a29b-c1620d843d82" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d459fc27-30e2-466a-8895-073e421c0054" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="b9b23676-30cb-4621-92ef-133f3f565db7" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="8850d36c-dd9b-4da1-8283-49985afb1bf9" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="c6f39799-7d5f-4efb-88c5-0a8484eb66d5" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="9aea55dc-7a7d-4ff3-8e6a-71dedd733ddb" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="a5bfd5fb-2d47-429f-a1f0-b7625fe3c351" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="52404acf-c436-4253-9156-c820195aa893" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="9aa46ea1-5dc5-4a94-8f04-97cdf3dabfd1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1406c9d0-6c58-4873-895c-b3ad9ec2624b" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="c60f8e28-04f4-4cfc-ba13-0908ea51c304" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="615a5367-c63d-4645-a45c-4ce255587320" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="3c8a6c2e-4ae7-4d26-a4e0-026d42cfec84" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="b73e9c08-d10e-4ce5-94d8-0050f172fa3f" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="e34193b6-585e-42e0-bfb3-b76cbc3630ab" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="b90c885f-9bdd-4d38-b8e3-bdc02c091ec4" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="163cbc3c-4a0b-482f-b469-f18cc3a2b7a4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="42b58510-7151-4a4f-bef2-85c38b866aae" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="10f2acf8-899e-48f4-93f8-302728aafc70" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="d2241ce9-3b99-4db8-b90e-e446713e249f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="226ff9aa-3fec-489e-826f-5c718467f0ef" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="b0a72caf-7bb8-4e03-be42-927cdf116158" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="14afab8e-2590-4f05-a0ea-76e8d46474a0" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="f878f629-038c-4e27-b852-327c0cb1e37e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f3d33882-f1ab-44bf-b214-a755eecb0abc" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="a8ac0f78-2b55-49ee-9271-55eb1b400674" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="48260ba7-a75e-4ba7-8aa2-fdaf7af8bb58" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="272156f7-86c8-4cc2-ba15-98141c8cb7fc" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="07c34e2a-a3db-4238-aca3-26bc35ec0c04" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="7e8ebf43-107f-40ca-8c9f-0f09a8ddaed2" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="17a8755e-006b-4a90-a855-6503a7ebfc8d" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="cfc3259c-5c57-4fff-abc9-c24443331067" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="bc076f63-6556-4ac9-a3e9-7d21309d1444" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2f08f43c-33b5-4e04-84a9-a2bb95866d6c" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="803bab7a-cc08-40da-b2c5-c254e197ce86" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="de0d2d45-0061-4df9-b5b4-96c7c4dc4341" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="26a4b716-cd56-46c9-811f-50e4ba55dcd5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="711eeaa5-6521-4bf5-8aa0-a122f94323c2" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="2f53a2d2-a2a7-464f-a0ff-d15ee0d5d63c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1ef4975a-50e7-4ddd-8318-44f27cda047c" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="c0ea1fb2-6642-4815-9f42-ccbc8f2da253" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="b6574342-b61a-4ae9-b784-96ceb67c3278" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="ddf75f22-0ab4-4e97-bab2-468fe90f5302" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="27006f66-1d51-4548-9c0d-67a983ee9451" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="e9892769-6e8b-484d-ab2e-5a1352a42e2a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="e98b95e4-18d1-4572-87f5-de49de7a8537" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="527b9c95-99c9-4419-ac1a-0985fba1cf7d" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="bdc31ba8-6f0c-4436-b4d4-372fbf405a9e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="1b0cf2c0-3b72-45f2-b6fc-930a827aaca5" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="b750e9c8-1c52-452b-9f55-c45d59e3de71" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="73724411-168c-455e-b259-57f2359ebf44" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="72e53600-0d3c-4d09-b98c-037f4b96a20f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="1e9a4f64-a596-4542-848a-1c3ebd02c6d6" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="fb4ea622-371f-4fcf-801a-9476ec511478" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="ed56f832-4b19-43ba-8b0b-06e2960476fe" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="5e9741bf-14f2-452e-80d9-70da2501c868" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="cca0ac49-c18e-404e-88ee-8b4f2a456ae5" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="dec3fc00-5e1b-4ca5-bd0c-ec9a2aefae3f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="c93438ec-372c-4976-8e02-3d4d9908480b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9a8549c5-9fbb-4f54-820a-7471d64b28f6" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="ff5e0b4d-ac58-45d6-90e2-46803e191762" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="14dc1d8a-1726-4ea0-ba3b-2d895328b7a6" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="51b614b8-cce0-4e17-8670-ab052ac9a07b" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="b7081d07-6596-42ad-88eb-79121634d921" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="b46aee37-e207-49c5-9d0e-97bfc0de57a4" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="d1cee23c-591b-4681-b876-d113111ff356" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="e34f6c33-bcae-4097-bdd8-078412dbd087" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="21cdb37c-0b77-4553-af14-719898710155" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a62a7b55-fe62-4010-94e4-d6a1c16ffdd3" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="08358a6f-8dd0-424e-827c-14010c14f00c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="e0101058-023d-4a66-be24-f21b755a88ba" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="c7b31fe4-6904-43c6-ba9b-3ad3b8429792" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f20874d9-978f-441e-ada3-90b58706d5f8" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="93ef6dfa-82b1-4511-a2f2-013a6bf78427" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="1db597df-eab1-454d-b274-083d60481843" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="96352ef3-a735-4701-a681-64804d732704" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="c2423b3a-2747-463e-9056-02d7ad24a3de" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="efde7940-2081-4a0b-b2f4-94e922a6c893" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="91624c58-b7f5-4389-a998-6373395cc6d0" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="be8ed6e6-10fb-4367-b852-5b4b7353920e" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="1360091d-271f-4256-9885-9a677dc53b9d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="a155118e-1568-459d-ba24-01145ed6bbcf" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="1d1ff346-fd83-4466-98fb-189e68521695" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ac26e4e0-406d-4d1c-8f58-a8025e56129f" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="cc151fb8-6d34-47fb-a366-95d686904f32" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="3ec78143-0e82-445d-b779-dd12233f19f9" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="f7a6b8e3-3986-4a12-9b39-c3e6ac791f00" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="774ebe5e-4c9e-451a-b9d9-a6fa9e6400d6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3008dbe5-9fb4-4b79-b70f-e14e3b614eee" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="5d12ec17-29a3-4582-9eb5-b13d5114783a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="aebfe5e5-a147-488c-be54-e8ddd2d1aebd" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}