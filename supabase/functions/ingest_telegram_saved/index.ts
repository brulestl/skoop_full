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
  url?: string; // For media URLs
  fromUserId?: string;
  fromUserName?: string;
  mediaCaption?: string;
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
    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get user from JWT token
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

    // TASK M-SESSION: Check for session string existence and return 409 if missing
    const { data: acct, error } = await supabaseAdmin
      .from('connected_accounts')
      .select('telegram_session_string')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (error) throw error

    const session = acct?.telegram_session_string
    if (!session) {
      console.log('[Telegram] No session string found - returning 409')
      return new Response(JSON.stringify({ error: 'no_session' }), { 
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('✅ Found Telegram session for user')
    
    // Get Telegram API credentials from environment variables
    const apiId = Deno.env.get('TELEGRAM_API_ID')
    const apiHash = Deno.env.get('TELEGRAM_API_HASH')
    
    if (!apiId || !apiHash) {
      throw new Error('Telegram API credentials not configured. Please set TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables.')
    }

    console.log('✅ Telegram API credentials validated')

    // Update last_sync_at timestamp
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'telegram')

    let fetchedMessages: TelegramMessage[] = []
    let totalRawMessages = 0
    let totalUsefulMessages = 0

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

      // TASK M-PEER: Use 'me' instead of fetching user entity
      console.log('📨 Fetching REAL saved messages using inputPeerSelf...')
      const peer = 'me' // Use inputPeerSelf instead of getting entity
      const messages = await client.getMessages(peer, {
        limit: 50,
        reverse: false,
      })

      totalRawMessages = messages.length
      console.log(`📥 Retrieved ${messages.length} REAL saved messages`)
      console.log('[TG] raw len', messages.length)

      // TASK M-MAP: Accept non-text messages, extract URLs and captions
      const usefulMessages = messages.filter((msg: any) => {
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url ?? null
        return text || url // Accept if has text OR URL
      })

      totalUsefulMessages = usefulMessages.length
      console.log(`[TG] useful messages: ${usefulMessages.length} out of ${messages.length}`)

      // Process and format REAL useful messages
      fetchedMessages = usefulMessages.map((msg: any) => {
        // TASK M-MAP implementation: accept text, caption, or URL
        const text = msg.message ?? (msg.media?.caption ?? '')
        const url = msg.media?.webpage?.url ?? null
        
        return {
          id: msg.id.toString(),
          text: text,
          date: new Date(msg.date * 1000),
          url: url,
          mediaType: msg.media ? msg.media.className : undefined,
          fileName: msg.media && msg.media.document && msg.media.document.attributes
            ? msg.media.document.attributes.find((attr: any) => attr.className === 'DocumentAttributeFilename')?.fileName
            : undefined,
          fileSize: msg.media && msg.media.document ? Number(msg.media.document.size) : undefined,
          fromUserId: 'self',
          fromUserName: 'Saved Messages',
          mediaCaption: msg.media?.caption,
        }
      })

      console.log(`✅ Processed ${fetchedMessages.length} REAL saved messages`)

      // Disconnect from Telegram
      await client.disconnect()
      console.log('✅ Disconnected from Telegram')

    } catch (telegramError) {
      console.error('❌ Telegram connection error:', telegramError)
      
      // Update connected_accounts with error status
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

    // TASK M-INSERT: Build raw rows array for batch insert
    const rawRows: BookmarkRaw[] = []
    
    for (const message of fetchedMessages) {
      rawRows.push({
        user_id: user.id,
        source: 'telegram',
        provider_item_id: parseInt(message.id),
        text: message.text || null,
        url: message.url || null,
        created_at: message.date.toISOString(),
        raw_json: {
          telegram_message_id: message.id,
          message_text: message.text,
          message_date: message.date.toISOString(),
          url: message.url,
          metadata: {
            from_user: message.fromUserId,
            from_user_name: message.fromUserName,
            media_type: message.mediaType,
            file_name: message.fileName,
            file_size: message.fileSize,
            media_url: message.mediaUrl,
            media_caption: message.mediaCaption,
            sync_timestamp: new Date().toISOString(),
            has_media: !!message.mediaType,
            has_caption: !!(message.mediaCaption && message.mediaCaption.length > 0),
            character_count: message.text?.length || 0,
            total_text_length: (message.text?.length || 0) + (message.mediaCaption?.length || 0),
          },
          original_message: {
            id: message.id,
            text: message.text,
            date: message.date.toISOString(),
            url: message.url,
            media: message.mediaType ? {
              type: message.mediaType,
              fileName: message.fileName,
              fileSize: message.fileSize,
              url: message.mediaUrl,
            } : null,
          }
        },
        fetched_at: new Date().toISOString()
      })
    }

    let insertedCount = 0

    // TASK M-INSERT: Batch insert with conflict handling
    if (rawRows.length > 0) {
      try {
        console.log(`💾 Batch inserting ${rawRows.length} raw messages...`)
        
        const { data, error, count } = await supabaseAdmin
          .from('bookmarks_raw')
          .insert(rawRows, { 
            returning: 'minimal', 
            count: 'exact' 
          })
          // Note: onConflict requires unique index on user_id,source,provider_item_id
          
        if (error) {
          console.error('Batch insert error:', error)
          // Fall back to individual inserts for better error handling
          console.log('Falling back to individual inserts...')
          
          for (const row of rawRows) {
            try {
              await supabaseAdmin
                .from('bookmarks_raw')
                .upsert(row, { onConflict: 'user_id,source,provider_item_id' })
              insertedCount++
            } catch (individualError) {
              console.error('Individual insert error for message:', row.provider_item_id, individualError)
            }
          }
        } else {
          insertedCount = count || rawRows.length
          console.log(`✅ Batch inserted ${insertedCount} raw messages`)
        }
      } catch (batchError) {
        console.error('Batch insert failed:', batchError)
        throw batchError
      }
    }

    // Process each message for bookmarks table (existing logic)
    for (const message of fetchedMessages) {
      try {
        // Extract and store processed bookmark data
        const messageUrl = message.url || `tg://saved_message_${message.id}`
        
        // Create title from message content, caption, or filename
        let title = 'Telegram Saved Message'
        if (message.text && message.text.length > 0) {
          title = message.text.length > 100 
            ? message.text.substring(0, 100) + '...' 
            : message.text
        } else if (message.fileName) {
          title = message.fileName
        } else if (message.url) {
          title = `Saved Link: ${new URL(message.url).hostname}`
        } else {
          title = `Saved Message ${message.id}`
        }

        // Generate tags based on content
        const tags = ['telegram', 'saved-messages']
        
        // Add media type tag if present
        if (message.mediaType) {
          tags.push('media')
          tags.push(message.mediaType.toLowerCase())
        }
        
        // Add text tag if it has text content or caption
        if (message.text && message.text.length > 0) {
          tags.push('text')
        }
        
        // Add caption tag if media has caption
        if (message.mediaCaption && message.mediaCaption.length > 0) {
          tags.push('caption')
        }
        
        // Add link tag if has URL
        if (message.url) {
          tags.push('link')
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
              extracted_url: message.url,
            },
            created_at: message.date.toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,url'
          })

      } catch (error) {
        console.error('Error processing Telegram message:', error)
        // Continue processing other items
      }
    }

    // Update connected_accounts with successful sync status
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
    console.log(`[TG] Final stats: ${totalRawMessages} raw → ${totalUsefulMessages} useful → ${insertedCount} inserted`)

    // Return response in same format as other providers
    return new Response(JSON.stringify({ 
      count: insertedCount, 
      total_fetched: totalRawMessages,
      useful_messages: totalUsefulMessages,
      message: `Successfully synced ${insertedCount} Telegram saved messages (${totalUsefulMessages} useful out of ${totalRawMessages} total)`
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