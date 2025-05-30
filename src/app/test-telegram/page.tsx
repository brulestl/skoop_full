"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TelegramConfig {
  botId: string | null;
  botToken: string | null;
  botUsername: string | null;
  appUrl: string | null;
}

export default function TestTelegramPage() {
  const [config, setConfig] = useState<TelegramConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/test-telegram-config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
      setTestResult('❌ Failed to fetch configuration');
    } finally {
      setLoading(false);
    }
  };

  const testTelegramAuth = () => {
    // Open the Telegram auth page in a popup to test the flow
    const popup = window.open(
      '/api/oauth/telegram/start',
      'telegram-auth',
      'width=520,height=680,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      setTestResult('❌ Popup blocked. Please allow popups and try again.');
      return;
    }

    // Listen for messages from the popup
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'oauth_success') {
        setTestResult('✅ Telegram authentication successful!');
        window.removeEventListener('message', messageHandler);
      } else if (event.data.type === 'oauth_error') {
        setTestResult(`❌ Telegram authentication failed: ${event.data.error}`);
        window.removeEventListener('message', messageHandler);
      }
    };

    window.addEventListener('message', messageHandler);

    // Check if popup was closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
        if (!testResult.includes('✅') && !testResult.includes('❌')) {
          setTestResult('⚠️ Popup was closed manually');
        }
      }
    }, 1000);
  };

  const getConfigStatus = (value: string | null | undefined) => {
    if (value === 'SET') return '✅ SET';
    if (value) return `✅ ${value}`;
    return '❌ NOT SET';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Telegram Integration Test</h1>
      
      {/* Configuration Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
        <div className="space-y-2 font-mono text-sm">
          <div>TELEGRAM_BOT_ID: <span className={config?.botId ? 'text-green-600' : 'text-red-600'}>{getConfigStatus(config?.botId)}</span></div>
          <div>TELEGRAM_BOT_TOKEN: <span className={config?.botToken ? 'text-green-600' : 'text-red-600'}>{getConfigStatus(config?.botToken)}</span></div>
          <div>TELEGRAM_BOT_USERNAME: <span className={config?.botUsername ? 'text-green-600' : 'text-red-600'}>{getConfigStatus(config?.botUsername)}</span></div>
          <div>NEXT_PUBLIC_APP_URL: <span className={config?.appUrl ? 'text-green-600' : 'text-red-600'}>{getConfigStatus(config?.appUrl)}</span></div>
        </div>
      </div>

      {/* Setup Instructions */}
      {(!config?.botToken || !config?.botUsername) && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">⚠️ Setup Required</h2>
          <div className="space-y-4 text-sm">
            <p>You need to create a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.env.local</code> file in the project root with:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`# Telegram Bot Configuration
TELEGRAM_BOT_ID=your_bot_id_here
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=your_bot_username_here

# App URL
NEXT_PUBLIC_APP_URL=https://skoop.pro`}
            </pre>
            <div className="space-y-2">
              <p><strong>To get these values:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Message <a href="https://t.me/BotFather" className="text-blue-600 hover:underline">@BotFather</a> on Telegram</li>
                <li>Send <code>/newbot</code> and follow instructions</li>
                <li>Save the bot token (e.g., <code>123456789:ABC-DEF...</code>)</li>
                <li>Bot ID is the part before the colon (e.g., <code>123456789</code>)</li>
                <li>Bot username is what you chose (without @)</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Test Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Authentication Flow</h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This will open the Telegram authentication popup and test the complete flow.
          </p>
          <Button 
            onClick={testTelegramAuth}
            disabled={!config?.botToken || !config?.botUsername}
            className="w-full sm:w-auto"
          >
            🔗 Test Telegram Authentication
          </Button>
          {testResult && (
            <div className={`p-4 rounded-lg ${
              testResult.includes('✅') ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
              testResult.includes('❌') ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
              'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
            }`}>
              {testResult}
            </div>
          )}
        </div>
      </div>

      {/* Debug Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <div className="space-y-4 text-sm">
          <div>
            <strong>Current URL:</strong> <code>{window.location.href}</code>
          </div>
          <div>
            <strong>User Agent:</strong> <code className="break-all">{navigator.userAgent}</code>
          </div>
          <div>
            <strong>Popup Support:</strong> <span className="text-green-600">
              ✅ Supported
            </span>
          </div>
          <div>
            <strong>PostMessage Support:</strong> <span className="text-green-600">
              ✅ Supported
            </span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Button variant="outline" asChild>
          <a href="/dashboard">← Back to Dashboard</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/api/oauth/telegram/start" target="_blank">Open Auth Page</a>
        </Button>
        <Button variant="outline" onClick={fetchConfig}>
          🔄 Refresh Config
        </Button>
      </div>
    </div>
  );
} 