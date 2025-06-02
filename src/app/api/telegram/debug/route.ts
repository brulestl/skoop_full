import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check environment variables
    const envCheck = {
      TELEGRAM_BOT_TOKEN: !!process.env.TELEGRAM_BOT_TOKEN,
      TELEGRAM_BOT_USERNAME: !!process.env.TELEGRAM_BOT_USERNAME,
      TELEGRAM_API_ID: !!process.env.TELEGRAM_API_ID,
      TELEGRAM_API_HASH: !!process.env.TELEGRAM_API_HASH,
      OAUTH_ENCRYPTION_KEY: !!process.env.OAUTH_ENCRYPTION_KEY,
      NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
    };

    // Check connected accounts table structure
    let tableStructure = null;
    try {
      const { data: columns, error: columnError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_name', 'connected_accounts')
        .eq('table_schema', 'public');
      
      if (!columnError) {
        tableStructure = columns;
      }
    } catch (e) {
      console.error('Error checking table structure:', e);
    }

    // Check if user has any connected accounts
    const { data: connectedAccounts, error: accountError } = await supabase
      .from('connected_accounts')
      .select('provider, status, last_error, telegram_session_string')
      .eq('user_id', session.user.id);

    const telegramAccount = connectedAccounts?.find(acc => acc.provider === 'telegram');

    const diagnostics = {
      timestamp: new Date().toISOString(),
      user_id: session.user.id,
      environment: {
        ...envCheck,
        node_env: process.env.NODE_ENV,
      },
      database: {
        table_structure: tableStructure,
        connected_accounts_count: connectedAccounts?.length || 0,
        telegram_account: telegramAccount ? {
          status: telegramAccount.status,
          has_session_string: !!telegramAccount.telegram_session_string,
          session_string_length: telegramAccount.telegram_session_string?.length || 0,
          last_error: telegramAccount.last_error,
        } : null,
      },
      issues: [] as string[],
    };

    // Identify potential issues
    if (!envCheck.TELEGRAM_BOT_TOKEN) {
      diagnostics.issues.push('TELEGRAM_BOT_TOKEN environment variable not set');
    }
    if (!envCheck.TELEGRAM_BOT_USERNAME) {
      diagnostics.issues.push('TELEGRAM_BOT_USERNAME environment variable not set');
    }
    if (!envCheck.TELEGRAM_API_ID) {
      diagnostics.issues.push('TELEGRAM_API_ID environment variable not set');
    }
    if (!envCheck.TELEGRAM_API_HASH) {
      diagnostics.issues.push('TELEGRAM_API_HASH environment variable not set');
    }
    if (!envCheck.OAUTH_ENCRYPTION_KEY) {
      diagnostics.issues.push('OAUTH_ENCRYPTION_KEY environment variable not set');
    }
    if (!envCheck.NEXT_PUBLIC_APP_URL) {
      diagnostics.issues.push('NEXT_PUBLIC_APP_URL environment variable not set');
    }

    if (telegramAccount?.status === 'error') {
      diagnostics.issues.push(`Telegram account in error state: ${telegramAccount.last_error}`);
    }

    if (telegramAccount && !telegramAccount.telegram_session_string) {
      diagnostics.issues.push('Telegram account exists but has no session string');
    }

    return NextResponse.json(diagnostics);

  } catch (error) {
    console.error('Telegram debug error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 