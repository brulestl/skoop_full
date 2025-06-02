# Telegram OAuth Troubleshooting Guide

This guide helps you diagnose and fix Telegram OAuth connection issues in Skoop.

## Quick Diagnosis

First, check your configuration by visiting: `/api/telegram/check-config`

This will show you which environment variables are missing.

## Common Issues and Solutions

### 1. "Internal server error" when connecting Telegram

**Symptoms:**
- Error in console: `Failed to refresh account: Error: Internal server error`
- Toast message: `❌ Failed to sync telegram: Internal server error`

**Possible Causes:**

#### A. Missing Environment Variables
Check that these are set in your `.env.local` file:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_BOT_USERNAME=your_bot_username_without_@
TELEGRAM_API_ID=your_api_id_from_my_telegram_org
TELEGRAM_API_HASH=your_api_hash_from_my_telegram_org
OAUTH_ENCRYPTION_KEY=your_32_character_encryption_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**How to get these values:**

1. **TELEGRAM_BOT_TOKEN & TELEGRAM_BOT_USERNAME:**
   - Message @BotFather on Telegram
   - Create a new bot with `/newbot`
   - Get the token and username

2. **TELEGRAM_API_ID & TELEGRAM_API_HASH:**
   - Go to https://my.telegram.org
   - Log in with your phone number
   - Go to "API development tools"
   - Create a new application

3. **OAUTH_ENCRYPTION_KEY:**
   - Generate a random 32-character string
   - Example: `openssl rand -hex 16`

#### B. Database Schema Issues
The `connected_accounts` table might be missing required columns.

**Check your database:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'connected_accounts' 
AND table_schema = 'public';
```

**Required columns:**
- `telegram_session_string` (TEXT)
- `provider_user_id` (TEXT)
- `username` (TEXT)
- `display_name` (TEXT)
- `status` (TEXT)
- `last_error` (TEXT)
- `last_sync_message_id` (INTEGER)

**Fix missing columns:**
```sql
ALTER TABLE connected_accounts 
ADD COLUMN IF NOT EXISTS telegram_session_string TEXT,
ADD COLUMN IF NOT EXISTS provider_user_id TEXT,
ADD COLUMN IF NOT EXISTS username TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_error TEXT,
ADD COLUMN IF NOT EXISTS last_sync_message_id INTEGER;
```

#### C. Supabase Edge Function Issues
The `ingest_telegram_saved` edge function might not be deployed or configured.

**Check if function exists:**
```bash
supabase functions list
```

**Deploy the function:**
```bash
supabase functions deploy ingest_telegram_saved
```

**Set environment variables for the function:**
```bash
supabase secrets set TELEGRAM_API_ID=your_api_id
supabase secrets set TELEGRAM_API_HASH=your_api_hash
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
```

### 2. "Popup blocked" errors

**Solution:**
- Allow popups for your domain in browser settings
- Try using a different browser
- Disable popup blockers temporarily

### 3. "Session expired" errors

**Symptoms:**
- Toast: `❌ telegram session expired. Please reconnect your account.`

**Solution:**
1. Disconnect the Telegram account
2. Reconnect it fresh
3. The session string will be regenerated

### 4. "No session" errors (409 status)

**Symptoms:**
- HTTP 409 error with `no_session` message

**Solution:**
This means the user connected Telegram via OAuth but doesn't have a session string for API access. This is expected for the OAuth-only flow. You have two options:

1. **Use the Message Migration feature** (Recommended):
   - If you have existing Telegram messages in the `telegram_messages` table
   - Click the "Migrate Messages" button next to "Sync Now" for Telegram
   - This will copy existing messages to the bookmarks table for display

2. **Set up full API access**:
   - Use the Telegram client setup to generate a session string
   - Or implement the session generation flow

### 5. Messages not showing in UI

**Symptoms:**
- Telegram is connected but no messages appear in "Recent Saves"
- Messages exist in `telegram_messages` table but not in bookmarks

**Solution:**
1. **Use the Migration feature**:
   - Go to Profile → Connected Accounts
   - Find your Telegram account
   - Click "Migrate Messages" button
   - This will copy messages from `telegram_messages` to `bookmarks` table

2. **Check database tables**:
   ```sql
   -- Check if messages exist in telegram_messages
   SELECT COUNT(*) FROM telegram_messages WHERE telegram_user_id = 'your_telegram_user_id';
   
   -- Check if messages exist in bookmarks
   SELECT COUNT(*) FROM bookmarks WHERE user_id = 'your_user_id' AND source = 'telegram';
   ```

### 6. Widget not loading

**Symptoms:**
- Telegram login widget doesn't appear
- "Loading Telegram widget..." message persists

**Possible Causes:**
- `TELEGRAM_BOT_USERNAME` not set
- Bot not configured properly with BotFather
- Domain not whitelisted with the bot

**Solution:**
1. Check bot configuration with BotFather
2. Ensure domain is whitelisted
3. Verify `TELEGRAM_BOT_USERNAME` is correct (without @)

## Debugging Steps

### 1. Check Configuration
Visit `/api/telegram/check-config` to see missing environment variables.

### 2. Check Database
Visit `/api/telegram/debug` (when logged in) to see detailed diagnostics.

### 3. Check Browser Console
Look for specific error messages in the browser developer tools.

### 4. Check Server Logs
Look at your deployment logs for detailed error messages.

### 5. Test Individual Components

**Test OAuth start:**
```
GET /api/oauth/telegram/start?user_token=test
```

**Test sync endpoint:**
```
POST /api/sync/telegram
```

## Environment Setup Checklist

- [ ] `TELEGRAM_BOT_TOKEN` set and valid
- [ ] `TELEGRAM_BOT_USERNAME` set (without @)
- [ ] `TELEGRAM_API_ID` set
- [ ] `TELEGRAM_API_HASH` set
- [ ] `OAUTH_ENCRYPTION_KEY` set (32+ characters)
- [ ] `NEXT_PUBLIC_APP_URL` set to your domain
- [ ] Database migrations applied
- [ ] Supabase edge functions deployed
- [ ] Edge function secrets configured
- [ ] Bot domain whitelisted with BotFather

## Getting Help

If you're still having issues:

1. Run the diagnostic endpoint: `/api/telegram/debug`
2. Check the browser console for errors
3. Check your deployment logs
4. Verify all environment variables are set correctly
5. Ensure your bot is properly configured with BotFather

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "TELEGRAM_BOT_TOKEN environment variable is not configured" | Missing bot token | Set `TELEGRAM_BOT_TOKEN` in environment |
| "TELEGRAM_BOT_USERNAME not configured" | Missing bot username | Set `TELEGRAM_BOT_USERNAME` in environment |
| "Popup blocked" | Browser blocking popup | Allow popups for your domain |
| "OAuth cancelled by user" | User closed popup | User needs to complete OAuth flow |
| "Session format incompatible" | Invalid session string | Regenerate session string |
| "Telegram client is not authorized" | Session expired | Reconnect Telegram account |
| "no_session" (409) | No API session available | Expected for OAuth-only flow | 