-- Add column for MTProto session
ALTER TABLE public.connected_accounts
  ADD COLUMN IF NOT EXISTS telegram_session_string TEXT;

-- Index for fast look-ups when provider = telegram
CREATE INDEX IF NOT EXISTS idx_connected_accounts_telegram_session
  ON public.connected_accounts (user_id)
  WHERE provider = 'telegram' AND telegram_session_string IS NOT NULL; 