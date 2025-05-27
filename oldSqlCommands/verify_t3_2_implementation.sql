-- T3.2 Implementation Verification Script
-- Run this in Supabase SQL Editor to verify everything is working

SELECT '=== T3.2 VERIFICATION: Settings Toggles Persistence ===' as section;

-- 1. Check if user_settings table exists
SELECT 'Step 1: Checking user_settings table existence' as step;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'user_settings'
        ) 
        THEN '✅ user_settings table exists'
        ELSE '❌ user_settings table missing'
    END as table_status;

-- 2. Check table structure
SELECT 'Step 2: Checking table structure' as step;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_settings'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT 'Step 3: Checking RLS policies' as step;
SELECT 
    policyname,
    cmd,
    CASE 
        WHEN policyname IS NOT NULL THEN '✅ Policy exists'
        ELSE '❌ Policy missing'
    END as policy_status
FROM pg_policies 
WHERE tablename = 'user_settings'
ORDER BY policyname;

-- 4. Check triggers
SELECT 'Step 4: Checking triggers' as step;
SELECT 
    tgname as trigger_name,
    CASE 
        WHEN tgname IS NOT NULL THEN '✅ Trigger exists'
        ELSE '❌ Trigger missing'
    END as trigger_status
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname IN ('user_settings', 'users')
AND tgname IN ('update_user_settings_updated_at', 'create_user_settings_trigger');

-- 5. Test settings creation for your user
SELECT 'Step 5: Testing settings creation' as step;

DO $$
DECLARE
    test_user_id UUID := 'b108adb4-f86f-4196-a389-f3c5395dc1a2'; -- Your user ID
    settings_count INTEGER;
    test_result TEXT;
BEGIN
    -- Check if user already has settings
    SELECT COUNT(*) INTO settings_count 
    FROM public.user_settings 
    WHERE user_id = test_user_id;
    
    IF settings_count = 0 THEN
        -- Try to create default settings
        BEGIN
            INSERT INTO public.user_settings (user_id) VALUES (test_user_id);
            test_result := '✅ Created default settings successfully';
        EXCEPTION
            WHEN OTHERS THEN
                test_result := '❌ Failed to create settings: ' || SQLERRM;
        END;
    ELSE
        test_result := '✅ User already has settings (count: ' || settings_count || ')';
    END IF;
    
    RAISE NOTICE '%', test_result;
END $$;

-- 6. Test settings update
SELECT 'Step 6: Testing settings update' as step;

DO $$
DECLARE
    test_user_id UUID := 'b108adb4-f86f-4196-a389-f3c5395dc1a2'; -- Your user ID
    update_result TEXT;
BEGIN
    -- Try to update a setting
    BEGIN
        UPDATE public.user_settings 
        SET background_sync_enabled = NOT background_sync_enabled,
            last_updated = NOW()
        WHERE user_id = test_user_id;
        
        IF FOUND THEN
            update_result := '✅ Settings update successful';
        ELSE
            update_result := '❌ No settings found to update';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            update_result := '❌ Settings update failed: ' || SQLERRM;
    END;
    
    RAISE NOTICE '%', update_result;
END $$;

-- 7. Display current settings
SELECT 'Step 7: Current settings for your user' as step;
SELECT 
    user_id,
    sync_schedule,
    enabled_providers,
    background_sync_enabled,
    aggressive_prefetch_enabled,
    data_saving_mode_enabled,
    notifications_enabled,
    created_at,
    last_updated
FROM public.user_settings 
WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';

-- 8. Final verification summary
SELECT 'Step 8: Final verification summary' as step;

SELECT 
    CASE 
        WHEN (
            -- Check table exists
            EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_settings')
            AND
            -- Check policies exist (at least 4)
            (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'user_settings') >= 4
            AND
            -- Check user has settings
            EXISTS (SELECT 1 FROM public.user_settings WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2')
        )
        THEN '🎉 T3.2 IMPLEMENTATION COMPLETE! Settings persistence is ready to test.'
        ELSE '⚠️  T3.2 implementation incomplete. Check the steps above for issues.'
    END as final_status;

SELECT 'T3.2 Verification Complete - Check results above' as final_message; 