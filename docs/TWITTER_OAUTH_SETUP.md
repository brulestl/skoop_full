# Twitter/X OAuth Setup with Supabase

## Problem
Getting `{"error":"requested path is invalid"}` when connecting Twitter/X OAuth.

## Root Cause
Twitter OAuth is not properly configured in Supabase dashboard, or using wrong Twitter API credentials.

## Solution Steps

### 1. Create Twitter Developer App (Correctly)

**Important:** You MUST click "Create Project" first, NOT "Create App" directly.

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Sign in with your Twitter account
3. Click **"+ Create Project"** (NOT "Create App")
4. Fill out project details:
   - Project name: "SKOOP OAuth App"
   - Use case: "Making a bot"
   - Description: "OAuth for SKOOP learning platform"
   - App name: "SKOOP"

### 2. Configure Twitter App Settings

1. After creating project, go to **App Settings**
2. Click **"Set up"** under "User authentication settings"
3. Configure App permissions:
   - ✅ **Read** permissions
   - ✅ **Request email from users** (IMPORTANT!)
4. Select **"Web App"** as Type of App (NOT Native App for web apps)
5. Under App info:
   - **Callback URL**: `https://llsjysvklkohnzgmpyob.supabase.co/auth/v1/callback`
   - **Website URL**: `http://localhost:3001` (for development)
   - **Terms of service**: Your terms URL
   - **Privacy policy**: Your privacy URL
6. Click **Save**

### 3. Get Your Twitter API Credentials

After setup, you'll get:
- **API Key** (Client ID)
- **API Secret Key** (Client Secret)

**Save these credentials securely!**

### 4. Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com/project/llsjysvklkohnzgmpyob)
2. Click **Authentication** → **Providers**
3. Find **Twitter** and click to expand
4. Toggle **"Twitter Enabled"** to ON
5. Enter:
   - **Twitter Client ID**: Your API Key
   - **Twitter Client Secret**: Your API Secret Key
6. Click **Save**

### 5. Test Configuration

Your Twitter OAuth should now work. Test by:
1. Go to your app: http://localhost:3001
2. Navigate to Profile tab
3. Click "Connect Twitter"
4. Should redirect to Twitter login instead of Supabase error

## Common Issues

### Issue: "No API key found"
**Solution:** Make sure you created a PROJECT first, then an app under it. Apps created directly have different permissions.

### Issue: "requested path is invalid"
**Solution:** Twitter provider not enabled in Supabase or wrong credentials.

### Issue: Still redirecting to Supabase URL
**Solution:** Clear browser cache and ensure Supabase Twitter provider is enabled with correct credentials.

## Limitations

**Important:** Supabase currently uses Twitter OAuth 1.0a (legacy), not OAuth 2.0. This means:
- ✅ User login works fine
- ❌ Taking actions on behalf of users (tweeting, etc.) may not work
- ❌ Limited API access compared to OAuth 2.0

For full Twitter API access, you may need to implement custom OAuth 2.0 flow.

## Verification

After setup, check:
1. Twitter provider shows as "Enabled" in Supabase
2. No more redirect to Supabase error page
3. Twitter login popup appears when connecting
4. User can successfully connect Twitter account 