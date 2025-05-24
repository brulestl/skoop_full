'use client';

import { useEffect, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useSearchParams } from 'next/navigation';

export default function AuthDebug() {
  const { supabaseClient, session, isLoading } = useSessionContext();
  const searchParams = useSearchParams();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const gatherDebugInfo = async () => {
      try {
        const { data: { session: fetchedSession }, error } = await supabaseClient.auth.getSession();
        
        setDebugInfo({
          sessionFromContext: session,
          sessionFromFetch: fetchedSession,
          sessionError: error,
          searchParams: Object.fromEntries(searchParams.entries()),
          isLoading,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        setDebugInfo({
          error: err,
          timestamp: new Date().toISOString()
        });
      }
    };

    gatherDebugInfo();
  }, [supabaseClient, session, isLoading, searchParams]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">OAuth Debug Information</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <div className="mt-4">
        <button 
          onClick={() => window.location.href = '/dashboard/profile'}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Go to Profile
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
    </div>
  );
} 