# Client-Side RLS Testing Guide

## Overview
This guide shows how to test Row-Level Security (RLS) on the `connected_accounts` table from your application to ensure OAuth tokens are properly protected.

## Test Setup

### 1. Create Test Users
First, create two test users in your application:

```typescript
// Test User 1
const testUser1 = {
  email: 'testuser1@example.com',
  password: 'testpassword123'
};

// Test User 2  
const testUser2 = {
  email: 'testuser2@example.com', 
  password: 'testpassword123'
};
```

### 2. Connect OAuth Accounts
For each test user, connect at least one OAuth provider (e.g., GitHub) to create test data.

## RLS Test Scenarios

### Test 1: Authenticated User Can Only See Own Accounts

```typescript
// test-rls-authenticated.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Using anon key
);

async function testAuthenticatedAccess() {
  // Sign in as Test User 1
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'testuser1@example.com',
    password: 'testpassword123'
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }

  console.log('Signed in as User 1:', authData.user.id);

  // Try to fetch connected accounts
  const { data: accounts, error } = await supabase
    .from('connected_accounts')
    .select('*');

  if (error) {
    console.error('Error fetching accounts:', error);
  } else {
    console.log('Visible accounts for User 1:', accounts);
    console.log('Account count:', accounts.length);
    
    // Verify all accounts belong to the current user
    const allBelongToUser = accounts.every(account => account.user_id === authData.user.id);
    console.log('All accounts belong to current user:', allBelongToUser);
  }

  await supabase.auth.signOut();
}

testAuthenticatedAccess();
```

**Expected Result**: User 1 should only see their own connected accounts, not accounts from other users.

### Test 2: Unauthenticated Access Returns No Data

```typescript
// test-rls-unauthenticated.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Using anon key
);

async function testUnauthenticatedAccess() {
  // Ensure no user is signed in
  await supabase.auth.signOut();

  // Try to fetch connected accounts without authentication
  const { data: accounts, error } = await supabase
    .from('connected_accounts')
    .select('*');

  if (error) {
    console.error('Error (expected):', error);
  } else {
    console.log('Accounts visible without auth:', accounts);
    console.log('Account count:', accounts.length);
  }
}

testUnauthenticatedAccess();
```

**Expected Result**: Should return 0 rows or an error, as unauthenticated users cannot access any connected accounts.

### Test 3: Cross-User Access Prevention

```typescript
// test-rls-cross-user.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testCrossUserAccess() {
  // Get User 1's ID
  const { data: user1Auth } = await supabase.auth.signInWithPassword({
    email: 'testuser1@example.com',
    password: 'testpassword123'
  });
  const user1Id = user1Auth.user?.id;
  await supabase.auth.signOut();

  // Get User 2's ID
  const { data: user2Auth } = await supabase.auth.signInWithPassword({
    email: 'testuser2@example.com', 
    password: 'testpassword123'
  });
  const user2Id = user2Auth.user?.id;

  console.log('User 1 ID:', user1Id);
  console.log('User 2 ID:', user2Id);

  // While signed in as User 2, try to access User 1's accounts
  const { data: accounts, error } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('user_id', user1Id); // Explicitly trying to access User 1's data

  if (error) {
    console.error('Error accessing other user data (expected):', error);
  } else {
    console.log('User 1 accounts visible to User 2:', accounts);
    console.log('Account count:', accounts.length);
    
    if (accounts.length === 0) {
      console.log('✅ SUCCESS: User 2 cannot see User 1 accounts');
    } else {
      console.log('❌ FAILURE: RLS not working - User 2 can see User 1 accounts');
    }
  }

  await supabase.auth.signOut();
}

testCrossUserAccess();
```

**Expected Result**: User 2 should not be able to see User 1's connected accounts, even when explicitly querying for them.

### Test 4: Malicious Insert/Update/Delete Prevention

