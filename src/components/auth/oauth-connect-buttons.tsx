"use client";

import { useState } from 'react';
import { Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConnectedAccounts, Provider } from '@/hooks/useConnectedAccounts';
import { triggerIngestion, formatIngestMessage } from '@/utils/ingest';
import { cn } from '@/lib/utils';

const providers: Array<{
  id: Provider;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
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
    color: 'text-blue-500'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: Reddit,
    color: 'text-orange-500'
  },
  {
    id: 'stack',
    name: 'Stack Overflow',
    icon: StackOverflow,
    color: 'text-orange-600'
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
    // Simple toast implementation - you can replace with your preferred toast library
    console.log(`Toast (${type}): ${message}`);
    
    // Create a temporary toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
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
    try {
      const result = await triggerIngestion(provider);
      const message = formatIngestMessage(result);
      showToast(message, result.success ? 'success' : 'error');
    } catch (error) {
      console.error('Failed to refresh account:', error);
      showToast(`Failed to sync ${provider}`, 'error');
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
      <div className="space-y-3">
        {providers.map((provider) => {
          const connected = isConnected(provider.id);
          const isConnecting = connecting === provider.id;
          const isDisconnecting = disconnecting === provider.id;
          const isRefreshing = refreshing === provider.id;
          const Icon = provider.icon;

          return (
            <div
              key={provider.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center",
                  connected ? "bg-primary/10" : "bg-muted"
                )}>
                  <Icon className={cn("h-5 w-5", provider.color)} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{provider.name}</span>
                    {connected ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      connected ? "bg-green-500" : "bg-muted-foreground"
                    )} />
                    <span className="text-sm text-muted-foreground">
                      {connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {connected && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRefresh(provider.id)}
                    disabled={isRefreshing}
                    className="text-xs"
                  >
                    {isRefreshing ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </>
                    )}
                  </Button>
                )}
                
                {connected ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDisconnect(provider.id)}
                    disabled={isDisconnecting}
                  >
                    {isDisconnecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Disconnecting...
                      </>
                    ) : (
                      "Disconnect"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">Why connect accounts?</h4>
        <p className="text-sm text-muted-foreground">
          Connect your accounts to enable SKOOP to fetch and organize your saved items, 
          starred repositories, bookmarked tweets, and more from these platforms.
        </p>
      </div>
    </div>
  );
} 