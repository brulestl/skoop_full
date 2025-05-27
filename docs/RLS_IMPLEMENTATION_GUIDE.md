# Row-Level Security Implementation Guide

## 🔒 Overview

This document explains the Row-Level Security (RLS) implementation for the `connected_accounts` table, which protects OAuth tokens from unauthorized access.

## 🎯 Problem Solved

**Before RLS**: OAuth tokens were readable with the anon key, creating a security vulnerability where any client could potentially access other users' sensitive authentication tokens.

**After RLS**: Only authenticated users can access their own connected accounts, and service roles can access all data for administrative purposes.

## 🛡️ Security Implementation

### 1. Enable RLS on Table

```sql
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
```

This enables row-level security enforcement on the `connected_accounts` table.

### 2. RLS Policies Created

#### Policy 1: User Select Own Accounts
```sql
CREATE POLICY "user_select_own_accounts"
  ON connected_accounts FOR SELECT
  USING (user_id = auth.uid());
```

**Purpose**: Allows users to SELECT (read) only their own connected accounts.
**Condition**: `user_id = auth.uid()` ensures the row's user_id matches the authenticated user's ID.

#### Policy 2: User Insert Own Accounts
```sql
CREATE POLICY "user_insert_own_accounts"
  ON connected_accounts FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

**Purpose**: Allows users to INSERT only their own connected accounts.
**Condition**: `WITH CHECK (user_id = auth.uid())` ensures new rows can only be inserted with the authenticated user's ID.

#### Policy 3: User Update Own Accounts
```sql
CREATE POLICY "user_update_own_accounts"
  ON connected_accounts FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```

**Purpose**: Allows users to UPDATE only their own connected accounts.
**Conditions**: 
- `USING (user_id = auth.uid())` ensures only rows belonging to the user can be selected for update
- `WITH CHECK (user_id = auth.uid())` ensures the updated row still belongs to the user

#### Policy 4: User Delete Own Accounts
```sql
CREATE POLICY "user_delete_own_accounts"
  ON connected_accounts FOR DELETE
  USING (user_id = auth.uid());
```

**Purpose**: Allows users to DELETE only their own connected accounts.
**Condition**: `USING (user_id = auth.uid())` ensures only rows belonging to the user can be deleted.

## 🔑 How RLS Works

### Authentication Context
- **`auth.uid()`**: Returns the UUID of the currently authenticated user
- **Anon Key**: When using the anon key, `auth.uid()` returns the user ID from the JWT token
- **Service Role**: Bypasses RLS entirely and can access all data

### Policy Enforcement
1. **SELECT Operations**: Only returns rows where `user_id = auth.uid()`
2. **INSERT Operations**: Only allows inserting rows where `user_id = auth.uid()`
3. **UPDATE Operations**: Only allows updating rows where `user_id = auth.uid()`
4. **DELETE Operations**: Only allows deleting rows where `user_id = auth.uid()`

## 🧪 Testing Strategy

### Database-Level Testing
Run the migration and test script:
```bash
# Apply the RLS migration
psql -f supabase/migrations/20241224000001_enable_rls_connected_accounts.sql

# Run comprehensive tests
psql -f supabase/test_rls_connected_accounts.sql
```

### Application-Level Testing
Use the client-side test scripts to verify RLS from your application:

1. **Authenticated Access Test**: Verify users only see their own accounts
2. **Unauthenticated Access Test**: Verify no data is accessible without auth
3. **Cross-User Access Test**: Verify users cannot access other users' data
4. **Malicious Operations Test**: Verify unauthorized operations are blocked
5. **Service Role Test**: Verify service role can access all data

## 📊 Security Matrix

| User Type | Authentication | Can Read Own Data | Can Read Others' Data | Can Modify Own Data | Can Modify Others' Data |
|-----------|----------------|-------------------|----------------------|---------------------|------------------------|
| Unauthenticated | None | ❌ No | ❌ No | ❌ No | ❌ No |
| Authenticated User | JWT Token | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| Service Role | Service Key | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

## 🔍 Verification Steps

### 1. Check RLS Status
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'connected_accounts';
```
Expected: `rowsecurity = true`

### 2. Verify Policies Exist
```sql
SELECT policyname, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'connected_accounts';
```
Expected: Two policies with correct conditions

### 3. Test User Isolation
```sql
-- This should only return current user's accounts
SELECT COUNT(*) FROM connected_accounts;
```

## 🚨 Common Issues & Troubleshooting

### Issue 1: RLS Not Working
**Symptoms**: Users can see other users' data
**Causes**:
- RLS not enabled on table
- Policies not created correctly
- Using service role key instead of anon key

**Solutions**:
```sql
-- Check if RLS is enabled
SELECT rowsecurity FROM pg_tables WHERE tablename = 'connected_accounts';

-- Re-enable if needed
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
```

### Issue 2: No Data Visible to Authenticated Users
**Symptoms**: Authenticated users see 0 rows
**Causes**:
- `auth.uid()` returning null
- JWT token invalid or expired
- Policy conditions too restrictive

**Solutions**:
```sql
-- Check current user ID
SELECT auth.uid();

-- Check JWT claims
SELECT current_setting('request.jwt.claims', true);
```

### Issue 3: Service Role Cannot Access Data
**Symptoms**: Service role operations fail
**Causes**:
- Using anon key instead of service role key
- Service role key incorrect

**Solutions**:
- Verify you're using the correct service role key
- Service role should bypass RLS automatically

## 🔧 Implementation in Application Code

### Using Anon Key (Client-Side)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // RLS enforced
);

// This will only return current user's accounts
const { data: accounts } = await supabase
  .from('connected_accounts')
  .select('*');
```

### Using Service Role (Server-Side)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // RLS bypassed
);

// This will return ALL accounts across all users
const { data: allAccounts } = await supabaseService
  .from('connected_accounts')
  .select('*');
```

## 📈 Security Benefits

### Before RLS Implementation
- ❌ OAuth tokens accessible with anon key
- ❌ No user data isolation
- ❌ Potential for data breaches
- ❌ Compliance issues

### After RLS Implementation  
- ✅ OAuth tokens protected by user authentication
- ✅ Complete user data isolation
- ✅ Unauthorized access prevented
- ✅ Compliance with security best practices
- ✅ Service role retains administrative access

## 🚀 Next Steps

1. **Apply the migration** to enable RLS
2. **Run the test scripts** to verify implementation
3. **Test from your application** using both anon and service keys
4. **Monitor logs** for any RLS policy violations
5. **Consider additional policies** for specific use cases

## 📋 Migration Checklist

- [ ] Apply RLS migration: `20241224000001_enable_rls_connected_accounts.sql`
- [ ] Run database tests: `test_rls_connected_accounts.sql`
- [ ] Test client-side access with anon key
- [ ] Test service role access
- [ ] Verify existing application functionality
- [ ] Monitor for any RLS-related errors
- [ ] Update documentation and team knowledge

## 🔗 Related Files

- **Migration**: `supabase/migrations/20241224000001_enable_rls_connected_accounts.sql`
- **Database Tests**: `supabase/test_rls_connected_accounts.sql`
- **Client Tests**: `test_rls_client_side.md`
- **Implementation Guide**: `RLS_IMPLEMENTATION_GUIDE.md` (this file)

This RLS implementation ensures that OAuth tokens are properly secured while maintaining the functionality needed for legitimate application operations. 