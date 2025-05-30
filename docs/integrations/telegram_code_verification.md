# Telegram Code Verification Integration

## Overview

This document outlines the implementation of the Telegram code verification system, which completes the two-step authentication process. After users receive verification codes via Telegram (from `telegram_login`), this system verifies those codes and establishes authenticated sessions.

## 🎯 Goal

**Complete user login with Telegram** by verifying authentication codes and providing session strings for ongoing API access.

## 📁 Files Created

### Core Implementation
- **`supabase/functions/telegram_verify.ts`** - Main verification Edge Function
- **`supabase/functions/test-telegram-verify.ts`** - Testing utility
- **`docs/integrations/telegram_code_verification.md`** - This documentation

## 🔧 Edge Function: `telegram_verify.ts`

### Purpose
Handles verification code submission, authenticates users with Telegram, and provides session strings for authenticated access.

### API Specification

#### Endpoint
```
POST /functions/v1/telegram_verify
```

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_SUPABASE_ANON_KEY
```

#### Request Body
```json
{
  "phone_number": "+1234567890",
  "code": "12345",
  "phone_code_hash": "abc123def456...",
  "password": "optional_2fa_password"
}
```

#### Response - Success
```json
{
  "success": true,
  "session_string": "encrypted_session_data...",
  "user_info": {
    "id": "123456789",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "phone": "+1234567890"
  },
  "message": "Successfully authenticated with Telegram"
}
```

#### Response - Error
```json
{
  "success": false,
  "error": "Invalid verification code. Please check the code and try again."
}
```

#### Response - 2FA Required
```json
{
  "success": false,
  "error": "Two-factor authentication is enabled. Please provide your password.",
  "requires_password": true
}
```

### Input Validation

#### Phone Number
- **Format**: Must match regex `^\+?[1-9]\d{1,14}$`
- **Same as login**: Must match the phone number used in `telegram_login`

#### Verification Code
- **Format**: Must be 5-6 digits (`^\d{5,6}$`)
- **Source**: Code received via Telegram app
- **Timing**: Usually valid for 3-5 minutes

#### Phone Code Hash
- **Source**: Returned from `telegram_login` function
- **Required**: Links verification attempt to original login request
- **Format**: Long hexadecimal string

#### Password (Optional)
- **When required**: If user has 2FA enabled
- **Format**: User's Telegram cloud password
- **Handling**: Only required when `requires_password: true` is returned

## 🔄 Complete Authentication Flow

### Full Two-Step Process
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant LoginFunc as telegram_login
    participant VerifyFunc as telegram_verify
    participant TelegramAPI
    participant Database

    Note over User,Database: Step 1: Request Code
    User->>Frontend: Enter phone number
    Frontend->>LoginFunc: POST phone_number
    LoginFunc->>TelegramAPI: sendCode()
    TelegramAPI->>User: Send code via Telegram app
    LoginFunc->>Frontend: Return phone_code_hash

    Note over User,Database: Step 2: Verify Code
    User->>Frontend: Enter received code
    Frontend->>VerifyFunc: POST phone + code + hash
    VerifyFunc->>TelegramAPI: signIn()
    TelegramAPI->>VerifyFunc: Return session
    VerifyFunc->>Database: Store session
    VerifyFunc->>Frontend: Return session_string
    Frontend->>User: Authentication complete
```

### Error Handling Flow
```mermaid
flowchart TD
    A[Submit Verification Code] --> B{Code Valid?}
    B -->|No| C{Error Type?}
    B -->|Yes| D{2FA Enabled?}
    
    C -->|Invalid Code| E[Return: PHONE_CODE_INVALID]
    C -->|Expired| F[Return: PHONE_CODE_EXPIRED]
    C -->|Too Many Attempts| G[Return: TOO_MANY_REQUESTS]
    
    D -->|No| H[Complete Authentication]
    D -->|Yes| I{Password Provided?}
    
    I -->|No| J[Return: SESSION_PASSWORD_NEEDED]
    I -->|Yes| K{Password Valid?}
    
    K -->|No| L[Return: PASSWORD_HASH_INVALID]
    K -->|Yes| H
    
    H --> M[Return Session String]
```

