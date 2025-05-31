import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { TelegramApi } from "https://esm.sh/telegram@2.22.2"
// Temporarily commenting out telegram import while debugging
// import { createTelegramClientWithSession, TelegramClientManager } from './lib/telegramClient.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TelegramMessage {
  id: number;
  message?: string;
  date: number;
  media?: {
    caption?: string;
    webpage?: {
      url?: string;
    };
  };
}

interface BookmarkRaw {
  user_id: string;
  source: string;
  provider_item_id: number; // Added for telegram message ID
  text: string | null; // Added for message text
  url: string | null; // Added for extracted URLs
  raw_json: any; // JSONB data
  created_at: string; // Added for message timestamp
  fetched_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // TASK 1: Get telegram account with last_sync_message_id for incremental sync
    const { data: connectedAccount, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('telegram_session_string, last_sync_message_id')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (accountError) {
      console.error('Error fetching connected account:', accountError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch telegram account' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!connectedAccount?.telegram_session_string) {
      // TASK TG-NOSESSION: Return 409 with specific error for missing session
      return new Response(
        JSON.stringify({ error: 'no_session' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Telegram client
    const client = new TelegramApi({
      apiId: parseInt(Deno.env.get('TELEGRAM_API_ID') ?? ''),
      apiHash: Deno.env.get('TELEGRAM_API_HASH') ?? '',
      stringSession: connectedAccount.telegram_session_string,
    })

    try {
      await client.start()

      // TASK 1: Use incremental sync with offsetId to avoid duplicates
      const lastSyncMessageId = connectedAccount.last_sync_message_id || 0
      console.log(`Starting incremental sync from message ID: ${lastSyncMessageId}`)

      const messages = await client.getMessages('me', {
        limit: 100,
        offsetId: lastSyncMessageId, // Only get messages newer than this ID
      })

      console.log(`Fetched ${messages.length} messages from telegram`)

      // TASK 1: If no new messages, return 204
      if (messages.length === 0) {
        return new Response(
          JSON.stringify({ success: true, note: 'no_new', message: 'No new messages to sync' }),
          { status: 204, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Filter valid messages (text OR caption OR url)
      const validMessages = messages.filter((msg: TelegramMessage) => {
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url
        return text || url
      })

      console.log(`Filtered to ${validMessages.length} valid messages`)

      if (validMessages.length === 0) {
        return new Response(
          JSON.stringify({ success: true, note: 'no_new', message: 'No valid new messages to sync' }),
          { status: 204, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Prepare batch data with new schema columns
      const rawRows = validMessages.map((msg: TelegramMessage) => {
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url ?? null
        
        return {
          user_id: user.id,
          source: 'telegram' as const,
          provider_item_id: msg.id,
          text: text || null,
          url: url,
          created_at: new Date(msg.date * 1000).toISOString(), // Preserve timezone (UTC)
          raw_json: msg,
          fetched_at: new Date().toISOString(),
        }
      })

      // Batch upsert with conflict handling
      const { data: insertedData, error: insertError } = await supabaseClient
        .from('bookmarks_raw')
        .upsert(rawRows, {
          onConflict: 'user_id,source,provider_item_id',
          ignoreDuplicates: false
        })

      if (insertError) {
        console.error('Error inserting telegram messages:', insertError)
        return new Response(
          JSON.stringify({ error: 'Failed to save telegram messages', details: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // TG-BOOKMARKS: Upsert equivalent rows into bookmarks table for dashboard display
      const bookmarkRows = rawRows.map(r => ({
        user_id:    r.user_id,
        source:     'telegram' as const,
        url:        r.url ?? '',                                   // cannot be null
        title:      r.text ?? r.url ?? '',
        description: r.text ?? null,
        tags:       ['telegram'],
        created_at: r.created_at,
        updated_at: new Date().toISOString()
      }));

      const { error: bookmarkErr } = await supabaseClient
        .from('bookmarks')
        .upsert(bookmarkRows, { onConflict: 'user_id,url', ignoreDuplicates: false });

      if (bookmarkErr) console.error('TG sync → bookmarks error', bookmarkErr);

      // TASK 1: Update last_sync_message_id after successful insert
      const newMessageIds = validMessages.map(msg => msg.id)
      const maxMessageId = Math.max(...newMessageIds)
      
      const { error: updateError } = await supabaseClient
        .from('connected_accounts')
        .update({
          last_sync_message_id: maxMessageId,
          last_sync_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('provider', 'telegram')

      if (updateError) {
        console.error('Error updating sync metadata:', updateError)
        // Don't fail the request, just log the error
      }

      console.log(`Successfully synced ${validMessages.length} telegram messages, new max ID: ${maxMessageId}`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Successfully synced ${validMessages.length} telegram messages`,
          inserted: validMessages.length,
          lastMessageId: maxMessageId
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (telegramError) {
      console.error('Telegram API error:', telegramError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch messages from Telegram', details: telegramError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } finally {
      try {
        await client.disconnect()
      } catch (disconnectError) {
        console.error('Error disconnecting telegram client:', disconnectError)
      }
    }

  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

/* TASK 1 ✅ Incremental Sync Implementation:
 * - Uses offsetId with last_sync_message_id for incremental fetch
 * - Returns 204 when no new messages
 * - Updates last_sync_message_id after successful sync
 * - Preserves timezone with new Date(unix*1000) → UTC
 * - Deduplication via unique index uniq_braw_user_src_item
 */

/* Debug info:
 * TASK TG-PEER ✅: Using 'me' peer directly
 * TASK TG-MAP ✅: Accept text OR caption OR url messages  
 * TASK TG-NOSESSION ✅: Return 409 for missing session
 * TASK TG-INSERT ✅: Batch upsert with conflict handling
 * New schema mapping:
 * - msg.id → provider_item_id
 * - msg.message/caption → text
 * - msg.date → created_at
 * - msg.media.webpage.url → url
 * - full msg → raw_json
 */ 