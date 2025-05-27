-- T3.2: Add missing columns to existing user_settings table
-- This migration adds all the missing columns that our useUserSettings hook expects

-- Add missing embedding model settings columns
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS embedding_model TEXT DEFAULT 'openai-text-embedding-3',
ADD COLUMN IF NOT EXISTS vector_dimensions INTEGER DEFAULT 1536,
ADD COLUMN IF NOT EXISTS re_embedding_schedule TEXT DEFAULT 'never' CHECK (re_embedding_schedule IN ('never', 'weekly', 'monthly', 'quarterly')),
ADD COLUMN IF NOT EXISTS document_chunking_enabled BOOLEAN DEFAULT true;

-- Add missing AI model settings columns
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS ai_model TEXT DEFAULT 'claude-bedrock',
ADD COLUMN IF NOT EXISTS smart_search_enabled BOOLEAN DEFAULT true;

-- Add missing performance settings columns
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS cache_size_mb INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS cache_duration TEXT DEFAULT '1week' CHECK (cache_duration IN ('1day', '1week', '1month', 'never')),
ADD COLUMN IF NOT EXISTS background_sync_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS aggressive_prefetch_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS data_saving_mode_enabled BOOLEAN DEFAULT false;

-- Add missing notification settings columns
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS sync_completed_notifications BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS new_content_recommendations BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS email_notifications_enabled BOOLEAN DEFAULT true;

-- Update sync_schedule constraint to include all valid values
DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'user_settings' 
        AND constraint_type = 'CHECK' 
        AND constraint_name LIKE '%sync_schedule%'
    ) THEN
        ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_sync_schedule_check;
    END IF;
    
    -- Add new constraint with all valid values
    ALTER TABLE public.user_settings 
    ADD CONSTRAINT user_settings_sync_schedule_check 
    CHECK (sync_schedule IN ('15min', 'hourly', 'daily', 'manual'));
END $$;

-- Remove the id column since we're using user_id as primary key
-- First check if id column exists and if user_id is already the primary key
DO $$
BEGIN
    -- Check if id column exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' 
        AND column_name = 'id'
    ) THEN
        -- Check if user_id is already primary key
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
            WHERE tc.table_name = 'user_settings' 
            AND tc.constraint_type = 'PRIMARY KEY'
            AND kcu.column_name = 'user_id'
        ) THEN
            -- Drop existing primary key if it exists
            IF EXISTS (
                SELECT 1 FROM information_schema.table_constraints 
                WHERE table_name = 'user_settings' 
                AND constraint_type = 'PRIMARY KEY'
            ) THEN
                ALTER TABLE public.user_settings DROP CONSTRAINT user_settings_pkey;
            END IF;
            
            -- Add user_id as primary key
            ALTER TABLE public.user_settings ADD PRIMARY KEY (user_id);
        END IF;
        
        -- Now drop the id column
        ALTER TABLE public.user_settings DROP COLUMN id;
    END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies if they don't exist
DO $$
BEGIN
    -- SELECT policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_settings' 
        AND policyname = 'user_select_own_settings'
    ) THEN
        CREATE POLICY "user_select_own_settings" ON public.user_settings
            FOR SELECT TO authenticated
            USING (user_id = auth.uid());
    END IF;

    -- INSERT policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_settings' 
        AND policyname = 'user_insert_own_settings'
    ) THEN
        CREATE POLICY "user_insert_own_settings" ON public.user_settings
            FOR INSERT TO authenticated
            WITH CHECK (user_id = auth.uid());
    END IF;

    -- UPDATE policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_settings' 
        AND policyname = 'user_update_own_settings'
    ) THEN
        CREATE POLICY "user_update_own_settings" ON public.user_settings
            FOR UPDATE TO authenticated
            USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());
    END IF;

    -- DELETE policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_settings' 
        AND policyname = 'user_delete_own_settings'
    ) THEN
        CREATE POLICY "user_delete_own_settings" ON public.user_settings
            FOR DELETE TO authenticated
            USING (user_id = auth.uid());
    END IF;
END $$;

-- Create trigger for updated_at if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_user_settings_updated_at'
    ) THEN
        CREATE TRIGGER update_user_settings_updated_at
            BEFORE UPDATE ON public.user_settings
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);

-- Verify the migration
SELECT 'Missing columns added to user_settings table successfully' as status;

-- Show the updated table structure
SELECT 
    column_name,
    data_type,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_settings'
ORDER BY ordinal_position; 