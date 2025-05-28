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
      return NextResponse.redirect(new URL('/dashboard?error=oauth_error', request.url));
    }

    if (!code || !state) {
      console.error('Missing code or state parameter');
      return NextResponse.redirect(new URL('/dashboard?error=missing_params', request.url));
    }

    // Verify state parameter
    const cookieStore = await cookies();
    const storedState = cookieStore.get('github_oauth_state')?.value;
    const returnTo = cookieStore.get('github_return_to')?.value || '/dashboard';

    if (!storedState || storedState !== state) {
      console.error('Invalid state parameter');
      return NextResponse.redirect(new URL('/dashboard?error=invalid_state', request.url));
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
      return NextResponse.redirect(new URL('/dashboard?error=token_exchange_failed', request.url));
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
      return NextResponse.redirect(new URL('/dashboard?error=user_data_failed', request.url));
    }

    // Store the connected account in Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error('No active session');
      return NextResponse.redirect(new URL('/login?error=no_session', request.url));
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
      return NextResponse.redirect(new URL('/dashboard?error=storage_failed', request.url));
    }

    // Clean up cookies
    cookieStore.delete('github_oauth_state');
    cookieStore.delete('github_return_to');

    // Redirect to success page
    return NextResponse.redirect(new URL(`${returnTo}?connected=github`, request.url));

  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return NextResponse.redirect(new URL('/dashboard?error=callback_error', request.url));
  }
} 