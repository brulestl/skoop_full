"use client";

import { useState } from 'react';
import { Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConnectedAccounts, Provider } from '@/hooks/useConnectedAccounts';
import { cn } from '@/lib/utils';

const providers: Array<{
  id: Provider;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  disabled?: boolean;
  disabledReason?: string;
}> = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    color: 'text-gray-900 dark:text-gray-100'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-500',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: Reddit,
    color: 'text-orange-500',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'stack',
    name: 'Stack Overflow',
    icon: StackOverflow,
    color: 'text-orange-600',
    disabled: true,
    disabledReason: 'Coming soon'
  }
];

export default function OAuthConnectButtons() {
  const { 
    isConnected, 
    connectAccount, 
    disconnectAccount, 
    connecting, 
    loading 
  } = useConnectedAccounts();
  
  const [disconnecting, setDisconnecting] = useState<Provider | null>(null);
  const [refreshing, setRefreshing] = useState<Provider | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // Enhanced toast implementation with better visibility
    console.log(`Toast (${type}): ${message}`);
    
    // Remove any existing toasts first
    const existingToasts = document.querySelectorAll('.skoop-toast');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    // Create a more prominent toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `skoop-toast fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-[9999] transition-all duration-300 transform translate-x-0 shadow-lg max-w-md ${
      type === 'success' ? 'bg-green-600 border border-green-500' : 'bg-red-600 border border-red-500'
    }`;
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0) scale(1)';
    }, 10);
    
    // Remove after 4 seconds (increased time)
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px) scale(0.95)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  };

  const handleConnect = async (provider: Provider) => {
    try {
      await connectAccount(provider);
    } catch (error) {
      console.error('Failed to connect account:', error);
      showToast(`Failed to connect ${provider}`, 'error');
    }
  };

  const handleDisconnect = async (provider: Provider) => {
    if (!confirm(`Are you sure you want to disconnect your ${provider} account?`)) {
      return;
    }

    setDisconnecting(provider);
    try {
      await disconnectAccount(provider);
      showToast(`${provider} account disconnected`);
    } catch (error) {
      console.error('Failed to disconnect account:', error);
      showToast(`Failed to disconnect ${provider}`, 'error');
    } finally {
      setDisconnecting(null);
    }
  };

  const handleRefresh = async (provider: Provider) => {
    setRefreshing(provider);
    
    // Show immediate feedback
    showToast(`Syncing ${provider} bookmarks...`, 'success');
    
    try {
      // Manual bookmark sync - make a request to fetch from GitHub API
      const response = await fetch(`/api/sync/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const result = await response.json();
        showToast(`✅ Synced ${result.count || 0} bookmarks from ${provider}!`, 'success');
        
        // Force refresh the bookmarks data in the UI
        window.dispatchEvent(new CustomEvent('bookmarks-updated'));
        
        // Reduced delay for faster feedback
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Sync failed');
      }
    } catch (error) {
      console.error('Failed to refresh account:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showToast(`❌ Failed to sync ${provider}: ${errorMessage}`, 'error');
    } finally {
      setRefreshing(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Connected Accounts</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Connected Accounts</h3>
      
      <div className="grid gap-3">
        {providers.map((provider) => {
          const connected = isConnected(provider.id);
          const isConnecting = connecting === provider.id;
          const isDisconnecting = disconnecting === provider.id;
          const isRefreshing = refreshing === provider.id;
          const IconComponent = provider.icon;

          return (
            <div
              key={provider.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                connected ? "bg-green-50 border-green-200" : "bg-background border-border",
                provider.disabled && "opacity-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className={cn("h-5 w-5", provider.color)} />
                <div>
                  <p className="font-medium">{provider.name}</p>
                  {connected && (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </p>
                  )}
                  {provider.disabled && (
                    <p className="text-sm text-muted-foreground">{provider.disabledReason}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {connected && !provider.disabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRefresh(provider.id)}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                    {isRefreshing ? 'Syncing...' : 'Sync Now'}
                  </Button>
                )}
                
                {connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnect(provider.id)}
                    disabled={isDisconnecting || provider.disabled}
                  >
                    {isDisconnecting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Disconnect'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting || provider.disabled}
                    size="sm"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Why connect your accounts?</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Automatically import your starred repositories from GitHub</li>
          <li>• Sync your saved tweets and liked content from Twitter</li>
          <li>• Import saved posts and comments from Reddit</li>
          <li>• Collect your Stack Overflow favorites and bookmarks</li>
        </ul>
      </div>
    </div>
  );
} 