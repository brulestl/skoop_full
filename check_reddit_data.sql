-- Check Reddit posts in reddit_posts table
SELECT 
    'reddit_posts' as table_name,
    COUNT(*) as count,
    array_agg(reddit_id) as reddit_ids,
    array_agg(title) as titles
FROM reddit_posts 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid;

-- Check if any Reddit data exists in bookmarks table
SELECT 
    'bookmarks' as table_name,
    COUNT(*) as count,
    array_agg(source) as sources,
    array_agg(title) as titles
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid
AND source = 'reddit';

-- Check all bookmarks for this user (to see existing data)
SELECT 
    'all_bookmarks' as table_name,
    source,
    COUNT(*) as count
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid
GROUP BY source
ORDER BY source;

-- Test if reddit_posts table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'reddit_posts'
) as reddit_posts_table_exists; 