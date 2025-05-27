-- Check Current Database State for T3.2
-- This script checks what currently exists in the database

SELECT '=== CURRENT DATABASE STATE CHECK ===' as section;

-- 1. Check if user_settings table exists at all
SELECT 'Step 1: Does user_settings table exist?' as step;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'user_settings'
        ) 
        THEN '✅ user_settings table EXISTS'
        ELSE '❌ user_settings table DOES NOT EXIST'
    END as table_existence;

-- 2. If table exists, show its structure
SELECT 'Step 2: Current table structure (if exists)' as step;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_settings'
ORDER BY ordinal_position;

-- 3. Check what triggers exist on users table
SELECT 'Step 3: Triggers on users table' as step;
SELECT 
    tgname as trigger_name,
    tgenabled as enabled
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname = 'users'
AND tgname LIKE '%settings%';

-- 4. Check if the function exists
SELECT 'Step 4: Check if create_default_user_settings function exists' as step;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_proc 
            WHERE proname = 'create_default_user_settings'
        ) 
        THEN '✅ Function EXISTS'
        ELSE '❌ Function DOES NOT EXIST'
    END as function_existence;

-- 5. Show any existing policies on user_settings
SELECT 'Step 5: Existing policies on user_settings (if any)' as step;
SELECT 
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename = 'user_settings';

-- 6. Check if your user exists
SELECT 'Step 6: Check if your user exists' as step;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2'
        ) 
        THEN '✅ Your user EXISTS in users table'
        ELSE '❌ Your user NOT FOUND in users table'
    END as user_existence;

-- 7. Summary and next steps
SELECT 'Step 7: Summary and recommendations' as step;

SELECT 
    CASE 
        WHEN NOT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'user_settings'
        ) 
        THEN '📋 RECOMMENDATION: Run the safe migration script to create user_settings table'
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'user_settings'
        ) AND NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'user_settings'
            AND column_name = 'background_sync_enabled'
        )
        THEN '📋 RECOMMENDATION: Table exists but missing columns. Run migration to add missing columns.'
        ELSE '✅ Table appears to be properly set up'
    END as recommendation;

SELECT 'Database State Check Complete' as final_message; 