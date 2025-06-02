# ✅ 3. Field Mapping Guide: What Goes Where

## Telegram Message → Database Mapping

| Telegram Field | Database Location | Notes |
|----------------|-------------------|-------|
| `message.from.id` | `telegram_messages.telegram_user_id` | Convert to string |
| `message.chat.id` | `telegram_messages.chat_id` | Convert to string |
| `message.message_id` | `telegram_messages.message_id` | Convert to string, must be unique |
| `message.text` | `telegram_messages.text` | Nullable, may not exist for media-only messages |
| `message.date` | `telegram_messages.timestamp` | Unix timestamp → PostgreSQL timestamp |
| `message.photo[]` | `telegram_messages.image_urls` | Array of public URLs after upload |

## Image Handling Flow

### 1. Telegram Photo Structure
```json
{
  "photo": [
    {
      "file_id": "AgACAgIAAxkBAAIC...",
      "file_unique_id": "AQADyBQAAuCjSEt4",
      "width": 90,
      "height": 67,
      "file_size": 1253
    },
    {
      "file_id": "AgACAgIAAxkBAAIC...",
      "file_unique_id": "AQADyBQAAuCjSEt4",
      "width": 320,
      "height": 240,
      "file_size": 12045
    }
    // ... more sizes
  ]
}
```

### 2. Processing Steps
1. **Extract largest photo**: Take the last item in `photo[]` array (highest resolution)
2. **Get file path**: Call Telegram's `getFile` API with `file_id`
3. **Download image**: Use `https://api.telegram.org/file/bot{token}/{file_path}`
4. **Upload to Supabase**: Store in `telegram-images` bucket
5. **Generate public URL**: `https://{project}.supabase.co/storage/v1/object/public/telegram-images/{filename}`

### 3. Storage Paths
- **Bucket**: `telegram-images`
- **File naming**: `{telegram_user_id}/{message_id}_{timestamp}_{index}.{ext}`
- **Example**: `123456789/987654321_1703123456_0.jpg`

### 4. Database Storage Options

#### Option A: Simple (using image_urls array)
```sql
-- Store public URLs directly in telegram_messages
UPDATE telegram_messages 
SET image_urls = ARRAY['https://project.supabase.co/storage/v1/object/public/telegram-images/123456789/987654321_1703123456_0.jpg']
WHERE message_id = '987654321';
```

#### Option B: Normalized (using separate images table)
```sql
-- Store detailed metadata in telegram_images table
INSERT INTO telegram_images (
    message_id, telegram_file_id, file_path, storage_path, 
    public_url, file_size, mime_type, width, height
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'AgACAgIAAxkBAAIC...',
    'photos/file_123.jpg',
    'telegram-images/123456789/987654321_1703123456_0.jpg',
    'https://project.supabase.co/storage/v1/object/public/telegram-images/123456789/987654321_1703123456_0.jpg',
    45678,
    'image/jpeg',
    1280,
    720
);
```

## Required Manual Extraction from Telegram API

### 1. File Download URL
- **What**: Actual download URL for images
- **How**: Call `https://api.telegram.org/bot{token}/getFile?file_id={file_id}`
- **Returns**: `{"ok": true, "result": {"file_id": "...", "file_path": "photos/file_123.jpg"}}`
- **Download from**: `https://api.telegram.org/file/bot{token}/{file_path}`

### 2. User Information (Optional)
- **What**: User details like username, first_name, last_name
- **From**: `message.from` object
- **Storage**: Could extend schema with user details if needed

### 3. Forward Information (Optional)
- **What**: Original message details if forwarded
- **From**: `message.forward_from`, `message.forward_date`
- **Storage**: Could add forwarded_from_user_id, forwarded_date fields

## Error Handling Considerations

1. **Missing Images**: Check if `message.photo` exists before processing
2. **Download Failures**: Telegram file URLs expire, handle 404s gracefully
3. **Storage Failures**: Retry logic for Supabase uploads
4. **Duplicate Messages**: Use `message_id` uniqueness constraint to prevent duplicates 