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

-- Note: New enum values must be committed before they can be used in queries
-- To verify this worked, run this in a separate query after the migration:
-- SELECT 'telegram'::provider_type; 