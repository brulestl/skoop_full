# OAuth Troubleshooting Guide

## Current Issues

### 1. GitHub Error: "The redirect_uri is not associated with this application"
**Cause**: Your GitHub OAuth app is configured with old Supabase callback URLs instead of the new custom ones.

### 2. Twitter Error: "Something went wrong. You weren't able to give access to the App"
**Cause**: Your Twitter OAuth app is configured with old Supabase callback URLs instead of the new custom ones.

## Quick Fix Steps

### Step 1: Update GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on your OAuth App
3. **REPLACE** the current Authorization callback URL with:
   ```
   https://skoop.pro/api/oauth/github/callback
   ```
4. For development, also add:
   ```
   http://localhost:3001/api/oauth/github/callback
   ```

### Step 2: Update Twitter/X OAuth App
1. Go to [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Navigate to your app → Settings → Authentication settings
3. **REPLACE** the current Callback URLs with:
   ```
   https://skoop.pro/api/oauth/twitter/callback
   ```
4. For development, also add:
   ```
   http://localhost:3001/api/oauth/twitter/callback
   ```

## What Changed

### Before (Supabase OAuth):
- GitHub callback: `https://your-project.supabase.co/auth/v1/callback`
- Twitter callback: `https://your-project.supabase.co/auth/v1/callback`

### After (Custom OAuth):
- GitHub callback: `https://skoop.pro/api/oauth/github/callback`
- Twitter callback: `https://skoop.pro/api/oauth/twitter/callback`

## Testing After Updates

### Test GitHub Connection:
1. Go to `https://skoop.pro/dashboard`
2. Click "Connect GitHub"
3. Should redirect to GitHub authorization
4. After authorization, should redirect back to your dashboard

### Test Twitter Connection:
1. Go to `https://skoop.pro/dashboard`
2. Click "Connect Twitter"
3. Should redirect to Twitter authorization
4. After authorization, should redirect back to your dashboard

## Common Issues & Solutions

### Issue: Still getting redirect_uri errors
**Solution**: 
- Double-check the callback URLs are exactly: `https://skoop.pro/api/oauth/github/callback`
- Make sure there are no trailing slashes or extra characters
- Wait a few minutes for changes to propagate

### Issue: Twitter CSP (Content Security Policy) errors
**Solution**: This is usually a browser warning and doesn't affect functionality. The OAuth should still work.

### Issue: "Invalid state parameter" errors
**Solution**: 
- Clear browser cookies for skoop.pro
- Try the OAuth flow again
- This happens when cookies expire or get corrupted

## Verification Commands

You can test the endpoints directly:

### Test GitHub OAuth Start:
```bash
curl -I https://skoop.pro/api/oauth/github/start
```
Should return a 302 redirect to GitHub.

### Test Twitter OAuth Start:
```bash
curl -I https://skoop.pro/api/oauth/twitter/start
```
Should return a 302 redirect to Twitter.

## Emergency Rollback

If you need to temporarily go back to Supabase OAuth:

1. In your OAuth app settings, change callback URLs back to:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

2. In your app code, temporarily use the old Supabase OAuth method in `useConnectedAccounts.ts`

## Next Steps After Fixing

1. Update the callback URLs as described above
2. Test both GitHub and Twitter connections
3. Verify that accounts are being stored in the `connected_accounts` table
4. Check that multiple OAuth providers can be linked to the same user

## Support

If you continue having issues:
1. Check the browser developer console for detailed error messages
2. Check the Vercel function logs for server-side errors
3. Verify all environment variables are set correctly in Vercel 