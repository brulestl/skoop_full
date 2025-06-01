import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TelegramMessagePayload {
  telegram_user_id: string
  message_id: string
  chat_id: string
  text: string
  timestamp: string
  image_urls?: string[]
}

interface TelegramMessageRecord {
  telegram_user_id: string
  message_id: string
  chat_id: string
  text: string
  timestamp: string
  image_urls: string[]
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Create Supabase client
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

    // Parse and validate request payload
    const payload: TelegramMessagePayload = await req.json()
    console.log('[SYNC-TG] Received payload:', JSON.stringify(payload, null, 2))

    // Validate required fields
    const requiredFields = ['telegram_user_id', 'message_id', 'chat_id', 'text', 'timestamp']
    const missingFields = requiredFields.filter(field => !payload[field as keyof TelegramMessagePayload])
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          missing: missingFields 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate timestamp format
    let parsedTimestamp: Date
    try {
      parsedTimestamp = new Date(payload.timestamp)
      if (isNaN(parsedTimestamp.getTime())) {
        throw new Error('Invalid timestamp format')
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid timestamp format. Expected ISO 8601 format (e.g., 2025-06-01T12:34:56.000Z)' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[SYNC-TG] Processing message ${payload.message_id} from user ${payload.telegram_user_id}`)

    // Process images if present
    let uploadedImageUrls: string[] = []
    
    if (payload.image_urls && payload.image_urls.length > 0) {
      console.log(`[SYNC-TG] Processing ${payload.image_urls.length} images`)
      
      for (let i = 0; i < payload.image_urls.length; i++) {
        const imageUrl = payload.image_urls[i]
        
        try {
          console.log(`[SYNC-TG] Downloading image ${i + 1}/${payload.image_urls.length}: ${imageUrl}`)
          
          // Download image from Telegram
          const imageResponse = await fetch(imageUrl)
          if (!imageResponse.ok) {
            console.error(`[SYNC-TG] Failed to download image: ${imageResponse.status} ${imageResponse.statusText}`)
            continue // Skip this image but continue with others
          }

          // Get image data and content type
          const imageBuffer = await imageResponse.arrayBuffer()
          const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
          
          // Determine file extension
          let extension = 'jpg'
          if (contentType.includes('png')) extension = 'png'
          else if (contentType.includes('gif')) extension = 'gif'
          else if (contentType.includes('webp')) extension = 'webp'

          // Generate unique filename
          const filename = `${payload.telegram_user_id}_${payload.message_id}_${i + 1}_${Date.now()}.${extension}`
          const filePath = `telegram-images/${filename}`

          console.log(`[SYNC-TG] Uploading image to storage: ${filePath}`)

          // Upload to Supabase Storage
          let { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('telegram-images')
            .upload(filePath, imageBuffer, {
              contentType,
              upsert: false
            })

          if (uploadError) {
            console.error(`[SYNC-TG] Upload error:`, uploadError)
            
            // If bucket doesn't exist, try to create it
            if (uploadError.message.includes('Bucket not found')) {
              console.log('[SYNC-TG] Attempting to create telegram-images bucket')
              
              const { error: bucketError } = await supabaseClient.storage
                .createBucket('telegram-images', {
                  public: true,
                  allowedMimeTypes: ['image/*'],
                  fileSizeLimit: 10485760 // 10MB
                })

              if (bucketError) {
                console.error('[SYNC-TG] Failed to create bucket:', bucketError)
              } else {
                // Retry upload after creating bucket
                const retryResult = await supabaseClient.storage
                  .from('telegram-images')
                  .upload(filePath, imageBuffer, {
                    contentType,
                    upsert: false
                  })

                if (retryResult.error) {
                  console.error(`[SYNC-TG] Retry upload failed:`, retryResult.error)
                  continue
                } else {
                  uploadData = retryResult.data
                  uploadError = null
                }
              }
            } else {
              continue // Skip this image
            }
          }

          if (uploadData) {
            // Get public URL
            const { data: publicUrlData } = supabaseClient.storage
              .from('telegram-images')
              .getPublicUrl(filePath)

            if (publicUrlData?.publicUrl) {
              uploadedImageUrls.push(publicUrlData.publicUrl)
              console.log(`[SYNC-TG] Successfully uploaded image: ${publicUrlData.publicUrl}`)
            }
          }

        } catch (error) {
          console.error(`[SYNC-TG] Error processing image ${imageUrl}:`, error)
          // Continue with other images
        }
      }

      console.log(`[SYNC-TG] Successfully uploaded ${uploadedImageUrls.length}/${payload.image_urls.length} images`)
    }

    // Prepare record for database insertion
    const messageRecord: TelegramMessageRecord = {
      telegram_user_id: payload.telegram_user_id,
      message_id: payload.message_id,
      chat_id: payload.chat_id,
      text: payload.text,
      timestamp: parsedTimestamp.toISOString(),
      image_urls: uploadedImageUrls
    }

    console.log('[SYNC-TG] Inserting message record into telegram_messages table')

    // Insert into telegram_messages table
    const { data: insertData, error: insertError } = await supabaseClient
      .from('telegram_messages')
      .insert([messageRecord])
      .select()

    if (insertError) {
      console.error('[SYNC-TG] Database insert error:', insertError)
      
      // If table doesn't exist, provide helpful error
      if (insertError.message.includes('relation "telegram_messages" does not exist')) {
        return new Response(
          JSON.stringify({ 
            error: 'Database table "telegram_messages" does not exist. Please create it first.',
            details: insertError.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check for duplicate message
      if (insertError.code === '23505' || insertError.message.includes('duplicate')) {
        return new Response(
          JSON.stringify({ 
            error: 'Message already exists',
            duplicate: true,
            message_id: payload.message_id
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to save message to database', 
          details: insertError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[SYNC-TG] Successfully saved message ${payload.message_id}`)

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message synced successfully',
        message_id: payload.message_id,
        uploadedImages: uploadedImageUrls,
        totalImages: uploadedImageUrls.length,
        record: insertData?.[0]
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[SYNC-TG] General error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

/*
 * SQL to create the telegram_messages table:
 * 
 * CREATE TABLE telegram_messages (
 *   id BIGSERIAL PRIMARY KEY,
 *   telegram_user_id TEXT NOT NULL,
 *   message_id TEXT NOT NULL,
 *   chat_id TEXT NOT NULL,
 *   text TEXT NOT NULL,
 *   timestamp TIMESTAMPTZ NOT NULL,
 *   image_urls TEXT[] DEFAULT '{}',
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE(telegram_user_id, message_id)
 * );
 * 
 * CREATE INDEX idx_telegram_messages_user_id ON telegram_messages(telegram_user_id);
 * CREATE INDEX idx_telegram_messages_timestamp ON telegram_messages(timestamp);
 */ 