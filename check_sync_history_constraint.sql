-- Check sync_history table constraint to understand status values
SELECT
  tc.constraint_name,
  tc.constraint_type,
  cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
  AND tc.table_name = 'sync_history'
  AND tc.constraint_type = 'CHECK'
  AND tc.constraint_name LIKE '%status%';

-- Also check the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'sync_history'
ORDER BY ordinal_position;

-- Check if sync_history table even exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'sync_history'
    ) THEN '✅ sync_history table exists'
    ELSE '❌ sync_history table does not exist'
  END as table_status; 