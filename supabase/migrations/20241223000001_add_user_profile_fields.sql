-- Add missing profile fields to users table
-- Run this migration to add display_name, bio, and avatar_url fields

-- Add display_name column if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.users ADD COLUMN display_name TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add bio column if it doesn't exist  
DO $$ BEGIN
    ALTER TABLE public.users ADD COLUMN bio TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add avatar_url column if it doesn't exist
DO $$ BEGIN
    ALTER TABLE public.users ADD COLUMN avatar_url TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add full_name column if it doesn't exist (from the trigger migration)
DO $$ BEGIN
    ALTER TABLE public.users ADD COLUMN full_name TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Update the existing trigger function to include display_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, display_name, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email::text),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql; 