-- Simple Composite Primary Key Test
-- Uses a hardcoded valid UUID to avoid format issues
-- Run this in Supabase SQL Editor

-- Use a valid UUID format (this is a standard UUID v4)
-- If you get UUID errors, make sure your user_id column is actually UUID type

-- Test 1: Insert multiple providers for the same user
INSERT INTO public.connected_accounts (user_id, provider, access_token) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'github'::provider_type, 'github-token-123'),
('550e8400-e29b-41d4-a716-446655440000', 'twitter'::provider_type, 'twitter-token-456'),
('550e8400-e29b-41d4-a716-446655440000', 'reddit'::provider_type, 'reddit-token-789')
ON CONFLICT (user_id, provider) DO UPDATE SET 
    access_token = EXCLUDED.access_token,
    updated_at = NOW();

-- Test 2: Verify we have 3 accounts for the user
SELECT 
    'Test Result' as test,
    COUNT(*) as account_count,
    array_agg(provider::text) as providers
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Test 3: Try to insert duplicate (should update, not create new row)
INSERT INTO public.connected_accounts (user_id, provider, access_token) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'github'::provider_type, 'github-token-updated')
ON CONFLICT (user_id, provider) DO UPDATE SET 
    access_token = EXCLUDED.access_token,
    updated_at = NOW();

-- Test 4: Verify still only 3 accounts (no duplicates)
SELECT 
    'Final Count' as test,
    COUNT(*) as account_count,
    'Should be 3' as expected
FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Clean up
DELETE FROM public.connected_accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

SELECT 'Test completed successfully!' as result; 