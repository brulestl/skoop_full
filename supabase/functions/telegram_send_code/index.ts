import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { TelegramClient } from "https://esm.sh/telegram@2.19.7"
import { StringSession } from "https://esm.sh/telegram@2.19.7/sessions"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    // Parse request body
    const { phone_number } = await req.json()
    
    if (!phone_number) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate environment variables
    const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') ?? '0');
    const apiHash = Deno.env.get('TELEGRAM_API_HASH') ?? '';
    
    if (!apiId || !apiHash) {
      console.error('[TG-SEND-CODE] Missing Telegram API credentials');
      return new Response(
        JSON.stringify({ error: 'Telegram API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[TG-SEND-CODE] Sending verification code to: ${phone_number}`);

    // Create temporary Telegram client to send verification code
    const session = new StringSession('');
    const client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 3,
      timeout: 20000,
      deviceModel: 'Desktop',
      systemVersion: 'Linux',
      appVersion: '1.0.0',
      langCode: 'en',
    });

    try {
      await client.connect();
      
      // Send verification code
      const result = await client.sendCode({
        apiId,
        apiHash,
      }, phone_number);

      console.log('[TG-SEND-CODE] Verification code sent successfully');

      // Store temporary session info (we'll need this for verification)
      const tempSessionString = client.session.save();
      
      // Store temporary session data in database for verification step
      const { error: storeError } = await supabaseClient
        .from('telegram_temp_sessions')
        .upsert({
          user_id: user.id,
          phone_number: phone_number,
          temp_session: tempSessionString,
          phone_code_hash: result.phoneCodeHash,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
        }, {
          onConflict: 'user_id'
        });

      if (storeError) {
        console.error('[TG-SEND-CODE] Error storing temp session:', storeError);
        return new Response(
          JSON.stringify({ error: 'Failed to store session data' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      await client.disconnect();

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Verification code sent successfully'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (telegramError) {
      console.error('[TG-SEND-CODE] Telegram API error:', telegramError);
      
      try {
        await client.disconnect();
      } catch (disconnectError) {
        console.error('[TG-SEND-CODE] Error disconnecting:', disconnectError);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to send verification code', 
          details: telegramError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('[TG-SEND-CODE] General error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}) 