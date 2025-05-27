-- Comprehensive T1 & T2 Verification Script
-- This script checks all aspects of the Epic T1 & T2 implementation

-- ========================================
-- T1 VERIFICATION: Composite Primary Key
-- ========================================

SELECT '=== T1.1: COMPOSITE PRIMARY KEY VERIFICATION ===' as section;

-- Check connected_accounts table structure
SELECT 'T1.1a: Connected Accounts Table Structure' as check_name;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'connected_accounts'
ORDER BY ordinal_position;

-- Check primary key constraint
SELECT 'T1.1b: Primary Key Constraint' as check_name;
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    array_agg(a.attname ORDER BY array_position(conkey, a.attnum)) as key_columns
FROM pg_constraint c
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.conrelid = 'public.connected_accounts'::regclass
AND c.contype = 'p'
GROUP BY conname, contype;

-- Check if old 'id' column was removed
SELECT 'T1.1c: Old ID Column Removed' as check_name;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'connected_accounts' 
            AND column_name = 'id'
        ) THEN '❌ OLD ID COLUMN STILL EXISTS'
        ELSE '✅ OLD ID COLUMN REMOVED'
    END as status;

-- Test composite key functionality
SELECT 'T1.1d: Composite Key Test' as check_name;
DO $$
DECLARE
    -- Use existing user ID to avoid foreign key issues
    test_user UUID := 'b108adb4-f86f-4196-a389-f3c5395dc1a2';
    existing_connections INT;
    test_connections INT;
    existing_providers TEXT[];
    available_providers TEXT[] := ARRAY['reddit', 'stack']; -- Use providers likely not connected
    test_provider_1 TEXT;
    test_provider_2 TEXT;
BEGIN
    -- Check existing connections and providers
    SELECT COUNT(*), array_agg(provider::text) 
    INTO existing_connections, existing_providers
    FROM public.connected_accounts 
    WHERE user_id = test_user;
    
    RAISE NOTICE 'User has % existing connections: %', existing_connections, existing_providers;
    
    -- Find available providers for testing
    SELECT provider INTO test_provider_1 
    FROM unnest(available_providers) AS provider 
    WHERE provider != ALL(COALESCE(existing_providers, ARRAY[]::TEXT[]))
    LIMIT 1;
    
    SELECT provider INTO test_provider_2 
    FROM unnest(available_providers) AS provider 
    WHERE provider != ALL(COALESCE(existing_providers, ARRAY[]::TEXT[]))
    AND provider != test_provider_1
    LIMIT 1;
    
    -- If we don't have 2 available providers, use a different approach
    IF test_provider_1 IS NULL THEN
        test_provider_1 := 'reddit';
        test_provider_2 := 'stack';
        RAISE NOTICE 'Using reddit/stack for testing (may temporarily replace existing connections)';
        
        -- Clean up existing test connections first
        DELETE FROM public.connected_accounts 
        WHERE user_id = test_user 
        AND provider IN ('reddit', 'stack')
        AND access_token LIKE 'test_token_%';
    ELSE
        RAISE NOTICE 'Using available providers for testing: % and %', test_provider_1, test_provider_2;
    END IF;
    
    -- Clean up any existing test connections
    DELETE FROM public.connected_accounts 
    WHERE user_id = test_user 
    AND access_token LIKE 'test_token_%';
    
    -- Test inserting multiple providers for same user
    EXECUTE format('INSERT INTO public.connected_accounts (user_id, provider, access_token) VALUES ($1, $2, $3), ($1, $4, $5)')
    USING test_user, test_provider_1::provider_type, 'test_token_1', test_provider_2::provider_type, 'test_token_2';
    
    -- Check if both test records exist
    SELECT COUNT(*) INTO test_connections 
    FROM public.connected_accounts 
    WHERE user_id = test_user AND access_token LIKE 'test_token_%';
    
    IF test_connections = 2 THEN
        RAISE NOTICE '✅ COMPOSITE KEY WORKING: Multiple providers per user allowed';
        RAISE NOTICE 'Successfully added % and % connections', test_provider_1, test_provider_2;
    ELSE
        RAISE NOTICE '❌ COMPOSITE KEY FAILED: Expected 2 test connections, got %', test_connections;
    END IF;
    
    -- Test duplicate provider constraint (should fail)
    BEGIN
        EXECUTE format('INSERT INTO public.connected_accounts (user_id, provider, access_token) VALUES ($1, $2, $3)')
        USING test_user, test_provider_1::provider_type, 'test_token_duplicate';
        RAISE NOTICE '❌ DUPLICATE CONSTRAINT FAILED: Should not allow duplicate provider';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE '✅ DUPLICATE CONSTRAINT WORKING: Correctly prevented duplicate % provider', test_provider_1;
    END;
    
    -- Cleanup test connections only
    DELETE FROM public.connected_accounts 
    WHERE user_id = test_user 
    AND access_token LIKE 'test_token_%';
    
    RAISE NOTICE 'Test complete - cleaned up test connections, real connections preserved';
