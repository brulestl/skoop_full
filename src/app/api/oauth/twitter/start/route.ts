import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo') || '/dashboard';
    
    // Detect the correct base URL
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    // Use the current host for callback URL to match OAuth app configuration
    let callbackUrl;
    if (host?.includes('skoop.pro')) {
      callbackUrl = 'https://skoop.pro/api/oauth/twitter/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/twitter/callback';
    } else {
      // Fallback for local development or other domains
      callbackUrl = `${baseUrl}/api/oauth/twitter/callback`;
    }

    // Generate CSRF state nonce
    const state = crypto.randomBytes(32).toString('hex');
    
    // Generate PKCE verifier and challenge
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    // Store state, verifier, and returnTo in HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set('twitter_oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 600, // 10 minutes
    });
    
    cookieStore.set('twitter_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 600, // 10 minutes
    });
    
    cookieStore.set('twitter_return_to', returnTo, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 600, // 10 minutes
    });

    // Build Twitter OAuth URL
    const twitterAuthUrl = new URL('https://twitter.com/i/oauth2/authorize');
    twitterAuthUrl.searchParams.set('response_type', 'code');
    twitterAuthUrl.searchParams.set('client_id', process.env.TWITTER_CLIENT_ID!);
    twitterAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    twitterAuthUrl.searchParams.set('scope', 'tweet.read users.read offline.access');
    twitterAuthUrl.searchParams.set('state', state);
    twitterAuthUrl.searchParams.set('code_challenge', codeChallenge);
    twitterAuthUrl.searchParams.set('code_challenge_method', 'S256');

    return NextResponse.redirect(twitterAuthUrl.toString());
  } catch (error) {
    console.error('Twitter OAuth start error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Twitter OAuth' },
      { status: 500 }
    );
  }
} 