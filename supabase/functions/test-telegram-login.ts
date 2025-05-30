import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🧪 Testing Telegram login function...');

    // Test configuration check
    const apiId = Deno.env.get('TELEGRAM_API_ID');
    const apiHash = Deno.env.get('TELEGRAM_API_HASH');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    
    console.log('Environment check:');
    console.log('- TELEGRAM_API_ID:', apiId ? '✅ SET' : '❌ NOT SET');
    console.log('- TELEGRAM_API_HASH:', apiHash ? '✅ SET' : '❌ NOT SET');
    console.log('- SUPABASE_URL:', supabaseUrl ? '✅ SET' : '❌ NOT SET');

    if (!apiId || !apiHash || !supabaseUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required environment variables for testing',
          environment: {
            apiId: !!apiId,
            apiHash: !!apiHash,
            supabaseUrl: !!supabaseUrl,
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    // Test data
    const testPhoneNumbers = [
      '+1234567890',  // Valid format but likely invalid number
      '1234567890',   // Missing +
      '+',           // Invalid format
      '',            // Empty
    ];

    const testResults = [];

    for (const phoneNumber of testPhoneNumbers) {
      console.log(`\n📱 Testing phone number: ${phoneNumber || '(empty)'}`);
      
      try {
        // Call the telegram_login function
        const loginResponse = await fetch(`${supabaseUrl}/functions/v1/telegram_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({ phone_number: phoneNumber }),
        });

        const result = await loginResponse.json();
        
        testResults.push({
          phone_number: phoneNumber,
          status: loginResponse.status,
          success: result.success,
          has_phone_code_hash: !!result.phone_code_hash,
          error: result.error,
          message: result.message,
        });

        if (result.success) {
          console.log('✅ Success:', result.message);
          console.log('📋 Phone code hash received:', !!result.phone_code_hash);
        } else {
          console.log('❌ Error:', result.error);
        }

      } catch (error) {
        console.error('❌ Test request failed:', error);
        testResults.push({
          phone_number: phoneNumber,
          status: 0,
          success: false,
          has_phone_code_hash: false,
          error: `Request failed: ${error.message}`,
        });
      }
    }

    // Summary
    const successfulTests = testResults.filter(t => t.success).length;
    const validationTests = testResults.filter(t => !t.success && t.status === 400).length;
    
    console.log('\n📊 Test Summary:');
    console.log(`- Successful requests: ${successfulTests}`);
    console.log(`- Validation errors (expected): ${validationTests}`);
    console.log(`- Total tests: ${testResults.length}`);

    // Expected results analysis
    const analysis = {
      function_accessible: testResults.some(t => t.status !== 0),
      validation_working: testResults.some(t => t.status === 400),
      can_send_codes: testResults.some(t => t.success && t.has_phone_code_hash),
      proper_error_handling: testResults.every(t => t.error || t.success),
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Telegram login function testing completed',
        test_results: testResults,
        analysis,
        summary: {
          total_tests: testResults.length,
          successful_requests: successfulTests,
          validation_errors: validationTests,
          function_accessible: analysis.function_accessible,
          validation_working: analysis.validation_working,
        },
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ Test runner error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Test runner failed',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}); 