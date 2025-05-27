# Composite Primary Key Migration for connected_accounts

## Problem Statement

The `connected_accounts` table was using `user_id` as the sole primary key/unique constraint. This caused issues with UPSERT operations where inserting a new provider for an existing user would overwrite the existing row instead of creating a new one.

**Before Migration:**
- Primary Key: `id` (UUID)
- Unique Constraint: `(user_id, provider)`
- Issue: Users could only have one connected account total

**After Migration:**
- Primary Key: `(user_id, provider)` (composite)
- No separate `id` column needed
- Solution: Users can have multiple connected accounts, one per provider

## Migration Details

### File: `supabase/migrations/20241224000000_add_composite_pk_connected_accounts.sql`

The migration performs the following operations:

1. **Drop existing primary key constraint**
   ```sql
   ALTER TABLE connected_accounts DROP CONSTRAINT connected_accounts_pkey;
   ```

2. **Add composite primary key**
   ```sql
   ALTER TABLE connected_accounts 
   ADD CONSTRAINT connected_accounts_pkey PRIMARY KEY (user_id, provider);
   ```

3. **Remove redundant id column**
   ```sql
   ALTER TABLE connected_accounts DROP COLUMN id;
   ```

### Code Changes

#### TypeScript Interface Updates

**File: `src/hooks/useConnectedAccounts.ts`**
- Removed `id: string` from `ConnectedAccount` interface
- No functional changes needed as the code already used `user_id` and `provider` for operations

**File: `src/types/database.types.ts`**
- Removed `id` field from `connected_accounts` Row, Insert, and Update types
- Made `user_id` required (not nullable) since it's now part of the primary key

## Benefits

1. **Multiple Providers per User**: Users can now connect multiple social accounts (GitHub, Twitter, Reddit, etc.)

2. **Proper UPSERT Behavior**: 
   ```sql
   INSERT INTO connected_accounts (user_id, provider, access_token)
   VALUES ('user-123', 'github', 'token')
   ON CONFLICT (user_id, provider) 
   DO UPDATE SET access_token = EXCLUDED.access_token;
   ```

3. **Data Integrity**: The composite primary key ensures no duplicate (user_id, provider) combinations

4. **Simplified Schema**: No need for a separate UUID `id` column

## Testing

### Automated Test Script

Run the test script to verify the migration works correctly:

```sql
-- Execute the test script in your SQL editor or psql
-- File: supabase/test_composite_pk_migration.sql
```

### Manual Testing Steps

1. **Reset and apply migration:**
   ```bash
   npx supabase db reset
   npx supabase db push
   ```

2. **Test multiple account connections:**
   - Connect a GitHub account for a user
   - Connect a Twitter account for the same user
   - Verify both accounts persist without conflict

3. **Test UPSERT behavior:**
   - Reconnect the same provider (e.g., GitHub)
   - Verify it updates the existing record instead of creating a duplicate

### Expected Results

- ✅ Users can connect multiple providers (GitHub, Twitter, Reddit, Stack)
- ✅ Each (user_id, provider) combination is unique
- ✅ UPSERT operations work correctly
- ✅ No data loss during migration
- ✅ Application continues to function normally

## Rollback Plan

If needed, the migration can be rolled back with:

```sql
-- Add back the id column
ALTER TABLE connected_accounts ADD COLUMN id UUID DEFAULT uuid_generate_v4();

-- Drop composite primary key
ALTER TABLE connected_accounts DROP CONSTRAINT connected_accounts_pkey;

-- Add back the original primary key
ALTER TABLE connected_accounts ADD CONSTRAINT connected_accounts_pkey PRIMARY KEY (id);

-- Add back the unique constraint
ALTER TABLE connected_accounts ADD CONSTRAINT connected_accounts_user_provider_unique UNIQUE (user_id, provider);
```

## Impact Assessment

### Breaking Changes
- ❌ **None**: The application code already used `(user_id, provider)` for all operations
- ❌ **None**: No external APIs or integrations affected

### Non-Breaking Changes
- ✅ **Database Schema**: More efficient primary key structure
- ✅ **Performance**: Slightly better query performance (no UUID lookups)
- ✅ **Data Integrity**: Better constraint enforcement

## Verification Checklist

After migration, verify:

- [ ] Migration runs without errors
- [ ] Test script passes all assertions
- [ ] Users can connect multiple providers
- [ ] OAuth flow continues to work
- [ ] UPSERT operations behave correctly
- [ ] No duplicate accounts created
- [ ] Application loads without TypeScript errors 