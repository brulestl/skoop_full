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

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get user from request body
    const { user_id } = await req.json()
    
    if (!user_id) {
      console.error('❌ Missing user_id in request')
      return new Response(
        JSON.stringify({ error: 'Missing user_id' }),
        { status: 400, headers: corsHeaders }
      )
    }

    console.log(`🟡 Processing Reddit sync for user: ${user_id}`)

    // Get connected Reddit account
    const { data: account, error: accountError } = await supabase
      .from('connected_accounts')
      .select('access_token, refresh_token, status')
      .eq('user_id', user_id)
      .eq('provider', 'reddit')
      .single()

    if (accountError || !account) {
      console.error('❌ No Reddit account found:', accountError)
      return new Response(
        JSON.stringify({ error: 'No Reddit account connected' }),
        { status: 404, headers: corsHeaders }
      )
    }

    if (account.status !== 'active') {
      console.error('❌ Reddit account not active:', account.status)
      return new Response(
        JSON.stringify({ error: 'Reddit account not active' }),
        { status: 403, headers: corsHeaders }
      )
    }

    // Update sync history - start
    const { data: syncRecord } = await supabase
      .from('sync_history')
      .insert({
        user_id,
        provider: 'reddit',
        status: 'in_progress',
        started_at: new Date().toISOString()
      })
      .select()
      .single()

    console.log('🟡 Sync record created:', syncRecord?.id)

    try {
      // Fetch Reddit saved items with corrected endpoint
      const savedData = await fetchRedditSaved(account.access_token)
      
      let itemsProcessed = 0
      const items = savedData?.data?.children || []

      console.log(`🟡 Retrieved ${items.length} Reddit saved items`)

      for (const item of items) {
        try {
          const itemData = item.data
          
          console.log(`🔍 Processing item: ${item.kind} - ${itemData?.title || itemData?.body?.substring(0, 50) || 'untitled'}`)
          
          // Store raw data with error handling
          try {
            const { error: rawInsertError } = await supabase
              .from('bookmarks_raw')
              .insert({
                user_id,
                source: 'reddit',
                raw_json: item,
                fetched_at: new Date().toISOString()
              })
            
            if (rawInsertError) {
              console.error('❌ Failed to insert raw data:', rawInsertError)
              // Continue processing even if raw insert fails
            }
          } catch (rawError) {
            console.error('💥 Raw data insert error:', rawError)
            // Continue processing
          }

          // Process into bookmarks table with improved validation
          let url = ''
          let title = ''
          let description = ''
          
          if (item.kind === 't3') { // Post
            // Fix URL construction - use www.reddit.com
            url = `https://www.reddit.com${itemData.permalink || ''}`
            title = (itemData.title || 'Reddit Post').substring(0, 500) // Limit title length
            description = (itemData.selftext || itemData.url || '').substring(0, 2000) // Limit description
          } else if (item.kind === 't1') { // Comment
            url = `https://www.reddit.com${itemData.permalink || ''}`
            title = `Comment by u/${itemData.author || 'unknown'}`.substring(0, 500)
            description = (itemData.body || '').substring(0, 2000)
          } else {
            console.log(`⚠️ Unknown item kind: ${item.kind}, skipping...`)
            continue
          }

          // Validate required fields
          if (!url || !title) {
            console.log(`⚠️ Skipping item due to missing URL or title`)
            continue
          }

          // Insert into bookmarks with error handling
          try {
            const { error: bookmarkError } = await supabase
              .from('bookmarks')
              .insert({
                user_id,
                source: 'reddit',
                url,
                title,
                description,
                created_at: new Date().toISOString()
              })
            
            if (bookmarkError) {
              console.error('❌ Failed to insert bookmark:', bookmarkError)
              console.error('🔍 Bookmark data:', { url: url.substring(0, 100), title: title.substring(0, 50) })
              
              // Check if it's a duplicate URL error and continue
              if (bookmarkError.message?.includes('duplicate') || bookmarkError.code === '23505') {
                console.log('ℹ️ Duplicate bookmark, skipping...')
                continue
              } else {
                // For other errors, still count as processed but log the issue
                console.error('⚠️ Non-duplicate bookmark error, continuing...')
              }
            }
            
            itemsProcessed++
            console.log(`✅ Processed item ${itemsProcessed}: ${title.substring(0, 50)}`)
            
          } catch (bookmarkInsertError) {
            console.error('💥 Bookmark insert error:', bookmarkInsertError)
            // Continue processing other items
          }
          
        } catch (itemError) {
          console.error('💥 Error processing individual item:', itemError)
          console.error('🔍 Item data:', JSON.stringify(item, null, 2).substring(0, 500))
          // Continue with next item
        }
      }

      // Update sync history - success
      await supabase
        .from('sync_history')
        .update({
          status: 'success',
          items_synced: itemsProcessed,
          completed_at: new Date().toISOString()
        })
        .eq('id', syncRecord?.id)

      // Update connected account status
      await supabase
        .from('connected_accounts')
        .update({
          last_sync_at: new Date().toISOString(),
          status: 'active'
        })
        .eq('user_id', user_id)
        .eq('provider', 'reddit')

      console.log(`✅ Reddit sync completed: ${itemsProcessed} items processed`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          items_processed: itemsProcessed,
          total_items: items.length
        }),
        { headers: corsHeaders }
      )

    } catch (fetchError) {
      console.error('❌ Failed to fetch Reddit data:', fetchError)
      console.error('❌ Error details:', {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack?.substring(0, 500)
      })
      
      // Update sync history - failed
      const { error: syncUpdateError } = await supabase
        .from('sync_history')
        .update({
          status: 'failed',
          error_message: fetchError.message || 'Unknown error during Reddit sync',
          completed_at: new Date().toISOString()
        })
        .eq('id', syncRecord?.id)
      
      if (syncUpdateError) {
        console.error('❌ Failed to update sync history:', syncUpdateError)
      }

      return new Response(
        JSON.stringify({ 
          error: fetchError.message || 'Reddit sync failed',
          details: 'Check Edge Function logs for more information'
        }),
        { status: 500, headers: corsHeaders }
      )
    }

  } catch (error) {
    console.error('❌ Reddit ingestion error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    )
  }
})

