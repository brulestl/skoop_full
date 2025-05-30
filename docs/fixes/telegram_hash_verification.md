# Telegram Hash Verification Fix

## Problem
Hash verification was failing due to incorrect secret generation and data string construction, preventing successful Telegram OAuth authentication.

## Solution
Implemented correct hash verification using the Telegram Web App Data specification with proper secret generation and error handling.

## Implementation

### Key Changes Made

1. **Correct Hash Verification Function**:
   ```typescript
   function isValidTelegramHash(q: Record<string, string>, botToken: string): boolean {
     if (!q.hash || !botToken) {
       console.error('Telegram auth: Missing hash or bot token');
       return false;
     }

     // Create data check string: sort fields (except hash) and join with newlines
     const dataCheck = Object.keys(q)
       .filter(k => k !== 'hash' && q[k] !== null && q[k] !== undefined && q[k] !== '')
       .sort()
       .map(k => `${k}=${q[k]}`)
       .join('\n');

     // Create secret using WebAppData method per Telegram specification
     const secret = createHmac('sha256', 'WebAppData')
       .update(botToken)
       .digest();

     // Calculate hash using the secret
     const calc = createHmac('sha256', secret)
       .update(dataCheck)
       .digest('hex');

     return calc === q.hash;
   }
   ```

2. **Proper Error Handling**:
   - Bot token validation throws error if undefined
   - Hash verification failure returns 400 JSON response
   - Masked logging for security

3. **Correct Success Redirect**:
   - Uses `NEXT_PUBLIC_APP_URL` for success URL
   - Redirects to `/oauth/telegram/success` for popup handling

### Environment Variables Used
- `TELEGRAM_BOT_TOKEN`: Used in HMAC calculation (throws if undefined)
- `NEXT_PUBLIC_APP_URL`: Used for success redirect URL

## Code Location
File: `src/app/api/oauth/telegram/start/route.ts`

## Hash Verification Algorithm
Following Telegram Web App Data specification:

1. **Filter and Sort**: Remove hash field, filter empty values, sort alphabetically
2. **Data String**: Join key=value pairs with newlines (`\n`)
3. **Secret Generation**: `HMAC-SHA256('WebAppData', botToken)`
4. **Hash Calculation**: `HMAC-SHA256(secret, dataString)` in hex format
5. **Comparison**: Compare calculated hash with received hash

## Error Responses

### Hash Verification Failed
```json
{
  "error": "HASH_VERIFICATION_FAILED"
}
```
Status: 400

### Missing Bot Token
Throws: `Error('TELEGRAM_BOT_TOKEN environment variable is not configured')`

## Success Flow

1. **Valid Hash** ✅ → Hash verification passes
2. **Database Update** ✅ → User connection stored in `connected_accounts` table
3. **Success Redirect** ✅ → Redirects to `https://skoop.pro/oauth/telegram/success`
4. **Popup Handling** ✅ → Success page posts message to parent window and auto-closes
5. **UI Update** ✅ → Main window shows "Telegram connected" notification

## Testing

### Expected Behavior
1. Click "Connect Telegram" → Opens popup with Telegram auth
2. Approve in Telegram → Popup redirects to `/oauth/telegram/success`
3. Success page automatically closes popup
4. Main window receives `postMessage` and shows success notification
5. Database contains new row in `connected_accounts` with `provider='telegram'`

### Verification
```sql
-- Check database for successful connection
SELECT * FROM connected_accounts WHERE provider = 'telegram' ORDER BY connected_at DESC LIMIT 1;
```

## Logging
Minimal, security-focused logging:
```
Telegram hash verification: {
  fieldsCount: 4,
  receivedHash: "a1b2c3d4***",
  calculatedHash: "a1b2c3d4***", 
  isValid: true
}
```

## Status
✅ **COMPLETED** - Telegram hash verification now uses correct algorithm and proper error handling. 