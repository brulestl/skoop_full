-- Add Facebook values to existing enums
ALTER TYPE provider_enum ADD VALUE IF NOT EXISTS 'facebook';
ALTER TYPE source_enum ADD VALUE IF NOT EXISTS 'facebook_saved'; 