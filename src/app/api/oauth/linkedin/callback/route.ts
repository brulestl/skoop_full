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
      console.error('LinkedIn OAuth error:', error);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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
    const storedState = cookieStore.get('linkedin_oauth_state')?.value;
    const returnTo = cookieStore.get('linkedin_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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
      callbackUrl = 'https://skoop.pro/api/oauth/linkedin/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/linkedin/callback';
    } else {
      callbackUrl = `${baseUrl}/api/oauth/linkedin/callback`;
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('LinkedIn token exchange error:', tokenData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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

    // Get user info from LinkedIn
    const userResponse = await fetch('https://api.linkedin.com/v2/people/~?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userData.id) {
      console.error('Failed to get LinkedIn user data:', userData);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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

    // Get email address from LinkedIn
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const emailData = await emailResponse.json();
    const email = emailData.elements?.[0]?.['handle~']?.emailAddress;

    // Extract profile picture URL
    let avatarUrl = null;
    if (userData.profilePicture?.['displayImage~']?.elements?.length > 0) {
      const images = userData.profilePicture['displayImage~'].elements;
      // Get the largest image
      const largestImage = images[images.length - 1];
      avatarUrl = largestImage?.identifiers?.[0]?.identifier;
    }

    // Construct display name
    const firstName = userData.firstName?.localized?.en_US || userData.firstName?.preferredLocale?.language || '';
    const lastName = userData.lastName?.localized?.en_US || userData.lastName?.preferredLocale?.language || '';
    const displayName = `${firstName} ${lastName}`.trim() || email || userData.id;

    // Store the connected account in Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error('No active session');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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
        provider: 'linkedin',
        provider_user_id: userData.id,
        username: email || userData.id,
        display_name: displayName,
        avatar_url: avatarUrl,
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
          <head><title>LinkedIn OAuth Error</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth_error',
                  provider: 'linkedin',
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
    cookieStore.delete('linkedin_oauth_state');
    cookieStore.delete('linkedin_return_to');

    // For popup-based OAuth, return HTML that sends message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>LinkedIn Connected</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_success',
                provider: 'linkedin'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '${returnTo}?connected=linkedin';
            }
          </script>
          <p>LinkedIn account connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error);
    
    // For popup-based OAuth, return HTML that sends error message to parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>LinkedIn Connection Error</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth_error',
                provider: 'linkedin',
                error: 'Connection failed'
              }, window.location.origin);
              window.close();
            } else {
              // Fallback redirect if not in popup
              window.location.href = '/dashboard?error=callback_error';
            }
          </script>
          <p>Failed to connect LinkedIn account. This window should close automatically.</p>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 