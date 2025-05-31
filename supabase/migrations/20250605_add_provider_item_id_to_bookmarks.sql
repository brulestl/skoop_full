-- Add provider_item_id column to bookmarks table for telegram message tracking
-- This column was previously added to bookmarks_raw but missing from bookmarks

ALTER TABLE bookmarks ADD COLUMN provider_item_id BIGINT; 