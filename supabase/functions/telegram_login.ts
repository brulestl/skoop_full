import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createTelegramClient, TelegramClientManager } from './lib/telegramClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface TelegramLoginRequest {
  phone_number: string;
}

interface TelegramLoginResponse {
  success: boolean;
  phone_code_hash?: string;
  phone_number?: string;
  message?: string;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🔐 Starting Telegram login flow...');

    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Method not allowed. Use POST.' 
        }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    let requestData: TelegramLoginRequest;
    try {
      requestData = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON in request body' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate phone number
    const { phone_number } = requestData;
    if (!phone_number) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'phone_number is required' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone_number)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid phone number format. Use international format (+1234567890)' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('📱 Processing login request for phone:', phone_number.slice(0, -4) + '****');

    // Create Supabase client for logging/audit
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the current user (optional - for audit logging)
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    console.log('👤 Request from user:', user?.id || 'anonymous');

    // Validate Telegram API credentials
    const apiId = Deno.env.get('TELEGRAM_API_ID');
    const apiHash = Deno.env.get('TELEGRAM_API_HASH');
    
    if (!apiId || !apiHash) {
      console.error('❌ Missing Telegram API credentials');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Telegram API not configured. Contact administrator.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ Telegram API credentials validated');

    // Initialize Telegram client
    let telegramClient: TelegramClientManager;
    try {
      telegramClient = createTelegramClient();
      console.log('✅ Telegram client created');
    } catch (error) {
      console.error('❌ Failed to create Telegram client:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to initialize Telegram client' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Connect to Telegram
    console.log('🔌 Connecting to Telegram...');
    const connectionResult = await telegramClient.connect();
    
    if (!connectionResult.success) {
      console.error('❌ Failed to connect to Telegram:', connectionResult.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to connect to Telegram: ' + connectionResult.error 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ Connected to Telegram successfully');

    // Get the raw Telegram client for phone authentication
    const rawClient = telegramClient.getClient();
    if (!rawClient) {
      console.error('❌ No Telegram client available');
      await telegramClient.disconnect();
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Telegram client not available' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send authentication code to phone number
    console.log('📨 Sending authentication code to phone...');
    
    try {
      const result = await rawClient.sendCode(
        {
          apiId: parseInt(apiId),
          apiHash: apiHash,
        },
        phone_number
      );

      console.log('✅ Authentication code sent successfully');
      console.log('📋 Phone code hash generated:', result.phoneCodeHash.slice(0, 10) + '...');

      // Clean up connection
      await telegramClient.disconnect();
      
      const response: TelegramLoginResponse = {
        success: true,
        phone_code_hash: result.phoneCodeHash,
        phone_number: phone_number,
        message: 'Authentication code sent to your phone. Please check your Telegram app.',
      };

      console.log('🎉 Login initiation successful');

      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );

    } catch (sendCodeError) {
      console.error('❌ Failed to send authentication code:', sendCodeError);
      
      // Clean up connection
      await telegramClient.disconnect();
      
      // Handle specific Telegram errors
      let errorMessage = 'Failed to send authentication code';
      
      if (sendCodeError instanceof Error) {
        if (sendCodeError.message.includes('PHONE_NUMBER_INVALID')) {
          errorMessage = 'Invalid phone number. Please check the format and try again.';
        } else if (sendCodeError.message.includes('PHONE_NUMBER_BANNED')) {
          errorMessage = 'This phone number is banned from Telegram.';
        } else if (sendCodeError.message.includes('TOO_MANY_REQUESTS')) {
          errorMessage = 'Too many requests. Please wait before trying again.';
        } else if (sendCodeError.message.includes('NETWORK_ERROR')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = `Authentication failed: ${sendCodeError.message}`;
        }
      }

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorMessage 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('❌ Telegram login error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}); 