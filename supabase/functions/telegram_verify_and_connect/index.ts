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
    const { phone_number, verification_code } = await req.json()
    
    if (!phone_number || !verification_code) {
      return new Response(
        JSON.stringify({ error: 'Phone number and verification code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[TG-VERIFY] Verifying code for user: ${user.id}, phone: ${phone_number}`);

    // Get temporary session data
    const { data: tempSession, error: tempError } = await supabaseClient
      .from('telegram_temp_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('phone_number', phone_number)
      .single();

    if (tempError || !tempSession) {
      console.error('[TG-VERIFY] No temp session found:', tempError);
      return new Response(
        JSON.stringify({ error: 'No verification session found. Please request a new code.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if session is expired
    if (new Date(tempSession.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Verification session expired. Please request a new code.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate environment variables
    const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') ?? '0');
    const apiHash = Deno.env.get('TELEGRAM_API_HASH') ?? '';
    
    if (!apiId || !apiHash) {
      console.error('[TG-VERIFY] Missing Telegram API credentials');
      return new Response(
        JSON.stringify({ error: 'Telegram API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Restore Telegram client from temp session
    const session = new StringSession(tempSession.temp_session);
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
      
      // Verify the code and complete authentication
      await client.invoke({
        _: 'auth.signIn',
        phoneNumber: phone_number,
        phoneCodeHash: tempSession.phone_code_hash,
        phoneCode: verification_code,
      });

      console.log('[TG-VERIFY] Code verified successfully');

      // Get user information
      const userInfo = await client.getMe();
      console.log('[TG-VERIFY] User info retrieved:', {
        id: userInfo.id?.toString(),
        firstName: userInfo.firstName,
        username: userInfo.username,
      });

      // Generate final session string
      const finalSessionString = client.session.save();

      // Store connected account
      const { error: connectError } = await supabaseClient
        .from('connected_accounts')
        .upsert({
          user_id: user.id,
          provider: 'telegram',
          provider_user_id: userInfo.id?.toString() || '',
          username: userInfo.username || null,
          display_name: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || null,
          status: 'active',
          connected_at: new Date().toISOString(),
          telegram_session_string: finalSessionString,
          access_token: 'telegram_connected',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,provider'
        });

      if (connectError) {
        console.error('[TG-VERIFY] Error storing connected account:', connectError);
        return new Response(
          JSON.stringify({ error: 'Failed to store connection' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Clean up temporary session
      await supabaseClient
        .from('telegram_temp_sessions')
        .delete()
        .eq('user_id', user.id);

      await client.disconnect();

      console.log('[TG-VERIFY] Telegram account connected successfully');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Telegram account connected successfully',
          user_info: {
            id: userInfo.id?.toString(),
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            username: userInfo.username,
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (telegramError) {
      console.error('[TG-VERIFY] Telegram API error:', telegramError);
      
      try {
        await client.disconnect();
      } catch (disconnectError) {
        console.error('[TG-VERIFY] Error disconnecting:', disconnectError);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to verify code', 
          details: telegramError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('[TG-VERIFY] General error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}) 