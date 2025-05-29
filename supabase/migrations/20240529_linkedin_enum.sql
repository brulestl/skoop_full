-- Create provider_enum if it doesn't exist (based on existing provider_type)
DO $$ BEGIN
    CREATE TYPE provider_enum AS ENUM ('github', 'twitter', 'reddit', 'stack');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create source_enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE source_enum AS ENUM ('github_starred', 'twitter_bookmarks', 'reddit_saved', 'stack_bookmarks');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add LinkedIn values to the enums
ALTER TYPE provider_enum ADD VALUE IF NOT EXISTS 'linkedin';
ALTER TYPE source_enum ADD VALUE IF NOT EXISTS 'linkedin_saved'; 