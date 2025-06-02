-- Custom Telegram Messages Migration for User Filip
-- User ID: e3ef0830-5658-445e-8193-17b28703ebf2
-- Telegram User ID: 7710790237
-- Run this in Supabase SQL Editor to migrate your 5 Telegram messages

-- Step 1: Show what we're about to migrate
SELECT 
    'BEFORE MIGRATION - Current telegram_messages:' as status,
    COUNT(*) as total_messages,
    COUNT(CASE WHEN text IS NOT NULL AND LENGTH(text) > 0 THEN 1 END) as messages_with_text
FROM telegram_messages 
WHERE telegram_user_id = '7710790237';

-- Step 2: Show current bookmarks count
SELECT 
    'BEFORE MIGRATION - Current telegram bookmarks:' as status,
    COUNT(*) as current_telegram_bookmarks
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' 
AND source = 'telegram';

-- Step 3: Perform the migration
INSERT INTO bookmarks (
    user_id,
    source,
    provider_item_id,
    url,
    title,
    description,
    tags,
    created_at,
    updated_at
)
SELECT 
    'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid as user_id,
    'telegram' as source,
    message_id::bigint as provider_item_id,
    NULL as url,
    CASE 
        WHEN LENGTH(text) > 100 THEN LEFT(text, 100) || '...'
        ELSE text
    END as title,
    text as description,
    ARRAY['telegram'] as tags,
    COALESCE(timestamp, NOW()) as created_at,
    NOW() as updated_at
FROM telegram_messages 
WHERE telegram_user_id = '7710790237'
AND text IS NOT NULL 
AND LENGTH(text) > 0
ON CONFLICT (user_id, source, provider_item_id) 
DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

-- Step 4: Show migration results
SELECT 
    'AFTER MIGRATION - Results:' as status,
    COUNT(*) as total_telegram_bookmarks,
    MIN(created_at) as oldest_message,
    MAX(created_at) as newest_message
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' 
AND source = 'telegram';

-- Step 5: Show the migrated messages
SELECT 
    'MIGRATED MESSAGES:' as status,
    provider_item_id as message_id,
    title,
    description,
    created_at
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' 
AND source = 'telegram'
ORDER BY created_at DESC;

-- Step 6: Show what was skipped (messages without text)
SELECT 
    'SKIPPED MESSAGES (no text):' as status,
    message_id,
    text,
    timestamp
FROM telegram_messages 
WHERE telegram_user_id = '7710790237'
AND (text IS NULL OR LENGTH(text) = 0);

-- Summary
SELECT 
    'MIGRATION SUMMARY:' as status,
    (SELECT COUNT(*) FROM telegram_messages WHERE telegram_user_id = '7710790237') as total_found,
    (SELECT COUNT(*) FROM telegram_messages WHERE telegram_user_id = '7710790237' AND text IS NOT NULL AND LENGTH(text) > 0) as migrated,
    (SELECT COUNT(*) FROM telegram_messages WHERE telegram_user_id = '7710790237' AND (text IS NULL OR LENGTH(text) = 0)) as skipped,
    (SELECT COUNT(*) FROM bookmarks WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2' AND source = 'telegram') as final_bookmark_count; 