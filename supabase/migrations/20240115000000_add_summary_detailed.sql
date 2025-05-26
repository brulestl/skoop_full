-- Add detailed summary column to bookmarks table
ALTER TABLE bookmarks ADD COLUMN IF NOT EXISTS summary_detailed TEXT;

-- Add index for better performance on summary queries
CREATE INDEX IF NOT EXISTS idx_bookmarks_summary_detailed ON bookmarks(id) WHERE summary_detailed IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN bookmarks.summary_detailed IS 'Detailed AI-generated summary with full context from source APIs'; 