import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get user from JWT token
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('No authorization header')
    }

    const jwt = authorization.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt)
    
    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    console.log(`Starting Reddit ingestion for user: ${user.id}`)

    // Get Reddit access token from connected_accounts
    const { data: account, error: accountError } = await supabaseAdmin
      .from('connected_accounts')
      .select('access_token, refresh_token')
      .eq('user_id', user.id)
      .eq('provider', 'reddit')
      .single()

    if (accountError || !account) {
      throw new Error('Reddit account not connected or access token not found')
    }

    // Reddit API credentials
    const REDDIT_CLIENT_ID = 'ZtTUnPPm6b5qPU65KQcLLg'
    const REDDIT_CLIENT_SECRET = 'l1gq8I2TKMMkWFbPWpqe0jZzcdRM3A'

    // Function to refresh access token if needed
    const refreshRedditToken = async (refreshToken: string) => {
      const refreshResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`),
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SKOOP/1.0'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      })

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh Reddit token')
      }

      const refreshData = await refreshResponse.json()
      
      // Update the stored access token
      await supabaseAdmin
        .from('connected_accounts')
        .update({ 
          access_token: refreshData.access_token,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('provider', 'reddit')

      return refreshData.access_token
    }

    // Function to fetch Reddit saved items
    const fetchRedditSaved = async (accessToken: string) => {
      const response = await fetch('https://oauth.reddit.com/user/me/saved?limit=100', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'SKOOP/1.0'
        }
      })

      if (response.status === 401 && account.refresh_token) {
        // Token expired, try to refresh
        console.log('Access token expired, refreshing...')
        const newAccessToken = await refreshRedditToken(account.refresh_token)
        
        // Retry with new token
        const retryResponse = await fetch('https://oauth.reddit.com/user/me/saved?limit=100', {
          headers: {
            'Authorization': `Bearer ${newAccessToken}`,
            'User-Agent': 'SKOOP/1.0'
          }
        })

        if (!retryResponse.ok) {
          throw new Error(`Reddit API error after refresh: ${retryResponse.status} ${retryResponse.statusText}`)
        }

        return retryResponse.json()
      }

      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    }

    // Fetch saved items from Reddit
    const redditData = await fetchRedditSaved(account.access_token)
    
    if (!redditData?.data?.children) {
      console.log('No saved items found')
      return new Response(JSON.stringify({ count: 0, message: 'No saved items found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })
    }

    const items = redditData.data.children
    console.log(`Found ${items.length} saved Reddit items`)

    let insertedCount = 0

    // Process each saved item
    for (const item of items) {
      const itemData = item.data
      
      // Skip if not a post (t3) or comment (t1)
      if (!['t3', 't1'].includes(item.kind)) {
        continue
      }

      try {
        // Store raw data
        await supabaseAdmin
          .from('bookmarks_raw')
          .upsert({
            user_id: user.id,
            source: 'reddit',
            raw_json: itemData,
            fetched_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,source,raw_json'
          })

        // Extract and store processed bookmark data
        const isComment = item.kind === 't1'
        const url = isComment 
          ? `https://reddit.com${itemData.permalink}`
          : itemData.url || `https://reddit.com${itemData.permalink}`
        
        const title = isComment 
          ? `Comment on: ${itemData.link_title || 'Reddit Post'}`
          : itemData.title
        
        const description = isComment 
          ? itemData.body 
          : itemData.selftext || itemData.title

        await supabaseAdmin
          .from('bookmarks')
          .upsert({
            user_id: user.id,
            url: url,
            title: title || 'Untitled',
            description: description?.substring(0, 500) || '',
            tags: ['reddit', isComment ? 'comment' : 'post'],
            created_at: new Date(itemData.created_utc * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,url'
          })

        insertedCount++
      } catch (error) {
        console.error('Error processing Reddit item:', error)
        // Continue processing other items
      }
    }

    console.log(`Successfully processed ${insertedCount} Reddit items`)

    return new Response(JSON.stringify({ 
      count: insertedCount, 
      total_fetched: items.length,
      message: `Successfully synced ${insertedCount} Reddit saved items`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Reddit ingestion error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to ingest Reddit data',
      count: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
}) 