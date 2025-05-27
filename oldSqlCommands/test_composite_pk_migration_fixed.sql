-- Fixed Test Script for Composite Primary Key Migration
-- This script uses proper UUID generation to avoid format errors
-- Run this in Supabase SQL Editor after applying the migration

-- Generate a proper test UUID
DO $$
DECLARE
    test_user_uuid UUID := gen_random_uuid();
    test_email TEXT := 'composite-pk-test-' || extract(epoch from now()) || '@example.com';
BEGIN
    -- Step 1: Clean up any existing test data first
    RAISE NOTICE 'Using test UUID: %', test_user_uuid;
    
    -- Step 2: Create a test user with proper UUID
    INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
    VALUES (
        test_user_uuid,
        test_email,
        NOW(),
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.users (id, email)
    VALUES (
        test_user_uuid,
        test_email
    ) ON CONFLICT (id) DO NOTHING;

    -- Step 3: Test inserting multiple connected accounts for the same user
    -- Insert GitHub account
    INSERT INTO public.connected_accounts (
        user_id,
        provider,
        access_token,
        refresh_token
    ) VALUES (
        test_user_uuid,
        'github'::provider_type,
        'github_access_token_123',
        'github_refresh_token_123'
    );

    -- Insert Twitter account for the same user
    INSERT INTO public.connected_accounts (
        user_id,
        provider,
        access_token,
        refresh_token
    ) VALUES (
        test_user_uuid,
        'twitter'::provider_type,
        'twitter_access_token_456',
        'twitter_refresh_token_456'
    );

    -- Insert Reddit account for the same user
    INSERT INTO public.connected_accounts (
        user_id,
        provider,
        access_token
    ) VALUES (
        test_user_uuid,
        'reddit'::provider_type,
        'reddit_access_token_789'
    );

    -- Step 4: Verify all accounts were inserted successfully
    RAISE NOTICE 'Step 4: Verifying multiple accounts inserted';
    PERFORM * FROM public.connected_accounts WHERE user_id = test_user_uuid;
    
    IF (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid) = 3 THEN
        RAISE NOTICE 'SUCCESS: All 3 accounts inserted correctly';
    ELSE
        RAISE EXCEPTION 'FAILED: Expected 3 accounts, found %', (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid);
    END IF;

    -- Step 5: Test UPSERT behavior (should update existing record, not create duplicate)
    INSERT INTO public.connected_accounts (
        user_id,
        provider,
        access_token,
        refresh_token
    ) VALUES (
        test_user_uuid,
        'github'::provider_type,
        'github_access_token_updated',
        'github_refresh_token_updated'
    ) ON CONFLICT (user_id, provider) 
    DO UPDATE SET 
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        updated_at = NOW();

    -- Step 6: Verify the GitHub account was updated, not duplicated
    IF (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid) = 3 THEN
        RAISE NOTICE 'SUCCESS: UPSERT updated existing record without creating duplicate';
    ELSE
        RAISE EXCEPTION 'FAILED: UPSERT created duplicate, found % accounts', (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid);
    END IF;

    -- Step 7: Test that we cannot insert duplicate (user_id, provider) combinations
    BEGIN
        INSERT INTO public.connected_accounts (
            user_id,
            provider,
            access_token
        ) VALUES (
            test_user_uuid,
            'github'::provider_type,
            'duplicate_attempt'
        );
        RAISE EXCEPTION 'ERROR: Duplicate insert should have failed!';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE 'SUCCESS: Duplicate insert correctly prevented by composite PK';
    END;

    -- Step 8: Final verification
    IF (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid) = 3 THEN
        RAISE NOTICE 'SUCCESS: Composite PK migration working correctly - 3 accounts maintained';
    ELSE
        RAISE EXCEPTION 'FAILED: Expected 3 accounts in final check, found %', (SELECT COUNT(*) FROM public.connected_accounts WHERE user_id = test_user_uuid);
    END IF;

    -- Step 9: Clean up test data
    DELETE FROM public.connected_accounts WHERE user_id = test_user_uuid;
    DELETE FROM public.users WHERE id = test_user_uuid;
    -- Note: We don't delete from auth.users as it might be managed by Supabase Auth

    RAISE NOTICE 'Composite Primary Key Migration Test Completed Successfully!';
END $$; 