-- Migration: Add unique index for telegram message deduplication
-- Date: 2025-06-06
-- Purpose: Prevent duplicate telegram messages in bookmarks_raw table

-- Create unique index for deduplication if it doesn't exist
create unique index if not exists uniq_braw_user_src_item
  on public.bookmarks_raw(user_id, source, provider_item_id);

-- Verify connected_accounts has provider_user_id column
-- (This should already exist from previous migrations)
-- If not present, uncomment the line below:
-- alter table public.connected_accounts add column if not exists provider_user_id text;

-- Add comment for documentation
comment on index uniq_braw_user_src_item is 'Ensures unique telegram messages per user in bookmarks_raw table'; 