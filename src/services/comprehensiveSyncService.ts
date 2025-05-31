import type { SyncSchedule, Provider } from '@/hooks/useUserSettings';
import { supabase } from '@/lib/supabase';

interface SyncResult {
  provider: string;
  success: boolean;
  count: number;
  error?: string;
}

interface ComprehensiveSyncResult {
  results: SyncResult[];
  totalSynced: number;
  errors: string[];
  success: boolean;
}

class ComprehensiveSyncService {
  private isInitialized = false;
  private syncInProgress = false;
  private lastFullSyncTime: Date | null = null;
  private syncIntervalId: NodeJS.Timeout | null = null;
  private userId: string | null = null;

  // Initialize the service with user settings
  async initialize(userId: string, syncSchedule: SyncSchedule = 'manual') {
    this.userId = userId;
    this.isInitialized = true;
    
    // Clear any existing interval
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }

    // Set up automatic sync based on schedule
    if (syncSchedule !== 'manual') {
      this.setupAutomaticSync(syncSchedule);
    }

    console.log(`Comprehensive sync service initialized for user ${userId} with schedule: ${syncSchedule}`);
  }

  // Setup automatic sync based on user settings
  private setupAutomaticSync(schedule: SyncSchedule) {
    const intervals: Record<Exclude<SyncSchedule, 'manual'>, number> = {
      '15min': 15 * 60 * 1000,
      'hourly': 60 * 60 * 1000,
      'daily': 24 * 60 * 60 * 1000
    };

    if (schedule !== 'manual') {
      const intervalMs = intervals[schedule];
      if (intervalMs) {
        this.syncIntervalId = setInterval(() => {
          this.syncAllBookmarks('automatic');
        }, intervalMs);
        
        console.log(`Automatic sync scheduled every ${schedule}`);
      }
    }
  }

  // Check if this is the user's first time and needs initial sync
  async shouldPerformInitialSync(): Promise<boolean> {
    if (!this.userId) return false;

    try {
      // Check if user has any bookmarks
      const { count, error } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', this.userId);

      if (error) {
        console.error('Error checking initial sync status:', error);
        return false;
      }

      // If no bookmarks exist, this is first time
      return (count || 0) === 0;
    } catch (error) {
      console.error('Exception checking initial sync status:', error);
      return false;
    }
  }

  // Get list of connected providers
  async getConnectedProviders(): Promise<string[]> {
    if (!this.userId) return [];

    try {
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('provider')
        .eq('user_id', this.userId);

      if (error) {
        console.error('Error fetching connected providers:', error);
        return [];
      }

      return data?.map(account => account.provider) || [];
    } catch (error) {
      console.error('Exception fetching connected providers:', error);
      return [];
    }
  }

  // Sync all connected providers
  async syncAllBookmarks(syncType: 'manual' | 'automatic' | 'initial' = 'manual'): Promise<ComprehensiveSyncResult> {
    if (this.syncInProgress) {
      return {
        results: [],
        totalSynced: 0,
        errors: ['Sync already in progress'],
        success: false
      };
    }

    if (!this.userId) {
      return {
        results: [],
        totalSynced: 0,
        errors: ['User not initialized'],
        success: false
      };
    }

    this.syncInProgress = true;
    const results: SyncResult[] = [];
    const errors: string[] = [];
    let totalSynced = 0;

    try {
      console.log(`Starting comprehensive sync (type: ${syncType}) for user ${this.userId}`);

      // Get connected providers
      const connectedProviders = await this.getConnectedProviders();
      
      if (connectedProviders.length === 0) {
        errors.push('No connected accounts found');
        return { results, totalSynced, errors, success: false };
      }

      console.log(`Found connected providers: ${connectedProviders.join(', ')}`);

      // Sync each provider
      for (const provider of connectedProviders) {
        try {
          const result = await this.syncProvider(provider, syncType);
          results.push(result);
          
          if (result.success) {
            totalSynced += result.count;
          } else if (result.error) {
            errors.push(`${provider}: ${result.error}`);
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          results.push({
            provider,
            success: false,
            count: 0,
            error: errorMsg
          });
          errors.push(`${provider}: ${errorMsg}`);
        }
      }

      this.lastFullSyncTime = new Date();
      
      // Dispatch event to notify UI components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('comprehensive-sync-completed', {
          detail: { results, totalSynced, errors, syncType }
        }));
      }

      console.log(`Comprehensive sync completed. Total synced: ${totalSynced}, Errors: ${errors.length}`);

      return {
        results,
        totalSynced,
        errors,
        success: errors.length === 0 || totalSynced > 0
      };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Sync failed';
      errors.push(errorMsg);
      console.error('Comprehensive sync error:', error);
      
      return {
        results,
        totalSynced,
        errors,
        success: false
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  // Sync individual provider
  private async syncProvider(provider: string, syncType: 'manual' | 'automatic' | 'initial'): Promise<SyncResult> {
    try {
      console.log(`Syncing ${provider}...`);

      // Handle different provider endpoints
      let endpoint = `/api/sync/${provider}`;
      
      // Special handling for telegram which has its own endpoint
      if (provider === 'telegram') {
        endpoint = '/api/sync/telegram';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sync_type: syncType })
      });

      const data = await response.json();

      if (response.ok && data.success !== false) {
        return {
          provider,
          success: true,
          count: data.count || data.items_synced || 0,
        };
      } else {
        return {
          provider,
          success: false,
          count: 0,
          error: data.error || data.message || 'Sync failed'
        };
      }
    } catch (error) {
      return {
        provider,
        success: false,
        count: 0,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  // Update sync schedule
  updateSyncSchedule(schedule: SyncSchedule) {
    if (!this.isInitialized) return;

    // Clear existing interval
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }

    // Setup new schedule if not manual
    if (schedule !== 'manual') {
      this.setupAutomaticSync(schedule);
    }

    console.log(`Sync schedule updated to: ${schedule}`);
  }

  // Get sync status
  getSyncStatus() {
    return {
      initialized: this.isInitialized,
      syncInProgress: this.syncInProgress,
      lastFullSyncTime: this.lastFullSyncTime,
      hasAutomaticSync: this.syncIntervalId !== null,
      userId: this.userId
    };
  }

  // Cleanup
  destroy() {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
    this.isInitialized = false;
    this.userId = null;
    console.log('Comprehensive sync service destroyed');
  }
}

// Global instance
export const comprehensiveSyncService = new ComprehensiveSyncService();

export default comprehensiveSyncService; 