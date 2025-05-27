"use client";

import { useConnectedAccounts } from '@/hooks/useConnectedAccounts';

export default function ConnectedAccountsDebug() {
  const { accounts, loading, isConnected } = useConnectedAccounts();

  if (loading) {
    return <div className="p-4 bg-gray-100 rounded">Loading connected accounts...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded space-y-4">
      <h3 className="font-bold text-lg">🔍 Connected Accounts Debug</h3>
      
      <div>
        <h4 className="font-semibold">Raw Accounts Data:</h4>
        <pre className="text-xs bg-white p-2 rounded overflow-auto">
          {JSON.stringify(accounts, null, 2)}
        </pre>
      </div>

      <div>
        <h4 className="font-semibold">Account Count: {accounts.length}</h4>
        {accounts.length === 0 && (
          <p className="text-red-600">⚠️ No connected accounts found</p>
        )}
      </div>

      <div>
        <h4 className="font-semibold">Provider Status Check:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {['github', 'twitter', 'reddit', 'stack'].map(provider => (
            <div key={provider} className="flex justify-between">
              <span>{provider}:</span>
              <span className={isConnected(provider as any) ? 'text-green-600' : 'text-gray-400'}>
                {isConnected(provider as any) ? '✅ Connected' : '❌ Not connected'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Expected Behavior:</h4>
        <ul className="text-sm space-y-1">
          <li>• Each connected provider should show ✅ Connected</li>
          <li>• Each provider card should have green background</li>
          <li>• Multiple providers can be connected simultaneously</li>
          <li>• Disconnecting one should not affect others</li>
        </ul>
      </div>
    </div>
  );
} 