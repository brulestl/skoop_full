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
    console.log('🔍 Starting sync debug test...');

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

    // Check environment variables
    const apiId = Deno.env.get('TELEGRAM_API_ID')
    const apiHash = Deno.env.get('TELEGRAM_API_HASH')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    
    console.log('Environment check:');
    console.log('- TELEGRAM_API_ID:', apiId ? 'SET' : 'NOT SET');
    console.log('- TELEGRAM_API_HASH:', apiHash ? 'SET' : 'NOT SET');
    console.log('- SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');

    // Get Telegram connected account
    const { data: accounts, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'telegram')
      .single()

    if (accountError || !accounts) {
      console.log('❌ No Telegram account found:', accountError);
      throw new Error('No Telegram account connected. Please connect your Telegram account first.')
    }

    console.log('✅ Found Telegram connection:', {
      provider: accounts.provider,
      status: accounts.status,
      connected_at: accounts.connected_at,
      has_session: !!accounts.telegram_session_string
    });

    // Test import
    try {
      console.log('🔍 Testing telegram package import...');
      const { TelegramClient } = await import('https://esm.sh/telegram@2.22.2');
      console.log('✅ Successfully imported TelegramClient');
    } catch (importError) {
      console.error('❌ Failed to import telegram package:', importError);
      throw new Error(`Telegram package import failed: ${importError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Debug test completed successfully',
        details: {
          user_id: user.id,
          telegram_connected: true,
          environment_ok: !!(apiId && apiHash && supabaseUrl),
          timestamp: new Date().toISOString(),
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('❌ Debug test error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Debug test failed',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
}) 