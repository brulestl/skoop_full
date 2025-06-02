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
      .select('*')
      .eq('user_id', session.user.id)
      .eq('provider', 'telegram')
      .single();

    if (accountError && accountError.code !== 'PGRST116') {
      console.error('[TELEGRAM-SYNC] Error checking telegram account:', accountError);
      return NextResponse.json(
        { error: 'Failed to check telegram account' },
        { status: 500 }
      );
    }

    // Check current bookmarks count for debugging
    const { count: currentBookmarksCount, error: countError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    console.log(`[TELEGRAM-SYNC] Current bookmarks in database: ${currentBookmarksCount || 0}`);

    // Check for messages in telegram_messages table to migrate
    // Use the telegram_user_id from connected account, not session.user.id
    let telegramMessages = null;
    let messagesError = null;

    if (telegramAccount?.provider_user_id) {
      console.log(`[TELEGRAM-SYNC] Looking for messages with telegram_user_id: ${telegramAccount.provider_user_id}`);
      
      const { data, error } = await supabase
        .from('telegram_messages')
        .select('*')
        .eq('telegram_user_id', telegramAccount.provider_user_id)
        .order('timestamp', { ascending: false });
        
      telegramMessages = data;
      messagesError = error;
    } else {
      // Fallback: try to find messages by session.user.id (for legacy data)
      console.log(`[TELEGRAM-SYNC] No telegram account found, trying fallback with user_id: ${session.user.id}`);
      
      const { data, error } = await supabase
        .from('telegram_messages')
        .select('*')
        .eq('telegram_user_id', session.user.id)
        .order('timestamp', { ascending: false });
        
      telegramMessages = data;
      messagesError = error;
    }

    if (messagesError) {
      console.error('[TELEGRAM-SYNC] Error fetching telegram messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch telegram messages' },
        { status: 500 }
      );
    }

    console.log(`[TELEGRAM-SYNC] Found ${telegramMessages?.length || 0} messages in telegram_messages table`);

    let migratedCount = 0;
    let connectedAccountCreated = false;

    // If we have messages but no connected account, create one
    if (telegramMessages && telegramMessages.length > 0 && !telegramAccount) {
      console.log('[TELEGRAM-SYNC] Creating connected account for telegram messages');
      
      // Get the first message to extract telegram user info
      const firstMessage = telegramMessages[0];
      
      const { error: connectError } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: session.user.id,
          provider: 'telegram',
          provider_user_id: firstMessage.telegram_user_id || session.user.id,
          username: null, // We don't have username from messages
          display_name: 'Telegram Messages',
          status: 'active',
          connected_at: new Date().toISOString(),
          access_token: 'migrated_messages', // Placeholder token
          updated_at: new Date().toISOString()
        });

      if (connectError) {
        console.error('[TELEGRAM-SYNC] Error creating connected account:', connectError);
        // Continue anyway - we can still migrate messages
      } else {
        connectedAccountCreated = true;
        console.log('[TELEGRAM-SYNC] Connected account created successfully');
      }
    }

    // Migrate messages from telegram_messages to bookmarks
    if (telegramMessages && telegramMessages.length > 0) {
      console.log(`[TELEGRAM-SYNC] Found ${telegramMessages.length} telegram messages to migrate`);

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

      console.log(`[TELEGRAM-SYNC] Filtered ${bookmarkRows.length} valid messages (with text) from ${telegramMessages.length} total`);

      if (bookmarkRows.length > 0) {
        console.log(`[TELEGRAM-SYNC] Migrating ${bookmarkRows.length} messages to bookmarks table`);

        // Use upsert to prevent duplicates
        const { data: insertedBookmarks, error: insertError } = await supabase
          .from('bookmarks')
          .upsert(bookmarkRows, {
            onConflict: 'user_id,source,provider_item_id',
            ignoreDuplicates: false
          })
          .select('id');

        if (insertError) {
          console.error('[TELEGRAM-SYNC] Error inserting bookmarks:', insertError);
          return NextResponse.json(
            { error: 'Failed to migrate messages to bookmarks' },
            { status: 500 }
          );
        }

        migratedCount = insertedBookmarks?.length || 0;
        console.log(`[TELEGRAM-SYNC] Successfully migrated ${migratedCount} messages`);
      }
    }

    // Check final bookmarks count
    const { count: finalBookmarksCount, error: finalCountError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    console.log(`[TELEGRAM-SYNC] Final bookmarks in database: ${finalBookmarksCount || 0} (was ${currentBookmarksCount || 0})`);

    // Always return success and trigger UI refresh
    const response = {
      success: true,
      migratedCount,
      connectedAccountCreated,
      currentBookmarksCount: currentBookmarksCount || 0,
      finalBookmarksCount: finalBookmarksCount || 0,
      telegramMessagesFound: telegramMessages?.length || 0,
      message: migratedCount > 0 
        ? `Successfully synced ${migratedCount} Telegram messages${connectedAccountCreated ? ' and created connection' : ''}`
        : connectedAccountCreated 
          ? 'Connected Telegram account successfully'
          : `Sync completed. Database has ${finalBookmarksCount || 0} total bookmarks`,
      debug: {
        hadTelegramAccount: !!telegramAccount,
        telegramMessagesInDb: telegramMessages?.length || 0,
        validMessagesWithText: telegramMessages?.filter(msg => msg.text && msg.text.trim().length > 0).length || 0,
        telegramUserId: telegramAccount?.provider_user_id || 'none'
      }
    };

    console.log('[TELEGRAM-SYNC] Sync completed:', response);

    return NextResponse.json(response);

  } catch (error) {
    console.error('[TELEGRAM-SYNC] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 