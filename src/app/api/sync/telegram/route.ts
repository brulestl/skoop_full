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

    console.log(`[TELEGRAM-SYNC] Starting sync for user: ${session.user.id}`);

    // Check if user has a connected Telegram account
    const { data: telegramAccount, error: accountError } = await supabase
      .from('connected_accounts')
      .select('status, last_error, telegram_session_string')
      .eq('user_id', session.user.id)
      .eq('provider', 'telegram')
      .single();

    if (accountError || !telegramAccount) {
      console.error('[TELEGRAM-SYNC] No Telegram account found:', accountError);
      return NextResponse.json(
        { error: 'No Telegram account connected. Please connect your Telegram account first.' },
        { status: 400 }
      );
    }

    if (telegramAccount.status === 'error') {
      console.error('[TELEGRAM-SYNC] Telegram account in error state:', telegramAccount.last_error);
      return NextResponse.json(
        { error: `Telegram account error: ${telegramAccount.last_error || 'Unknown error'}` },
        { status: 400 }
      );
    }

    if (!telegramAccount.telegram_session_string) {
      console.log('[TELEGRAM-SYNC] No session string - OAuth-only connection');
      return NextResponse.json(
        { error: 'no_session', message: 'Telegram connected via OAuth but no session string available for message sync' },
        { status: 409 }
      );
    }

    // Try to call the Supabase edge function
    let result;
    try {
      console.log('[TELEGRAM-SYNC] Calling ingest_telegram_saved edge function...');
      result = await supabase.functions.invoke('ingest_telegram_saved', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: { user_id: session.user.id }
      });

      console.log('[TELEGRAM-SYNC] Edge function response:', {
        error: result.error,
        data: result.data
      });

    } catch (functionError) {
      console.error('[TELEGRAM-SYNC] Edge function call failed:', functionError);
      
      // Fallback: Check if we have existing data in bookmarks_raw to process
      const { data: rawData, error: rawError } = await supabase
        .from('bookmarks_raw')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('source', 'telegram')
        .limit(10);

      if (!rawError && rawData && rawData.length > 0) {
        console.log(`[TELEGRAM-SYNC] Found ${rawData.length} raw Telegram messages to process`);
        
        // Process raw data into bookmarks format
        const bookmarkRows = rawData.map(raw => ({
          user_id: raw.user_id,
          source: 'telegram',
          provider_item_id: raw.provider_item_id,
          url: raw.url,
          title: raw.text || raw.url || `Telegram message ${raw.provider_item_id}`,
          description: raw.text,
          tags: ['telegram'],
          created_at: raw.created_at,
          updated_at: new Date().toISOString()
        }));

        // Upsert into bookmarks table
        const { error: upsertError } = await supabase
          .from('bookmarks')
          .upsert(bookmarkRows, { 
            onConflict: 'user_id,source,provider_item_id',
            ignoreDuplicates: false 
          });

        if (upsertError) {
          console.error('[TELEGRAM-SYNC] Failed to process raw data:', upsertError);
          return NextResponse.json(
            { error: 'Failed to process existing Telegram data', details: upsertError.message },
            { status: 500 }
          );
        }

        return NextResponse.json({ 
          success: true,
          count: bookmarkRows.length,
          inserted: bookmarkRows.length,
          existing_count: bookmarkRows.length,
          message: `Processed ${bookmarkRows.length} existing Telegram messages`,
          fallback: true
        });
      }

      return NextResponse.json(
        { 
          error: 'Telegram sync service unavailable', 
          details: functionError instanceof Error ? functionError.message : 'Edge function failed',
          suggestion: 'Please try again later or contact support if the issue persists'
        },
        { status: 503 }
      );
    }

    if (result.error) {
      console.error('[TELEGRAM-SYNC] Supabase function error:', result.error);
      
      // Handle specific error cases
      if (result.error.message?.includes('409') || result.error.message?.includes('no_session')) {
        return NextResponse.json(
          { error: 'no_session', message: 'Telegram session expired. Please reconnect your account.' },
          { status: 409 }
        );
      }

      if (result.error.message?.includes('TELEGRAM_API_ID') || result.error.message?.includes('TELEGRAM_API_HASH')) {
        return NextResponse.json(
          { error: 'Telegram API not configured on server. Please contact support.' },
          { status: 500 }
        );
      }

      if (result.error.message?.includes('Session format incompatible')) {
        return NextResponse.json(
          { error: 'Telegram session format incompatible. Please reconnect your account.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Telegram sync failed', 
          details: result.error.message || 'Unknown error from sync service'
        },
        { status: 500 }
      );
    }

    // Get existing bookmarks count for better user feedback
    const { count: existingCount } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('source', 'telegram');

    const insertedCount = result.data?.inserted || 0;
    
    console.log(`[TELEGRAM-SYNC] Sync completed. Inserted: ${insertedCount}, Existing: ${existingCount}`);
    
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
    console.error('[TELEGRAM-SYNC] Route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Please try again or contact support if the issue persists'
      },
      { status: 500 }
    );
  }
} 