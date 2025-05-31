import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    console.log('[SIMPLE-TEST] Starting simple test...');
    
    // Test 1: Basic response
    console.log('[SIMPLE-TEST] Test 1: Basic response works');
    
    // Test 2: Supabase client creation
    console.log('[SIMPLE-TEST] Test 2: Creating Supabase client...');
    const supabase = createRouteHandlerClient({ cookies });
    console.log('[SIMPLE-TEST] Supabase client created successfully');
    
    // Test 3: Get current session
    console.log('[SIMPLE-TEST] Test 3: Getting session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('[SIMPLE-TEST] Session result:', { 
      hasSession: !!session, 
      sessionError: sessionError?.message,
      userId: session?.user?.id 
    });
    
    // Test 4: Simple database query (public table)
    console.log('[SIMPLE-TEST] Test 4: Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('connected_accounts')
      .select('user_id, provider, status')
      .limit(1);
    
    console.log('[SIMPLE-TEST] Database test result:', { 
      dataCount: testData?.length || 0, 
      testError: testError?.message 
    });
    
    // Test 5: User-specific query if session exists
    let userAccountData = null;
    let userAccountError = null;
    
    if (session?.user?.id) {
      console.log('[SIMPLE-TEST] Test 5: Testing user-specific query...');
      const result = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('provider', 'telegram');
      
      userAccountData = result.data;
      userAccountError = result.error;
      
      console.log('[SIMPLE-TEST] User account query result:', { 
        userAccountCount: userAccountData?.length || 0, 
        userAccountError: userAccountError?.message 
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Simple test completed',
      tests: {
        basicResponse: true,
        supabaseClient: true,
        session: {
          exists: !!session,
          userId: session?.user?.id,
          error: sessionError?.message
        },
        database: {
          connected: !testError,
          error: testError?.message,
          sampleDataCount: testData?.length || 0
        },
        userQuery: session?.user?.id ? {
          accountCount: userAccountData?.length || 0,
          error: userAccountError?.message,
          hasSessionString: userAccountData?.[0]?.telegram_session_string ? true : false
        } : 'skipped - no session'
      }
    });

  } catch (error) {
    console.error('[SIMPLE-TEST] Error:', error);
    console.error('[SIMPLE-TEST] Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    return NextResponse.json({
      success: false,
      error: 'Simple test failed',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 