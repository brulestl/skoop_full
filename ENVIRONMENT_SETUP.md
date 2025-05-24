# Environment Setup for Supabase Authentication

To enable real authentication in your SKOOP application, you need to set up the following environment variables:

## Required Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service role key for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI API Keys (if using AI features)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## How to Get These Values

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Settings → API

2. **Get your Project URL**:
   - Copy the "Project URL" value
   - Set this as `NEXT_PUBLIC_SUPABASE_URL`

3. **Get your Anon Key**:
   - Copy the "anon public" key
   - Set this as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Get your Service Role Key** (optional):
   - Copy the "service_role" key (keep this secret!)
   - Set this as `SUPABASE_SERVICE_ROLE_KEY`

## Database Schema Required

For the authentication to work properly, you need to create a `users` table in your Supabase database:

```sql
-- Create users table
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on public.users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create RLS policies for authenticated users
CREATE POLICY "Users can view self" ON public.users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update self" ON public.users
  FOR UPDATE TO authenticated
  USING (id = auth.uid()) 
  WITH CHECK (id = auth.uid());

-- Note: No INSERT policy needed since the trigger handles profile creation automatically
```

## Updating Database Types

After setting up your database schema, generate TypeScript types:

```bash
# For local development
npx supabase gen types typescript --local > src/types/database.types.ts

# For production
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

## Testing Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Check your email for confirmation (if email confirmation is enabled)
4. Login at `/login`
5. You should be redirected to `/dashboard`

## Troubleshooting

- **"Missing environment variables" error**: Make sure your `.env.local` file is in the project root and contains the required variables
- **TypeScript errors on database operations**: Generate fresh database types after setting up your schema
- **Users not being created**: Check your Supabase logs and ensure the `users` table exists with proper RLS policies
- **Redirects not working**: Ensure your environment variables are properly set and your Next.js app is restarted after adding them 