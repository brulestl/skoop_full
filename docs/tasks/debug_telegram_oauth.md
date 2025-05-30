# Debug and Fix Telegram OAuth Integration

## Problem
Telegram OAuth completes in the UI, but the callback does not finalize, and the user is not connected ("Connect Telegram" button still shows).

## Goal
Ensure Telegram login flow properly stores a connected account in Supabase.

## Changes Made

### 1. Re-enabled Hash Validation
- **Location**: `src/app/api/oauth/telegram/start/route.ts` (lines 58-67)
- **Change**: Uncommented the hash validation logic that was previously disabled for testing
- **Before**: Hash validation was commented out with `// if (!isValidAuth)`
- **After**: Full hash validation is now active and will reject invalid authentication attempts
- **Impact**: Ensures only legitimate Telegram authentication requests are processed

### 2. Enhanced Debugging Logs
Added comprehensive logging throughout the OAuth flow:

#### Hash Verification Debugging
```typescript
console.log('Telegram auth debug:');
console.log('  - Received hash:', hash);
console.log('  - Data check string:', dataCheckString);
console.log('  - Bot token length:', botToken.length);
console.log('  - Calculated hash:', calculatedHash);
console.log('  - Hashes match:', calculatedHash === hash);
```

#### Authentication Verification Logs
```typescript
console.log('Telegram auth verification result:', isValidAuth);
console.log('Auth data for verification:', authData);
console.log('Bot token configured:', !!botToken);
```

#### Database Operation Logs
```typescript
console.log('Starting database upsert for Telegram connection...');
console.log('Skoop user ID:', user.id);
console.log('Telegram user ID:', telegramUserId);
console.log('Username:', username);
console.log('Display name:', displayName);
console.log('Database upsert completed successfully');
```

#### Redirect Tracking Logs
```typescript
console.log('Redirecting to dashboard with success parameters');
console.log('Redirect URL:', dashboardUrl.toString());
```

#### Enhanced Error Logging
```typescript
console.error('Insert error details:', JSON.stringify(insertError, null, 2));
console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
```

### 3. Database Schema Verification
Confirmed that the `connected_accounts` table has the proper schema:

#### Required Columns (from migration `20250528_complete_connected_accounts.sql`):
- `user_id` (references Supabase auth user)
- `provider` (enum including 'telegram')
- `provider_user_id` (Telegram user ID)
- `username` (Telegram username)
- `display_name` (Telegram first_name + last_name)
- `access_token` (set to 'telegram_connected')
- `status` (default 'active')
- `connected_at` (timestamp)

#### Constraints:
- Unique constraint on `(user_id, provider)` for upsert operations
- Unique constraint on `(provider, provider_user_id)` to prevent duplicate Telegram accounts

## Environment Variables Required

Ensure these are set in both `.env.local` and Vercel environment:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_BOT_USERNAME=your_bot_username_without_@
```

### Verification
Test your environment configuration by visiting `/api/test-telegram-config` to see:
```json
{
  "botId": "extracted_from_token_or_null",
  "botToken": "SET_or_null", 
  "botUsername": "your_bot_username_or_null",
  "appUrl": "your_app_url_or_null"
}
```

## Testing Steps

1. **Visit Connection Page**: Navigate to `/api/oauth/telegram/start`
2. **Check User Authentication**: Ensure user is logged into Skoop first
3. **Telegram Login**: Click "Log in with Telegram" button
4. **Approve Authorization**: Grant permissions in Telegram
5. **Monitor Logs**: Check server logs for debugging output
6. **Verify Database**: Check `connected_accounts` table for new row
7. **Confirm UI Update**: Dashboard should show "Connected" status

## Troubleshooting

### If Hash Validation Fails
- Verify `TELEGRAM_BOT_TOKEN` is correctly set
- Check that the bot token matches the one used to create the Telegram widget
- Ensure the auth data hasn't been tampered with

### If Database Insert Fails
- Check Supabase connection and permissions
- Verify the `connected_accounts` table schema matches requirements
- Look for constraint violations in error logs

### If Redirect Doesn't Work
- Check the redirect URLs in server logs
- Verify dashboard page can handle URL parameters
- Ensure no JavaScript errors are preventing page updates

## Expected Outcome

After successful connection:
1. Row exists in `connected_accounts` table with `provider = 'telegram'`
2. Dashboard shows Telegram as "Connected"
3. User can proceed with Telegram bookmark syncing

## Log Monitoring

Key log messages to watch for:
- ✅ `"Telegram auth debug:"` - Hash verification details
- ✅ `"Hashes match: true"` - Hash verification successful
- ✅ `"Telegram auth verification result: true"`
- ✅ `"Database upsert completed successfully"`
- ✅ `"Redirecting to dashboard with success parameters"`
- ❌ `"Telegram auth: No hash provided"`
- ❌ `"Hashes match: false"` - Hash verification failed
- ❌ `"Invalid Telegram authentication hash"`
- ❌ `"Error storing Telegram connection"`
- ❌ `"User not authenticated in Skoop"`

## Next Steps

1. Test the OAuth flow with the enhanced debugging
2. Monitor server logs during the connection process
3. Verify the database entry is created correctly
4. Confirm the dashboard UI updates to show "Connected" status
5. If issues persist, use the detailed logs to identify the specific failure point 