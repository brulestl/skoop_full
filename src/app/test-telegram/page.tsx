"use client";

import { useEffect, useState } from 'react';

export default function TestTelegramPage() {
  const [envVars, setEnvVars] = useState<any>({});
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test environment variables
    fetch('/api/test-telegram-config')
      .then(res => res.json())
      .then(data => setEnvVars(data))
      .catch(err => setError(err.message));

    // Test Telegram widget loading
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.onload = () => setWidgetLoaded(true);
    script.onerror = () => setError('Failed to load Telegram widget script');
    document.head.appendChild(script);
  }, []);

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
            </div>
          </div>

          {/* Manual Widget Test */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-3">Manual Widget Test</h2>
            <p className="text-sm text-gray-600 mb-3">If bot username is set, widget should appear below:</p>
            <div id="telegram-widget-container" className="min-h-[60px] border-2 border-dashed border-gray-300 rounded p-4 flex items-center justify-center">
              <span className="text-gray-500">Widget should appear here...</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="border rounded p-4 bg-blue-50">
            <h2 className="text-lg font-semibold mb-3">Next Steps</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Check that all environment variables are set in Vercel</li>
              <li>Ensure TELEGRAM_BOT_USERNAME is your bot username without @</li>
              <li>Redeploy if you just added environment variables</li>
              <li>Check browser console for JavaScript errors</li>
            </ol>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Try to load widget manually if we have the bot username
            setTimeout(() => {
              if (window.TelegramLoginWidget && '${envVars.botUsername}') {
                const container = document.getElementById('telegram-widget-container');
                if (container) {
                  container.innerHTML = '';
                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://telegram.org/js/telegram-widget.js?22';
                  script.setAttribute('data-telegram-login', '${envVars.botUsername}');
                  script.setAttribute('data-size', 'large');
                  script.setAttribute('data-auth-url', '${envVars.appUrl}/api/oauth/telegram/callback?state=test');
                  container.appendChild(script);
                }
              }
            }, 2000);
          `
        }}
      />
    </div>
  );
} 