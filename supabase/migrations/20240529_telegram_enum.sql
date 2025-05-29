-- Add Telegram values to existing enums
ALTER TYPE provider_enum ADD VALUE IF NOT EXISTS 'telegram';
ALTER TYPE source_enum ADD VALUE IF NOT EXISTS 'telegram_saved';

-- Add telegram_session_string field to connected_accounts
ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS telegram_session_string TEXT; 