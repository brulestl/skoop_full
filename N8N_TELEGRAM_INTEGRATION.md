# n8n Telegram Integration Guide

This guide shows how to configure your n8n workflow to send Telegram messages directly to the Skoop `bookmarks` table with proper image handling.

## 📊 **Database Schema**

### Target Table: `bookmarks`
```sql
CREATE TABLE bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    source TEXT NOT NULL, -- 'telegram'
    provider_item_id BIGINT, -- Telegram message ID
    url TEXT, -- NULL for Telegram messages
    title TEXT, -- Message text (truncated)
    description TEXT, -- Full message text
    tags TEXT[], -- ['telegram'] or ['telegram', 'images']
    metadata JSONB, -- Image URLs and other data
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

## 🚀 **n8n Workflow Configuration**

### **1. Basic Message (No Images)**
```json
{
  "user_id": "e3ef0830-5658-445e-8193-17b28703ebf2",
  "source": "telegram",
  "provider_item_id": "{{ $json.message.message_id }}",
  "url": null,
  "title": "{{ $json.message.text.length > 100 ? $json.message.text.substring(0, 100) + '...' : $json.message.text }}",
  "description": "{{ $json.message.text }}",
  "tags": ["telegram"],
  "metadata": {
    "telegram_message_id": "{{ $json.message.message_id }}",
    "chat_id": "{{ $json.message.chat.id }}",
    "has_images": false,
    "image_count": 0,
    "original_timestamp": "{{ $json.message.date }}"
  },
  "created_at": "{{ $json.message.date }}",
  "updated_at": "{{ new Date().toISOString() }}"
}
```

### **2. Message with Images**
```json
{
  "user_id": "e3ef0830-5658-445e-8193-17b28703ebf2",
  "source": "telegram",
  "provider_item_id": "{{ $json.message.message_id }}",
  "url": null,
  "title": "{{ ($json.message.caption || $json.message.text || 'Image message').length > 100 ? ($json.message.caption || $json.message.text || 'Image message').substring(0, 100) + '...' : ($json.message.caption || $json.message.text || 'Image message') }}",
  "description": "{{ $json.message.caption || $json.message.text || 'Image message' }}",
  "tags": ["telegram", "images"],
  "metadata": {
    "telegram_message_id": "{{ $json.message.message_id }}",
    "chat_id": "{{ $json.message.chat.id }}",
    "has_images": true,
    "image_count": "{{ $json.message.photo ? $json.message.photo.length : 1 }}",
    "image_urls": "{{ $json.message.photo ? $json.message.photo.map(p => p.file_id) : [$json.message.document?.file_id || $json.message.video?.file_id] }}",
    "media_type": "{{ $json.message.photo ? 'photo' : ($json.message.video ? 'video' : 'document') }}",
    "original_timestamp": "{{ $json.message.date }}"
  },
  "created_at": "{{ $json.message.date }}",
  "updated_at": "{{ new Date().toISOString() }}"
}
```

## 🔧 **n8n Node Configuration**

### **1. Telegram Trigger Node**
- **Node Type:** Telegram Trigger
- **Bot Token:** Your Telegram bot token
- **Updates:** `message`

### **2. Switch Node (Check for Images)**
```javascript
// Condition 1: Has Images
return $json.message.photo || $json.message.video || $json.message.document;

