import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createTelegramClient, TelegramClientManager } from './lib/telegramClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface TelegramVerifyRequest {
  phone_number: string;
  code: string;
  phone_code_hash: string;
  password?: string; // Optional 2FA password
}

interface TelegramVerifyResponse {
  success: boolean;
  session_string?: string;
  user_info?: {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
  };
  message?: string;
  error?: string;
  requires_password?: boolean; // For 2FA
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🔐 Starting Telegram code verification...');

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
    let requestData: TelegramVerifyRequest;
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

    // Validate required fields
    const { phone_number, code, phone_code_hash, password } = requestData;
    
    if (!phone_number || !code || !phone_code_hash) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: phone_number, code, and phone_code_hash are required' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate phone number format
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

    // Validate verification code format (usually 5-6 digits)
    const codeRegex = /^\d{5,6}$/;
    if (!codeRegex.test(code)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid verification code format. Code should be 5-6 digits' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('📱 Verifying code for phone:', phone_number.slice(0, -4) + '****');
    console.log('🔑 Code length:', code.length);
    console.log('📋 Phone code hash length:', phone_code_hash.length);

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
    console.log('👤 Verification request from user:', user?.id || 'anonymous');

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

    // Get the raw Telegram client for authentication
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

    // Verify the authentication code
    console.log('🔍 Verifying authentication code...');
    
    try {
      // Attempt to sign in with the provided code using gramjs API
      await rawClient.start({
        phoneNumber: phone_number,
        phoneCode: async () => code,
        password: password ? async () => password : undefined,
        onError: (err) => console.error('Telegram auth error:', err),
      });

      console.log('✅ Authentication successful');

      // Get session string
      const sessionString = rawClient.session.save();
      const sessionStr = String(sessionString || '');
      console.log('📝 Session string generated (length):', sessionStr.length);

      // Get user information
      const userInfo = await rawClient.getMe();
      console.log('👤 User info retrieved:', {
        id: userInfo.id?.toString(),
        firstName: userInfo.firstName,
        username: userInfo.username,
      });

      // Clean up connection (but keep session)
      await telegramClient.disconnect();

      // Prepare user info response
      const userInfoResponse = {
        id: userInfo.id?.toString() || '',
        first_name: userInfo.firstName || undefined,
        last_name: userInfo.lastName || undefined,
        username: userInfo.username || undefined,
        phone: userInfo.phone || undefined,
      };

      const response: TelegramVerifyResponse = {
        success: true,
        session_string: sessionStr,
        user_info: userInfoResponse,
        message: 'Successfully authenticated with Telegram',
      };

      console.log('🎉 Verification completed successfully');

      // Optionally store the session in database
      if (user) {
        try {
          console.log('💾 Storing Telegram session for user:', user.id);
          
          const { error: upsertError } = await supabaseClient
            .from('connected_accounts')
            .upsert({
              user_id: user.id,
              provider: 'telegram',
              provider_user_id: userInfoResponse.id,
              username: userInfoResponse.username || null,
              display_name: `${userInfoResponse.first_name || ''} ${userInfoResponse.last_name || ''}`.trim() || null,
              status: 'active',
              connected_at: new Date().toISOString(),
              telegram_session_string: sessionStr,
              access_token: 'telegram_authenticated',
            }, {
              onConflict: 'user_id,provider'
            });

          if (upsertError) {
            console.error('⚠️ Failed to store session in database:', upsertError);
          } else {
            console.log('✅ Session stored in database successfully');
          }
        } catch (dbError) {
          console.error('⚠️ Database storage error:', dbError);
        }
      }

      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );

    } catch (signInError) {
      console.error('❌ Failed to verify authentication code:', signInError);
      
      // Clean up connection
      await telegramClient.disconnect();
      
      // Handle specific Telegram errors
      let errorMessage = 'Failed to verify authentication code';
      let requiresPassword = false;
      
      if (signInError instanceof Error) {
        const errorMsg = signInError.message;
        
        if (errorMsg.includes('PHONE_CODE_INVALID')) {
          errorMessage = 'Invalid verification code. Please check the code and try again.';
        } else if (errorMsg.includes('PHONE_CODE_EXPIRED')) {
          errorMessage = 'Verification code has expired. Please request a new code.';
        } else if (errorMsg.includes('PHONE_CODE_EMPTY')) {
          errorMessage = 'Verification code cannot be empty.';
        } else if (errorMsg.includes('SESSION_PASSWORD_NEEDED')) {
          errorMessage = 'Two-factor authentication is enabled. Please provide your password.';
          requiresPassword = true;
        } else if (errorMsg.includes('PASSWORD_HASH_INVALID')) {
          errorMessage = 'Invalid 2FA password. Please check your password and try again.';
        } else if (errorMsg.includes('TOO_MANY_REQUESTS')) {
          errorMessage = 'Too many verification attempts. Please wait before trying again.';
        } else if (errorMsg.includes('PHONE_NUMBER_UNOCCUPIED')) {
          errorMessage = 'This phone number is not registered with Telegram.';
        } else if (errorMsg.includes('NETWORK_ERROR')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = `Verification failed: ${errorMsg}`;
        }
      }

      const errorResponse: TelegramVerifyResponse = {
        success: false,
        error: errorMessage,
        requires_password: requiresPassword,
      };

      return new Response(
        JSON.stringify(errorResponse),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('❌ Telegram verification error:', error);
    
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