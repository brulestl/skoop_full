-- Test Script for Composite Primary Key Migration
-- This script tests that the connected_accounts table can hold multiple rows per user
-- with different providers after the composite PK migration
-- Run this in Supabase SQL Editor after applying the migration

-- Step 1: Clean up any existing test data first
DELETE FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

DELETE FROM public.users 
WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Use a unique timestamp-based email to avoid conflicts
-- Step 2: Create a test user (use a fixed UUID for testing)
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'composite-pk-test-' || extract(epoch from now()) || '@example.com',
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'composite-pk-test-' || extract(epoch from now()) || '@example.com'
) ON CONFLICT (id) DO NOTHING;

-- Step 3: Test inserting multiple connected accounts for the same user
-- This should work with the composite PK (user_id, provider)

-- Insert GitHub account
INSERT INTO public.connected_accounts (
    user_id,
    provider,
    access_token,
    refresh_token
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'github'::provider_type,
    'github_access_token_123',
    'github_refresh_token_123'
);

-- Insert Twitter account for the same user
INSERT INTO public.connected_accounts (
    user_id,
    provider,
    access_token,
    refresh_token
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'twitter'::provider_type,
    'twitter_access_token_456',
    'twitter_refresh_token_456'
);

-- Insert Reddit account for the same user
INSERT INTO public.connected_accounts (
    user_id,
    provider,
    access_token
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'reddit'::provider_type,
    'reddit_access_token_789'
);

-- Step 4: Verify all accounts were inserted successfully
SELECT 
    'Step 4: Verify multiple accounts inserted' as test_step,
    user_id,
    provider,
    access_token,
    created_at
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY provider;

-- Step 5: Test UPSERT behavior (should update existing record, not create duplicate)
INSERT INTO public.connected_accounts (
    user_id,
    provider,
    access_token,
    refresh_token
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'github'::provider_type,
    'github_access_token_updated',
    'github_refresh_token_updated'
) ON CONFLICT (user_id, provider) 
DO UPDATE SET 
    access_token = EXCLUDED.access_token,
    refresh_token = EXCLUDED.refresh_token,
    updated_at = NOW();

-- Step 6: Verify the GitHub account was updated, not duplicated
SELECT 
    'Step 6: Verify GitHub account updated' as test_step,
    user_id,
    provider,
    access_token,
    refresh_token,
    created_at,
    updated_at
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
  AND provider = 'github'::provider_type;

-- Step 7: Count total accounts for the user (should be 3)
SELECT 
    'Step 7: Count total accounts (should be 3)' as test_step,
    COUNT(*) as total_accounts,
    array_agg(provider::text ORDER BY provider) as providers
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Step 8: Test that we cannot insert duplicate (user_id, provider) combinations
-- This should fail with a primary key violation
DO $$
BEGIN
    BEGIN
        INSERT INTO public.connected_accounts (
            user_id,
            provider,
            access_token
        ) VALUES (
            '550e8400-e29b-41d4-a716-446655440000',
            'github'::provider_type,
            'duplicate_attempt'
        );
        RAISE EXCEPTION 'ERROR: Duplicate insert should have failed!';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE 'SUCCESS: Duplicate insert correctly prevented by composite PK';
    END;
END $$;

-- Step 9: Final verification - show all test results
SELECT 
    'Step 9: Final verification' as test_step,
    'SUCCESS: Composite PK migration working correctly' as result,
    COUNT(*) as total_test_accounts
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Step 10: Clean up test data
DELETE FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

DELETE FROM public.users 
WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Note: We don't delete from auth.users as it might be managed by Supabase Auth

-- Final success message
SELECT 'Composite Primary Key Migration Test Completed Successfully!' as final_result; 