'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Search, User, Key, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface TelegramAccount {
  user_id: string;
  provider: string;
  telegram_session_string: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

interface SupportRequest {
  id: string;
  user_id: string;
  user_email: string;
  request_type: string;
  request_data: {
    sessionString: string;
    userAgent?: string;
    timestamp: string;
  };
  status: string;
  created_at: string;
  admin_notes?: string;
}

export default function TelegramAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [telegramAccounts, setTelegramAccounts] = useState<TelegramAccount[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sessionString, setSessionString] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const supabase = createClientComponentClient();

  // Check if current user is admin
  useEffect(() => {
    checkAdminStatus();
    loadTelegramAccounts();
    loadSupportRequests();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please log in to access admin panel' });
        return;
      }

      // Check if user is admin (you can customize this logic)
      const adminEmails = ['admin@skoop.pro', 'support@skoop.pro', 'fjankovic@gmail.com']; // Add your admin emails
      const isUserAdmin = adminEmails.includes(user.email || '');
      
      if (!isUserAdmin) {
        setMessage({ type: 'error', text: 'Access denied. Admin privileges required.' });
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setMessage({ type: 'error', text: 'Error checking permissions' });
    }
  };

  const loadTelegramAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('provider', 'telegram');

      if (error) throw error;
      setTelegramAccounts(data || []);
    } catch (error) {
      console.error('Error loading Telegram accounts:', error);
      setMessage({ type: 'error', text: 'Failed to load Telegram accounts' });
    }
  };

  const loadSupportRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('support_requests')
        .select('*')
        .eq('request_type', 'telegram_session')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupportRequests(data || []);
    } catch (error) {
      console.error('Error loading support requests:', error);
      setMessage({ type: 'error', text: 'Failed to load support requests' });
    }
  };

  const searchUsers = async () => {
    if (!searchEmail.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchEmail }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setUsers(data.users || []);
      
      if (data.note) {
        setMessage({ type: 'error', text: data.note });
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to search users' });
    } finally {
      setLoading(false);
    }
  };

  const addSessionString = async () => {
    if (!selectedUser || !sessionString.trim()) {
      setMessage({ type: 'error', text: 'Please select a user and enter a session string' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('connected_accounts')
        .upsert({
          user_id: selectedUser.id,
          provider: 'telegram',
          telegram_session_string: sessionString.trim(),
          status: 'active',
          connected_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,provider'
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Telegram session added successfully!' });
      setSessionString('');
      setSelectedUser(null);
      loadTelegramAccounts();
    } catch (error) {
      console.error('Error adding session:', error);
      setMessage({ type: 'error', text: 'Failed to add session string' });
    } finally {
      setLoading(false);
    }
  };

  const removeSession = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this Telegram session?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('connected_accounts')
        .delete()
        .eq('user_id', userId)
        .eq('provider', 'telegram');

      if (error) throw error;

      setMessage({ type: 'success', text: 'Telegram session removed successfully!' });
      loadTelegramAccounts();
    } catch (error) {
      console.error('Error removing session:', error);
      setMessage({ type: 'error', text: 'Failed to remove session' });
    } finally {
      setLoading(false);
    }
  };

  const processRequest = async (requestId: string, sessionString: string, userEmail: string) => {
    setLoading(true);
    try {
      // Find user by email
      const response = await fetch('/api/admin/users/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const searchData = await response.json();
      const user = searchData.users?.find((u: User) => u.email === userEmail);

      if (!user) {
        throw new Error('User not found');
      }

      // Add session string to connected_accounts
      const { error: accountError } = await supabase
        .from('connected_accounts')
        .upsert({
          user_id: user.id,
          provider: 'telegram',
          telegram_session_string: sessionString,
          status: 'active',
          connected_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,provider'
        });

      if (accountError) throw accountError;

      // Update support request status
      const { error: updateError } = await supabase
        .from('support_requests')
        .update({
          status: 'completed',
          processed_at: new Date().toISOString(),
          admin_notes: 'Session string processed and account activated'
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      setMessage({ type: 'success', text: 'Request processed successfully!' });
      loadSupportRequests();
      loadTelegramAccounts();
    } catch (error) {
      console.error('Error processing request:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to process request' });
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId: string, reason: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('support_requests')
        .update({
          status: 'rejected',
          processed_at: new Date().toISOString(),
          admin_notes: reason
        })
        .eq('id', requestId);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Request rejected' });
      loadSupportRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      setMessage({ type: 'error', text: 'Failed to reject request' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6">
        <div className={`p-4 rounded border ${message?.type === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{message?.text || 'Checking permissions...'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Telegram Admin Panel</h1>
        <span className="px-3 py-1 bg-gray-100 rounded text-sm">Admin Access</span>
      </div>

      {message && (
        <div className={`p-4 rounded border ${
          message.type === 'error' 
            ? 'border-red-300 bg-red-50 text-red-700' 
            : 'border-green-300 bg-green-50 text-green-700'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* User Search Section */}
      <div className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Add Telegram Session
        </h2>
        <p className="text-gray-600 mb-4">Search for a user and add their Telegram session string</p>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
              className="flex-1 px-3 py-2 border rounded"
            />
            <Button onClick={searchUsers} disabled={loading}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {users.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Search Results:</h4>
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.email}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{user.id.slice(0, 8)}...</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedUser && (
            <div className="space-y-3 p-4 border rounded bg-gray-50">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">Selected: {selectedUser.email}</span>
              </div>
              
              <textarea
                placeholder="Paste Telegram session string here..."
                value={sessionString}
                onChange={(e) => setSessionString(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded"
              />
              
              <Button onClick={addSessionString} disabled={loading || !sessionString.trim()}>
                <Key className="h-4 w-4 mr-2" />
                Add Session String
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Existing Telegram Accounts */}
      <div className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Telegram Accounts</h2>
        <p className="text-gray-600 mb-4">Manage existing Telegram connections ({telegramAccounts.length} total)</p>
        
        {telegramAccounts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No Telegram accounts found</p>
        ) : (
          <div className="space-y-3">
            {telegramAccounts.map((account) => (
              <div key={account.user_id} className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">User ID: {account.user_id.slice(0, 8)}...</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                      }`}>
                        {account.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Session: {account.telegram_session_string ? 'Present' : 'Missing'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Connected: {new Date(account.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSession(account.user_id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Support Requests */}
      <div className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Support Requests</h2>
        <p className="text-gray-600 mb-4">Manage support requests</p>
        
        {supportRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No support requests found</p>
        ) : (
          <div className="space-y-3">
            {supportRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">User Email: {request.user_email}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Request Type: {request.request_type}
                    </div>
                    <div className="text-sm text-gray-500">
                      Request Data: {JSON.stringify(request.request_data)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Status: {request.status}
                    </div>
                  </div>
                  
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => processRequest(request.id, request.request_data.sessionString, request.user_email)}
                      disabled={loading}
                    >
                      Process
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rejectRequest(request.id, 'Reason for rejection')}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Setup Instructions for Users</h2>
        <div className="text-sm space-y-2">
          <p><strong>1.</strong> User creates Telegram app at https://my.telegram.org/apps</p>
          <p><strong>2.</strong> User generates session string using the provided script</p>
          <p><strong>3.</strong> User contacts support with their email and session string</p>
          <p><strong>4.</strong> Admin (you) adds the session string using this panel</p>
          <p><strong>5.</strong> User can now sync their Telegram saved messages</p>
        </div>
      </div>
    </div>
  );
} 