async function fetchRedditSaved(accessToken: string) {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
  }

  console.log('🟡 Testing Reddit token validity...')
  console.log('🔍 Request headers (token redacted):', {
    'Authorization': 'Bearer [REDACTED]',
    'User-Agent': headers['User-Agent']
  })
  
  // First, test token with /api/v1/me
  const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', { headers })
  
  if (!userResponse.ok) {
    const userError = await userResponse.text()
    console.error('❌ Reddit user API failed:', userResponse.status, userError)
    throw new Error(`Reddit token validation failed: ${userResponse.status} - ${userError}`)
  }
  
  const userData = await userResponse.json()
  console.log('✅ Reddit token valid for user:', userData.name)

  // Now try to fetch saved items - attempt multiple endpoints
  console.log('🟡 Fetching saved items from Reddit API...')
  
  // List of endpoints to try (in order of most likely to work)
  const endpointsToTry = [
    'https://oauth.reddit.com/user/me/saved.json?raw_json=1&limit=25',
    'https://oauth.reddit.com/user/me/saved.json?limit=25', 
    'https://oauth.reddit.com/user/me/saved?raw_json=1&limit=25',
    'https://oauth.reddit.com/user/me/saved?limit=25',
    'https://oauth.reddit.com/user/me/saved',
    `https://oauth.reddit.com/user/${userData.name}/saved.json?raw_json=1&limit=25`
  ]
  
  let savedResponse
  let usedEndpoint = ''
  
  for (const endpoint of endpointsToTry) {
    console.log(`🔍 Trying endpoint: ${endpoint}`)
    console.log(`🔍 Request headers: ${JSON.stringify({
      'Authorization': 'Bearer [REDACTED]',
      'User-Agent': headers['User-Agent']
    })}`)
    
    try {
      savedResponse = await fetch(endpoint, { headers })
      usedEndpoint = endpoint
      
      console.log(`📊 Response status for ${endpoint}: ${savedResponse.status}`)
      console.log(`📊 Response headers: ${JSON.stringify(Object.fromEntries(savedResponse.headers.entries()))}`)
      
      if (savedResponse.ok) {
        console.log(`✅ Success with endpoint: ${endpoint}`)
        break
      } else {
        // Log the error details for this endpoint
        let errorText = ''
        try {
          const errorData = await savedResponse.clone().json()
          errorText = JSON.stringify(errorData)
        } catch {
          errorText = await savedResponse.clone().text()
        }
        console.log(`❌ Failed with ${savedResponse.status}: ${errorText}`)
      }
    } catch (error) {
      console.log(`💥 Network error for ${endpoint}:`, error.message)
    }
  }
  
  if (!savedResponse || !savedResponse.ok) {
    // If all endpoints failed, get detailed error from the last attempt
    let errorText = ''
    try {
      const errorData = await savedResponse?.json()
      errorText = JSON.stringify(errorData)
    } catch {
      errorText = await savedResponse?.text() || 'Unknown error'
    }
    
    console.error('❌ All Reddit saved items endpoints failed')
    console.error('🔍 Last endpoint tried:', usedEndpoint)
    console.error('🔍 Last error details:', errorText)
    console.error('🔍 Available scopes check: Please verify your Reddit app has these scopes:')
    console.error('   - identity ✓ (working - user info retrieved)')
    console.error('   - history ❓ (needed for saved items)')
    console.error('   - save ❓ (needed for saved items)')
    console.error('   - read ✓ (basic read access)')
    
    throw new Error(`Reddit saved items API failed: ${savedResponse?.status || 'unknown'} - ${errorText}. 
Tried ${endpointsToTry.length} different endpoints. This usually indicates missing OAuth scopes. 
Please ensure your Reddit app has 'identity', 'history', 'save', and 'read' scopes.
Last endpoint: ${usedEndpoint}`)
  }
  
  const savedData = await savedResponse.json()
  console.log('✅ Successfully fetched Reddit saved items')
  console.log(`📊 Used endpoint: ${usedEndpoint}`)
  console.log(`📊 Items found: ${savedData?.data?.children?.length || 0}`)
  
  return savedData
} 