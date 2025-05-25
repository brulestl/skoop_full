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
  { params }: { params: { provider: string } }
) {
  const startTime = new Date();
  let syncHistoryId: string | null = null;
  
  try {
    const { provider } = params;
    
    console.log(`=== SYNC DEBUG START === Provider: ${provider}`);
    
    if (provider !== 'github') {
      return NextResponse.json(
        { error: 'Provider not supported yet' },
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