# Twitter OAuth Debug Log

## 8. Schema drift resolved
avatar_url column added – migration 20250528 ✅

### Problem
The callback upsert was failing with:
```
PGRST204 – Could not find the 'avatar_url' column
```

### Root Cause
- Code was inserting `avatar_url` field
- Production database schema was missing the column
- Schema drift between code and database

### Solution
1. **Created migration** `supabase/migrations/20250528_add_avatar_url.sql`
2. **Added column** with proper nullable text type and comment
3. **Deployed to production** via `vercel --prod`
4. **Regenerated types** to sync TypeScript definitions

### Migration Details
```sql
-- Add nullable avatar URL for all providers
alter table public.connected_accounts
  add column if not exists avatar_url text;

comment on column public.connected_accounts.avatar_url
  is 'Full URL to provider profile avatar';
```

### Verification
- ✅ Column exists in production database
- ✅ TypeScript types updated with `avatar_url: string | null`
- ✅ Twitter OAuth upsert should no longer fail with PGRST204 