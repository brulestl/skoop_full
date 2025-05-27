'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type SyncSchedule = '15min' | 'hourly' | 'daily' | 'manual';
export type Provider = 'github' | 'twitter' | 'reddit' | 'stack';
export type EmbeddingModel = 'openai-text-embedding-3' | 'openai-text-embedding-ada-002' | 'skoop-local' | 'sentence-transformers';
export type AIModel = 'claude-bedrock' | 'azure-gpt-4o' | 'openai-gpt-4';
export type CacheDuration = '1day' | '1week' | '1month' | 'never';
export type ReEmbeddingSchedule = 'never' | 'weekly' | 'monthly' | 'quarterly';

export interface UserSettings {
  user_id: string;
  
  // Sync Settings
  sync_schedule: SyncSchedule;
  enabled_providers: string[];
  
  // Embedding Model Settings
  embedding_model: EmbeddingModel;
  vector_dimensions: number;
  re_embedding_schedule: ReEmbeddingSchedule;
  document_chunking_enabled: boolean;
  
  // AI Model Settings
  ai_model: AIModel;
  smart_search_enabled: boolean;
  
  // Performance Settings
  cache_size_mb: number;
  cache_duration: CacheDuration;
  background_sync_enabled: boolean;
  aggressive_prefetch_enabled: boolean;
  data_saving_mode_enabled: boolean;
  
  // Notification Settings
  notifications_enabled: boolean;
  sync_completed_notifications: boolean;
  new_content_recommendations: boolean;
  email_notifications_enabled: boolean;
  
