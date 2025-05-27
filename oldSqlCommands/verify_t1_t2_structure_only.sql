-- T1 & T2 Structure Verification (No Live Testing)
-- This script checks database structure without creating test data

-- ========================================
-- T1 VERIFICATION: Composite Primary Key
-- ========================================

SELECT '=== T1: COMPOSITE PRIMARY KEY VERIFICATION ===' as section;

-- Check connected_accounts table structure
SELECT 'T1.1: Connected Accounts Table Structure' as check_name;
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
SELECT 'T1.2: Primary Key Constraint' as check_name;
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
SELECT 'T1.3: Old ID Column Status' as check_name;
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

-- ========================================
-- T2 VERIFICATION: ROW-LEVEL SECURITY
-- ========================================

SELECT '=== T2: ROW-LEVEL SECURITY VERIFICATION ===' as section;

-- Check RLS is enabled on all tables
SELECT 'T2.1: RLS Enabled Status' as check_name;
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
SELECT 'T2.2: Policy Count Per Table' as check_name;
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
SELECT 'T2.3: Problematic ALL Policies' as check_name;
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
SELECT 'T2.4: Public Sharing Columns' as check_name;
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
SELECT 'T2.5: Collection Items JOIN Policies' as check_name;
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

SELECT 'Structure Verification Complete - Review Results Above' as final_message; 