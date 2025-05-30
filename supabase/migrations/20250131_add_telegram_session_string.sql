-- Add telegram_session_string column to connected_accounts table
-- This column stores the Telegram MTProto session string needed for API access

-- Add telegram_session_string field to connected_accounts
ALTER TABLE connected_accounts 
ADD COLUMN IF NOT EXISTS telegram_session_string TEXT;

-- Add index for efficient telegram session lookups
CREATE INDEX IF NOT EXISTS idx_connected_accounts_telegram_session 
ON connected_accounts(user_id, provider) 
WHERE provider = 'telegram' AND telegram_session_string IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN connected_accounts.telegram_session_string IS 'Stores Telegram MTProto session string for API access to saved messages'; 