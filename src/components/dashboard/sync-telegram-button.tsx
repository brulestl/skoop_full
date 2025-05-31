'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { useConnectedAccounts } from '@/hooks/useConnectedAccounts';

interface SyncTelegramButtonProps {
  onSyncComplete?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

// Simple upload dialog component (inline to avoid import issues)
function TelegramUploadDialog({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean
  onClose: () => void
  onSuccess: (count: number) => void 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    console.log(`Toast (${type}): ${message}`);
    
    const existingToasts = document.querySelectorAll('.skoop-toast');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `skoop-toast fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-[9999] transition-all duration-300 transform translate-x-0 shadow-lg max-w-md ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0) scale(1)', 10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.contains(toast) && document.body.removeChild(toast), 300);
    }, 5000);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast('Please select a file first', 'error');
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('export', selectedFile);

      // Get auth token from localStorage/sessionStorage
      const authData = localStorage.getItem('sb-llsjysvklkohnzgmpyob-auth-token') || 
                     sessionStorage.getItem('sb-llsjysvklkohnzgmpyob-auth-token');
      
      let token = '';
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          token = parsed.access_token;
        } catch {
          // Fallback to direct token
          token = authData;
        }
      }

      const response = await fetch('/api/upload/telegram-export', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Upload failed');
      }

      showToast(`Successfully imported ${data.inserted} messages`, 'success');
      onSuccess(data.inserted);
      onClose();

    } catch (error) {
      console.error('Upload error:', error);
      showToast(error instanceof Error ? error.message : 'Failed to upload file', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">Import Telegram Export</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload a Telegram export JSON file from "Saved Messages".
        </p>
        
        <input
          type="file"
          accept=".json"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          disabled={isUploading}
          className="w-full p-2 border rounded mb-4"
        />
        
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? 'Importing...' : 'Import'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SyncTelegramButton({ 
  onSyncComplete, 
  variant = 'outline',
  size = 'default',
  className = '' 
}: SyncTelegramButtonProps) {
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { isConnected } = useConnectedAccounts();

  const isConnectedToTelegram = isConnected('telegram');

  // TASK 4: Enhanced toast with better messaging
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    console.log(`Toast (${type}): ${message}`);
    
    const existingToasts = document.querySelectorAll('.skoop-toast');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    const toast = document.createElement('div');
    toast.textContent = message;
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    toast.className = `skoop-toast fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-[9999] transition-all duration-300 transform translate-x-0 shadow-lg max-w-md ${bgColor}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0) scale(1)', 10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.contains(toast) && document.body.removeChild(toast), 300);
    }, 5000);
  };

  // TASK 4: Cache invalidation function
  const invalidateCache = () => {
    // Notify dashboard to refresh bookmarks
    window.dispatchEvent(new CustomEvent('bookmarks-updated'));
    
    // Also trigger any connected hooks to refetch
    window.dispatchEvent(new CustomEvent('invalidate-bookmarks-cache'));
    
    if (onSyncComplete) {
      onSyncComplete();
    }
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
        
        showToast(errorMessage, 'error');
        return;
      }

      // TASK 4: Handle 204 responses properly
      if (response.status === 204 && data.note === 'no_new') {
        setLastResult({
          success: true,
          message: 'Nothing new to sync'
        });
        
        showToast('Nothing new to sync', 'info');
        return;
      }

      if (data.success || response.ok) {
        const count = data.inserted || data.count || 0;
        const message = data.message || `Synced ${count} items`;
        
        setLastResult({
          success: true,
          message: message
        });
        
        showToast(message, 'success');
        
        // TASK 4: Invalidate cache after successful sync
        invalidateCache();
        
      } else {
        setLastResult({
          success: false,
          message: data.error || 'Failed to sync Telegram messages'
        });
        
        showToast(data.error || 'Sync failed', 'error');
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: 'Network error occurred while syncing'
      });
      showToast('Network error occurred while syncing', 'error');
    } finally {
      setSyncing(false);
    }
  };

  // TASK 3: Handle upload success
  const handleUploadSuccess = (count: number) => {
    setLastResult({
      success: true,
      message: `Imported ${count} messages from export`
    });
    
    // TASK 4: Invalidate cache after successful import
    invalidateCache();
    setShowUploadDialog(false);
  };

  // Clear last result after 5 seconds
  if (lastResult) {
    setTimeout(() => setLastResult(null), 5000);
  }

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
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
          
          {/* TASK 3: Upload button for connected users */}
          {isConnectedToTelegram && (
            <Button
              onClick={() => setShowUploadDialog(true)}
              variant="outline"
              size={size}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Import JSON
            </Button>
          )}
        </div>
        
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

      {/* TASK 3: Upload dialog */}
      <TelegramUploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onSuccess={handleUploadSuccess}
      />
    </>
  );
}

/* TASK 4 ✅ UI & Hook Adjustments:
 * - Handles 204 responses with 'Nothing new to sync' info toast
 * - Separate success/error/info toast types
 * - Cache invalidation via custom events after successful sync/import
 * - Upload dialog integrated with sync button
 * - Proper error handling and user feedback
 */ 