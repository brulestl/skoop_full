'use client';

import { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import type { Provider as SupabaseProvider } from '@supabase/supabase-js';

export type Provider = 'github' | 'twitter' | 'reddit' | 'stack' | 'azure' | 'discord' | 'gitlab' | 'linkedin' | 'notion' | 'twitch' | 'telegram' | 'facebook';

interface ConnectedAccount {
  user_id: string;
  provider: Provider;
  access_token: string;
  refresh_token?: string;
  status: 'active' | 'error' | 'expired';
  last_error?: string;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export function useConnectedAccounts() {
  const { supabaseClient, session } = useSessionContext();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<Provider | null>(null);

  // Fetch connected accounts
  const fetchAccounts = async () => {
    if (!session?.user) {
      setAccounts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await (supabaseClient as any)
        .from('connected_accounts')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching connected accounts:', error);
        setAccounts([]);
      } else {
        setAccounts(data || []);
      }
    } catch (error) {
      console.error('Exception fetching connected accounts:', error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  // Connect account via OAuth
  const connectAccount = async (provider: Provider) => {
    // Check if this provider is already connected
    if (isConnected(provider)) {
      throw new Error(`${provider} account is already connected. Please disconnect it first if you want to reconnect.`);
    }

    setConnecting(provider);
    
    try {
      // Use custom token exchange for supported providers
      if (provider === 'github' || provider === 'twitter' || provider === 'linkedin' || provider === 'facebook' || provider === 'telegram') {
        console.log(`Starting custom OAuth flow for provider: ${provider}`);
        
        // Open popup window for OAuth
        const popup = window.open(
          `/api/oauth/${provider}/start`,
          '_blank',
          'width=520,height=680,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          throw new Error('Popup blocked. Please allow popups for this site and try again.');
        }

        // Check if popup actually opened (some browsers return a window object even when blocked)
        try {
          if (popup.closed) {
            throw new Error('Popup was blocked or failed to open. Please check your browser settings.');
          }
        } catch (e) {
          // Some browsers throw an error when accessing popup.closed if blocked
          throw new Error('Popup blocked. Please allow popups for this site and try again.');
        }

        // Wait for popup to close or receive success message
        const result = await waitForWindowClose(popup);
        
        if (result.success) {
          // Refresh accounts list
          await fetchAccounts();
          console.log(`Successfully connected ${provider} account`);
        } else {
          throw new Error(result.error || `Failed to connect ${provider} account`);
        }
        
        setConnecting(null);
        return;
      }

      // Fallback to original Supabase OAuth for other providers
      const currentOrigin = window.location.origin;
      const redirectTo = `${currentOrigin}/auth/callback?provider=${provider}`;
      
      console.log('Starting OAuth flow for provider:', provider);
      console.log('Redirect URL:', redirectTo);
      
      // Map our provider types to Supabase OAuth provider types
      let oauthProvider: 'github' | 'google' | 'twitter' | 'azure' | 'discord' | 'gitlab' | 'linkedin' | 'notion' | 'twitch';
      switch (provider) {
        case 'azure':
          oauthProvider = 'azure';
          break;
        case 'discord':
          oauthProvider = 'discord';
          break;
        case 'gitlab':
          oauthProvider = 'gitlab';
          break;
        case 'notion':
          oauthProvider = 'notion';
          break;
        case 'twitch':
          oauthProvider = 'twitch';
          break;
        case 'reddit':
          // Reddit OAuth needs to be handled via custom redirect
          setConnecting(null);
          throw new Error('Reddit OAuth coming soon! Please use GitHub or Twitter for now.');
        case 'stack':
          oauthProvider = 'google'; // Stack Overflow uses Google OAuth
          break;
        default:
          setConnecting(null);
          throw new Error(`Unsupported provider: ${provider}`);
      }
      
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: oauthProvider,
        options: {
          redirectTo,
          scopes: getProviderScopes(provider),
          queryParams: {
            provider: provider, // Pass provider as query param
            access_type: 'offline', // Request refresh token
            prompt: 'consent' // Force fresh permissions
          }
        }
      });

      if (error) {
        console.error('OAuth error:', error);
        setConnecting(null);
        throw error;
      }

      console.log('OAuth initiated successfully:', data);
      // The redirect happens automatically, no need to handle data here
      // Don't reset connecting state here as the redirect will happen
    } catch (error) {
      console.error('Failed to connect account:', error);
      setConnecting(null);
      throw error;
    }
  };

  // Helper function to wait for popup window to close
  const waitForWindowClose = (popup: Window): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      let resolved = false;
      
      const cleanup = () => {
        if (checkClosed) clearInterval(checkClosed);
        if (timeout) clearTimeout(timeout);
        window.removeEventListener('message', messageHandler);
      };

      const resolveOnce = (result: { success: boolean; error?: string }) => {
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve(result);
      };

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          console.log('OAuth popup closed by user');
          resolveOnce({ success: false, error: 'OAuth cancelled by user' });
        }
      }, 1000);

      // Listen for messages from popup
      const messageHandler = (event: MessageEvent) => {
        // Validate origin for security
        if (event.origin !== window.location.origin) {
          console.warn('Received message from invalid origin:', event.origin);
          return;
        }
        
        console.log('Received OAuth message:', event.data);
        
        if (event.data.type === 'oauth_success') {
          console.log(`OAuth success for provider: ${event.data.provider}`);
          popup.close();
          resolveOnce({ success: true });
        } else if (event.data.type === 'oauth_error') {
          console.error(`OAuth error for provider ${event.data.provider}:`, event.data.error);
          popup.close();
          resolveOnce({ success: false, error: event.data.error });
        }
      };

      window.addEventListener('message', messageHandler);

      // Timeout after 5 minutes
      const timeout = setTimeout(() => {
        console.warn('OAuth popup timeout after 5 minutes');
        if (!popup.closed) {
          popup.close();
        }
        resolveOnce({ success: false, error: 'OAuth timeout - please try again' });
      }, 300000);
    });
  };

  // Disconnect account
  const disconnectAccount = async (provider: Provider) => {
    if (!session?.user) {
      throw new Error('No user session');
    }

    try {
      const { error } = await (supabaseClient as any)
        .from('connected_accounts')
        .delete()
        .eq('user_id', session.user.id)
        .eq('provider', provider);

      if (error) {
        console.error('Error disconnecting account:', error);
        throw error;
      }

      // Refresh the accounts list
      await fetchAccounts();
    } catch (error) {
      console.error('Failed to disconnect account:', error);
      throw error;
    }
  };

  // Check if provider is connected
  const isConnected = (provider: Provider): boolean => {
    return accounts.some(account => account.provider === provider);
  };

  // Get account for provider
  const getAccount = (provider: Provider): ConnectedAccount | null => {
    return accounts.find(account => account.provider === provider) || null;
  };

  // Get OAuth scopes for each provider
  const getProviderScopes = (provider: Provider): string => {
    const scopes = {
      github: 'read:user,repo,user:email',
      twitter: 'tweet.read,users.read,like.read,bookmark.read,offline.access',
      reddit: 'read,history,identity',
      stack: 'read_inbox,no_expiry',
      azure: 'openid,profile,email',
      discord: 'identify,email',
      gitlab: 'read_user,read_repository',
      linkedin: 'r_liteprofile,r_emailaddress',
      notion: 'read',
      twitch: 'user:read:email',
      telegram: 'read',
      facebook: 'email'
    };
    return scopes[provider] || '';
  };

  // Fetch accounts on mount and when session changes
  useEffect(() => {
    fetchAccounts();
  }, [session]);

  return {
    accounts,
    loading,
    connecting,
    fetchAccounts,
    connectAccount,
    disconnectAccount,
    isConnected,
    getAccount
  };
} 