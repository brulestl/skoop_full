import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createTelegramClientWithSession, TelegramClientManager } from './lib/telegramClient.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TelegramMessage {
  id: string;
  text: string;
  date: Date;
  mediaType?: string;
  fileName?: string;
  fileSize?: number;
  mediaUrl?: string;
  fromUserId?: string;
  fromUserName?: string;
}

interface BookmarkRaw {
  user_id: string;
  source: string; // Must be a provider_type: 'github', 'twitter', 'reddit', 'stack'  
  raw_json: any; // JSONB data
  fetched_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('📥 Starting Telegram saved messages ingestion...');

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('No user found')
    }

    console.log('👤 Processing for user:', user.id);

    // Get Telegram connected account
    const { data: accounts, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (accountError || !accounts) {
      throw new Error('No Telegram account connected. Please connect your Telegram account first.')
    }

    const sessionString = accounts.telegram_session_string
    if (!sessionString) {
      throw new Error('No Telegram session string found. Please re-authenticate with Telegram.')
    }

    console.log('✅ Found Telegram session for user');
    
    // Get Telegram API credentials from environment variables
    const apiId = Deno.env.get('TELEGRAM_API_ID')
    const apiHash = Deno.env.get('TELEGRAM_API_HASH')
    
    if (!apiId || !apiHash) {
      throw new Error('Telegram API credentials not configured. Please set TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables.')
    }

    console.log('✅ Telegram API credentials validated');

    let telegramClient: TelegramClientManager | undefined;
    let fetchedMessages: TelegramMessage[] = [];

    try {
      // Create Telegram client with session string
      console.log('🔌 Creating Telegram client with session...');
      telegramClient = createTelegramClientWithSession(sessionString);
      
      // Connect to Telegram
      console.log('📡 Connecting to Telegram...');
      const connectionResult = await telegramClient.connect();
      
      if (!connectionResult.success) {
        throw new Error(`Failed to connect to Telegram: ${connectionResult.error}`);
      }

      console.log('✅ Connected to Telegram successfully');

      // Check if client is authenticated
      const isConnected = await telegramClient.isConnected();
      if (!isConnected) {
        throw new Error('Telegram client is not authenticated. Session may be expired.');
      }

      console.log('✅ Telegram client authenticated');

      // Fetch saved messages (messages with yourself)
      console.log('📨 Fetching saved messages (last 20)...');
      const messages = await telegramClient.getSavedMessages(20);
      
      console.log(`📥 Retrieved ${messages.length} saved messages`);

      // Process and format messages
      fetchedMessages = messages.map(msg => {
        const formatted = TelegramClientManager.formatMessage(msg);
        return {
          id: formatted.id,
          text: formatted.text || '',
          date: formatted.date,
          mediaType: formatted.mediaType,
          fileName: formatted.fileName,
          fileSize: formatted.fileSize,
          mediaUrl: undefined, // Will be processed separately if needed
          fromUserId: 'self', // Saved messages are from self
          fromUserName: 'Saved Messages',
        };
      });

      console.log(`✅ Processed ${fetchedMessages.length} messages`);

      // Disconnect from Telegram
      await telegramClient.disconnect();
      console.log('✅ Disconnected from Telegram');

    } catch (telegramError) {
      console.error('❌ Telegram client error:', telegramError);
      
      // Try to disconnect if client exists
      if (telegramClient) {
        try {
          await telegramClient.disconnect();
        } catch (disconnectError) {
          console.error('Failed to disconnect Telegram client:', disconnectError);
        }
      }
      
      throw new Error(`Failed to fetch Telegram messages: ${telegramError.message}`);
    }

    // Map messages to bookmarks_raw schema (actual database schema)
    const bookmarksRaw: BookmarkRaw[] = fetchedMessages.map((msg, index) => {
      // Prepare the raw JSON data that contains all the information
      const rawJsonData = {
        // Telegram-specific data
        telegram_message_id: msg.id,
        message_text: msg.text,
        message_date: msg.date.toISOString(),
        
        // Metadata for processing
        metadata: {
          from_user: msg.fromUserId,
          from_user_name: msg.fromUserName,
          media_type: msg.mediaType,
          file_name: msg.fileName,
          file_size: msg.fileSize,
          media_url: msg.mediaUrl,
          sync_timestamp: new Date().toISOString(),
          has_media: !!msg.mediaType,
          character_count: msg.text?.length || 0,
        },
        
        // For processing into bookmarks table later
        processing_data: {
          url: `tg://saved_message_${msg.id}`,
          title: msg.text 
            ? (msg.text.length > 100 ? msg.text.substring(0, 100) + '...' : msg.text)
            : msg.fileName || 'Saved Message',
          description: msg.text || null,
          source_identifier: 'telegram_saved',
        },
        
        // Original message data
        original_message: {
          id: msg.id,
          text: msg.text,
          date: msg.date.toISOString(),
          media: msg.mediaType ? {
            type: msg.mediaType,
            fileName: msg.fileName,
            fileSize: msg.fileSize,
            url: msg.mediaUrl,
          } : null,
        }
      };

      return {
        user_id: user.id,
        source: 'github', // Using 'github' as closest match to provider_type enum since 'telegram' is not available
        raw_json: rawJsonData,
        fetched_at: new Date().toISOString(),
      };
    });

    console.log(`📝 Mapped ${bookmarksRaw.length} messages to bookmarks_raw schema`);

    // Insert into bookmarks_raw table
    let insertedCount = 0;
    if (bookmarksRaw.length > 0) {
      console.log('💾 Inserting messages into bookmarks_raw...');
      
      const { data: insertedBookmarks, error: insertError } = await supabaseClient
        .from('bookmarks_raw')
        .insert(bookmarksRaw)
        .select();

      if (insertError) {
        console.error('❌ Error inserting bookmarks_raw:', insertError);
        throw insertError;
      }

      insertedCount = insertedBookmarks?.length || bookmarksRaw.length;
      console.log(`✅ Successfully inserted ${insertedCount} records into bookmarks_raw`);
    }

    // Update last sync time
    console.log('📅 Updating last sync timestamp...');
    const { error: updateError } = await supabaseClient
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram');

    if (updateError) {
      console.error('⚠️ Failed to update last sync time:', updateError);
    }

    // Prepare summary statistics
    const mediaCount = fetchedMessages.filter(msg => msg.mediaType).length;
    const textCount = fetchedMessages.filter(msg => msg.text).length;
    const avgTextLength = textCount > 0 
      ? Math.round(fetchedMessages.reduce((sum, msg) => sum + (msg.text?.length || 0), 0) / textCount)
      : 0;

    const summary = {
      total_messages: fetchedMessages.length,
      inserted_count: insertedCount,
      messages_with_media: mediaCount,
      messages_with_text: textCount,
      average_text_length: avgTextLength,
      oldest_message: fetchedMessages.length > 0 
        ? Math.min(...fetchedMessages.map(m => m.date.getTime()))
        : null,
      newest_message: fetchedMessages.length > 0 
        ? Math.max(...fetchedMessages.map(m => m.date.getTime()))
        : null,
    };

    console.log('🎉 Telegram saved messages ingestion completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${insertedCount} Telegram saved messages`,
        summary,
        details: {
          user_id: user.id,
          sync_timestamp: new Date().toISOString(),
          session_valid: true,
          api_connection_successful: true,
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('❌ Telegram ingest error:', error);
    
    // Determine error type for better user feedback
    let errorType = 'unknown_error';
    let userMessage = error.message;

    if (error.message.includes('No Telegram account connected')) {
      errorType = 'no_account_connected';
      userMessage = 'Please connect your Telegram account first in the dashboard.';
    } else if (error.message.includes('No Telegram session')) {
      errorType = 'session_expired';
      userMessage = 'Your Telegram session has expired. Please re-authenticate.';
    } else if (error.message.includes('Failed to connect to Telegram')) {
      errorType = 'connection_failed';
      userMessage = 'Unable to connect to Telegram. Please try again later.';
    } else if (error.message.includes('not authenticated')) {
      errorType = 'authentication_failed';
      userMessage = 'Telegram authentication failed. Please re-connect your account.';
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: userMessage,
        error_type: errorType,
        timestamp: new Date().toISOString(),
        details: {
          original_error: error.message,
          stack: error.stack?.split('\n').slice(0, 3), // Limited stack trace
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 