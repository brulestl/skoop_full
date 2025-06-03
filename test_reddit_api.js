#!/usr/bin/env node

/**
 * Manual Reddit API Tester
 * Usage: node test_reddit_api.js YOUR_ACCESS_TOKEN
 * 
 * This script tests various Reddit API endpoints to identify which one works
 * and provides detailed debugging information.
 */

const https = require('https');
const { URL } = require('url');

if (process.argv.length < 3) {
  console.error('❌ Usage: node test_reddit_api.js YOUR_ACCESS_TOKEN');
  process.exit(1);
}

const accessToken = process.argv[2];

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)',
  'Accept': 'application/json'
};

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: headers
    };

    console.log(`🔍 Testing: ${url}`);
    console.log(`🔍 Headers: ${JSON.stringify({
      ...headers,
      'Authorization': 'Bearer [REDACTED]'
    }, null, 2)}`);

    const req = https.request(options, (res) => {
      let data = '';
      
      console.log(`📊 Status: ${res.statusCode}`);
      console.log(`📊 Response Headers: ${JSON.stringify(res.headers, null, 2)}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data,
            success: res.statusCode >= 200 && res.statusCode < 300,
            parseError: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testRedditAPI() {
  console.log('🚀 Starting Reddit API Test Suite\n');
  
  // Step 1: Verify token with user info
  console.log('=== STEP 1: Token Verification ===');
  try {
    const userResult = await makeRequest('https://oauth.reddit.com/api/v1/me');
    
    if (userResult.success) {
      console.log('✅ Token is valid!');
      console.log(`👤 Username: ${userResult.data.name}`);
      console.log(`🔢 User ID: ${userResult.data.id}`);
      console.log(`📧 Has Email: ${userResult.data.has_verified_email}`);
      console.log(`🎂 Created: ${new Date(userResult.data.created_utc * 1000).toISOString()}\n`);
    } else {
      console.error('❌ Token validation failed:', userResult.data);
      return;
    }
  } catch (error) {
    console.error('💥 Token validation error:', error.message);
    return;
  }
  
  // Step 2: Test saved items endpoints
  console.log('=== STEP 2: Saved Items Endpoints ===');
  
  const endpointsToTest = [
    'https://oauth.reddit.com/user/me/saved.json?raw_json=1&limit=5',
    'https://oauth.reddit.com/user/me/saved.json?limit=5',
    'https://oauth.reddit.com/user/me/saved?raw_json=1&limit=5',
    'https://oauth.reddit.com/user/me/saved?limit=5',
    'https://oauth.reddit.com/user/me/saved',
    'https://oauth.reddit.com/api/v1/me/saved?limit=5'
  ];
  
  let workingEndpoint = null;
  
  for (const endpoint of endpointsToTest) {
    console.log(`\n--- Testing: ${endpoint} ---`);
    
    try {
      const result = await makeRequest(endpoint);
      
      if (result.success) {
        console.log('✅ SUCCESS!');
        console.log(`📊 Items found: ${result.data?.data?.children?.length || 0}`);
        
        if (result.data?.data?.children?.length > 0) {
          const firstItem = result.data.data.children[0];
          console.log(`📝 First item type: ${firstItem.kind}`);
          console.log(`📝 First item title: ${firstItem.data.title || firstItem.data.body?.substring(0, 50) || 'N/A'}`);
        }
        
        workingEndpoint = endpoint;
        break;
      } else {
        console.log('❌ FAILED');
        console.log(`📊 Error: ${JSON.stringify(result.data, null, 2)}`);
      }
    } catch (error) {
      console.log('💥 Network error:', error.message);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Step 3: Summary
  console.log('\n=== SUMMARY ===');
  if (workingEndpoint) {
    console.log(`✅ Working endpoint found: ${workingEndpoint}`);
    console.log('🎯 Use this endpoint in your Edge Function!');
  } else {
    console.log('❌ No working endpoints found');
    console.log('🔍 This suggests an OAuth scope issue');
    console.log('📋 Required scopes: identity, history, save, read');
    console.log('💡 Check your Reddit app configuration at: https://www.reddit.com/prefs/apps');
  }
}

testRedditAPI().catch(console.error); 