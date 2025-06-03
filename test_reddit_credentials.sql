-- 🔍 VERIFY REDDIT CREDENTIALS IN SUPABASE
-- Run this after updating your environment variables

-- 1. Check if new Reddit connection exists after reconnecting
SELECT 
    'After Reconnection' as status,
    user_id,
    provider_user_id,
    username,
    status,
    connected_at,
    expires_at,
    CASE 
        WHEN expires_at > NOW() THEN '✅ TOKEN VALID'
        ELSE '🔴 TOKEN EXPIRED'
    END as token_status,
    LEFT(access_token, 20) || '...' as token_preview
FROM connected_accounts 
WHERE provider = 'reddit'
ORDER BY connected_at DESC
LIMIT 1;

-- 2. Check if Reddit sync works after reconnection
SELECT 
    'Sync Status' as check_type,
    COUNT(*) as total_syncs,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as successful_syncs,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_syncs,
    MAX(started_at) as latest_sync_attempt
FROM sync_history 
WHERE provider = 'reddit';

-- 3. Check if any Reddit bookmarks were actually fetched
SELECT 
    'Reddit Data' as check_type,
    COUNT(*) as total_bookmarks,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '1 hour') as recent_bookmarks,
    MAX(created_at) as latest_bookmark
FROM bookmarks 
WHERE source = 'reddit'; 