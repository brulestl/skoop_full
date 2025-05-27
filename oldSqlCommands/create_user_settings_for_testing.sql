-- Create default settings for your user and test T3.2 implementation
-- Run this to set up your user for testing

-- Create default settings for your user (if they don't exist)
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
    created_at
FROM public.user_settings 
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

-- Test updating a setting (this simulates what the UI will do)
UPDATE public.user_settings 
SET background_sync_enabled = NOT background_sync_enabled,
    last_updated = NOW()
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

-- Show the updated setting
SELECT 'After toggle test:' as message;
SELECT 
    background_sync_enabled,
    last_updated
FROM public.user_settings 
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

SELECT '🎉 T3.2 is ready for UI testing!' as final_status; 