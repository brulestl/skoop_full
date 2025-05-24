# RLS Fix Summary - Profile Row Creation

## Problem
The front-end signup form was trying to manually insert a row into `public.users` after user creation, but this violated Row Level Security (RLS) policies:

```
new row violates row-level security policy for table "users"
```

## Solution
Implemented a **database trigger approach** that automatically creates user profiles when new users sign up, eliminating the need for front-end profile creation and RLS violations.

## Changes Made

### 1. Database Migration (`supabase/migrations/20241201700_users_profile_trigger.sql`)

- **Enabled RLS** on `public.users` table
- **Created trigger function** `handle_new_user()` that:
  - Automatically inserts profile rows when users are created in `auth.users`
  - Extracts `full_name` from user metadata
  - Uses `ON CONFLICT DO NOTHING` for safety
  - Runs with `SECURITY DEFINER` to bypass RLS during profile creation

- **Created trigger** `on_auth_user_created` that fires `AFTER INSERT` on `auth.users`

- **Set up proper RLS policies**:
  - `Users can view self` - SELECT permission for own profile
  - `Users can update self` - UPDATE permission for own profile
  - **No INSERT policy** - trigger handles creation automatically

### 2. Frontend Changes (`src/components/auth/signup-form.tsx`)

- **Removed manual profile creation code** that was causing RLS violations
- **Simplified signup flow** - just calls `supabase.auth.signUp()`
- **Trigger handles the rest** - profile creation is now automatic and secure

### 3. Documentation Updates (`ENVIRONMENT_SETUP.md`)

- Updated database schema documentation to include the trigger setup
- Removed references to manual INSERT policies
- Added clear explanation of the trigger-based approach

## Benefits

1. **Security**: No more RLS violations - profile creation happens at the database level
2. **Reliability**: Profile creation is guaranteed for every new user
3. **Simplicity**: Front-end code is cleaner and simpler
4. **Performance**: No extra round-trip to create profiles
5. **Atomicity**: User and profile creation happen in the same transaction

## Migration Instructions

1. **Apply the migration**:
   ```bash
   npx supabase db reset
   # or for production:
   npx supabase db push
   ```

2. **Generate new types** (after applying migration):
   ```bash
   npx supabase gen types typescript --local > src/types/database.types.ts
   ```

3. **Test signup flow**:
   - Create a new account via `/signup`
   - Check that user profile is automatically created in `public.users`
   - Verify login and dashboard access work properly

## Troubleshooting

- **Migration fails**: Ensure you have proper database permissions
- **Trigger not firing**: Check Supabase logs for trigger execution
- **Profile not created**: Verify the trigger function exists and is properly configured
- **RLS still blocking**: Ensure the new policies are active and old ones are dropped 