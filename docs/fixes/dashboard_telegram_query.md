# Dashboard Telegram Query Fix - June 4, 2025

## Problem
Dashboard was not showing Telegram bookmarks because:
1. `source_enum` didn't include `'telegram'` value (only had `'telegram_saved'` in docs)
2. Default `providerFilters` was empty Set, requiring manual filter selection
3. Small page size (10) could truncate first sync results

## Root Cause Analysis

### Issue 1: Database Schema Gap
- **Problem**: Ingest function stores `source: 'telegram'` but `source_enum` didn't include `'telegram'`
- **Evidence**: Migration `20250131_add_telegram_to_enum.sql` only added to `provider_type`, not `source_enum`
- **Impact**: Database constraint violations or missing data

### Issue 2: Dashboard Filter Logic
- **Problem**: `providerFilters` initialized as empty Set `new Set()`
- **Logic**: When empty, `useBookmarks` calls `.in('source', [])` with empty array
- **Expected**: Empty array should show ALL sources, but needs proper enum support
- **Impact**: No telegram bookmarks displayed even if synced

### Issue 3: Page Size Limitation
- **Problem**: PAGE_SIZE = 10 could truncate first telegram sync
- **Impact**: User might sync 15 messages but only see 10, missing telegram results

## Solutions Implemented

### 1. Database Schema Fix ✅
**File**: `supabase/migrations/20250604_add_telegram_to_source_enum.sql`

```sql
-- Add telegram to source_enum for bookmarks table
DO $$ 
BEGIN
    BEGIN
        ALTER TYPE source_enum ADD VALUE 'telegram';
        RAISE NOTICE 'Added telegram to source_enum';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE 'telegram already exists in source_enum';
    END;
END $$;
```

**Result**: Database now accepts `source: 'telegram'` values

### 2. Dashboard Default Filters ✅
**File**: `src/components/dashboard/recent-saves.tsx`

**Before**:
```typescript
const [providerFilters, setProviderFilters] = useState<Set<string>>(new Set());
// Later...
const availableProviders = ['github', 'twitter', 'reddit', 'stackoverflow', 'telegram'];
```

**After**:
```typescript
// Default providerFilters to include all available providers including telegram
const availableProviders = ['github', 'twitter', 'reddit', 'stackoverflow', 'telegram'];
const [providerFilters, setProviderFilters] = useState<Set<string>>(new Set(availableProviders));
```

**Result**: Dashboard shows ALL provider types by default, including telegram

### 3. Page Size Increase ✅
**File**: `src/hooks/useBookmarks.ts`

**Before**:
```typescript
const PAGE_SIZE = 10;
```

**After**:
```typescript
const PAGE_SIZE = 20; // Increased from 10 to show more bookmarks including telegram
```

**Result**: More bookmarks loaded per page, reducing truncation risk

## Query Flow Verification

### Before Fix
```typescript
// Dashboard state
providerFilters = new Set() // Empty

// useBookmarks call
useBookmarks({
  providers: Array.from(providerFilters) // []
})

// Database query
.select('*')
.eq('user_id', userId)
.order('created_at', { ascending: false })
// No .in('source', []) filter applied when empty
.range(0, 9) // PAGE_SIZE = 10
```

### After Fix
```typescript
// Dashboard state  
providerFilters = new Set(['github', 'twitter', 'reddit', 'stackoverflow', 'telegram'])

// useBookmarks call
useBookmarks({
  providers: ['github', 'twitter', 'reddit', 'stackoverflow', 'telegram']
})

// Database query
.select('*')
.eq('user_id', userId)
.order('created_at', { ascending: false })
.in('source', ['github', 'twitter', 'reddit', 'stackoverflow', 'telegram']) // Explicit filter
.range(0, 19) // PAGE_SIZE = 20
```

## Testing Steps

### 1. Apply Migration
```bash
npx supabase db push
```

### 2. Verify Enum
```sql
SELECT 'telegram'::source_enum; -- Should work without error
```

### 3. Test Dashboard
1. **Start dev server**: `npm run dev`
2. **Check filters**: All provider checkboxes should be selected by default
3. **Sync telegram**: Use sync button to fetch real messages
4. **Verify display**: Telegram bookmarks should appear immediately in dashboard

### 4. Database Verification
```sql
-- Check telegram bookmarks exist
SELECT COUNT(*) FROM bookmarks WHERE source = 'telegram';

-- Check recent telegram bookmarks
SELECT title, source, created_at 
FROM bookmarks 
WHERE source = 'telegram' 
ORDER BY created_at DESC 
LIMIT 5;
```

## Expected Behavior

### Before Sync
- Dashboard shows existing github/twitter/etc bookmarks
- All provider filters enabled by default (including telegram checkbox)
- No telegram bookmarks visible

### After Telegram Sync
- Dashboard immediately shows telegram bookmarks mixed with others
- Sorted by `created_at DESC` (most recent first)
- Telegram bookmarks have Send icon and "telegram" source label
- Up to 20 bookmarks per page (increased from 10)

### Filter Behavior
- **All selected** (default): Shows all bookmark types including telegram
- **Only telegram selected**: Shows only telegram bookmarks
- **Telegram unselected**: Hides telegram bookmarks

## Files Modified

1. **`supabase/migrations/20250604_add_telegram_to_source_enum.sql`** - Schema fix
2. **`src/components/dashboard/recent-saves.tsx`** - Default filter fix  
3. **`src/hooks/useBookmarks.ts`** - Page size increase
4. **`docs/fixes/dashboard_telegram_query.md`** - This documentation

## Verification Commands

```bash
# 1. Apply migration
npx supabase db push

# 2. Check enum works
npx supabase db-sql "SELECT 'telegram'::source_enum;"

# 3. Check existing telegram data  
npx supabase db-sql "SELECT COUNT(*) FROM bookmarks WHERE source = 'telegram';"

# 4. Test dashboard
npm run dev
# Navigate to dashboard, check filters are all selected by default
```

## Status
- [x] Database schema supports `source: 'telegram'`
- [x] Dashboard includes telegram in default filters
- [x] Page size increased for better UX
- [x] Documentation created
- [x] Ready for testing with real telegram sync

## Conclusion
The dashboard should now properly display telegram bookmarks alongside other sources by default, with improved pagination and proper database schema support. Users no longer need to manually enable telegram filters to see their synced content. 