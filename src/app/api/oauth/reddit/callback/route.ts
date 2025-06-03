import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_CLIENT_SECRET) {
      console.error('Missing Reddit OAuth credentials in environment variables');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
                  error: 'Reddit integration not configured - missing environment variables'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=reddit_not_configured';
              }
            </script>
            <p>Reddit integration not configured. Please contact support.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('Reddit OAuth error:', error);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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
    const storedState = cookieStore.get('reddit_oauth_state')?.value;
    const returnTo = cookieStore.get('reddit_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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
      callbackUrl = 'https://skoop.pro/api/oauth/reddit/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/reddit/callback';
    } else {
      callbackUrl = `${baseUrl}/api/oauth/reddit/callback`;
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'SKOOP/1.0'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Reddit token exchange error:', tokenData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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

    // Get user info from Reddit
    const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'SKOOP/1.0'
      },
    });

    const userData = await userResponse.json();

    if (!userData.name) {
      console.error('Failed to get Reddit user data:', userData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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
        provider: 'reddit',
        provider_user_id: userData.id,
        username: userData.name,
        display_name: userData.name,
        avatar_url: userData.icon_img || userData.snoovatar_img || null,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
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
          <head><title>Reddit OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'reddit',
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

    // Trigger initial sync in the background (don't wait for completion)
    try {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/sync/reddit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ sync_type: 'initial' })
      }).catch(error => {
        console.log('Initial Reddit sync failed (non-blocking):', error);
      });
    } catch (error) {
      console.log('Failed to trigger initial Reddit sync (non-blocking):', error);
    }

    // Clean up cookies
    cookieStore.delete('reddit_oauth_state');
    cookieStore.delete('reddit_return_to');

    // For popup-based OAuth, return HTML that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reddit Connected</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'reddit'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '${returnTo}?connected=reddit';
            }
          </script>
          <p>Reddit account connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Reddit OAuth callback error:', error);
    
    // For popup-based OAuth, return HTML that sends error message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reddit Connection Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'reddit',
                error: 'Connection failed'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '/dashboard?error=callback_error';
            }
          </script>
          <p>Failed to connect Reddit account. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 