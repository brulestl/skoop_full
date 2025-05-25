-- Test Bookmark Insert Script
-- Run this after you've logged into your app to add a test bookmark

-- First, check if you have a user profile
SELECT id, email FROM public.users LIMIT 5;

-- Insert a test bookmark (replace the user_id with your actual user ID from above)
-- You can find your user ID by looking at the results of the query above
INSERT INTO public.bookmarks (
    user_id,
    url,
    title,
    description,
    source,
    tags
) 
VALUES (
    (SELECT id FROM public.users LIMIT 1),  -- This uses the first user ID found
    'https://github.com/dotnetcore/BootstrapBlazor',
    'Bootstrap Blazor Component',
    'Bootstrap Blazor is an enterprise-level UI component library based on Bootstrap and Blazor.',
    'github'::provider_type,
    ARRAY['bootstrap', 'blazor', 'ui', 'component']
);

-- Verify the bookmark was inserted
SELECT 
    id, 
    title, 
    url, 
    source, 
    created_at 
FROM public.bookmarks 
ORDER BY created_at DESC 
LIMIT 5; 