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
      callbackUrl = 'https://skoop.pro/api/oauth/linkedin/callback';
    } else if (host?.includes('skoop-full.vercel.app')) {
      callbackUrl = 'https://skoop-full.vercel.app/api/oauth/linkedin/callback';
    } else {
      // Fallback for local development or other domains
      callbackUrl = `${baseUrl}/api/oauth/linkedin/callback`;
    }

    // Generate CSRF state nonce
    const state = crypto.randomBytes(32).toString('hex');

    // Store state and returnTo in HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set('linkedin_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });
    
    cookieStore.set('linkedin_return_to', returnTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    });

    // Build LinkedIn OAuth URL
    const linkedinAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
    linkedinAuthUrl.searchParams.set('response_type', 'code');
    linkedinAuthUrl.searchParams.set('client_id', process.env.LINKEDIN_CLIENT_ID!);
    linkedinAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    linkedinAuthUrl.searchParams.set('scope', 'r_liteprofile r_emailaddress');
    linkedinAuthUrl.searchParams.set('state', state);

    return NextResponse.redirect(linkedinAuthUrl.toString());
  } catch (error) {
    console.error('LinkedIn OAuth start error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate LinkedIn OAuth' },
      { status: 500 }
    );
  }
} 