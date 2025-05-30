import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Temporarily commenting out telegram import while debugging
// import { createTelegramClientWithSession, TelegramClientManager } from './lib/telegramClient.ts'

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

    let fetchedMessages: TelegramMessage[] = [];

    try {
      console.log('🔌 Attempting to fetch real Telegram saved messages...');
      
      // Import telegram client dynamically to avoid import issues
      let TelegramClient: any, StringSession: any, Api: any;
      
      try {
        console.log('📦 Loading Telegram client...');
        const telegramModule = await import('https://esm.sh/telegram@2.22.2');
        TelegramClient = telegramModule.TelegramClient;
        
        const sessionsModule = await import('https://esm.sh/telegram@2.22.2/sessions');
        StringSession = sessionsModule.StringSession;
        
        const tlModule = await import('https://esm.sh/telegram@2.22.2/tl');
        Api = tlModule.Api;
        
        console.log('✅ Telegram modules loaded successfully');
      } catch (importError) {
        console.error('❌ Failed to import Telegram modules:', importError);
        throw new Error(`Telegram client import failed: ${importError.message}`);
      }

      const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') || '0');
      const apiHash = Deno.env.get('TELEGRAM_API_HASH') || '';

      if (!apiId || !apiHash) {
        throw new Error('Missing TELEGRAM_API_ID or TELEGRAM_API_HASH environment variables');
      }

      console.log('🔐 Creating Telegram client with session...');
      
      // Create session from stored session string
      const session = new StringSession(sessionString);
      
      // Initialize client
      const client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 3,
        timeout: 20000,
        useWSS: true,
      });

      console.log('📡 Connecting to Telegram...');
      await client.connect();

      // Check if client is authorized
      const isAuthorized = await client.checkAuthorization();
      if (!isAuthorized) {
        await client.disconnect();
        throw new Error('Telegram session expired. Please reconnect your Telegram account.');
      }

      console.log('✅ Telegram client authorized');

      // Fetch saved messages (messages with yourself)
      console.log('📨 Fetching saved messages...');
      const messages = await client.getMessages('me', {
        limit: 20,
        reverse: false,
      });

      console.log(`📥 Retrieved ${messages.length} saved messages`);

      // Process and format messages
      fetchedMessages = messages.map((msg: any) => {
        return {
          id: msg.id.toString(),
          text: msg.message || '',
          date: new Date(msg.date * 1000),
          mediaType: msg.media ? msg.media.className : undefined,
          fileName: msg.media && msg.media.document && msg.media.document.attributes
            ? msg.media.document.attributes.find((attr: any) => attr.className === 'DocumentAttributeFilename')?.fileName
            : undefined,
          fileSize: msg.media && msg.media.document ? Number(msg.media.document.size) : undefined,
          fromUserId: 'self',
          fromUserName: 'Saved Messages',
        };
      });

      console.log(`✅ Processed ${fetchedMessages.length} real saved messages`);

      // Disconnect from Telegram
      await client.disconnect();
      console.log('✅ Disconnected from Telegram');

    } catch (telegramError) {
      console.error('❌ Telegram connection error:', telegramError);
      throw new Error(`Failed to fetch Telegram saved messages: ${telegramError.message}`);
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
        source: 'telegram', // Now using 'telegram' since the enum has been updated
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
      
      // Process messages to bookmarks table immediately
      console.log('🔄 Processing messages to bookmarks table...');
      
      const processedBookmarks = [];
      const existingUrls = new Set();

      for (const message of fetchedMessages) {
        try {
          // Create a unique URL for this Telegram message
          const messageUrl = `tg://saved_message_${message.id}`;
          
          // Skip duplicates
          if (existingUrls.has(messageUrl)) {
            continue;
          }
          existingUrls.add(messageUrl);

          // Create title from message content or filename
          let title = 'Telegram Saved Message';
          if (message.text && message.text.length > 0) {
            title = message.text.length > 100 
              ? message.text.substring(0, 100) + '...' 
              : message.text;
          } else if (message.fileName) {
            title = message.fileName;
          } else {
            title = `Saved Message ${message.id}`;
          }

          // Create description and summary
          const description = message.text || null;
          const summary = description && description.length > 500 
            ? description.substring(0, 500) + '...' 
            : description;

          // Generate tags based on content
          const tags = ['telegram', 'saved-messages'];
          
          // Add media type tag if present
          if (message.mediaType) {
            tags.push('media');
            tags.push(message.mediaType.toLowerCase());
          }
          
          // Add text tag if it has text content
          if (message.text && message.text.length > 0) {
            tags.push('text');
          }

          // Create metadata for the bookmark
          const bookmarkMetadata = {
            source: 'telegram',
            telegram_message_id: message.id,
            message_date: message.date.toISOString(),
            has_media: !!message.mediaType,
            media_type: message.mediaType,
            file_name: message.fileName,
            file_size: message.fileSize,
            character_count: message.text?.length || 0,
            sync_timestamp: new Date().toISOString(),
            engagement: {
              saves: 1, // All saved messages have at least 1 save (the user saved it)
            }
          };

          const processedBookmark = {
            user_id: user.id,
            url: messageUrl,
            title: title.trim(),
            description,
            summary,
            tags,
            source: 'telegram',
            metadata: bookmarkMetadata,
          };

          processedBookmarks.push(processedBookmark);

        } catch (processingError) {
          console.error('❌ Error processing message:', message.id, processingError);
          // Continue with other messages
        }
      }

      // Insert processed bookmarks into bookmarks table
      if (processedBookmarks.length > 0) {
        console.log(`💾 Inserting ${processedBookmarks.length} processed bookmarks...`);
        
        const { data: insertedProcessedBookmarks, error: processInsertError } = await supabaseClient
          .from('bookmarks')
          .upsert(processedBookmarks, {
            onConflict: 'user_id,url',
            ignoreDuplicates: false
          })
          .select();

        if (processInsertError) {
          console.error('❌ Error inserting processed bookmarks:', processInsertError);
          // Don't throw here, as the raw data was saved successfully
        } else {
          const processedCount = insertedProcessedBookmarks?.length || 0;
          console.log(`✅ Successfully processed ${processedCount} Telegram messages into bookmarks`);
        }
      }
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
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
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
    } else if (error.message.includes('import')) {
      errorType = 'import_error';
      userMessage = 'Telegram library loading failed. This is a technical issue on our end.';
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: userMessage,
        error_type: errorType,
        timestamp: new Date().toISOString(),
        debug_info: {
          original_error: error.message,
          error_name: error.name,
          stack_preview: error.stack?.split('\n').slice(0, 3), // Limited stack trace
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}) 