-- TG-BOOK2: Make bookmarks.url nullable and add unique index for telegram bookmarks
-- This allows telegram messages without URLs to be stored properly

-- Step 1: Make url column nullable
ALTER TABLE bookmarks ALTER COLUMN url DROP NOT NULL;

-- Step 2: Create unique index for conflict resolution using provider_item_id
-- This prevents duplicate telegram messages from the same user
-- Note: provider_item_id column should be added via separate migration first
CREATE UNIQUE INDEX IF NOT EXISTS uniq_bookmarks_user_src_item 
ON bookmarks(user_id, source, provider_item_id); 