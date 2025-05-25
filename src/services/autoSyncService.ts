import type { SyncSchedule, Provider } from '@/hooks/useUserSettings';

interface AutoSyncConfig {
  userId: string;
  schedule: SyncSchedule;
  enabledProviders: Provider[];
  lastSyncTime?: Date;
}

class AutoSyncService {
  private timers = new Map<string, NodeJS.Timeout>();
  private isRunning = false;
  private configs = new Map<string, AutoSyncConfig>();

  // Start the auto-sync service
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('Auto-sync service started');
  }

  // Stop the auto-sync service
  stop() {
    this.isRunning = false;
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.configs.clear();
    console.log('Auto-sync service stopped');
  }

  // Update user configuration
  updateUserConfig(userId: string, schedule: SyncSchedule, enabledProviders: Provider[]) {
    // Remove existing timer if any
    const existingTimer = this.timers.get(userId);
    if (existingTimer) {
      clearTimeout(existingTimer);
      this.timers.delete(userId);
    }

    // Update config
    this.configs.set(userId, {
      userId,
      schedule,
      enabledProviders,
      lastSyncTime: new Date()
    });

    // Schedule next sync if not manual
    if (schedule !== 'manual' && enabledProviders.length > 0) {
      this.scheduleUserSync(userId);
    }

    console.log(`Updated auto-sync config for user ${userId}: ${schedule} schedule, providers: ${enabledProviders.join(', ')}`);
  }

  // Remove user from auto-sync
  removeUser(userId: string) {
    const timer = this.timers.get(userId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(userId);
    }
    this.configs.delete(userId);
    console.log(`Removed user ${userId} from auto-sync`);
  }

  // Schedule sync for a specific user
  private scheduleUserSync(userId: string) {
    const config = this.configs.get(userId);
    if (!config || config.schedule === 'manual') return;

    const intervalMs = this.getIntervalMs(config.schedule);
    if (!intervalMs) return;

    const timer = setTimeout(async () => {
      await this.performUserSync(userId);
      // Schedule next sync
      this.scheduleUserSync(userId);
    }, intervalMs);

    this.timers.set(userId, timer);
    
    const nextSyncTime = new Date(Date.now() + intervalMs);
    console.log(`Scheduled next auto-sync for user ${userId} at ${nextSyncTime.toISOString()}`);
  }

  // Perform sync for a user
  private async performUserSync(userId: string) {
    const config = this.configs.get(userId);
    if (!config || !this.isRunning) return;

    console.log(`Performing auto-sync for user ${userId}...`);

    // Sync each enabled provider
    for (const provider of config.enabledProviders) {
      try {
        await this.syncProvider(userId, provider);
      } catch (error) {
        console.error(`Auto-sync failed for user ${userId}, provider ${provider}:`, error);
      }
    }

    // Update last sync time
    config.lastSyncTime = new Date();
  }

  // Sync a specific provider for a user
  private async syncProvider(userId: string, provider: Provider) {
    if (provider !== 'github') {
      console.log(`Auto-sync for ${provider} not implemented yet`);
      return;
    }

    try {
      // In a browser environment, we can't directly call the API
      // Instead, we'd need to send a message to the main thread or use a service worker
      // For now, we'll simulate the sync by making a fetch request
      
      const response = await fetch(`/api/sync/${provider}?sync_type=automatic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Auto-sync completed for user ${userId}, provider ${provider}: ${result.count} items`);
        
        // Dispatch event to update UI if on the same page
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auto-sync-completed', {
            detail: { userId, provider, result }
          }));
        }
      } else {
        const error = await response.json();
        console.error(`Auto-sync API error for user ${userId}, provider ${provider}:`, error);
      }
    } catch (error) {
      console.error(`Auto-sync network error for user ${userId}, provider ${provider}:`, error);
    }
  }

  // Get interval in milliseconds for a schedule
  private getIntervalMs(schedule: SyncSchedule): number | null {
    switch (schedule) {
      case '15min':
        return 15 * 60 * 1000; // 15 minutes
      case 'hourly':
        return 60 * 60 * 1000; // 1 hour  
      case 'daily':
        return 24 * 60 * 60 * 1000; // 24 hours
      default:
        return null;
    }
  }

  // Get status for debugging
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeUsers: this.configs.size,
      activeTimers: this.timers.size,
      configs: Array.from(this.configs.entries()).map(([userId, config]) => ({
        userId,
        schedule: config.schedule,
        enabledProviders: config.enabledProviders,
        lastSyncTime: config.lastSyncTime?.toISOString(),
        hasTimer: this.timers.has(userId)
      }))
    };
  }
}

// Global instance
export const autoSyncService = new AutoSyncService();

// Auto-start in browser environment
if (typeof window !== 'undefined') {
  autoSyncService.start();
}

export default autoSyncService; 