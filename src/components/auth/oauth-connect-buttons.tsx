"use client";

import { useState } from 'react';
import { Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, CheckCircle, AlertCircle, Loader2, RefreshCw, Cloud, MessageCircle, GitBranch, Linkedin, FileText, Tv, Send, Facebook } from 'lucide-react';
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
    color: 'text-blue-500'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    icon: Cloud,
    color: 'text-blue-600',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: MessageCircle,
    color: 'text-indigo-500',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: GitBranch,
    color: 'text-orange-500',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: FileText,
    color: 'text-gray-800 dark:text-gray-200',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: Tv,
    color: 'text-purple-500',
    disabled: true,
    disabledReason: 'Coming soon'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Send,
    color: 'text-blue-400'
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
    color: 'text-orange-600',
    disabled: true,
    disabledReason: 'Coming soon'
  }
];

export default function OAuthConnectButtons() {
  const { 
    accounts,
    isConnected, 
    connectAccount, 
    disconnectAccount, 
    connecting, 
    loading,
    getAccount,
    fetchAccounts
  } = useConnectedAccounts();
  
  const [disconnecting, setDisconnecting] = useState<Provider | null>(null);
  const [refreshing, setRefreshing] = useState<Provider | null>(null);

  // Get account status for a provider
  const getAccountStatus = (provider: Provider) => {
    const account = getAccount(provider);
    return account?.status || 'active';
  };

  // Check if account has error
  const hasError = (provider: Provider) => {
    const status = getAccountStatus(provider);
    return status === 'error' || status === 'expired';
  };

  // Debug logging removed - use ConnectedAccountsDebug component instead

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
      
      // Handle specific error messages
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('already connected')) {
        showToast(`${provider} account is already linked. Disconnect first to reconnect.`, 'error');
      } else if (errorMessage.includes('Popup blocked')) {
        showToast(`❌ Popup blocked. Please allow popups for this site and try again.`, 'error');
      } else if (errorMessage.includes('OAuth cancelled')) {
        showToast(`${provider} connection was cancelled.`, 'error');
      } else if (errorMessage.includes('timeout')) {
        showToast(`❌ Connection timeout for ${provider}. Please try again.`, 'error');
      } else if (errorMessage.includes('REDDIT_CLIENT_ID') || errorMessage.includes('REDDIT_CLIENT_SECRET')) {
        showToast(`❌ Reddit integration not configured. Please contact support.`, 'error');
      } else if (errorMessage.includes('Reddit integration not configured')) {
        showToast(`❌ Reddit integration not configured. Please contact support.`, 'error');
      } else if (errorMessage.includes('TELEGRAM_BOT_TOKEN')) {
        showToast(`❌ Telegram bot not configured. Please contact support.`, 'error');
      } else if (errorMessage.includes('TELEGRAM_BOT_USERNAME')) {
        showToast(`❌ Telegram bot username not configured. Please contact support.`, 'error');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        showToast(`❌ Network error connecting to ${provider}. Please check your connection.`, 'error');
      } else {
        showToast(`Failed to connect ${provider}: ${errorMessage}`, 'error');
      }
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
    const contentType = provider === 'twitter' ? 'likes' : provider === 'telegram' ? 'messages' : 'bookmarks';
    showToast(`Syncing ${provider} ${contentType}...`, 'success');
    
    try {
      // Manual bookmark sync - make a request to fetch from GitHub API
      const response = await fetch(`/api/sync/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const result = await response.json();
        const contentType = provider === 'twitter' ? 'likes' : provider === 'telegram' ? 'messages' : 'bookmarks';
        
        // Handle Twitter special case with helpful message
        if (provider === 'twitter' && result.helpMessage) {
          showToast(`🐦 ${result.helpMessage}`, 'success');
        } else {
          const syncedCount = result.count || result.inserted || 0;
          const existingCount = result.existing_count || 0;
          
          if (syncedCount === 0 && existingCount > 0) {
            // No new items but existing items found
            showToast(`✅ ${provider} is up to date (${existingCount} ${contentType} total)`, 'success');
          } else if (syncedCount > 0) {
            // New items synced
            showToast(`✅ Synced ${syncedCount} new ${contentType} from ${provider}!`, 'success');
          } else {
            // No items at all
            showToast(`✅ ${provider} sync complete (no ${contentType} found)`, 'success');
          }
        }
        
        // Force refresh the bookmarks data in the UI
        window.dispatchEvent(new CustomEvent('bookmarks-updated'));
        
        // Remove navigation after sync - user should stay on profile
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        
        // Handle specific error cases
        if (response.status === 409 && errorData.error === 'no_session') {
          showToast(`❌ ${provider} session expired. Please reconnect your account.`, 'error');
          // Refresh accounts to update UI status
          await fetchAccounts();
        } else if (response.status === 401) {
          showToast(`❌ Authentication failed. Please reconnect your ${provider} account.`, 'error');
        } else if (response.status === 500) {
          console.error('Sync error details:', errorData);
          const errorMsg = errorData.details || errorData.error || 'Internal server error';
          showToast(`❌ Failed to sync ${provider}: ${errorMsg}`, 'error');
        } else {
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Failed to refresh account:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Provide more helpful error messages
      if (errorMessage.includes('fetch')) {
        showToast(`❌ Network error syncing ${provider}. Please check your connection.`, 'error');
      } else if (errorMessage.includes('timeout')) {
        showToast(`❌ Sync timeout for ${provider}. Please try again.`, 'error');
      } else {
        showToast(`❌ Failed to sync ${provider}: ${errorMessage}`, 'error');
      }
    } finally {
      setRefreshing(null);
    }
  };

  const handleMigrateMessages = async (provider: Provider) => {
    if (provider !== 'telegram') return;
    
    setRefreshing(provider);
    showToast(`Migrating ${provider} messages...`, 'success');
    
    try {
      const response = await fetch(`/api/telegram/migrate-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const result = await response.json();
        const migratedCount = result.count || 0;
        
        if (migratedCount > 0) {
          showToast(`✅ Migrated ${migratedCount} Telegram messages to bookmarks!`, 'success');
        } else {
          showToast(`✅ No new messages to migrate (${result.existing_count || 0} total)`, 'success');
        }
        
        // Force refresh the bookmarks data in the UI
        window.dispatchEvent(new CustomEvent('bookmarks-updated'));
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to migrate messages:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showToast(`❌ Failed to migrate messages: ${errorMessage}`, 'error');
    } finally {
      setRefreshing(null);
    }
  };

  const handleMigrateUserMessages = async (provider: Provider) => {
    if (provider !== 'telegram') return;
    
    setRefreshing(provider);
    showToast(`Migrating your ${provider} messages...`, 'success');
    
    try {
      const response = await fetch(`/api/telegram/migrate-user-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const result = await response.json();
        const migratedCount = result.count || 0;
        const skippedCount = result.skipped || 0;
        
        if (migratedCount > 0) {
          const message = `✅ Migrated ${migratedCount} Telegram messages!${skippedCount > 0 ? ` (${skippedCount} empty messages skipped)` : ''}`;
          showToast(message, 'success');
        } else if (skippedCount > 0) {
          showToast(`✅ Found ${skippedCount} messages but all were empty (no text content)`, 'success');
        } else {
          showToast(`✅ No messages to migrate (${result.existing_count || 0} total)`, 'success');
        }
        
        // Force refresh the bookmarks data in the UI
        window.dispatchEvent(new CustomEvent('bookmarks-updated'));
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to migrate user messages:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showToast(`❌ Failed to migrate messages: ${errorMessage}`, 'error');
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
          const accountHasError = hasError(provider.id);
          const account = getAccount(provider.id);
          const IconComponent = provider.icon;

          return (
            <div
              key={provider.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                connected && !accountHasError ? "bg-green-50 border-green-200" : 
                connected && accountHasError ? "bg-red-50 border-red-200" :
                "bg-background border-border",
                provider.disabled && "opacity-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className={cn("h-5 w-5", provider.color)} />
                <div>
                  <p className="font-medium">{provider.name}</p>
                  {connected && !accountHasError && (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </p>
                  )}
                  {connected && accountHasError && (
                    <div className="space-y-1">
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {account?.status === 'expired' ? 'Token Expired' : 'Sync Error'}
                      </p>
                      {account?.last_error && (
                        <p className="text-xs text-red-500 max-w-xs truncate" title={account.last_error}>
                          {account.last_error}
                        </p>
                      )}
                    </div>
                  )}
                  {provider.disabled && (
                    <p className="text-sm text-muted-foreground">{provider.disabledReason}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {connected && !accountHasError && !provider.disabled && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRefresh(provider.id)}
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                      {isRefreshing ? 'Syncing...' : 'Sync Now'}
                    </Button>
                    
                    {provider.id === 'telegram' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMigrateMessages(provider.id)}
                          disabled={isRefreshing}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <Send className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                          {isRefreshing ? 'Migrating...' : 'Migrate Messages'}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMigrateUserMessages(provider.id)}
                          disabled={isRefreshing}
                          className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        >
                          <Send className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                          {isRefreshing ? 'Migrating...' : 'Migrate Your Messages'}
                        </Button>
                      </>
                    )}
                  </>
                )}

                {connected && accountHasError && !provider.disabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mr-2" />
                    )}
                    {isConnecting ? 'Reconnecting...' : 'Reconnect'}
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
    </div>
  );
} 