-- Diagnostic Script: User Settings Trigger Issue
-- This script identifies and optionally fixes the problematic trigger

-- Step 1: Check if user_settings table exists
SELECT 'Step 1: Check user_settings table' as step;
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_settings'
) as user_settings_exists;

-- Step 2: Check foreign key constraints on user_settings
SELECT 'Step 2: Foreign key constraints' as step;
SELECT 
    conname as constraint_name,
    conrelid::regclass as table_name,
    confrelid::regclass as referenced_table
FROM pg_constraint 
WHERE conname LIKE '%user_settings%'
AND contype = 'f';

-- Step 3: Check triggers on users table
SELECT 'Step 3: Triggers on users table' as step;
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users'
AND event_object_schema = 'public';

-- Step 4: Check the problematic function
SELECT 'Step 4: Function definition' as step;
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines 
WHERE routine_name LIKE '%user_settings%'
AND routine_schema = 'public';

-- Step 5: Proposed fix - Drop the problematic trigger temporarily
SELECT 'Step 5: Proposed Fix' as step;
SELECT 'The following commands can fix the trigger issue:' as recommendation;

-- Uncomment the following lines to actually apply the fix:
/*
-- Option 1: Drop the problematic trigger entirely
DROP TRIGGER IF EXISTS create_user_settings_trigger ON public.users;

-- Option 2: Fix the trigger function to handle the constraint properly
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user_settings only if the user record exists and no settings exist yet
    INSERT INTO public.user_settings (user_id)
    SELECT NEW.id
    WHERE EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id)
    AND NOT EXISTS (SELECT 1 FROM public.user_settings WHERE user_id = NEW.id);
    
    RETURN NEW;
EXCEPTION
    WHEN foreign_key_violation THEN
        -- Ignore foreign key violations - the user might not be committed yet
        RETURN NEW;
    WHEN unique_violation THEN
        -- Ignore unique violations - settings already exist
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;
*/

SELECT 'Run the commented commands above to fix the trigger issue' as instruction; 