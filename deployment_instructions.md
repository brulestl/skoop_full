# 🚀 Supabase Deployment Instructions

## Step 1: Deploy Database Schema

### Option A: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query" button

3. **Run the Schema**
   - Copy the contents of `supabase_schema.sql`
   - Paste into the SQL editor
   - Click "Run" button

4. **Verify Table Creation**
   - Go to "Table Editor" in the left sidebar
   - You should see `telegram_messages` table
   - Check that all columns are present:
     - `id` (uuid, primary key)
     - `telegram_user_id` (text)
     - `chat_id` (text)
     - `message_id` (text, unique)
     - `text` (text, nullable)
     - `timestamp` (timestamp without time zone)
     - `image_urls` (text array)

### Option B: Using Supabase CLI

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link to Your Project**
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

4. **Run Migration**
   ```bash
   supabase db push
   ```

## Step 2: Deploy Storage Bucket

### Using Supabase Dashboard

1. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click "Create a new bucket"

2. **Create Bucket**
   - Bucket name: `telegram-images`
   - Make it public: ✅ Check this box
   - Click "Create bucket"

3. **Configure Policies (Optional)**
   - Go to "SQL Editor"
   - Run the contents of `supabase_storage_setup.sql`

## Step 3: Get Required Keys

### Service Role Key
1. Go to "Settings" → "API"
2. Copy the "service_role" key (keep this secret!)
3. This will be used in your n8n workflow

### Project URL
1. Go to "Settings" → "API"
2. Copy the "Project URL"
3. Format: `https://your-project-id.supabase.co`

## Step 4: Test the Setup

### Test Database Connection
Run this query in SQL Editor to verify:
```sql
-- Test insert
INSERT INTO telegram_messages (
    telegram_user_id, 
    chat_id, 
    message_id, 
    text, 
    timestamp, 
    image_urls
) VALUES (
    '123456789',
    '123456789',
    'test_message_1',
    'Hello, this is a test message!',
    NOW(),
    ARRAY['https://example.com/image1.jpg']
);

-- Test select
SELECT * FROM telegram_messages WHERE message_id = 'test_message_1';

-- Clean up test data
DELETE FROM telegram_messages WHERE message_id = 'test_message_1';
```

### Test Storage Access
1. Go to Storage → telegram-images
2. Try uploading a test image
3. Verify you can access it via public URL

## Step 5: Environment Variables for n8n

Set these in your n8n instance:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Make sure you're using the service_role key, not anon key
   - Check RLS policies if enabled

2. **Table Not Found**
   - Verify the schema was created successfully
   - Check you're in the correct project

3. **Storage Upload Fails**
   - Ensure bucket is public
   - Check storage policies
   - Verify file size limits

### Verification Checklist

- [ ] `telegram_messages` table exists with correct schema
- [ ] Indexes are created
- [ ] `telegram-images` bucket exists and is public
- [ ] Service role key is copied
- [ ] Project URL is noted
- [ ] Test insert/select works
- [ ] Storage upload works

## Next Steps

After successful deployment:

1. Set up your Telegram bot
2. Configure n8n workflow using `n8n_workflow_guide.md`
3. Test the complete flow
4. Monitor logs for any issues

## Security Notes

- Keep your service_role key secret
- Consider enabling RLS policies for production
- Monitor usage and set up alerts
- Regular backup of important data 