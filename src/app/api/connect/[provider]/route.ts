import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if this provider is already connected for this user
    const { data: existingAccount, error: checkError } = await supabase
      .from('connected_accounts')
      .select('user_id, provider')
      .eq('user_id', session.user.id)
      .eq('provider', provider)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing account:', checkError);
      return NextResponse.json(
        { error: 'Failed to check account status' },
        { status: 500 }
      );
    }

    if (existingAccount) {
      // Account already linked
      return NextResponse.json(
        { 
          error: 'Account already linked',
          message: `Your ${provider} account is already connected. Please disconnect it first if you want to reconnect with a different account.`,
          provider: provider
        },
        { status: 409 }
      );
    }

    // Account not linked - proceed with OAuth flow
    // This endpoint just validates, the actual OAuth flow happens via the hook
    return NextResponse.json(
      { 
        success: true,
        message: `Ready to connect ${provider} account`,
        provider: provider
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Connect API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle manual connection with tokens (for testing or direct API usage)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const body = await request.json();
    const { access_token, refresh_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: 'access_token is required' },
        { status: 400 }
      );
    }

    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if this provider is already connected for this user
    const { data: existingAccount, error: checkError } = await supabase
      .from('connected_accounts')
      .select('user_id, provider')
      .eq('user_id', session.user.id)
      .eq('provider', provider)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing account:', checkError);
      return NextResponse.json(
        { error: 'Failed to check account status' },
        { status: 500 }
      );
    }

    if (existingAccount) {
      // Account already linked - return 409
      return NextResponse.json(
        { 
          error: 'Account already linked',
          message: `Your ${provider} account is already connected. Use PATCH to update tokens or DELETE to disconnect first.`,
          provider: provider
        },
        { status: 409 }
      );
    }

    // Insert new connection
    const { error: insertError } = await supabase
      .from('connected_accounts')
      .insert({
        user_id: session.user.id,
        provider: provider,
        access_token: access_token,
        refresh_token: refresh_token || null,
        updated_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error inserting connected account:', insertError);
      return NextResponse.json(
        { error: 'Failed to connect account' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: `Successfully connected ${provider} account`,
        provider: provider
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Connect PUT API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update existing connection tokens
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const body = await request.json();
    const { access_token, refresh_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: 'access_token is required' },
        { status: 400 }
      );
    }

    // Get the current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Update existing connection
    const { error: updateError } = await supabase
      .from('connected_accounts')
      .update({
        access_token: access_token,
        refresh_token: refresh_token || null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', session.user.id)
      .eq('provider', provider);

    if (updateError) {
      console.error('Error updating connected account:', updateError);
      return NextResponse.json(
        { error: 'Failed to update account tokens' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: `Successfully updated ${provider} account tokens`,
        provider: provider
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Connect PATCH API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 