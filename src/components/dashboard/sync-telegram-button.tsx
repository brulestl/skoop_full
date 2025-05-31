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

  // Custom toast implementation matching the pattern used in other components
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    console.log(`Toast (${type}): ${message}`);
    
    // Remove any existing toasts first
    const existingToasts = document.querySelectorAll('.skoop-toast');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `skoop-toast fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-[9999] transition-all duration-300 transform translate-x-0 shadow-lg max-w-md ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0) scale(1)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px) scale(0.95)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 5000);
  };

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

      // TASK M-SESSION: Handle 409 status for missing session
      if (response.status === 409 && data.error === 'no_session') {
        const errorMessage = 'Telegram setup incomplete – upload session string';
        
        setLastResult({
          success: false,
          message: errorMessage
        });
        
        // Show toast notification
        showToast(errorMessage, 'error');
        
        return;
      }

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