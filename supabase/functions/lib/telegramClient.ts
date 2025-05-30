import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

export interface TelegramConfig {
  apiId: number;
  apiHash: string;
  sessionString?: string;
  botToken?: string;
}

export interface TelegramConnectionResult {
  success: boolean;
  client?: TelegramClient;
  sessionString?: string;
  error?: string;
}

export class TelegramClientManager {
  private client: TelegramClient | null = null;
  private config: TelegramConfig;

  constructor(config: TelegramConfig) {
    this.config = config;
  }

  /**
   * Initialize and connect to Telegram using MTProto
   */
  async connect(): Promise<TelegramConnectionResult> {
    try {
      console.log('Initializing Telegram MTProto client...');
      
      // Validate configuration
      if (!this.config.apiId || !this.config.apiHash) {
        throw new Error('Missing Telegram API credentials (apiId or apiHash)');
      }

      // Create session
      const session = new StringSession(this.config.sessionString || '');
      
      // Initialize client
      this.client = new TelegramClient(
        session,
        this.config.apiId,
        this.config.apiHash,
        {
          connectionRetries: 5,
          timeout: 30000,
          useWSS: true, // Use WebSocket Secure for better compatibility
        }
      );

      console.log('Connecting to Telegram...');
      await this.client.connect();

      // Check if we need to authenticate
      if (!await this.client.checkAuthorization()) {
        if (this.config.botToken) {
          console.log('Authenticating as bot...');
          await this.client.signInBot({
            botAuthToken: this.config.botToken,
          });
        } else {
          throw new Error('Client not authorized and no bot token provided');
        }
      }

      console.log('✅ Successfully connected to Telegram');
      
      return {
        success: true,
        client: this.client,
        sessionString: this.client.session.save() as string,
      };

    } catch (error) {
      console.error('❌ Failed to connect to Telegram:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown connection error',
      };
    }
  }

  /**
   * Disconnect from Telegram
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        console.log('Disconnecting from Telegram...');
        await this.client.disconnect();
        this.client = null;
        console.log('✅ Disconnected from Telegram');
      } catch (error) {
        console.error('Error disconnecting from Telegram:', error);
      }
    }
  }

  /**
   * Get the current client instance
   */
  getClient(): TelegramClient | null {
    return this.client;
  }

  /**
   * Check if client is connected and authorized
   */
  async isConnected(): Promise<boolean> {
    if (!this.client) return false;
    
    try {
      return await this.client.checkAuthorization();
    } catch (error) {
      console.error('Error checking connection status:', error);
      return false;
    }
  }

  /**
   * Get saved messages from Telegram
   */
  async getSavedMessages(limit: number = 100): Promise<Api.Message[]> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    try {
      console.log(`Fetching ${limit} saved messages...`);
      
      // Get saved messages (messages with yourself)
      const result = await this.client.getMessages('me', {
        limit,
        reverse: false, // Get newest first
      });

      console.log(`✅ Retrieved ${result.length} saved messages`);
      return result;
      
    } catch (error) {
      console.error('Error fetching saved messages:', error);
      throw error;
    }
  }

  /**
   * Get user information
   */
  async getUserInfo(): Promise<Api.User | null> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    try {
      const me = await this.client.getMe();
      console.log('✅ Retrieved user info:', {
        id: me.id?.toString(),
        firstName: me.firstName,
        lastName: me.lastName,
        username: me.username,
        phone: me.phone,
      });
      return me as Api.User;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  /**
   * Test the connection by getting basic account info
   */
  async testConnection(): Promise<{
    success: boolean;
    userInfo?: any;
    messageCount?: number;
    error?: string;
  }> {
    try {
      if (!await this.isConnected()) {
        throw new Error('Not connected to Telegram');
      }

      // Get user info
      const userInfo = await this.getUserInfo();
      
      // Get a few saved messages to test functionality
      const messages = await this.getSavedMessages(5);

      return {
        success: true,
        userInfo: {
          id: userInfo?.id?.toString(),
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          username: userInfo?.username,
        },
        messageCount: messages.length,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown test error',
      };
    }
  }

  /**
   * Format a Telegram message for storage
   */
  static formatMessage(message: Api.Message): {
    id: string;
    text: string;
    date: Date;
    mediaType?: string;
    fileName?: string;
    fileSize?: number;
  } {
    return {
      id: message.id.toString(),
      text: message.message || '',
      date: new Date(message.date * 1000),
      mediaType: message.media ? message.media.className : undefined,
      fileName: message.media && 'document' in message.media 
        ? message.media.document?.attributes?.find((attr: any) => attr.className === 'DocumentAttributeFilename')?.fileName
        : undefined,
      fileSize: message.media && 'document' in message.media 
        ? Number(message.media.document?.size) 
        : undefined,
    };
  }
}

/**
 * Factory function to create a Telegram client from environment variables
 */
export function createTelegramClient(): TelegramClientManager {
  const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') || '0');
  const apiHash = Deno.env.get('TELEGRAM_API_HASH') || '';
  const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');

  if (!apiId || !apiHash) {
    throw new Error('Missing TELEGRAM_API_ID or TELEGRAM_API_HASH environment variables');
  }

  return new TelegramClientManager({
    apiId,
    apiHash,
    botToken,
  });
}

/**
 * Factory function to create a Telegram client with session string
 */
export function createTelegramClientWithSession(sessionString: string): TelegramClientManager {
  const apiId = parseInt(Deno.env.get('TELEGRAM_API_ID') || '0');
  const apiHash = Deno.env.get('TELEGRAM_API_HASH') || '';

  if (!apiId || !apiHash) {
    throw new Error('Missing TELEGRAM_API_ID or TELEGRAM_API_HASH environment variables');
  }

  return new TelegramClientManager({
    apiId,
    apiHash,
    sessionString,
  });
}

/**
 * Utility function to test Telegram connection and log results
 */
export async function testTelegramConnection(): Promise<void> {
  console.log('🔄 Testing Telegram MTProto connection...');
  
  try {
    const client = createTelegramClient();
    
    console.log('📡 Attempting to connect...');
    const connection = await client.connect();
    
    if (!connection.success) {
      throw new Error(connection.error || 'Connection failed');
    }

    console.log('🔍 Testing client functionality...');
    const test = await client.testConnection();
    
    if (test.success) {
      console.log('✅ Telegram client test successful!');
      console.log('👤 User Info:', test.userInfo);
      console.log('💬 Saved Messages:', test.messageCount);
    } else {
      console.log('❌ Telegram client test failed:', test.error);
    }

    await client.disconnect();
    
  } catch (error) {
    console.error('❌ Telegram connection test failed:', error);
    throw error;
  }
}

export default TelegramClientManager; 