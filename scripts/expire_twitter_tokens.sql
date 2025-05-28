-- Script to expire existing Twitter tokens for scope upgrade
-- This forces users to re-authenticate with the new bookmark.read scope

UPDATE connected_accounts
SET 
  status = 'expired',
  last_error = 'scope_upgrade',
  updated_at = NOW()
WHERE provider = 'twitter'
  AND status = 'active';

-- Verify the update
SELECT 
  user_id,
  provider,
  status,
  last_error,
  updated_at
FROM connected_accounts 
WHERE provider = 'twitter'
ORDER BY updated_at DESC; 