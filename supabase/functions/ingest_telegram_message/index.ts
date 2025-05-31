import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Parse the incoming message from Telegram bot
    const msg = await req.json()
    console.log('[TG-BOT] Received message:', JSON.stringify(msg, null, 2))

    // Extract Telegram user ID
    const telegramUserId = msg.from?.id
    if (!telegramUserId) {
      console.error('[TG-BOT] No telegram user ID found in message')
      return new Response(
        JSON.stringify({ error: 'Invalid message format - missing from.id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[TG-BOT] Processing message from Telegram user: ${telegramUserId}`)

    // Query connected_accounts to find the user
    const { data: connectedAccount, error: accountError } = await supabase
      .from('connected_accounts')
      .select('user_id, provider_user_id, status')
      .eq('provider', 'telegram')
      .eq('provider_user_id', telegramUserId.toString())
      .single()

    if (accountError || !connectedAccount) {
      console.error('[TG-BOT] No connected account found for telegram user:', telegramUserId)
      return new Response(
        JSON.stringify({ error: 'Telegram account not connected to Skoop' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[TG-BOT] Found connected account for user: ${connectedAccount.user_id}`)

    // Build rawRow object
    const rawRow = {
      user_id: connectedAccount.user_id,
      source: 'telegram',
      provider_item_id: msg.id || Date.now(), // Use message ID or timestamp as fallback
      text: msg.message ?? msg.caption ?? '',
      url: msg.media?.webpage?.url ?? null,
      created_at: new Date(msg.date * 1000).toISOString(),
      raw_json: msg,
      fetched_at: new Date().toISOString()
    }

    console.log(`[TG-BOT] Prepared raw row:`, rawRow)

    // Upsert into bookmarks_raw
    const { data: rawData, error: rawError } = await supabase
      .from('bookmarks_raw')
      .upsert([rawRow], { 
        onConflict: 'user_id,source,provider_item_id',
        ignoreDuplicates: false
      })

    if (rawError) {
      console.error('[TG-BOT] Error inserting raw data:', rawError)
      
      // Check if it's a conflict/duplicate
      if (rawError.code === '23505' || rawError.message.includes('duplicate')) {
        return new Response(
          JSON.stringify({ duplicate: true, message: 'Message already exists' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        )
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to save message', details: rawError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[TG-BOT] Successfully saved raw message for user ${connectedAccount.user_id}`)

    // Task 4 - Mirror to bookmarks table (optional)
    const bookmarkRow = {
      user_id: connectedAccount.user_id,
      source: 'telegram',
      provider_item_id: rawRow.provider_item_id,
      url: rawRow.url || null, // Allow null URLs
      title: rawRow.text || rawRow.url || `Telegram message ${rawRow.provider_item_id}`,
      description: rawRow.text || null,
      tags: ['telegram'],
      created_at: rawRow.created_at,
      updated_at: new Date().toISOString()
    }

    // Only insert into bookmarks if we have meaningful content
    if (bookmarkRow.title && bookmarkRow.title !== `Telegram message ${rawRow.provider_item_id}`) {
      const { error: bookmarkError } = await supabase
        .from('bookmarks')
        .upsert([bookmarkRow], { 
          onConflict: 'user_id,source,provider_item_id',
          ignoreDuplicates: false
        })

      if (bookmarkError) {
        console.error('[TG-BOT] Error inserting bookmark:', bookmarkError)
        // Don't fail the request, raw data is already saved
      } else {
        console.log(`[TG-BOT] Successfully mirrored to bookmarks table`)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message processed successfully',
        user_id: connectedAccount.user_id,
        provider_item_id: rawRow.provider_item_id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[TG-BOT] General error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}) 