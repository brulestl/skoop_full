'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useConnectedAccounts } from '@/hooks/useConnectedAccounts';

interface SyncTelegramButtonProps {
  onSyncComplete?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export default function SyncTelegramButton({ 
  onSyncComplete, 
  variant = 'outline',
  size = 'default',
  className = '' 
}: SyncTelegramButtonProps) {
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<{ success: boolean; message: string } | null>(null);
  const { isConnected } = useConnectedAccounts();

  const isConnectedToTelegram = isConnected('telegram');

  const syncTelegramMessages = async () => {
    if (!isConnectedToTelegram) {
      setLastResult({
        success: false,
        message: 'Please connect your Telegram account first'
      });
      return;
    }

    setSyncing(true);
    setLastResult(null);

    try {
      const response = await fetch('/api/sync/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setLastResult({
          success: true,
          message: data.message || 'Telegram messages synced successfully!'
        });
        
        // Notify dashboard to refresh bookmarks
        window.dispatchEvent(new CustomEvent('bookmarks-updated'));
        
        if (onSyncComplete) {
          onSyncComplete();
        }
      } else {
        setLastResult({
          success: false,
          message: data.error || 'Failed to sync Telegram messages'
        });
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: 'Network error occurred while syncing'
      });
    } finally {
      setSyncing(false);
    }
  };

  // Clear last result after 5 seconds
  if (lastResult) {
    setTimeout(() => setLastResult(null), 5000);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        onClick={syncTelegramMessages}
        disabled={syncing || !isConnectedToTelegram}
        variant={variant}
        size={size}
        className={className}
      >
        {syncing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            {isConnectedToTelegram ? 'Sync Telegram' : 'Connect Telegram First'}
          </>
        )}
      </Button>
      
      {lastResult && (
        <div className={`flex items-center gap-2 text-sm ${
          lastResult.success ? 'text-green-600' : 'text-red-600'
        }`}>
          {lastResult.success ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>{lastResult.message}</span>
        </div>
      )}
    </div>
  );
} 