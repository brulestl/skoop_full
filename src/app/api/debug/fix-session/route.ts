import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Security: Only allow this in development or with proper auth
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from auth
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user || user.id !== 'e3ef0830-5658-445e-8193-17b28703ebf2') {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    // The clean session string from the generation script
    const cleanSessionString = '1BAAOMTQ5LjE1NC4xNjcuOTEAUBGfQy8MO253k2GS7BkuxBPKWCN8yotBgktUSEEm+jm9hV8PlcEcDKeTRVm70+gPCqQSObK0GOPJnNUNIs3SgiwiPJpLyjb1LlIPr7Ryfi7AnhEO6n4ZbInhdgBszhUTV455NPL+DNLrSbKgBx3C0bOSQRWcroaG7hvlbcB0gejr6gjvCrC6LFOK1v7JpPMUpL7PYurqgnX5WMjJCM0jtARDw/KYQ2LutLLxUaqQs8TFBPyKFBxOq45NXY+ToFlQIYYZ6ulLcLHpo6dEI/1GbK0iEGgvoqvRnKMPyRbdMwO/ElDizumKXsZb4nBAnGPEoUef4c8mKMBiTy7giEHN2Bc=';

    console.log(`[FIX-SESSION] Updating session for user: ${user.id}`);
    console.log(`[FIX-SESSION] New session length: ${cleanSessionString.length}`);
    console.log(`[FIX-SESSION] New session preview: ${cleanSessionString.substring(0, 30)}...`);

    // Update the session string
    const { data, error } = await supabase
      .from('connected_accounts')
      .update({
        telegram_session_string: cleanSessionString,
        status: 'active',
        last_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .select();

    if (error) {
      console.error('[FIX-SESSION] Update error:', error);
      return NextResponse.json({ error: 'Database update failed', details: error.message }, { status: 500 });
    }

    console.log('[FIX-SESSION] Update successful:', data);

    return NextResponse.json({
      success: true,
      message: 'Session string updated successfully',
      updated: data?.length || 0,
      sessionLength: cleanSessionString.length,
      hasSpaces: cleanSessionString.includes(' ')
    });

  } catch (error) {
    console.error('[FIX-SESSION] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 