END $$;

-- ========================================
-- T2 VERIFICATION: ROW-LEVEL SECURITY
-- ========================================

SELECT '=== T2.1 & T2.2: ROW-LEVEL SECURITY VERIFICATION ===' as section;

-- Check RLS is enabled on all tables
SELECT 'T2.1a: RLS Enabled Status' as check_name;
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN '✅ ENABLED'
        ELSE '❌ DISABLED'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
    'collections', 'collection_items', 'content_columns', 'fresh_content'
)
ORDER BY tablename;

-- Check policy count per table
SELECT 'T2.1b: Policy Count Per Table' as check_name;
SELECT 
    tablename,
    COUNT(*) as policy_count,
    string_agg(cmd, ', ' ORDER BY cmd) as operations_covered,
    CASE 
        WHEN COUNT(*) >= 4 THEN '✅ ADEQUATE'
        WHEN COUNT(*) >= 1 THEN '⚠️ MINIMAL'
        ELSE '❌ MISSING'
    END as coverage_status
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
    'collections', 'collection_items', 'content_columns', 'fresh_content'
)
GROUP BY tablename
ORDER BY tablename;

-- Check for problematic "ALL" policies
SELECT 'T2.1c: Problematic ALL Policies' as check_name;
SELECT 
    tablename,
    policyname,
    cmd,
    '⚠️ SHOULD BE SPLIT INTO SPECIFIC OPERATIONS' as recommendation
FROM pg_policies 
WHERE schemaname = 'public'
AND cmd = 'ALL'
AND tablename IN (
    'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
    'collections', 'collection_items', 'content_columns', 'fresh_content'
)
ORDER BY tablename;

-- Check for is_public columns (T2.2 feature)
SELECT 'T2.2a: Public Sharing Columns' as check_name;
SELECT 
    table_name,
    column_name,
    data_type,
    column_default,
    '✅ PUBLIC SHARING ENABLED' as status
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND column_name = 'is_public'
AND table_name IN ('bookmarks', 'collections')
ORDER BY table_name;

-- Check collection_items JOIN-based policies
SELECT 'T2.2b: Collection Items JOIN Policies' as check_name;
SELECT 
    policyname,
    cmd,
    CASE 
        WHEN qual LIKE '%EXISTS%' AND qual LIKE '%collections%' THEN '✅ PROPER JOIN-BASED'
        ELSE '❌ MISSING JOIN-BASED LOGIC'
    END as policy_quality,
    LEFT(qual, 100) as policy_condition_preview
FROM pg_policies 
WHERE tablename = 'collection_items'
AND schemaname = 'public'
ORDER BY cmd;

-- ========================================
-- SECURITY VERIFICATION
-- ========================================

SELECT '=== SECURITY VERIFICATION ===' as section;

-- Quick RLS test with test data
SELECT 'Security Test: Cross-User Data Isolation' as check_name;
DO $$
DECLARE
    test_user_1 UUID := '88888888-8888-8888-8888-888888888888';
    test_user_2 UUID := '77777777-7777-7777-7777-777777777777';
    test_email_1 TEXT := 'test1-' || extract(epoch from now()) || '@example.com';
    test_email_2 TEXT := 'test2-' || extract(epoch from now()) || '@example.com';
    user1_visible INT;
    user2_visible INT;
    unauth_visible INT;
