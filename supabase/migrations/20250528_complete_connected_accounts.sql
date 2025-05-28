-- 20250528_complete_connected_accounts.sql
-- Add any column that might still be missing

alter table public.connected_accounts
  add column if not exists provider_user_id text,
  add column if not exists username        text,
  add column if not exists display_name    text,
  add column if not exists avatar_url      text,
  add column if not exists access_token    text not null,
  add column if not exists refresh_token   text,
  add column if not exists expires_at      timestamptz,
  add column if not exists connected_at    timestamptz not null default now(),
  add column if not exists status          text default 'active',
  add column if not exists last_error      text;

-- Add unique constraint only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'uniq_provider_uid'
    ) THEN
        ALTER TABLE public.connected_accounts
        ADD CONSTRAINT uniq_provider_uid UNIQUE(provider, provider_user_id);
    END IF;
END $$; 