-- SAFE Database Setup Script for Skoop
-- This version avoids DROP operations to prevent Supabase warnings

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (if they don't exist)
DO $$ BEGIN
    CREATE TYPE user_plan AS ENUM ('free', 'pro', 'team');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE provider_type AS ENUM ('github', 'twitter', 'reddit', 'stack');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE collection_type AS ENUM ('manual', 'ai');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create users table (extends Supabase auth.users) if not exists
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    plan user_plan DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create connected_accounts table if not exists
CREATE TABLE IF NOT EXISTS public.connected_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider provider_type NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

-- Create bookmarks_raw table if not exists
CREATE TABLE IF NOT EXISTS public.bookmarks_raw (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    source provider_type NOT NULL,
    raw_json JSONB NOT NULL,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookmarks table if not exists
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    summary TEXT,
    tags TEXT[],
    vector vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add source column to bookmarks table if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.bookmarks ADD COLUMN source provider_type;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Create collections table if not exists
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type collection_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create collection_items table if not exists
CREATE TABLE IF NOT EXISTS public.collection_items (
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (collection_id, bookmark_id)
);

-- Create content_columns table if not exists
CREATE TABLE IF NOT EXISTS public.content_columns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider provider_type NOT NULL,
    query TEXT NOT NULL,
    label TEXT NOT NULL,
    config JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fresh_content table if not exists
CREATE TABLE IF NOT EXISTS public.fresh_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    column_id UUID REFERENCES public.content_columns(id) ON DELETE CASCADE,
    payload JSONB NOT NULL,
    summary TEXT,
    vector vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_source ON public.bookmarks(source);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_source ON public.bookmarks(user_id, source);
CREATE INDEX IF NOT EXISTS idx_collections_user_id ON public.collections(user_id);
CREATE INDEX IF NOT EXISTS idx_content_columns_user_id ON public.content_columns(user_id);

-- Try to create vector indexes (these might fail if pgvector isn't properly configured)
DO $$ BEGIN
    CREATE INDEX IF NOT EXISTS idx_bookmarks_vector ON public.bookmarks USING ivfflat (vector vector_cosine_ops);
EXCEPTION
    WHEN OTHERS THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX IF NOT EXISTS idx_fresh_content_vector ON public.fresh_content USING ivfflat (vector vector_cosine_ops);
EXCEPTION
    WHEN OTHERS THEN null;
END $$;

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks_raw ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fresh_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (only if they don't exist)
DO $$ BEGIN
    CREATE POLICY "Users can only access their own data" ON public.users
        FOR ALL USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can only access their own connected accounts" ON public.connected_accounts
        FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can only access their own bookmarks" ON public.bookmarks
        FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can only access their own collections" ON public.collections
        FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can only access their own content columns" ON public.content_columns
        FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can only access their own fresh content" ON public.fresh_content
        FOR ALL USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (only if they don't exist)
DO $$ BEGIN
    CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON public.users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_bookmarks_updated_at
        BEFORE UPDATE ON public.bookmarks
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_collections_updated_at
        BEFORE UPDATE ON public.collections
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_content_columns_updated_at
        BEFORE UPDATE ON public.content_columns
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User profile creation trigger (from previous RLS fix)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto user profile creation (only if it doesn't exist)
DO $$ BEGIN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Check if everything was created successfully
SELECT 
    'users' as table_name, 
    count(*) as exists 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'users'
UNION ALL
SELECT 
    'bookmarks' as table_name, 
    count(*) as exists 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'bookmarks'
UNION ALL
SELECT 
    'connected_accounts' as table_name, 
    count(*) as exists 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'connected_accounts';

-- Success message
SELECT 'Database setup completed successfully!' as status; 