## 🧪 Testing

### Manual Testing

#### Test 1: Valid Verification (requires real phone code)
```bash
# First get phone_code_hash from telegram_login
curl -X POST https://your-project.supabase.co/functions/v1/telegram_login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"phone_number": "+1234567890"}'

# Use returned phone_code_hash and received code
curl -X POST https://your-project.supabase.co/functions/v1/telegram_verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "phone_number": "+1234567890",
    "code": "12345",
    "phone_code_hash": "returned_hash_from_login"
  }'
```

#### Test 2: Invalid Code Format
```bash
curl -X POST https://your-project.supabase.co/functions/v1/telegram_verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "phone_number": "+1234567890",
    "code": "abc",
    "phone_code_hash": "test_hash"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "error": "Invalid verification code format. Code should be 5-6 digits"
}
```

#### Test 3: Missing Required Fields
```bash
curl -X POST https://your-project.supabase.co/functions/v1/telegram_verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "phone_number": "+1234567890",
    "code": "12345"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "error": "Missing required fields: phone_number, code, and phone_code_hash are required"
}
```

### Automated Testing

Run the test suite:
```bash
curl -X GET https://your-project.supabase.co/functions/v1/test-telegram-verify \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Test Cases Covered**:
1. Missing required fields validation
2. Phone number format validation  
3. Code format validation
4. Error handling verification
5. Function accessibility

## 🔒 Security Features

### Input Validation
- **All Fields Required**: phone_number, code, phone_code_hash
- **Format Validation**: Strict regex patterns for all inputs
- **Type Safety**: JSON schema validation

### Authentication Security
- **Session Isolation**: Each session is unique and encrypted
- **Hash Verification**: phone_code_hash prevents replay attacks
- **Rate Limiting**: Telegram API handles verification attempts
- **2FA Support**: Handles two-factor authentication gracefully

### Error Information Disclosure
- **Generic Errors**: Specific error details only for legitimate issues
- **No Hash Exposure**: phone_code_hash never logged or exposed
- **Sanitized Logging**: Phone numbers partially masked in logs

### Audit Logging
```typescript
// Logged information (minimal sensitive data)
console.log('📱 Verifying code for phone:', phone_number.slice(0, -4) + '****');
console.log('👤 Verification request from user:', user?.id || 'anonymous');
console.log('🔑 Code length:', code.length);
```

## 🔌 Integration Points

### Frontend Integration

#### React/Next.js Full Flow Example
```typescript
// Complete authentication flow
class TelegramAuth {
  private phoneCodeHash: string | null = null;
  
  // Step 1: Send code
  async sendCode(phoneNumber: string) {
    const response = await fetch('/api/functions/telegram_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ phone_number: phoneNumber }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      this.phoneCodeHash = result.phone_code_hash;
      return { success: true, message: 'Code sent to your Telegram app' };
    } else {
      return { success: false, error: result.error };
    }
  }
  
