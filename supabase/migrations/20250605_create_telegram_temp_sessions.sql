-- Create table for temporary Telegram authentication sessions
CREATE TABLE telegram_temp_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  temp_session TEXT NOT NULL,
  phone_code_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(user_id)
);

-- Index for cleanup of expired sessions
CREATE INDEX idx_telegram_temp_sessions_expires_at 
ON telegram_temp_sessions(expires_at);

-- RLS policy to ensure users can only access their own temp sessions
ALTER TABLE telegram_temp_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own temp sessions" 
ON telegram_temp_sessions FOR ALL 
USING (auth.uid() = user_id);

-- Comment for documentation
COMMENT ON TABLE telegram_temp_sessions IS 'Stores temporary Telegram authentication sessions during phone verification process'; 