-- Complete Telegram → Bookmarks Merge Migration
-- Date: 2025-01-07
-- Purpose: Ensure all schema requirements are met for Telegram messages to sync to bookmarks table

-- Step 1: Add telegram to source_enum if not already present
DO $$ 
BEGIN
    -- Check if source_enum exists, if not create it
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'source_enum') THEN
        CREATE TYPE source_enum AS ENUM ('github_starred', 'twitter_bookmarks', 'reddit_saved', 'stack_bookmarks');
        RAISE NOTICE 'Created source_enum type';
    END IF;
    
    -- Add telegram to existing source_enum if not already present
    BEGIN
        ALTER TYPE source_enum ADD VALUE 'telegram';
        RAISE NOTICE 'Added telegram to source_enum';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE 'telegram already exists in source_enum';
    END;
END $$;

-- Step 2: Ensure bookmarks table has all required columns
DO $$ 
BEGIN
    -- Make url column nullable (Telegram messages don't have URLs)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'url' 
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE bookmarks ALTER COLUMN url DROP NOT NULL;
        RAISE NOTICE 'Made bookmarks.url nullable';
    ELSE
        RAISE NOTICE 'bookmarks.url is already nullable or does not exist';
    END IF;
    
    -- Add provider_item_id column if not exists (for telegram message IDs)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'provider_item_id'
    ) THEN
        ALTER TABLE bookmarks ADD COLUMN provider_item_id BIGINT;
        RAISE NOTICE 'Added provider_item_id column to bookmarks';
    ELSE
        RAISE NOTICE 'provider_item_id column already exists in bookmarks';
    END IF;
    
    -- Add metadata column if not exists (for image URLs and other data)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'metadata'
    ) THEN
        ALTER TABLE bookmarks ADD COLUMN metadata JSONB;
        RAISE NOTICE 'Added metadata column to bookmarks';
    ELSE
        RAISE NOTICE 'metadata column already exists in bookmarks';
    END IF;
    
    -- Update source column to use source_enum if it's still using provider_type
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'source' 
        AND data_type = 'USER-DEFINED'
        AND udt_name = 'provider_type'
    ) THEN
        -- First, update any existing telegram entries to use the new enum
        UPDATE bookmarks SET source = 'telegram'::text WHERE source::text = 'telegram';
        
        -- Change column type to source_enum
        ALTER TABLE bookmarks ALTER COLUMN source TYPE source_enum USING source::text::source_enum;
        RAISE NOTICE 'Updated bookmarks.source to use source_enum';
    ELSE
        RAISE NOTICE 'bookmarks.source already uses correct type or does not exist';
    END IF;
END $$;

-- Step 3: Create indexes for performance and conflict resolution
DO $$ 
BEGIN
    -- Create unique index for conflict resolution using provider_item_id
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'bookmarks' 
        AND indexname = 'uniq_bookmarks_user_src_item'
    ) THEN
        CREATE UNIQUE INDEX uniq_bookmarks_user_src_item 
        ON bookmarks(user_id, source, provider_item_id)
        WHERE provider_item_id IS NOT NULL;
        RAISE NOTICE 'Created unique index for telegram message deduplication';
    ELSE
        RAISE NOTICE 'Unique index for deduplication already exists';
    END IF;
    
    -- Create metadata index for performance
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'bookmarks' 
        AND indexname = 'idx_bookmarks_metadata'
    ) THEN
        CREATE INDEX idx_bookmarks_metadata ON bookmarks USING GIN (metadata);
        RAISE NOTICE 'Created metadata GIN index for bookmarks';
    ELSE
        RAISE NOTICE 'Metadata index already exists';
    END IF;
    
    -- Create index for telegram messages specifically
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'bookmarks' 
        AND indexname = 'idx_bookmarks_telegram'
    ) THEN
        CREATE INDEX idx_bookmarks_telegram ON bookmarks(user_id, created_at DESC) 
        WHERE source = 'telegram';
        RAISE NOTICE 'Created telegram-specific index for bookmarks';
    ELSE
        RAISE NOTICE 'Telegram-specific index already exists';
    END IF;
END $$;

-- Step 4: Add comments for documentation
COMMENT ON COLUMN bookmarks.provider_item_id IS 'Provider-specific item ID (e.g., telegram message ID, github star ID)';
COMMENT ON COLUMN bookmarks.metadata IS 'JSON metadata including engagement metrics, image URLs, and provider-specific data';
COMMENT ON INDEX uniq_bookmarks_user_src_item IS 'Ensures unique telegram messages per user in bookmarks table';

-- Step 5: Verify the schema is ready for Telegram messages
DO $$
DECLARE
    schema_ready BOOLEAN := TRUE;
    missing_items TEXT := '';
BEGIN
    -- Check if telegram is in source_enum
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum e 
        JOIN pg_type t ON e.enumtypid = t.oid 
        WHERE t.typname = 'source_enum' 
        AND e.enumlabel = 'telegram'
    ) THEN
        schema_ready := FALSE;
        missing_items := missing_items || 'telegram not in source_enum; ';
    END IF;
    
    -- Check if url is nullable
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'url' 
        AND is_nullable = 'NO'
    ) THEN
        schema_ready := FALSE;
        missing_items := missing_items || 'url not nullable; ';
    END IF;
    
    -- Check if provider_item_id exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'provider_item_id'
    ) THEN
        schema_ready := FALSE;
        missing_items := missing_items || 'provider_item_id missing; ';
    END IF;
    
    -- Check if metadata exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookmarks' 
        AND column_name = 'metadata'
    ) THEN
        schema_ready := FALSE;
        missing_items := missing_items || 'metadata missing; ';
    END IF;
    
    -- Check if unique index exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'bookmarks' 
        AND indexname = 'uniq_bookmarks_user_src_item'
    ) THEN
        schema_ready := FALSE;
        missing_items := missing_items || 'unique index missing; ';
    END IF;
    
    IF schema_ready THEN
        RAISE NOTICE '✅ Schema is ready for Telegram → Bookmarks merge';
        RAISE NOTICE 'You can now:';
        RAISE NOTICE '1. Sync Telegram messages via edge function';
        RAISE NOTICE '2. Use n8n to send messages directly to bookmarks table';
        RAISE NOTICE '3. Migrate existing telegram_messages to bookmarks';
    ELSE
        RAISE WARNING '❌ Schema is NOT ready. Missing: %', missing_items;
    END IF;
END $$;

-- Step 6: Show current schema status
SELECT 
    'Schema Verification' as status,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'bookmarks' 
    AND column_name IN ('url', 'provider_item_id', 'metadata', 'source')
ORDER BY column_name;

-- Step 7: Show available source enum values
SELECT 
    'Available Source Values' as status,
    enumlabel as source_value
FROM pg_enum e 
JOIN pg_type t ON e.enumtypid = t.oid 
WHERE t.typname = 'source_enum'
ORDER BY enumlabel; 