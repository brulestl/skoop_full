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
  return <div data-unique-id="19aaa6f3-8024-4261-995b-2bb3cdd0423a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex items-center justify-between mb-6" data-unique-id="a0e73411-ee82-4446-9541-ed54c4cb9878" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="c7626f57-dfef-4ae7-a597-b437e8fcd97a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="f61a3126-82e3-4c3f-a69f-675616fa170e" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex space-x-2" data-unique-id="9e8a97a2-0a49-4fd5-a2ed-c7fc313a3d0a" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="08f78b73-45a2-4d9e-bfb5-3fa6ae7894cf" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="22e61f9d-023f-4977-a55a-b99498c41c08" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="f328e256-ba3c-4f43-8a20-7ca4a9b859e9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="60032ba9-0138-4419-89a3-ee3736a315fb" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2" data-unique-id="228172e7-c2a7-4cb5-9573-7b2880a64cf2" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="18b5a0cd-56d0-4848-9cae-0fa193e5148b" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="511f13c2-a0f5-4d7b-a265-11064c89b53a" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="0fece0f2-ac3a-4f5f-8bd7-7575f57fb98a" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="93156e71-5824-4d60-86d5-7336674b23d7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c5fd315c-5446-47c4-b5cf-4eacf3849ebd" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="f093bf93-c489-4876-aaea-c3bf362af80a" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="c0e23ab0-c998-4ddd-ab8d-5c69b58a2f92" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6c8cab0b-4b85-4a70-ac19-01311cb32eb8" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="94106853-9f70-45dc-9c04-6acfcbbc022f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="14401fee-9d8f-40c5-8ab5-0fba4619f4ce" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="28a970c3-bc0e-4bac-a158-ffd329c49b96" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="b223c1e6-5a9a-429a-be61-50cdaf52021b" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1eff22d3-0633-4298-890e-54da37064921" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="19c46966-6222-4f61-a302-6527d15e42cc" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="e754d0cb-b479-47fa-8bdc-838f714540df" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="e15b77ac-72db-4e4c-8633-415154d495a4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="54f9f0fd-8143-405c-91f3-90deb14eb30b" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="c96486e5-d9bf-47fd-a298-be8e2c8c9bd9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d00998ba-05ac-46f4-8a51-3d5311cae7d6" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="ffdc7552-d628-42c5-925b-f86bc205e6c5" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="bf6493d0-54ef-4b70-a6d5-1d8da57b478d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="eeb4ae45-8e86-4c39-bd48-b225f27e90d4" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="e00167dc-bd9d-4350-9231-38103b831859" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7f353660-b156-4c47-992a-d4dfcb175660" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="ff12ab89-3c09-48d1-8ea4-caf654716471" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="e0589e61-01dd-4a60-b093-385b093e3353" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fc9496db-1142-4e7b-95eb-3f00c13833e5" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="5999f0e9-d4c4-42f5-8e22-531b1d6a800e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fcb3ebae-b00a-44e0-9e80-ab3e8964eb5e" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="448faee8-5c51-47e3-bfba-f4bb4b60f802" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6f4737ba-df52-4183-836d-4ab758f88dfd" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="a96e3404-6aad-4d59-b56c-7a08b07b84ae" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
      return <span className="text-3xl font-bold" data-unique-id="3c5541d1-e36f-49aa-b40f-f1788461b897" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fee19244-c7a9-40a2-8440-89b9b1f2ec00" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="4bf7029b-f7bc-4129-85c2-d4c6740e3465" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="bc3483eb-516f-4c43-8c88-893ad9bae59d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="6097238a-926b-4802-9ae8-5f07b1c7f027" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="65ad6cc8-d23a-4f8c-9548-f24b716d1e6b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="be50b76f-676f-467b-a9ad-fbcc0399591f" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="ebda9bc2-9efd-4eea-ae44-df4f2339cebe" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="174a81a5-c52c-4b2f-9c65-9abe0dd66bed" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="0573cbf0-2680-438d-814c-9b9d930c6c21" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="682ee0aa-6574-4873-9f72-3c0a6abeabd9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="94fe34be-8ca9-4b93-8049-1c123abab9d7" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="9c0916ee-6dbb-4112-818a-54c23ea5cff8" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="903f85e1-f750-4526-b1e6-b14440cb2fcb" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="64cd1888-9de1-4946-9b9d-7a8da5700c77" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="c2ddab05-bf27-47b0-ae4e-efd238060179" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="e6dcae56-2f5d-42a1-a4a5-46b3db155420" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="068e32e4-6a13-4687-bed6-80225784f778" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="9407810a-5992-4603-9473-3e4d11f71b4d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="86137663-e2bc-4346-b738-08d6aa790776" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="472fc0a7-38e0-4b33-a1c5-a6a8d884e308" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="fb0e89db-975d-48b8-9d9c-810a212e134a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="789c8ee2-776d-4996-85c7-f2e12bb37924" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e250fea4-2076-4e13-944f-a597930fd820" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="1809adb7-2ba2-4a85-9499-0de029c815cc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="9eb34ef7-bb07-4a3f-9a78-09e628fddb0c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="fe77bfb4-2590-4b30-b438-60850a10c27b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="181eb7a6-71d9-4856-b56a-c61f810a099a" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="fe5e9391-2886-41c3-a5b0-dbbd8979276d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="865258e2-1743-496f-aa2a-e95fe5fd6c18" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="93c0dd9a-8f5d-48ee-b2c3-8d361dd9877c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="51a9ce14-fe2e-4274-a61b-9456a1089b16" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="7943bb69-e1e1-4fba-b61a-149b2862e7d4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="63261a25-6b6c-44ce-9186-0567ddc532fc" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="2fedfd0a-6cc7-4fdd-b1b2-fd578f41bd38" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="d797f6a3-58e6-408d-b837-34499678f61a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="94721cf5-5245-4544-bba7-3bf66c044203" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="e5e995ac-1742-48c9-bf55-abfc0968d8dc" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="085e9d8d-dac0-4a04-a92e-21920f92865e" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="3e674270-0985-4521-865c-3956f9988a96" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="697a4b71-7e9d-4e2f-8ae1-2da700d8ef94" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="8808dbb9-818d-469c-a2f9-d00460446268" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="d54a6c52-e4ee-49ab-a8e1-f527740ec343" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="7741e3ff-b0e4-47f7-ba52-37e509cb5585" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d0349312-bc05-4ef3-9200-4bdfa893883a" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="7af5b44a-5f44-41ef-8043-1936aa12db76" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="b7f1a5c2-a367-4536-8301-9fbf169a7c09" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="8aeb6ef2-a259-4503-ad93-861e6069b1d7" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="d0d7bf7c-6644-4b96-b91a-db9b0abca6ae" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="bbcc613c-4dbf-4d68-996f-1a92b25dfbea" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="f521d3db-0e20-4857-a4fe-6889e27fc55a" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="ae5affec-8bc6-4e4f-ada5-df202e4dea17" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="72e31061-df84-47cc-9fa0-a225aebee487" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="333e56ed-3c30-41e9-bc4d-495ef1126c29" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="804d922b-cc8d-45fc-b654-5fe58343b2e9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="23f4559f-7abf-4997-bf0f-723b383ac420" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="0aa4da38-3775-4b89-8f2e-5afc078695a4" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="de668e8d-e9d3-44aa-afc2-131b167aa461" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="6ac55c02-156d-4016-939e-be30c07eb2bd" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d331e4ec-8774-4cb7-93d6-86a77d8cf32e" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="b8f71493-2133-4c40-97e2-58a8fff77342" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="037ea276-e028-4915-bc22-bf2bc0bac0ab" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="436ad275-5a90-47ba-8078-a173bb8d0b5f" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="0acf8bed-bb9a-45cd-a105-b7ed6d10bf70" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="364049d7-e663-441c-94cf-e134db49ac36" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="698a0902-54c1-47c8-83b8-306776672b2c" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="4de02756-2c5a-49c5-8b5f-c2f8a7c25625" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="6af65a17-c694-4222-8a24-0cf447e9dade" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ccbe0e72-2340-4b6c-b6af-08e18e8dd7e5" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="c0424123-6ae9-4f90-abca-d124fab7e2ef" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d5944367-89d8-474c-a15a-255e8006a9c4" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="be0459af-ad0b-47de-9b54-7986abff8ed1" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e0807d78-58ee-4718-b8a7-bfcf3c9a4765" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="bb4f364f-c077-4764-82d4-c0275757144c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c9908d06-18e7-4b7e-a3e0-1b84d2888b32" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="9ed54b18-47cb-4127-beaa-17df4fc09fc3" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="18f4b5e3-1deb-4a5b-b20f-f3affe7a4b50" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="b84f1739-88b7-4075-836a-0e6df7cbc68e" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="2f873622-0464-4b4a-9471-3f6db7d3cdf4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="fe4dbedd-2db1-4250-ab98-657506348fec" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="0acea315-bfe6-48a1-84ed-2507959e4b59" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="a0ff9440-d85a-43e6-a300-c4e62bb21d74" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="56c8cbb2-e767-4989-8f88-72b98cca6e59" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="1eb16d6a-b5ac-41fa-93a4-1e04a25e4ce6" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="3f4dcebb-bf21-4943-92cc-d2c70660b63f" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6d4a14ca-e53c-4628-9779-8f9a3e26b1c3" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="c6a723a9-9322-484d-8d8b-6f0081efdb1a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="c8583a26-9b4b-4855-af0f-7519ecf4158e" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="a4f45bd6-fab4-471b-8f68-e643a013587c" data-file-name="components/dashboard/profile.tsx">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="66d7d3fa-6c32-4d7c-bfc0-a59cbf7a4789" data-file-name="components/dashboard/profile.tsx">
            <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
          </div>
          <div data-unique-id="59108059-e3d4-4892-b808-b1665d7200ce" data-file-name="components/dashboard/profile.tsx">
            <div className="flex items-center" data-unique-id="1576b48a-a50b-40c8-b263-8335469e2a24" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <h3 className="font-medium" data-unique-id="a6d45a27-c8d5-494a-8a04-fdf4282ea83a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
              {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            </div>
            <p className="text-sm text-muted-foreground" data-unique-id="9b97bd4f-ce22-4d36-a572-0c334c44fdaa" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b138ea23-e2b4-44f7-842d-3b4e0687e014" data-file-name="components/dashboard/profile.tsx">
              @</span>{account.username}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2" data-unique-id="ec8b11db-05ae-4293-ab0f-69d500783e99" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="171086c9-063c-45f1-9f3a-ca9bb20aa750" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="d8a9fff7-d42b-4375-9967-fbecbd3086dc" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="8afba8f9-5e86-4608-b933-7cd535149594" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="9406726e-2d31-496f-bc05-1150ada568f8" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="11a00def-b3a7-4d48-81c5-e077e03579a1" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="12267ef1-da7c-404b-87c0-e5133f77aebd" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="92b2797f-2660-40aa-a5a3-583131416f05" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="dd09a189-d6df-4baa-9f56-ef7122797923" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="732aedc2-f73a-4465-9b6f-afa864403a57" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="33c94c3c-5540-4d15-bc94-077508a9b8e8" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="8412e4c8-4c45-45bf-92c3-80526c507b53" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="fbb1eaeb-3275-46ee-b2e1-cb719c82c1a5" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="400ae467-f735-4a99-b148-1ee2955a4c2d" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="68453b2e-bbef-42f9-9f02-1a6a7bbee406" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1ea70106-da33-4278-bb16-58360600e743" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="f89cb60e-ef4d-4a49-8320-507309fea801" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="d6ac4819-88d9-4e8d-bcaf-3d2f090c12a1" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="fcd5a2ee-6b7e-466b-b5ac-a94c6c65ca77" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="38c5feda-27a0-4672-9ca4-3cc4fb16e037" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="18667a96-8d1b-4d2b-a760-37bcb3a4412c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="dc69bc7a-f0e2-48b9-bcd8-5eeb51ccd671" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="369c60c7-1a0f-4471-b445-007a67c6f635" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e9d7e6ef-4e4b-40ae-af62-9f9a6a557c9f" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="586b8771-a8fb-492a-8d33-8a99c4b0a551" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="b19c7f92-5c0b-41e2-be31-7daa45134feb" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="c7126180-be78-49a2-8da2-cabac2e72cef" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="8e43930c-1c75-4d8c-995e-b6f9479ab94d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1c2c733c-0a4a-40d3-bd27-f3bb577093aa" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="e7cce428-8e63-4597-8c82-335602f8fa32" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="c8f84b74-0591-4613-9f1d-7aebdd0a4d72" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}