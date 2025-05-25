'use client';

import { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import type { Provider as SupabaseProvider } from '@supabase/supabase-js';

export type Provider = 'github' | 'twitter' | 'reddit' | 'stack' | 'azure' | 'discord' | 'gitlab' | 'linkedin' | 'notion' | 'twitch' | 'telegram';

interface ConnectedAccount {
  id: string;
  user_id: string;
  provider: Provider;
  access_token: string;
  refresh_token?: string;
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
    setConnecting(provider);
    
    try {
      // Use the current origin, but ensure we're using the right port
      const currentOrigin = window.location.origin;
      const redirectTo = `${currentOrigin}/auth/callback?provider=${provider}`;
      
      console.log('Starting OAuth flow for provider:', provider);
      console.log('Redirect URL:', redirectTo);
      
      // Map our provider types to Supabase OAuth provider types
      let oauthProvider: 'github' | 'google' | 'twitter' | 'azure' | 'discord' | 'gitlab' | 'linkedin' | 'notion' | 'twitch';
      switch (provider) {
        case 'github':
          oauthProvider = 'github';
          break;
        case 'twitter':
          oauthProvider = 'twitter';
          break;
        case 'azure':
          oauthProvider = 'azure';
          break;
        case 'discord':
          oauthProvider = 'discord';
          break;
        case 'gitlab':
          oauthProvider = 'gitlab';
          break;
        case 'linkedin':
          oauthProvider = 'linkedin';
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
        case 'telegram':
          // Telegram OAuth needs special handling
          setConnecting(null);
          throw new Error('Telegram OAuth coming soon! Please use other providers for now.');
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
      twitter: 'tweet.read,users.read,like.read',
      reddit: 'read,history,identity',
      stack: 'read_inbox,no_expiry',
      azure: 'openid,profile,email',
      discord: 'identify,email',
      gitlab: 'read_user,read_repository',
      linkedin: 'r_liteprofile,r_emailaddress',
      notion: 'read',
      twitch: 'user:read:email',
      telegram: 'read'
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