"use client";

import { useState, useEffect } from "react";
import { CheckCircle, CreditCard, Edit2, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getProviderDisplayName } from "@/utils/ingest";
import OAuthConnectButtons from "@/components/auth/oauth-connect-buttons";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile');
  const { user } = useAuth();
  const { 
    profile, 
    loading: profileLoading, 
    updating, 
    error: profileError,
    updateDisplayName,
    displayName,
    email 
  } = useUserProfile();
  
  // Username editing state
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');

  // Initialize username from profile data
  useEffect(() => {
    if (profile) {
      setEditedUsername(displayName);
    }
  }, [profile, displayName]);

  // Handle URL parameters for success messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const connected = urlParams.get('connected');
    const autoSync = urlParams.get('auto_sync');
    const error = urlParams.get('error');

    if (connected && connected !== 'account') {
      const providerName = getProviderDisplayName(connected as any);
      const message = autoSync 
        ? `${providerName} connected successfully! Syncing your data...`
        : `${providerName} connected successfully!`;
      
      showToast(message, 'success');
    } else if (error) {
      const errorMessages = {
        oauth_failed: 'OAuth authorization failed. Please try again.',
        store_failed: 'Failed to store account connection. Please try again.',
        callback_failed: 'OAuth callback failed. Please check your connection.',
        no_code: 'OAuth authorization was cancelled or failed.'
      };
      
      const message = errorMessages[error as keyof typeof errorMessages] || 'Authentication failed. Please try again.';
      showToast(message, 'error');
    }

    // Clean up URL parameters
    if (connected || error) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('connected');
      newUrl.searchParams.delete('auto_sync');
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, document.title, newUrl.toString());
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    console.log(`Toast (${type}): ${message}`);
    
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 5000);
  };

  // Get user initials for avatar (always from email)
  const getUserInitials = (email: string | undefined) => {
    if (!email) return 'U';
    const nameParts = email.split('@')[0].split('.');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return email[0].toUpperCase();
  };

  // Handle username editing
  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  const handleSaveUsername = async () => {
    if (editedUsername.trim()) {
      const success = await updateDisplayName(editedUsername.trim());
      if (success) {
        setIsEditingUsername(false);
        showToast('Display name updated successfully!', 'success');
      } else {
        showToast('Failed to update display name. Please try again.', 'error');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedUsername(displayName);
    setIsEditingUsername(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveUsername();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return <div data-unique-id="480f98f8-3a19-4ace-b03f-38d7d23d7482" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      <div className="flex flex-col gap-3 mb-6" data-unique-id="cc4e8fa0-1c6e-42e6-80f9-9a63e8cf9187" data-file-name="components/dashboard/profile.tsx">
        <h1 className="text-2xl font-semibold" data-unique-id="8369ae88-5f6f-4fbb-9165-97daf8998422" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6bd77648-3569-4f1e-a664-57e48a67b855" data-file-name="components/dashboard/profile.tsx">Profile</span></h1>
        <div className="flex flex-wrap gap-2" data-unique-id="c4364b00-30f2-4567-adde-8652894bd3fb" data-file-name="components/dashboard/profile.tsx">
          <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('profile')} data-unique-id="75768398-e169-4438-8efc-8dd5029369c6" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3870c61e-a9ba-4d01-872e-10132bcb206b" data-file-name="components/dashboard/profile.tsx">
            Profile
          </span></Button>
          <Button variant={activeTab === 'billing' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('billing')} data-unique-id="a1197661-20b5-445d-b630-3674c4d3d2c2" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="2969663f-6c96-4ff1-b765-b0f6236c1a5e" data-file-name="components/dashboard/profile.tsx">
            Billing
          </span></Button>
        </div>
      </div>
      
      {activeTab === 'profile' ? <>
          {/* Profile Error Display */}
          {profileError && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
              {profileError}
            </div>
          )}

          {/* User info */}
          <div className="skoop-card p-6 mb-8" data-unique-id="14b3b384-d714-44b1-a781-7bc511c89b36" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center" data-unique-id="a0230fcd-f853-4a60-9c42-fe0bd8fd2b97" data-file-name="components/dashboard/profile.tsx">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mr-4" data-unique-id="791df67d-0493-42e3-9818-5b070dd0645f" data-file-name="components/dashboard/profile.tsx">
            {getUserInitials(email)}
          </div>
          <div data-unique-id="73a91b44-3745-4e82-83c6-7d813dc9461a" data-file-name="components/dashboard/profile.tsx">
            {/* Editable Username */}
            <div className="flex items-center gap-2 mb-1">
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="text-xl font-semibold bg-background border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveUsername}
                    disabled={updating}
                    className="p-1 text-green-600 hover:bg-green-100 rounded disabled:opacity-50"
                  >
                    {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold" data-unique-id="da7fddc0-e95a-49d0-9960-760fc87f6f00" data-file-name="components/dashboard/profile.tsx">
                    {displayName || 'User'}
                  </h2>
                  <button
                    onClick={handleEditUsername}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Email */}
            <p className="text-muted-foreground" data-unique-id="bb076531-e068-4ad8-b175-d2e2b694c9f5" data-file-name="components/dashboard/profile.tsx">
              {email || 'No email available'}
            </p>
            <div className="mt-2 text-sm" data-unique-id="8e5e856b-12c0-4fda-a35f-03856de9f019" data-file-name="components/dashboard/profile.tsx">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-unique-id="5750c9de-5eb9-4993-8ab6-b804629aa434" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="61fe20cc-2ba0-453b-a2b5-054d5c9a8984" data-file-name="components/dashboard/profile.tsx">
                Free Plan
              </span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border" data-unique-id="1fc40fff-fce0-4f7b-979b-e25e40819225" data-file-name="components/dashboard/profile.tsx">
          <div data-unique-id="ea160bfb-03d8-4d8c-bf9d-c81d65965199" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="f7428561-b8ce-4a89-8917-72f2b5c05663" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="8b123560-19b8-4772-b6d3-93c07ee89b31" data-file-name="components/dashboard/profile.tsx">Total Items</span></div>
            <div className="font-semibold text-2xl" data-unique-id="35625845-f487-4494-a05f-4f7bb7927477" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a6d376c5-a063-4e88-a089-98973c38133f" data-file-name="components/dashboard/profile.tsx">0</span></div>
          </div>
          <div data-unique-id="071a2e56-e92c-4684-a174-80d38f36bfb7" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="27e45538-57a9-4635-a718-1db2b2732298" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="49261c19-de82-471d-8dff-10fc21d07a29" data-file-name="components/dashboard/profile.tsx">Collections</span></div>
            <div className="font-semibold text-2xl" data-unique-id="f8c7f500-d727-49b2-a705-a773d3beb4ae" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="79b30055-b95b-4232-b334-7300789bde88" data-file-name="components/dashboard/profile.tsx">0</span></div>
          </div>
          <div data-unique-id="94187fcf-a7d7-42de-9b69-243d561e8a7e" data-file-name="components/dashboard/profile.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="15e395df-c450-4737-86b6-6a4d7a2c45c0" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="a9fc7eac-7430-45b8-8a70-91ed4c71b1d9" data-file-name="components/dashboard/profile.tsx">Member Since</span></div>
            <div className="font-semibold" data-unique-id="f204649c-8c96-477f-a8d9-a57c7e511ab6" data-file-name="components/dashboard/profile.tsx">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
            </div>
          </div>
        </div>
      </div>

          {/* OAuth Connect Buttons Section */}
          <div className="skoop-card p-6 mb-8">
            <OAuthConnectButtons />
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
      return <span className="text-3xl font-bold" data-unique-id="e96c72ed-95c5-44d3-8e2f-e7e50f09529d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c18169dc-75bb-4cb9-acc5-025a095d3563" data-file-name="components/dashboard/profile.tsx">Free</span></span>;
    }
    return <div className="flex items-baseline" data-unique-id="c8651eaf-502b-4a4e-81e1-1926dbe0b1f9" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
        <span className="text-3xl font-bold" data-unique-id="955a7fc7-fbdf-4c19-9ce2-1fe67fe3db7c" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ea503558-e6e3-4e9b-b980-24bce2211d4a" data-file-name="components/dashboard/profile.tsx">$</span>{price}</span>
        <span className="text-muted-foreground text-sm font-normal ml-1" data-unique-id="73cae04a-d4cb-4779-8d89-c0f9e1c4e515" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="4e9819fa-7841-488f-89ea-e8fb181b026b" data-file-name="components/dashboard/profile.tsx">
          /</span>{annually ? 'year' : 'month'}
        </span>
        {annually && discount > 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-primary bg-primary/10" data-unique-id="c04c33a6-55c4-46c1-88f5-881b70857670" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="7196203e-a487-402f-a379-9db4fccb9cce" data-file-name="components/dashboard/profile.tsx">
            Save </span>{discount}<span className="editable-text" data-unique-id="227b6473-9d2a-4fb8-94ff-3df254356fd3" data-file-name="components/dashboard/profile.tsx">%
          </span></span>}
      </div>;
  };
  return <div className="space-y-8" data-unique-id="2e0e6c81-12ce-4396-9b47-c1c079d2150e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
      {/* Current Plan Section */}
      <div className="skoop-card p-6" data-unique-id="56702d41-dc21-438b-b801-d16a8cfe71a6" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="3ac9d53f-45e8-4691-8192-ff4d600e6c45" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="531b3a47-9079-43fb-b49b-f5745d5860b9" data-file-name="components/dashboard/profile.tsx">Your Plan</span></h2>
        
        <div className="flex justify-end mb-6" data-unique-id="9260dcdb-e616-464b-8970-8f1cc9c4b69e" data-file-name="components/dashboard/profile.tsx">
          <div className="bg-secondary rounded-full p-1 flex items-center" data-unique-id="e785cd50-2e74-4790-b478-c4bfd7cf7ced" data-file-name="components/dashboard/profile.tsx">
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", !annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(false)} data-unique-id="4e37fb0a-cddf-40a8-9d33-d5b074302aed" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="6840d2aa-a980-4267-b1c3-2b1f6181ea09" data-file-name="components/dashboard/profile.tsx">
              Monthly
            </span></button>
            <button className={cn("px-4 py-1.5 rounded-full text-sm transition-all", annually ? "bg-primary text-white" : "text-foreground")} onClick={() => setAnnually(true)} data-unique-id="3a354f20-dc41-40ec-b79d-dbd0abfc7b5d" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cb9b0639-d852-42d3-9325-f06b22806343" data-file-name="components/dashboard/profile.tsx">
              Annually
            </span></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="8ef593f5-25d7-494f-9987-e4e303bd3a60" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {plans.map(plan => <div key={plan.id} className={cn("border rounded-lg overflow-hidden transition-all", selectedPlan === plan.id ? "border-primary ring-2 ring-primary/10" : "border-border", plan.highlight ? "relative" : "")} data-unique-id="0fd32377-c9b6-4376-b608-d9fdf253adfc" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg" data-unique-id="fb44d7e4-9c55-4d92-ae19-34ffaecbff23" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="1296b548-5096-4531-9cb9-43c18fe7ba93" data-file-name="components/dashboard/profile.tsx">
                  Popular
                </span></div>}
              
              <div className="p-6" data-unique-id="37ecb850-342e-46d1-b818-c134340493fb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                <h3 className="text-lg font-medium mb-2" data-unique-id="83adb30b-3eaa-4fd5-8608-3ea778c55058" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4" data-unique-id="d87a9031-07e4-4657-b366-eda4d872d6e1" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{plan.description}</p>
                
                {getPriceDisplay(plan)}
                
                <div className="my-6 border-t border-border pt-4" data-unique-id="aae9d60e-2c14-468e-a086-e9c962977582" data-file-name="components/dashboard/profile.tsx">
                  <ul className="space-y-3" data-unique-id="c81db28c-520b-4566-a454-e47d062c95b4" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {plan.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="22a0ad16-d02b-4fc9-9827-7525832c9816" data-file-name="components/dashboard/profile.tsx">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" data-unique-id="33e7e0dc-27a4-474d-9deb-33a03df67808" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="aa7f2d15-9848-4fb1-b2ba-71969db7162e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className={cn("w-full", selectedPlan === plan.id ? "bg-primary/20 text-primary hover:bg-primary/30" : "skoop-button-primary")} disabled={selectedPlan === plan.id || plan.disabled} onClick={() => setSelectedPlan(plan.id as any)} data-unique-id="517b2427-657f-463e-a6c9-6e7d5a2a056d" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {selectedPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="skoop-card p-6" data-unique-id="fdee6adb-c7ef-417b-81c1-572ac5aacd25" data-file-name="components/dashboard/profile.tsx">
        <div className="flex items-center justify-between mb-6" data-unique-id="307057e4-c68b-452a-9a51-a9ecb83070e6" data-file-name="components/dashboard/profile.tsx">
          <h2 className="text-xl font-medium" data-unique-id="fcc88d30-0997-4701-900d-55607e093396" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d3219c78-005e-4d36-8fd0-b2c990f547f6" data-file-name="components/dashboard/profile.tsx">Payment Methods</span></h2>
          <Button variant="outline" size="sm" data-unique-id="ac24dc28-9948-4625-9901-112d2a052874" data-file-name="components/dashboard/profile.tsx">
            <CreditCard className="h-4 w-4 mr-2" /><span className="editable-text" data-unique-id="d6e0fdfe-a98f-41c6-9839-eedf8a20b767" data-file-name="components/dashboard/profile.tsx">
            Add Payment Method
          </span></Button>
        </div>
        
        <div className="space-y-4" data-unique-id="f8fa52e4-001f-4944-969d-9d8f65199f7e" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-border rounded-lg p-4" data-unique-id="9a1a6da1-76cf-42ba-81d0-66daa1f9726d" data-file-name="components/dashboard/profile.tsx">
              <div className="flex items-center" data-unique-id="21cb1fa6-29d5-40f4-83a9-10c2b51e3948" data-file-name="components/dashboard/profile.tsx">
                <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center mr-4" data-unique-id="3ade8e9e-29a4-4964-ba5d-7c5d46ace15b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                  {method.type === 'visa' ? <span className="text-blue-600 font-bold" data-unique-id="7477fd1a-aa01-4e00-99e0-7f76a7567dc0" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d596e96e-56b8-46b5-a552-f7936c2dc6af" data-file-name="components/dashboard/profile.tsx">VISA</span></span> : method.type === 'mastercard' ? <div className="flex items-center" data-unique-id="9b1cbbb5-0367-4018-82ef-933113257658" data-file-name="components/dashboard/profile.tsx">
                      <div className="h-4 w-4 bg-red-500 rounded-full opacity-85" data-unique-id="17c252da-5115-4fb5-9cbd-b8d4f6d783c0" data-file-name="components/dashboard/profile.tsx"></div>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full -ml-2 opacity-85" data-unique-id="fe427d30-5e38-4143-9127-1feb2add9fae" data-file-name="components/dashboard/profile.tsx"></div>
                    </div> : <CreditCard className="h-5 w-5" />}
                </div>
                <div data-unique-id="bb0e3ab9-5824-4d85-ae0a-b30f5aaee210" data-file-name="components/dashboard/profile.tsx">
                  <div className="font-medium" data-unique-id="999b56d6-0551-4655-8332-99e769eeb814" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}<span className="editable-text" data-unique-id="ed2a43c5-195a-4aa1-8880-0ddf539d2514" data-file-name="components/dashboard/profile.tsx"> •••• </span>{method.last4}
                  </div>
                  <div className="text-xs text-muted-foreground" data-unique-id="b111535d-df46-4ee4-baa5-b657003613bb" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="553f939f-9ca1-42a3-8ce0-c4733f5f3a63" data-file-name="components/dashboard/profile.tsx">Expires </span>{method.expiry}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2" data-unique-id="21cbe964-c07c-4013-a22b-7cf7cac5ffb2" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                {method.isDefault && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full" data-unique-id="49078dbb-b757-4799-b129-3d1777924513" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="9f3170e2-6068-4694-aa0c-02a861e4c7e4" data-file-name="components/dashboard/profile.tsx">Default</span></span>}
                <Button variant="ghost" size="sm" data-unique-id="199cc73a-1c5d-432f-9e1c-3e22faca4a0a" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="c7f300d3-42a6-433e-8fb6-930c10b3f844" data-file-name="components/dashboard/profile.tsx">Edit</span></Button>
                {!method.isDefault && <Button variant="ghost" size="sm" data-unique-id="113e0561-1123-4bb6-bed9-7f146acec786" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="7042261d-71bf-4525-8ab7-9a07be2ed264" data-file-name="components/dashboard/profile.tsx">Set as Default</span></Button>}
              </div>
            </div>)}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="skoop-card p-6" data-unique-id="7003670f-232b-4e4a-94a8-b88072bdc5f2" data-file-name="components/dashboard/profile.tsx">
        <h2 className="text-xl font-medium mb-6" data-unique-id="9a6ac4f8-25a3-43eb-a51f-360e1c8ad123" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3267edfe-fd8b-4904-a762-7b05527914ca" data-file-name="components/dashboard/profile.tsx">Billing History</span></h2>
        
        <div className="overflow-x-auto" data-unique-id="ebfc96e1-c5b9-4667-95db-58b89945e5b7" data-file-name="components/dashboard/profile.tsx">
          <table className="w-full text-left border-collapse" data-unique-id="35126a35-7cc2-4a1c-b5ff-20e746aa0ec4" data-file-name="components/dashboard/profile.tsx">
            <thead data-unique-id="a998e823-d7a3-451e-8447-15c6a6638292" data-file-name="components/dashboard/profile.tsx">
              <tr className="border-b border-border" data-unique-id="0d21cecd-3a67-470b-b4c3-6caa369c80a0" data-file-name="components/dashboard/profile.tsx">
                <th className="p-3 text-sm font-medium" data-unique-id="c1b6c51e-e2ed-4db4-9952-32dc43d2debb" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="3c4f3a1c-1f4b-4d6e-83f0-eae1813f57bb" data-file-name="components/dashboard/profile.tsx">Invoice</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="bfed673d-3c15-432b-b85b-71c164fd2f13" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="4373c022-5e2f-4712-951f-d8ed901755a9" data-file-name="components/dashboard/profile.tsx">Date</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="38bff204-2816-4f52-897d-6811ce8f3247" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="cea28fb8-2c75-4c34-a15d-0d7b30cd7163" data-file-name="components/dashboard/profile.tsx">Amount</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="3b38b76b-0ab8-4343-9877-80a46122a787" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="28f1845d-6fa0-4cbc-9e25-66c225c41d43" data-file-name="components/dashboard/profile.tsx">Status</span></th>
                <th className="p-3 text-sm font-medium" data-unique-id="7a023e4c-cb6b-45bc-84a1-ade3b6f24861" data-file-name="components/dashboard/profile.tsx"></th>
              </tr>
            </thead>
            <tbody data-unique-id="dc65240c-c5b3-4ec1-bdcc-963ac001e492" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
              {invoices.map(invoice => <tr key={invoice.id} className="border-b border-border hover:bg-muted/50" data-unique-id="9bd414ae-a8ac-4b61-bc1d-26f4b94447d7" data-file-name="components/dashboard/profile.tsx">
                  <td className="p-3 text-sm" data-unique-id="c8a0f6f3-b502-47a9-8131-5499bdf23a9a" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.id}</td>
                  <td className="p-3 text-sm" data-unique-id="557048bc-d309-453e-92d9-dc251e6e016b" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.date}</td>
                  <td className="p-3 text-sm" data-unique-id="5953b7ae-1239-474b-bf3c-009a72eee609" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">{invoice.amount}</td>
                  <td className="p-3 text-sm" data-unique-id="7ced2ae2-61a3-42ff-8f9d-95a09a71802b" data-file-name="components/dashboard/profile.tsx">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 text-xs rounded-full" data-unique-id="1f24210d-57ad-4085-af0c-91dd00f7b612" data-file-name="components/dashboard/profile.tsx" data-dynamic-text="true">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-right" data-unique-id="4a542d04-d3f4-4d46-bdf6-09118235f9c9" data-file-name="components/dashboard/profile.tsx">
                    <Button variant="ghost" size="sm" data-unique-id="1bab6063-2303-4ee0-9b8f-ac60c038da3e" data-file-name="components/dashboard/profile.tsx"><span className="editable-text" data-unique-id="d471a7f0-807c-48fc-a606-c68b0d7ab03d" data-file-name="components/dashboard/profile.tsx">Download</span></Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}