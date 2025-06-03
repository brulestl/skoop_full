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
    console.log('🔴 Reddit ingestion started')
    
    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
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

    console.log(`✅ User authenticated: ${user.id}`)

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

    console.log('✅ Reddit account found')

    // Update last_sync_at timestamp
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'reddit')

    // Reddit API credentials from environment variables
    const REDDIT_CLIENT_ID = Deno.env.get('REDDIT_CLIENT_ID')
    const REDDIT_CLIENT_SECRET = Deno.env.get('REDDIT_CLIENT_SECRET')

    if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
      console.error('❌ Missing Reddit API credentials in environment variables')
      throw new Error('Reddit integration not configured - missing REDDIT_CLIENT_ID or REDDIT_CLIENT_SECRET')
    }

    console.log('✅ Reddit API credentials found')

    // Function to refresh access token if needed
    const refreshRedditToken = async (refreshToken: string) => {
      try {
        console.log('🔄 Refreshing Reddit access token...')
        
        const refreshResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          })
        })

        if (!refreshResponse.ok) {
          const errorText = await refreshResponse.text()
          throw new Error(`Failed to refresh Reddit token: ${refreshResponse.status} ${refreshResponse.statusText} - ${errorText}`)
        }

        const refreshData = await refreshResponse.json()
        
        // Update the stored access token
        await supabaseAdmin
          .from('connected_accounts')
          .update({ 
            access_token: refreshData.access_token,
            status: 'active',
            last_error: null,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('provider', 'reddit')

        console.log('✅ Reddit token refreshed successfully')
        return refreshData.access_token
      } catch (refreshError) {
        console.error('❌ Reddit token refresh failed:', refreshError)
        
        // Update connected_accounts with error status
        await supabaseAdmin
          .from('connected_accounts')
          .update({ 
            status: 'expired',
            last_error: refreshError.message || 'Failed to refresh Reddit token',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('provider', 'reddit')

        throw refreshError
      }
    }

    // Function to fetch Reddit saved items
    const fetchRedditSaved = async (accessToken: string) => {
      try {
        console.log('📡 Fetching Reddit saved items...')
        
        // Test token validity and get user info first
        console.log('🔍 Testing Reddit token with user info...')
        const userInfoResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
          }
        })

        console.log(`📡 Reddit user info response: ${userInfoResponse.status} ${userInfoResponse.statusText}`)

        if (!userInfoResponse.ok) {
          if (userInfoResponse.status === 401 && account.refresh_token) {
            console.log('🔄 Access token expired, refreshing...')
            const newAccessToken = await refreshRedditToken(account.refresh_token)
            return await fetchRedditSaved(newAccessToken)
          }
          
          const errorText = await userInfoResponse.text()
          throw new Error(`Reddit user info error: ${userInfoResponse.status} ${userInfoResponse.statusText} - ${errorText}`)
        }

        const userInfo = await userInfoResponse.json()
        console.log(`✅ Reddit user verified: ${userInfo.name}`)

        // Try different Reddit API endpoints for saved items
        const endpoints = [
          'https://oauth.reddit.com/user/me/saved',
          'https://oauth.reddit.com/user/me/saved.json',
          'https://oauth.reddit.com/u/me/saved',
          'https://oauth.reddit.com/u/me/saved.json'
        ]

        let savedData = null
        let lastError = null

        for (const endpoint of endpoints) {
          try {
            console.log(`🔍 Trying Reddit endpoint: ${endpoint}`)
            
            const response = await fetch(`${endpoint}?limit=10`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
              }
            })

            console.log(`📡 Response for ${endpoint}: ${response.status} ${response.statusText}`)

            if (response.ok) {
              savedData = await response.json()
              console.log(`✅ Success with endpoint: ${endpoint}`)
              break
            } else {
              const errorText = await response.text()
              console.log(`❌ Failed ${endpoint}: ${response.status} - ${errorText}`)
              lastError = { status: response.status, text: errorText, endpoint }
              
              // If 401, try token refresh
              if (response.status === 401 && account.refresh_token) {
                console.log('🔄 Token might be expired, trying refresh...')
                const newAccessToken = await refreshRedditToken(account.refresh_token)
                return await fetchRedditSaved(newAccessToken)
              }
            }
          } catch (endpointError) {
            console.log(`❌ Exception with ${endpoint}:`, endpointError)
            lastError = { endpoint, error: endpointError.message }
          }
        }

        if (!savedData) {
          // If all endpoints failed, provide detailed error
          const errorDetails = lastError ? 
            `Last error from ${lastError.endpoint}: ${lastError.status || 'Exception'} - ${lastError.text || lastError.error}` : 
            'All Reddit API endpoints failed'
          
          throw new Error(`Reddit saved items API failed. ${errorDetails}. This usually indicates missing OAuth scopes. Please ensure your Reddit app has 'identity', 'history', 'save', and 'read' scopes.`)
        }

        return savedData
      } catch (apiError) {
        console.error('❌ Reddit API call failed:', apiError)
        
        // Update connected_accounts with error status if not already updated
        if (!apiError.message.includes('after refresh')) {
          await supabaseAdmin
            .from('connected_accounts')
            .update({ 
              status: 'error',
              last_error: apiError.message || 'Failed to fetch data from Reddit API',
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .eq('provider', 'reddit')
        }

        throw apiError
      }
    }

    let redditData
    try {
      // Fetch saved items from Reddit
      redditData = await fetchRedditSaved(account.access_token)
    } catch (fetchError) {
      console.error('❌ Failed to fetch Reddit data:', fetchError)
      throw fetchError
    }
    
    if (!redditData?.data?.children) {
      console.log('📭 No saved items found or unexpected response format')
      console.log('📋 Reddit response structure:', JSON.stringify(redditData, null, 2))
      return new Response(JSON.stringify({ count: 0, message: 'No saved items found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })
    }

    const items = redditData.data.children
    console.log(`📊 Found ${items.length} saved Reddit items`)

    let insertedCount = 0
    let processedCount = 0

    // Process each saved item
    for (const item of items) {
      const itemData = item.data
      processedCount++
      
      // Skip if not a post (t3) or comment (t1)
      if (!['t3', 't1'].includes(item.kind)) {
        console.log(`⏭️ Skipping item ${processedCount}: unsupported type ${item.kind}`)
        continue
      }

      try {
        // Store raw data first
        const { error: rawError } = await supabaseAdmin
          .from('bookmarks_raw')
          .upsert({
            user_id: user.id,
            source: 'reddit',
            raw_json: itemData,
            fetched_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,source,(raw_json->>\'id\')'
          })

        if (rawError) {
          console.error(`❌ Error storing raw data for item ${processedCount}:`, rawError)
        }

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

        const { error: bookmarkError } = await supabaseAdmin
          .from('bookmarks')
          .upsert({
            user_id: user.id,
            url: url,
            title: title || 'Untitled',
            description: description?.substring(0, 500) || '',
            source: 'reddit',
            tags: ['reddit', isComment ? 'comment' : 'post'],
            created_at: new Date(itemData.created_utc * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,url'
          })

        if (bookmarkError) {
          console.error(`❌ Error storing bookmark for item ${processedCount}:`, bookmarkError)
        } else {
          insertedCount++
          console.log(`✅ Processed item ${processedCount}/${items.length}: ${title?.substring(0, 50)}...`)
        }
      } catch (error) {
        console.error(`❌ Error processing Reddit item ${processedCount}:`, error)
        // Continue processing other items
      }
    }

    // Update connected_accounts with successful sync status
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        status: 'active',
        last_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'reddit')

    console.log(`🎉 Successfully processed ${insertedCount}/${items.length} Reddit items`)

    return new Response(JSON.stringify({ 
      count: insertedCount, 
      total_fetched: items.length,
      message: `Successfully synced ${insertedCount} Reddit saved items`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('❌ Reddit ingestion error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to ingest Reddit data',
      count: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
}) 