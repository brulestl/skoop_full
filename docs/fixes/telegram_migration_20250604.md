# Telegram Migration Fix - June 4, 2025

## Problem
Edge Function `ingest_telegram_saved` was crashing with 500 errors because the `connected_accounts.telegram_session_string` column did not exist in the production database.

## Root Cause
The `telegram_session_string` column was referenced in the function code but never added to the database schema via a proper migration.

## Solution
Created migration `20250604_add_telegram_session_string.sql` to:

1. **Add Column**: `telegram_session_string TEXT` to `public.connected_accounts`
2. **Add Index**: Optimized index for fast lookups when `provider = 'telegram'`

## Migration Details
```sql
-- Add column for MTProto session
ALTER TABLE public.connected_accounts
  ADD COLUMN IF NOT EXISTS telegram_session_string TEXT;

-- Index for fast look-ups when provider = telegram
CREATE INDEX IF NOT EXISTS idx_connected_accounts_telegram_session
  ON public.connected_accounts (user_id)
  WHERE provider = 'telegram' AND telegram_session_string IS NOT NULL;
```

## Testing
After deployment, verify in Supabase SQL editor:
```sql
select telegram_session_string
from connected_accounts
limit 1;
```

## Impact
- ✅ Fixes 500 errors in Telegram sync functionality
- ✅ Enables proper storage of Telegram MTProto sessions
- ✅ Optimized for fast lookups via partial index

## Status
- [x] Migration file created
- [x] Code committed to repository
- [ ] Migration applied to production database
- [ ] Verification test completed 