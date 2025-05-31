'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { comprehensiveSyncService } from '@/services/comprehensiveSyncService';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/hooks/useUserSettings';

interface RefreshAllBookmarksButtonProps {
  onSyncComplete?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

interface SyncResult {
  provider: string;
  success: boolean;
  count: number;
  error?: string;
}

interface SyncStatus {
  syncing: boolean;
  results: SyncResult[];
  totalSynced: number;
  errors: string[];
  message: string;
  success: boolean;
}

export default function RefreshAllBookmarksButton({ 
  onSyncComplete, 
  variant = 'outline',
  size = 'default',
  className = '' 
}: RefreshAllBookmarksButtonProps) {
  const { user } = useAuth();
  const { settings } = useUserSettings();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    syncing: false,
    results: [],
    totalSynced: 0,
    errors: [],
    message: '',
    success: false
  });

  // Initialize comprehensive sync service when user and settings are available
  useEffect(() => {
    if (user && settings) {
      comprehensiveSyncService.initialize(user.id, settings.sync_schedule);
    }
  }, [user, settings]);

  // Listen for comprehensive sync completion events
  useEffect(() => {
    const handleSyncComplete = (event: CustomEvent) => {
      const { results, totalSynced, errors, syncType } = event.detail;
      
      let message = '';
      if (totalSynced > 0) {
        message = `Successfully synced ${totalSynced} bookmarks from ${results.filter((r: SyncResult) => r.success).length} provider(s)`;
      } else if (errors.length > 0) {
        message = `Sync completed with ${errors.length} error(s)`;
      } else {
        message = 'No new bookmarks found';
      }

      setSyncStatus({
        syncing: false,
        results,
        totalSynced,
        errors,
        message,
        success: totalSynced > 0 || errors.length === 0
      });

      // Notify parent component
      if (onSyncComplete) {
        onSyncComplete();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('comprehensive-sync-completed', handleSyncComplete as EventListener);
      
      return () => {
        window.removeEventListener('comprehensive-sync-completed', handleSyncComplete as EventListener);
      };
    }
  }, [onSyncComplete]);

  const handleRefreshAll = async () => {
    if (!user) {
      setSyncStatus(prev => ({
        ...prev,
        message: 'Please log in to sync bookmarks',
        success: false
      }));
      return;
    }

    setSyncStatus(prev => ({
      ...prev,
      syncing: true,
      message: 'Checking connected accounts...',
      errors: [],
      results: []
    }));

    try {
      // Get connected providers first
      const connectedProviders = await comprehensiveSyncService.getConnectedProviders();
      
      if (connectedProviders.length === 0) {
        setSyncStatus(prev => ({
          ...prev,
          syncing: false,
          message: 'No connected accounts found. Please connect your accounts first.',
          success: false
        }));
        return;
      }

      setSyncStatus(prev => ({
        ...prev,
        message: `Starting sync for ${connectedProviders.length} connected provider(s)...`
      }));

      // Perform comprehensive sync
      const result = await comprehensiveSyncService.syncAllBookmarks('manual');
      
      // The sync completion will be handled by the event listener
      // But we also update status here in case the event doesn't fire
      if (!result.success && result.errors.length > 0) {
        setSyncStatus(prev => ({
          ...prev,
          syncing: false,
          message: result.errors[0] || 'Sync failed',
          success: false,
          errors: result.errors
        }));
      }

    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        syncing: false,
        message: error instanceof Error ? error.message : 'Sync failed',
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }));
    }
  };

  // Clear status message after 5 seconds
  useEffect(() => {
    if (syncStatus.message && !syncStatus.syncing) {
      const timeout = setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, message: '' }));
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [syncStatus.message, syncStatus.syncing]);

  const getButtonText = () => {
    if (syncStatus.syncing) {
      return 'Syncing...';
    }
    return 'Refresh Bookmarks';
  };

  const getButtonIcon = () => {
    if (syncStatus.syncing) {
      return <Loader2 className="h-4 w-4 mr-2 animate-spin" />;
    }
    return <RefreshCw className="h-4 w-4 mr-2" />;
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        onClick={handleRefreshAll}
        disabled={syncStatus.syncing || !user}
        variant={variant}
        size={size}
        className={className}
      >
        {getButtonIcon()}
        {getButtonText()}
      </Button>
      
      {syncStatus.message && (
        <div className="flex flex-col gap-1 text-sm max-w-md">
          <div className={`flex items-center gap-2 ${
            syncStatus.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {syncStatus.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{syncStatus.message}</span>
          </div>
          
          {/* Show detailed results if available */}
          {syncStatus.results.length > 0 && (
            <div className="text-xs text-muted-foreground mt-1 space-y-1">
              {syncStatus.results.map((result, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="capitalize">{result.provider}:</span>
                  {result.success ? (
                    <span className="text-green-600">
                      {result.count} items synced
                    </span>
                  ) : (
                    <span className="text-red-600">
                      {result.error || 'Failed'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 