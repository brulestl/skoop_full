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
        return createErrorResponse('Telegram configuration error. Please contact support.');
      }
      
      // Prepare auth data for verification
      const authData: Record<string, string> = {};
      if (telegramUserId) authData.id = telegramUserId;
      if (firstName) authData.first_name = firstName;
      if (lastName) authData.last_name = lastName;
      if (username) authData.username = username;
      if (authDate) authData.auth_date = authDate;
      if (hash) authData.hash = hash;
      
      // Verify the hash
      const isValidAuth = verifyTelegramAuth(authData, botToken);
      console.log('Telegram auth verification:', isValidAuth);
      
      if (!isValidAuth) {
        console.error('Invalid Telegram authentication hash');
        return createErrorResponse('Invalid Telegram authentication. Please try again.');
      }
      
      // Check if auth is not too old (within 1 hour)
      const authTimestamp = parseInt(authDate);
      const now = Math.floor(Date.now() / 1000);
      if (now - authTimestamp > 3600) {
        console.error('Telegram auth data is too old');
        return createErrorResponse('Authentication expired. Please try again.');
      }
      
      // Get the current Skoop user from session
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User not authenticated in Skoop:', userError);
        return createErrorResponse('Please log in to Skoop first, then connect your Telegram account.');
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
        
        // Return success page that handles popup closure
        return createSuccessResponse();
        
      } catch (error) {
        console.error('Error processing Telegram connection:', error);
        return createErrorResponse('Failed to connect Telegram account. Please try again.');
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
    return createErrorResponse('Telegram authentication failed. Please try again.');
  }
}

function createSuccessResponse(): NextResponse {
  const successHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Telegram Connected Successfully</title>
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
          }
          .success-icon {
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
          .redirect-info {
            font-size: 0.9rem;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✅</div>
          <h1>Telegram Connected!</h1>
          <p>Your saved messages will now sync to Skoop</p>
          <div class="redirect-info">Closing window...</div>
        </div>
        
        <script>
          console.log('Telegram OAuth success - notifying parent window');
          
          // If opened in popup, notify parent and close
          if (window.opener) {
            console.log('Sending success message to parent window');
            window.opener.postMessage({
              type: 'oauth_success',
              provider: 'telegram',
              message: 'Telegram connected successfully!'
            }, window.location.origin);
            
            setTimeout(() => {
              window.close();
            }, 1500);
          } else {
            // If not in popup, redirect to dashboard
            console.log('Not in popup, redirecting to dashboard');
            setTimeout(() => {
              window.location.href = '/dashboard?connected=telegram&success=true&message=Telegram account connected successfully!';
            }, 2000);
          }
        </script>
      </body>
    </html>
  `;

  return new NextResponse(successHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}

function createErrorResponse(errorMessage: string): NextResponse {
  const errorHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Telegram Connection Failed</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          .error-icon {
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
          .redirect-info {
            font-size: 0.9rem;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">❌</div>
          <h1>Connection Failed</h1>
          <p>${errorMessage}</p>
          <div class="redirect-info">Closing window...</div>
        </div>
        
        <script>
          console.log('Telegram OAuth error - notifying parent window');
          
          // If opened in popup, notify parent and close
          if (window.opener) {
            console.log('Sending error message to parent window');
            window.opener.postMessage({
              type: 'oauth_error',
              provider: 'telegram',
              error: '${errorMessage}'
            }, window.location.origin);
            
            setTimeout(() => {
              window.close();
            }, 2000);
          } else {
            // If not in popup, redirect to dashboard with error
            console.log('Not in popup, redirecting to dashboard with error');
            setTimeout(() => {
              window.location.href = '/dashboard?error=telegram_connection_failed&message=${encodeURIComponent(errorMessage)}';
            }, 3000);
          }
        </script>
      </body>
    </html>
  `;

  return new NextResponse(errorHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
} 