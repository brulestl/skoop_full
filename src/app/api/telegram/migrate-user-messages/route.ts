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

    // Verify this is the correct user
    const expectedUserId = 'e3ef0830-5658-445e-8193-17b28703ebf2';
    if (session.user.id !== expectedUserId) {
      return NextResponse.json(
        { error: 'This migration is only for the specific user who owns these Telegram messages' },
        { status: 403 }
      );
    }

    console.log(`[TELEGRAM-USER-MIGRATE] Starting migration for user: ${session.user.id}`);

    // Get the specific Telegram messages for this user
    const { data: telegramMessages, error: messagesError } = await supabase
      .from('telegram_messages')
      .select('*')
      .eq('telegram_user_id', '7710790237')
      .order('timestamp', { ascending: false });

    if (messagesError) {
      console.error('[TELEGRAM-USER-MIGRATE] Error fetching telegram messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch Telegram messages', details: messagesError.message },
        { status: 500 }
      );
    }

    if (!telegramMessages || telegramMessages.length === 0) {
      console.log('[TELEGRAM-USER-MIGRATE] No Telegram messages found');
      return NextResponse.json({
        success: true,
        count: 0,
        message: 'No Telegram messages found to migrate'
      });
    }

    console.log(`[TELEGRAM-USER-MIGRATE] Found ${telegramMessages.length} Telegram messages`);

    // Convert Telegram messages to bookmark format
    const bookmarkRows = telegramMessages
      .filter(msg => msg.text && msg.text.trim().length > 0) // Only messages with text
      .map(msg => {
        // Convert message_id from string to integer for provider_item_id
        const messageIdInt = parseInt(msg.message_id);
        
        // Create title (truncate if too long)
        const title = msg.text.length > 100 ? msg.text.substring(0, 100) + '...' : msg.text;
        
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
          provider_item_id: messageIdInt,
          url: null, // Telegram messages don't have URLs
          title: title,
          description: msg.text,
          tags: hasImages ? ['telegram', 'images'] : ['telegram'],
          metadata: metadata,
          created_at: msg.timestamp ? new Date(msg.timestamp).toISOString() : new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      });

    if (bookmarkRows.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        message: 'No valid Telegram messages found to migrate (messages need text content)',
        skipped: telegramMessages.length
      });
    }

    console.log(`[TELEGRAM-USER-MIGRATE] Migrating ${bookmarkRows.length} messages to bookmarks table`);
    console.log('[TELEGRAM-USER-MIGRATE] Sample data:', bookmarkRows[0]);

    // Upsert into bookmarks table
    const { data: insertedData, error: upsertError } = await supabase
      .from('bookmarks')
      .upsert(bookmarkRows, { 
        onConflict: 'user_id,source,provider_item_id',
        ignoreDuplicates: false 
      })
      .select();

    if (upsertError) {
      console.error('[TELEGRAM-USER-MIGRATE] Failed to migrate messages:', upsertError);
      return NextResponse.json(
        { error: 'Failed to migrate Telegram messages', details: upsertError.message },
        { status: 500 }
      );
    }

    const migratedCount = insertedData?.length || bookmarkRows.length;
    const skippedCount = telegramMessages.length - bookmarkRows.length;
    
    console.log(`[TELEGRAM-USER-MIGRATE] Successfully migrated ${migratedCount} messages, skipped ${skippedCount}`);

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
      skipped: skippedCount,
      existing_count: totalCount || 0,
      message: `Successfully migrated ${migratedCount} Telegram messages to bookmarks${skippedCount > 0 ? ` (${skippedCount} empty messages skipped)` : ''}`,
      migrated: true,
      details: {
        total_found: telegramMessages.length,
        with_text: bookmarkRows.length,
        without_text: skippedCount,
        user_id: session.user.id,
        telegram_user_id: '7710790237'
      }
    });

  } catch (error) {
    console.error('[TELEGRAM-USER-MIGRATE] Route error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 