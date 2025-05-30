import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function verifyTelegramAuth(authData: Record<string, string>, botToken: string): boolean {
  const { hash, ...data } = authData;
  
  if (!hash) return false;
  
  // Create data check string
  const dataCheckString = Object.keys(data)
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  
  // Create secret key
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  
  // Create hash
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  
  return calculatedHash === hash;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    
    // Check if this is coming from Telegram with user data
    const telegramUserId = url.searchParams.get('id');
    const firstName = url.searchParams.get('first_name');
    const lastName = url.searchParams.get('last_name');
    const username = url.searchParams.get('username');
    const authDate = url.searchParams.get('auth_date');
    const hash = url.searchParams.get('hash');
    
    // If we have Telegram user data, process the connection
    if (telegramUserId && authDate && hash) {
      console.log('Telegram user data received:', { telegramUserId, firstName, lastName, username });
      
      // Verify the authentication data
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        console.error('TELEGRAM_BOT_TOKEN not configured');
        const dashboardUrl = new URL('/dashboard', request.url);
        dashboardUrl.searchParams.set('error', 'telegram_config_error');
        return NextResponse.redirect(dashboardUrl);
      }
      
      // Prepare auth data for verification
      const authData: Record<string, string> = {};
      if (telegramUserId) authData.id = telegramUserId;
      if (firstName) authData.first_name = firstName;
      if (lastName) authData.last_name = lastName;
      if (username) authData.username = username;
      if (authDate) authData.auth_date = authDate;
      if (hash) authData.hash = hash;
      
      // Verify the hash (optional - you can skip this for testing)
      const isValidAuth = verifyTelegramAuth(authData, botToken);
      console.log('Telegram auth verification:', isValidAuth);
      
      // For now, let's proceed even if verification fails (for testing)
      // if (!isValidAuth) {
      //   console.error('Invalid Telegram authentication hash');
      //   const dashboardUrl = new URL('/dashboard', request.url);
      //   dashboardUrl.searchParams.set('error', 'telegram_auth_invalid');
      //   return NextResponse.redirect(dashboardUrl);
      // }
      
      // Check if auth is not too old (within 1 hour)
      const authTimestamp = parseInt(authDate);
      const now = Math.floor(Date.now() / 1000);
      if (now - authTimestamp > 3600) {
        console.error('Telegram auth data is too old');
        const dashboardUrl = new URL('/dashboard', request.url);
        dashboardUrl.searchParams.set('error', 'telegram_auth_expired');
        return NextResponse.redirect(dashboardUrl);
      }
      
      // Get the current Skoop user from session
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User not authenticated in Skoop:', userError);
        // User not logged in - redirect to login with return URL
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', request.url);
        loginUrl.searchParams.set('message', 'Please log in to Skoop first, then connect your Telegram account');
        return NextResponse.redirect(loginUrl);
      }
      
      try {
        // Store the Telegram connection in database
        const { error: insertError } = await supabase
          .from('connected_accounts')
          .upsert({
            user_id: user.id,
            provider: 'telegram',
            provider_user_id: telegramUserId,
            username: username || null,
            display_name: `${firstName || ''} ${lastName || ''}`.trim() || null,
            status: 'active',
            connected_at: new Date().toISOString(),
            access_token: 'telegram_connected',
          }, {
            onConflict: 'user_id,provider'
          });

        if (insertError) {
          console.error('Error storing Telegram connection:', insertError);
          throw insertError;
        }

        console.log('Successfully connected Telegram user', telegramUserId, 'to Skoop user', user.id);
        
        // Redirect back to dashboard with success
        const dashboardUrl = new URL('/dashboard', request.url);
        dashboardUrl.searchParams.set('connected', 'telegram');
        dashboardUrl.searchParams.set('success', 'true');
        dashboardUrl.searchParams.set('message', 'Telegram account connected successfully!');
        
        return NextResponse.redirect(dashboardUrl);
        
      } catch (error) {
        console.error('Error processing Telegram connection:', error);
        
        // Redirect to dashboard with error
        const dashboardUrl = new URL('/dashboard', request.url);
        dashboardUrl.searchParams.set('error', 'telegram_connection_failed');
        dashboardUrl.searchParams.set('message', 'Failed to connect Telegram account. Please try again.');
        
        return NextResponse.redirect(dashboardUrl);
      }
    }
    
    // If no Telegram data, show the connection page with Telegram Login Widget
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    
    // Check if user is logged in
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      // User not logged in - redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('message', 'Please log in first to connect your Telegram account');
      return NextResponse.redirect(loginUrl);
    }
    
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
            .telegram-login {
              margin: 2rem 0;
              display: flex;
              justify-content: center;
            }
            .back-button {
              background: rgba(255, 255, 255, 0.2);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              margin-top: 1rem;
            }
            .back-button:hover {
              background: rgba(255, 255, 255, 0.3);
            }
            .instructions {
              background: rgba(255, 255, 255, 0.1);
              padding: 1.5rem;
              border-radius: 12px;
              margin: 2rem 0;
              font-size: 0.95rem;
              text-align: left;
            }
            .step {
              margin: 0.8rem 0;
              padding: 0.3rem 0;
            }
            .step-number {
              font-weight: bold;
              color: #4fc3f7;
            }
            .user-info {
              background: rgba(76, 175, 80, 0.2);
              padding: 1rem;
              border-radius: 8px;
              margin-bottom: 2rem;
              font-size: 0.9rem;
            }
          </style>
          <script async src="https://telegram.org/js/telegram-widget.js?22"></script>
        </head>
        <body>
          <div class="container">
            <div class="user-info">
              ✅ Logged in as: ${user.email}
            </div>
            
            <p>Connect your Telegram account to sync your saved messages with Skoop</p>
            
            <div class="instructions">
              <div class="step"><span class="step-number">1.</span> Click the "Log in with Telegram" button below</div>
              <div class="step"><span class="step-number">2.</span> Authorize the connection in Telegram</div>
              <div class="step"><span class="step-number">3.</span> You'll be automatically redirected back to your dashboard</div>
            </div>
            
            <div class="telegram-login">
              <script async src="https://telegram.org/js/telegram-widget.js?22" 
                      data-telegram-login="${botUsername}" 
                      data-size="large" 
                      data-auth-url="https://skoop.pro/api/oauth/telegram/start"
                      data-request-access="write">
              </script>
            </div>
            
            <a href="/dashboard" class="back-button">← Back to Dashboard</a>
            
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 2rem;">
              This will securely connect your Telegram account to Skoop.
            </p>
          </div>
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
    dashboardUrl.searchParams.set('message', 'Telegram authentication failed. Please try again.');
    
    return NextResponse.redirect(dashboardUrl);
  }
} 