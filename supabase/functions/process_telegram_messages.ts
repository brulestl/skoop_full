import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookmarkRaw {
  id: string;
  user_id: string;
  source: string;
  raw_json: any;
  fetched_at: string;
}

interface ProcessedBookmark {
  user_id: string;
  url: string;
  title: string;
  description: string | null;
  summary: string | null;
  tags: string[] | null;
  source: string;
  metadata: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('📥 Starting Telegram message processing...');

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

    // Get unprocessed Telegram messages from bookmarks_raw
    const { data: rawMessages, error: fetchError } = await supabaseClient
      .from('bookmarks_raw')
      .select('*')
      .eq('user_id', user.id)
      .eq('source', 'telegram') // Now we can use 'telegram' since the enum was updated
      .not('raw_json->telegram_message_id', 'is', null)
      .order('fetched_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Error fetching raw messages:', fetchError);
      throw fetchError;
    }

    if (!rawMessages || rawMessages.length === 0) {
      console.log('ℹ️ No unprocessed Telegram messages found');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No new Telegram messages to process',
          processed_count: 0,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    console.log(`📝 Found ${rawMessages.length} Telegram messages to process`);

    // Process each message
    const processedBookmarks: ProcessedBookmark[] = [];
    const existingUrls = new Set<string>();

    for (const rawMessage of rawMessages) {
      try {
        const rawData = rawMessage.raw_json;
        
        // Extract data from the raw JSON
        const telegramId = rawData.telegram_message_id;
        const messageText = rawData.message_text || '';
        const messageDate = rawData.message_date;
        const metadata = rawData.metadata || {};
        const processingData = rawData.processing_data || {};

        // Create a unique URL for this Telegram message
        const messageUrl = processingData.url || `tg://saved_message_${telegramId}`;
        
        // Skip duplicates
        if (existingUrls.has(messageUrl)) {
          console.log(`⏭️ Skipping duplicate message: ${telegramId}`);
          continue;
        }
        existingUrls.add(messageUrl);

        // Create title from message content or filename
        let title = processingData.title || 'Telegram Saved Message';
        if (!title || title === 'Telegram Saved Message') {
          if (messageText && messageText.length > 0) {
            title = messageText.length > 100 
              ? messageText.substring(0, 100) + '...' 
              : messageText;
          } else if (metadata.file_name) {
            title = metadata.file_name;
          } else {
            title = `Saved Message ${telegramId}`;
          }
        }

        // Create description and summary
        const description = messageText || processingData.description || null;
        const summary = description && description.length > 500 
          ? description.substring(0, 500) + '...' 
          : description;

        // Generate tags based on content
        const tags: string[] = ['telegram', 'saved-messages'];
        
        // Add media type tag if present
        if (metadata.media_type) {
          tags.push('media');
          tags.push(metadata.media_type.toLowerCase());
        }
        
        // Add text tag if it has text content
        if (messageText && messageText.length > 0) {
          tags.push('text');
        }

        // Create metadata for the bookmark
        const bookmarkMetadata = {
          source: 'telegram',
          telegram_message_id: telegramId,
          message_date: messageDate,
          has_media: metadata.has_media || false,
          media_type: metadata.media_type,
          file_name: metadata.file_name,
          file_size: metadata.file_size,
          character_count: metadata.character_count || messageText?.length || 0,
          sync_timestamp: metadata.sync_timestamp,
          engagement: {
            saves: 1, // All saved messages have at least 1 save (the user saved it)
          }
        };

        const processedBookmark: ProcessedBookmark = {
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
        console.error('❌ Error processing message:', rawMessage.id, processingError);
        // Continue with other messages
      }
    }

    if (processedBookmarks.length === 0) {
      console.log('ℹ️ No valid messages to process');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No valid Telegram messages to process',
          processed_count: 0,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    console.log(`💾 Inserting ${processedBookmarks.length} processed bookmarks...`);

    // Insert processed bookmarks into bookmarks table
    const { data: insertedBookmarks, error: insertError } = await supabaseClient
      .from('bookmarks')
      .upsert(processedBookmarks, {
        onConflict: 'user_id,url',
        ignoreDuplicates: false
      })
      .select();

    if (insertError) {
      console.error('❌ Error inserting bookmarks:', insertError);
      throw insertError;
    }

    const insertedCount = insertedBookmarks?.length || 0;
    console.log(`✅ Successfully processed ${insertedCount} Telegram messages into bookmarks`);

    // Update the connected_accounts table to track processing
    await supabaseClient
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram');

    // Prepare response with statistics
    const response = {
      success: true,
      message: `Successfully processed ${insertedCount} Telegram saved messages`,
      processed_count: insertedCount,
      total_raw_messages: rawMessages.length,
      details: {
        user_id: user.id,
        processing_timestamp: new Date().toISOString(),
        messages_with_media: processedBookmarks.filter(b => b.metadata.has_media).length,
        messages_with_text: processedBookmarks.filter(b => b.description && b.description.length > 0).length,
        average_text_length: processedBookmarks.reduce((sum, b) => sum + (b.metadata.character_count || 0), 0) / processedBookmarks.length,
      }
    };

    console.log('🎉 Telegram message processing completed successfully');

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('❌ Telegram processing error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to process Telegram messages',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}) 