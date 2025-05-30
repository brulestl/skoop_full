import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.OAUTH_ENCRYPTION_KEY || 'fallback-key-32-characters-long!!';
const ALGORITHM = 'aes-256-gcm';

export interface EncryptedToken {
  encrypted: string;
  iv: string;
  tag: string;
}

/**
 * Convert base64 to base64url format
 */
function toBase64Url(base64: string): string {
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Convert base64url to base64 format
 */
function fromBase64Url(base64url: string): string {
  // Add padding if needed
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64;
}

/**
 * Encrypt user ID and other sensitive data for OAuth state management
 */
export function encryptUserData(data: { userId: string; timestamp?: number; returnUrl?: string }): string {
  try {
    const dataToEncrypt = {
      ...data,
      timestamp: data.timestamp || Date.now()
    };
    
    const text = JSON.stringify(dataToEncrypt);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
    cipher.setAAD(Buffer.from('oauth-state'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    
    const result: EncryptedToken = {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
    
    // Convert to base64url format manually
    const base64 = Buffer.from(JSON.stringify(result)).toString('base64');
    return toBase64Url(base64);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt user data');
  }
}

/**
 * Decrypt user data from OAuth state
 */
export function decryptUserData(encryptedData: string): { userId: string; timestamp: number; returnUrl?: string } | null {
  try {
    // Convert from base64url to base64 format
    const base64 = fromBase64Url(encryptedData);
    const tokenData: EncryptedToken = JSON.parse(Buffer.from(base64, 'base64').toString());
    
    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
    decipher.setAuthTag(Buffer.from(tokenData.tag, 'hex'));
    decipher.setAAD(Buffer.from('oauth-state'));
    
    let decrypted = decipher.update(tokenData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    const data = JSON.parse(decrypted);
    
    // Check if token is not too old (1 hour)
    const now = Date.now();
    if (now - data.timestamp > 3600000) {
      console.warn('Encrypted token expired');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Simple hash-based verification for additional security
 */
export function createSecureHash(data: string, secret?: string): string {
  const key = secret || ENCRYPTION_KEY;
  return crypto.createHmac('sha256', key).update(data).digest('hex');
}

/**
 * Verify secure hash
 */
export function verifySecureHash(data: string, hash: string, secret?: string): boolean {
  const expectedHash = createSecureHash(data, secret);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(expectedHash, 'hex'));
} 