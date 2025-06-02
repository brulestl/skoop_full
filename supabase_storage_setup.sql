-- ✅ 2. Supabase Storage Configuration

-- Create the telegram-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'telegram-images',
    'telegram-images',
    true,  -- publicly accessible
    52428800,  -- 50MB limit per file
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
);

-- Storage policies for the bucket (since you're using Service Role Key)
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'telegram-images');

CREATE POLICY "Service role can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'telegram-images');

CREATE POLICY "Service role can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'telegram-images');

CREATE POLICY "Service role can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'telegram-images'); 