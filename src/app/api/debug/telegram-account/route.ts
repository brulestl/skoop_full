import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Use server-side client that properly handles cookies
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    console.log(`[DEBUG-TG-ACCOUNT] Checking telegram account for user: ${user.id}`);
    
    // Get ALL connected accounts for this user
    const { data: allAccounts, error: allError } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id);
      
    if (allError) {
      console.error('[DEBUG-TG-ACCOUNT] Error fetching all accounts:', allError);
    }
    
    // Get specifically telegram account
    const { data: telegramAccount, error: telegramError } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single();
      
    if (telegramError && telegramError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('[DEBUG-TG-ACCOUNT] Error fetching telegram account:', telegramError);
    }
    
    // Count all telegram accounts in system
    const { count: allTelegramCount } = await supabase
      .from('connected_accounts')
      .select('*', { count: 'exact', head: true })
      .eq('provider', 'telegram');
    
    return NextResponse.json({
      success: true,
      user_id: user.id,
      user_email: user.email,
      all_accounts: allAccounts || [],
      telegram_account: telegramAccount || null,
      telegram_account_error: telegramError || null,
      total_telegram_accounts_in_system: allTelegramCount || 0,
      debug_info: {
        has_any_accounts: (allAccounts?.length || 0) > 0,
        has_telegram_account: !!telegramAccount,
        telegram_has_session: !!(telegramAccount?.telegram_session_string),
        session_length: telegramAccount?.telegram_session_string?.length || 0
      }
    });
    
  } catch (error) {
    console.error('[DEBUG-TG-ACCOUNT] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 