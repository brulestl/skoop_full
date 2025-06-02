# ✅ 4. n8n Workflow Design Guide

## Workflow Overview
```
Telegram Callback Query → Extract Message Data → Process Images → Send to Supabase Edge Function
```

## Step-by-Step n8n Workflow

### 1. Trigger: Telegram Callback Query
**Node Type**: `Telegram Trigger`
**Configuration**:
```json
{
  "updates": ["callback_query"],
  "additionalFields": {}
}
```

**What it receives**: When user clicks "Sync" button, you get:
```json
{
  "callback_query": {
    "id": "123456789",
    "from": { "id": 987654321, "username": "user123" },
    "message": {
      "message_id": 456,
      "from": { "id": 123456789, "is_bot": true },
      "chat": { "id": 987654321, "type": "private" },
      "date": 1703123456,
      "text": "Original message text",
      "photo": [...]  // if image exists
    },
    "data": "sync_message"
  }
}
```

### 2. Extract Message Data
**Node Type**: `Set`
**Purpose**: Clean and structure the Telegram data

```javascript
// Extract basic message info
const message = $json.callback_query.message;
const callbackQuery = $json.callback_query;

return {
  telegram_user_id: message.chat.id.toString(),
  chat_id: message.chat.id.toString(),
  message_id: message.message_id.toString(),
  text: message.text || null,
  timestamp: new Date(message.date * 1000).toISOString(),
  has_photo: !!(message.photo && message.photo.length > 0),
  photo_data: message.photo || [],
  callback_query_id: callbackQuery.id
};
```

### 3. Conditional: Check for Images
**Node Type**: `IF`
**Condition**: `{{ $json.has_photo === true }}`

#### Branch A: No Images
**Node Type**: `Set`
```javascript
return {
  telegram_user_id: $json.telegram_user_id,
  chat_id: $json.chat_id,
  message_id: $json.message_id,
  text: $json.text,
  timestamp: $json.timestamp,
  image_urls: []
};
```

#### Branch B: Has Images
Continue to image processing...

### 4. Process Images (Branch B)
**Node Type**: `Code`
**Purpose**: Get file paths and download URLs for all images

```javascript
const photos = $json.photo_data;
const botToken = '{{ $credentials.telegramApi.accessToken }}';
const imagePromises = [];

// Process each photo (usually take the largest one - last in array)
const largestPhoto = photos[photos.length - 1];

// Get file path from Telegram
const getFileUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${largestPhoto.file_id}`;

try {
  const fileResponse = await fetch(getFileUrl);
  const fileData = await fileResponse.json();
  
  if (fileData.ok) {
    const downloadUrl = `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`;
    const fileExtension = fileData.result.file_path.split('.').pop();
    
    return {
      telegram_user_id: $json.telegram_user_id,
      chat_id: $json.chat_id,
      message_id: $json.message_id,
      text: $json.text,
      timestamp: $json.timestamp,
      image_data: [{
        file_id: largestPhoto.file_id,
        download_url: downloadUrl,
        file_path: fileData.result.file_path,
        file_extension: fileExtension,
        width: largestPhoto.width,
        height: largestPhoto.height,
        file_size: largestPhoto.file_size
      }]
    };
  } else {
    throw new Error(`Telegram getFile failed: ${fileData.description}`);
  }
} catch (error) {
  console.error('Error getting file info:', error);
  return {
    telegram_user_id: $json.telegram_user_id,
    chat_id: $json.chat_id,
    message_id: $json.message_id,
    text: $json.text,
    timestamp: $json.timestamp,
    image_data: [],
    error: error.message
  };
}
```

### 5. Merge Branches
**Node Type**: `Merge`
**Mode**: `Keep Key Matches`

### 6. Send to Supabase Edge Function
**Node Type**: `HTTP Request`
**Configuration**:
```json
{
  "method": "POST",
  "url": "https://your-project.supabase.co/functions/v1/save-telegram-message",
  "headers": {
    "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY",
    "Content-Type": "application/json"
  },
  "body": "{{ $json }}"
}
```

**Expected payload structure**:
```json
{
  "telegram_user_id": "987654321",
  "chat_id": "987654321",
  "message_id": "456",
  "text": "Hello world!",
  "timestamp": "2023-12-21T10:30:56.000Z",
  "image_data": [
    {
      "file_id": "AgACAgIAAxkBAAIC...",
      "download_url": "https://api.telegram.org/file/bot.../photos/file_123.jpg",
      "file_path": "photos/file_123.jpg",
      "file_extension": "jpg",
      "width": 1280,
      "height": 720,
      "file_size": 45678
    }
  ]
}
```

### 7. Answer Callback Query
**Node Type**: `Telegram`
**Operation**: `Answer Callback Query`
```javascript
return {
  callback_query_id: $('Extract Message Data').first().$json.callback_query_id,
  text: "✅ Message synced successfully!",
  show_alert: false
};
```

### 8. Error Handling
**Node Type**: `Set` (connected to error outputs)
```javascript
return {
  error: true,
  message: $json.error?.message || 'Unknown error occurred',
  original_data: $('Extract Message Data').first().$json
};
```

## Advanced Configurations

### Multiple Images Support
If you want to handle multiple images per message:

```javascript
// In the Process Images node
const photos = $json.photo_data;
const botToken = '{{ $credentials.telegramApi.accessToken }}';
const imageDataArray = [];

for (let i = 0; i < photos.length; i++) {
  const photo = photos[i];
  try {
    const getFileUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${photo.file_id}`;
    const fileResponse = await fetch(getFileUrl);
    const fileData = await fileResponse.json();
    
    if (fileData.ok) {
      const downloadUrl = `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`;
      imageDataArray.push({
        file_id: photo.file_id,
        download_url: downloadUrl,
        file_path: fileData.result.file_path,
        width: photo.width,
        height: photo.height,
        file_size: photo.file_size
      });
    }
  } catch (error) {
    console.error(`Error processing image ${i}:`, error);
  }
}

return {
  ...($json),
  image_data: imageDataArray
};
```

### Retry Logic for Failed Requests
**Node Type**: `HTTP Request`
**Settings**:
- **Retry on Fail**: `true`
- **Max Retries**: `3`
- **Retry Interval**: `1000ms`

### Logging and Monitoring
Add a **Set** node after the HTTP request:
```javascript
const success = $json.statusCode === 200;
const logData = {
  timestamp: new Date().toISOString(),
  message_id: $('Extract Message Data').first().$json.message_id,
  success: success,
  response: $json
};

console.log('Telegram sync result:', logData);
return logData;
```

## Environment Variables Needed

1. **Telegram Bot Token**: Store in n8n credentials
2. **Supabase URL**: `https://your-project.supabase.co`
3. **Supabase Service Role Key**: For the Authorization header

## Testing Checklist

- [ ] Text-only messages sync correctly
- [ ] Image messages download and upload properly
- [ ] Multiple images are handled (if implemented)
- [ ] Error responses are logged
- [ ] Callback queries are answered
- [ ] Duplicate messages are prevented (via unique constraint)
- [ ] Large images don't timeout the workflow 