import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type SyncSchedule = '15min' | 'hourly' | 'daily' | 'manual';
export type Provider = 'github' | 'twitter' | 'reddit' | 'stack';

export interface UserSettings {
  id: string;
  user_id: string;
  sync_schedule: SyncSchedule;
  enabled_providers: Provider[];
  notifications_enabled: boolean;
  last_updated: string;
  created_at: string;
}

export interface SyncHistoryEntry {
  id: string;
  user_id: string;
  provider: Provider;
  sync_type: 'manual' | 'automatic' | 'initial';
  status: 'success' | 'failed' | 'partial';
  items_synced: number;
  error_message?: string;
  started_at: string;
  completed_at?: string;
  created_at: string;
}

export function useUserSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [syncHistory, setSyncHistory] = useState<SyncHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user settings
  const fetchSettings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      
      // Try to get existing settings
      const { data: existingSettings, error: fetchError } = await (supabase as any)
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows
        console.error('Error fetching settings:', fetchError);
        setError(fetchError.message);
        return;
      }

      if (existingSettings) {
        setSettings(existingSettings);
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          user_id: user.id,
          sync_schedule: 'manual' as SyncSchedule,
          enabled_providers: ['github'] as Provider[],
          notifications_enabled: true,
        };

        const { data: newSettings, error: createError } = await (supabase as any)
          .from('user_settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) {
          console.error('Error creating settings:', createError);
          setError(createError.message);
        } else {
          setSettings(newSettings);
        }
      }
    } catch (err) {
      console.error('Exception fetching settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  // Fetch sync history
  const fetchSyncHistory = async () => {
    if (!user) return;

    try {
      const { data, error: historyError } = await (supabase as any)
        .from('sync_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (historyError) {
        console.error('Error fetching sync history:', historyError);
      } else {
        setSyncHistory(data || []);
      }
    } catch (err) {
      console.error('Exception fetching sync history:', err);
    }
  };

  // Update settings
  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user || !settings) {
      throw new Error('No user or settings loaded');
    }

    try {
      const { data, error: updateError } = await (supabase as any)
        .from('user_settings')
        .update({
          ...updates,
          last_updated: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating settings:', updateError);
        throw updateError;
      }

      setSettings(data);
      return data;
    } catch (err) {
      console.error('Exception updating settings:', err);
      throw err;
    }
  };

  // Log sync operation
  const logSyncOperation = async (
    provider: Provider,
    syncType: 'manual' | 'automatic' | 'initial',
    status: 'success' | 'failed' | 'partial',
    itemsSynced: number = 0,
    errorMessage?: string
  ) => {
    if (!user) return;

    try {
      const { error: logError } = await (supabase as any)
        .from('sync_history')
        .insert({
          user_id: user.id,
          provider,
          sync_type: syncType,
          status,
          items_synced: itemsSynced,
          error_message: errorMessage,
          completed_at: new Date().toISOString(),
        });

      if (logError) {
        console.error('Error logging sync operation:', logError);
      } else {
        // Refresh sync history
        await fetchSyncHistory();
      }
    } catch (err) {
      console.error('Exception logging sync operation:', err);
    }
  };

  // Check if auto-sync is enabled for a provider
  const isAutoSyncEnabled = (provider: Provider): boolean => {
    if (!settings) return false;
    return (
      settings.sync_schedule !== 'manual' &&
      settings.enabled_providers.includes(provider)
    );
  };

  // Get next sync time based on schedule
  const getNextSyncTime = (): Date | null => {
    if (!settings || settings.sync_schedule === 'manual') return null;

    const now = new Date();
    const lastUpdate = new Date(settings.last_updated);
    
    let intervalMs: number;
    switch (settings.sync_schedule) {
      case '15min':
        intervalMs = 15 * 60 * 1000; // 15 minutes
        break;
      case 'hourly':
        intervalMs = 60 * 60 * 1000; // 1 hour
        break;
      case 'daily':
        intervalMs = 24 * 60 * 60 * 1000; // 24 hours
        break;
      default:
        return null;
    }

    return new Date(lastUpdate.getTime() + intervalMs);
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  useEffect(() => {
    if (settings) {
      fetchSyncHistory();
    }
  }, [settings]);

  return {
    settings,
    syncHistory,
    loading,
    error,
    updateSettings,
    logSyncOperation,
    isAutoSyncEnabled,
    getNextSyncTime,
    refresh: fetchSettings,
  };
} 