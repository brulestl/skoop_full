-- Create dedicated Reddit posts table for testing
-- This bypasses any constraints from the general bookmarks table

CREATE TABLE IF NOT EXISTS public.reddit_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Reddit specific fields
    reddit_id TEXT NOT NULL, -- Reddit's internal ID like "t3_1kwaes6"
    reddit_kind TEXT NOT NULL, -- "t3" for posts, "t1" for comments
    
    -- Post metadata
    title TEXT, -- Can be very long
    selftext TEXT, -- Post content - can be extremely long
    author TEXT,
    subreddit TEXT,
    subreddit_name_prefixed TEXT,
    
    -- URLs and links
    url TEXT,
    permalink TEXT,
    
    -- Post stats
    score INTEGER DEFAULT 0,
    ups INTEGER DEFAULT 0,
    downs INTEGER DEFAULT 0,
    num_comments INTEGER DEFAULT 0,
    upvote_ratio REAL,
    
    -- Post properties
    is_self BOOLEAN DEFAULT false,
    is_video BOOLEAN DEFAULT false,
    over_18 BOOLEAN DEFAULT false,
    spoiler BOOLEAN DEFAULT false,
    locked BOOLEAN DEFAULT false,
    archived BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_utc BIGINT, -- Reddit timestamp
    edited_utc BIGINT, -- When edited (if edited)
    
    -- Flair and categorization
    link_flair_text TEXT,
    link_flair_css_class TEXT,
    link_flair_background_color TEXT,
    author_flair_text TEXT,
    
    -- Media
    thumbnail TEXT,
    domain TEXT,
    
    -- Raw JSON data for debugging
    raw_json JSONB,
    
    -- Our metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure we don't duplicate Reddit posts for same user
    UNIQUE(user_id, reddit_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reddit_posts_user_id ON public.reddit_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_reddit_posts_reddit_id ON public.reddit_posts(reddit_id);
CREATE INDEX IF NOT EXISTS idx_reddit_posts_subreddit ON public.reddit_posts(subreddit);
CREATE INDEX IF NOT EXISTS idx_reddit_posts_created_at ON public.reddit_posts(created_at);

-- Enable RLS
ALTER TABLE public.reddit_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own reddit posts" ON public.reddit_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reddit posts" ON public.reddit_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reddit posts" ON public.reddit_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reddit posts" ON public.reddit_posts
    FOR DELETE USING (auth.uid() = user_id); 