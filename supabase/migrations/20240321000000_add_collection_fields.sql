-- Add missing fields to collections table for UI compatibility

-- First, ensure collection_items table exists with correct structure
CREATE TABLE IF NOT EXISTS public.collection_items (
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (collection_id, bookmark_id)
);

-- Add description column if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'collections' AND column_name = 'description') THEN
        ALTER TABLE public.collections ADD COLUMN description TEXT;
    END IF;
END $$;

-- Add color column if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'collections' AND column_name = 'color') THEN
        ALTER TABLE public.collections ADD COLUMN color TEXT DEFAULT 'primary' CHECK (color IN ('primary', 'accent', 'destructive', 'secondary'));
    END IF;
END $$;

-- Add pinned column if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'collections' AND column_name = 'pinned') THEN
        ALTER TABLE public.collections ADD COLUMN pinned BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Enable RLS on collection_items if not already enabled
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for collection_items if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'collection_items' 
        AND policyname = 'Users can only access their own collection items'
    ) THEN
        CREATE POLICY "Users can only access their own collection items" ON public.collection_items
            FOR ALL USING (
                EXISTS (
                    SELECT 1 FROM public.collections 
                    WHERE collections.id = collection_items.collection_id 
                    AND collections.user_id = auth.uid()
                )
            );
    END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON public.collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_bookmark_id ON public.collection_items(bookmark_id);
CREATE INDEX IF NOT EXISTS idx_collections_pinned ON public.collections(pinned);
CREATE INDEX IF NOT EXISTS idx_collections_color ON public.collections(color); 