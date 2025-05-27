-- Migration: Enable Row-Level Security on connected_accounts table
-- This protects OAuth tokens from unauthorized access

-- Enable Row-Level Security on the connected_accounts table
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow users to SELECT only their own connected accounts
CREATE POLICY "user_select_own_accounts"
  ON connected_accounts FOR SELECT
  USING (user_id = auth.uid());

-- Policy 2: Allow users to INSERT only their own connected accounts
CREATE POLICY "user_insert_own_accounts"
  ON connected_accounts FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy 3: Allow users to UPDATE only their own connected accounts
CREATE POLICY "user_update_own_accounts"
  ON connected_accounts FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policy 4: Allow users to DELETE only their own connected accounts
CREATE POLICY "user_delete_own_accounts"
  ON connected_accounts FOR DELETE
  USING (user_id = auth.uid());

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'connected_accounts';

-- Show the policies created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'connected_accounts'; 