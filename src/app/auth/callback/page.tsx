'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { supabaseClient, session, isLoading } = useSessionContext();
  const [message, setMessage] = useState('Finishing sign-in...');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Prevent multiple executions
      if (hasProcessed || isLoading) {
        return;
      }

      try {
        const provider = searchParams.get('provider') as 'github' | 'twitter' | 'reddit' | 'stack';
        
        // Wait a bit for the session to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the session which should contain the OAuth tokens
        const { data: { session: currentSession }, error: sessionError } = await supabaseClient.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          router.replace('/dashboard?error=oauth_failed');
          return;
        }

        // Use the session from context if available, fallback to fetched session
        const activeSession = session || currentSession;

        if (!activeSession) {
          console.error('No session found');
          // Try to wait a bit longer for session to be established
          await new Promise(resolve => setTimeout(resolve, 2000));
          const { data: { session: retrySession } } = await supabaseClient.auth.getSession();
          
          if (!retrySession) {
            console.error('Still no session after retry');
            router.replace('/dashboard?error=oauth_failed');
            return;
          }
          
          // Use the retry session
          await processSession(retrySession, provider);
        } else {
          await processSession(activeSession, provider);
        }
      } catch (error) {
        console.error('Callback error:', error);
        router.replace('/dashboard?error=callback_failed');
      }
    };

    const processSession = async (sessionData: any, provider: string | null) => {
      setHasProcessed(true);

      // If we have a provider and the session contains provider tokens
      if (provider && sessionData.provider_token) {
        setMessage('Connecting your account...');
        
        try {
          // First, check if this provider is already connected for this user
          const { data: existingAccount, error: checkError } = await supabaseClient
            .from('connected_accounts')
            .select('user_id, provider')
            .eq('user_id', sessionData.user.id)
            .eq('provider', provider)
            .single();

          if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error checking existing account:', checkError);
            router.replace('/dashboard?error=check_failed');
            return;
          }

          if (existingAccount) {
            // Account already linked - update the tokens
            const { error: updateError } = await supabaseClient
              .from('connected_accounts')
              .update({
                access_token: sessionData.provider_token,
                refresh_token: sessionData.provider_refresh_token || null,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', sessionData.user.id)
              .eq('provider', provider);

            if (updateError) {
              console.error('Error updating connected account:', updateError);
              router.replace('/dashboard?error=update_failed');
              return;
            }

            console.log(`Successfully updated ${provider} connection tokens`);
          } else {
            // New connection - insert new record
            const { error: insertError } = await supabaseClient
              .from('connected_accounts')
              .insert({
                user_id: sessionData.user.id,
                provider: provider,
                access_token: sessionData.provider_token,
                refresh_token: sessionData.provider_refresh_token || null,
                updated_at: new Date().toISOString()
              });

            if (insertError) {
              console.error('Error inserting connected account:', insertError);
              router.replace('/dashboard?error=insert_failed');
              return;
            }

            console.log(`Successfully inserted new ${provider} connection`);
          }

          setMessage('Syncing your data...');

          // Trigger ingestion (non-blocking)
          try {
            const { error: ingestError } = await supabaseClient.functions.invoke(`ingest_${provider}`, {
              body: { 
                user_id: sessionData.user.id,
                immediate: true,
                timestamp: new Date().toISOString()
              }
            });

            if (ingestError) {
              console.error('Ingestion error:', ingestError);
              // Don't fail the flow for ingestion errors
            }
          } catch (ingestException) {
            console.error('Ingestion exception:', ingestException);
            // Don't fail the flow for ingestion errors
          }

          // Success! Redirect to dashboard with success message
          router.replace(`/dashboard?connected=${provider}&auto_sync=true&tab=profile`);
        } catch (error) {
          console.error('Error in callback processing:', error);
          router.replace('/dashboard?error=store_failed');
        }
      } else {
        // No provider specified or no provider token, just redirect to dashboard
        console.log('No provider or provider token, redirecting to dashboard');
        router.replace('/dashboard');
      }
    };

    // Only run if we have search params and haven't processed yet
    if (searchParams.toString() && !hasProcessed) {
      handleAuthCallback();
    }
  }, [router, searchParams, supabaseClient, session, isLoading, hasProcessed]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we complete the setup...</p>
      </div>
    </div>
  );
} 