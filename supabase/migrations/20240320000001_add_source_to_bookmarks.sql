-- Add source column to bookmarks table to track provider origin
ALTER TABLE public.bookmarks ADD COLUMN source provider_type;
 
-- Add index for faster provider-based queries
CREATE INDEX idx_bookmarks_source ON public.bookmarks(source);
CREATE INDEX idx_bookmarks_user_source ON public.bookmarks(user_id, source); 