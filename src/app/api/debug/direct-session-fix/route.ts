import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('[DIRECT-FIX] Starting direct session fix...');
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get current session to verify user
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user?.id) {
      return NextResponse.json({ error: 'No valid session' }, { status: 401 });
    }

    console.log('[DIRECT-FIX] User ID:', session.user.id);

    // The clean session string (without spaces)
    const cleanSessionString = '1BAAOMTQ5LjE1NC4xNjcuOTEAUBGfQy8MO253k2GS7BkuxBPKWCN8yotBgktUSEEm+jm9hV8PlcEcDKeTRVm70+gPCqQSObK0GOPJnNUNIs3SgiwiPJpLyjb1LlIPr7Ryfi7AnhEO6n4ZbInhdgBszhUTV455NPL+DNLrSbKgBx3C0bOSQRWcroaG7hvlbcB0gejr6gjvCrC6LFOK1v7JpPMUpL7PYurqgnX5WMjJCM0jtARDw/KYQ2LutLLxUaqQs8TFBPyKFBxOq45NXY+ToFlQIYYZ6ulLcLHpo6dEI/1GbK0iEGgvoqvRnKMPyRbdMwO/ElDizumKXsZb4nBAnGPEoUef4c8mKMBiTy7giEHN2Bc=';

    console.log('[DIRECT-FIX] Clean session length:', cleanSessionString.length);
    console.log('[DIRECT-FIX] Has spaces:', cleanSessionString.includes(' '));

    // Direct update using the working supabase client
    const { data, error } = await supabase
      .from('connected_accounts')
      .update({
        telegram_session_string: cleanSessionString,
        status: 'active',
        last_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', session.user.id)
      .eq('provider', 'telegram')
      .select();

    if (error) {
      console.error('[DIRECT-FIX] Update error:', error);
      return NextResponse.json({ 
        error: 'Database update failed', 
        details: error.message 
      }, { status: 500 });
    }

    console.log('[DIRECT-FIX] Update successful:', data);

    return NextResponse.json({
      success: true,
      message: 'Session string updated successfully',
      updated: data?.length || 0,
      newSessionLength: cleanSessionString.length,
      hasSpaces: cleanSessionString.includes(' '),
      oldLength: 370,
      fixed: true
    });

  } catch (error) {
    console.error('[DIRECT-FIX] Error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 