BEGIN
    -- Temporarily disable triggers for test
    SET session_replication_role = replica;
    
    -- Clean up and create test data (more thorough cleanup)
    DELETE FROM public.bookmarks WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.users WHERE id IN (test_user_1, test_user_2) OR email LIKE 'test%@example.com';
    
    INSERT INTO public.users (id, email) VALUES 
        (test_user_1, test_email_1),
        (test_user_2, test_email_2);
    
    INSERT INTO public.bookmarks (user_id, url, title) VALUES 
        (test_user_1, 'https://test1.com', 'Test 1 Bookmark'),
        (test_user_2, 'https://test2.com', 'Test 2 Bookmark');
    
    -- Re-enable triggers
    SET session_replication_role = DEFAULT;
    
    -- Test User 1 visibility
    SET LOCAL "request.jwt.claims" TO '{"sub": "88888888-8888-8888-8888-888888888888"}';
    SELECT COUNT(*) INTO user1_visible FROM public.bookmarks;
    RESET "request.jwt.claims";
    
    -- Test User 2 visibility  
    SET LOCAL "request.jwt.claims" TO '{"sub": "77777777-7777-7777-7777-777777777777"}';
    SELECT COUNT(*) INTO user2_visible FROM public.bookmarks;
    RESET "request.jwt.claims";
    
    -- Test unauthenticated visibility
    SELECT COUNT(*) INTO unauth_visible FROM public.bookmarks;
    
    -- Report results
    RAISE NOTICE 'User 1 sees % bookmarks (should be 1)', user1_visible;
    RAISE NOTICE 'User 2 sees % bookmarks (should be 1)', user2_visible;
    RAISE NOTICE 'Unauthenticated sees % bookmarks (should be 0)', unauth_visible;
    
    IF user1_visible = 1 AND user2_visible = 1 AND unauth_visible = 0 THEN
        RAISE NOTICE '✅ RLS WORKING CORRECTLY';
    ELSE
        RAISE NOTICE '❌ RLS NOT WORKING PROPERLY';
    END IF;
    
    -- Cleanup
    SET session_replication_role = replica;
    DELETE FROM public.bookmarks WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.users WHERE id IN (test_user_1, test_user_2);
    SET session_replication_role = DEFAULT;
END $$;

-- ========================================
-- SUMMARY REPORT
-- ========================================

SELECT '=== IMPLEMENTATION SUMMARY ===' as section;

-- T1 Summary
SELECT 'T1 SUMMARY: Composite Primary Key' as component;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_constraint c
            JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
            WHERE c.conrelid = 'public.connected_accounts'::regclass
            AND c.contype = 'p'
            AND array_length(c.conkey, 1) = 2
        ) THEN '✅ T1 COMPLETE: Composite primary key implemented'
        ELSE '❌ T1 INCOMPLETE: Composite primary key missing'
    END as t1_status;

-- T2 Summary
SELECT 'T2 SUMMARY: Row-Level Security' as component;
WITH rls_summary AS (
    SELECT 
        COUNT(*) as tables_with_rls,
        COUNT(*) FILTER (WHERE rowsecurity = true) as tables_rls_enabled
    FROM pg_tables 
    WHERE schemaname = 'public'
    AND tablename IN (
        'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
        'collections', 'collection_items', 'content_columns', 'fresh_content'
    )
),
policy_summary AS (
    SELECT COUNT(DISTINCT tablename) as tables_with_policies
    FROM pg_policies 
    WHERE schemaname = 'public'
    AND tablename IN (
        'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
        'collections', 'collection_items', 'content_columns', 'fresh_content'
    )
)
SELECT 
    CASE 
        WHEN r.tables_rls_enabled = 8 AND p.tables_with_policies = 8 THEN 
            '✅ T2 COMPLETE: All 8 tables secured with RLS'
        WHEN r.tables_rls_enabled >= 6 THEN 
            '⚠️ T2 MOSTLY COMPLETE: ' || r.tables_rls_enabled || '/8 tables secured'
        ELSE 
            '❌ T2 INCOMPLETE: Only ' || r.tables_rls_enabled || '/8 tables secured'
    END as t2_status
FROM rls_summary r, policy_summary p;

-- Overall Status
SELECT 'OVERALL STATUS' as component;
SELECT 
    CASE 
        WHEN (
            -- T1 check: composite key exists
            EXISTS (
                SELECT 1 FROM pg_constraint c
                WHERE c.conrelid = 'public.connected_accounts'::regclass
                AND c.contype = 'p'
                AND array_length(c.conkey, 1) = 2
            )
            AND 
            -- T2 check: all tables have RLS
            (SELECT COUNT(*) FROM pg_tables 
             WHERE schemaname = 'public' AND rowsecurity = true
             AND tablename IN (
                'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
                'collections', 'collection_items', 'content_columns', 'fresh_content'
             )) = 8
        ) THEN '🎉 EPIC T1 & T2 FULLY COMPLETE - PRODUCTION READY!'
        ELSE '⚠️ EPIC T1 & T2 NEEDS ATTENTION - CHECK DETAILS ABOVE'
    END as epic_status;

SELECT 'Verification Complete - Review Results Above' as final_message; 