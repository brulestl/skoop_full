# OAuth Debug Guide

## Current Issue: "Connecting your account" → 404 Error

### Step 1: Check GitHub OAuth App Configuration

1. **Go to GitHub Settings** → Developer settings → OAuth Apps
2. **Find your SKOOP app** and verify these settings:
   - **Authorization callback URL**: Must be exactly `https://your-supabase-project.supabase.co/auth/v1/callback`
   - **NOT** `http://localhost:3001/auth/callback`

### Step 2: Check Supabase Configuration

1. **Go to Supabase Dashboard** → Authentication → Providers
2. **GitHub Provider Settings:**
   - Enabled: ✅
   - Client ID: (from GitHub app)
   - Client Secret: (from GitHub app)
   - Redirect URL: Should show `https://your-project.supabase.co/auth/v1/callback`

### Step 3: Test the Flow

1. **Open Browser DevTools** (F12) → Console tab
2. **Go to** `http://localhost:3001/dashboard/profile`
3. **Click "Connect GitHub"**
4. **Watch console logs** for:
   - "Starting OAuth flow for provider: github"
   - "Redirect URL: http://localhost:3001/auth/callback?provider=github"
   - Any error messages

### Step 4: Debug Session State

1. **After OAuth redirect fails**, go to:
   `http://localhost:3001/auth/debug`
2. **Check the JSON output** for:
   - `sessionFromContext`: Should contain user data
   - `sessionFromFetch`: Should contain user data
   - `searchParams`: Should show provider=github
   - Any error messages

### Step 5: Manual Test

Try this URL in your browser (replace with your Supabase project):
```
https://your-project.supabase.co/auth/v1/authorize?provider=github&redirect_to=http://localhost:3001/auth/callback?provider=github
```

## Expected Flow

1. **User clicks "Connect GitHub"** 
2. **Redirects to GitHub** (github.com/login/oauth/authorize)
3. **User authorizes**
4. **GitHub redirects to Supabase** (your-project.supabase.co/auth/v1/callback)
5. **Supabase processes OAuth**
6. **Supabase redirects to your app** (localhost:3001/auth/callback?provider=github)
7. **Your callback page processes** and stores the connection

## Common Issues

### Issue: GitHub App Callback URL Wrong
**Solution**: Set GitHub OAuth app callback to Supabase URL, not localhost

### Issue: Supabase GitHub Provider Not Configured
**Solution**: Enable and configure GitHub provider in Supabase dashboard

### Issue: Session Not Available
**Solution**: Wait longer or check if Supabase auth helpers are properly set up

### Issue: Provider Token Missing
**Solution**: Check if GitHub app has correct scopes and permissions

## Quick Fix Commands

```bash
# Check if server is running
curl http://localhost:3001/auth/debug

# Test auth callback endpoint
curl http://localhost:3001/auth/callback?provider=github
```

## Next Steps

1. **Fix GitHub OAuth app** callback URL to Supabase
2. **Verify Supabase** GitHub provider is enabled  
3. **Test the flow** again
4. **Check debug page** for session information
5. **Report back** with console logs and debug output 