// Condition 2: Text Only
return $json.message.text && !($json.message.photo || $json.message.video || $json.message.document);
```

### **3. Set Node (Text Messages)**
```json
{
  "user_id": "e3ef0830-5658-445e-8193-17b28703ebf2",
  "source": "telegram",
  "provider_item_id": "{{ $json.message.message_id }}",
  "url": null,
  "title": "{{ $json.message.text.length > 100 ? $json.message.text.substring(0, 100) + '...' : $json.message.text }}",
  "description": "{{ $json.message.text }}",
  "tags": ["telegram"],
  "metadata": {
    "telegram_message_id": "{{ $json.message.message_id }}",
    "chat_id": "{{ $json.message.chat.id }}",
    "has_images": false,
    "image_count": 0,
    "original_timestamp": "{{ $json.message.date }}"
  },
  "created_at": "{{ new Date($json.message.date * 1000).toISOString() }}",
  "updated_at": "{{ new Date().toISOString() }}"
}
```

### **4. Set Node (Image Messages)**
```json
{
  "user_id": "e3ef0830-5658-445e-8193-17b28703ebf2",
  "source": "telegram",
  "provider_item_id": "{{ $json.message.message_id }}",
  "url": null,
  "title": "{{ ($json.message.caption || 'Image message').length > 100 ? ($json.message.caption || 'Image message').substring(0, 100) + '...' : ($json.message.caption || 'Image message') }}",
  "description": "{{ $json.message.caption || 'Image message' }}",
  "tags": ["telegram", "images"],
  "metadata": {
    "telegram_message_id": "{{ $json.message.message_id }}",
    "chat_id": "{{ $json.message.chat.id }}",
    "has_images": true,
    "image_count": "{{ $json.message.photo ? $json.message.photo.length : 1 }}",
    "image_urls": "{{ $json.message.photo ? $json.message.photo.map(p => p.file_id) : [$json.message.document?.file_id || $json.message.video?.file_id] }}",
    "media_type": "{{ $json.message.photo ? 'photo' : ($json.message.video ? 'video' : 'document') }}",
    "original_timestamp": "{{ $json.message.date }}"
  },
  "created_at": "{{ new Date($json.message.date * 1000).toISOString() }}",
  "updated_at": "{{ new Date().toISOString() }}"
}
```

### **5. Supabase Node**
- **Operation:** Insert
- **Table:** `bookmarks`
- **Conflict Resolution:** `user_id,source,provider_item_id`
- **On Conflict:** Update

## 🎯 **Image Handling Logic**

### **Conditional Logic for Images:**
```javascript
// Check if message has images
const hasPhoto = $json.message.photo && $json.message.photo.length > 0;
const hasVideo = $json.message.video;
const hasDocument = $json.message.document;

const hasImages = hasPhoto || hasVideo || hasDocument;

if (hasImages) {
  // Use image message template
  return "image_message";
} else if ($json.message.text) {
  // Use text message template
  return "text_message";
} else {
  // Skip message (no text or images)
  return "skip";
}
```

### **Image URL Extraction:**
```javascript
// Extract image URLs based on media type
let imageUrls = [];

if ($json.message.photo) {
  // Photo messages have multiple sizes
  imageUrls = $json.message.photo.map(photo => photo.file_id);
} else if ($json.message.video) {
  // Video message
  imageUrls = [$json.message.video.file_id];
} else if ($json.message.document) {
  // Document (could be image/video file)
  imageUrls = [$json.message.document.file_id];
}

return imageUrls;
```

## 📱 **UI Display Logic**

### **Frontend Image Handling:**
```typescript
interface TelegramBookmark {
  id: string;
  title: string;
  description: string;
  metadata: {
    has_images: boolean;
    image_count: number;
    image_urls?: string[];
    media_type?: 'photo' | 'video' | 'document';
  };
}

// Display logic
const hasImages = bookmark.metadata?.has_images;
const imageCount = bookmark.metadata?.image_count || 0;

// Show image indicator only if images exist
{hasImages && (
  <div className="flex items-center text-sm text-gray-500">
    <Image className="h-4 w-4 mr-1" />
    {imageCount} image{imageCount > 1 ? 's' : ''}
  </div>
)}
```

## ⚠️ **Important Notes**

### **1. Image URLs are File IDs**
- Telegram returns `file_id` not direct URLs
- Use Telegram Bot API to get actual URLs when needed
- Store `file_id` in metadata for future retrieval

### **2. Message Filtering**
- Only process messages with text content
- Skip empty messages or media-only without captions
- Handle both text and caption fields

### **3. User ID Mapping**
- Replace `"e3ef0830-5658-445e-8193-17b28703ebf2"` with your actual user ID
- Use dynamic user mapping if supporting multiple users

### **4. Error Handling**
```javascript
// Add error handling in n8n
try {
  // Your processing logic
} catch (error) {
  console.error('Telegram processing error:', error);
  return { error: error.message };
}
```

## 🔄 **Migration vs Real-time**

### **Migration (One-time):**
- Use the migration endpoints for existing messages
- Handles bulk processing of historical data

### **Real-time (n8n):**
- Use this workflow for new incoming messages
- Processes messages as they arrive
- Immediate UI updates

## 🎉 **Expected Results**

After setup, you should see:
- ✅ **Text messages** with 📤 Telegram icon
- ✅ **Image messages** with 📤 + 🖼️ icons
- ✅ **Proper filtering** by "telegram" and "images" tags
- ✅ **Image count** displayed in UI
- ✅ **No broken URLs** (since URL is null for Telegram)

This setup ensures your Telegram messages display properly in Skoop with full image support! 