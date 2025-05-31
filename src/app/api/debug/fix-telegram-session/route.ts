import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Get user from cookies (since we're on the live site)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user || user.id !== 'e3ef0830-5658-445e-8193-17b28703ebf2') {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    console.log(`[FIX-TG-SESSION] Fixing session for user: ${user.id}`);

    // Check current session status
    const { data: currentAccount } = await supabase
      .from('connected_accounts')
      .select('telegram_session_string, status, last_error')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single();

    console.log('[FIX-TG-SESSION] Current session status:', {
      has_session: !!currentAccount?.telegram_session_string,
      session_length: currentAccount?.telegram_session_string?.length || 0,
      status: currentAccount?.status,
      last_error: currentAccount?.last_error
    });

    // Use the clean session string from your generation
    const workingSessionString = '1BAAOMTQ5LjE1NC4xNjcuOTEAUBGfQy8MO253k2GS7BkuxBPKWCN8yotBgktUSEEm+jm9hV8PlcEcDKeTRVm70+gPCqQSObK0GOPJnNUNIs3SgiwiPJpLyjb1LlIPr7Ryfi7AnhEO6n4ZbInhdgBszhUTV455NPL+DNLrSbKgBx3C0bOSQRWcroaG7hvlbcB0gejr6gjvCrC6LFOK1v7JpPMUpL7PYurqgnX5WMjJCM0jtARDw/KYQ2LutLLxUaqQs8TFBPyKFBxOq45NXY+ToFlQIYYZ6ulLcLHpo6dEI/1GbK0iEGgvoqvRnKMPyRbdMwO/ElDizumKXsZb4nBAnGPEoUef4c8mKMBiTy7giEHN2Bc=';

    // Update the session string
    const { data, error } = await supabase
      .from('connected_accounts')
      .update({
        telegram_session_string: workingSessionString,
        status: 'active',
        last_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .select();

    if (error) {
      console.error('[FIX-TG-SESSION] Update error:', error);
      return NextResponse.json({ error: 'Failed to update session', details: error.message }, { status: 500 });
    }

    console.log('[FIX-TG-SESSION] Session updated successfully:', {
      session_length: workingSessionString.length,
      updated_record: data?.[0]
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Telegram session fixed successfully',
      session_length: workingSessionString.length,
      previous_session_length: currentAccount?.telegram_session_string?.length || 0
    });

  } catch (error) {
    console.error('[FIX-TG-SESSION] Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 