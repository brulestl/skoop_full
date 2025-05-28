import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('No authorization header')
    }

    const jwt = authorization.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt)
    
    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    console.log(`Starting Twitter bookmark ingestion for user: ${user.id}`)

    // Get Twitter access token from connected_accounts
    const { data: account, error: accountError } = await supabaseAdmin
      .from('connected_accounts')
      .select('access_token')
      .eq('user_id', user.id)
      .eq('provider', 'twitter')
      .single()

    if (accountError || !account) {
      throw new Error('Twitter account not connected or access token not found')
    }

    // Update last_sync_at timestamp
    await supabaseAdmin
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('provider', 'twitter')

    try {
      console.log('Fetching Twitter bookmarks...')

      // First, get the user's Twitter ID
      const userResponse = await fetch('https://api.twitter.com/2/users/me', {
        headers: {
          'Authorization': `Bearer ${account.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!userResponse.ok) {
        const errorText = await userResponse.text()
        console.error('Failed to get Twitter user info:', errorText)
        
        if (userResponse.status === 401) {
          throw new Error('Twitter access token expired or invalid')
        }
        throw new Error(`Twitter API error: ${userResponse.status} ${errorText}`)
      }

      const userData = await userResponse.json()
      const userId = userData.data.id
      console.log(`Twitter user ID: ${userId}`)

      let totalProcessed = 0
      let nextToken = null
      let pageCount = 0
      const maxPages = 10 // Prevent infinite loops

      // Loop through all pages of bookmarks
      do {
        pageCount++
        console.log(`Fetching bookmarks page ${pageCount}${nextToken ? ` (token: ${String(nextToken).substring(0, 20)}...)` : ''}`)

        // Build the bookmarks URL with pagination
        const url = `https://api.twitter.com/2/users/${userId}/bookmarks` +
          `?max_results=100&tweet.fields=created_at,public_metrics,entities` +
          (nextToken ? `&pagination_token=${nextToken}` : '')

        const bookmarksResponse = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${account.access_token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!bookmarksResponse.ok) {
          const errorText = await bookmarksResponse.text()
          console.error('Failed to fetch Twitter bookmarks:', errorText)
          
          if (bookmarksResponse.status === 401) {
            throw new Error('Twitter access token expired or lacks bookmark.read scope')
          }
          if (bookmarksResponse.status === 403) {
            throw new Error('Twitter API access denied - check if app has Elevated access and bookmark.read scope')
          }
          throw new Error(`Twitter bookmarks API error: ${bookmarksResponse.status} ${errorText}`)
        }

        const bookmarksData = await bookmarksResponse.json()
        const bookmarks = bookmarksData.data || []
        console.log(`Fetched ${bookmarks.length} bookmarks on page ${pageCount}`)

        // Process bookmarks from this page
        for (const tweet of bookmarks) {
          try {
            // Create bookmark data object
            const bookmarkData = {
              id: tweet.id,
              text: tweet.text,
              created_at: tweet.created_at,
              public_metrics: tweet.public_metrics,
              entities: tweet.entities,
              url: `https://twitter.com/i/status/${tweet.id}`,
              fetched_at: new Date().toISOString()
            }

            // Insert into bookmarks_raw with source='twitter_bookmark'
            await supabaseAdmin
              .from('bookmarks_raw')
              .upsert({
                user_id: user.id,
                source: 'twitter_bookmark',
                raw_json: bookmarkData,
                fetched_at: new Date().toISOString()
              }, {
                onConflict: 'user_id,source,raw_json'
              })

            totalProcessed++
          } catch (bookmarkError) {
            console.error('Error processing bookmark:', bookmarkError)
            // Continue processing other bookmarks
          }
        }

        // Check for next page
        nextToken = bookmarksData.meta?.next_token || null
        
        // Safety check to prevent infinite loops
        if (pageCount >= maxPages) {
          console.log(`Reached maximum pages limit (${maxPages}), stopping pagination`)
          break
        }

      } while (nextToken)

      console.log(`Completed bookmark ingestion: ${totalProcessed} bookmarks across ${pageCount} pages`)

      // Update connected_accounts with successful sync status
      await supabaseAdmin
        .from('connected_accounts')
        .update({ 
          status: 'active',
          last_error: null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('provider', 'twitter')

      return new Response(JSON.stringify({ 
        count: totalProcessed, 
        pages: pageCount,
        message: `Successfully synced ${totalProcessed} Twitter bookmarks across ${pageCount} pages`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })

    } catch (apiError) {
      console.error('Twitter API call failed:', apiError)
      
      // Determine if this is an auth error (expired token) or other error
      const isAuthError = apiError.message.includes('expired') || apiError.message.includes('401')
      
      // Update connected_accounts with error status
      const errorMessage = apiError.message || 'Failed to fetch data from Twitter API'
      await supabaseAdmin
        .from('connected_accounts')
        .update({ 
          status: isAuthError ? 'expired' : 'error',
          last_error: errorMessage,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('provider', 'twitter')

      throw apiError
    }

  } catch (error) {
    console.error('Twitter ingestion error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to ingest Twitter data',
      count: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
}) 