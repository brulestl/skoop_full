/*
 * Telegram OAuth Integration Route
 * 
 * This route handles two scenarios:
 * 1. Initial widget rendering: When accessed with user_token parameter (no Telegram auth params),
 *    renders HTML page with Telegram Login Widget for user authentication
 * 2. Auth callback processing: When Telegram redirects back with auth params (id, hash, etc.),
 *    processes the authentication and stores connection in database
 * 
 * Flow:
 * - User clicks "Connect Telegram" -> Opens popup to this route with user_token
 * - Route detects no Telegram auth params -> Renders widget HTML
 * - User authorizes in Telegram -> Telegram redirects back with auth params
 * - Route detects auth params -> Processes connection and redirects to dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createHash, createHmac } from 'crypto';
import { encryptUserData, decryptUserData } from '@/lib/auth/crypto';

function isValidTelegramHash(allParams: Record<string, string>, botToken: string): boolean {
  if (!allParams.hash || !botToken) {
    console.error('Telegram auth: Missing hash or bot token');
    return false;
  }

  // Filter only Telegram parameters (exclude user_token and other non-Telegram params)
  const telegramParams: Record<string, string> = {};
  const knownTelegramFields = ['id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date'];
  
  for (const field of knownTelegramFields) {
    if (allParams[field] && allParams[field] !== '') {
      telegramParams[field] = allParams[field];
    }
  }

  // Create data check string: sort Telegram fields and join with newlines
  const dataCheck = Object.keys(telegramParams)
    .sort()
    .map(k => `${k}=${telegramParams[k]}`)
    .join('\n');

  // Create secret key using SHA256(bot_token) per Telegram Login Widget docs
  const secretKey = createHash('sha256').update(botToken).digest();

  // Calculate hash using HMAC-SHA256 with the secret key
  const calculatedHash = createHmac('sha256', secretKey)
    .update(dataCheck)
    .digest('hex');

  const receivedHash = allParams.hash;
  const isValid = calculatedHash === receivedHash;

  // TELEG_DEBUG: Comprehensive debugging (remove after success)
  console.log('🔍 TELEG_DEBUG =================');
  console.log('All URL params:', Object.keys(allParams));
  console.log('Filtered Telegram params:', Object.keys(telegramParams));
  console.log('Data check string:', JSON.stringify(dataCheck));
  console.log('Data check length:', dataCheck.length);
  console.log('Bot token length:', botToken.length);
  console.log('Bot token first 8 chars:', botToken.substring(0, 8) + '***');
  console.log('Received hash:', receivedHash);
  console.log('Calculated hash:', calculatedHash);
  console.log('Hashes match:', isValid);
  console.log('Raw data for hash:');
  Object.keys(telegramParams).sort().forEach(key => {
    console.log(`  ${key}="${telegramParams[key]}" (len=${telegramParams[key].length})`);
  });
  console.log('================================');

  return isValid;
}

function createTelegramErrorPage(origin: string, errorType: string, errorMessage: string, debugInfo?: any): NextResponse {
  const errorHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Telegram Authentication Error</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
            text-center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 500px;
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
            margin: 0 0 1rem 0;
            font-size: 1.1rem;
            opacity: 0.9;
          }
          .error-code {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.9rem;
            margin: 1rem 0;
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
          .debug-info {
            background: rgba(0, 0, 0, 0.2);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-family: monospace;
            font-size: 0.8rem;
            text-align: left;
            max-height: 200px;
            overflow-y: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">❌</div>
          <h1>Authentication Failed</h1>
          <p>${errorMessage}</p>
          <div class="error-code">Error: ${errorType}</div>
          ${debugInfo ? `<div class="debug-info">${JSON.stringify(debugInfo, null, 2)}</div>` : ''}
          <a href="/dashboard" class="back-button">← Back to Dashboard</a>
          <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 2rem;">
            If this error persists, please contact support.
          </p>
        </div>
        
        <script>
          // If opened in popup, notify parent and close
          if (window.opener) {
            window.opener.postMessage({
              type: 'oauth_error',
              provider: 'telegram',
              error: '${errorType}: ${errorMessage}'
            }, window.location.origin);
            
            setTimeout(() => {
              window.close();
            }, 3000);
          }
        </script>
      </body>
    </html>
  `;

  return new NextResponse(errorHtml, {
    status: 400,
    headers: { 
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Use NEXT_PUBLIC_APP_URL if available, fallback to request origin
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    
    console.log('Using origin for Telegram OAuth:', origin);
    
    const url = new URL(request.url);
    
    // Check if this is coming from Telegram with user data (auth callback)
    const telegramUserId = url.searchParams.get('id');
    const firstName = url.searchParams.get('first_name');
    const lastName = url.searchParams.get('last_name');
    const username = url.searchParams.get('username');
    const authDate = url.searchParams.get('auth_date');
    const hash = url.searchParams.get('hash');
    
    // Check if this is an initial widget render request (with user_token but no Telegram auth)
    const userToken = url.searchParams.get('user_token');
    
    // SCENARIO 1: Process Telegram authentication callback
    if (telegramUserId && authDate && hash) {
      console.log('Processing Telegram authentication callback...');
      console.log('Telegram user data received:', { telegramUserId, firstName, lastName, username });
      
      // Verify the authentication data
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN environment variable is not configured');
      }
      
      // Convert all URL search params to object for hash verification
      const allParams: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        allParams[key] = value;
      });
      
      // Verify the hash using all URL parameters (function will filter Telegram params)
      const isValidAuth = isValidTelegramHash(allParams, botToken);
      console.log('Telegram auth verification result:', isValidAuth);
      
      if (!isValidAuth) {
        console.error('Invalid Telegram authentication hash');
        console.error('Expected hash calculation failed - auth data may be tampered');
        
        return NextResponse.json(
          { error: 'HASH_VERIFICATION_FAILED' },
          { status: 400 }
        );
      }
      
      // Check if auth is not too old (within 1 hour)
      const authTimestamp = parseInt(authDate);
      const now = Math.floor(Date.now() / 1000);
      if (now - authTimestamp > 3600) {
        console.error('Telegram auth data is too old');
        const debugInfo = {
          authTimestamp,
          currentTimestamp: now,
          ageInSeconds: now - authTimestamp,
          maxAgeSeconds: 3600
        };
        
        return createTelegramErrorPage(
          origin,
          'AUTH_DATA_EXPIRED', 
          'The authentication data from Telegram is too old. Please try connecting again.',
          debugInfo
        );
      }
      
      // Get user from encrypted token or session
      let user = null;
      let supabase = createRouteHandlerClient({ cookies });
      
      if (userToken) {
        // Try to decrypt user token first
        try {
          const decryptedData = decryptUserData(userToken);
          if (decryptedData) {
            console.log('Decrypted user data from token:', decryptedData);
            
            // Get user from session to ensure proper authentication context
            const { data: userData, error: userError } = await supabase.auth.getUser();
            
            if (!userError && userData.user && userData.user.id === decryptedData.userId) {
              user = userData.user;
              console.log('User verified from token:', user.id);
            }
          }
        } catch (decryptError) {
          console.error('Failed to decrypt user token:', decryptError);
        }
      }
      
      // Fallback to session-based user lookup
      if (!user) {
        const { data: { user: sessionUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !sessionUser) {
          console.error('User not authenticated in Skoop:', userError);
          const loginUrl = new URL('/auth/login', origin);
          loginUrl.searchParams.set('redirect', request.url);
          loginUrl.searchParams.set('message', 'Please log in to Skoop first, then connect your Telegram account');
          return NextResponse.redirect(loginUrl);
        }
        
        user = sessionUser;
      }
      
      // Ensure we have a valid authenticated Supabase client
      if (!user) {
        console.error('No authenticated user found for database operation');
        throw new Error('User authentication required for database operations');
      }
      
      console.log('Authenticated user for database operations:', {
        userId: user.id,
        email: user.email,
        role: user.role
      });
      
      try {
        console.log('Starting database upsert for Telegram connection...');
        console.log('Skoop user ID:', user.id);
        console.log('Telegram user ID:', telegramUserId);
        console.log('Username:', username);
        console.log('Display name:', `${firstName || ''} ${lastName || ''}`.trim() || null);
        
        // Test RLS permissions by checking if we can query connected_accounts
        console.log('Testing RLS permissions...');
        const { data: existingAccounts, error: queryError } = await supabase
          .from('connected_accounts')
          .select('provider')
          .eq('user_id', user.id);
          
        if (queryError) {
          console.error('RLS Query test failed:', queryError);
          console.error('This indicates a permissions issue with the database connection');
          
          return createTelegramErrorPage(
            origin,
            'RLS_PERMISSION_ERROR',
            'Database permission denied. Please try logging out and back in, then try connecting Telegram again.',
            {
              errorType: queryError.constructor?.name || 'Unknown',
              errorMessage: queryError.message,
              userId: user?.id
            }
          );
        } else {
          console.log('RLS Query test passed. Existing providers:', existingAccounts?.map(a => a.provider) || []);
        }
        
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
          console.error('Database upsert failed:');
          console.error('Error code:', insertError.code);
          console.error('Error message:', insertError.message);
          console.error('Error details:', insertError.details);
          console.error('Error hint:', insertError.hint);
          console.error('Full error:', JSON.stringify(insertError, null, 2));
          console.error('Data being inserted:', {
            user_id: user.id,
            provider: 'telegram',
            provider_user_id: telegramUserId,
            username: username || null,
            display_name: `${firstName || ''} ${lastName || ''}`.trim() || null,
            status: 'active',
            connected_at: new Date().toISOString(),
            access_token: 'telegram_connected',
          });
          
          throw insertError;
        }

        console.log('Successfully connected Telegram user', telegramUserId, 'to Skoop user', user.id);
        console.log('Database upsert completed successfully');
        
        // Redirect to success page using NEXT_PUBLIC_APP_URL
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (!appUrl) {
          throw new Error('NEXT_PUBLIC_APP_URL not configured');
        }
        
        const successUrl = new URL('/oauth/telegram/success', appUrl);
        
        console.log('Redirecting to success page for popup handling');
        console.log('Success URL:', successUrl.toString());
        
        return NextResponse.redirect(successUrl);
        
      } catch (error) {
        console.error('Error processing Telegram connection:', error);
        console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        
        // Create detailed error info for debugging
        const errorObj = error as Error;
        const debugInfo = {
          errorType: errorObj.constructor.name,
          errorMessage: errorObj.message,
          timestamp: new Date().toISOString(),
          telegramUserId,
          userId: user?.id
        };
        
        return createTelegramErrorPage(
          origin,
          'DATABASE_CONNECTION_FAILED',
          'Failed to save your Telegram connection. Please try again or contact support if the problem persists.',
          debugInfo
        );
      }
    }
    
    // SCENARIO 2: Render Telegram Login Widget (no Telegram auth params present)
    console.log('Rendering Telegram Login Widget...');
    
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    if (!botUsername) {
      console.error('TELEGRAM_BOT_USERNAME not configured');
      return createTelegramErrorPage(
        origin,
        'TELEGRAM_BOT_USERNAME_MISSING',
        'Telegram bot username is not properly configured. Please contact the administrator.',
        { configMissing: 'TELEGRAM_BOT_USERNAME' }
      );
    }
    
    // Handle user authentication for widget rendering
    let user = null;
    let displayEmail = 'Unknown User';
    
    if (userToken) {
      // Try to get user from encrypted token
      try {
        const decryptedData = decryptUserData(userToken);
        if (decryptedData) {
          console.log('Using user from encrypted token:', decryptedData.userId);
          
          // Verify with session for security
          const supabase = createRouteHandlerClient({ cookies });
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (!userError && userData.user && userData.user.id === decryptedData.userId) {
            user = userData.user;
            displayEmail = user.email || 'User';
            console.log('User verified for widget rendering:', user.id);
          } else {
            console.error('Token user verification failed:', userError);
          }
        }
      } catch (decryptError) {
        console.error('Failed to decrypt user token for widget:', decryptError);
      }
    }
    
    // Fallback to session-based user lookup
    if (!user) {
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user: sessionUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !sessionUser) {
        console.error('User not authenticated for widget rendering:', userError);
        const loginUrl = new URL('/auth/login', origin);
        loginUrl.searchParams.set('message', 'Please log in first to connect your Telegram account');
        return NextResponse.redirect(loginUrl);
      }
      
      user = sessionUser;
      displayEmail = user.email || 'User';
    }
    
    // Generate encrypted token for auth callback URL if not provided
    const authToken = userToken || encryptUserData({ userId: user.id, returnUrl: '/dashboard' });
    
    // Create the auth callback URL with proper origin
    const authCallbackUrl = `${origin}/api/oauth/telegram/start?user_token=${authToken}`;
    
    console.log('Rendering widget with:');
    console.log('  - Bot username:', botUsername);
    console.log('  - Auth URL:', authCallbackUrl);
    console.log('  - User email:', displayEmail);
    
    const connectHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connect Telegram Account</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
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
              min-height: 50px;
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
            .loading {
              color: #4fc3f7;
              font-size: 0.9rem;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="user-info">
              ✅ Logged in as: ${displayEmail}
            </div>
            
            <p>Connect your Telegram account to sync your saved messages with Skoop</p>
            
            <div class="instructions">
              <div class="step"><span class="step-number">1.</span> Click the "Log in with Telegram" button below</div>
              <div class="step"><span class="step-number">2.</span> Authorize the connection in Telegram</div>
              <div class="step"><span class="step-number">3.</span> You'll be automatically redirected back to your dashboard</div>
            </div>
            
            <div class="telegram-login" id="telegram-login-container">
              <div class="loading">Loading Telegram widget...</div>
            </div>
            
            <a href="/dashboard" class="back-button">← Back to Dashboard</a>
            
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 2rem;">
              This will securely connect your Telegram account to Skoop.
            </p>
          </div>
          
          <script>
            // Load Telegram widget script dynamically
            function loadTelegramWidget() {
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://telegram.org/js/telegram-widget.js?22';
              script.setAttribute('data-telegram-login', '${botUsername}');
              script.setAttribute('data-size', 'large');
              script.setAttribute('data-userpic', 'false');
              script.setAttribute('data-auth-url', '${authCallbackUrl}');
              script.setAttribute('data-request-access', 'write');
              
              const container = document.getElementById('telegram-login-container');
              container.innerHTML = '';
              container.appendChild(script);
              
              console.log('Telegram widget loaded with bot:', '${botUsername}');
              console.log('Auth URL:', '${authCallbackUrl}');
              console.log('Domain used:', '${origin}');
            }
            
            // Load widget when DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', loadTelegramWidget);
            } else {
              loadTelegramWidget();
            }
          </script>
        </body>
      </html>
    `;

    console.log('Returning HTML widget response');
    return new NextResponse(connectHtml, {
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });

  } catch (error) {
    console.error('Telegram OAuth start error:', error);
    
    // Use error page instead of dashboard redirect for better debugging
    const origin = new URL(request.url).origin;
    const errorObj = error as Error;
    const debugInfo = {
      errorType: errorObj.constructor.name,
      errorMessage: errorObj.message,
      timestamp: new Date().toISOString(),
      url: request.url
    };
    
    return createTelegramErrorPage(
      origin,
      'UNEXPECTED_ERROR',
      'An unexpected error occurred during Telegram authentication. Please try again.',
      debugInfo
    );
  }
} 