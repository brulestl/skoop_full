# 🤖 Auto-Sync Feature Setup Guide

## ✅ **What's New**

### **Auto-Sync System**
- **Schedule Options**: Every 15 minutes, Hourly, Daily, or Manual only
- **Background Syncing**: Automatically fetches new GitHub stars based on your schedule  
- **Real-time UI Updates**: New bookmarks appear without manual page refresh
- **Sync History**: Track all automatic and manual sync operations
- **Battery Optimization**: Smart scheduling to minimize resource usage

---

## 🛠️ **Setup Instructions**

### **Step 1: Apply Database Updates**
Run the database migration to add the new tables:

```sql
-- Copy and run the contents of database_updates.sql in your Supabase SQL editor
-- This creates:
-- - user_settings table (sync preferences)
-- - sync_history table (track sync operations)
-- - RLS policies for security
-- - Auto-creation triggers
```

Or run this command if you have Supabase CLI:
```bash
supabase db reset
# Or manually apply the migration:
# supabase db diff --use-migra --schema public
```

### **Step 2: Verify Tables Created**
Check that these tables exist in your Supabase dashboard:
- ✅ `user_settings` - Stores sync preferences per user
- ✅ `sync_history` - Logs all sync operations
- ✅ `bookmarks` table has new `sync_type` column

### **Step 3: Test the System**
1. **Go to Dashboard → Settings → Sync Settings**
2. **Select a sync schedule** (start with "Hourly" for testing)
3. **Enable GitHub** as a platform
4. **Click "Save Changes"**
5. **Check browser console** for auto-sync service messages

---

## 🎯 **How It Works**

### **Auto-Sync Flow**
1. **User sets schedule** in Settings (15min/hourly/daily)
2. **Auto-sync service** runs in background
3. **Fetches new GitHub stars** automatically at scheduled intervals
4. **Updates bookmarks** with `sync_type: 'automatic'`
5. **Logs operation** in sync_history table
6. **UI updates** automatically via event system

### **Manual vs Automatic**
- **Manual Sync**: Triggered by "Sync Now" button, `sync_type: 'manual'`
- **Automatic Sync**: Triggered by schedule, `sync_type: 'automatic'`
- **Initial Sync**: First sync after connecting, `sync_type: 'initial'`

---

## 🧪 **Testing Auto-Sync**

### **Quick Test (15 minutes)**
1. **Set schedule to "Every 15 minutes"**
2. **Star a new repo** on GitHub
3. **Wait 15-20 minutes** (including GitHub API delay)
4. **Check Recent Saves** - new star should appear automatically
5. **Check Sync History** - should show "🤖 Automatic Sync" entry

### **Debugging**
Open browser console to see:
```
Auto-sync service started
Updated auto-sync config for user abc123: 15min schedule, providers: github
Scheduled next auto-sync for user abc123 at 2024-01-01T12:15:00.000Z
Performing auto-sync for user abc123...
Auto-sync completed for user abc123, provider github: 5 items
```

---

## 🎛️ **Settings Options**

### **Sync Schedules**
- **Every 15 minutes**: Most frequent, good for active developers
- **Hourly**: Balanced approach, recommended for most users  
- **Daily**: Minimal battery usage, good for occasional use
- **Manual only**: No automatic syncing (default)

### **Platform Controls**
- **GitHub**: ✅ Fully implemented
- **Twitter**: 🚧 Coming soon
- **Reddit**: 🚧 Coming soon  
- **Stack Overflow**: 🚧 Coming soon

---

## 🐛 **Troubleshooting**

### **Auto-sync not working?**
1. **Check browser console** for error messages
2. **Verify settings saved** - refresh settings page
3. **Check sync history** for failed attempts
4. **Test manual sync** first to ensure API works

### **"Only one bookmark showing"**
This suggests sync isn't working properly. Check:
1. **GitHub connection** in Profile tab
2. **Access token validity** (try reconnecting)
3. **Browser console errors** during sync
4. **API rate limits** (GitHub allows 5000/hour)

### **Database errors?**
- Ensure all SQL migrations applied correctly
- Check RLS policies are enabled
- Verify user has proper database access

---

## 🚀 **Next Steps**

After confirming auto-sync works:
1. **Test different schedules** to find your preference
2. **Star more repos** to test batch syncing
3. **Check battery usage** with different frequencies
4. **Prepare for other platforms** (Twitter, Reddit coming soon)

---

## 📊 **Performance Notes**

- **15-minute sync**: ~96 API calls per day
- **Hourly sync**: ~24 API calls per day  
- **Daily sync**: ~1 API call per day
- **GitHub limit**: 5000 API calls per hour

The system is designed to be efficient and respectful of API limits while keeping your bookmarks fresh! 🎉 