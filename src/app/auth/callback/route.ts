import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const provider = requestUrl.searchParams.get('provider');
  const error = requestUrl.searchParams.get('error');

  console.log('OAuth callback received:', { code: !!code, provider, error });

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=oauth_failed&tab=profile`);
  }

  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=no_code&tab=profile`);
  }

  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError || !data.session) {
      console.error('Code exchange failed:', exchangeError);
      return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=callback_failed&tab=profile`);
    }

    console.log('OAuth session established successfully');

    // If we have a provider and the session contains provider tokens, store the connection
    if (provider && data.session.provider_token) {
      console.log(`Storing connected account for provider: ${provider}`);
      
      try {
        // First, check if this provider is already connected for this user
        const { data: existingAccount, error: checkError } = await supabase
          .from('connected_accounts')
          .select('user_id, provider')
          .eq('user_id', data.session.user.id)
          .eq('provider', provider)
          .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error checking existing account:', checkError);
          return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=check_failed&tab=profile`);
        }

        if (existingAccount) {
          // Account already linked - update the tokens
          const { error: updateError } = await supabase
            .from('connected_accounts')
            .update({
              access_token: data.session.provider_token,
              refresh_token: data.session.provider_refresh_token || null,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', data.session.user.id)
            .eq('provider', provider);

          if (updateError) {
            console.error('Error updating connected account:', updateError);
            return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=update_failed&tab=profile`);
          }

          console.log(`Successfully updated ${provider} connection tokens`);
        } else {
          // New connection - insert new record
          const { error: insertError } = await supabase
            .from('connected_accounts')
            .insert({
              user_id: data.session.user.id,
              provider: provider,
              access_token: data.session.provider_token,
              refresh_token: data.session.provider_refresh_token || null,
              updated_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error inserting connected account:', insertError);
            return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=insert_failed&tab=profile`);
          }

          console.log(`Successfully inserted new ${provider} connection`);
        }

        console.log(`Successfully stored ${provider} connection`);

        // Automatically trigger a sync for the connected provider
        if (provider === 'github') {
          try {
            console.log('Triggering initial sync...');
            // Use 127.0.0.1 instead of localhost to avoid IPv6 issues
            const syncUrl = requestUrl.origin.replace('localhost', '127.0.0.1');
            const syncResponse = await fetch(`${syncUrl}/api/sync/${provider}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || ''
              }
            });

            if (syncResponse.ok) {
              const syncResult = await syncResponse.json();
              console.log(`Initial sync completed: ${syncResult.count} items`);
              return NextResponse.redirect(`${requestUrl.origin}/dashboard?connected=${provider}&auto_sync=true&count=${syncResult.count}&tab=profile`);
            } else {
              console.log('Initial sync failed, but connection succeeded');
            }
          } catch (syncError) {
            console.error('Initial sync error:', syncError);
            // Don't fail the connection if sync fails
          }
        }

        // Success without sync or sync failed  
        return NextResponse.redirect(`${requestUrl.origin}/dashboard?connected=${provider}&tab=profile`);
        
      } catch (storeError) {
        console.error('Error in account storage process:', storeError);
        return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=store_failed&tab=profile`);
      }
    }

    // No provider info, just redirect to dashboard profile
    console.log('OAuth successful but no provider specified');
    return NextResponse.redirect(`${requestUrl.origin}/dashboard?tab=profile`);

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(`${requestUrl.origin}/dashboard?error=callback_failed&tab=profile`);
  }
} 