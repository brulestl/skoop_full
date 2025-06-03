-- 🔍 REDDIT OAUTH DEBUGGING - Run these queries one by one in Supabase SQL Editor

-- 1. Check if ANY Reddit connections exist
SELECT 
    COUNT(*) as total_reddit_connections,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_connections,
    COUNT(CASE WHEN access_token IS NOT NULL THEN 1 END) as connections_with_token
FROM connected_accounts 
WHERE provider = 'reddit';

-- 2. Show actual Reddit connection details (tokens will be hidden for security)
SELECT 
    user_id,
    provider_user_id,
    username,
    status,
    last_error,
    connected_at,
    last_sync_at,
    expires_at,
    LENGTH(access_token) as token_length,
    LEFT(access_token, 10) || '...' as token_preview,
    CASE 
        WHEN expires_at < NOW() THEN '🔴 EXPIRED'
        WHEN expires_at > NOW() THEN '✅ VALID'
        ELSE '❓ NO EXPIRY SET'
    END as token_status
FROM connected_accounts 
WHERE provider = 'reddit'
ORDER BY connected_at DESC;

-- 3. Check sync history for Reddit
SELECT 
    status,
    error_message,
    items_synced,
    started_at,
    completed_at
FROM sync_history 
WHERE provider = 'reddit'
ORDER BY started_at DESC
LIMIT 5;

-- 4. Check if user has any Reddit bookmarks at all
SELECT 
    COUNT(*) as reddit_bookmarks_count,
    MAX(created_at) as latest_reddit_bookmark
FROM bookmarks 
WHERE source = 'reddit';

-- 5. Check recent Reddit raw data
SELECT 
    COUNT(*) as reddit_raw_count,
    MAX(fetched_at) as latest_reddit_fetch
FROM bookmarks_raw 
WHERE source = 'reddit'; 