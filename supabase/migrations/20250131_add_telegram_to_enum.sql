-- Add telegram to provider_type enum
-- This fixes the error: invalid input value for enum provider_type: "telegram"

DO $$ 
BEGIN
    -- Add telegram to existing provider_type enum if not already present
    BEGIN
        ALTER TYPE provider_type ADD VALUE 'telegram';
        RAISE NOTICE 'Added telegram to provider_type enum';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE 'telegram already exists in provider_type enum';
    END;
END $$;

-- Verify the enum now includes telegram
SELECT 'telegram'::provider_type as telegram_enum_test; 