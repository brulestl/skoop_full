# Test Plan: Epic T5.1 - Edge-Function Resilience & Error Surface

## Overview
This test plan validates that sync functions properly handle errors, log them to Supabase, and update the UI to prompt users for reconnection.

## Prerequisites
1. Apply migration: `supabase/migrations/20250127000000_add_error_tracking_to_connected_accounts.sql`
2. Have at least one connected account (GitHub recommended)
3. Access to Supabase dashboard for checking logs

## Test Scenarios

### Scenario 1: Token Expiry Simulation
**Objective**: Test that expired tokens are properly detected and handled

**Steps**:
1. Connect a GitHub account in Profile settings
2. Manually corrupt the access token in the database:
   ```sql
   UPDATE connected_accounts 
   SET access_token = 'invalid_token_12345' 
   WHERE provider = 'github' AND user_id = 'your-user-id';
   ```
3. Trigger a sync by clicking "Sync Now" on the GitHub account
4. Check the sync function logs in Supabase Dashboard → Edge Functions → Logs

**Expected Results**:
- ✅ Sync function logs error: "GitHub API error: 401 Unauthorized"
- ✅ Database updated: `status = 'expired'`, `last_error` contains error message
- ✅ UI shows red background with "Token Expired" message
- ✅ "Reconnect" button appears instead of "Sync Now"
- ✅ Error message displayed under provider name

### Scenario 2: Network/API Error Simulation
**Objective**: Test handling of general API errors

**Steps**:
1. Temporarily modify GitHub sync function to use invalid URL:
   ```typescript
   // In supabase/functions/ingest_github/index.ts
   const response = await fetch('https://api.github.com/invalid-endpoint', {
   ```
2. Deploy the modified function
3. Trigger a sync

**Expected Results**:
- ✅ Sync function logs error: "GitHub API error: 404 Not Found"
- ✅ Database updated: `status = 'error'`, `last_error` contains error message
- ✅ UI shows red background with "Sync Error" message
- ✅ "Reconnect" button appears

### Scenario 3: Successful Sync After Error
**Objective**: Test that error states are cleared on successful sync

**Steps**:
1. Start with an account in error state (from previous tests)
2. Fix the token/issue (restore valid token or revert function changes)
3. Click "Reconnect" or "Sync Now"

**Expected Results**:
- ✅ Sync completes successfully
- ✅ Database updated: `status = 'active'`, `last_error = null`
- ✅ UI shows green background with "Connected" message
- ✅ "Sync Now" button appears instead of "Reconnect"

### Scenario 4: Reddit Token Refresh
**Objective**: Test Reddit's token refresh mechanism

**Steps**:
1. Connect a Reddit account (if available)
2. Manually expire the access token:
   ```sql
   UPDATE connected_accounts 
   SET access_token = 'expired_reddit_token' 
   WHERE provider = 'reddit' AND user_id = 'your-user-id';
   ```
3. Trigger a Reddit sync

**Expected Results**:
- ✅ Function attempts token refresh using refresh_token
- ✅ If refresh succeeds: status remains 'active'
- ✅ If refresh fails: status = 'expired', error logged

## Database Verification

### Check Error Tracking Fields
```sql
SELECT 
  provider,
  status,
  last_error,
  last_sync_at,
  updated_at
FROM connected_accounts 
WHERE user_id = 'your-user-id'
ORDER BY provider;
```

### Check Sync History
```sql
SELECT 
  provider,
  status,
  error_message,
  created_at
FROM sync_history 
WHERE user_id = 'your-user-id'
ORDER BY created_at DESC
LIMIT 10;
```

## UI Verification Checklist

### Error State UI
- [ ] Red background for accounts with errors
- [ ] "Token Expired" vs "Sync Error" messaging
- [ ] Error details shown (truncated if long)
- [ ] "Reconnect" button with red styling
- [ ] AlertCircle icon displayed

### Active State UI  
- [ ] Green background for working accounts
- [ ] "Connected" with CheckCircle icon
- [ ] "Sync Now" button available
- [ ] No error messages displayed

### Loading States
- [ ] "Reconnecting..." text during reconnect
- [ ] "Syncing..." text during sync
- [ ] Spinner animations working
- [ ] Buttons properly disabled during operations

## Edge Function Logs Verification

### In Supabase Dashboard → Edge Functions → Logs:

**Successful Sync Logs**:
```
Starting GitHub ingestion for user: [user-id]
Fetching starred repositories from GitHub API...
Found X starred GitHub repositories
Successfully processed X GitHub repositories
```

**Error Logs**:
```
GitHub API call failed: Error: GitHub API error: 401 Unauthorized - [details]
GitHub ingestion error: [error details]
```

**Database Update Logs**:
```
Updated connected_accounts with error status
Updated connected_accounts with successful sync status
```

## Manual Testing Commands

### Simulate Token Expiry
```sql
-- Make GitHub token invalid
UPDATE connected_accounts 
SET access_token = 'ghp_invalid_token_12345' 
WHERE provider = 'github';

-- Check status after sync attempt
SELECT provider, status, last_error, last_sync_at 
FROM connected_accounts 
WHERE provider = 'github';
```

### Reset to Working State
```sql
-- Clear error state (you'll need to reconnect properly)
UPDATE connected_accounts 
SET status = 'active', last_error = null 
WHERE provider = 'github';
```

### Check Recent Sync Attempts
```sql
SELECT 
  provider,
  status,
  last_sync_at,
  last_error,
  updated_at
FROM connected_accounts 
ORDER BY last_sync_at DESC NULLS LAST;
```

## Success Criteria

### ✅ Error Detection
- [ ] 401 errors detected as 'expired' status
- [ ] Other API errors detected as 'error' status
- [ ] Network failures properly caught and logged

### ✅ Error Logging
- [ ] All errors logged to Supabase Edge Function logs
- [ ] Error messages stored in `last_error` field
- [ ] `last_sync_at` timestamp updated on each attempt

### ✅ UI Feedback
- [ ] Error states visually distinct (red background)
- [ ] Clear error messaging ("Token Expired" vs "Sync Error")
- [ ] Reconnect button available for error states
- [ ] Error details accessible (tooltip/truncated display)

### ✅ Recovery
- [ ] Successful reconnection clears error state
- [ ] UI returns to normal green "Connected" state
- [ ] Sync functionality restored after reconnection

## Troubleshooting

### If UI doesn't show error states:
1. Check browser console for JavaScript errors
2. Verify `getAccount()` function returns status field
3. Check if migration was applied successfully

### If database isn't updating:
1. Check Edge Function logs for database errors
2. Verify service role permissions
3. Check if connected_accounts table has new fields

### If sync functions don't catch errors:
1. Verify try/catch blocks are properly placed
2. Check if error handling code was deployed
3. Test with known invalid tokens/URLs

## Notes
- Error states persist until successful reconnection
- Users can still disconnect accounts in error state
- Sync attempts update `last_sync_at` even if they fail
- Error messages are truncated in UI but full text stored in database 