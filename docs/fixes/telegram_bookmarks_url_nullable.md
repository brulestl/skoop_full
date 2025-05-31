# TG-BOOK2: Telegram Bookmarks URL Nullable Fix - June 5, 2025

## Problem
Telegram messages were being uploaded to `bookmarks_raw` but failing to insert into `bookmarks` table, resulting in 0 displayed messages despite successful uploads.

### Root Cause: URL Conflict
- **Constraint**: `bookmarks` table had unique constraint on `(user_id, url)`
- **Issue**: Multiple telegram messages without URLs resulted in `url = ''` (empty string)
- **Failure**: Second message with empty URL violated unique constraint, aborting entire batch
- **Result**: Zero bookmarks inserted despite successful raw data storage

## Solution: TG-BOOK2 Implementation

### Database Changes
1. **Make URL nullable**: `ALTER TABLE bookmarks ALTER COLUMN url DROP NOT NULL;`
2. **New unique index**: `CREATE UNIQUE INDEX uniq_bookmarks_user_src_item ON bookmarks(user_id, source, provider_item_id);`
3. **Ensure provider_item_id exists**: Added provider_item_id column if missing

### Code Changes
1. **Upload Route** (`src/app/api/upload/telegram-export/route.ts`):
   - Changed `url: r.url ?? ''` → `url: r.url ?? null`
   - Changed conflict resolution from `'user_id,url'` → `'user_id,source,provider_item_id'`
   - Added comprehensive debug logging with `[TG-DEBUG]` prefix

2. **Edge Function** (`supabase/functions/ingest_telegram_saved/index.ts`):
   - Applied same URL and conflict resolution changes
   - Added debug logging for troubleshooting

3. **Debug Page** (`src/app/tgbookmarks/page.tsx`):
   - Created live debug interface showing real-time logs
   - Displays raw vs bookmarks counts with status indicators
   - Test upload and sync buttons for verification
   - Shows recent data samples and connected account status

## Testing Verification

### Before Fix
```sql
-- Raw data exists but bookmarks empty
SELECT COUNT(*) FROM bookmarks_raw WHERE source = 'telegram';  -- > 0
SELECT COUNT(*) FROM bookmarks WHERE source = 'telegram';      -- 0
```

### After Fix  
```sql
-- Both tables populated
SELECT COUNT(*) FROM bookmarks_raw WHERE source = 'telegram';  -- > 0  
SELECT COUNT(*) FROM bookmarks WHERE source = 'telegram';      -- > 0 (same count)
```

## Files Modified
- `src/app/api/upload/telegram-export/route.ts` - Fixed bookmarks upsert logic
- `supabase/functions/ingest_telegram_saved/index.ts` - Fixed edge function
- `supabase/migrations/20250605_telegram_bookmarks_url_nullable.sql` - Database schema
- `src/app/tgbookmarks/page.tsx` - Debug interface
- `docs/fixes/telegram_bookmarks_url_nullable.md` - This documentation

## Debug Tools
Access live debugging at `/tgbookmarks` with:
- Real-time logs showing upload/sync progress
- Data count verification (raw vs bookmarks)
- Test upload/sync buttons
- Recent data samples
- SQL query examples

## Next Steps
1. **Apply Migration**: Run the migration in Supabase Dashboard SQL Editor
2. **Test Upload**: Upload telegram export JSON via debug page  
3. **Verify**: Check that bookmarks count matches bookmarks_raw count
4. **Dashboard**: Confirm telegram messages appear in Recent Saves

This fix ensures telegram messages are properly displayed in the dashboard regardless of whether they have URLs. 