  // Step 2: Verify code
  async verifyCode(phoneNumber: string, code: string, password?: string) {
    if (!this.phoneCodeHash) {
      throw new Error('Must send code first');
    }
    
    const response = await fetch('/api/functions/telegram_verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        code: code,
        phone_code_hash: this.phoneCodeHash,
        password: password,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Store session for future API calls
      localStorage.setItem('telegram_session', result.session_string);
      localStorage.setItem('telegram_user', JSON.stringify(result.user_info));
      return { success: true, userInfo: result.user_info };
    } else {
      return { 
        success: false, 
        error: result.error,
        requiresPassword: result.requires_password 
      };
    }
  }
}
```

#### Form Component with 2FA Support
```jsx
function TelegramVerification({ phoneNumber, onSuccess, onError }) {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const auth = new TelegramAuth();
    const result = await auth.verifyCode(phoneNumber, code, password);
    
    if (result.success) {
      onSuccess(result.userInfo);
    } else if (result.requiresPassword) {
      setRequiresPassword(true);
      setLoading(false);
    } else {
      onError(result.error);
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleVerify}>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        pattern="\d{5,6}"
        maxLength="6"
        required
      />
      
      {requiresPassword && (
        <input
          type="password"
          placeholder="Enter 2FA password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>
      
      {requiresPassword && (
        <p className="info">
          Two-factor authentication is enabled. Please enter your cloud password.
        </p>
      )}
    </form>
  );
}
```

### Database Integration

#### Update Connected Accounts Schema
```sql
-- Ensure connected_accounts supports Telegram sessions
ALTER TABLE connected_accounts 
ADD COLUMN IF NOT EXISTS telegram_session_string TEXT;

-- Create index for session lookups
CREATE INDEX IF NOT EXISTS idx_connected_accounts_telegram_session 
ON connected_accounts(telegram_session_string);

-- Create Telegram authentication log table
CREATE TABLE telegram_auth_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  phone_number TEXT NOT NULL,
  action TEXT NOT NULL, -- 'code_sent', 'code_verified', 'auth_failed'
  success BOOLEAN NOT NULL,
  error_message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for audit queries
CREATE INDEX idx_telegram_auth_log_user_action 
ON telegram_auth_log(user_id, action, created_at);
```

#### Store Verification Result
```typescript
// Example of storing verification result
async function storeVerificationResult(
  userId: string, 
  sessionString: string, 
  userInfo: any
) {
  const { error } = await supabase
    .from('connected_accounts')
    .upsert({
      user_id: userId,
      provider: 'telegram',
      provider_user_id: userInfo.id,
      username: userInfo.username,
      display_name: `${userInfo.first_name} ${userInfo.last_name}`.trim(),
      status: 'active',
      connected_at: new Date().toISOString(),
      telegram_session_string: sessionString,
      access_token: 'telegram_authenticated',
    }, {
      onConflict: 'user_id,provider'
    });
    
  if (error) {
    console.error('Failed to store Telegram session:', error);
  }
}
```

## 📊 Response Codes & Error Handling

### HTTP Status Codes

| Status | Condition | Response |
|--------|-----------|----------|
| 200 | Success | `{"success": true, "session_string": "...", ...}` |
| 400 | Missing fields | `{"success": false, "error": "Missing required fields"}` |
| 400 | Invalid phone format | `{"success": false, "error": "Invalid phone number format"}` |
| 400 | Invalid code format | `{"success": false, "error": "Invalid verification code format"}` |
| 400 | Code verification failed | `{"success": false, "error": "Invalid verification code"}` |
| 400 | 2FA required | `{"success": false, "requires_password": true}` |
| 405 | Wrong method | `{"success": false, "error": "Method not allowed"}` |
| 500 | Server error | `{"success": false, "error": "Internal error"}` |

### Telegram-Specific Errors

| Telegram Error | User-Friendly Message | Action Required |
|----------------|----------------------|-----------------|
| `PHONE_CODE_INVALID` | Invalid verification code | Re-enter code |
| `PHONE_CODE_EXPIRED` | Code has expired | Request new code |
| `SESSION_PASSWORD_NEEDED` | 2FA password required | Enter password |
| `PASSWORD_HASH_INVALID` | Invalid 2FA password | Re-enter password |
| `TOO_MANY_REQUESTS` | Too many attempts | Wait and retry |
| `PHONE_NUMBER_UNOCCUPIED` | Phone not registered | Check phone number |

## 🚀 Usage Scenarios

### Scenario 1: Standard Authentication
```typescript
// 1. User enters phone number
const loginResult = await telegram.sendCode('+1234567890');

// 2. User receives code via Telegram app: "12345"

// 3. User enters code
const verifyResult = await telegram.verifyCode('+1234567890', '12345');

// 4. Success - user authenticated
console.log('User:', verifyResult.userInfo);
console.log('Session:', localStorage.getItem('telegram_session'));
```

### Scenario 2: 2FA Authentication
```typescript
// 1-2. Same as standard flow

// 3. User enters code
const verifyResult = await telegram.verifyCode('+1234567890', '12345');

// 4. 2FA required
if (verifyResult.requiresPassword) {
  // 5. User enters 2FA password
  const finalResult = await telegram.verifyCode(
    '+1234567890', 
    '12345', 
    'user_2fa_password'
  );
  
  // 6. Success with 2FA
  console.log('Authenticated with 2FA:', finalResult.userInfo);
}
```

### Scenario 3: Error Recovery
```typescript
try {
  const result = await telegram.verifyCode('+1234567890', '12345');
} catch (error) {
  if (error.message.includes('expired')) {
    // Code expired - restart flow
    await telegram.sendCode('+1234567890');
    alert('Code expired. New code sent.');
  } else if (error.message.includes('invalid')) {
    // Invalid code - retry
    alert('Invalid code. Please try again.');
  } else {
    // Other error
    alert('Authentication failed. Please restart.');
  }
}
```

## 🔧 Environment Variables

### Required Configuration
```env
# Telegram API Credentials (Required)
TELEGRAM_API_ID=20151707
TELEGRAM_API_HASH=68c9850b66581c18eb4ba41c0ce077d5

# Supabase Configuration (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

## 🚨 Troubleshooting

### Common Issues

#### "Invalid verification code"
**Causes**:
- Code entered incorrectly
- Code has expired (3-5 minutes)
- Wrong phone number used

**Solutions**:
- Verify code from Telegram app
- Request new code if expired
- Ensure phone number matches exactly

#### "Code has expired"
**Cause**: Verification codes expire quickly
**Solution**: Request new code via `telegram_login`

#### "2FA password required"
**Cause**: User has cloud password enabled
**Solution**: Enter Telegram cloud password in password field

#### "Too many attempts"
**Cause**: Rate limiting by Telegram API
**Solution**: Wait 10-15 minutes before retrying

### Debugging Steps

1. **Check Function Logs**
   ```bash
   supabase functions logs telegram_verify
   ```

2. **Validate Input Format**
   ```javascript
   // Phone format
   /^\+?[1-9]\d{1,14}$/.test('+1234567890') // true
   
   // Code format  
   /^\d{5,6}$/.test('12345') // true
   ```

3. **Test Flow End-to-End**
   ```bash
   # Step 1: Send code
   curl -X POST .../telegram_login -d '{"phone_number": "+1234567890"}'
   
   # Step 2: Verify with received code
   curl -X POST .../telegram_verify -d '{
     "phone_number": "+1234567890",
     "code": "RECEIVED_CODE",
     "phone_code_hash": "HASH_FROM_STEP_1"
   }'
   ```

## ✅ Verification Checklist

### Implementation Complete ✅
- [x] Edge function created (`telegram_verify.ts`)
- [x] Input validation implemented
- [x] Telegram signIn integration working
- [x] Session string generation
- [x] 2FA password support
- [x] Database storage integration

### Testing Complete ✅  
- [x] Input validation tests
- [x] Error scenario testing
- [x] Test suite created
- [x] Manual testing procedures

### Security Complete ✅
- [x] Input sanitization
- [x] Error message filtering
- [x] Audit logging
- [x] Session security

### Documentation Complete ✅
- [x] API specification
- [x] Integration examples
- [x] Error handling guide
- [x] Troubleshooting procedures

## 🔗 References

- [Telegram MTProto Authentication](https://core.telegram.org/mtproto/auth_key)
- [GramJS Sign In Documentation](https://gram.js.org/introduction/authorization)
- [Two-Factor Authentication](https://telegram.org/blog/sessions-and-2-step-verification)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions) 