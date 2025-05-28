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
      console.error('GitHub OAuth error:', error);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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
    const storedState = cookieStore.get('github_oauth_state')?.value;
    const returnTo = cookieStore.get('github_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub token exchange error:', tokenData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userData.id) {
      console.error('Failed to get GitHub user data');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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
        provider: 'github',
        provider_user_id: userData.id.toString(),
        username: userData.login,
        display_name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
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
          <head><title>GitHub OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'github',
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
    cookieStore.delete('github_oauth_state');
    cookieStore.delete('github_return_to');

    // For popup-based OAuth, return HTML that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Connected</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'github'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '${returnTo}?connected=github';
            }
          </script>
          <p>GitHub account connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    
    // For popup-based OAuth, return HTML that sends error message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GitHub Connection Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'github',
                error: 'Connection failed'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '/dashboard?error=callback_error';
            }
          </script>
          <p>Failed to connect GitHub account. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 