  // Timestamps
  created_at: string;
  last_updated: string;
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
  const [updating, setUpdating] = useState(false);
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
      const { data: existingSettings, error: fetchError } = await supabase
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
        // Handle potential missing fields from old schema
        const dbSettings = existingSettings as any;
        const completeSettings: UserSettings = {
          user_id: dbSettings.user_id,
          sync_schedule: (dbSettings.sync_schedule || 'manual') as SyncSchedule,
          enabled_providers: dbSettings.enabled_providers || ['github'],
          embedding_model: (dbSettings.embedding_model || 'openai-text-embedding-3') as EmbeddingModel,
          vector_dimensions: dbSettings.vector_dimensions || 1536,
          re_embedding_schedule: (dbSettings.re_embedding_schedule || 'never') as ReEmbeddingSchedule,
          document_chunking_enabled: dbSettings.document_chunking_enabled ?? true,
          ai_model: (dbSettings.ai_model || 'claude-bedrock') as AIModel,
          smart_search_enabled: dbSettings.smart_search_enabled ?? true,
          cache_size_mb: dbSettings.cache_size_mb || 50,
          cache_duration: (dbSettings.cache_duration || '1week') as CacheDuration,
          background_sync_enabled: dbSettings.background_sync_enabled ?? true,
          aggressive_prefetch_enabled: dbSettings.aggressive_prefetch_enabled ?? false,
          data_saving_mode_enabled: dbSettings.data_saving_mode_enabled ?? false,
          notifications_enabled: dbSettings.notifications_enabled ?? true,
          sync_completed_notifications: dbSettings.sync_completed_notifications ?? true,
          new_content_recommendations: dbSettings.new_content_recommendations ?? false,
          email_notifications_enabled: dbSettings.email_notifications_enabled ?? true,
          created_at: dbSettings.created_at,
          last_updated: dbSettings.last_updated,
        };
        setSettings(completeSettings);
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          user_id: user.id,
          sync_schedule: 'manual' as SyncSchedule,
          enabled_providers: ['github'],
          embedding_model: 'openai-text-embedding-3' as EmbeddingModel,
          vector_dimensions: 1536,
          re_embedding_schedule: 'never' as ReEmbeddingSchedule,
          document_chunking_enabled: true,
          ai_model: 'claude-bedrock' as AIModel,
          smart_search_enabled: true,
          cache_size_mb: 50,
          cache_duration: '1week' as CacheDuration,
          background_sync_enabled: true,
          aggressive_prefetch_enabled: false,
          data_saving_mode_enabled: false,
          notifications_enabled: true,
          sync_completed_notifications: true,
          new_content_recommendations: false,
          email_notifications_enabled: true,
        };

        const { data: newSettings, error: createError } = await supabase
          .from('user_settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) {
          console.error('Error creating settings:', createError);
          setError(createError.message);
        } else {
          setSettings(newSettings as any);
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
      const { data, error: historyError } = await supabase
        .from('sync_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (historyError) {
        console.error('Error fetching sync history:', historyError);
      } else {
        setSyncHistory((data || []) as any);
      }
    } catch (err) {
      console.error('Exception fetching sync history:', err);
    }
  };

  // Update settings
  const updateSettings = async (updates: Partial<UserSettings>): Promise<boolean> => {
    if (!user || !settings) {
      setError('No user or settings loaded');
      return false;
    }

    setUpdating(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
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
        setError(updateError.message);
        return false;
      }

      setSettings(data as any);
      return true;
    } catch (err) {
      console.error('Exception updating settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  // Individual setting update functions
  const updateSyncSchedule = (schedule: SyncSchedule) => updateSettings({ sync_schedule: schedule });
  const updateEnabledProviders = (providers: string[]) => updateSettings({ enabled_providers: providers });
  const updateEmbeddingModel = (model: EmbeddingModel) => updateSettings({ embedding_model: model });
  const updateVectorDimensions = (dimensions: number) => updateSettings({ vector_dimensions: dimensions });
  const updateReEmbeddingSchedule = (schedule: ReEmbeddingSchedule) => updateSettings({ re_embedding_schedule: schedule });
  const updateDocumentChunking = (enabled: boolean) => updateSettings({ document_chunking_enabled: enabled });
  const updateAIModel = (model: AIModel) => updateSettings({ ai_model: model });
  const updateSmartSearch = (enabled: boolean) => updateSettings({ smart_search_enabled: enabled });
  const updateCacheSize = (sizeMb: number) => updateSettings({ cache_size_mb: sizeMb });
  const updateCacheDuration = (duration: CacheDuration) => updateSettings({ cache_duration: duration });
  const updateBackgroundSync = (enabled: boolean) => updateSettings({ background_sync_enabled: enabled });
  const updateAggressivePrefetch = (enabled: boolean) => updateSettings({ aggressive_prefetch_enabled: enabled });
  const updateDataSavingMode = (enabled: boolean) => updateSettings({ data_saving_mode_enabled: enabled });
  const updateNotifications = (enabled: boolean) => updateSettings({ notifications_enabled: enabled });
  const updateSyncCompletedNotifications = (enabled: boolean) => updateSettings({ sync_completed_notifications: enabled });
  const updateNewContentRecommendations = (enabled: boolean) => updateSettings({ new_content_recommendations: enabled });
  const updateEmailNotifications = (enabled: boolean) => updateSettings({ email_notifications_enabled: enabled });

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
      const { error: logError } = await supabase
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
    updating,
    error,
    updateSettings,
    // Individual update functions
    updateSyncSchedule,
    updateEnabledProviders,
    updateEmbeddingModel,
    updateVectorDimensions,
    updateReEmbeddingSchedule,
    updateDocumentChunking,
    updateAIModel,
    updateSmartSearch,
    updateCacheSize,
    updateCacheDuration,
    updateBackgroundSync,
    updateAggressivePrefetch,
    updateDataSavingMode,
    updateNotifications,
    updateSyncCompletedNotifications,
    updateNewContentRecommendations,
    updateEmailNotifications,
    // Utility functions
    logSyncOperation,
    isAutoSyncEnabled,
    getNextSyncTime,
    refresh: fetchSettings,
  };
} 