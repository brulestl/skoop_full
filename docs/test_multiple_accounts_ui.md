# Test Plan: Multiple Connected Accounts in Profile UI

## Current Implementation Status
Based on code review, the implementation appears to already be correct for T1.3:

- ✅ Query: `supabase.from('connected_accounts').select('*').eq('user_id', user.id)` (no `.single()`)
- ✅ Storage: All accounts stored in `accounts` array
- ✅ Display: Maps over all providers, shows connected status for each
- ✅ Logic: `isConnected()` checks all accounts with `accounts.some()`

## Test Scenarios

### Scenario 1: Fresh User (No Connections)
**Expected**: All provider cards show "Connect" button

### Scenario 2: Single Connection (GitHub)
**Expected**: 
- GitHub card shows "Connected" with green background
- All other cards show "Connect" button

### Scenario 3: Multiple Connections (GitHub + Twitter)
**Expected**:
- GitHub card shows "Connected" with green background + Sync/Disconnect buttons
- Twitter card shows "Connected" with green background + Sync/Disconnect buttons  
- All other cards show "Connect" button

### Scenario 4: Disconnect One Provider
**Expected**:
- After disconnecting GitHub, only Twitter shows as connected
- GitHub reverts to "Connect" button

## How to Test

1. **Setup**: Ensure composite PK migration is applied
2. **Connect GitHub**: Go to Profile → Connect GitHub account
3. **Verify**: GitHub card should show "Connected" status
4. **Connect Twitter**: Connect Twitter account  
5. **Verify**: Both GitHub and Twitter cards should show "Connected"
6. **Disconnect GitHub**: Click disconnect on GitHub
7. **Verify**: Only Twitter should remain connected

## Debug Steps if Issues Found

If only first connection shows:

1. **Check browser console** for any JavaScript errors
2. **Check Network tab** for the connected_accounts API call
3. **Verify database** has multiple rows for the user
4. **Check `accounts` state** in React DevTools
5. **Verify `isConnected()` function** is checking all accounts

## Expected Database State After Multiple Connections

```sql
SELECT user_id, provider, created_at 
FROM connected_accounts 
WHERE user_id = 'your-user-id'
ORDER BY created_at;
```

Should show multiple rows:
```
user_id                              | provider | created_at
550e8400-e29b-41d4-a716-446655440000 | github   | 2024-12-24 10:00:00
550e8400-e29b-41d4-a716-446655440000 | twitter  | 2024-12-24 10:05:00
```

## Current Code Analysis

The implementation in `src/components/auth/oauth-connect-buttons.tsx` correctly:
- Fetches all connected accounts via `useConnectedAccounts()` hook
- Maps over all provider definitions
- Uses `isConnected(provider.id)` to check each provider individually
- Renders appropriate UI state for each provider

**Conclusion**: The code appears to already implement T1.3 correctly. Testing needed to confirm behavior. 