-- User Settings Table for sync preferences
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sync_schedule TEXT NOT NULL DEFAULT 'manual' CHECK (sync_schedule IN ('15min', 'hourly', 'daily', 'manual')),
    enabled_providers TEXT[] DEFAULT '{"github"}',
    notifications_enabled BOOLEAN DEFAULT true,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Sync History Table to track sync operations
CREATE TABLE IF NOT EXISTS public.sync_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    sync_type TEXT NOT NULL DEFAULT 'manual' CHECK (sync_type IN ('manual', 'automatic', 'initial')),
    status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
    items_synced INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings" ON public.user_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON public.user_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings" ON public.user_settings
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for sync_history
ALTER TABLE public.sync_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sync history" ON public.sync_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sync history" ON public.sync_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to create default settings for new users
CREATE OR REPLACE FUNCTION public.create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create settings when user profile is created
CREATE OR REPLACE TRIGGER create_user_settings_trigger
    AFTER INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_user_settings();

-- Update bookmarks table to add sync_type if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks' AND column_name = 'sync_type') THEN
        ALTER TABLE public.bookmarks ADD COLUMN sync_type TEXT DEFAULT 'manual' CHECK (sync_type IN ('manual', 'automatic', 'initial'));
    END IF;
END $$;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_history_user_provider ON public.sync_history(user_id, provider);
CREATE INDEX IF NOT EXISTS idx_sync_history_created_at ON public.sync_history(created_at); 