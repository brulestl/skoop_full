import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_CLIENT_SECRET) {
      console.error('Missing Reddit OAuth credentials in environment variables');
      return NextResponse.json(
        { 
          error: 'Reddit integration not configured', 
          details: 'Missing REDDIT_CLIENT_ID or REDDIT_CLIENT_SECRET environment variables' 
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo') || '/dashboard';
    
    // Detect the correct base URL
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    // Use the current host for callback URL to match OAuth app configuration
    let callbackUrl;
    if (host?.includes('skoop.pro')) {
      callbackUrl = 'https://skoop.pro/api/oauth/reddit/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/reddit/callback';
    } else {
      // Fallback for local development or other domains
      callbackUrl = `${baseUrl}/api/oauth/reddit/callback`;
    }

    // Generate CSRF state nonce
    const state = crypto.randomBytes(32).toString('hex');

    // Store state and returnTo in HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set('reddit_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });
    
    cookieStore.set('reddit_return_to', returnTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });

    // Build Reddit OAuth URL
    const redditAuthUrl = new URL('https://www.reddit.com/api/v1/authorize');
    redditAuthUrl.searchParams.set('client_id', process.env.REDDIT_CLIENT_ID!);
    redditAuthUrl.searchParams.set('response_type', 'code');
    redditAuthUrl.searchParams.set('state', state);
    redditAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    redditAuthUrl.searchParams.set('duration', 'permanent');
    redditAuthUrl.searchParams.set('scope', 'identity history save read');

    return NextResponse.redirect(redditAuthUrl.toString());
  } catch (error) {
    console.error('Reddit OAuth start error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Reddit OAuth' },
      { status: 500 }
    );
  }
} 