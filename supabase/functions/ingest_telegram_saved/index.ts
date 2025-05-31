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

    // TASK TG-NOSESSION: Get telegram session string and return 409 if missing
    const { data: connectedAccount, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('telegram_session_string')
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

      // TASK TG-PEER: Use 'me' peer directly instead of looking up provider_user_id
      const messages = await client.getMessages('me', {
        limit: 100,
      })

      console.log(`Fetched ${messages.length} messages from telegram`)

      // TASK TG-MAP: Accept messages with text OR caption OR url
      const validMessages = messages.filter((msg: TelegramMessage) => {
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url
        // Accept messages that have text OR url
        return text || url
      })

      console.log(`Filtered to ${validMessages.length} valid messages`)

      if (validMessages.length === 0) {
        return new Response(
          JSON.stringify({ success: true, message: 'No valid messages to sync', count: 0 }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // TASK TG-INSERT: Prepare batch data with new schema columns
      const rawRows = validMessages.map((msg: TelegramMessage) => {
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url ?? null
        
        return {
          user_id: user.id,
          source: 'telegram' as const,
          provider_item_id: msg.id, // Telegram message ID
          text: text || null,       // Message text or caption
          url: url,                 // Webpage URL if present
          created_at: new Date(msg.date * 1000).toISOString(), // Convert unix timestamp
          raw_json: msg,           // Full message object
          fetched_at: new Date().toISOString(),
        }
      })

      // TASK TG-INSERT: Use upsert with conflict handling for batch insert
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

      console.log(`Successfully synced ${validMessages.length} telegram messages`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Successfully synced ${validMessages.length} telegram messages`,
          count: validMessages.length
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