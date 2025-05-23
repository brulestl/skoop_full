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
  return <div data-unique-id="b48ac2e7-ff6b-432e-b9b4-4e22ef2948bb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6" data-unique-id="5919cf37-187e-4e38-bc61-7b6d49c0bbcf" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="cf822323-cd27-4adf-851e-78534a916ea3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d06791a3-0790-4bef-9a61-5f6115f55f38" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex space-x-2" data-unique-id="1fcd90c9-89df-4dd4-80d3-8260ab5fca3e" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="ff90ced8-4f20-48d0-86cf-a9fff30fb245" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="0be06f72-6c8e-41f9-a140-fb949d13904f" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="8199bd73-e472-4446-a8a0-74214cce1479" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="e496067d-625e-4d52-8a57-33926e4cd347" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
          <Button className="skoop-button-primary ml-2" data-unique-id="59e00a01-84c3-4004-91ed-6022f977dd5a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4b9bf429-58c1-415a-b676-a75796bbf149" data-file-name="components/dashboard/profile.tsx">Connect Account</span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="6be10113-2d6b-46da-97d5-6bba83d96fda" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="a61229d8-58be-4e3e-85c9-ecb8cedecadd" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="f6ddae1c-40ae-4538-b8b7-c543db5162a7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="44265c63-b71b-41a8-b78c-e06364d85db8" data-file-name="components/dashboard/profile.tsx">
            JD
          </span></div>
          <div data-unique-id="f6a1b7b2-c026-45f8-96ca-cd22108d895f" data-file-name="components/dashboard/profile.tsx">
            <h2 className="text-xl font-semibold" data-unique-id="8b07ce2f-08da-41cd-8e6c-65fa3bb85212" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="14404a34-4764-44a8-ae2c-6cdbd07e37da" data-file-name="components/dashboard/profile.tsx">John Doe</span></h2>
            <p className="text-muted-foreground" data-unique-id="ff511f6f-d21d-4c3c-a2b1-7fcec4c90d29" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="49a77a86-f05a-48e0-8b1d-4f705485e357" data-file-name="components/dashboard/profile.tsx">john.doe@example.com</span></p>
            <div className="mt-2 text-sm" data-unique-id="f03db130-a080-40e1-8488-25972b183ef2" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="2cce6f2b-3ab9-4b71-89d0-5b51d094668c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a6e80244-9733-42f6-ae34-86ed708bd8ce" data-file-name="components/dashboard/profile.tsx">
                Pro Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="b6f2171c-d7cd-42a9-9344-10867ac8f337" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="1a4eac1f-cc13-4979-b73a-cb6f2e4ecb8a" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="bb7c72bd-6eb1-4486-a61f-503ccb49a430" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7263cd70-940f-4e4c-b200-359b3c22ad91" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="a3f3a506-6113-4bb9-be89-e100106202f7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6e4e0198-3fb0-408f-8c5f-4ca0d79e70b8" data-file-name="components/dashboard/profile.tsx">299</span></div>
          </div>
          <div data-unique-id="461431e4-6436-4a4d-8322-c9758440ef63" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="7fef5de4-1c96-4cb9-bc19-e680365aa1ed" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d40b3bf7-39f1-45af-81ef-dfa605d447ae" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="f7d19636-6e01-40dc-9cae-8091b65de8e7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="bed939e9-61c1-4b15-ab02-74af95c92c8c" data-file-name="components/dashboard/profile.tsx">15</span></div>
          </div>
          <div data-unique-id="98eda85d-3a84-42b5-b71b-a8b990cd2764" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="93cc2a35-9dc8-4008-898a-b38727de4b93" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8bc0ac96-607c-4d28-8c2b-49548af8e9f3" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="11f17b7c-f079-499f-b53f-369801f54200" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="733cd7c1-8e6e-4a8d-a4ca-4ef03e04d2b3" data-file-name="components/dashboard/profile.tsx">March, 2023</span></div>
          </div>
        </div>
      </div>

          <h2 className="text-lg font-medium mb-4" data-unique-id="e1b45263-5557-4abe-9e17-c5559c4d2198" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ee3886eb-c940-4360-b1cd-8d7ea3030727" data-file-name="components/dashboard/profile.tsx">Connected Accounts</span></h2>
          <div className="space-y-4" data-unique-id="1740202d-6dac-454c-9c61-06e004d857b6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
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
      return <span className="text-3xl font-bold" data-unique-id="3a533556-12da-4575-ad9f-b496ec23922e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="018133de-13ca-4ec5-9f52-9ce51e32eeac" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="59944b69-57ff-4173-996a-b86c125e48eb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="6943a3d2-f585-49eb-b4a7-3c9dce3bf894" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b9323441-1349-4548-915d-b88da257b6e4" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="8000c01a-041d-4147-893b-5e38e87483c1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="eda7c841-3066-40e8-8834-14d0fab360ca" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="96497b10-ede9-4e74-ae50-402a1ba126e2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e0b1c1de-c27d-40db-9c78-cad691a54f42" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="4b8ba6e6-2a4b-4e3e-b2f7-0110a1d429f6" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="732b0505-3bcc-45ad-8846-8b7b4902f81b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="45a14dab-9b01-487b-8aeb-1cac1cb2f96d" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="fa0aa959-9885-4d71-8b03-8443603e2c8c" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="aba4ec07-00c5-417d-a8bc-a17523764f0d" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="2e39faf3-116a-49d5-a560-4653a7424925" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="91804e77-1812-4861-b5c6-8afefd7283a2" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="d7f671ec-044e-43b9-9047-890c8f836418" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d807aa4a-48fd-48c1-b469-647df53e4406" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="55d7aea3-7c55-4b25-9ec9-90d912bdb360" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="ac3af1bc-a569-4bc7-96bb-9158920184ce" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="be4e9206-7c9d-4d4c-94f6-2888ed2b3898" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="522bb202-5adf-41f1-9e82-46ae0cedacdb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="63d7ea97-cbdb-4bcb-9b88-4c2bd1b70746" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8902a17d-ddf4-4826-b274-0501473774f5" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="d98362e0-e82f-4809-a146-95a3fa47073f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="8611a729-746b-4331-b07e-619348aee81b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="08464d73-5849-4527-a27f-13aa6b41f7b7" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="d8bf17c9-d49c-41c9-9995-2e958690ba5e" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="609086c0-ec97-424b-b122-28aa015e952b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="419ec691-cbf3-4abd-a3c2-8bb3291ba5ea" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="b335e9af-f552-4b54-81bb-79a45d651bef" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="bec15aba-597e-4e00-83e4-9dcaf2f24430" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="7a74092d-61b8-4450-a842-2497c0b05831" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="bc8722a2-ffd8-4b7c-ba42-85d1cff416fc" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="13882616-d445-4ec9-a2c0-dfa303089328" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="b90ea6fd-5ca7-4bb2-9cb6-b46adc749573" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1d2357c9-fdf0-44d5-91ea-917500387967" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="47684d0f-478c-474e-b246-2dc747a601ec" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="e5b23708-0db1-4b8b-ab67-e82d72ab74a5" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="41344f76-76f1-4b95-ba03-fd1b66807551" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="db6a045b-7c18-45bc-9d6c-966550fc2c95" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="fa5cfa0b-d163-4841-9bb4-582df7387681" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="30d82964-3aea-4257-9626-16352c88272f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="627b0c6c-043c-4817-978b-16e7f53057c7" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2e242e5e-1364-4135-a515-58fce916cc0b" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="483ac724-56ad-423f-b559-d315c725eb0c" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="d1cf4acb-5af1-4377-a461-15975fe157e3" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="20fadb31-791b-4c02-84a2-c04424e1dbed" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="33f173e2-45d0-4af7-a426-d3da433d4966" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="860fa83d-a13e-4f08-9a1c-d53ca52c60fe" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="564ced4c-6abf-496c-a5fb-47f83a5f0350" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="ed36287c-d317-4c81-af02-9b5885159b42" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8cb309dc-dfba-4edd-ace2-7ca8903acf49" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="318d2a74-8342-452a-b77f-7b1fb8e99cf9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="bdf73fc2-d6cc-4c15-92b6-5a0139569e1a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c2d5e396-0002-4825-9978-7eb8275bfa32" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="1c703371-4330-4c48-9d91-d3c23cafe74a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="b05a5c9b-198b-4748-a32b-40d01339bd5e" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="632622a0-83db-42e9-b225-d46f196f3be3" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="55299307-c643-4fc6-8988-73316d85bc93" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="7f984fbe-5484-4ef1-8dfc-58edab77e6c4" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="f7c98bb9-3cbb-485f-9748-49b756aea824" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="616e4ab7-a270-4bec-89f8-09ba1fa0e6c0" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="2c9fd290-6e83-4d70-9826-b07753707b60" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="6fed816a-c50b-48ca-9258-96c9464959ea" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="d53c4164-216b-465c-ba98-9726622b9abd" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="452b705d-da05-44fc-a8e5-2cfc8715d115" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="9822b6be-9927-4cb6-8812-15a43d44add5" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="99751241-d610-4b2c-8f44-7409bc82aed4" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="5bb08e77-807d-4511-8dbf-28cfa5ef40d9" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c7ce560e-6c86-4166-b050-6324260884b7" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="797ab511-3cbf-4aff-857d-53abf1986c70" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2cf8d1ef-0bef-4b85-b623-1ad6d27aa8c2" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="610b5a33-361c-4311-bd17-985c0bdeebf6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="acbe9e21-0a9e-46db-8261-187148e40e59" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="b7d2e556-0d7f-48f0-9504-053623571a96" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="bbf140c3-25fa-4667-a6db-3543e3764bbc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="345f3f5c-bece-4b2b-b3a1-194af0b0ed83" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="9350a995-6aaf-4c19-8379-9814e6ef64d6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="7d90311b-e135-432a-9f9a-fad2beb2ce32" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="7ff47b46-1710-4e6c-88ab-56fb600a0e3d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="a144e3a6-9591-4bc2-8f28-ccfd6742850e" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="977c10b1-cc8b-4b33-af54-53299ebba186" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="89d12f97-957b-4736-a266-098d1d03fb35" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="7aa3512f-91a4-4e3d-9331-88007ff23f22" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a3ebe780-d9d7-4a38-b086-25a5efca9edb" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
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
  }} data-unique-id="7492c81e-dee5-4ff8-a5da-130e39827f79" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="p-4 flex justify-between items-center" data-unique-id="77659ffc-bda0-424c-a152-cfc5af0b4166" data-file-name="components/dashboard/profile.tsx">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-unique-id="21c57062-6825-4096-80be-ce465d76f39e" data-file-name="components/dashboard/profile.tsx">
          <div className="flex items-center" data-unique-id="bb815750-489f-4949-b718-572ea9b23606" data-file-name="components/dashboard/profile.tsx">
            <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mr-3", account.status === "connected" ? "bg-primary/10" : "bg-destructive/10")} data-unique-id="fb767af8-7cb5-470d-baf5-db523bbe2c98" data-file-name="components/dashboard/profile.tsx">
              <Icon className={cn("h-5 w-5", account.status === "connected" ? "text-primary" : "text-destructive")} />
            </div>
            <div data-unique-id="87a402e8-a21e-4b7c-a790-7e77b37f0aea" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="2e300925-53f7-450c-83d6-a09f7ed277c0" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="font-medium" data-unique-id="6e80bcb1-159d-42cf-849e-ea6d9cb50e52" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.name}</h3>
                {account.status === "connected" ? <CheckCircle className="h-4 w-4 text-primary ml-2" /> : <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
              </div>
              <p className="text-sm text-muted-foreground" data-unique-id="fdfd868f-2d2b-4c47-b26d-b3a06786d674" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="48a320c1-df94-44a6-93a4-438720608c2d" data-file-name="components/dashboard/profile.tsx">
                @</span>{account.username}
              </p>
            </div>
          </div>
        
          <div className="flex items-center space-x-2 mt-3 sm:mt-0" data-unique-id="db9efc18-64aa-4cdb-bac6-d6a6361d172a" data-file-name="components/dashboard/profile.tsx">
          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={() => {}} data-unique-id="d880984d-e94e-4610-b021-7b5af90a56cb" data-file-name="components/dashboard/profile.tsx">
            <RefreshCw className="h-3 w-3 mr-1" /><span className="editable-text" data-unique-id="f3c66fde-7c06-4839-9631-db02423b243f" data-file-name="components/dashboard/profile.tsx">
            Sync
          </span></Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} data-unique-id="f72a2564-c616-4312-803d-461312f49f23" data-file-name="components/dashboard/profile.tsx">
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "transform rotate-180" : "")} />
          </Button>
          </div>
        </div>
      </div>
      
      {expanded && <div className="bg-muted/30 p-4 border-t border-border" data-unique-id="9d706714-edd7-4e42-ad68-6dbe6eb3d990" data-file-name="components/dashboard/profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="b2f8e0bf-e934-4374-b93a-e8e8ec905aca" data-file-name="components/dashboard/profile.tsx">
            <div data-unique-id="987dc5ce-bc02-4f62-9cb6-d9d9f7817e5f" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="28c8b0ee-40f3-4b68-959f-9174015fcf33" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="20ddbb58-bd55-47b1-85a6-24f050d57643" data-file-name="components/dashboard/profile.tsx">Status</span></div>
              <div className="flex items-center" data-unique-id="043ce4d1-db67-4a73-93d7-a33dbd03059d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {account.status === "connected" ? <>
                    <div className="w-2 h-2 rounded-full bg-primary mr-2" data-unique-id="f5d19be8-74cb-45b1-8fe9-b34a01d6bb2f" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="6bf1c7d5-d93b-4ba0-8cd3-7e9e0fd7d863" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="25402288-8e2b-422f-bd2e-f4d7ac857ddd" data-file-name="components/dashboard/profile.tsx">Connected</span></span>
                  </> : <>
                    <div className="w-2 h-2 rounded-full bg-destructive mr-2" data-unique-id="762e45c9-64c7-4904-b9b2-5800e2a2f213" data-file-name="components/dashboard/profile.tsx"></div>
                    <span className="text-sm" data-unique-id="24f02acd-2a94-4687-9b12-aff7fcc54256" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="81513a62-9191-4805-a1de-43af9e91785e" data-file-name="components/dashboard/profile.tsx">Error</span></span>
                  </>}
              </div>
              {account.status === "error" && <p className="text-xs text-destructive mt-1" data-unique-id="3af6cab8-c7e1-4d52-ae4a-a3e4dbb1fbb6" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.error}</p>}
            </div>
            
            <div data-unique-id="4b6e34ff-1a48-4700-a088-9f7c46a38e1e" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="97a89d5f-c217-47c7-85fc-a4012cae704e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="5c781cff-2f0e-4921-aee6-bc0525c154ff" data-file-name="components/dashboard/profile.tsx">Last Synced</span></div>
              <div className="text-sm" data-unique-id="38a3b8a0-8bb7-40ee-8335-29829a8f1aaf" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.lastSync}</div>
            </div>
            
            <div data-unique-id="516dbacf-abbb-4f33-a47d-37833e941ca3" data-file-name="components/dashboard/profile.tsx">
              <div className="text-xs text-muted-foreground mb-1" data-unique-id="f3f990f9-b8e3-4547-8bcd-971ef0f89358" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a0988119-793b-457e-8233-fee8c104a637" data-file-name="components/dashboard/profile.tsx">Items</span></div>
              <div className="text-sm" data-unique-id="1dd1d392-7314-4146-858d-90501273c933" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{account.itemCount}<span className="editable-text" data-unique-id="6c68dd62-5e6d-4359-b04c-6a8d2211f54e" data-file-name="components/dashboard/profile.tsx"> saved items</span></div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between" data-unique-id="d1a65b56-e92e-43a6-ab1a-52472f90feef" data-file-name="components/dashboard/profile.tsx">
            <Button variant="ghost" size="sm" className="text-destructive" data-unique-id="0f43e49b-c60a-49d8-95a0-d376f0ef0522" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cb894d3a-9529-44d2-9768-59ebbbed3b38" data-file-name="components/dashboard/profile.tsx">
              Disconnect
            </span></Button>
            <Button variant="ghost" size="sm" className="text-primary flex items-center" data-unique-id="019c3eff-861e-478d-86c9-4897669953d3" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="751d1146-d826-475c-9535-00494e42a729" data-file-name="components/dashboard/profile.tsx">
              Visit </span>{account.name}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>}
    </motion.div>;
}