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
    // Initialize Supabase client with service role (like GitHub)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get user from JWT token (like GitHub)
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('No authorization header')
    }

    const jwt = authorization.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt)
    
    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    console.log(`Starting Telegram ingestion for user: ${user.id}`)

    // Get Telegram connected account - only select the session string field
    const { data: acct, error } = await supabaseAdmin
      .from('connected_accounts')
      .select('telegram_session_string')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (error) throw error

    const session = acct?.telegram_session_string
    if (!session) {
      console.log('[Telegram] No session string; skipping sync.')
      return new Response(null, { status: 204 })
    }

    console.log('✅ Found Telegram session for user')
    
    // Get Telegram API credentials from environment variables
    const apiId = Deno.env.get('TELEGRAM_API_ID')
    const apiHash = Deno.env.get('TELEGRAM_API_HASH')
    
    if (!apiId || !apiHash) {
      throw new Error('Telegram API credentials not configured. Please set TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables.')
    }

    console.log('✅ Telegram API credentials validated')

    // Update last_sync_at timestamp (like GitHub)
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')

    let fetchedMessages: TelegramMessage[] = []

    try {
      console.log('🔌 Fetching REAL Telegram saved messages...')
      
      // Import telegram client dynamically
      let TelegramClient: any, StringSession: any, Api: any
      
      try {
        console.log('📦 Loading Telegram client...')
        const telegramModule = await import('https://esm.sh/telegram@2.22.2')
        TelegramClient = telegramModule.TelegramClient
        
        const sessionsModule = await import('https://esm.sh/telegram@2.22.2/sessions')
        StringSession = sessionsModule.StringSession
        
        const tlModule = await import('https://esm.sh/telegram@2.22.2/tl')
        Api = tlModule.Api
        
        console.log('✅ Telegram modules loaded successfully')
      } catch (importError) {
        console.error('❌ Failed to import Telegram modules:', importError)
        throw new Error(`Telegram client import failed: ${importError.message}`)
      }

      const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') || '0')
      const apiHash = Deno.env.get('TELEGRAM_API_HASH') || ''

      if (!apiId || !apiHash) {
        throw new Error('Missing TELEGRAM_API_ID or TELEGRAM_API_HASH environment variables')
      }

      console.log('🔐 Creating Telegram client with session...')
      
      // Create session from stored session string
      const stringSession = new StringSession(session)
      
      // Initialize client
      const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 3,
        timeout: 20000,
        useWSS: true,
      })

      console.log('📡 Connecting to Telegram...')
      await client.connect()

      // Check if client is authorized
      const isAuthorized = await client.checkAuthorization()
      if (!isAuthorized) {
        await client.disconnect()
        throw new Error('Telegram session expired. Please reconnect your Telegram account.')
      }

      console.log('✅ Telegram client authorized')

      // Fetch saved messages (messages with yourself) - REAL DATA like GitHub API
      console.log('📨 Fetching REAL saved messages...')
      const messages = await client.getMessages('me', {
        limit: 50, // Get more messages like GitHub gets up to 1000 stars
        reverse: false,
      })

      console.log(`📥 Retrieved ${messages.length} REAL saved messages`)

      // Process and format REAL messages
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
        }
      })

      console.log(`✅ Processed ${fetchedMessages.length} REAL saved messages`)

      // Disconnect from Telegram
      await client.disconnect()
      console.log('✅ Disconnected from Telegram')

    } catch (telegramError) {
      console.error('❌ Telegram connection error:', telegramError)
      
      // Update connected_accounts with error status (like GitHub)
      const errorMessage = telegramError.message || 'Failed to fetch Telegram saved messages'
      await supabaseAdmin
        .from('connected_accounts')
        .update({ 
          status: 'error',
          last_error: errorMessage,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('provider', 'telegram')

      throw telegramError
    }

    let insertedCount = 0

    // Process each REAL saved message (following GitHub pattern)
    for (const message of fetchedMessages) {
      try {
        // Store raw data (like GitHub)
        await supabaseAdmin
          .from('bookmarks_raw')
          .upsert({
            user_id: user.id,
            source: 'telegram',
            raw_json: {
              telegram_message_id: message.id,
              message_text: message.text,
              message_date: message.date.toISOString(),
              metadata: {
                from_user: message.fromUserId,
                from_user_name: message.fromUserName,
                media_type: message.mediaType,
                file_name: message.fileName,
                file_size: message.fileSize,
                media_url: message.mediaUrl,
                sync_timestamp: new Date().toISOString(),
                has_media: !!message.mediaType,
                character_count: message.text?.length || 0,
              },
              original_message: {
                id: message.id,
                text: message.text,
                date: message.date.toISOString(),
                media: message.mediaType ? {
                  type: message.mediaType,
                  fileName: message.fileName,
                  fileSize: message.fileSize,
                  url: message.mediaUrl,
                } : null,
              }
            },
            fetched_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,source,raw_json'
          })

        // Extract and store processed bookmark data (like GitHub)
        const messageUrl = `tg://saved_message_${message.id}`
        
        // Create title from REAL message content or filename
        let title = 'Telegram Saved Message'
        if (message.text && message.text.length > 0) {
          title = message.text.length > 100 
            ? message.text.substring(0, 100) + '...' 
            : message.text
        } else if (message.fileName) {
          title = message.fileName
        } else {
          title = `Saved Message ${message.id}`
        }

        // Generate tags based on REAL content (like GitHub)
        const tags = ['telegram', 'saved-messages']
        
        // Add media type tag if present
        if (message.mediaType) {
          tags.push('media')
          tags.push(message.mediaType.toLowerCase())
        }
        
        // Add text tag if it has text content
        if (message.text && message.text.length > 0) {
          tags.push('text')
        }

        await supabaseAdmin
          .from('bookmarks')
          .upsert({
            user_id: user.id,
            url: messageUrl,
            title: title.trim(),
            description: message.text || null,
            tags: tags,
            source: 'telegram',
            metadata: {
              telegram_message_id: message.id,
              message_date: message.date.toISOString(),
              has_media: !!message.mediaType,
              media_type: message.mediaType,
              file_name: message.fileName,
              file_size: message.fileSize,
              character_count: message.text?.length || 0,
              sync_timestamp: new Date().toISOString(),
            },
            created_at: message.date.toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,url'
          })

        insertedCount++
      } catch (error) {
        console.error('Error processing Telegram message:', error)
        // Continue processing other items (like GitHub)
      }
    }

    // Update connected_accounts with successful sync status (like GitHub)
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        status: 'active',
        last_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')

    console.log(`Successfully processed ${insertedCount} REAL Telegram messages`)

    // Return response in same format as GitHub
    return new Response(JSON.stringify({ 
      count: insertedCount, 
      total_fetched: fetchedMessages.length,
      message: `Successfully synced ${insertedCount} Telegram saved messages`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Telegram ingestion error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to ingest Telegram data',
      count: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
}) 