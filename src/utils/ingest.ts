import { supabase } from '@/lib/supabase';
import { Provider } from '@/hooks/useConnectedAccounts';

export interface IngestResult {
  success: boolean;
  count: number;
  error?: string;
  provider: Provider;
}

export interface IngestResponse {
  data: {
    count: number;
    items?: any[];
  };
  error?: {
    message: string;
  };
}

/**
 * Trigger ingestion for a specific provider
 */
export async function triggerIngestion(provider: Provider): Promise<IngestResult> {
  try {
    console.log(`Triggering ingestion for ${provider}...`);
    
    const { data, error } = await supabase.functions.invoke(`ingest_${provider}`, {
      body: { 
        timestamp: new Date().toISOString(),
        force: true 
      }
    }) as { data: IngestResponse['data'], error: IngestResponse['error'] };

    if (error) {
      console.error(`Ingestion error for ${provider}:`, error);
      return {
        success: false,
        count: 0,
        error: error.message || `Failed to ingest ${provider} data`,
        provider
      };
    }

    console.log(`Ingestion successful for ${provider}:`, data);
    return {
      success: true,
      count: data?.count || 0,
      provider
    };

  } catch (error) {
    console.error(`Ingestion exception for ${provider}:`, error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      provider
    };
  }
}

/**
 * Trigger ingestion for multiple providers
 */
export async function triggerMultipleIngestion(providers: Provider[]): Promise<IngestResult[]> {
  const results = await Promise.allSettled(
    providers.map(provider => triggerIngestion(provider))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        success: false,
        count: 0,
        error: result.reason?.message || 'Failed to process ingestion',
        provider: providers[index]
      };
    }
  });
}

/**
 * Get provider display name for UI messages
 */
export function getProviderDisplayName(provider: Provider): string {
  const names = {
    github: 'GitHub',
    twitter: 'Twitter',
    reddit: 'Reddit', 
    stack: 'Stack Overflow'
  };
  return names[provider] || provider;
}

/**
 * Format ingestion result message for toasts
 */
export function formatIngestMessage(result: IngestResult): string {
  const providerName = getProviderDisplayName(result.provider);
  
  if (!result.success) {
    return `Failed to sync ${providerName}: ${result.error}`;
  }
  
  if (result.count === 0) {
    return `${providerName} sync complete - no new items`;
  }
  
  const itemText = result.count === 1 ? 'item' : 'items';
  return `${providerName} sync complete - ${result.count} new ${itemText}`;
} 