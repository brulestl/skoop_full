-- T2.2 Audit Script: Check RLS Policies on All Tables
-- This script audits all tables with user_id columns to ensure proper RLS protection

-- Step 1: List all tables with RLS status
SELECT 
    'Step 1: RLS Status Overview' as audit_step,
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN '✅ Enabled'
        ELSE '❌ DISABLED'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
    'collections', 'collection_items', 'content_columns', 'fresh_content'
)
ORDER BY tablename;

-- Step 2: List all current RLS policies
SELECT 
    'Step 2: Current RLS Policies' as audit_step,
    schemaname,
    tablename,
    policyname,
    cmd as operations,
    qual as using_condition,
    with_check as check_condition
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;

-- Step 3: Identify tables with user_id but missing proper policies
WITH user_tables AS (
    SELECT 
        table_name,
        column_name
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND column_name = 'user_id'
),
policy_coverage AS (
    SELECT 
        tablename,
        COUNT(CASE WHEN cmd = 'SELECT' THEN 1 END) as select_policies,
        COUNT(CASE WHEN cmd = 'INSERT' THEN 1 END) as insert_policies,
        COUNT(CASE WHEN cmd = 'UPDATE' THEN 1 END) as update_policies,
        COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) as delete_policies,
        COUNT(CASE WHEN cmd = 'ALL' THEN 1 END) as all_policies
    FROM pg_policies 
    WHERE schemaname = 'public'
    GROUP BY tablename
)
SELECT 
    'Step 3: Policy Coverage Analysis' as audit_step,
    ut.table_name,
    COALESCE(pc.select_policies, 0) + COALESCE(pc.all_policies, 0) as select_coverage,
    COALESCE(pc.insert_policies, 0) + COALESCE(pc.all_policies, 0) as insert_coverage,
    COALESCE(pc.update_policies, 0) + COALESCE(pc.all_policies, 0) as update_coverage,
    COALESCE(pc.delete_policies, 0) + COALESCE(pc.all_policies, 0) as delete_coverage,
    CASE 
        WHEN (COALESCE(pc.select_policies, 0) + COALESCE(pc.all_policies, 0)) = 0 THEN '❌ Missing SELECT'
        WHEN (COALESCE(pc.insert_policies, 0) + COALESCE(pc.all_policies, 0)) = 0 THEN '❌ Missing INSERT'
        WHEN (COALESCE(pc.update_policies, 0) + COALESCE(pc.all_policies, 0)) = 0 THEN '❌ Missing UPDATE'
        WHEN (COALESCE(pc.delete_policies, 0) + COALESCE(pc.all_policies, 0)) = 0 THEN '❌ Missing DELETE'
        ELSE '✅ Full Coverage'
    END as policy_status
FROM user_tables ut
LEFT JOIN policy_coverage pc ON ut.table_name = pc.tablename
ORDER BY ut.table_name;

-- Step 4: Check for problematic "ALL" policies that should be split
SELECT 
    'Step 4: Problematic ALL Policies' as audit_step,
    tablename,
    policyname,
    'Should be split into separate SELECT/INSERT/UPDATE/DELETE policies' as recommendation
FROM pg_policies 
WHERE schemaname = 'public'
AND cmd = 'ALL'
ORDER BY tablename;

-- Step 5: Identify tables without user_id that might need special handling
SELECT 
    'Step 5: Tables Without user_id' as audit_step,
    table_name,
    'May need special RLS policies or is_public flag' as note
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
AND table_name NOT IN (
    SELECT table_name 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND column_name = 'user_id'
)
AND table_name NOT LIKE 'pg_%'
AND table_name NOT LIKE 'sql_%'
ORDER BY table_name;

-- Step 6: Check collection_items special case (needs JOIN-based policy)
SELECT 
    'Step 6: Collection Items Policy Check' as audit_step,
    tablename,
    policyname,
    qual as policy_condition,
    CASE 
        WHEN qual LIKE '%EXISTS%' AND qual LIKE '%collections%' THEN '✅ Proper JOIN-based policy'
        ELSE '❌ May need JOIN-based policy'
    END as policy_quality
FROM pg_policies 
WHERE tablename = 'collection_items'
ORDER BY policyname;

-- Step 7: Security recommendations summary
SELECT 
    'Step 7: Security Recommendations' as audit_step,
    'Review the above results and apply fixes as needed' as action_required,
    'Tables with missing policies need immediate attention' as priority_1,
    'ALL policies should be split for better granular control' as priority_2,
    'collection_items needs JOIN-based policy to collections table' as priority_3;

-- Step 8: Test data isolation (if test data exists)
-- This will show if policies are working correctly
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- Only run if test data exists
    IF EXISTS (SELECT 1 FROM public.bookmarks WHERE user_id = test_user_1) THEN
        RAISE NOTICE 'Step 8: Test Data Found - Manual testing recommended';
        RAISE NOTICE 'Use client-side tests to verify cross-user data isolation';
    ELSE
        RAISE NOTICE 'Step 8: No test data found - Create test users to verify RLS';
    END IF;
END $$;

-- Final summary
SELECT 'RLS Audit Completed - Review results above for security gaps' as final_status; 