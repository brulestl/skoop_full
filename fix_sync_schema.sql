-- Quick fix to ensure bookmarks table has all required columns for sync
-- Run this in your Supabase SQL Editor

-- Add sync_type column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks' AND column_name = 'sync_type') THEN
        ALTER TABLE public.bookmarks ADD COLUMN sync_type TEXT DEFAULT 'manual' CHECK (sync_type IN ('manual', 'automatic', 'initial'));
        CREATE INDEX IF NOT EXISTS idx_bookmarks_sync_type ON public.bookmarks(sync_type);
    END IF;
END $$;

-- Add source column if it doesn't exist (should already be there)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks' AND column_name = 'source') THEN
        ALTER TABLE public.bookmarks ADD COLUMN source TEXT;
        CREATE INDEX IF NOT EXISTS idx_bookmarks_source ON public.bookmarks(source);
    END IF;
END $$;

-- Create a unique constraint on user_id + url if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'bookmarks_user_url_unique' 
        AND table_name = 'bookmarks'
    ) THEN
        ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_user_url_unique UNIQUE (user_id, url);
    END IF;
END $$;

-- Check current bookmarks count
SELECT 
    COUNT(*) as total_bookmarks,
    COUNT(CASE WHEN source = 'github' THEN 1 END) as github_bookmarks,
    STRING_AGG(DISTINCT source::text, ', ') as sources_present
FROM public.bookmarks;

-- Show schema to verify columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookmarks' 
AND table_schema = 'public'
ORDER BY ordinal_position; 