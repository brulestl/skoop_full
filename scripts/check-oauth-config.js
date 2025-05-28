#!/usr/bin/env node

/**
 * OAuth Configuration Checker
 * Run this script to get specific instructions for your OAuth app setup
 */

console.log('🔍 OAuth Configuration Checker\n');

// Check environment variables
const requiredEnvVars = [
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET', 
  'TWITTER_CLIENT_ID',
  'TWITTER_CLIENT_SECRET',
  'NEXT_PUBLIC_SITE_URL'
];

console.log('📋 Environment Variables Check:');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${envVar.includes('SECRET') ? '***hidden***' : value}`);
  } else {
    console.log(`❌ ${envVar}: Missing`);
  }
});

console.log('\n🔧 Required OAuth App Settings:\n');

console.log('📱 GitHub OAuth App Configuration:');
console.log('   URL: https://github.com/settings/developers');
console.log('   Application name: Skoop');
console.log('   Homepage URL: https://skoop.pro');
console.log('   Authorization callback URL:');
console.log('     ✅ https://skoop.pro/api/oauth/github/callback');
console.log('     ✅ http://localhost:3001/api/oauth/github/callback (for dev)');

console.log('\n🐦 Twitter/X OAuth App Configuration:');
console.log('   URL: https://developer.twitter.com/en/portal/dashboard');
console.log('   App permissions: Read users, Read tweets');
console.log('   Type of App: Web App');
console.log('   Website URL: https://skoop.pro');
console.log('   Callback URLs:');
console.log('     ✅ https://skoop.pro/api/oauth/twitter/callback');
console.log('     ✅ http://localhost:3001/api/oauth/twitter/callback (for dev)');

console.log('\n🚨 IMPORTANT: Remove any old Supabase callback URLs like:');
console.log('   ❌ https://your-project.supabase.co/auth/v1/callback');

console.log('\n🧪 Test URLs:');
console.log('   GitHub OAuth: https://skoop.pro/api/oauth/github/start');
console.log('   Twitter OAuth: https://skoop.pro/api/oauth/twitter/start');

console.log('\n💡 After updating OAuth apps:');
console.log('   1. Wait 2-3 minutes for changes to propagate');
console.log('   2. Clear browser cookies for skoop.pro');
console.log('   3. Test OAuth connections from https://skoop.pro/dashboard');

if (process.env.GITHUB_CLIENT_ID) {
  console.log(`\n🔑 Your GitHub Client ID: ${process.env.GITHUB_CLIENT_ID}`);
  console.log('   Use this to verify you\'re updating the correct GitHub OAuth app');
}

if (process.env.TWITTER_CLIENT_ID) {
  console.log(`\n🔑 Your Twitter Client ID: ${process.env.TWITTER_CLIENT_ID}`);
  console.log('   Use this to verify you\'re updating the correct Twitter OAuth app');
} 