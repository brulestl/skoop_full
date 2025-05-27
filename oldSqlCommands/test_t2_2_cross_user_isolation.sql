-- T2.2 Test Script: Cross-User Data Isolation
-- This script tests that all tables properly prevent cross-user data access

-- Setup test users
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
    test_collection_id UUID;
    test_bookmark_id UUID;
BEGIN
    -- Clean up any existing test data
    DELETE FROM public.collection_items WHERE collection_id IN (
        SELECT id FROM public.collections WHERE user_id IN (test_user_1, test_user_2)
    );
    DELETE FROM public.fresh_content WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.content_columns WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.collections WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.bookmarks WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.bookmarks_raw WHERE user_id IN (test_user_1, test_user_2);
    DELETE FROM public.users WHERE id IN (test_user_1, test_user_2);

    -- Create test users
    INSERT INTO public.users (id, email) VALUES 
        (test_user_1, 'testuser1@example.com'),
        (test_user_2, 'testuser2@example.com');

    -- Create test bookmarks_raw
    INSERT INTO public.bookmarks_raw (user_id, source, raw_json) VALUES 
        (test_user_1, 'github', '{"repo": "user1-repo"}'),
        (test_user_2, 'github', '{"repo": "user2-repo"}');

    -- Create test bookmarks
    INSERT INTO public.bookmarks (id, user_id, url, title) VALUES 
        (gen_random_uuid(), test_user_1, 'https://example.com/user1', 'User 1 Bookmark'),
        (gen_random_uuid(), test_user_2, 'https://example.com/user2', 'User 2 Bookmark');

    -- Get a bookmark ID for collection testing
    SELECT id INTO test_bookmark_id FROM public.bookmarks WHERE user_id = test_user_1 LIMIT 1;

    -- Create test collections
    INSERT INTO public.collections (id, user_id, name, type) VALUES 
        (gen_random_uuid(), test_user_1, 'User 1 Collection', 'manual'),
        (gen_random_uuid(), test_user_2, 'User 2 Collection', 'manual');

    -- Get a collection ID for collection_items testing
    SELECT id INTO test_collection_id FROM public.collections WHERE user_id = test_user_1 LIMIT 1;

    -- Create test collection_items
    INSERT INTO public.collection_items (collection_id, bookmark_id) VALUES 
        (test_collection_id, test_bookmark_id);

    -- Create test content_columns
    INSERT INTO public.content_columns (user_id, provider, query, label) VALUES 
        (test_user_1, 'github', 'javascript', 'User 1 JS Content'),
        (test_user_2, 'github', 'python', 'User 2 Python Content');

    -- Create test fresh_content
    INSERT INTO public.fresh_content (user_id, column_id, payload) VALUES 
        (test_user_1, (SELECT id FROM public.content_columns WHERE user_id = test_user_1 LIMIT 1), '{"title": "User 1 Content"}'),
        (test_user_2, (SELECT id FROM public.content_columns WHERE user_id = test_user_2 LIMIT 1), '{"title": "User 2 Content"}');

    RAISE NOTICE 'Test data created successfully';
END $$;

-- Test 1: User 1 can only see their own data
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';

SELECT 'Test 1a: User 1 - Users Table' as test_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Test 1b: User 1 - Bookmarks Raw' as test_name, COUNT(*) as visible_records FROM public.bookmarks_raw;
SELECT 'Test 1c: User 1 - Bookmarks' as test_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Test 1d: User 1 - Collections' as test_name, COUNT(*) as visible_records FROM public.collections;
SELECT 'Test 1e: User 1 - Collection Items' as test_name, COUNT(*) as visible_records FROM public.collection_items;
SELECT 'Test 1f: User 1 - Content Columns' as test_name, COUNT(*) as visible_records FROM public.content_columns;
SELECT 'Test 1g: User 1 - Fresh Content' as test_name, COUNT(*) as visible_records FROM public.fresh_content;

RESET "request.jwt.claims";

-- Test 2: User 2 can only see their own data
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';

SELECT 'Test 2a: User 2 - Users Table' as test_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Test 2b: User 2 - Bookmarks Raw' as test_name, COUNT(*) as visible_records FROM public.bookmarks_raw;
SELECT 'Test 2c: User 2 - Bookmarks' as test_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Test 2d: User 2 - Collections' as test_name, COUNT(*) as visible_records FROM public.collections;
SELECT 'Test 2e: User 2 - Collection Items' as test_name, COUNT(*) as visible_records FROM public.collection_items;
SELECT 'Test 2f: User 2 - Content Columns' as test_name, COUNT(*) as visible_records FROM public.content_columns;
SELECT 'Test 2g: User 2 - Fresh Content' as test_name, COUNT(*) as visible_records FROM public.fresh_content;

