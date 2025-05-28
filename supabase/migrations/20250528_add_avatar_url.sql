-- Add nullable avatar URL for all providers
alter table public.connected_accounts
  add column if not exists avatar_url text;

comment on column public.connected_accounts.avatar_url
  is 'Full URL to provider profile avatar'; 