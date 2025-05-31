-- Add incremental sync tracking columns to connected_accounts
-- This enables telegram MTProto sync to track the last synced message ID

-- Add last_sync_message_id column for tracking incremental sync
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'connected_accounts' 
        AND column_name = 'last_sync_message_id'
    ) THEN
        ALTER TABLE public.connected_accounts 
        ADD COLUMN last_sync_message_id BIGINT DEFAULT 0;
        
        RAISE NOTICE 'Added last_sync_message_id column to connected_accounts';
    ELSE
        RAISE NOTICE 'last_sync_message_id column already exists';
    END IF;
END $$;

-- Add last_sync_at column for tracking when last sync occurred
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'connected_accounts' 
        AND column_name = 'last_sync_at'
    ) THEN
        ALTER TABLE public.connected_accounts 
        ADD COLUMN last_sync_at TIMESTAMP WITH TIME ZONE;
        
        RAISE NOTICE 'Added last_sync_at column to connected_accounts';
    ELSE
        RAISE NOTICE 'last_sync_at column already exists';
    END IF;
END $$;

-- Add index for efficient lookups by provider and sync time
CREATE INDEX IF NOT EXISTS idx_connected_accounts_provider_sync 
ON public.connected_accounts(provider, last_sync_at) 
WHERE last_sync_at IS NOT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.connected_accounts.last_sync_message_id IS 'Highest message ID synced for incremental telegram sync (prevents duplicates)';
COMMENT ON COLUMN public.connected_accounts.last_sync_at IS 'Timestamp of last successful sync operation';

-- Verify the columns were added
DO $$
DECLARE
    col_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO col_count
    FROM information_schema.columns 
    WHERE table_name = 'connected_accounts' 
    AND column_name IN ('last_sync_message_id', 'last_sync_at');
    
    IF col_count = 2 THEN
        RAISE NOTICE '✅ Successfully added incremental sync columns to connected_accounts';
    ELSE
        RAISE NOTICE '⚠️  Only % of 2 columns added', col_count;
    END IF;
END $$; 