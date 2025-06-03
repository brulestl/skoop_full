import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('🔴 Starting Reddit sync API route...');
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('❌ Session error:', sessionError);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ User authenticated:', session.user.id);

    // Check if Reddit account is connected
    const { data: connectedAccount, error: accountError } = await supabase
      .from('connected_accounts')
      .select('access_token, refresh_token, status, last_error')
      .eq('user_id', session.user.id)
      .eq('provider', 'reddit')
      .single();

    if (accountError || !connectedAccount) {
      console.error('❌ Reddit account not found:', accountError);
      return NextResponse.json(
        { error: 'Reddit account not connected. Please connect your Reddit account first.' },
        { status: 400 }
      );
    }

    console.log('✅ Reddit account found, status:', connectedAccount.status);

    // Call the Supabase function to ingest Reddit saved items
    console.log('📡 Calling Supabase edge function: ingest_reddit');
    
    const { data, error } = await supabase.functions.invoke('ingest_reddit', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: {
        user_id: session.user.id
      }
    });

    console.log('📡 Edge function response:', { data, error });

    if (error) {
      console.error('❌ Reddit sync error from edge function:', error);
      
      // Provide more detailed error information
      let errorMessage = 'Failed to sync Reddit saved items';
      let errorDetails = error;
      
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          details: errorDetails,
          debug_info: {
            user_id: session.user.id,
            reddit_account_status: connectedAccount.status,
            last_reddit_error: connectedAccount.last_error
          }
        },
        { status: 500 }
      );
    }

    console.log('✅ Reddit sync completed successfully');

    return NextResponse.json({
      success: true,
      message: data?.message || 'Reddit sync completed',
      count: data?.count || 0,
      total_found: data?.total_fetched || 0
    });

  } catch (error) {
    console.error('❌ Reddit sync route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 