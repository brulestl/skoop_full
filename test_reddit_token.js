#!/usr/bin/env node

/**
 * Reddit Token Testing Script
 * This will test your actual Reddit token against different API endpoints
 * to identify the exact scope issue.
 */

const https = require('https');

// Your token from the database (first 20 chars match: eyJhbGciOi...)
const ACCESS_TOKEN = process.argv[2];

if (!ACCESS_TOKEN) {
    console.log('❌ Usage: node test_reddit_token.js <ACCESS_TOKEN>');
    console.log('📋 Get your access token from the connected_accounts table');
    process.exit(1);
}

function testRedditEndpoint(endpoint, description) {
    return new Promise((resolve) => {
        console.log(`\n🔍 Testing: ${description}`);
        console.log(`📡 Endpoint: ${endpoint}`);

        const options = {
            hostname: 'oauth.reddit.com',
            port: 443,
            path: endpoint.replace('https://oauth.reddit.com', ''),
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log(`📊 Status: ${res.statusCode}`);
                
                if (res.statusCode === 200) {
                    try {
                        const json = JSON.parse(data);
                        console.log(`✅ Success! Keys: ${Object.keys(json).join(', ')}`);
                        if (json.data && json.data.children) {
                            console.log(`📈 Items found: ${json.data.children.length}`);
                        }
                    } catch (e) {
                        console.log(`✅ Success! Response length: ${data.length} chars`);
                    }
                } else {
                    console.log(`❌ Error: ${res.statusCode}`);
                    try {
                        const errorData = JSON.parse(data);
                        console.log(`🔍 Error details: ${JSON.stringify(errorData, null, 2)}`);
                    } catch (e) {
                        console.log(`🔍 Error response: ${data.substring(0, 200)}...`);
                    }
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.log(`💥 Request failed: ${error.message}`);
            resolve();
        });

        req.end();
    });
}

async function runTests() {
    console.log('🔴 Reddit Token Validation Test');
    console.log('='.repeat(50));
    
    // Test endpoints in order of increasing permissions required
    const tests = [
        ['https://oauth.reddit.com/api/v1/me', 'User Info (identity scope)'],
        ['https://oauth.reddit.com/user/me/overview', 'User Overview (history scope)'],
        ['https://oauth.reddit.com/user/me/saved', 'Saved Items - Correct Endpoint'],
        ['https://oauth.reddit.com/user/me/saved.json', 'Saved Items - With .json'],
        ['https://oauth.reddit.com/u/me/saved', 'Saved Items - Wrong Endpoint (u/ instead of user/)'],
    ];

    for (const [endpoint, description] of tests) {
        await testRedditEndpoint(endpoint, description);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎯 Diagnosis Guide:');
    console.log('✅ User Info works = Token is valid');
    console.log('❌ User Info fails = Token expired/invalid');
    console.log('✅ Overview works = "history" scope granted');
    console.log('❌ Overview fails = Missing "history" scope');
    console.log('✅ Saved works = "save" scope granted');
    console.log('❌ Saved fails = Missing "save" scope OR wrong app type');
    console.log('\n🚨 If saved items fail with 400: Your Reddit app needs "save" scope!');
}

runTests().catch(console.error); 