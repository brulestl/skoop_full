# T3.2 Settings Toggles Persistence Test Guide

## Test Objective
Verify that all settings toggles persist to the database and remain after browser refresh.

## Prerequisites
- User must be logged in
- Settings page must be accessible at `/dashboard` (Settings tab)
- Database migration `20241224000003_create_user_settings_table.sql` must be applied

## Test Cases

### Test 1: Performance Settings Persistence
1. **Navigate** to Dashboard → Settings → Performance tab
2. **Toggle** "Background Sync" OFF (if currently ON)
3. **Toggle** "Aggressive Prefetch" ON (if currently OFF)
4. **Toggle** "Data Saving Mode" ON (if currently OFF)
5. **Hard refresh** the browser (Ctrl+F5 or Cmd+Shift+R)
6. **Navigate** back to Settings → Performance tab
7. **Verify** all toggles remain in their new positions

**Expected Result**: ✅ All performance toggles persist across browser refresh

### Test 2: Notification Settings Persistence
1. **Navigate** to Dashboard → Settings → Notifications tab
2. **Toggle** "Sync Completed" OFF (if currently ON)
3. **Toggle** "New Content Recommendations" ON (if currently OFF)
4. **Toggle** "Email Notifications" OFF (if currently ON)
5. **Hard refresh** the browser (Ctrl+F5 or Cmd+Shift+R)
6. **Navigate** back to Settings → Notifications tab
7. **Verify** all toggles remain in their new positions

**Expected Result**: ✅ All notification toggles persist across browser refresh

### Test 3: AI Model Settings Persistence
1. **Navigate** to Dashboard → Settings → AI Models tab
2. **Change** AI model from "Claude (Anthropic)" to "GPT-4o (OpenAI)"
3. **Toggle** "Smart Search" OFF (if currently ON)
4. **Toggle** "Auto-categorization" OFF (if currently ON)
5. **Hard refresh** the browser (Ctrl+F5 or Cmd+Shift+R)
6. **Navigate** back to Settings → AI Models tab
7. **Verify** model selection and toggles remain in their new positions

**Expected Result**: ✅ AI model selection and toggles persist across browser refresh

### Test 4: Embedding Model Settings Persistence
1. **Navigate** to Dashboard → Settings → Embedding Model tab
2. **Change** embedding model from "OpenAI - text-embedding-3" to "OpenAI - text-embedding-ada-002"
3. **Change** vector dimensions from "1536 dimensions" to "768 dimensions"
4. **Change** re-embedding schedule from "Never re-embed" to "Monthly"
5. **Toggle** "Enable document chunking" OFF (if currently ON)
6. **Hard refresh** the browser (Ctrl+F5 or Cmd+Shift+R)
7. **Navigate** back to Settings → Embedding Model tab
8. **Verify** all selections remain in their new positions

**Expected Result**: ✅ All embedding settings persist across browser refresh

### Test 5: Database Verification
1. **Open** browser developer tools → Network tab
2. **Navigate** to Settings → Performance tab
3. **Toggle** any setting (e.g., "Background Sync")
4. **Check** Network tab for API calls to `/api/user_settings` or similar
5. **Verify** the request shows the updated setting value

**Expected Result**: ✅ Settings changes trigger database updates via API calls

### Test 6: Cross-Device Persistence
1. **Change** several settings on Device A (desktop browser)
2. **Log in** to the same account on Device B (mobile browser or different computer)
3. **Navigate** to Settings pages
4. **Verify** all settings match those set on Device A

**Expected Result**: ✅ Settings sync across different devices/browsers

## Database Verification (Optional)

If you have database access, you can verify the settings are stored correctly:

```sql
-- Check user_settings table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'user_settings' 
ORDER BY ordinal_position;

-- Check your user's settings
SELECT * FROM user_settings WHERE user_id = 'YOUR_USER_ID';
```

## Troubleshooting

### Settings Don't Persist
- Check browser console for JavaScript errors
- Verify network requests are successful (200 status)
- Check if user_settings table exists in database
- Verify RLS policies allow user to update their own settings

### Toggles Don't Update
- Check if `useUserSettings` hook is properly imported
- Verify individual update functions are called on toggle change
- Check for TypeScript errors in the console

### Loading States
- Settings should show loading spinner while fetching
- Toggles should be disabled while updating
- Error messages should appear if updates fail

## Success Criteria
- ✅ All settings toggles persist across browser refresh
- ✅ Settings sync across different devices
- ✅ Database contains updated values
- ✅ UI shows loading states during updates
- ✅ Error handling works for failed updates 