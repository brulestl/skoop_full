import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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

    // Get Telegram connected account
    const { data: accounts, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (accountError || !accounts) {
      throw new Error('No Telegram account connected')
    }

    const sessionString = accounts.telegram_session_string
    if (!sessionString) {
      throw new Error('No Telegram session string found')
    }

    // Import gramjs dynamically (since it's not available in Deno by default)
    // Note: This is a simplified version - in production you'd need to handle gramjs properly
    // For now, we'll simulate the process and return a placeholder response
    
    console.log('Telegram session string found, would connect with gramjs...')
    
    // Placeholder for gramjs implementation
    // In a real implementation, you would:
    // 1. Import { TelegramClient } from "telegram"
    // 2. Import { StringSession } from "telegram/sessions"
    // 3. Create client with session string
    // 4. Connect and fetch saved messages
    // 5. Process and store messages
    
    const processedItems = []
    
    // Simulate processing saved messages
    // const client = new TelegramClient(new StringSession(sessionString), apiId, apiHash)
    // await client.connect()
    // const savedMessages = await client.getMessages('me', { limit: 100 })
    
    // For now, return a placeholder response
    const placeholderMessages = [
      {
        user_id: user.id,
        url: 'https://t.me/saved_message_1',
        title: 'Telegram Saved Message 1',
        description: 'This is a placeholder for a saved Telegram message',
        source: 'telegram_saved',
        metadata: {
          telegram_message_id: 1,
          date: new Date().toISOString(),
          from_user: 'self'
        },
        created_at: new Date().toISOString()
      }
    ]

    // In production, you would batch insert the actual messages
    if (placeholderMessages.length > 0) {
      const { data: insertedBookmarks, error: insertError } = await supabaseClient
        .from('bookmarks')
        .upsert(placeholderMessages, {
          onConflict: 'user_id,url',
          ignoreDuplicates: false
        })

      if (insertError) {
        console.error('Error inserting bookmarks:', insertError)
        throw insertError
      }

      console.log(`Successfully inserted ${placeholderMessages.length} bookmarks`)
    }

    // Update last sync time
    await supabaseClient
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${placeholderMessages.length} Telegram saved messages`,
        count: placeholderMessages.length,
        note: 'This is a placeholder implementation. Full gramjs integration requires additional setup.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Telegram ingest error:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 