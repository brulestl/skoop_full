import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type Provider = 'github' | 'twitter' | 'reddit' | 'stack';

export interface ConnectedAccount {
  id: string;
  user_id: string;
  provider: Provider;
  access_token: string;
  refresh_token?: string;
  created_at: string;
  updated_at: string;
}

export function useConnectedAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<Provider | null>(null);
  const { user } = useAuth();

  // Fetch connected accounts
  const fetchAccounts = async () => {
    if (!user) {
      setAccounts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await (supabase as any)
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching connected accounts:', error);
        return;
      }

      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Connect new account via OAuth
  const connectAccount = async (provider: Provider) => {
    setConnecting(provider);
    
    try {
      // Get OAuth provider mapping
      const providerMap = {
        github: 'github',
        twitter: 'twitter', 
        reddit: 'reddit',
        stack: 'stackoverflow' // Stack Overflow is 'stackoverflow' in Supabase
      } as const;

      const supabaseProvider = providerMap[provider];
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?provider=${provider}`,
          scopes: getProviderScopes(provider),
        }
      });

      if (error) {
        console.error('OAuth error:', error);
        throw error;
      }

      // The actual account connection happens in the callback handler
      return data;
    } catch (error) {
      console.error('Error connecting account:', error);
      throw error;
    } finally {
      setConnecting(null);
    }
  };

  // Disconnect account
  const disconnectAccount = async (provider: Provider) => {
    if (!user) return;

    try {
      const { error } = await (supabase as any)
        .from('connected_accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('provider', provider);

      if (error) {
        console.error('Error disconnecting account:', error);
        throw error;
      }

      // Refresh accounts list
      await fetchAccounts();
    } catch (error) {
      console.error('Error disconnecting account:', error);
      throw error;
    }
  };

  // Check if provider is connected
  const isConnected = (provider: Provider): boolean => {
    return accounts.some(account => account.provider === provider);
  };

  // Get connected account for provider
  const getAccount = (provider: Provider): ConnectedAccount | undefined => {
    return accounts.find(account => account.provider === provider);
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  return {
    accounts,
    loading,
    connecting,
    connectAccount,
    disconnectAccount,
    isConnected,
    getAccount,
    refetch: fetchAccounts
  };
}

// Helper function to get required scopes for each provider
function getProviderScopes(provider: Provider): string {
  const scopes = {
    github: 'read:user,repo,user:email',
    twitter: 'read,write',
    reddit: 'read,history,identity',
    stack: 'read_inbox,no_expiry'
  };

  return scopes[provider] || '';
} 