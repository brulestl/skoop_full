-- Add metadata column to bookmarks table for storing engagement data
ALTER TABLE public.bookmarks ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Create index for metadata queries
CREATE INDEX IF NOT EXISTS idx_bookmarks_metadata ON public.bookmarks USING GIN (metadata);

-- Add comment to explain the metadata column
COMMENT ON COLUMN public.bookmarks.metadata IS 'JSON metadata including engagement metrics like stars, forks, likes, etc.';

-- Example metadata structure:
-- For GitHub: {"stars": 1234, "forks": 56, "language": "TypeScript", "owner": "username"}
-- For Twitter: {"likes": 789, "retweets": 123, "replies": 45}
-- For Reddit: {"upvotes": 456, "comments": 78, "awards": 3}
-- For Stack Overflow: {"votes": 234, "answers": 12, "views": 5678} 