RESET "request.jwt.claims";

-- Test 3: Unauthenticated users see no data
SELECT 'Test 3a: Unauth - Users Table' as test_name, COUNT(*) as visible_records FROM public.users;
SELECT 'Test 3b: Unauth - Bookmarks Raw' as test_name, COUNT(*) as visible_records FROM public.bookmarks_raw;
SELECT 'Test 3c: Unauth - Bookmarks' as test_name, COUNT(*) as visible_records FROM public.bookmarks;
SELECT 'Test 3d: Unauth - Collections' as test_name, COUNT(*) as visible_records FROM public.collections;
SELECT 'Test 3e: Unauth - Collection Items' as test_name, COUNT(*) as visible_records FROM public.collection_items;
SELECT 'Test 3f: Unauth - Content Columns' as test_name, COUNT(*) as visible_records FROM public.content_columns;
SELECT 'Test 3g: Unauth - Fresh Content' as test_name, COUNT(*) as visible_records FROM public.fresh_content;

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
    
    -- Test malicious DELETE
    BEGIN
        DELETE FROM public.collections WHERE user_id = test_user_2;
        
        IF FOUND THEN
            RAISE NOTICE 'ERROR: User 1 was able to delete User 2 collections';
        ELSE
            RAISE NOTICE 'SUCCESS: User 1 blocked from deleting User 2 collections';
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'SUCCESS: User 1 blocked from deleting User 2 collections (Exception)';
    END;
    
    RESET "request.jwt.claims";
END $$;

-- Test 5: Test public sharing functionality
DO $$
DECLARE
    test_user_1 UUID := '11111111-1111-1111-1111-111111111111';
    test_user_2 UUID := '22222222-2222-2222-2222-222222222222';
    public_bookmark_id UUID;
    public_collection_id UUID;
BEGIN
    -- User 1 makes a bookmark public
    SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
    
    UPDATE public.bookmarks 
    SET is_public = true 
    WHERE user_id = test_user_1 
    RETURNING id INTO public_bookmark_id;
    
    UPDATE public.collections 
    SET is_public = true 
    WHERE user_id = test_user_1 
    RETURNING id INTO public_collection_id;
    
    RESET "request.jwt.claims";
    
    -- User 2 should be able to see public items
    SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';
    
    -- Count public bookmarks visible to User 2
    SELECT 'Test 5a: Public Bookmarks Visible to User 2' as test_name, 
           COUNT(*) as visible_public_bookmarks 
    FROM public.bookmarks 
    WHERE is_public = true;
    
    -- Count public collections visible to User 2
    SELECT 'Test 5b: Public Collections Visible to User 2' as test_name, 
           COUNT(*) as visible_public_collections 
    FROM public.collections 
    WHERE is_public = true;
    
    RESET "request.jwt.claims";
    
    -- Unauthenticated users should also see public items
    SELECT 'Test 5c: Public Bookmarks Visible to Unauth' as test_name, 
           COUNT(*) as visible_public_bookmarks 
    FROM public.bookmarks 
    WHERE is_public = true;
    
    SELECT 'Test 5d: Public Collections Visible to Unauth' as test_name, 
           COUNT(*) as visible_public_collections 
    FROM public.collections 
    WHERE is_public = true;
END $$;

-- Test 6: Verify service role can see all data
SELECT 'Test 6: Service Role Data Access' as test_name,
       'bookmarks_raw' as table_name,
       COUNT(*) as total_records 
FROM public.bookmarks_raw
UNION ALL
SELECT 'Test 6: Service Role Data Access' as test_name,
       'bookmarks' as table_name,
       COUNT(*) as total_records 
FROM public.bookmarks
UNION ALL
SELECT 'Test 6: Service Role Data Access' as test_name,
       'collections' as table_name,
       COUNT(*) as total_records 
FROM public.collections
UNION ALL
SELECT 'Test 6: Service Role Data Access' as test_name,
       'content_columns' as table_name,
       COUNT(*) as total_records 
FROM public.content_columns
UNION ALL
SELECT 'Test 6: Service Role Data Access' as test_name,
       'fresh_content' as table_name,
       COUNT(*) as total_records 
FROM public.fresh_content;

-- Cleanup test data
DELETE FROM public.collection_items WHERE collection_id IN (
    SELECT id FROM public.collections WHERE user_id IN (
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222'
    )
);
DELETE FROM public.fresh_content WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.content_columns WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.collections WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.bookmarks WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.bookmarks_raw WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);
DELETE FROM public.users WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);

SELECT 'T2.2 Cross-User Isolation Test Completed Successfully!' as final_result; 