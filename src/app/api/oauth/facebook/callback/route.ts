import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('Facebook OAuth error:', error);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'OAuth authorization failed'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=oauth_error';
              }
            </script>
            <p>OAuth authorization failed. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    if (!code || !state) {
      console.error('Missing code or state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'Missing authorization parameters'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=missing_params';
              }
            </script>
            <p>Missing authorization parameters. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Verify state parameter
    const cookieStore = await cookies();
    const storedState = cookieStore.get('facebook_oauth_state')?.value;
    const returnTo = cookieStore.get('facebook_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'Invalid state parameter'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=invalid_state';
              }
            </script>
            <p>Invalid state parameter. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Detect the correct callback URL (same logic as start route)
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    let callbackUrl;
    if (host?.includes('skoop.pro')) {
      callbackUrl = 'https://skoop.pro/api/oauth/facebook/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/facebook/callback';
    } else {
      callbackUrl = `${baseUrl}/api/oauth/facebook/callback`;
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: callbackUrl,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Facebook token exchange error:', tokenData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'Token exchange failed'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=token_exchange_failed';
              }
            </script>
            <p>Token exchange failed. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Get user info from Facebook
    const userResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=${tokenData.access_token}`);
    const userData = await userResponse.json();

    if (!userData.id) {
      console.error('Failed to get Facebook user data:', userData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'Failed to get user data'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=user_data_failed';
              }
            </script>
            <p>Failed to get user data. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Store the connected account in Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error('No active session');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'No active session'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/login?error=no_session';
              }
            </script>
            <p>No active session. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    const { error: insertError } = await supabase
      .from('connected_accounts')
      .upsert({
        user_id: session.user.id,
        provider: 'facebook',
        provider_user_id: userData.id,
        username: userData.email || userData.id,
        display_name: userData.name,
        avatar_url: userData.picture?.data?.url,
        access_token: tokenData.access_token,
        refresh_token: null, // Facebook doesn't provide refresh tokens by default
        expires_at: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString() : null,
        connected_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,provider'
      });

    if (insertError) {
      console.error('Failed to store connected account:', insertError);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Facebook OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'facebook',
                  error: 'Failed to store account'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=storage_failed';
              }
            </script>
            <p>Failed to store account. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Clean up cookies
    cookieStore.delete('facebook_oauth_state');
    cookieStore.delete('facebook_return_to');

    // For popup-based OAuth, return HTML that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Facebook Connected</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'facebook'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '${returnTo}?connected=facebook';
            }
          </script>
          <p>Facebook account connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Facebook OAuth callback error:', error);
    
    // For popup-based OAuth, return HTML that sends error message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Facebook Connection Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'facebook',
                error: 'Connection failed'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '/dashboard?error=callback_error';
            }
          </script>
          <p>Failed to connect Facebook account. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 