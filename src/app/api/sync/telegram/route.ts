import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
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

    // Call the Supabase function to ingest Telegram saved messages
    const result = await supabase.functions.invoke('ingest_telegram_saved', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { user_id: session.user.id }
    });

    if (result.error) {
      console.error('Supabase function error:', result.error);
      
      // TASK M-SESSION: Forward 409 status for missing session
      if (result.error.message?.includes('409') || result.error.message?.includes('no_session')) {
        return NextResponse.json(
          { error: 'no_session' },
          { status: 409 }
        );
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    // Get existing bookmarks count for better user feedback
    const { count: existingCount } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('source', 'telegram');

    const insertedCount = result.data?.inserted || 0;
    
    return NextResponse.json({ 
      success: true,
      count: insertedCount,
      inserted: insertedCount,
      existing_count: existingCount || 0,
      message: insertedCount > 0 
        ? `Successfully synced ${insertedCount} new messages`
        : `Telegram is up to date (${existingCount || 0} messages total)`
    });

  } catch (error) {
    console.error('Telegram sync route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 