import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    
    // Create simple connection page with instructions
    const connectHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connect Telegram Account</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              max-width: 500px;
            }
            p {
              margin: 0 0 2rem 0;
              font-size: 1.1rem;
              opacity: 0.9;
            }
            .connect-button {
              background: #0088cc;
              color: white;
              border: none;
              padding: 16px 32px;
              border-radius: 12px;
              font-size: 18px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              transition: all 0.2s;
              margin: 1rem 0;
            }
            .connect-button:hover {
              background: #006699;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 136, 204, 0.3);
            }
            .steps {
              text-align: left;
              background: rgba(255, 255, 255, 0.1);
              padding: 1.5rem;
              border-radius: 12px;
              margin: 2rem 0;
              font-size: 0.95rem;
            }
            .step {
              margin: 0.8rem 0;
              padding: 0.3rem 0;
            }
            .step-number {
              font-weight: bold;
              color: #4fc3f7;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Connect your Telegram account to sync your saved messages with Skoop</p>
            
            <a href="https://t.me/${botUsername}" class="connect-button" target="_blank">
              Open Telegram Bot
            </a>
            
            <div class="steps">
              <div class="step"><span class="step-number">1.</span> Click the button above to open our Telegram bot</div>
              <div class="step"><span class="step-number">2.</span> Send <strong>/start</strong> to the bot</div>
              <div class="step"><span class="step-number">3.</span> Click the <strong>"Connect to Skoop"</strong> button in Telegram</div>
              <div class="step"><span class="step-number">4.</span> Return to your Skoop dashboard</div>
            </div>
            
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 2rem;">
              The connection will be active for 10 minutes. If it expires, just try again.
            </p>
          </div>
          
          <script>
            // Create a pending connection when page loads
            fetch('/api/telegram/initiate-connection', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                telegramUserId: 'pending' // We'll handle this in the bot
              })
            }).then(response => {
              if (response.ok) {
                console.log('Pending connection created');
              }
            }).catch(error => {
              console.error('Failed to create pending connection:', error);
            });
            
            // Check if user came back from Telegram
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('connected') === 'true') {
              alert('✅ Telegram connected successfully!');
              setTimeout(() => {
                window.location.href = '/dashboard?connected=telegram';
              }, 1000);
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(connectHtml, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Telegram OAuth start error:', error);
    
    // Fallback: redirect to dashboard with error
    const dashboardUrl = new URL('/dashboard', request.url);
    dashboardUrl.searchParams.set('error', 'telegram_auth_failed');
    
    return NextResponse.redirect(dashboardUrl);
  }
} 