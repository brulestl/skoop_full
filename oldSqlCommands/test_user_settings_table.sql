-- Test user_settings table existence and functionality
-- Run this in Supabase SQL Editor to verify T3.2 implementation

-- Check if user_settings table exists
SELECT 'T3.2 Test: Checking user_settings table existence' as test_name;

SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'user_settings';

-- Check table structure
SELECT 'T3.2 Test: Checking user_settings table structure' as test_name;

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_settings'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 'T3.2 Test: Checking RLS policies on user_settings' as test_name;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_settings';

-- Test default settings creation (if table exists)
SELECT 'T3.2 Test: Testing default settings creation' as test_name;

DO $$
DECLARE
    test_user_id UUID := 'b108adb4-f86f-4196-a389-f3c5395dc1a2'; -- Your actual user ID
    settings_count INTEGER;
BEGIN
    -- Check if user already has settings
    SELECT COUNT(*) INTO settings_count 
    FROM public.user_settings 
    WHERE user_id = test_user_id;
    
    IF settings_count = 0 THEN
        -- Create default settings for testing
        INSERT INTO public.user_settings (user_id) VALUES (test_user_id);
        RAISE NOTICE '✅ Created default settings for user';
    ELSE
        RAISE NOTICE '✅ User already has settings (count: %)', settings_count;
    END IF;
    
    -- Display current settings
    RAISE NOTICE '--- Current Settings ---';
    FOR settings_count IN 
        SELECT 1 FROM public.user_settings WHERE user_id = test_user_id
    LOOP
        RAISE NOTICE 'Settings found for user: %', test_user_id;
    END LOOP;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ Error: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
        RAISE NOTICE 'This likely means the user_settings table does not exist yet';
        RAISE NOTICE 'Please run migration: 20241224000003_create_user_settings_table.sql';
END $$;

SELECT 'T3.2 Test Complete' as final_message; 