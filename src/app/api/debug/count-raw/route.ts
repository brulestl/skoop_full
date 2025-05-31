import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source } = body;
    
    // Use server-side client that properly handles cookies
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated', details: userError?.message }, { status: 401 });
    }
    
    console.log(`[DEBUG-COUNT] Checking ${source} data for user: ${user.id}`);
    
    // Count for this user
    const { count: userCount, error: userError2 } = await supabase
      .from('bookmarks_raw')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('source', source);
      
    if (userError2) {
      console.error('[DEBUG-COUNT] Error counting user data:', userError2);
      return NextResponse.json({ error: 'Database error', details: userError2.message }, { status: 500 });
    }
    
    // Count total for all users
    const { count: totalCount, error: totalError } = await supabase
      .from('bookmarks_raw')
      .select('*', { count: 'exact', head: true })
      .eq('source', source);
      
    if (totalError) {
      console.error('[DEBUG-COUNT] Error counting total data:', totalError);
    }
    
    console.log(`[DEBUG-COUNT] User count: ${userCount}, Total count: ${totalCount}`);
    
    return NextResponse.json({
      success: true,
      user_id: user.id,
      source,
      user_count: userCount || 0,
      total_count: totalCount || 0
    });
    
  } catch (error) {
    console.error('[DEBUG-COUNT] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 