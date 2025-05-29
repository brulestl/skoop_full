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

    // Call the Supabase function to ingest Facebook saved posts
    const { data, error } = await supabase.functions.invoke('ingest_facebook_saved', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      console.error('Facebook sync error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to sync Facebook saved posts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.message,
      count: data.count,
      total_found: data.total_found
    });

  } catch (error) {
    console.error('Facebook sync route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 