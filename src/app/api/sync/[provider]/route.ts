import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const startTime = new Date();
  let syncHistoryId: string | null = null;
  
  try {
    const { provider } = await params;
    
    console.log(`=== SYNC DEBUG START === Provider: ${provider}`);
    
    const supportedProviders = ['github', 'twitter', 'linkedin', 'reddit'];
    const comingSoonProviders = ['azure', 'discord', 'gitlab', 'notion', 'twitch', 'telegram', 'stack'];
    
    if (!supportedProviders.includes(provider) && !comingSoonProviders.includes(provider)) {
      return NextResponse.json(
        { error: 'Provider not supported' },
        { status: 400 }
      );
    }
    
    if (comingSoonProviders.includes(provider)) {
      return NextResponse.json(
        { error: `${provider} sync coming soon! Currently only GitHub and Twitter are supported.` },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient({ cookies });
    
    // Get current user
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session?.user) {
      console.log('❌ Auth error:', authError);
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    console.log(`✅ User authenticated: ${session.user.id}`);

    // Determine sync type based on request headers or query params
    const url = new URL(request.url);
    const syncType = url.searchParams.get('sync_type') === 'automatic' ? 'automatic' : 'manual';

    console.log(`🔄 Sync type: ${syncType}`);

    // Handle Twitter bookmark sync
    if (provider === 'twitter') {
      console.log('🐦 Starting Twitter likes sync (last 5)...');
      
      // Get connected account and access token
      console.log('🔍 Looking for connected Twitter account...');
      const { data: connectedAccount, error: accountError } = await supabase
        .from('connected_accounts')
        .select('access_token')
        .eq('user_id', session.user.id)
        .eq('provider', provider)
        .single();

      if (accountError || !connectedAccount) {
        console.log('❌ Twitter account not connected:', accountError);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, 'Twitter account not connected');
        return NextResponse.json(
          { error: 'Twitter account not connected' },
          { status: 400 }
        );
      }

      console.log('✅ Found connected Twitter account with access token');

      try {
        // First get the user ID for the likes endpoint
        console.log('🔍 Attempting to get Twitter user info...');
        const userResponse = await fetch(
          'https://api.twitter.com/2/users/me',
          {
            headers: {
              'Authorization': `Bearer ${connectedAccount.access_token}`,
              'User-Agent': 'SKOOP-App'
            }
          }
        );

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error('❌ Twitter User API error:', userResponse.status, errorText);
          
          let errorMessage = 'Twitter API error';
          if (userResponse.status === 401) {
            errorMessage = 'Twitter access token is invalid or expired. Please reconnect your account.';
          } else if (userResponse.status === 429) {
            errorMessage = 'Twitter API rate limit exceeded. Please try again later.';
          } else {
            errorMessage = `Twitter API error: ${userResponse.statusText}`;
          }
          
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, errorMessage);
          return NextResponse.json({ error: errorMessage }, { status: userResponse.status });
        }

        const userData = await userResponse.json();
        const userId = userData.data.id;

        // Try Twitter API v2 with user context, fallback to mock data if forbidden
        console.log('🐦 Attempting Twitter likes API call...');
        const twitterResponse = await fetch(
          `https://api.twitter.com/2/users/${userId}/liked_tweets?max_results=5&tweet.fields=created_at,author_id,public_metrics&expansions=author_id`,
          {
            headers: {
              'Authorization': `Bearer ${connectedAccount.access_token}`,
              'User-Agent': 'SKOOP-App'
            }
          }
        );

        console.log(`🌐 Twitter API response status: ${twitterResponse.status} ${twitterResponse.statusText}`);

        if (!twitterResponse.ok) {
          const errorText = await twitterResponse.text();
          console.error('❌ Twitter API error:', twitterResponse.status, errorText);
          
          // Handle OAuth 2.0 Application-Only forbidden error with helpful message
          if (twitterResponse.status === 403 && errorText.includes('Application-Only')) {
            console.log('📝 Twitter OAuth user context not available, providing helpful guidance...');
            
            await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, 'Twitter OAuth user context required for likes access');
            
            return NextResponse.json({
              error: 'Twitter connection successful, but likes access requires Twitter API Pro or different OAuth setup. Your connection is saved and ready for future features.',
              helpMessage: 'Twitter likes require OAuth 2.0 user context which may need Twitter API Pro access. Your account connection is working correctly.',
              count: 0,
              provider: 'twitter',
              sync_type: syncType
            }, { status: 200 }); // Return 200 so UI doesn't show as complete failure
          }
          
          let errorMessage = 'Twitter API error';
          if (twitterResponse.status === 401) {
            errorMessage = 'Twitter access token is invalid or expired. Please reconnect your account.';
          } else if (twitterResponse.status === 429) {
            errorMessage = 'Twitter API rate limit exceeded. Please try again later.';
          } else {
            errorMessage = `Twitter API error: ${twitterResponse.statusText}`;
          }
          
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, errorMessage);
          return NextResponse.json({ error: errorMessage }, { status: twitterResponse.status });
        }

        const twitterData = await twitterResponse.json();
        const likes = twitterData.data || [];
        
        console.log(`📊 Got ${likes.length} Twitter likes (last 5)`);

        // Transform Twitter likes to our format
        const twitterLikesToInsert = likes.map((tweet: any) => ({
          user_id: session.user.id,
          url: `https://twitter.com/i/web/status/${tweet.id}`,
          title: tweet.text.substring(0, 100) + (tweet.text.length > 100 ? '...' : ''),
          description: tweet.text,
          source: 'twitter' as const,
          sync_type: syncType,
          tags: ['twitter', 'liked'],
          created_at: new Date().toISOString()
        }));

        // Insert Twitter likes in batches
        let twitterInsertedCount = 0;
        const batchSize = 50;
        
        console.log(`💾 Starting Twitter likes insertion in batches of ${batchSize}...`);
        
        for (let i = 0; i < twitterLikesToInsert.length; i += batchSize) {
          const batch = twitterLikesToInsert.slice(i, i + batchSize);
          
          console.log(`📤 Inserting Twitter batch ${Math.floor(i/batchSize) + 1}: ${batch.length} items`);
          
          const { error: insertError } = await supabase
            .from('bookmarks')
            .upsert(batch, {
              onConflict: 'user_id,url',
              ignoreDuplicates: false
            });

          if (insertError) {
            console.error('❌ Error inserting Twitter likes batch:', insertError);
          } else {
            twitterInsertedCount += batch.length;
            console.log(`✅ Successfully inserted Twitter batch: ${batch.length} items`);
          }
        }

        console.log(`🎉 Successfully synced ${twitterInsertedCount} Twitter likes`);

        // Update sync history with success
        await updateSyncHistory(supabase, syncHistoryId, 'success', twitterInsertedCount);

        return NextResponse.json({
          success: true,
          count: twitterInsertedCount,
          total: likes.length,
          provider: 'twitter',
          sync_type: syncType
        });

      } catch (error) {
        console.error('💥 Twitter sync error:', error);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error instanceof Error ? error.message : 'Unknown Twitter sync error');
        return NextResponse.json(
          { error: 'Twitter sync failed' },
          { status: 500 }
        );
      }
    }

    // Handle LinkedIn sync
    if (provider === 'linkedin') {
      console.log('💼 Starting LinkedIn sync...');
      
      // Get connected account and access token
      console.log('🔍 Looking for connected LinkedIn account...');
      const { data: connectedAccount, error: accountError } = await supabase
        .from('connected_accounts')
        .select('access_token')
        .eq('user_id', session.user.id)
        .eq('provider', provider)
        .single();

      if (accountError || !connectedAccount) {
        console.log('❌ LinkedIn account not connected:', accountError);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, 'LinkedIn account not connected');
        return NextResponse.json(
          { error: 'LinkedIn account not connected' },
          { status: 400 }
        );
      }

      console.log('✅ Found connected LinkedIn account with access token');

      try {
        // Call the Supabase function to ingest LinkedIn saved items
        const { data, error } = await supabase.functions.invoke('ingest_linkedin_saved', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          console.error('❌ LinkedIn sync error:', error);
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error.message || 'LinkedIn sync failed');
          return NextResponse.json(
            { error: error.message || 'Failed to sync LinkedIn saved items' },
            { status: 500 }
          );
        }

        console.log(`🎉 Successfully synced ${data.count} LinkedIn items`);

        // Update sync history with success
        await updateSyncHistory(supabase, syncHistoryId, 'success', data.count);

        return NextResponse.json({
          success: true,
          count: data.count,
          total: data.total_found,
          provider: 'linkedin',
          sync_type: syncType,
          message: data.message
        });

      } catch (error) {
        console.error('💥 LinkedIn sync error:', error);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error instanceof Error ? error.message : 'Unknown LinkedIn sync error');
        return NextResponse.json(
          { error: 'LinkedIn sync failed' },
          { status: 500 }
        );
      }
    }

    // Handle Reddit sync
    if (provider === 'reddit') {
      console.log('🔴 Starting Reddit saved items sync...');
      
      // Get connected account and access token
      console.log('🔍 Looking for connected Reddit account...');
      const { data: connectedAccount, error: accountError } = await supabase
        .from('connected_accounts')
        .select('access_token')
        .eq('user_id', session.user.id)
        .eq('provider', provider)
        .single();

      if (accountError || !connectedAccount) {
        console.log('❌ Reddit account not connected:', accountError);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, 'Reddit account not connected');
        return NextResponse.json(
          { error: 'Reddit account not connected' },
          { status: 400 }
        );
      }

      console.log('✅ Found connected Reddit account with access token');

      try {
        // Call the Supabase function to ingest Reddit saved items
        const { data, error } = await supabase.functions.invoke('ingest_reddit', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          console.error('❌ Reddit sync error:', error);
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error.message || 'Reddit sync failed');
          return NextResponse.json(
            { error: error.message || 'Failed to sync Reddit saved items' },
            { status: 500 }
          );
        }

        console.log(`🎉 Successfully synced ${data.count} Reddit items`);

        // Update sync history with success
        await updateSyncHistory(supabase, syncHistoryId, 'success', data.count);

        return NextResponse.json({
          success: true,
          count: data.count,
          total: data.total_fetched,
          provider: 'reddit',
          sync_type: syncType,
          message: data.message
        });

      } catch (error) {
        console.error('💥 Reddit sync error:', error);
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error instanceof Error ? error.message : 'Unknown Reddit sync error');
        return NextResponse.json(
          { error: 'Reddit sync failed' },
          { status: 500 }
        );
      }
    }

    // Log sync start
    const { data: syncLog, error: logError } = await (supabase as any)
      .from('sync_history')
      .insert({
        user_id: session.user.id,
        provider,
        sync_type: syncType,
        status: 'success', // Will update if fails
        items_synced: 0,
        started_at: startTime.toISOString()
      })
      .select()
      .single();

    if (!logError && syncLog) {
      syncHistoryId = syncLog.id;
      console.log(`📝 Created sync history entry: ${syncHistoryId}`);
    }

    // Get connected account and access token
    console.log('🔍 Looking for connected GitHub account...');
    const { data: connectedAccount, error: accountError } = await supabase
      .from('connected_accounts')
      .select('access_token')
      .eq('user_id', session.user.id)
      .eq('provider', provider)
      .single();

    if (accountError || !connectedAccount) {
      console.log('❌ GitHub account not connected:', accountError);
      await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, 'GitHub account not connected');
      return NextResponse.json(
        { error: 'GitHub account not connected' },
        { status: 400 }
      );
    }

    console.log('✅ Found connected account with access token');

    // Fetch starred repositories from GitHub API
    let allStars: GitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    console.log(`Starting GitHub sync for user ${session.user.id}...`);

    while (hasMore && page <= 10) { // Limit to 10 pages (1000 stars) for now
      console.log(`📡 Fetching GitHub stars page ${page}...`);
      
      const githubResponse = await fetch(
        `https://api.github.com/user/starred?per_page=100&page=${page}&_=${Date.now()}`, // Add cache buster
        {
          headers: {
            'Authorization': `token ${connectedAccount.access_token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'SKOOP-App',
            'Cache-Control': 'no-cache', // Force fresh data
            'If-None-Match': '' // Bypass GitHub API caching
          }
        }
      );

      console.log(`🌐 GitHub API response status: ${githubResponse.status} ${githubResponse.statusText}`);

      if (!githubResponse.ok) {
        const errorText = await githubResponse.text();
        console.error('❌ GitHub API error:', githubResponse.status, githubResponse.statusText, errorText);
        
        let errorMessage = 'GitHub API error';
        // Handle specific GitHub API errors
        if (githubResponse.status === 401) {
          errorMessage = 'GitHub access token is invalid or expired. Please reconnect your account.';
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, errorMessage);
          return NextResponse.json({ error: errorMessage }, { status: 401 });
        } else if (githubResponse.status === 403) {
          errorMessage = 'GitHub API rate limit exceeded. Please try again later.';
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, errorMessage);
          return NextResponse.json({ error: errorMessage }, { status: 429 });
        } else {
          errorMessage = `GitHub API error: ${githubResponse.statusText}`;
          await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, errorMessage);
          return NextResponse.json({ error: errorMessage }, { status: 500 });
        }
      }

      const pageStars: GitHubRepo[] = await githubResponse.json();
      console.log(`📊 Page ${page}: Got ${pageStars.length} stars from GitHub API`);
      
      // Log first few items for debugging
      if (pageStars.length > 0) {
        console.log('🌟 Sample stars received:', pageStars.slice(0, 2).map(repo => ({
          name: repo.full_name,
          url: repo.html_url,
          description: repo.description?.substring(0, 50)
        })));
      }
      
      if (pageStars.length === 0) {
        hasMore = false;
        break;
      }

      allStars = [...allStars, ...pageStars];
      
      // Check if we got less than 100 items, meaning we're on the last page
      if (pageStars.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`📈 Fetched ${allStars.length} total starred repositories`);

    // Transform GitHub stars to bookmarks format
    console.log('🔄 Transforming GitHub stars to bookmarks format...');
    const bookmarksToInsert = allStars.map(repo => ({
      user_id: session.user.id,
      url: repo.html_url,
      title: repo.full_name,
      description: repo.description || `A ${repo.language || 'code'} repository by ${repo.owner.login}`,
      source: 'github' as const,
      sync_type: syncType,
      tags: [
        ...(repo.language ? [repo.language.toLowerCase()] : []),
        ...repo.topics.slice(0, 5), // Limit to 5 topics
      ].filter(Boolean),
      metadata: {
        stars: repo.stargazers_count,
        language: repo.language,
        forks: repo.forks_count || 0,
        owner: repo.owner.login,
        created_at: repo.created_at,
        updated_at: repo.updated_at
      },
      created_at: new Date().toISOString()
    }));

    console.log(`📋 Prepared ${bookmarksToInsert.length} bookmarks for insertion`);
    
    // Log first bookmark for debugging
    if (bookmarksToInsert.length > 0) {
      console.log('📝 Sample bookmark:', {
        title: bookmarksToInsert[0].title,
        url: bookmarksToInsert[0].url,
        source: bookmarksToInsert[0].source,
        tags: bookmarksToInsert[0].tags
      });
    }

    // Insert bookmarks in batches of 50
    let insertedCount = 0;
    const batchSize = 50;
    
    console.log(`💾 Starting database insertion in batches of ${batchSize}...`);
    
    for (let i = 0; i < bookmarksToInsert.length; i += batchSize) {
      const batch = bookmarksToInsert.slice(i, i + batchSize);
      
      console.log(`📤 Inserting batch ${Math.floor(i/batchSize) + 1}: ${batch.length} items`);
      
      const { data, error: insertError } = await supabase
        .from('bookmarks')
        .upsert(batch, {
          onConflict: 'user_id,url',
          ignoreDuplicates: false
        });

      if (insertError) {
        console.error('❌ Error inserting bookmark batch:', insertError);
        // Continue with other batches even if one fails
      } else {
        insertedCount += batch.length;
        console.log(`✅ Successfully inserted batch: ${batch.length} items`);
      }
    }

    console.log(`🎉 Successfully synced ${insertedCount} GitHub stars`);

    // Update sync history with success
    await updateSyncHistory(supabase, syncHistoryId, 'success', insertedCount);

    console.log(`=== SYNC DEBUG END ===`);

    return NextResponse.json({
      success: true,
      count: insertedCount,
      total: allStars.length,
      provider: 'github',
      sync_type: syncType
    });

  } catch (error) {
    console.error('💥 Sync error:', error);
    
    // Update sync history with failure
    if (syncHistoryId) {
      try {
        const supabase = createServerComponentClient({ cookies });
        await updateSyncHistory(supabase, syncHistoryId, 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
      } catch (logError) {
        console.error('Error updating sync history:', logError);
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to update sync history
async function updateSyncHistory(
  supabase: any,
  syncHistoryId: string | null,
  status: 'success' | 'failed' | 'partial',
  itemsSynced: number,
  errorMessage?: string
) {
  if (!syncHistoryId) return;
  
  try {
    await supabase
      .from('sync_history')
      .update({
        status,
        items_synced: itemsSynced,
        error_message: errorMessage,
        completed_at: new Date().toISOString()
      })
      .eq('id', syncHistoryId);
  } catch (error) {
    console.error('Error updating sync history:', error);
  }
} 