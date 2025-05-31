-- Migration: Add Telegram Message Fields to bookmarks_raw
-- This migration adds the missing columns for proper telegram message storage and indexing

-- Add provider_item_id column if not exists (for telegram message ID as int64)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks_raw' AND column_name = 'provider_item_id') THEN
        ALTER TABLE public.bookmarks_raw ADD COLUMN provider_item_id BIGINT;
        RAISE NOTICE 'Added provider_item_id column to bookmarks_raw';
    ELSE
        RAISE NOTICE 'provider_item_id column already exists in bookmarks_raw';
    END IF;
END $$;

-- Add text column if not exists (for message text/caption)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks_raw' AND column_name = 'text') THEN
        ALTER TABLE public.bookmarks_raw ADD COLUMN text TEXT;
        RAISE NOTICE 'Added text column to bookmarks_raw';
    ELSE
        RAISE NOTICE 'text column already exists in bookmarks_raw';
    END IF;
END $$;

-- Add url column if not exists (for extracted URLs)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks_raw' AND column_name = 'url') THEN
        ALTER TABLE public.bookmarks_raw ADD COLUMN url TEXT;
        RAISE NOTICE 'Added url column to bookmarks_raw';
    ELSE
        RAISE NOTICE 'url column already exists in bookmarks_raw';
    END IF;
END $$;

-- Add created_at column if not exists (for message timestamp)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks_raw' AND column_name = 'created_at') THEN
        ALTER TABLE public.bookmarks_raw ADD COLUMN created_at TIMESTAMPTZ;
        RAISE NOTICE 'Added created_at column to bookmarks_raw';
    ELSE
        RAISE NOTICE 'created_at column already exists in bookmarks_raw';
    END IF;
END $$;

-- Create unique index for telegram messages to handle conflicts
-- This supports the onConflict clause in the batch insert
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes 
                   WHERE tablename = 'bookmarks_raw' 
                   AND indexname = 'idx_bookmarks_raw_user_source_provider_item') THEN
        CREATE UNIQUE INDEX idx_bookmarks_raw_user_source_provider_item 
        ON public.bookmarks_raw(user_id, source, provider_item_id) 
        WHERE provider_item_id IS NOT NULL;
        RAISE NOTICE 'Created unique index for telegram message conflicts';
    ELSE
        RAISE NOTICE 'Unique index already exists';
    END IF;
END $$;

-- Create index for text search on telegram messages
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes 
                   WHERE tablename = 'bookmarks_raw' 
                   AND indexname = 'idx_bookmarks_raw_text_search') THEN
        CREATE INDEX idx_bookmarks_raw_text_search 
        ON public.bookmarks_raw USING GIN(to_tsvector('english', text)) 
        WHERE text IS NOT NULL;
        RAISE NOTICE 'Created text search index for bookmarks_raw';
    ELSE
        RAISE NOTICE 'Text search index already exists';
    END IF;
END $$;

-- Create index for URL extraction
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes 
                   WHERE tablename = 'bookmarks_raw' 
                   AND indexname = 'idx_bookmarks_raw_url') THEN
        CREATE INDEX idx_bookmarks_raw_url 
        ON public.bookmarks_raw(url) 
        WHERE url IS NOT NULL;
        RAISE NOTICE 'Created URL index for bookmarks_raw';
    ELSE
        RAISE NOTICE 'URL index already exists';
    END IF;
END $$;

-- Create index for created_at (message timestamp)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes 
                   WHERE tablename = 'bookmarks_raw' 
                   AND indexname = 'idx_bookmarks_raw_created_at') THEN
        CREATE INDEX idx_bookmarks_raw_created_at 
        ON public.bookmarks_raw(created_at DESC) 
        WHERE created_at IS NOT NULL;
        RAISE NOTICE 'Created created_at index for bookmarks_raw';
    ELSE
        RAISE NOTICE 'created_at index already exists';
    END IF;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN public.bookmarks_raw.provider_item_id IS 'Provider-specific item ID (e.g., telegram message ID, github star ID)';
COMMENT ON COLUMN public.bookmarks_raw.text IS 'Extracted text content from the item (message text, tweet text, etc.)';
COMMENT ON COLUMN public.bookmarks_raw.url IS 'Extracted URL from the item (webpage URL, media URL, etc.)';
COMMENT ON COLUMN public.bookmarks_raw.created_at IS 'Original creation timestamp of the item (message date, star date, etc.)';

-- Verify the schema
SELECT 
    'Schema verification' as status,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'bookmarks_raw' 
    AND column_name IN ('provider_item_id', 'text', 'url', 'created_at')
ORDER BY column_name; 