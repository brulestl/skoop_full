-- T3.2: Create user_settings table for persistent settings
-- This migration creates the user_settings table with all necessary columns

-- Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
    
    -- Sync Settings
    sync_schedule TEXT DEFAULT 'manual' CHECK (sync_schedule IN ('15min', 'hourly', 'daily', 'manual')),
    enabled_providers TEXT[] DEFAULT ARRAY['github'],
    
    -- Embedding Model Settings
    embedding_model TEXT DEFAULT 'openai-text-embedding-3',
    vector_dimensions INTEGER DEFAULT 1536,
    re_embedding_schedule TEXT DEFAULT 'never' CHECK (re_embedding_schedule IN ('never', 'weekly', 'monthly', 'quarterly')),
    document_chunking_enabled BOOLEAN DEFAULT true,
    
    -- AI Model Settings
    ai_model TEXT DEFAULT 'claude-bedrock',
    smart_search_enabled BOOLEAN DEFAULT true,
    
    -- Performance Settings
    cache_size_mb INTEGER DEFAULT 50,
    cache_duration TEXT DEFAULT '1week' CHECK (cache_duration IN ('1day', '1week', '1month', 'never')),
    background_sync_enabled BOOLEAN DEFAULT true,
    aggressive_prefetch_enabled BOOLEAN DEFAULT false,
    data_saving_mode_enabled BOOLEAN DEFAULT false,
    
    -- Notification Settings
    notifications_enabled BOOLEAN DEFAULT true,
    sync_completed_notifications BOOLEAN DEFAULT true,
    new_content_recommendations BOOLEAN DEFAULT false,
    email_notifications_enabled BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_settings
CREATE POLICY "user_select_own_settings" ON public.user_settings
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "user_insert_own_settings" ON public.user_settings
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_update_own_settings" ON public.user_settings
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_delete_own_settings" ON public.user_settings
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to create default user settings
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert default settings for new user
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail the user creation
        RAISE WARNING 'Failed to create default user settings for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create settings for new users
CREATE TRIGGER create_user_settings_trigger
    AFTER INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_user_settings();

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);

-- Verify table creation
SELECT 'user_settings table created successfully' as status; 