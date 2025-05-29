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
      callbackUrl = 'https://skoop.pro/api/oauth/facebook/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/facebook/callback';
    } else {
      // Fallback for local development or other domains
      callbackUrl = `${baseUrl}/api/oauth/facebook/callback`;
    }

    // Generate CSRF state nonce
    const state = crypto.randomBytes(32).toString('hex');

    // Store state and returnTo in HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set('facebook_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });
    
    cookieStore.set('facebook_return_to', returnTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });

    // Build Facebook OAuth URL
    const facebookAuthUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
    facebookAuthUrl.searchParams.set('client_id', process.env.FACEBOOK_APP_ID!);
    facebookAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    facebookAuthUrl.searchParams.set('scope', 'user_likes,user_posts,pages_read_engagement');
    facebookAuthUrl.searchParams.set('state', state);
    facebookAuthUrl.searchParams.set('response_type', 'code');

    return NextResponse.redirect(facebookAuthUrl.toString());
  } catch (error) {
    console.error('Facebook OAuth start error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Facebook OAuth' },
      { status: 500 }
    );
  }
} 