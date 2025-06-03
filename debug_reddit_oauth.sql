-- Debug Reddit OAuth Configuration
-- Run this in Supabase SQL Editor to diagnose the OAuth scope issue

-- 1. Check what Reddit connections exist
SELECT 
    'Reddit Connections' as section,
    user_id,
    provider,
    provider_user_id,
    username,
    status,
    last_error,
    expires_at,
    connected_at,
    last_sync_at,
    CASE 
        WHEN access_token IS NOT NULL THEN 'Has Access Token'
        ELSE 'Missing Access Token'
    END as access_token_status,
    CASE 
        WHEN refresh_token IS NOT NULL THEN 'Has Refresh Token'
        ELSE 'Missing Refresh Token'
    END as refresh_token_status
FROM connected_accounts 
WHERE provider = 'reddit'
ORDER BY connected_at DESC;

-- 2. Check for any Reddit-related errors in sync_history
SELECT 
    'Recent Reddit Sync History' as section,
    provider,
    status,
    items_synced,
    error_message,
    started_at,
    completed_at
FROM sync_history 
WHERE provider = 'reddit'
ORDER BY started_at DESC
LIMIT 10;

-- 3. Check if there are any recent Reddit bookmarks
SELECT 
    'Recent Reddit Bookmarks' as section,
    COUNT(*) as total_reddit_bookmarks,
    MAX(created_at) as latest_bookmark,
    MIN(created_at) as earliest_bookmark
FROM bookmarks 
WHERE source = 'reddit';

-- 4. Check Reddit raw data
SELECT 
    'Reddit Raw Data' as section,
    COUNT(*) as total_raw_records,
    MAX(fetched_at) as latest_fetch,
    MIN(fetched_at) as earliest_fetch
FROM bookmarks_raw 
WHERE source = 'reddit';

-- 5. Show sample Reddit raw data structure (to check if API format changed)
SELECT 
    'Sample Reddit Raw Data' as section,
    jsonb_pretty(raw_json) as sample_data
FROM bookmarks_raw 
WHERE source = 'reddit'
ORDER BY fetched_at DESC
LIMIT 1;

-- 6. Check if there are any Reddit app configuration environment variables
-- Note: This won't show the actual values for security, just confirms they exist
-- You'll need to check these in your Supabase dashboard manually

-- 7. Diagnostic questions to answer:
SELECT 
    'Diagnostic Checklist' as section,
    'Check these items manually:' as instructions,
    '1. Reddit app type: Must be "web app"' as check_1,
    '2. Reddit app redirect URI: Must match exactly' as check_2,
    '3. Reddit app scopes: Must have identity, history, save, read' as check_3,
    '4. Environment variables: REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET must be set' as check_4,
    '5. Token freshness: Check if tokens need to be refreshed' as check_5; 