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

    console.log(`Starting GitHub ingestion for user: ${user.id}`)

    // Get GitHub access token from connected_accounts
    const { data: account, error: accountError } = await supabaseAdmin
      .from('connected_accounts')
      .select('access_token')
      .eq('user_id', user.id)
      .eq('provider', 'github')
      .single()

    if (accountError || !account) {
      throw new Error('GitHub account not connected or access token not found')
    }

    // Fetch starred repositories from GitHub
    const response = await fetch('https://api.github.com/user/starred?per_page=100', {
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SKOOP/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const repositories = await response.json()
    console.log(`Found ${repositories.length} starred GitHub repositories`)

    let insertedCount = 0

    // Process each starred repository
    for (const repo of repositories) {
      try {
      // Store raw data
        await supabaseAdmin
        .from('bookmarks_raw')
          .upsert({
            user_id: user.id,
          source: 'github',
            raw_json: repo,
            fetched_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,source,raw_json'
          })

        // Extract and store processed bookmark data
        const tags = ['github', 'repository']
        if (repo.language) {
          tags.push(repo.language.toLowerCase())
        }
        if (repo.topics && Array.isArray(repo.topics)) {
          tags.push(...repo.topics)
        }

        await supabaseAdmin
        .from('bookmarks')
          .upsert({
            user_id: user.id,
            url: repo.html_url,
            title: repo.full_name || repo.name,
            description: repo.description || '',
            tags: tags,
            created_at: repo.starred_at || repo.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,url'
          })

        insertedCount++
      } catch (error) {
        console.error('Error processing GitHub repository:', error)
        // Continue processing other items
      }
    }

    console.log(`Successfully processed ${insertedCount} GitHub repositories`)

    return new Response(JSON.stringify({ 
      count: insertedCount, 
      total_fetched: repositories.length,
      message: `Successfully synced ${insertedCount} GitHub starred repositories`
    }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('GitHub ingestion error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to ingest GitHub data',
      count: 0
    }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
}) 