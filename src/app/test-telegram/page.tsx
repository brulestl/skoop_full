"use client";

import { useEffect, useState } from 'react';

export default function TestTelegramPage() {
  const [envVars, setEnvVars] = useState<any>({});
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);

  useEffect(() => {
    // Test environment variables
    fetch('/api/test-telegram-config')
      .then(res => res.json())
      .then(data => {
        setEnvVars(data);
        
        // Try to load widget after we have the data
        if (data.botUsername) {
          setTimeout(() => loadTelegramWidget(data.botUsername, data.appUrl), 1000);
        }
      })
      .catch(err => setError(err.message));

    // Test Telegram widget loading
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.onload = () => setWidgetLoaded(true);
    script.onerror = () => setError('Failed to load Telegram widget script');
    document.head.appendChild(script);
  }, []);

  const loadTelegramWidget = (botUsername: string, appUrl: string) => {
    const container = document.getElementById('telegram-widget-container');
    if (!container || !botUsername) return;

    console.log('Attempting to load widget for bot:', botUsername);
    
    // Clear container
    container.innerHTML = '<div class="text-blue-600">Loading widget...</div>';
    
    try {
      // Create widget script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-auth-url', `${appUrl}/api/oauth/telegram/callback?state=test`);
      script.setAttribute('data-request-access', 'write');
      
      script.onload = () => {
        console.log('Widget script loaded for bot:', botUsername);
        setTimeout(() => {
          const iframe = container.querySelector('iframe');
          if (!iframe) {
            setWidgetError(`Widget failed to render. This usually means the bot "${botUsername}" is not configured for web login.`);
            container.innerHTML = '<div class="text-red-600">Widget failed to render - bot not configured for web login</div>';
          }
        }, 3000);
      };
      
      script.onerror = () => {
        setWidgetError('Failed to load widget script');
        container.innerHTML = '<div class="text-red-600">Failed to load widget script</div>';
      };
      
      container.appendChild(script);
      
    } catch (err) {
      console.error('Error loading widget:', err);
      setWidgetError(`Error: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Telegram Integration Test</h1>
        
        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-3">Environment Variables</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>TELEGRAM_BOT_ID: <span className="text-blue-600">{envVars.botId || 'NOT SET'}</span></div>
              <div>TELEGRAM_BOT_TOKEN: <span className="text-blue-600">{envVars.botToken ? 'SET (hidden)' : 'NOT SET'}</span></div>
              <div>TELEGRAM_BOT_USERNAME: <span className="text-blue-600">{envVars.botUsername || 'NOT SET'}</span></div>
              <div>NEXT_PUBLIC_APP_URL: <span className="text-blue-600">{envVars.appUrl || 'NOT SET'}</span></div>
            </div>
          </div>

          {/* Widget Test */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-3">Widget Loading Test</h2>
            <div className="space-y-2">
              <div>Telegram Script Loaded: <span className={widgetLoaded ? 'text-green-600' : 'text-red-600'}>{widgetLoaded ? 'YES' : 'NO'}</span></div>
              {error && <div className="text-red-600">Error: {error}</div>}
              {widgetError && <div className="text-red-600">Widget Error: {widgetError}</div>}
            </div>
          </div>

          {/* Manual Widget Test */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-3">Manual Widget Test</h2>
            <p className="text-sm text-gray-600 mb-3">Testing widget for bot: <code>{envVars.botUsername}</code></p>
            <div id="telegram-widget-container" className="min-h-[60px] border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center">
              <span className="text-gray-500">Widget should appear here...</span>
            </div>
          </div>

          {/* Bot Configuration Check */}
          <div className="border rounded p-4 bg-yellow-50">
            <h2 className="text-lg font-semibold mb-3">⚠️ Likely Issue: Bot Not Configured for Web Login</h2>
            <p className="text-sm mb-3">If the widget doesn't appear, your bot needs to be configured for web login.</p>
            
            <div className="bg-white p-3 rounded border">
              <h3 className="font-medium mb-2">Fix: Configure Bot with BotFather</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Open Telegram and message <code>@BotFather</code></li>
                <li>Send: <code>/setdomain</code></li>
                <li>Select your bot: <code>{envVars.botUsername}</code></li>
                <li>Send: <code>skoop.pro</code></li>
                <li>Confirm with: <code>Yes</code></li>
              </ol>
            </div>
          </div>

          {/* Alternative Solution */}
          <div className="border rounded p-4 bg-blue-50">
            <h2 className="text-lg font-semibold mb-3">🔄 Alternative: Use Different Auth Method</h2>
            <p className="text-sm mb-3">If domain setup doesn't work, we can switch to a different authentication method.</p>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>

          {/* Instructions */}
          <div className="border rounded p-4 bg-green-50">
            <h2 className="text-lg font-semibold mb-3">✅ Next Steps</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li><strong>Configure bot domain with BotFather (see above)</strong></li>
              <li>Wait 1-2 minutes for Telegram to update</li>
              <li>Refresh this page to test again</li>
              <li>If still not working, we'll implement a different auth method</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 