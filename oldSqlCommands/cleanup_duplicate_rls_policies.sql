-- Cleanup Script: Remove Duplicate RLS Policies
-- This script removes the old policies and keeps the new ones with consistent naming

-- Drop the old policies (these appear to be from a previous implementation)
DROP POLICY IF EXISTS "Users can delete their own connected accounts" ON connected_accounts;
DROP POLICY IF EXISTS "Users can insert their own connected accounts" ON connected_accounts;
DROP POLICY IF EXISTS "Users can only access their own connected accounts" ON connected_accounts;
DROP POLICY IF EXISTS "Users can update their own connected accounts" ON connected_accounts;
DROP POLICY IF EXISTS "Users can view their own connected accounts" ON connected_accounts;

-- Verify only our new policies remain
SELECT 
    'Remaining Policies After Cleanup' as status,
    policyname,
    cmd as operation,
    qual as using_condition,
    with_check as check_condition
FROM pg_policies 
WHERE tablename = 'connected_accounts'
ORDER BY cmd, policyname;

-- Verify RLS is still enabled
SELECT 
    'RLS Status Check' as status,
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'connected_accounts';

-- Final count of policies (should be 4)
SELECT 
    'Policy Count' as status,
    COUNT(*) as total_policies
FROM pg_policies 
WHERE tablename = 'connected_accounts'; 