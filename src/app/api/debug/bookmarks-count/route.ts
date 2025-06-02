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

    console.log(`[DEBUG-BOOKMARKS] Checking bookmarks for user: ${session.user.id}`);

    // Get total bookmarks count
    const { count: totalCount, error: totalError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    // Get bookmarks by source
    const { data: bookmarksBySource, error: sourceError } = await supabase
      .from('bookmarks')
      .select('source')
      .eq('user_id', session.user.id);

    // Get first 20 bookmarks (what UI should show initially)
    const { data: first20, error: first20Error } = await supabase
      .from('bookmarks')
      .select('id, title, source, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get connected accounts
    const { data: connectedAccounts, error: accountsError } = await supabase
      .from('connected_accounts')
      .select('provider, status')
      .eq('user_id', session.user.id);

    // Count by source
    const sourceCounts: Record<string, number> = {};
    if (bookmarksBySource) {
      bookmarksBySource.forEach(bookmark => {
        const source = bookmark.source || 'unknown';
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      });
    }

    const response = {
      success: true,
      user_id: session.user.id,
      total_bookmarks: totalCount || 0,
      bookmarks_by_source: sourceCounts,
      connected_accounts: connectedAccounts || [],
      first_20_bookmarks: first20 || [],
      debug_info: {
        total_error: totalError,
        source_error: sourceError,
        first20_error: first20Error,
        accounts_error: accountsError,
        timestamp: new Date().toISOString()
      }
    };

    console.log('[DEBUG-BOOKMARKS] Response:', response);

    return NextResponse.json(response);

  } catch (error) {
    console.error('[DEBUG-BOOKMARKS] Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 