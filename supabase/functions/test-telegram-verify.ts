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
    console.log('🧪 Testing Telegram verification function...');

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

    // Test data - various verification scenarios
    const testCases = [
      {
        name: 'Missing phone_number',
        data: {
          code: '12345',
          phone_code_hash: 'test_hash'
        },
        expectedStatus: 400,
        expectedError: 'Missing required fields'
      },
      {
        name: 'Missing code',
        data: {
          phone_number: '+1234567890',
          phone_code_hash: 'test_hash'
        },
        expectedStatus: 400,
        expectedError: 'Missing required fields'
      },
      {
        name: 'Missing phone_code_hash',
        data: {
          phone_number: '+1234567890',
          code: '12345'
        },
        expectedStatus: 400,
        expectedError: 'Missing required fields'
      },
      {
        name: 'Invalid phone format',
        data: {
          phone_number: 'invalid_phone',
          code: '12345',
          phone_code_hash: 'test_hash'
        },
        expectedStatus: 400,
        expectedError: 'Invalid phone number format'
      },
      {
        name: 'Invalid code format (too short)',
        data: {
          phone_number: '+1234567890',
          code: '123',
          phone_code_hash: 'test_hash'
        },
        expectedStatus: 400,
        expectedError: 'Invalid verification code format'
      },
      {
        name: 'Invalid code format (letters)',
        data: {
          phone_number: '+1234567890',
          code: 'abcde',
          phone_code_hash: 'test_hash'
        },
        expectedStatus: 400,
        expectedError: 'Invalid verification code format'
      },
      {
        name: 'Valid format (will fail auth)',
        data: {
          phone_number: '+1234567890',
          code: '12345',
          phone_code_hash: 'test_hash_string'
        },
        expectedStatus: 400,
        expectedError: 'verification' // Will fail due to invalid credentials
      }
    ];

    const testResults = [];

    for (const testCase of testCases) {
      console.log(`\n🔍 Testing: ${testCase.name}`);
      
      try {
        // Call the telegram_verify function
        const verifyResponse = await fetch(`${supabaseUrl}/functions/v1/telegram_verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify(testCase.data),
        });

        const result = await verifyResponse.json();
        
        const testResult = {
          test_name: testCase.name,
          status: verifyResponse.status,
          success: result.success,
          error: result.error,
          has_session_string: !!result.session_string,
          has_user_info: !!result.user_info,
          requires_password: result.requires_password,
          expected_status: testCase.expectedStatus,
          status_matches: verifyResponse.status === testCase.expectedStatus,
          error_contains_expected: result.error ? 
            result.error.toLowerCase().includes(testCase.expectedError.toLowerCase()) : 
            false,
        };

        testResults.push(testResult);

        if (testResult.status_matches) {
          console.log('✅ Status matches expected:', testResult.status);
        } else {
          console.log('❌ Status mismatch - Expected:', testCase.expectedStatus, 'Got:', testResult.status);
        }

        if (testResult.error_contains_expected || result.success) {
          console.log('✅ Error message appropriate');
        } else {
          console.log('❌ Unexpected error:', result.error);
        }

      } catch (error) {
        console.error('❌ Test request failed:', error);
        testResults.push({
          test_name: testCase.name,
          status: 0,
          success: false,
          error: `Request failed: ${error.message}`,
          expected_status: testCase.expectedStatus,
          status_matches: false,
          error_contains_expected: false,
        });
      }
    }

    // Summary
    const passedTests = testResults.filter(t => t.status_matches && (t.error_contains_expected || t.success)).length;
    const totalTests = testResults.length;
    
    console.log('\n📊 Test Summary:');
    console.log(`- Passed tests: ${passedTests}/${totalTests}`);
    console.log(`- Success rate: ${Math.round((passedTests/totalTests) * 100)}%`);

    // Analysis
    const analysis = {
      function_accessible: testResults.some(t => t.status !== 0),
      validation_working: testResults.some(t => t.status === 400 && t.error_contains_expected),
      error_handling_proper: testResults.every(t => t.error || t.success),
      all_required_fields_validated: testResults.filter(t => 
        t.test_name.includes('Missing') && t.status === 400
      ).length === 3,
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Telegram verification function testing completed',
        test_results: testResults,
        analysis,
        summary: {
          total_tests: totalTests,
          passed_tests: passedTests,
          success_rate: Math.round((passedTests/totalTests) * 100),
          function_accessible: analysis.function_accessible,
          validation_working: analysis.validation_working,
        },
        notes: [
          'Actual authentication tests require valid phone_code_hash from telegram_login',
          'Tests focus on input validation and error handling',
          'Integration testing requires real Telegram authentication flow'
        ],
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