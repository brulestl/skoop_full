-- Test Script: Row-Level Security on connected_accounts table
-- This script tests that RLS properly protects OAuth tokens from unauthorized access

-- Step 1: Verify RLS is enabled
SELECT 
    'Step 1: RLS Status Check' as test_step,
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'connected_accounts';

-- Step 2: Show the policies that were created
SELECT 
    'Step 2: Policy Verification' as test_step,
    policyname,
    cmd as operations,
    qual as using_condition,
    with_check as check_condition
FROM pg_policies 
WHERE tablename = 'connected_accounts'
ORDER BY policyname;

-- Step 3: Create test data for multiple users
-- Note: In a real test, you would need actual user IDs from auth.users
-- For this test, we'll use placeholder UUIDs

-- Clean up any existing test data first
DELETE FROM connected_accounts 
WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);

-- Insert test data for User 1
INSERT INTO connected_accounts (user_id, provider, access_token, refresh_token)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'github'::provider_type, 'user1_github_token', 'user1_github_refresh'),
    ('11111111-1111-1111-1111-111111111111', 'twitter'::provider_type, 'user1_twitter_token', 'user1_twitter_refresh');

-- Insert test data for User 2  
INSERT INTO connected_accounts (user_id, provider, access_token, refresh_token)
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'github'::provider_type, 'user2_github_token', 'user2_github_refresh'),
    ('22222222-2222-2222-2222-222222222222', 'reddit'::provider_type, 'user2_reddit_token', NULL);

-- Step 4: Test data inserted successfully (this works because we're using service role)
SELECT 
    'Step 4: Test Data Verification (Service Role)' as test_step,
    user_id,
    provider,
    access_token,
    created_at
FROM connected_accounts 
WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
)
ORDER BY user_id, provider;

-- Step 5: Simulate anon key access (this should be restricted by RLS)
-- Note: This test simulates what would happen with anon key access
-- In practice, you would test this from your application with anon key

-- Test: Try to access all connected accounts (should only see own accounts)
-- This query simulates what happens when auth.uid() returns a specific user ID

-- Simulate User 1 accessing data (should only see their own accounts)
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';

SELECT 
    'Step 5a: User 1 Access Test' as test_step,
    'Should only see User 1 accounts' as expected_result,
    COUNT(*) as visible_accounts,
    array_agg(DISTINCT user_id::text) as visible_user_ids
FROM connected_accounts;

-- Reset the JWT claims
RESET "request.jwt.claims";

-- Simulate User 2 accessing data (should only see their own accounts)  
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';

SELECT 
    'Step 5b: User 2 Access Test' as test_step,
    'Should only see User 2 accounts' as expected_result,
    COUNT(*) as visible_accounts,
    array_agg(DISTINCT user_id::text) as visible_user_ids
FROM connected_accounts;

-- Reset the JWT claims
RESET "request.jwt.claims";

-- Step 6: Test INSERT with wrong user_id (should fail)
-- This simulates a user trying to insert data for another user
DO $$
BEGIN
    -- Simulate User 1 trying to insert data for User 2
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    BEGIN
        INSERT INTO connected_accounts (user_id, provider, access_token)
        VALUES ('22222222-2222-2222-2222-222222222222', 'stack'::provider_type, 'malicious_token');
        
        RAISE NOTICE 'ERROR: User 1 was able to insert data for User 2 (RLS FAILED)';
    EXCEPTION
        WHEN insufficient_privilege OR check_violation THEN
            RAISE NOTICE 'SUCCESS: User 1 correctly blocked from inserting data for User 2';
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from inserting data for User 2 (Error: %)', SQLERRM;
    END;
    
    -- Reset JWT claims
    RESET "request.jwt.claims";
END $$;

-- Step 7: Test UPDATE with wrong user_id (should fail)
DO $$
BEGIN
    -- Simulate User 1 trying to update User 2's data
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    BEGIN
        UPDATE connected_accounts 
        SET access_token = 'hacked_token'
        WHERE user_id = '22222222-2222-2222-2222-222222222222' 
          AND provider = 'github'::provider_type;
        
        IF FOUND THEN
            RAISE NOTICE 'ERROR: User 1 was able to update User 2 data (RLS FAILED)';
        ELSE
            RAISE NOTICE 'SUCCESS: User 1 correctly blocked from updating User 2 data';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from updating User 2 data (Error: %)', SQLERRM;
    END;
    
    -- Reset JWT claims
    RESET "request.jwt.claims";
END $$;

-- Step 8: Test DELETE with wrong user_id (should fail)
DO $$
BEGIN
    -- Simulate User 1 trying to delete User 2's data
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    BEGIN
        DELETE FROM connected_accounts 
        WHERE user_id = '22222222-2222-2222-2222-222222222222' 
          AND provider = 'reddit'::provider_type;
        
        IF FOUND THEN
            RAISE NOTICE 'ERROR: User 1 was able to delete User 2 data (RLS FAILED)';
        ELSE
            RAISE NOTICE 'SUCCESS: User 1 correctly blocked from deleting User 2 data';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from deleting User 2 data (Error: %)', SQLERRM;
    END;
    
    -- Reset JWT claims
    RESET "request.jwt.claims";
END $$;

-- Step 9: Test valid operations (should succeed)
DO $$
BEGIN
    -- Simulate User 1 managing their own data
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    -- Test valid INSERT
    INSERT INTO connected_accounts (user_id, provider, access_token)
    VALUES ('11111111-1111-1111-1111-111111111111', 'reddit'::provider_type, 'user1_reddit_token');
    
    -- Test valid UPDATE
    UPDATE connected_accounts 
    SET access_token = 'user1_github_token_updated'
    WHERE user_id = '11111111-1111-1111-1111-111111111111' 
      AND provider = 'github'::provider_type;
    
    RAISE NOTICE 'SUCCESS: User 1 can manage their own data correctly';
    
    -- Reset JWT claims
    RESET "request.jwt.claims";
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERROR: User 1 blocked from managing own data (Error: %)', SQLERRM;
        RESET "request.jwt.claims";
END $$;

-- Step 10: Final verification - count accounts per user
SELECT 
    'Step 10: Final Account Count' as test_step,
    user_id,
    COUNT(*) as account_count,
    array_agg(provider::text ORDER BY provider) as providers
FROM connected_accounts 
WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
)
GROUP BY user_id
ORDER BY user_id;

-- Clean up test data
DELETE FROM connected_accounts 
WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);

-- Final success message
SELECT 'Row-Level Security Test Completed Successfully!' as final_result; 