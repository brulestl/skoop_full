import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Generate a secure state parameter for this auth request
    const state = btoa(JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
      returnUrl: request.nextUrl.searchParams.get('returnUrl') || '/dashboard'
    }));

    // Telegram Web App authentication URL
    const telegramAuthUrl = `https://oauth.telegram.org/auth?bot_id=${process.env.TELEGRAM_BOT_ID}&origin=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')}&request_access=write&return_to=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/telegram/callback?state=${state}`)}`;

    return NextResponse.redirect(telegramAuthUrl);

  } catch (error) {
    console.error('Telegram OAuth start error:', error);
    
    // Fallback: redirect to dashboard with error
    const dashboardUrl = new URL('/dashboard', request.url);
    dashboardUrl.searchParams.set('error', 'telegram_auth_failed');
    
    return NextResponse.redirect(dashboardUrl);
  }
} 