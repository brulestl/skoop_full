#!/usr/bin/env node

/**
 * Test Reddit Edge Function directly
 * This helps debug what's causing the 500 error
 */

const https = require('https');

// Replace with your actual values from the error log
const SUPABASE_URL = 'https://llsjysvklkohnzgmpyob.supabase.co';
const USER_ID = 'e3ef0830-5658-445e-8193-17b28703ebf2';

// You'll need to get a session token from your browser dev tools
// Go to Application > Local Storage > and find the supabase auth token
const SESSION_TOKEN = process.argv[2];

if (!SESSION_TOKEN) {
  console.error('❌ Usage: node test_edge_function.js YOUR_SESSION_TOKEN');
  console.error('Get your session token from browser dev tools > Application > Local Storage');
  process.exit(1);
}

const testEdgeFunction = async () => {
  console.log('🧪 Testing Reddit Edge Function directly...\n');
  
  const postData = JSON.stringify({
    user_id: USER_ID
  });
  
  const options = {
    hostname: 'llsjysvklkohnzgmpyob.supabase.co',
    port: 443,
    path: '/functions/v1/ingest_reddit',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SESSION_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'test-script/1.0'
    }
  };

  console.log('🔍 Request details:');
  console.log(`URL: https://${options.hostname}${options.path}`);
  console.log(`Headers: ${JSON.stringify({
    ...options.headers,
    'Authorization': 'Bearer [REDACTED]'
  }, null, 2)}`);
  console.log(`Body: ${postData}\n`);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      console.log(`📊 Response Status: ${res.statusCode}`);
      console.log(`📊 Response Headers: ${JSON.stringify(res.headers, null, 2)}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('\n📄 Response Body:');
        
        try {
          const jsonData = JSON.parse(data);
          console.log(JSON.stringify(jsonData, null, 2));
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('\n✅ SUCCESS!');
          } else {
            console.log('\n❌ FAILED!');
            console.log('Error Analysis:');
            if (jsonData.error) console.log(`- Error: ${jsonData.error}`);
            if (jsonData.details) console.log(`- Details: ${JSON.stringify(jsonData.details, null, 2)}`);
            if (jsonData.debug_info) console.log(`- Debug Info: ${JSON.stringify(jsonData.debug_info, null, 2)}`);
          }
          
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          console.log('Raw response (not JSON):');
          console.log(data);
          console.log('\nParse error:', error.message);
          
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data,
            parseError: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('💥 Request error:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};

testEdgeFunction().catch(console.error); 