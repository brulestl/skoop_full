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
        const itemData = item.data
        
        // Store raw data
        await supabase
          .from('bookmarks_raw')
          .insert({
            user_id,
            source: 'reddit',
            raw_json: item,
            fetched_at: new Date().toISOString()
          })

        // Process into bookmarks table
        let url = ''
        let title = ''
        let description = ''
        
        if (item.kind === 't3') { // Post
          url = `https://reddit.com${itemData.permalink}`
          title = itemData.title || 'Reddit Post'
          description = itemData.selftext || itemData.url || ''
        } else if (item.kind === 't1') { // Comment
          url = `https://reddit.com${itemData.permalink}`
          title = `Comment by u/${itemData.author}`
          description = itemData.body || ''
        }

        if (url) {
          await supabase
            .from('bookmarks')
            .insert({
              user_id,
              source: 'reddit',
              url,
              title,
              description,
              created_at: new Date().toISOString()
            })
          
          itemsProcessed++
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
      
      // Update sync history - failed
      await supabase
        .from('sync_history')
        .update({
          status: 'failed',
          error_message: fetchError.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', syncRecord?.id)

      return new Response(
        JSON.stringify({ error: fetchError.message }),
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
  
  // First, test token with /api/v1/me
  const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', { headers })
  
  if (!userResponse.ok) {
    const userError = await userResponse.text()
    console.error('❌ Reddit user API failed:', userResponse.status, userError)
    throw new Error(`Reddit token validation failed: ${userResponse.status} - ${userError}`)
  }
  
  const userData = await userResponse.json()
  console.log('✅ Reddit token valid for user:', userData.name)

  // Now try to fetch saved items with the CORRECT endpoint
  console.log('🟡 Fetching saved items from Reddit API...')
  
  const savedResponse = await fetch('https://oauth.reddit.com/user/me/saved', { headers })
  
  if (!savedResponse.ok) {
    let errorText = ''
    try {
      const errorData = await savedResponse.json()
      errorText = JSON.stringify(errorData)
    } catch {
      errorText = await savedResponse.text()
    }
    
    console.error('❌ Reddit saved items error details:', errorText)
    
    throw new Error(`Reddit saved items API failed: ${savedResponse.status} - ${errorText}. This usually indicates missing OAuth scopes. Please ensure your Reddit app has 'identity', 'history', 'save', and 'read' scopes.`)
  }
  
  const savedData = await savedResponse.json()
  console.log('✅ Successfully fetched Reddit saved items')
  
  return savedData
} 