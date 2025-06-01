-- Create telegram-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'telegram-images',
  'telegram-images', 
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload telegram images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'telegram-images');

-- Create storage policy to allow public read access
CREATE POLICY "Public read access for telegram images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'telegram-images');

-- Create storage policy to allow users to update their own images
CREATE POLICY "Users can update their own telegram images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'telegram-images');

-- Create storage policy to allow users to delete their own images
CREATE POLICY "Users can delete their own telegram images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'telegram-images'); 