import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const url = new URL(request.url);
    
    // Get parameters from Telegram
    const telegramData = {
      id: url.searchParams.get('id'),
      first_name: url.searchParams.get('first_name'),
      last_name: url.searchParams.get('last_name'),
      username: url.searchParams.get('username'),
      photo_url: url.searchParams.get('photo_url'),
      auth_date: url.searchParams.get('auth_date'),
      hash: url.searchParams.get('hash'),
    };

    const state = url.searchParams.get('state');
    
    if (!state) {
      throw new Error('Missing state parameter');
    }

    // Decode state to get user info
    let stateData;
    try {
      stateData = JSON.parse(atob(state));
    } catch {
      throw new Error('Invalid state parameter');
    }

    // Verify the authentication data from Telegram
    if (!verifyTelegramAuth(telegramData, process.env.TELEGRAM_BOT_TOKEN!)) {
      throw new Error('Invalid Telegram authentication');
    }

    // Get the user from our database
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user || user.id !== stateData.userId) {
      throw new Error('User authentication failed');
    }

    // Store the Telegram connection
    const { error: insertError } = await supabase
      .from('connected_accounts')
      .upsert({
        user_id: user.id,
        provider: 'telegram',
        provider_user_id: telegramData.id,
        username: telegramData.username,
        display_name: `${telegramData.first_name || ''} ${telegramData.last_name || ''}`.trim(),
        avatar_url: telegramData.photo_url,
        status: 'active',
        connected_at: new Date().toISOString(),
        access_token: 'telegram_web_app', // Placeholder since we don't get a traditional token
      }, {
        onConflict: 'user_id,provider'
      });

    if (insertError) {
      console.error('Error storing Telegram connection:', insertError);
      throw insertError;
    }

    // Create success page with popup and redirect
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
            <div class="redirect-info">Redirecting you back to dashboard...</div>
          </div>
          
          <script>
            // Show success message and redirect
            setTimeout(() => {
              window.location.href = '${stateData.returnUrl}?connected=telegram';
            }, 2000);
            
            // If opened in popup, notify parent and close
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'telegram',
                message: 'Telegram connected successfully!'
              }, window.location.origin);
              
              setTimeout(() => {
                window.close();
              }, 1500);
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(successHtml, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Telegram callback error:', error);
    
    // Create error page
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">❌</div>
            <h1>Connection Failed</h1>
            <p>Unable to connect your Telegram account. Please try again.</p>
          </div>
          
          <script>
            setTimeout(() => {
              window.location.href = '/dashboard?error=telegram_connection_failed';
            }, 3000);
            
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'telegram',
                error: 'Connection failed'
              }, window.location.origin);
              
              setTimeout(() => {
                window.close();
              }, 2000);
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(errorHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

// Verify Telegram authentication data
function verifyTelegramAuth(data: any, botToken: string): boolean {
  const { hash, ...authData } = data;
  
  if (!hash) return false;
  
  // Create data check string
  const dataCheckArr = Object.keys(authData)
    .filter(key => authData[key] !== null && authData[key] !== undefined)
    .sort()
    .map(key => `${key}=${authData[key]}`);
  
  const dataCheckString = dataCheckArr.join('\n');
  
  // Create secret key
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  
  // Create hash
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  return calculatedHash === hash;
} 