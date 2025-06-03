-- Fix sync_history table status constraint
-- This migration ensures the sync_history table accepts the correct status values

-- First, check if sync_history table exists and create it if it doesn't
CREATE TABLE IF NOT EXISTS public.sync_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    provider TEXT NOT NULL,
    sync_type TEXT NOT NULL CHECK (sync_type IN ('manual', 'automatic', 'initial')),
    status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'in_progress')),
    items_synced INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop the old constraint if it exists and has wrong values
DO $$
BEGIN
    -- Check if there's an existing constraint with wrong values
    IF EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'sync_history_status_check' 
        AND check_clause LIKE '%completed%'
    ) THEN
        -- Drop the old constraint
        ALTER TABLE public.sync_history DROP CONSTRAINT IF EXISTS sync_history_status_check;
        RAISE NOTICE 'Dropped old sync_history_status_check constraint with "completed" value';
    END IF;
    
    -- Add the correct constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'sync_history_status_check' 
        AND check_clause LIKE '%success%'
    ) THEN
        ALTER TABLE public.sync_history 
        ADD CONSTRAINT sync_history_status_check 
        CHECK (status IN ('success', 'failed', 'in_progress'));
        RAISE NOTICE 'Added correct sync_history_status_check constraint';
    END IF;
END $$;

-- Update any existing records that have 'completed' status to 'success'
UPDATE public.sync_history 
SET status = 'success' 
WHERE status = 'completed';

-- Enable RLS if not already enabled
ALTER TABLE public.sync_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies if they don't exist
DO $$
BEGIN
    -- Policy for SELECT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sync_history' 
        AND policyname = 'user_select_own_sync_history'
    ) THEN
        CREATE POLICY "user_select_own_sync_history" ON public.sync_history
            FOR SELECT TO authenticated
            USING (user_id = auth.uid());
        RAISE NOTICE 'Created SELECT policy for sync_history';
    END IF;
    
    -- Policy for INSERT
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sync_history' 
        AND policyname = 'user_insert_own_sync_history'
    ) THEN
        CREATE POLICY "user_insert_own_sync_history" ON public.sync_history
            FOR INSERT TO authenticated
            WITH CHECK (user_id = auth.uid());
        RAISE NOTICE 'Created INSERT policy for sync_history';
    END IF;
    
    -- Policy for UPDATE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sync_history' 
        AND policyname = 'user_update_own_sync_history'
    ) THEN
        CREATE POLICY "user_update_own_sync_history" ON public.sync_history
            FOR UPDATE TO authenticated
            USING (user_id = auth.uid());
        RAISE NOTICE 'Created UPDATE policy for sync_history';
    END IF;
    
    -- Policy for DELETE
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'sync_history' 
        AND policyname = 'user_delete_own_sync_history'
    ) THEN
        CREATE POLICY "user_delete_own_sync_history" ON public.sync_history
            FOR DELETE TO authenticated
            USING (user_id = auth.uid());
        RAISE NOTICE 'Created DELETE policy for sync_history';
    END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sync_history_user_id ON public.sync_history(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_history_created_at ON public.sync_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_history_status ON public.sync_history(status);

-- Verify the fix
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.check_constraints 
            WHERE constraint_name = 'sync_history_status_check' 
            AND check_clause LIKE '%success%'
        ) THEN '✅ sync_history constraint fixed - accepts "success" status'
        ELSE '❌ sync_history constraint still needs fixing'
    END as constraint_status;

-- Show current table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'sync_history'
ORDER BY ordinal_position; 