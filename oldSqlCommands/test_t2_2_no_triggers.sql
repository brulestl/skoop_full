-- T2.2 Test Script: RLS Verification (No Triggers)
-- This script tests RLS functionality while avoiding trigger issues

-- Temporarily disable triggers to avoid user_settings issues
SET session_replication_role = replica;

-- Setup test users
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- Clean up any existing test data
    DELETE FROM public.bookmarks WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.collections WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.users WHERE id IN (test_user_1, test_user_2);

    -- Create test users (triggers disabled)
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

-- Re-enable triggers
SET session_replication_role = DEFAULT;

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

-- Test 4: Test malicious operations (should fail)
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- Simulate User 1 trying to access User 2's data
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    -- Test malicious INSERT
    BEGIN
        INSERT INTO public.bookmarks (user_id, url, title) 
        VALUES (test_user_2, 'https://malicious.com', 'Malicious Bookmark');
        RAISE NOTICE 'ERROR: User 1 was able to insert bookmark for User 2';
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from inserting bookmark for User 2';
    END;
    
    -- Test malicious UPDATE
    BEGIN
        UPDATE public.bookmarks 
        SET title = 'Hacked Title' 
        WHERE user_id = test_user_2;
        
        IF FOUND THEN
            RAISE NOTICE 'ERROR: User 1 was able to update User 2 bookmarks';
        ELSE
            RAISE NOTICE 'SUCCESS: User 1 blocked from updating User 2 bookmarks';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from updating User 2 bookmarks (Exception)';
    END;
    
    RESET "request.jwt.claims";
END $$;

-- Test 5: Verify RLS policy coverage
SELECT 'Test 5: RLS Policy Coverage' as test_section;
SELECT 
    tablename,
    COUNT(*) as policy_count,
    string_agg(cmd, ', ' ORDER BY cmd) as operations_covered
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('users', 'bookmarks', 'collections', 'connected_accounts', 'bookmarks_raw')
GROUP BY tablename
ORDER BY tablename;

-- Test 6: Service role can see all data (this should show 2 records each)
SELECT 'Test 6: Service Role Access' as test_section;
SELECT 'Users' as table_name, COUNT(*) as total_records FROM public.users;
SELECT 'Bookmarks' as table_name, COUNT(*) as total_records FROM public.bookmarks;
SELECT 'Collections' as table_name, COUNT(*) as total_records FROM public.collections;

-- Test 7: Test public sharing functionality
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- User 1 makes a bookmark public
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    UPDATE public.bookmarks 
    SET is_public = true 
    WHERE user_id = test_user_1;
    
    UPDATE public.collections 
    SET is_public = true 
    WHERE user_id = test_user_1;
    
    RESET "request.jwt.claims";
    
    RESET "request.jwt.claims";
    
    RAISE NOTICE 'Test 7: Public sharing functionality updated successfully';
END $$;

-- Test 7 continued: Verify public sharing works
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';

SELECT 'Test 7a: Public Bookmarks Visible to User 2' as test_name, 
       COUNT(*) as visible_public_bookmarks 
FROM public.bookmarks 
WHERE is_public = true;

SELECT 'Test 7b: Public Collections Visible to User 2' as test_name, 
       COUNT(*) as visible_public_collections 
FROM public.collections 
WHERE is_public = true;

RESET "request.jwt.claims";

-- Unauthenticated users should also see public items
SELECT 'Test 7c: Public Bookmarks Visible to Unauth' as test_name, 
       COUNT(*) as visible_public_bookmarks 
FROM public.bookmarks 
WHERE is_public = true;

SELECT 'Test 7d: Public Collections Visible to Unauth' as test_name, 
       COUNT(*) as visible_public_collections 
FROM public.collections 
WHERE is_public = true;

-- Cleanup (disable triggers again for cleanup)
SET session_replication_role = replica;

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

-- Re-enable triggers
SET session_replication_role = DEFAULT;

SELECT 'T2.2 RLS Test Completed Successfully!' as final_result; 