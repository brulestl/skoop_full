-- Telegram OAuth Integration Migration
-- Adds Telegram as a provider option for OAuth-based connections

-- Add telegram to provider_type enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'provider_type') THEN
        -- If enum doesn't exist, create it
        CREATE TYPE provider_type AS ENUM ('github', 'twitter', 'linkedin', 'facebook', 'telegram');
    ELSE
        -- Add telegram to existing enum if not already present
        BEGIN
            ALTER TYPE provider_type ADD VALUE 'telegram';
        EXCEPTION
            WHEN duplicate_object THEN
                -- Value already exists, do nothing
                NULL;
        END;
    END IF;
END $$;

-- Ensure connected_accounts table has all necessary columns for Telegram OAuth
ALTER TABLE connected_accounts 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Add index for faster provider lookups
CREATE INDEX IF NOT EXISTS idx_connected_accounts_provider 
ON connected_accounts(user_id, provider);

-- Add index for Telegram user ID lookups
CREATE INDEX IF NOT EXISTS idx_connected_accounts_telegram_user_id 
ON connected_accounts(provider_user_id) 
WHERE provider = 'telegram'; 