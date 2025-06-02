-- ✅ 1. Supabase Table Schema (Simplified Version)
-- Main telegram_messages table
CREATE TABLE public.telegram_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    telegram_user_id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    message_id TEXT NOT NULL UNIQUE,
    text TEXT,
    timestamp TIMESTAMP WITHOUT TIME ZONE,
    image_urls TEXT[]
);

-- Indexes for better performance
CREATE INDEX idx_telegram_messages_user_id ON telegram_messages(telegram_user_id);
CREATE INDEX idx_telegram_messages_chat_id ON telegram_messages(chat_id);
CREATE INDEX idx_telegram_messages_message_id ON telegram_messages(message_id);
CREATE INDEX idx_telegram_messages_timestamp ON telegram_messages(timestamp);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE telegram_messages ENABLE ROW LEVEL SECURITY;

-- Since you're using Service Role Key, you might want policies like:
-- CREATE POLICY "Service role can do everything" ON telegram_messages FOR ALL USING (true);

-- Optional: Future extension table (commented out for now)
-- CREATE TABLE telegram_images (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--     message_id UUID REFERENCES telegram_messages(id) ON DELETE CASCADE,
--     telegram_file_id TEXT NOT NULL,
--     file_path TEXT NOT NULL,
--     storage_path TEXT NOT NULL,
--     public_url TEXT NOT NULL,
--     file_size INTEGER,
--     mime_type TEXT,
--     width INTEGER,
--     height INTEGER,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- ); 