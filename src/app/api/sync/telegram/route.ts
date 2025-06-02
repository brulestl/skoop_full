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
      .select('provider_user_id, status, last_error')
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

    // STEP 1: Check if there are messages in telegram_messages that need to be migrated
    const { data: telegramMessages, error: messagesError } = await supabase
      .from('telegram_messages')
      .select('*')
      .eq('telegram_user_id', telegramAccount.provider_user_id)
      .order('timestamp', { ascending: false });

    if (messagesError) {
      console.error('[TELEGRAM-SYNC] Error fetching telegram messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch Telegram messages', details: messagesError.message },
        { status: 500 }
      );
    }

    console.log(`[TELEGRAM-SYNC] Found ${telegramMessages?.length || 0} messages in telegram_messages table`);

    let migratedCount = 0;
    let skippedCount = 0;

    // STEP 2: If there are messages in telegram_messages, migrate them to bookmarks
    if (telegramMessages && telegramMessages.length > 0) {
      console.log(`[TELEGRAM-SYNC] Migrating ${telegramMessages.length} messages from telegram_messages to bookmarks`);

      // Convert Telegram messages to bookmark format
      const bookmarkRows = telegramMessages
        .filter(msg => msg.text && msg.text.trim().length > 0) // Only messages with text
        .map(msg => {
          // Handle image URLs - store in metadata
          const hasImages = msg.image_urls && Array.isArray(msg.image_urls) && msg.image_urls.length > 0;
          const metadata = {
            telegram_message_id: msg.message_id,
            chat_id: msg.chat_id,
            has_images: hasImages,
            image_count: hasImages ? msg.image_urls.length : 0,
            ...(hasImages && { image_urls: msg.image_urls }),
            original_timestamp: msg.timestamp
          };

          return {
            user_id: session.user.id,
            source: 'telegram',
            provider_item_id: parseInt(msg.message_id),
            url: null, // Telegram messages don't have URLs
            title: msg.text.length > 100 ? msg.text.substring(0, 100) + '...' : msg.text,
            description: msg.text,
            tags: hasImages ? ['telegram', 'images'] : ['telegram'],
            metadata: metadata,
            created_at: msg.timestamp || new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        });

      skippedCount = telegramMessages.length - bookmarkRows.length;

      if (bookmarkRows.length > 0) {
        console.log(`[TELEGRAM-SYNC] Inserting ${bookmarkRows.length} messages into bookmarks table`);

        // Insert messages into bookmarks table
        const { data: insertedData, error: upsertError } = await supabase
          .from('bookmarks')
          .upsert(bookmarkRows, { 
            onConflict: 'user_id,source,provider_item_id',
            ignoreDuplicates: false 
          })
          .select();

        if (upsertError) {
          console.error('[TELEGRAM-SYNC] Failed to migrate messages:', upsertError);
          return NextResponse.json(
            { error: 'Failed to migrate Telegram messages', details: upsertError.message },
            { status: 500 }
          );
        }

        migratedCount = insertedData?.length || bookmarkRows.length;
        console.log(`[TELEGRAM-SYNC] Successfully migrated ${migratedCount} messages`);
      }
    }

    // STEP 3: Get final count of Telegram bookmarks
    const { count: totalCount, error: countError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('source', 'telegram');

    if (countError) {
      console.error('[TELEGRAM-SYNC] Error counting Telegram bookmarks:', countError);
      return NextResponse.json(
        { error: 'Failed to check Telegram bookmarks', details: countError.message },
        { status: 500 }
      );
    }

    // STEP 4: Update the connected account's last sync timestamp
    await supabase
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', session.user.id)
      .eq('provider', 'telegram');

    console.log(`[TELEGRAM-SYNC] Sync completed. Migrated: ${migratedCount}, Skipped: ${skippedCount}, Total: ${totalCount}`);
    
    // STEP 5: Return appropriate response
    if (migratedCount > 0) {
      return NextResponse.json({ 
        success: true,
        count: migratedCount,
        inserted: migratedCount,
        skipped: skippedCount,
        existing_count: totalCount || 0,
        message: `Successfully migrated ${migratedCount} Telegram messages to bookmarks${skippedCount > 0 ? ` (${skippedCount} empty messages skipped)` : ''}`,
        migrated: true
      });
    } else {
      return NextResponse.json({ 
        success: true,
        count: 0,
        inserted: 0,
        existing_count: totalCount || 0,
        message: `Telegram is up to date (${totalCount || 0} messages total)`,
        note: 'All messages are already in bookmarks'
      });
    }

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