```typescript
// test-rls-malicious-operations.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testMaliciousOperations() {
  // Sign in as User 2
  const { data: authData } = await supabase.auth.signInWithPassword({
    email: 'testuser2@example.com',
    password: 'testpassword123'
  });

  const user2Id = authData.user?.id;
  const user1Id = '11111111-1111-1111-1111-111111111111'; // Fake User 1 ID

  console.log('Signed in as User 2:', user2Id);

  // Test 1: Try to insert data for another user
  console.log('\n--- Test 1: Malicious INSERT ---');
  const { data: insertData, error: insertError } = await supabase
    .from('connected_accounts')
    .insert({
      user_id: user1Id, // Trying to insert for User 1
      provider: 'github',
      access_token: 'malicious_token'
    });

  if (insertError) {
    console.log('✅ INSERT blocked:', insertError.message);
  } else {
    console.log('❌ INSERT succeeded (RLS FAILED):', insertData);
  }

  // Test 2: Try to update another user's data
  console.log('\n--- Test 2: Malicious UPDATE ---');
  const { data: updateData, error: updateError } = await supabase
    .from('connected_accounts')
    .update({ access_token: 'hacked_token' })
    .eq('user_id', user1Id); // Trying to update User 1's data

  if (updateError) {
    console.log('✅ UPDATE blocked:', updateError.message);
  } else {
    console.log('❌ UPDATE succeeded (RLS FAILED):', updateData);
  }

  // Test 3: Try to delete another user's data
  console.log('\n--- Test 3: Malicious DELETE ---');
  const { data: deleteData, error: deleteError } = await supabase
    .from('connected_accounts')
    .delete()
    .eq('user_id', user1Id); // Trying to delete User 1's data

  if (deleteError) {
    console.log('✅ DELETE blocked:', deleteError.message);
  } else {
    console.log('❌ DELETE succeeded (RLS FAILED):', deleteData);
  }

  await supabase.auth.signOut();
}

testMaliciousOperations();
```

**Expected Result**: All malicious operations should be blocked by RLS policies.

## Service Role Testing

### Test 5: Service Role Can Access All Data

```typescript
// test-rls-service-role.ts
import { createClient } from '@supabase/supabase-js';

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Using service role key
);

async function testServiceRoleAccess() {
  console.log('Testing service role access...');

  // Service role should be able to see all connected accounts
  const { data: allAccounts, error } = await supabaseService
    .from('connected_accounts')
    .select('*');

  if (error) {
    console.error('Service role error:', error);
  } else {
    console.log('All accounts visible to service role:', allAccounts.length);
    console.log('Sample accounts:', allAccounts.slice(0, 3));
  }
}

testServiceRoleAccess();
```

**Expected Result**: Service role should be able to access all connected accounts across all users.

## Running the Tests

### 1. Setup Test Environment

```bash
# Install dependencies
npm install @supabase/supabase-js

# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 2. Run Individual Tests

```bash
# Test authenticated access
npx tsx test-rls-authenticated.ts

# Test unauthenticated access  
npx tsx test-rls-unauthenticated.ts

# Test cross-user access prevention
npx tsx test-rls-cross-user.ts

# Test malicious operations
npx tsx test-rls-malicious-operations.ts

# Test service role access
npx tsx test-rls-service-role.ts
```

## Expected Test Results Summary

| Test | Expected Result |
|------|----------------|
| Authenticated User Access | ✅ Only sees own accounts |
| Unauthenticated Access | ✅ Sees 0 accounts |
| Cross-User Access | ✅ Cannot see other users' accounts |
| Malicious INSERT | ✅ Blocked by RLS |
| Malicious UPDATE | ✅ Blocked by RLS |
| Malicious DELETE | ✅ Blocked by RLS |
| Service Role Access | ✅ Can see all accounts |

## Troubleshooting

### If RLS is not working:

1. **Check RLS is enabled**:
   ```sql
   SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'connected_accounts';
   ```

2. **Verify policies exist**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'connected_accounts';
   ```

3. **Check auth.uid() function**:
   ```sql
   SELECT auth.uid();
   ```

4. **Verify JWT token is valid**:
   - Check browser dev tools → Application → Local Storage
   - Look for `supabase.auth.token`

### Common Issues:

- **Service role key used instead of anon key**: Service role bypasses RLS
- **User not properly authenticated**: `auth.uid()` returns null
- **Policies not applied**: Check policy syntax and conditions
- **Caching issues**: Clear browser cache and restart application 