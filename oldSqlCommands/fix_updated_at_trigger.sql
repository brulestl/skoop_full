-- Fix the updated_at trigger function for user_settings table
-- The existing function expects 'updated_at' but our column is 'last_updated'

-- Drop the existing trigger first
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON public.user_settings;

-- Create a new trigger function specifically for user_settings
CREATE OR REPLACE FUNCTION update_user_settings_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger with the correct function
CREATE TRIGGER update_user_settings_last_updated
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_user_settings_last_updated();

-- Test the fix by creating default settings for your user
INSERT INTO public.user_settings (user_id)
VALUES ('b108adb4-f86f-4196-a389-f3c5395dc1a2')
ON CONFLICT (user_id) DO NOTHING;

-- Verify your user now has settings
SELECT 'Your current settings:' as message;
SELECT 
    user_id,
    sync_schedule,
    background_sync_enabled,
    aggressive_prefetch_enabled,
    data_saving_mode_enabled,
    notifications_enabled,
    created_at,
    last_updated
FROM public.user_settings 
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

-- Test updating a setting (this should now work with the fixed trigger)
UPDATE public.user_settings 
SET background_sync_enabled = NOT background_sync_enabled
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

-- Show the updated setting with new last_updated timestamp
SELECT 'After toggle test (trigger should update last_updated):' as message;
SELECT 
    background_sync_enabled,
    last_updated
FROM public.user_settings 
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

SELECT '🎉 T3.2 trigger fixed and ready for UI testing!' as final_status; 