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
      console.error('Twitter OAuth error:', error);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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

    // Verify state parameter and get stored values
    const cookieStore = await cookies();
    const storedState = cookieStore.get('twitter_oauth_state')?.value;
    const codeVerifier = cookieStore.get('twitter_code_verifier')?.value;
    const returnTo = cookieStore.get('twitter_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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

    if (!codeVerifier) {
      console.error('Missing code verifier');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
                  error: 'Missing code verifier'
                }, window.location.origin);
                window.close();
              } else {
                window.location.href = '/dashboard?error=missing_verifier';
              }
            </script>
            <p>Missing code verifier. This window should close automatically.</p>
          </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Detect the correct callback URL (same logic as start route)
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    const callbackUrl = host?.includes('skoop.pro') 
      ? 'https://skoop.pro/api/oauth/twitter/callback'
      : `${baseUrl}/api/oauth/twitter/callback`;

    // Exchange code for access token using PKCE
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl,
        code_verifier: codeVerifier,
        client_id: process.env.TWITTER_CLIENT_ID!,
      }),
    });

    if (!tokenResponse.ok) {
      const body = await tokenResponse.text();
      console.error('TW token response', tokenResponse.status, body);
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Twitter token exchange error:', tokenData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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

    // Get user info from Twitter
    const userResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=id,username,name,profile_image_url', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const userResult = await userResponse.json();

    if (!userResult.data?.id) {
      console.error('Failed to get Twitter user data:', userResult);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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

    const userData = userResult.data;

    // Store the connected account in Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error('No active session');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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
        provider: 'twitter',
        provider_user_id: userData.id,
        username: userData.username,
        display_name: userData.name || userData.username,
        avatar_url: userData.profile_image_url,
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
          <head><title>Twitter OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'twitter',
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
    cookieStore.delete('twitter_oauth_state');
    cookieStore.delete('twitter_code_verifier');
    cookieStore.delete('twitter_return_to');

    // For popup-based OAuth, return HTML that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Twitter Connected</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'twitter'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '${returnTo}?connected=twitter';
            }
          </script>
          <p>Twitter account connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Twitter OAuth callback error:', error);
    
    // For popup-based OAuth, return HTML that sends error message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Twitter Connection Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'twitter',
                error: 'Connection failed'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '/dashboard?error=callback_error';
            }
          </script>
          <p>Failed to connect Twitter account. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 