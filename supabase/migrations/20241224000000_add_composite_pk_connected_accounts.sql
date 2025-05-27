-- Migration: Add composite PK to connected_accounts
-- Problem: Table uses user_id as the sole PK/unique; UPSERT on user_id overwrites the row.
-- Solution: Create composite primary key on (user_id, provider) to allow multiple rows per user.

-- Drop the existing primary key constraint
ALTER TABLE connected_accounts
  DROP CONSTRAINT connected_accounts_pkey;

-- Add the new composite primary key
ALTER TABLE connected_accounts
  ADD CONSTRAINT connected_accounts_pkey
    PRIMARY KEY (user_id, provider);

-- Drop the id column since it's no longer needed as primary key
-- Note: We can safely drop this since no other tables reference it
ALTER TABLE connected_accounts
  DROP COLUMN id;

-- The existing UNIQUE(user_id, provider) constraint is now redundant 
-- since the primary key enforces the same uniqueness
-- PostgreSQL will automatically drop the unique constraint when we create the PK 