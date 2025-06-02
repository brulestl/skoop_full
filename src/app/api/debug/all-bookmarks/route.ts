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

    console.log(`[DEBUG-ALL-BOOKMARKS] Checking all bookmark sources for user: ${session.user.id}`);

    // 1. Check bookmarks table
    const { data: bookmarks, count: bookmarksCount, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    // 2. Check telegram_messages table
    const { data: telegramMessages, count: telegramCount, error: telegramError } = await supabase
      .from('telegram_messages')
      .select('*', { count: 'exact' })
      .eq('telegram_user_id', session.user.id)
      .order('timestamp', { ascending: false });

    // 3. Check bookmarks_raw table if it exists
    const { data: bookmarksRaw, count: rawCount, error: rawError } = await supabase
      .from('bookmarks_raw')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    // 4. Check connected accounts
    const { data: connectedAccounts, error: accountsError } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', session.user.id);

    // 5. Get bookmarks by source breakdown
    const bookmarksBySource: Record<string, number> = {};
    if (bookmarks) {
      bookmarks.forEach(bookmark => {
        const source = bookmark.source || 'unknown';
        bookmarksBySource[source] = (bookmarksBySource[source] || 0) + 1;
      });
    }

    // 6. Get telegram messages breakdown
    const telegramByChat: Record<string, number> = {};
    if (telegramMessages) {
      telegramMessages.forEach(msg => {
        const chatId = msg.chat_id || 'unknown';
        telegramByChat[chatId] = (telegramByChat[chatId] || 0) + 1;
      });
    }

    const response = {
      success: true,
      user_id: session.user.id,
      summary: {
        bookmarks_table: bookmarksCount || 0,
        telegram_messages_table: telegramCount || 0,
        bookmarks_raw_table: rawCount || 0,
        total_across_all_tables: (bookmarksCount || 0) + (telegramCount || 0) + (rawCount || 0)
      },
      bookmarks_table: {
        count: bookmarksCount || 0,
        by_source: bookmarksBySource,
        sample_data: bookmarks?.slice(0, 5) || [],
        error: bookmarksError
      },
      telegram_messages_table: {
        count: telegramCount || 0,
        by_chat: telegramByChat,
        sample_data: telegramMessages?.slice(0, 5) || [],
        error: telegramError
      },
      bookmarks_raw_table: {
        count: rawCount || 0,
        sample_data: bookmarksRaw?.slice(0, 5) || [],
        error: rawError
      },
      connected_accounts: connectedAccounts || [],
      debug_info: {
        timestamp: new Date().toISOString(),
        all_errors: {
          bookmarks: bookmarksError,
          telegram: telegramError,
          raw: rawError,
          accounts: accountsError
        }
      }
    };

    console.log('[DEBUG-ALL-BOOKMARKS] Response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);

  } catch (error) {
    console.error('[DEBUG-ALL-BOOKMARKS] Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 