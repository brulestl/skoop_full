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
import crypto from 'crypto';
import { encryptUserData, decryptUserData } from '@/lib/auth/crypto';

function verifyTelegramAuth(authData: Record<string, string>, botToken: string): boolean {
  const { hash, ...data } = authData;
  
  if (!hash) {
    console.error('Telegram auth: No hash provided');
    return false;
  }
  
  // Create data check string
  const dataCheckString = Object.keys(data)
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  
  console.log('Telegram auth debug:');
  console.log('  - Received hash:', hash);
  console.log('  - Data check string:', dataCheckString);
  console.log('  - Bot token length:', botToken.length);
  
  // Create secret key
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  
  // Create hash
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  
  console.log('  - Calculated hash:', calculatedHash);
  console.log('  - Hashes match:', calculatedHash === hash);
  
  return calculatedHash === hash;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const origin = url.origin; // Dynamic origin instead of hardcoded skoop.pro
    
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
        console.error('TELEGRAM_BOT_TOKEN not configured');
        const dashboardUrl = new URL('/dashboard', origin);
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
      
      // Verify the hash
      const isValidAuth = verifyTelegramAuth(authData, botToken);
      console.log('Telegram auth verification result:', isValidAuth);
      console.log('Auth data for verification:', authData);
      console.log('Bot token configured:', !!botToken);
      
      if (!isValidAuth) {
        console.error('Invalid Telegram authentication hash');
        console.error('Expected hash calculation failed - auth data may be tampered');
        const dashboardUrl = new URL('/dashboard', origin);
        dashboardUrl.searchParams.set('error', 'telegram_auth_invalid');
        dashboardUrl.searchParams.set('message', 'Telegram authentication failed - invalid hash');
        return NextResponse.redirect(dashboardUrl);
      }
      
      // Check if auth is not too old (within 1 hour)
      const authTimestamp = parseInt(authDate);
      const now = Math.floor(Date.now() / 1000);
      if (now - authTimestamp > 3600) {
        console.error('Telegram auth data is too old');
        const dashboardUrl = new URL('/dashboard', origin);
        dashboardUrl.searchParams.set('error', 'telegram_auth_expired');
        return NextResponse.redirect(dashboardUrl);
      }
      
      // Get user from encrypted token or session
      let user = null;
      let supabase = null;
      
      if (userToken) {
        // Try to decrypt user token first
        try {
          const decryptedData = decryptUserData(userToken);
          if (decryptedData) {
            console.log('Decrypted user data from token:', decryptedData);
            
            // Create supabase client and verify user exists
            supabase = createRouteHandlerClient({ cookies });
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
      if (!user || !supabase) {
        supabase = createRouteHandlerClient({ cookies });
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
      
      try {
        console.log('Starting database upsert for Telegram connection...');
        console.log('Skoop user ID:', user.id);
        console.log('Telegram user ID:', telegramUserId);
        console.log('Username:', username);
        console.log('Display name:', `${firstName || ''} ${lastName || ''}`.trim() || null);
        
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
          console.error('Insert error details:', JSON.stringify(insertError, null, 2));
          throw insertError;
        }

        console.log('Successfully connected Telegram user', telegramUserId, 'to Skoop user', user.id);
        console.log('Database upsert completed successfully');
        
        // Redirect back to dashboard with success
        const dashboardUrl = new URL('/dashboard', origin);
        dashboardUrl.searchParams.set('connected', 'telegram');
        dashboardUrl.searchParams.set('success', 'true');
        dashboardUrl.searchParams.set('message', 'Telegram account connected successfully!');
        
        console.log('Redirecting to dashboard with success parameters');
        console.log('Redirect URL:', dashboardUrl.toString());
        
        return NextResponse.redirect(dashboardUrl);
        
      } catch (error) {
        console.error('Error processing Telegram connection:', error);
        console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        
        // Redirect to dashboard with error
        const dashboardUrl = new URL('/dashboard', origin);
        dashboardUrl.searchParams.set('error', 'telegram_connection_failed');
        dashboardUrl.searchParams.set('message', 'Failed to connect Telegram account. Please try again.');
        
        console.log('Redirecting to dashboard with error parameters');
        console.log('Error redirect URL:', dashboardUrl.toString());
        
        return NextResponse.redirect(dashboardUrl);
      }
    }
    
    // SCENARIO 2: Render Telegram Login Widget (no Telegram auth params present)
    console.log('Rendering Telegram Login Widget...');
    
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    if (!botUsername) {
      console.error('TELEGRAM_BOT_USERNAME not configured');
      const dashboardUrl = new URL('/dashboard', origin);
      dashboardUrl.searchParams.set('error', 'telegram_config_error');
      dashboardUrl.searchParams.set('message', 'Telegram bot not configured. Please contact administrator.');
      return NextResponse.redirect(dashboardUrl);
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
              script.setAttribute('data-auth-url', '${authCallbackUrl}');
              script.setAttribute('data-request-access', 'write');
              
              const container = document.getElementById('telegram-login-container');
              container.innerHTML = '';
              container.appendChild(script);
              
              console.log('Telegram widget loaded with bot:', '${botUsername}');
              console.log('Auth URL:', '${authCallbackUrl}');
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
    
    // Fallback: redirect to dashboard with error
    const origin = new URL(request.url).origin;
    const dashboardUrl = new URL('/dashboard', origin);
    dashboardUrl.searchParams.set('error', 'telegram_auth_failed');
    dashboardUrl.searchParams.set('message', 'Telegram authentication failed. Please try again.');
    
    return NextResponse.redirect(dashboardUrl);
  }
} 