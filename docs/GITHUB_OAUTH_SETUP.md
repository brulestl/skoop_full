# GitHub OAuth Setup for SKOOP

## 🔧 **Step 1: Enable GitHub OAuth in Supabase**

### 1. **Access Supabase Dashboard**
1. Go to [your Supabase project dashboard](https://app.supabase.com)
2. Navigate to **Authentication** → **Providers**
3. Find **GitHub** in the list

### 2. **Configure GitHub Provider**
1. **Toggle GitHub to "Enabled"**
2. You'll see fields for:
   - Client ID
   - Client Secret
   - Redirect URL (should be auto-filled)

### 3. **Note the Redirect URL**
Copy the redirect URL shown (should look like):
```
https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
```

---

## 🔧 **Step 2: Create GitHub OAuth App**

### 1. **Go to GitHub Developer Settings**
1. Go to [GitHub.com](https://github.com)
2. Click your profile picture → **Settings**
3. Scroll down to **Developer settings** (left sidebar)
4. Click **OAuth Apps**
5. Click **New OAuth App**

### 2. **Fill in OAuth App Details**
```
Application name: SKOOP
Homepage URL: http://localhost:3000
Application description: AI-powered content aggregation dashboard
Authorization callback URL: [PASTE THE SUPABASE REDIRECT URL FROM STEP 1]
```

### 3. **Create and Get Credentials**
1. Click **Register application**
2. You'll see your **Client ID** (copy this)
3. Click **Generate a new client secret**
4. Copy the **Client Secret** (save it somewhere safe - you can't see it again!)

---

## 🔧 **Step 3: Complete Supabase Setup**

### 1. **Add Credentials to Supabase**
1. Go back to your **Supabase Dashboard** → **Authentication** → **Providers** → **GitHub**
2. Paste your **Client ID** from GitHub
3. Paste your **Client Secret** from GitHub
4. **Click Save**

### 2. **Test the Connection**
Your OAuth is now set up! You can test it by:
1. Going to your dashboard: `http://localhost:3000/dashboard`
2. Click **Profile** tab
3. Click **Connect** next to GitHub
4. You should be redirected to GitHub for authorization

---

## 🚀 **Step 4: Test the Full Flow**

1. **Connect Account**: Click "Connect" next to GitHub in your Profile
2. **Authorize on GitHub**: Allow SKOOP to access your account
3. **Automatic Sync**: Your starred repos should automatically sync
4. **View Results**: Go to "Recent Saves" to see your GitHub stars

---

## 🛠️ **Troubleshooting**

### "OAuth App not approved"
- Make sure the callback URL exactly matches
- Check that the GitHub OAuth app is public (not private)

### "Access token not found"
- Verify the Client ID and Secret are correct
- Make sure GitHub OAuth is enabled in Supabase

### "No stars synced"
- Check browser console for any errors
- Verify you have starred repositories on GitHub
- Try clicking "Sync Now" manually

---

## 🎯 **What Happens After Setup**

✅ **Automatic Import**: Your GitHub stars will automatically appear in Recent Saves  
✅ **Real-time Updates**: New stars will sync when you click "Sync Now"  
✅ **Rich Metadata**: Repository descriptions, topics, and languages are imported  
✅ **Search & Filter**: All your GitHub stars become searchable in SKOOP  

---

## 🔮 **Next Steps**

Once GitHub is working, you can:
1. **Add more providers** (Twitter, Reddit, Stack Overflow)
2. **Set up automatic syncing** (periodic background jobs)
3. **Use AI features** to summarize and organize your content

**Your GitHub stars will now appear in your Recent Saves instead of sample data!** 🎉 