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

    console.log(`[TELEGRAM-MIGRATE] Starting migration for user: ${session.user.id}`);

    // Check if user has a connected Telegram account
    const { data: telegramAccount, error: accountError } = await supabase
      .from('connected_accounts')
      .select('provider_user_id')
      .eq('user_id', session.user.id)
      .eq('provider', 'telegram')
      .single();

    if (accountError || !telegramAccount) {
      console.error('[TELEGRAM-MIGRATE] No Telegram account found:', accountError);
      return NextResponse.json(
        { error: 'No Telegram account connected. Please connect your Telegram account first.' },
        { status: 400 }
      );
    }

    // Get existing Telegram messages from telegram_messages table
    const { data: telegramMessages, error: messagesError } = await supabase
      .from('telegram_messages')
      .select('*')
      .eq('telegram_user_id', telegramAccount.provider_user_id)
      .order('timestamp', { ascending: false })
      .limit(100); // Limit to recent 100 messages

    if (messagesError) {
      console.error('[TELEGRAM-MIGRATE] Error fetching telegram messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch Telegram messages', details: messagesError.message },
        { status: 500 }
      );
    }

    if (!telegramMessages || telegramMessages.length === 0) {
      console.log('[TELEGRAM-MIGRATE] No Telegram messages found');
      return NextResponse.json({
        success: true,
        count: 0,
        message: 'No Telegram messages found to migrate'
      });
    }

    console.log(`[TELEGRAM-MIGRATE] Found ${telegramMessages.length} Telegram messages`);

    // Convert Telegram messages to bookmark format
    const bookmarkRows = telegramMessages
      .filter(msg => msg.text && msg.text.trim().length > 0) // Only messages with text
      .map(msg => ({
        user_id: session.user.id,
        source: 'telegram',
        provider_item_id: parseInt(msg.message_id),
        url: null, // Telegram messages don't have URLs
        title: msg.text.length > 100 ? msg.text.substring(0, 100) + '...' : msg.text,
        description: msg.text,
        tags: ['telegram'],
        created_at: msg.timestamp || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

    if (bookmarkRows.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        message: 'No valid Telegram messages found to migrate (messages need text content)'
      });
    }

    console.log(`[TELEGRAM-MIGRATE] Migrating ${bookmarkRows.length} messages to bookmarks table`);

    // Upsert into bookmarks table
    const { data: insertedData, error: upsertError } = await supabase
      .from('bookmarks')
      .upsert(bookmarkRows, { 
        onConflict: 'user_id,source,provider_item_id',
        ignoreDuplicates: false 
      })
      .select();

    if (upsertError) {
      console.error('[TELEGRAM-MIGRATE] Failed to migrate messages:', upsertError);
      return NextResponse.json(
        { error: 'Failed to migrate Telegram messages', details: upsertError.message },
        { status: 500 }
      );
    }

    const migratedCount = insertedData?.length || bookmarkRows.length;
    
    console.log(`[TELEGRAM-MIGRATE] Successfully migrated ${migratedCount} messages`);

    // Get total count of Telegram bookmarks for user feedback
    const { count: totalCount } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('source', 'telegram');

    return NextResponse.json({
      success: true,
      count: migratedCount,
      inserted: migratedCount,
      existing_count: totalCount || 0,
      message: `Successfully migrated ${migratedCount} Telegram messages to bookmarks`,
      migrated: true
    });

  } catch (error) {
    console.error('[TELEGRAM-MIGRATE] Route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 