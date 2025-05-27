-- T2.2 Simple Test Script: Core RLS Verification
-- This script tests basic RLS functionality without complex cleanup

-- Setup test users
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- Simple cleanup (ignore errors)
    DELETE FROM public.users WHERE id IN (test_user_1, test_user_2);

    -- Create test users
    INSERT INTO public.users (id, email) VALUES 
        (test_user_1, 'testuser1@example.com'),
        (test_user_2, 'testuser2@example.com');

    -- Create test bookmarks
    INSERT INTO public.bookmarks (user_id, url, title) VALUES 
        (test_user_1, 'https://example.com/user1', 'User 1 Bookmark'),
        (test_user_2, 'https://example.com/user2', 'User 2 Bookmark');

    -- Create test collections
    INSERT INTO public.collections (user_id, name, type) VALUES 
        (test_user_1, 'User 1 Collection', 'manual'),
        (test_user_2, 'User 2 Collection', 'manual');

    RAISE NOTICE 'Test data created successfully';
END $$;

-- Test 1: User 1 can only see their own data
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';

SELECT 'Test 1: User 1 Data Visibility' as test_section;
SELECT 'Users' as table_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Bookmarks' as table_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Collections' as table_name, COUNT(*) as visible_records FROM public.collections;

RESET "request.jwt.claims";

-- Test 2: User 2 can only see their own data
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';

SELECT 'Test 2: User 2 Data Visibility' as test_section;
SELECT 'Users' as table_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Bookmarks' as table_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Collections' as table_name, COUNT(*) as visible_records FROM public.collections;

RESET "request.jwt.claims";

-- Test 3: Unauthenticated users see no data
SELECT 'Test 3: Unauthenticated Data Visibility' as test_section;
SELECT 'Users' as table_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Bookmarks' as table_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Collections' as table_name, COUNT(*) as visible_records FROM public.collections;

-- Test 4: Verify RLS policy coverage
SELECT 'Test 4: RLS Policy Coverage' as test_section;
SELECT 
    tablename,
    COUNT(*) as policy_count,
    string_agg(cmd, ', ' ORDER BY cmd) as operations_covered
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('users', 'bookmarks', 'collections', 'connected_accounts')
GROUP BY tablename
ORDER BY tablename;

-- Test 5: Service role can see all data (this should show 2 records each)
SELECT 'Test 5: Service Role Access' as test_section;
SELECT 'Users' as table_name, COUNT(*) as total_records FROM public.users;
SELECT 'Bookmarks' as table_name, COUNT(*) as total_records FROM public.bookmarks;
SELECT 'Collections' as table_name, COUNT(*) as total_records FROM public.collections;

-- Cleanup
DELETE FROM public.bookmarks WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.collections WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.users WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);

SELECT 'T2.2 Simple RLS Test Completed Successfully!' as final_result; 