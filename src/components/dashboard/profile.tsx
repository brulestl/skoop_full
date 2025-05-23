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
  return <div data-unique-id="0373590d-88f7-4c8f-9818-91308fc0c15f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="9c15fb9e-c4ff-41d7-bc63-afd16ae97c7b" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="41c2c064-48e4-4d26-bc40-b8aa2f89c58c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="eaa251b0-0f52-466e-9651-f4da1355c399" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex space-x-2" data-unique-id="7b3a7448-5602-4494-955b-639bc3c3eee1" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="35f9dbf4-3945-4eeb-9006-c17d641c365b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="419d1ef9-f21e-48d1-90f7-7a8efbbaea76" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="1d81e406-329f-4192-9015-dfa9fa587312" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1582c679-b3fd-4564-84b6-2c8c012af208" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2" data-unique-id="719cdf8a-6da3-44ec-8193-ed21d91f8818" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9c0083cb-e8d0-433a-a6fd-3201fdbfc036" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="b5bfc72b-b1c4-47cb-8415-c2131b64a580" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="cce4a69d-45ce-4907-b6b1-123e70635353" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="6ae0487a-8d6a-4613-b3b8-5d386d6c1eb1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a5436f46-eb61-486c-beb5-2a7f324aef42" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="4d049c5c-bd55-4498-868b-43d183e3a92f" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="0e23d8b0-3dc0-402c-8ad8-576e4b7104fd" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="74862118-288c-4433-9e81-369db16a19f0" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="8456f065-105c-4e31-91f6-2fad63ed293c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e47aa916-91c3-4cb0-8239-3841c17a88ae" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="3b801312-2c84-417a-a362-ac46490d7029" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="f5d1f34c-1d68-47c0-95e6-5282b717b022" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="15f166f0-d839-4235-ab29-d700caed7b98" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="88034f1b-1e68-4eb8-96ea-53e2b68690c7" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="6db7ce80-1943-4957-8e06-8cf8011ac691" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="950bc86b-aecf-4f91-9bd3-690624dba980" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bb922f67-2499-460c-ba13-06b8e92d3144" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="33bb7c4a-770d-4e9c-9047-568352b47fe1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3720de45-9446-4563-9e71-b39da0685d72" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="a8e8b67e-6462-4a8b-9263-c7d33c156084" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="38d6cfd3-ac60-4857-91f9-d0c1749e363c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="42603eb8-249b-4020-9730-60781d4bae1a" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="f760ed9e-7d7f-45ed-9e5e-8471cfdc5abb" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="02da974c-33a5-4fc8-a240-148a96dcf546" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="960c40e7-e280-4001-8853-8956fb6d8835" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="a67f4042-f2b7-4dc8-be1b-40342d731e6c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a95fe443-db97-47f3-99db-2da207158414" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="c7bdb854-df3a-40a5-abf3-5ca704bc10a5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b78fa616-d687-4a50-84bd-9307591a9433" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="9c084444-4d97-4234-a231-dcc0f2379140" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d8949210-f4c8-4067-b05b-9bb2a8ecd9ad" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="9562be31-8b08-4ac2-82ba-2d30c3ee2d0d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
      return <span className="text-3xl font-bold" data-unique-id="211def98-8780-4488-86d0-83ef5356ce1d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8173672c-c3c1-448b-b25d-74ccf7f7cf9a" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="b2dbb43c-2fb7-4d5b-a821-6057e4e05e13" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="e559958b-b100-46c0-b4a3-51c7055c23db" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="fb42e7bc-92f1-473a-be53-8aadee0f005b" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="ad7283f8-3ae7-4505-9f46-a83fa8c23acc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="2b6bfce0-7811-4739-b077-1930a065b5c8" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="01f8d061-861f-49d6-abe0-74e629c6d8e9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="318f5c83-eb09-488b-b138-440c6594e298" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="8f33fa00-a371-40ce-9d16-c2a244b65b62" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="206f2ebc-d726-43c7-a96b-46c3ec2b5534" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="d1d9ddb9-33c5-4862-967e-1eba1e5ef9e7" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="0a557045-c2e3-4fb8-b040-48062534e3c9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c233502d-c99a-478c-96bf-7093f484d057" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="96afbfab-fa91-4f7c-9852-c7f1f7d0ab3f" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="a1572436-4158-4427-9294-e995322b6f89" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="090d74b5-a238-44bc-8447-be7231f86efe" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="97902f6d-e626-4928-a927-8d2c5814eeca" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="dd791056-d736-4508-8484-865854d2f9e4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fb81f1f0-6535-45aa-a4f7-f5d42961acf8" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="bf1c79f8-51a9-4989-91a0-ef495d8fcca1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="112d07e4-82fd-4a29-9c3a-474c9a31e537" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="f2daa6e7-b5bf-4460-b260-35f9b2b23b82" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8ef4bc46-fa79-4c1e-a27d-4dc5524a3eac" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="01ed79ec-33ae-44f6-820d-d9bb68de63e3" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="3b40afac-a230-4ef4-8184-cc46ce8ecbeb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="a08361f4-47c0-444e-9a63-c31a9437b54c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="8f714c3e-ab85-4432-a3c6-d89869cf44bc" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="474245f4-bb73-4d82-a7d7-b685ddae56f2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="6ef3b966-a2a9-45ca-9ee6-b2ebb17f50c6" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="52a6b9f9-f4be-4521-ad50-ed7324331b34" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="88497c75-b601-4d39-86c3-79ba59a64de9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="95e71f53-996f-4e95-b3e8-fe155b084ef7" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="b4f64c5f-9350-46d0-9fd0-e2fa0591b03b" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="4eeeb4ac-629a-4aef-94df-8c16adb43019" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="6c6340e7-a64a-4aad-ab4c-a582f6843db6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a9ab8692-e7bb-4a44-958c-e7e5a06df9a9" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="60f7c9db-7d3e-4e21-b00a-14a7dffcf88f" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="b326382d-4d82-43ff-9ec8-2629a8b8d6a1" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="cb6a1edb-1acd-4e02-83e3-0c17aafd40b1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="70031967-f71e-44e1-86cf-3a9ac5d3732b" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="ae9ccb34-5cb2-4c46-93c1-97239d096e4b" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="29ca22fd-653c-440d-998e-bf9cdbf16132" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="49dd3895-4456-44a5-9c32-45a6690acd76" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9be356ad-2bac-4987-8f93-aeb29795fa43" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="797f7eb0-a529-495b-9d03-8d27125732e1" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="51f6fc7b-36a6-426d-a819-3691d9af0eda" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="80eff95c-003f-42e2-a343-a5694064b840" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="798d3870-3a88-4236-ad37-67173e1d4048" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="1ae901c1-ed20-4388-91a4-34994b778ec2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="248471a6-2ad4-479e-a343-ec319a30984b" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="613abac6-f7ea-4c6f-97a3-a2c641ff3cf2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="4e963cc6-c23b-42c0-98a6-93a18a9d2b4e" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="4ad574a1-eadc-4dc0-9c8f-8648bd5bedc1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="8490df8e-f86c-492b-a513-7fb3c9a6a6c9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8bcd7f65-f151-45bf-90c6-53edb2272274" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="b7c95157-12b0-4804-a37b-7b00ef2a2594" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bcccffb5-c991-404c-95b4-d96900fd6a62" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="77a3a41f-9d34-418a-8ef1-1e3150698d31" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0c0165d6-6de1-43e0-8dda-76fe5451e6a9" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="61cbd4e5-8a33-4f75-ab4a-c47fbf14fda8" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="e87eac64-34b0-446a-9fb0-0ca98dbd736b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a09aa612-1993-4498-aadf-03ae34d064db" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="112e5263-449d-4255-bf18-4f2376a4256a" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="063a5730-9a60-43cd-bd52-29f0765a0016" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="db47a29b-e01b-400f-b820-b1a11f43db80" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="87dcfe3d-4e9c-4d0b-8df1-b9a3c7e3bb6a" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="4948b6f8-fd4c-47f9-9225-1ef603d1e4ae" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="24a48fe4-a296-4c7e-bf67-60e0be6e639b" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="f70d861c-1bd6-4ba3-aa1f-8d52ac00deff" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a010cc26-06cb-47a9-a337-80d84f5e291e" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="056d19ab-6622-4ad8-b3cd-cdbe13f12dea" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fef7d91e-ace7-4b46-ac6d-e4c274054057" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="a00be0d4-01ff-407e-844a-be4d1cd28a10" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="827efa59-273a-4d92-9fb3-20328da37ae1" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="7e99b73b-1d88-4114-b0dc-e8ce394fd60f" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="99500e03-cbe3-425e-8a7d-d337fa0b5036" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="a828370b-a98e-4a60-9c32-144e236cdf2d" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="72c71df6-2679-4e31-af9a-c82143669272" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="110648a3-acf9-4617-a08e-829b2acea178" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="590808d9-a9aa-4954-94af-eece36d31646" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="d41da06c-e0ca-4b5f-9b38-a875bfecd68f" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="4a2ec37b-6f38-4f98-8430-cd5fcf3a2e2a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="ba21ea9f-2c4c-47a1-8568-db4b996980f4" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="19e26347-f561-4348-85cc-e173c6c3654d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0a4ec1c7-e1bd-41bc-bf05-6df97a608f33" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="e39cd5cf-5d3c-48e3-b718-3f294a504806" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="f7aaa2b9-cd45-4b19-b3e6-03cb73067e1c" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="862d2c1e-abc1-4769-87f4-8c6de892001a" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="1f5d57e8-017b-46c8-8987-9abe5c525d14" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="d2c6f41a-a2af-4d5d-b571-0d00a22a567d" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="f362db34-341f-4422-bf69-cd595c9f38b4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="08801fde-3375-4731-ad7d-fe1828fa2dc6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="323b19a5-1cf2-4d4f-87dc-3bf52adf47f2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0e9bb840-8cec-4228-98a7-748355e05968" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="d588f9d3-593f-4260-9fac-65d70dca4a27" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="e3fffab8-c739-46de-8bdb-4351c9dfa7ed" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="2ba6efa6-6572-4624-93e7-ef63d46a02a5" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="3ab063a6-df66-4b01-bd2b-55f82b0210a9" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="825d9362-2746-499a-8d1f-b5501ed3052a" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="cd10e44c-557a-4b33-876c-c5fb35f5a881" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="3baa2f37-f240-48a7-af69-f280e993ef2e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="780d5e0b-1fd6-4523-9d0a-635fc4d078fd" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b17295e9-6152-4231-8a8c-92152a87029d" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="02b508f7-9507-4d71-9133-d7d6ce6f37f2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="917d2535-99c1-43e4-aa0e-891f1aa250f8" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="ecee6211-637b-45cc-bf39-4cc3cccf3724" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="05c8671f-4537-4c02-b313-fb104d21fc62" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="24447fea-5631-4a30-982f-6a8ce731b636" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="1a2b4e35-d531-4a38-992e-b91d8857c849" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b49e70f4-06bb-4261-a8ee-65096118d809" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="142f1cc8-0baa-47d7-a2ef-3e88cbbca214" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="9021d1a7-07a1-4f34-bebc-2ae59b0b7c91" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="84b2e796-d214-4ae4-832c-507b1d9f1122" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a7ace7ff-0577-42f8-bdfb-5fe930feb26c" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="8abeb4d9-de9b-4944-a949-47de1c694f20" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="8bd80042-09db-4ec0-8300-259b229240ff" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="ef9899a8-b279-4a77-8436-a645458750f5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e9c22265-3331-4e0d-8720-efde03d7285c" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="4fdb26e9-8f5d-470a-9e03-fd7be7064531" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="3154b332-e15d-4f2e-8cf1-abbde4b18542" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="8e36a73c-0be9-4a56-a57e-b5821d24f06e" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="6542e6b7-1b6a-483c-803b-0f37e010ea5d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1399eea6-03b8-442f-8a13-cd6101426f7e" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="99cd67dc-00be-4532-94c0-bb21e9fe0374" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="338b9a14-d5a3-4b16-80fb-e790606c504b" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}