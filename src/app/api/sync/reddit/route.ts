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

    // Call the Supabase function to ingest Reddit saved items
    const { data, error } = await supabase.functions.invoke('ingest_reddit', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      console.error('Reddit sync error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to sync Reddit saved items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.message,
      count: data.count,
      total_found: data.total_fetched
    });

  } catch (error) {
    console.error('Reddit sync route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 