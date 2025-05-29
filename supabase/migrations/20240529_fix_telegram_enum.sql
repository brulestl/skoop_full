-- Fix Telegram enum - add to provider_type (not provider_enum)
ALTER TYPE provider_type ADD VALUE IF NOT EXISTS 'telegram';

-- Ensure telegram_session_string field exists in connected_accounts
ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS telegram_session_string TEXT; 