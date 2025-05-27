# T3.1 Profile Name Persistence Test Guide

## Test Objective
Verify that display name edits persist across browser refresh and different devices.

## Prerequisites
- User must be logged in
- Profile component must be accessible at `/dashboard` (Profile tab)

## Test Cases

### Test 1: Basic Display Name Update
1. **Navigate** to Dashboard → Profile tab
2. **Observe** current display name (should show existing name or fallback)
3. **Click** the edit icon (pencil) next to the display name
4. **Enter** a new display name (e.g., "Test User 123")
5. **Click** the green checkmark to save
6. **Verify** success toast appears: "Display name updated successfully!"
7. **Verify** display name immediately updates in UI

**Expected Result**: ✅ Display name updates immediately and shows success message

### Test 2: Browser Refresh Persistence
1. **Complete Test 1** first
2. **Refresh** the browser page (F5 or Ctrl+R)
3. **Wait** for page to fully load
4. **Observe** the display name in the profile section

**Expected Result**: ✅ Display name persists after refresh (shows "Test User 123")

### Test 3: Cross-Device Persistence
1. **Complete Test 1** on Device A
2. **Open** the same application on Device B (different browser/device)
3. **Login** with the same account
4. **Navigate** to Dashboard → Profile tab
5. **Observe** the display name

**Expected Result**: ✅ Display name shows the same value across devices

### Test 4: Edit Cancellation
1. **Click** edit icon next to display name
2. **Change** the text to something different
3. **Click** the red X (cancel) button
4. **Verify** display name reverts to previous value

**Expected Result**: ✅ Changes are discarded, original name restored

### Test 5: Empty Name Handling
1. **Click** edit icon
2. **Clear** all text (empty input)
3. **Try to save** (click green checkmark)
4. **Observe** behavior

**Expected Result**: ✅ Should either prevent saving or show appropriate error

### Test 6: Loading States
1. **Click** edit icon
2. **Enter** new name
3. **Click** save and **quickly observe** the save button
4. **Verify** loading spinner appears briefly

**Expected Result**: ✅ Loading spinner shows during save operation

### Test 7: Error Handling
1. **Disconnect** internet or block database access
2. **Try to update** display name
3. **Observe** error handling

**Expected Result**: ✅ Error message appears, name doesn't update

## Database Verification

### Manual Database Check
```sql
-- Check if display_name is properly stored
SELECT id, email, display_name, full_name, updated_at 
FROM public.users 
WHERE email = 'your-email@example.com';
```

**Expected Result**: ✅ `display_name` column contains the updated value

## Fallback Behavior Testing

### Test 8: Display Name Fallbacks
1. **Clear** display_name in database: `UPDATE public.users SET display_name = NULL WHERE id = 'your-user-id';`
2. **Refresh** the profile page
3. **Observe** what name is displayed

**Expected Result**: ✅ Should fall back to full_name, then email prefix, then "User"

## Success Criteria

All tests must pass for T3.1 to be considered complete:

- ✅ Display name updates persist across browser refresh
- ✅ Display name updates persist across different devices
- ✅ Loading states work correctly
- ✅ Error handling works appropriately
- ✅ Cancel functionality works
- ✅ Database storage is working
- ✅ Fallback behavior is correct

## Implementation Notes

- Uses `public.users.display_name` column for persistence
- Replaces localStorage-based approach
- Includes proper RLS security
- Real-time updates across sessions
- Proper error handling and loading states 