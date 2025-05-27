# Test Plan: UPSERT Removal and "Already Linked" Detection

## Overview
This test plan verifies that the removal of `onConflict: 'user_id'` UPSERT operations works correctly and that the system properly handles "account already linked" scenarios.

## Changes Made

### 1. Removed UPSERT Operations
- **File**: `src/app/auth/callback/route.ts`
- **Change**: Replaced `.upsert()` with explicit check → insert or update logic
- **File**: `src/app/auth/callback/page.tsx` 
- **Change**: Replaced `.upsert()` with explicit check → insert or update logic

### 2. Added "Already Linked" Detection
- **File**: `src/hooks/useConnectedAccounts.ts`
- **Change**: Added pre-check in `connectAccount()` to prevent OAuth flow if already connected
- **File**: `src/components/auth/oauth-connect-buttons.tsx`
- **Change**: Enhanced error handling to show specific "already linked" messages

### 3. Created Connect API Endpoint
- **File**: `src/app/api/connect/[provider]/route.ts`
- **Purpose**: Provides REST API for connection management with proper 409 status codes
- **Methods**: POST (check), PUT (insert), PATCH (update)

## Test Scenarios

### Test 1: Fresh Connection (New Provider)
**Expected Behavior**: New provider inserts a new row

1. **Setup**: Ensure user has no connected accounts
2. **Action**: Connect GitHub account via OAuth
3. **Expected Result**: 
   - ✅ New row inserted in `connected_accounts` table
   - ✅ User redirected to dashboard with success message
   - ✅ GitHub shows as "Connected" in UI

### Test 2: Multiple Providers
**Expected Behavior**: Each provider gets its own row

1. **Setup**: User has GitHub connected
2. **Action**: Connect Twitter account via OAuth
3. **Expected Result**:
   - ✅ Both GitHub and Twitter rows exist in `connected_accounts`
   - ✅ No conflicts or overwrites
   - ✅ Both show as "Connected" in UI

### Test 3: Re-connect Same Provider (OAuth Flow)
**Expected Behavior**: Tokens updated, no duplicate rows

1. **Setup**: User has GitHub connected
2. **Action**: Go through GitHub OAuth flow again
3. **Expected Result**:
   - ✅ Existing GitHub row updated with new tokens
   - ✅ No duplicate GitHub rows created
   - ✅ `updated_at` timestamp refreshed

### Test 4: Pre-connection Check (UI Level)
**Expected Behavior**: UI prevents OAuth flow if already connected

1. **Setup**: User has GitHub connected
2. **Action**: Click "Connect" button for GitHub in UI
3. **Expected Result**:
   - ❌ OAuth flow does NOT start
   - ✅ Error toast: "github account is already connected. Please disconnect it first..."
   - ✅ Button remains in "Connect" state (not loading)

### Test 5: API Endpoint - Already Linked (409)
**Expected Behavior**: API returns 409 status for duplicate connections

1. **Setup**: User has GitHub connected
2. **Action**: `POST /api/connect/github`
3. **Expected Result**:
   - ✅ Status: 409 Conflict
   - ✅ Response: `{ "error": "Account already linked", "message": "...", "provider": "github" }`

### Test 6: API Endpoint - Manual Insert (409)
**Expected Behavior**: Manual token insertion fails if already linked

1. **Setup**: User has GitHub connected  
2. **Action**: `PUT /api/connect/github` with new tokens
3. **Expected Result**:
   - ✅ Status: 409 Conflict
   - ✅ Response: `{ "error": "Account already linked", "message": "Use PATCH to update..." }`

### Test 7: API Endpoint - Token Update (200)
**Expected Behavior**: PATCH updates existing tokens

1. **Setup**: User has GitHub connected
2. **Action**: `PATCH /api/connect/github` with new tokens
3. **Expected Result**:
   - ✅ Status: 200 OK
   - ✅ Tokens updated in database
   - ✅ Response: `{ "success": true, "message": "Successfully updated..." }`

## Manual Testing Steps

### Step 1: Reset Test Environment
```sql
-- Clean up any existing test connections
DELETE FROM connected_accounts WHERE user_id = 'your-test-user-id';
```

### Step 2: Test Fresh Connections
1. Navigate to `/dashboard?tab=profile`
2. Click "Connect" for GitHub
3. Complete OAuth flow
4. Verify GitHub shows as connected
5. Click "Connect" for Twitter  
6. Complete OAuth flow
7. Verify both GitHub and Twitter show as connected

### Step 3: Test "Already Linked" Detection
1. With GitHub already connected, click "Connect" for GitHub again
2. Verify error toast appears: "github account is already linked..."
3. Verify OAuth flow does NOT start
4. Verify GitHub remains connected (no changes)

### Step 4: Test Re-authentication (Token Update)
1. Manually trigger GitHub OAuth flow (bypass UI check)
2. Complete OAuth flow
3. Verify GitHub connection updated (check `updated_at` timestamp)
4. Verify no duplicate GitHub rows exist

### Step 5: Test API Endpoints
```bash
# Test already linked detection
curl -X POST /api/connect/github \
  -H "Cookie: your-session-cookie"
# Expected: 409 Conflict

# Test manual token update  
curl -X PATCH /api/connect/github \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"access_token": "new_token", "refresh_token": "new_refresh"}'
# Expected: 200 OK
```

## Database Verification

After each test, verify the database state:

```sql
-- Check connected accounts for test user
SELECT 
    user_id,
    provider, 
    created_at,
    updated_at,
    access_token
FROM connected_accounts 
WHERE user_id = 'your-test-user-id'
ORDER BY provider;

-- Verify no duplicate (user_id, provider) combinations
SELECT 
    user_id,
    provider,
    COUNT(*) as count
FROM connected_accounts 
GROUP BY user_id, provider
HAVING COUNT(*) > 1;
-- Should return no rows
```

## Success Criteria

- ✅ **No UPSERT operations** remain in connected_accounts code
- ✅ **Multiple providers** can be connected simultaneously  
- ✅ **Re-authentication** updates tokens without creating duplicates
- ✅ **UI prevents** duplicate connection attempts
- ✅ **API returns 409** for already linked accounts
- ✅ **Database integrity** maintained (no duplicate rows)
- ✅ **User experience** improved with clear error messages

## Rollback Plan

If issues are found:

1. **Revert auth callback files** to use `.upsert()` with `onConflict: 'user_id,provider'`
2. **Remove pre-connection checks** from `useConnectedAccounts.ts`
3. **Delete API endpoint** `/api/connect/[provider]/route.ts`
4. **Restore original error handling** in OAuth connect buttons

The composite primary key migration can remain as it provides the foundation for proper multi-provider support. 