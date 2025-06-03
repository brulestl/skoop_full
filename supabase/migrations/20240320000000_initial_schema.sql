-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_plan AS ENUM ('free', 'pro', 'team');
CREATE TYPE provider_type AS ENUM ('github', 'twitter', 'reddit', 'stack');
CREATE TYPE collection_type AS ENUM ('manual', 'ai');

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    plan user_plan DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create connected_accounts table
CREATE TABLE public.connected_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider provider_type NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

-- Create bookmarks_raw table
CREATE TABLE public.bookmarks_raw (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    source provider_type NOT NULL,
    raw_json JSONB NOT NULL,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
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

-- Create collections table
CREATE TABLE public.collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type collection_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create collection_items table
CREATE TABLE public.collection_items (
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (collection_id, bookmark_id)
);

-- Create content_columns table
CREATE TABLE public.content_columns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider provider_type NOT NULL,
    query TEXT NOT NULL,
    label TEXT NOT NULL,
    config JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fresh_content table
CREATE TABLE public.fresh_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    column_id UUID REFERENCES public.content_columns(id) ON DELETE CASCADE,
    payload JSONB NOT NULL,
    summary TEXT,
    vector vector(1536),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_vector ON public.bookmarks USING ivfflat (vector vector_cosine_ops);
CREATE INDEX idx_fresh_content_vector ON public.fresh_content USING ivfflat (vector vector_cosine_ops);
CREATE INDEX idx_collections_user_id ON public.collections(user_id);
CREATE INDEX idx_content_columns_user_id ON public.content_columns(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks_raw ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fresh_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can only access their own data" ON public.users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only access their own connected accounts" ON public.connected_accounts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own collections" ON public.collections
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own content columns" ON public.content_columns
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own fresh content" ON public.fresh_content
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own bookmarks_raw" ON public.bookmarks_raw
    FOR ALL USING (auth.uid() = user_id);

-- Create functions for updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookmarks_updated_at
    BEFORE UPDATE ON public.bookmarks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
    BEFORE UPDATE ON public.collections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_columns_updated_at
    BEFORE UPDATE ON public.content_columns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 