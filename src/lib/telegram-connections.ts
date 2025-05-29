// Shared pending connections store
// In production, this should be replaced with Redis or a database table

interface PendingConnection {
  skoopUserId: string;
  timestamp: number;
}

class TelegramConnectionManager {
  private connections = new Map<string, PendingConnection>();

  createPendingConnection(skoopUserId: string): string {
    // Generate a unique connection ID
    const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.connections.set(connectionId, {
      skoopUserId,
      timestamp: Date.now()
    });

    console.log('Created pending connection:', connectionId, 'for user:', skoopUserId);
    
    // Clean up expired connections
    this.cleanupExpired();
    
    return connectionId;
  }

  getPendingConnection(connectionId: string): PendingConnection | null {
    const connection = this.connections.get(connectionId);
    
    if (!connection) {
      return null;
    }

    // Check if expired (10 minutes)
    if (Date.now() - connection.timestamp > 10 * 60 * 1000) {
      this.connections.delete(connectionId);
      return null;
    }

    return connection;
  }

  completePendingConnection(connectionId: string): boolean {
    const exists = this.connections.has(connectionId);
    if (exists) {
      this.connections.delete(connectionId);
      console.log('Completed pending connection:', connectionId);
    }
    return exists;
  }

  private cleanupExpired(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, connection] of this.connections.entries()) {
      if (now - connection.timestamp > 10 * 60 * 1000) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => {
      this.connections.delete(key);
      console.log('Cleaned up expired connection:', key);
    });
  }

  getConnectionCount(): number {
    this.cleanupExpired();
    return this.connections.size;
  }
}

// Export singleton instance
export const telegramConnections = new TelegramConnectionManager(); 