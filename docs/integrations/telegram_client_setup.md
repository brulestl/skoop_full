# Telegram MTProto Client Setup

## Overview

This document outlines the setup and implementation of the Telegram MTProto client using the `telegram` package (gramjs) for communicating with Telegram's API to access user data, saved messages, and other Telegram features.

## 🚀 Installation

### 1. Install MTProto Client Package

```bash
# Using npm
npm install telegram

# Using pnpm (alternative)
pnpm add telegram

# Using yarn (alternative)  
yarn add telegram
```

**Package Information:**
- **Name**: `telegram` (gramjs)
- **Purpose**: MTProto client for Telegram API communication
- **Documentation**: [gram.js.org](https://gram.js.org/)
- **Repository**: [github.com/gram-js/gramjs](https://github.com/gram-js/gramjs)

### 2. Verify Installation

Check that the package was installed correctly:

```bash
npm list telegram
```

Expected output:
```
skoop@1.0.0
└── telegram@2.x.x
```

## 📁 File Structure

### Created Files

```
supabase/functions/
├── lib/
│   └── telegramClient.ts          # 🆕 MTProto client helper
├── test-telegram-client.ts        # 🆕 Test function
└── ingest_telegram_saved.ts       # ✅ Updated with client import
```

### File Descriptions

#### `supabase/functions/lib/telegramClient.ts`
- **Purpose**: Core Telegram MTProto client wrapper
- **Features**: Connection management, session handling, message retrieval
- **Exports**: `TelegramClientManager`, `createTelegramClient`, `testTelegramConnection`

#### `supabase/functions/test-telegram-client.ts`
- **Purpose**: Standalone test function for client verification
- **Features**: Import testing, environment validation, connection testing

#### `supabase/functions/ingest_telegram_saved.ts`
- **Purpose**: Updated to include telegramClient import and testing
- **Features**: Integration verification with existing Telegram sync functionality

## 🔧 Configuration

### Environment Variables Required

```env
# Telegram API Credentials (Required)
TELEGRAM_API_ID=your_api_id_here
TELEGRAM_API_HASH=your_api_hash_here

# Telegram Bot Token (Optional - for bot operations)
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Supabase Configuration (Required for functions)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Telegram API Credentials

1. **Visit**: [my.telegram.org/apps](https://my.telegram.org/apps)
2. **Login** with your Telegram account
3. **Create new application**:
   - App title: "Skoop Integration"
   - Short name: "skoop"
   - Platform: "Other"
4. **Save credentials**:
   - `App api_id` → `TELEGRAM_API_ID`
   - `App api_hash` → `TELEGRAM_API_HASH`

## 💻 Usage Examples

### Basic Client Creation

```typescript
import { createTelegramClient } from './lib/telegramClient.ts';

// Create client from environment variables
const client = createTelegramClient();

// Connect to Telegram
const result = await client.connect();
if (result.success) {
  console.log('✅ Connected to Telegram');
  console.log('📝 Session string:', result.sessionString);
} else {
  console.error('❌ Connection failed:', result.error);
}
```

### Client with Session String

```typescript
import { createTelegramClientWithSession } from './lib/telegramClient.ts';

// Create client with existing session
const client = createTelegramClientWithSession('your_session_string');

// Test connection
const connected = await client.isConnected();
console.log('Connection status:', connected);
```

### Retrieving Saved Messages

```typescript
// Get saved messages
const messages = await client.getSavedMessages(50);
console.log(`Retrieved ${messages.length} saved messages`);

// Format messages for storage
const formattedMessages = messages.map(msg => 
  TelegramClientManager.formatMessage(msg)
);
```

### User Information

```typescript
// Get current user info
const userInfo = await client.getUserInfo();
console.log('User:', {
  id: userInfo.id,
  firstName: userInfo.firstName,
  username: userInfo.username
});
```

## 🧪 Testing

### Test 1: Import Verification

**Purpose**: Verify that `telegramClient.ts` can be imported successfully.

```typescript
// Import test
import { 
  TelegramClientManager, 
  createTelegramClient, 
  testTelegramConnection 
} from './lib/telegramClient.ts';

console.log('✅ Successfully imported telegramClient.ts');
```

**Expected Result**: No import errors, all exports available.

### Test 2: Client Creation

**Purpose**: Verify that client instances can be created.

```bash
# Run test function
curl -X POST https://your-project.supabase.co/functions/v1/test-telegram-client \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected Console Output**:
```
📦 Testing telegramClient.ts import...
✅ Successfully imported telegramClient.ts
✅ TelegramClientManager class available
✅ createTelegramClient function available
✅ testTelegramConnection function available
🏗️ Successfully created TelegramClientManager instance
```

### Test 3: Environment Validation

**Purpose**: Check that required environment variables are configured.

**Console Output Example**:
```
Environment check:
- TELEGRAM_API_ID: ✅ SET
- TELEGRAM_API_HASH: ✅ SET  
- TELEGRAM_BOT_TOKEN: ✅ SET
```

### Test 4: Connection Test

**Purpose**: Test actual Telegram API connection (requires valid credentials).

**Note**: This test may fail without proper authentication session, which is expected.

```bash
# Test via existing ingest function
curl -X POST https://your-project.supabase.co/functions/v1/ingest_telegram_saved \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "telegramClientTest": {
    "imported": true,
    "clientCreated": true,
    "message": "telegramClient.ts successfully imported and tested"
  }
}
```

## 📊 Class Documentation

### `TelegramClientManager`

**Main Methods:**

| Method | Description | Returns |
|--------|-------------|---------|
| `connect()` | Connect to Telegram MTProto | `Promise<TelegramConnectionResult>` |
| `disconnect()` | Disconnect from Telegram | `Promise<void>` |
| `isConnected()` | Check connection status | `Promise<boolean>` |
| `getSavedMessages(limit)` | Retrieve saved messages | `Promise<Api.Message[]>` |
| `getUserInfo()` | Get current user information | `Promise<Api.User>` |
| `testConnection()` | Test client functionality | `Promise<TestResult>` |

**Static Methods:**

| Method | Description | Returns |
|--------|-------------|---------|
| `formatMessage(message)` | Format Telegram message for storage | `FormattedMessage` |

### Factory Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `createTelegramClient()` | Create client from env vars | None |
| `createTelegramClientWithSession(sessionString)` | Create client with session | `sessionString: string` |
| `testTelegramConnection()` | Test connection utility | None |

## 🔒 Security Considerations

### Session String Storage
- **Store securely**: Session strings provide full account access
- **Database encryption**: Use encrypted columns for session storage
- **Access control**: Limit who can access session strings
- **Rotation**: Implement session rotation/refresh mechanisms

### API Credentials
- **Environment variables**: Store API ID/Hash in secure environment variables
- **No hardcoding**: Never commit API credentials to source code
- **Access logging**: Log API usage for security monitoring

### Bot Token Security
- **Separate storage**: Bot tokens should be stored separately from user sessions
- **Limited scope**: Use bot tokens only for bot-specific operations
- **Regular rotation**: Rotate bot tokens periodically

## 🚨 Troubleshooting

### Common Issues

#### Import Errors
```
Error: Cannot find module './lib/telegramClient.ts'
```
**Solution**: Ensure the file exists and path is correct relative to importing file.

#### Missing Environment Variables
```
Error: Missing TELEGRAM_API_ID or TELEGRAM_API_HASH environment variables
```
**Solution**: Set required environment variables in your Supabase project settings.

#### Connection Failures
```
Error: Client not authorized and no bot token provided
```
**Solution**: Provide either a valid session string or bot token for authentication.

#### Authentication Issues
```
Error: PHONE_NUMBER_INVALID
```
**Solution**: Ensure phone number is in international format (+1234567890).

### Debug Mode

Enable verbose logging:

```typescript
const client = new TelegramClientManager({
  apiId: parseInt(process.env.TELEGRAM_API_ID!),
  apiHash: process.env.TELEGRAM_API_HASH!,
  // Add debug logging
});
```

## ✅ Verification Checklist

### Installation Complete ✅
- [x] `telegram` package installed
- [x] `telegramClient.ts` helper file created
- [x] Test function created
- [x] Existing ingest function updated

### Environment Setup ✅
- [x] `TELEGRAM_API_ID` configured
- [x] `TELEGRAM_API_HASH` configured
- [x] `TELEGRAM_BOT_TOKEN` configured (optional)

### Testing Complete ✅
- [x] Import verification successful
- [x] Client creation working
- [x] Environment validation passing
- [x] Connection test attempted

### Documentation ✅
- [x] Setup instructions documented
- [x] Usage examples provided
- [x] API reference included
- [x] Troubleshooting guide created

## 🎯 Next Steps

### Implementation Roadmap

1. **User Authentication Flow**
   - Implement phone number verification
   - Handle 2FA/password authentication
   - Store session strings securely

2. **Message Sync Enhancement**
   - Replace placeholder implementation
   - Add real message fetching
   - Implement incremental sync

3. **Error Handling**
   - Add comprehensive error handling
   - Implement retry mechanisms
   - Add rate limiting

4. **Performance Optimization**
   - Add message batching
   - Implement pagination
   - Add caching mechanisms

### Integration Points

- **OAuth Flow**: Connect with existing Telegram OAuth
- **Database**: Store messages in bookmarks table
- **UI**: Update sync status in dashboard
- **API**: Expose sync endpoints

## 🔗 References

- [GramJS Documentation](https://gram.js.org/)
- [Telegram MTProto API](https://core.telegram.org/mtproto)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions) 