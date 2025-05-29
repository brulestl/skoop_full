import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Telegram uses MTProto authentication, not OAuth
    // Users need to generate a session string manually
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Telegram Setup Required</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px; 
              line-height: 1.6;
            }
            .code-block { 
              background: #f5f5f5; 
              padding: 15px; 
              border-radius: 5px; 
              font-family: monospace; 
              margin: 15px 0;
              overflow-x: auto;
            }
            .step { 
              margin: 20px 0; 
              padding: 15px; 
              border-left: 4px solid #0088cc; 
              background: #f8f9fa;
            }
            .warning {
              background: #fff3cd;
              border-left-color: #ffc107;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <h1>🔵 Telegram Setup Required</h1>
          
          <div class="warning step">
            <strong>⚠️ Manual Setup Required</strong><br>
            Telegram uses MTProto authentication instead of OAuth. You need to generate a session string manually.
          </div>

          <div class="step">
            <h3>Step 1: Get API Credentials</h3>
            <ol>
              <li>Go to <a href="https://my.telegram.org/apps" target="_blank">https://my.telegram.org/apps</a></li>
              <li>Login with your phone number</li>
              <li>Create a new application</li>
              <li>Note down your <code>api_id</code> and <code>api_hash</code></li>
            </ol>
          </div>

          <div class="step">
            <h3>Step 2: Generate Session String</h3>
            <p>Run this Node.js script locally (replace YOUR_API_ID and YOUR_API_HASH with values from Step 1):</p>
            <div class="code-block">
npm install telegram input<br><br>
// generate-session.js
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = YOUR_API_ID; // Replace with your numeric API ID (e.g., 1234567)
const apiHash = "YOUR_API_HASH"; // Replace with your API hash string
const stringSession = new StringSession("");

(async () => {
  console.log("Starting Telegram session generation...");
  console.log("Using API ID: " + apiId);
  
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  
  await client.start({
    phoneNumber: async () => await input.text("Phone number (with country code, e.g., +1234567890): "),
    password: async () => await input.text("Password (if 2FA enabled): "),
    phoneCode: async () => await input.text("Verification code from Telegram: "),
    onError: (err) => console.log("Error:", err),
  });
  
  console.log("\\n=== SESSION STRING ===");
  console.log(client.session.save());
  console.log("======================\\n");
  console.log("Copy the session string above and keep it secure!");
  
  await client.disconnect();
})();
            </div>
            <p><strong>Important:</strong> The API credentials are also needed on our server. Make sure to provide them when submitting your session string.</p>
          </div>

          <div class="step">
            <h3>Step 3: Save Session String</h3>
            <p>Copy the session string from the script output and save it securely. You'll need to manually add it to your connected account in the database.</p>
          </div>

          <div class="step">
            <h3>Step 4: Submit Session String</h3>
            <p>Once you have your session string, you have two options:</p>
            <ol>
              <li><strong>Recommended:</strong> Use our support form at <a href="/support/telegram" target="_blank">/support/telegram</a></li>
              <li>Contact support directly with your email and session string</li>
            </ol>
          </div>

          <div class="step">
            <h3>Step 5: Wait for Activation</h3>
            <p>Our team will process your request within 24 hours and activate your Telegram connection. You'll receive an email confirmation.</p>
          </div>

          <script>
            // Close popup after showing instructions
            setTimeout(() => {
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'telegram',
                  error: 'Manual setup required - see instructions'
                }, window.location.origin);
                window.close();
              }
            }, 1000);
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Telegram setup error:', error);
    return NextResponse.json(
      { error: 'Failed to show Telegram setup instructions' },
      { status: 500 }
    );
  }
} 