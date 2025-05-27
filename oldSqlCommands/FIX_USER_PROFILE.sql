-- Fix Missing User Profile and Re-create Bookmark
-- Run this in your Supabase SQL Editor

-- 1. Insert the missing user profile for your authenticated user
INSERT INTO public.users (
    id,
    email,
    full_name,
    avatar_url,
    created_at,
    updated_at
) 
VALUES (
    'b108adb4-f86f-4196-a389-f3c5395dc1a2',  -- Your current user ID
    'bruce.lee.stl@gmail.com',                -- Your email
    'Filip Jankovic',                         -- Your name
    'https://avatars.githubusercontent.com/u/204193073?v=4',  -- Your avatar
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();

-- 2. Re-create the bookmark with the correct user ID
INSERT INTO public.bookmarks (
    user_id,
    url,
    title,
    description,
    source,
    tags,
    created_at
) 
VALUES (
    'b108adb4-f86f-4196-a389-f3c5395dc1a2',  -- Your correct user ID
    'https://github.com/dotnetcore/BootstrapBlazor',
    'Bootstrap Blazor Component',
    'Bootstrap Blazor is an enterprise-level UI component library based on Bootstrap and Blazor.',
    'github'::provider_type,
    ARRAY['bootstrap', 'blazor', 'ui', 'components'],
    NOW()
)
ON CONFLICT (user_id, url) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

-- 3. Verify the fix
SELECT 'User Profile Created:' as status, * FROM public.users WHERE id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';
SELECT 'Bookmarks for User:' as status, * FROM public.bookmarks WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2'; 