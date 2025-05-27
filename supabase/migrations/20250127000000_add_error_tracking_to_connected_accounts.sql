-- Migration: Add error tracking fields to connected_accounts table
-- Epic T5.1: Add try/catch & error surface

-- Add status field to track connection health
ALTER TABLE public.connected_accounts 
ADD COLUMN status TEXT DEFAULT 'active' CHECK (status IN ('active', 'error', 'expired'));

-- Add last_error field to store error messages
ALTER TABLE public.connected_accounts 
ADD COLUMN last_error TEXT;

-- Add last_sync_at field to track when sync was last attempted
ALTER TABLE public.connected_accounts 
ADD COLUMN last_sync_at TIMESTAMPTZ;

-- Add index for efficient status queries
CREATE INDEX idx_connected_accounts_status ON public.connected_accounts(status);

-- Update existing records to have 'active' status
UPDATE public.connected_accounts SET status = 'active' WHERE status IS NULL; 