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

    // Create Telegram Login Widget page
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
            }
          </style>
          <script async src="https://telegram.org/js/telegram-widget.js?22" 
                  data-telegram-login="${process.env.TELEGRAM_BOT_USERNAME || 'skoop_integration_bot'}" 
                  data-size="large" 
                  data-auth-url="${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/telegram/callback?state=${state}"
                  data-request-access="write">
          </script>
        </head>
        <body>
          <div class="container">
            <div class="telegram-icon">📱</div>
            <h1>Connect Telegram</h1>
            <p>Click the button below to connect your Telegram account to Skoop</p>
            
            <div class="login-widget">
              <!-- Telegram Login Widget will appear here -->
            </div>
            
            <p style="font-size: 0.9rem; opacity: 0.7;">
              This will allow Skoop to access your saved messages for searching and organization.
            </p>
          </div>
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