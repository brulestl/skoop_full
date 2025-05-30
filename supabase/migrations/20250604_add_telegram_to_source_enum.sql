-- Add telegram to source_enum for bookmarks table
-- This ensures telegram bookmarks can be stored with proper source value

DO $$ 
BEGIN
    -- Add telegram to existing source_enum if not already present
    BEGIN
        ALTER TYPE source_enum ADD VALUE 'telegram';
        RAISE NOTICE 'Added telegram to source_enum';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE 'telegram already exists in source_enum';
    END;
END $$;

-- Note: New enum values must be committed before they can be used in queries
-- To verify this worked, run this in a separate query after the migration:
-- SELECT 'telegram'::source_enum; 