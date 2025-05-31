"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, Upload, MessageSquare, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DebugData {
  bookmarks_raw_count: number;
  bookmarks_count: number;
  recent_raw: any[];
  recent_bookmarks: any[];
  connected_account: any;
  upload_logs: string[];
}

export default function TelegramBookmarksDebug() {
  const { user, isAuthenticated } = useAuth();
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [realTimeLogs, setRealTimeLogs] = useState<string[]>([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setRealTimeLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 99)]);
  };

  const fetchDebugData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    addLog('🔍 Starting debug data fetch...');

    try {
      // Get bookmarks_raw count
      const { count: rawCount, error: rawCountError } = await supabase
        .from('bookmarks_raw')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('source', 'telegram');

      if (rawCountError) {
        addLog(`❌ Error counting bookmarks_raw: ${rawCountError.message}`);
      } else {
        addLog(`📊 Found ${rawCount || 0} rows in bookmarks_raw`);
      }

      // Get bookmarks count
      const { count: bookmarksCount, error: bookmarksCountError } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('source', 'telegram');

      if (bookmarksCountError) {
        addLog(`❌ Error counting bookmarks: ${bookmarksCountError.message}`);
      } else {
        addLog(`📋 Found ${bookmarksCount || 0} rows in bookmarks`);
      }

      // Get recent raw data
      const { data: recentRaw, error: recentRawError } = await supabase
        .from('bookmarks_raw')
        .select('*')
        .eq('user_id', user.id)
        .eq('source', 'telegram')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentRawError) {
        addLog(`❌ Error fetching recent raw: ${recentRawError.message}`);
      }

      // Get recent bookmarks
      const { data: recentBookmarks, error: recentBookmarksError } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .eq('source', 'telegram')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentBookmarksError) {
        addLog(`❌ Error fetching recent bookmarks: ${recentBookmarksError.message}`);
      }

      // Get connected account - handle multiple or no results gracefully
      const { data: connectedAccounts, error: accountError } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('provider', 'telegram');

      let connectedAccount = null;
      if (accountError) {
        addLog(`❌ Error fetching connected accounts: ${accountError.message}`);
      } else if (!connectedAccounts || connectedAccounts.length === 0) {
        addLog(`📝 No telegram account connected`);
      } else if (connectedAccounts.length > 1) {
        addLog(`⚠️ Multiple telegram accounts found (${connectedAccounts.length}), using first one`);
        connectedAccount = connectedAccounts[0];
      } else {
        addLog(`✅ Found telegram account connection`);
        connectedAccount = connectedAccounts[0];
      }

      setDebugData({
        bookmarks_raw_count: rawCount || 0,
        bookmarks_count: bookmarksCount || 0,
        recent_raw: recentRaw || [],
        recent_bookmarks: recentBookmarks || [],
        connected_account: connectedAccount,
        upload_logs: []
      });

      addLog('✅ Debug data fetch completed');

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      addLog(`💥 Fatal error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const testUpload = async () => {
    addLog('🧪 Starting test upload...');
    
    // Create a minimal test JSON export
    const testExport = {
      messages: [
        {
          id: Date.now(),
          date: Date.now() / 1000,
          text: `Test message ${Date.now()}`,
          webpage: {
            url: `https://example.com/test-${Date.now()}`
          }
        },
        {
          id: Date.now() + 1,
          date: Date.now() / 1000,
          text: `Test message without URL ${Date.now()}`
        }
      ]
    };

    const blob = new Blob([JSON.stringify(testExport)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('export', blob, 'test-export.json');

    try {
      addLog('📤 Sending test export to upload endpoint...');
      
      // Get fresh session for authorization
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        addLog(`❌ Session error: ${sessionError.message}`);
        return;
      }
      
      if (!session) {
        addLog(`❌ No active session - please log in again`);
        return;
      }
      
      addLog(`🔑 Using session token: ${session.access_token.substring(0, 20)}...`);
      
      const response = await fetch('/api/upload/telegram-export', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        addLog(`✅ Upload successful: ${JSON.stringify(result)}`);
        addLog(`📈 Inserted ${result.inserted || 0} messages`);
        // Refresh debug data
        setTimeout(() => fetchDebugData(), 1000);
      } else {
        addLog(`❌ Upload failed: ${response.status} - ${JSON.stringify(result)}`);
        if (response.status === 401) {
          addLog(`🔐 Authorization failed - token may be expired`);
        }
      }

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload error';
      addLog(`💥 Upload error: ${errorMsg}`);
    }
  };

  const testTelegramSync = async () => {
    addLog('📡 Testing telegram sync endpoint...');
    
    try {
      // Get session for direct edge function call
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        addLog(`❌ Session error: ${sessionError.message}`);
        return;
      }
      
      if (!session) {
        addLog(`❌ No active session - please log in again`);
        return;
      }

      addLog('📡 Calling /api/sync/telegram route...');
      
      const response = await fetch('/api/sync/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        addLog(`✅ Sync successful: ${JSON.stringify(result)}`);
        if (result.count) {
          addLog(`📈 Synced ${result.count} messages`);
        }
      } else if (response.status === 409) {
        addLog(`⚠️ Sync blocked: ${result.error} (Expected - no session string)`);
      } else {
        addLog(`❌ Sync failed: ${response.status} - ${JSON.stringify(result)}`);
      }
      
      // Refresh debug data
      setTimeout(() => fetchDebugData(), 1000);

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Sync error';
      addLog(`💥 Sync error: ${errorMsg}`);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDebugData();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <span>Please log in to access telegram debug tools</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Telegram Bookmarks Debug</h1>
        <div className="flex gap-2">
          <Button onClick={fetchDebugData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button onClick={testUpload} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Test Upload
          </Button>
          <Button onClick={testTelegramSync} variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Test Sync
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Real-time Logs */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">Live Debug Logs</h2>
        <div className="h-48 overflow-y-auto font-mono text-sm space-y-1">
          {realTimeLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
          {realTimeLogs.length === 0 && (
            <div className="text-gray-500">No logs yet...</div>
          )}
        </div>
      </div>

      {/* Debug Data Display */}
      {debugData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Counts Summary */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Counts
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>bookmarks_raw (telegram):</span>
                <span className="font-mono font-bold">{debugData.bookmarks_raw_count}</span>
              </div>
              <div className="flex justify-between">
                <span>bookmarks (telegram):</span>
                <span className="font-mono font-bold">{debugData.bookmarks_count}</span>
              </div>
              <div className="pt-2 border-t">
                <div className={`text-sm ${
                  debugData.bookmarks_count === 0 && debugData.bookmarks_raw_count > 0 
                    ? 'text-red-600' 
                    : debugData.bookmarks_count > 0 
                    ? 'text-green-600' 
                    : 'text-gray-600'
                }`}>
                  {debugData.bookmarks_count === 0 && debugData.bookmarks_raw_count > 0 
                    ? '⚠️ Raw data exists but no bookmarks - check for URL conflicts'
                    : debugData.bookmarks_count > 0 
                    ? '✅ Data is flowing correctly'
                    : '📭 No data yet'}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Account */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Connected Account</h2>
            {debugData.connected_account ? (
              <div className="space-y-2 text-sm">
                <div>Status: <span className="font-mono">{debugData.connected_account.status}</span></div>
                <div>Provider: <span className="font-mono">{debugData.connected_account.provider}</span></div>
                <div>Connected: <span className="font-mono">
                  {new Date(debugData.connected_account.connected_at).toLocaleString()}
                </span></div>
                <div>Has Session: <span className="font-mono">
                  {debugData.connected_account.telegram_session_string ? 'Yes' : 'No'}
                </span></div>
                {debugData.connected_account.last_sync_message_id && (
                  <div>Last Sync ID: <span className="font-mono">{debugData.connected_account.last_sync_message_id}</span></div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">No telegram account connected</div>
            )}
          </div>

          {/* Recent Raw Data */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent bookmarks_raw</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {debugData.recent_raw.map((item, index) => (
                <div key={index} className="text-xs bg-gray-50 p-2 rounded border">
                  <div><strong>ID:</strong> {item.provider_item_id}</div>
                  <div><strong>Text:</strong> {item.text?.substring(0, 50)}...</div>
                  <div><strong>URL:</strong> {item.url || 'null'}</div>
                  <div><strong>Created:</strong> {new Date(item.created_at).toLocaleString()}</div>
                </div>
              ))}
              {debugData.recent_raw.length === 0 && (
                <div className="text-gray-500">No raw data</div>
              )}
            </div>
          </div>

          {/* Recent Bookmarks */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent bookmarks</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {debugData.recent_bookmarks.map((item, index) => (
                <div key={index} className="text-xs bg-gray-50 p-2 rounded border">
                  <div><strong>ID:</strong> {item.provider_item_id}</div>
                  <div><strong>Title:</strong> {item.title?.substring(0, 50)}...</div>
                  <div><strong>URL:</strong> {item.url || 'null'}</div>
                  <div><strong>Created:</strong> {new Date(item.created_at).toLocaleString()}</div>
                </div>
              ))}
              {debugData.recent_bookmarks.length === 0 && (
                <div className="text-gray-500">No bookmarks</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SQL Commands for Manual Testing */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Manual SQL Queries</h2>
        <div className="space-y-2 text-sm font-mono bg-white p-4 rounded border">
          <div>-- Check raw telegram data:</div>
          <div className="text-blue-600">SELECT COUNT(*) FROM bookmarks_raw WHERE source = 'telegram';</div>
          <div className="mt-2">-- Check bookmarks data:</div>
          <div className="text-blue-600">SELECT COUNT(*) FROM bookmarks WHERE source = 'telegram';</div>
          <div className="mt-2">-- Check recent messages:</div>
          <div className="text-blue-600">SELECT provider_item_id, text, url, created_at FROM bookmarks WHERE source = 'telegram' ORDER BY created_at DESC LIMIT 5;</div>
        </div>
      </div>
    </div>
  );
} 