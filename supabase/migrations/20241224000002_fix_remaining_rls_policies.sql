-- Migration: Fix RLS Policies on All Remaining Tables
-- This migration replaces problematic "ALL" policies with specific operation policies
-- and ensures all tables with user_id have proper RLS protection

-- Step 1: Drop existing "ALL" policies that should be split
DROP POLICY IF EXISTS "Users can only access their own data" ON public.users;
DROP POLICY IF EXISTS "Users can only access their own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can only access their own collections" ON public.collections;
DROP POLICY IF EXISTS "Users can only access their own content columns" ON public.content_columns;
DROP POLICY IF EXISTS "Users can only access their own fresh content" ON public.fresh_content;

-- Step 2: Create specific policies for users table
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "users_delete_own" ON public.users
    FOR DELETE USING (auth.uid() = id);

-- Step 3: Create specific policies for bookmarks_raw table
-- (This table was missing policies entirely)
CREATE POLICY "bookmarks_raw_select_own" ON public.bookmarks_raw
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_raw_insert_own" ON public.bookmarks_raw
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_raw_update_own" ON public.bookmarks_raw
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_raw_delete_own" ON public.bookmarks_raw
    FOR DELETE USING (auth.uid() = user_id);

-- Step 4: Create specific policies for bookmarks table
CREATE POLICY "bookmarks_select_own" ON public.bookmarks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_own" ON public.bookmarks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_update_own" ON public.bookmarks
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_own" ON public.bookmarks
    FOR DELETE USING (auth.uid() = user_id);

-- Step 5: Create specific policies for collections table
CREATE POLICY "collections_select_own" ON public.collections
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "collections_insert_own" ON public.collections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "collections_update_own" ON public.collections
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "collections_delete_own" ON public.collections
    FOR DELETE USING (auth.uid() = user_id);

-- Step 6: Fix collection_items policies (needs JOIN-based policy)
DROP POLICY IF EXISTS "Users can only access their own collection items" ON public.collection_items;

CREATE POLICY "collection_items_select_own" ON public.collection_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_items.collection_id 
            AND collections.user_id = auth.uid()
        )
    );

CREATE POLICY "collection_items_insert_own" ON public.collection_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_items.collection_id 
            AND collections.user_id = auth.uid()
        )
    );

CREATE POLICY "collection_items_update_own" ON public.collection_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_items.collection_id 
            AND collections.user_id = auth.uid()
        )
    ) WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_items.collection_id 
            AND collections.user_id = auth.uid()
        )
    );

CREATE POLICY "collection_items_delete_own" ON public.collection_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE collections.id = collection_items.collection_id 
            AND collections.user_id = auth.uid()
        )
    );

-- Step 7: Create specific policies for content_columns table
CREATE POLICY "content_columns_select_own" ON public.content_columns
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "content_columns_insert_own" ON public.content_columns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "content_columns_update_own" ON public.content_columns
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "content_columns_delete_own" ON public.content_columns
    FOR DELETE USING (auth.uid() = user_id);

-- Step 8: Create specific policies for fresh_content table
CREATE POLICY "fresh_content_select_own" ON public.fresh_content
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "fresh_content_insert_own" ON public.fresh_content
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "fresh_content_update_own" ON public.fresh_content
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "fresh_content_delete_own" ON public.fresh_content
    FOR DELETE USING (auth.uid() = user_id);

-- Step 9: Add is_public flag to collections table for future sharing functionality
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'collections' AND column_name = 'is_public') THEN
        ALTER TABLE public.collections ADD COLUMN is_public BOOLEAN DEFAULT false;
        CREATE INDEX idx_collections_is_public ON public.collections(is_public);
    END IF;
END $$;

-- Step 10: Add is_public flag to bookmarks table for future sharing functionality
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookmarks' AND column_name = 'is_public') THEN
        ALTER TABLE public.bookmarks ADD COLUMN is_public BOOLEAN DEFAULT false;
        CREATE INDEX idx_bookmarks_is_public ON public.bookmarks(is_public);
    END IF;
END $$;

-- Step 11: Create policies for public collections (when is_public = true)
CREATE POLICY "collections_select_public" ON public.collections
    FOR SELECT USING (is_public = true);

-- Step 12: Create policies for public bookmarks (when is_public = true)
CREATE POLICY "bookmarks_select_public" ON public.bookmarks
    FOR SELECT USING (is_public = true);

-- Step 13: Verify all tables have RLS enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks_raw ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fresh_content ENABLE ROW LEVEL SECURITY;

-- Step 14: Verification queries
SELECT 
    'Migration Complete - RLS Status' as status,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'users', 'connected_accounts', 'bookmarks', 'bookmarks_raw', 
    'collections', 'collection_items', 'content_columns', 'fresh_content'
)
ORDER BY tablename;

-- Step 15: Count policies per table
SELECT 
    'Policy Count Per Table' as status,
    tablename,
    COUNT(*) as policy_count,
    string_agg(cmd, ', ' ORDER BY cmd) as operations_covered
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename; 