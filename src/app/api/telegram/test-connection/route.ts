import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Generate the same state parameter as the main flow
    const state = btoa(JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
      returnUrl: '/dashboard'
    }));

    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    const telegramUrl = `https://t.me/${botUsername}?start=connect_${state}`;

    return NextResponse.json({
      user_id: user.id,
      bot_username: botUsername,
      state: state,
      decoded_state: JSON.parse(atob(state)),
      telegram_url: telegramUrl,
      expected_command: `/start connect_${state}`,
    });

  } catch (error) {
    console.error('Test connection error:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
} 