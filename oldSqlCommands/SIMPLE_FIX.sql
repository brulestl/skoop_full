-- Simple Fix: Insert User Profile and Bookmark
-- Run this in your Supabase SQL Editor

-- 1. Insert the missing user profile (will fail if already exists, which is fine)
INSERT INTO public.users (
    id,
    email,
    full_name,
    avatar_url,
    created_at,
    updated_at
) 
VALUES (
    'b108adb4-f86f-4196-a389-f3c5395dc1a2',
    'bruce.lee.stl@gmail.com',
    'Filip Jankovic',
    'https://avatars.githubusercontent.com/u/204193073?v=4',
    NOW(),
    NOW()
);

-- 2. Insert the bookmark
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
    'b108adb4-f86f-4196-a389-f3c5395dc1a2',
    'https://github.com/dotnetcore/BootstrapBlazor',
    'Bootstrap Blazor Component',
    'Bootstrap Blazor is an enterprise-level UI component library based on Bootstrap and Blazor.',
    'github'::provider_type,
    ARRAY['bootstrap', 'blazor', 'ui', 'components'],
    NOW()
);

-- 3. Verify the results
SELECT 'User created:' as result, id, email, full_name FROM public.users WHERE id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2';
SELECT 'Bookmark created:' as result, id, title, url FROM public.bookmarks WHERE user_id = 'b108adb4-f86f-4196-a389-f3c5395dc1a2'; 