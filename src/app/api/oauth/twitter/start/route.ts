import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get Twitter OAuth credentials from environment
    const clientId = process.env.TWITTER_CLIENT_ID;
    const baseUrl = request.nextUrl.origin;
    
    // Check if we're using HTTPS or a tunneling service
    const isHttps = baseUrl.startsWith('https://');
    const isLocalTunnel = baseUrl.includes('ngrok.io') || baseUrl.includes('localhost.run') || baseUrl.includes('loca.lt') || baseUrl.includes('lhr.life');
    
    if (!isHttps && !isLocalTunnel) {
      return NextResponse.json({
        error: 'Twitter OAuth requires HTTPS callback URLs',
        message: 'Please use one of these solutions:',
        solutions: [
          '1. Use ngrok: "ngrok http 3001" then update Twitter app callback URL',
          '2. Use localhost.run: "ssh -R 80:localhost:3001 nokey@localhost.run"',
          '3. Deploy to a service with HTTPS (Vercel, Netlify, etc.)',
          '4. Set up local HTTPS development environment'
        ],
        currentUrl: baseUrl,
        requiredCallbackUrl: `${baseUrl}/api/oauth/twitter/callback`
      }, { status: 400 });
    }
    
    const redirectUri = `${baseUrl}/api/oauth/twitter/callback`;
    
    console.log('Twitter OAuth Debug:', {
      hasClientId: !!clientId,
      clientIdLength: clientId?.length,
      redirectUri,
      origin: baseUrl,
      isHttps,
      isLocalTunnel
    });
    
    if (!clientId) {
      console.error('Twitter Client ID not found in environment variables');
      return NextResponse.json(
        { error: 'Twitter OAuth not configured - missing TWITTER_CLIENT_ID' },
        { status: 500 }
      );
    }

    // Generate state nonce for CSRF protection
    const state = crypto.randomBytes(32).toString('hex');
    
    // Store state in cookie
    const cookieStore = await cookies();
    cookieStore.set('oauth_state', state, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    });

    // Build Twitter OAuth URL (OAuth 2.0 with PKCE)
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    // Store code verifier in cookie
    cookieStore.set('oauth_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    });

    const twitterAuthUrl = new URL('https://twitter.com/i/oauth2/authorize');
    twitterAuthUrl.searchParams.set('response_type', 'code');
    twitterAuthUrl.searchParams.set('client_id', clientId);
    twitterAuthUrl.searchParams.set('redirect_uri', redirectUri);
    twitterAuthUrl.searchParams.set('scope', 'tweet.read users.read like.read offline.access');
    twitterAuthUrl.searchParams.set('state', state);
    twitterAuthUrl.searchParams.set('code_challenge', codeChallenge);
    twitterAuthUrl.searchParams.set('code_challenge_method', 'S256');

    console.log('Generated Twitter OAuth URL:', twitterAuthUrl.toString());

    return NextResponse.redirect(twitterAuthUrl.toString());

  } catch (error) {
    console.error('Twitter OAuth start error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 