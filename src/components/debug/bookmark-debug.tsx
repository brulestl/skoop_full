'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function BookmarkDebug() {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchDebugInfo = async () => {
    setLoading(true);
    try {
      const info: any = {
        authUser: user,
        timestamp: new Date().toISOString()
      };

      if (user) {
        // Check if user exists in users table
        const { data: userProfile, error: userError } = await (supabase as any)
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        info.userProfile = userProfile;
        info.userProfileError = userError;

        // Get all bookmarks in the database (to see if there are any)
        const { data: allBookmarks, error: allBookmarksError } = await (supabase as any)
          .from('bookmarks')
          .select('*')
          .limit(10);

        info.allBookmarks = allBookmarks;
        info.allBookmarksError = allBookmarksError;

        // Try to get bookmarks for this user specifically
        const { data: userBookmarks, error: userBookmarksError } = await (supabase as any)
          .from('bookmarks')
          .select('*')
          .eq('user_id', user.id);

        info.userBookmarks = userBookmarks;
        info.userBookmarksError = userBookmarksError;

        // Check RLS policies are working
        const { data: { session } } = await supabase.auth.getSession();
        info.currentSession = session;
      }

      setDebugInfo(info);
    } catch (error) {
      setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
  }, [user]);

  if (loading) {
    return <div>Loading debug info...</div>;
  }

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Bookmark Debug Information</h2>
      
      <div className="mb-4">
        <Button onClick={fetchDebugInfo} variant="outline">
          Refresh Debug Info
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Current User:</h3>
          <pre className="bg-muted p-2 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo.authUser, null, 2)}
          </pre>
        </div>

        {debugInfo.userProfile && (
          <div>
            <h3 className="font-semibold">User Profile in Database:</h3>
            <pre className="bg-muted p-2 rounded text-sm overflow-auto">
              {JSON.stringify(debugInfo.userProfile, null, 2)}
            </pre>
          </div>
        )}

        {debugInfo.userProfileError && (
          <div>
            <h3 className="font-semibold text-red-600">User Profile Error:</h3>
            <pre className="bg-red-50 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(debugInfo.userProfileError, null, 2)}
            </pre>
          </div>
        )}

        <div>
          <h3 className="font-semibold">All Bookmarks in Database:</h3>
          <pre className="bg-muted p-2 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo.allBookmarks, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">User's Bookmarks:</h3>
          <pre className="bg-muted p-2 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo.userBookmarks, null, 2)}
          </pre>
        </div>

        {debugInfo.userBookmarksError && (
          <div>
            <h3 className="font-semibold text-red-600">User Bookmarks Error:</h3>
            <pre className="bg-red-50 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(debugInfo.userBookmarksError, null, 2)}
            </pre>
          </div>
        )}

        <div>
          <h3 className="font-semibold">Current Session:</h3>
          <pre className="bg-muted p-2 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo.currentSession, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 