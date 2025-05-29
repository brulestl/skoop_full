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

    // Generate a secure state parameter for this auth request
    const state = btoa(JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
      returnUrl: request.nextUrl.searchParams.get('returnUrl') || '/dashboard'
    }));

    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    // Create Telegram Login Widget page with fallback
    const loginHtml = `
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
              max-width: 400px;
            }
            .telegram-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
            h1 {
              margin: 0 0 1rem 0;
              font-size: 2rem;
            }
            p {
              margin: 0 0 2rem 0;
              font-size: 1.1rem;
              opacity: 0.9;
            }
            .login-widget {
              margin: 2rem 0;
              display: flex;
              justify-content: center;
              min-height: 60px;
              align-items: center;
            }
            .fallback-button {
              background: #0088cc;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              transition: background 0.2s;
            }
            .fallback-button:hover {
              background: #006699;
            }
            .debug-info {
              margin-top: 2rem;
              padding: 1rem;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              font-size: 0.8rem;
              opacity: 0.7;
            }
            .error-message {
              background: rgba(255, 0, 0, 0.2);
              border: 1px solid rgba(255, 0, 0, 0.3);
              padding: 1rem;
              border-radius: 8px;
              margin: 1rem 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="telegram-icon">📱</div>
            <h1>Connect Telegram</h1>
            <p>Click the button below to connect your Telegram account to Skoop</p>
            
            <div class="login-widget" id="loginWidget">
              <!-- Telegram Login Widget will appear here -->
              <div id="loadingMessage">Loading Telegram login...</div>
            </div>
            
            <div id="fallbackContainer" style="display: none;">
              <div class="error-message">
                <strong>Login widget failed to load.</strong><br>
                This might be due to missing bot configuration.
              </div>
              <a href="/dashboard?error=telegram_config_missing" class="fallback-button">
                Return to Dashboard
              </a>
            </div>
            
            <p style="font-size: 0.9rem; opacity: 0.7;">
              This will allow Skoop to access your saved messages for searching and organization.
            </p>
            
            ${process.env.NODE_ENV === 'development' ? `
            <div class="debug-info">
              <strong>Debug Info:</strong><br>
              Bot Username: ${botUsername || 'NOT SET'}<br>
              App URL: ${appUrl || 'NOT SET'}<br>
              State: ${state.substring(0, 20)}...
            </div>
            ` : ''}
          </div>
          
          <script>
            // Check if bot username is available
            const botUsername = '${botUsername}';
            const appUrl = '${appUrl}';
            
            if (!botUsername || botUsername === 'undefined') {
              console.error('TELEGRAM_BOT_USERNAME not configured');
              document.getElementById('loadingMessage').style.display = 'none';
              document.getElementById('fallbackContainer').style.display = 'block';
            } else {
              // Load Telegram widget script
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://telegram.org/js/telegram-widget.js?22';
              script.setAttribute('data-telegram-login', botUsername);
              script.setAttribute('data-size', 'large');
              script.setAttribute('data-auth-url', appUrl + '/api/oauth/telegram/callback?state=${state}');
              script.setAttribute('data-request-access', 'write');
              
              script.onload = function() {
                console.log('Telegram widget script loaded');
                document.getElementById('loadingMessage').style.display = 'none';
              };
              
              script.onerror = function() {
                console.error('Failed to load Telegram widget script');
                document.getElementById('loadingMessage').style.display = 'none';
                document.getElementById('fallbackContainer').style.display = 'block';
              };
              
              document.head.appendChild(script);
              
              // Fallback timeout
              setTimeout(function() {
                if (document.getElementById('loadingMessage').style.display !== 'none') {
                  console.warn('Telegram widget took too long to load');
                  document.getElementById('loadingMessage').style.display = 'none';
                  document.getElementById('fallbackContainer').style.display = 'block';
                }
              }, 10000);
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(loginHtml, {
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