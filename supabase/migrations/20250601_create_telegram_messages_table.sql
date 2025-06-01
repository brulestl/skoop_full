-- Create telegram_messages table for storing synced messages with images
CREATE TABLE telegram_messages (
  id BIGSERIAL PRIMARY KEY,
  telegram_user_id TEXT NOT NULL,
  message_id TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(telegram_user_id, message_id)
);

-- Create indexes for performance
CREATE INDEX idx_telegram_messages_user_id ON telegram_messages(telegram_user_id);
CREATE INDEX idx_telegram_messages_timestamp ON telegram_messages(timestamp);
CREATE INDEX idx_telegram_messages_chat_id ON telegram_messages(chat_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_telegram_messages_updated_at 
  BEFORE UPDATE ON telegram_messages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 