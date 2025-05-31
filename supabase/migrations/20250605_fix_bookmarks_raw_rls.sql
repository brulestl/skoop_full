-- Fix missing RLS policy for bookmarks_raw table
-- This table had RLS enabled but no policy, blocking all access

CREATE POLICY "Users can only access their own raw bookmarks" ON public.bookmarks_raw
    FOR ALL USING (auth.uid() = user_id); 