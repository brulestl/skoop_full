import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('No user found')
    }

    // Get Facebook connected account
    const { data: accounts, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'facebook')
      .single()

    if (accountError || !accounts) {
      throw new Error('No Facebook account connected')
    }

    const accessToken = accounts.access_token
    let allSavedItems: any[] = []
    let nextUrl = `https://graph.facebook.com/v18.0/me/saved?fields=permalink_url,attachments{description,title,url},created_time&access_token=${accessToken}&limit=100`

    // Fetch saved posts with pagination
    while (nextUrl) {
      console.log('Fetching from:', nextUrl)
      
      const response = await fetch(nextUrl)
      const data = await response.json()

      if (data.error) {
        console.error('Facebook API error:', data.error)
        throw new Error(`Facebook API error: ${data.error.message}`)
      }

      if (data.data && data.data.length > 0) {
        allSavedItems = allSavedItems.concat(data.data)
      }

      // Check for next page
      nextUrl = data.paging?.next || null
      
      // Limit to prevent infinite loops (max 1000 items)
      if (allSavedItems.length >= 1000) {
        break
      }
    }

    console.log(`Found ${allSavedItems.length} saved items`)

    // Process and store saved items
    const processedItems = []
    
    for (const item of allSavedItems) {
      try {
        // Extract attachment data
        const attachment = item.attachments?.data?.[0]
        const url = attachment?.url || item.permalink_url
        const title = attachment?.title || 'Facebook Saved Item'
        const description = attachment?.description || ''

        if (!url) continue

        // Create bookmark entry
        const bookmarkData = {
          user_id: user.id,
          url: url,
          title: title,
          description: description,
          source: 'facebook_saved',
          metadata: {
            facebook_id: item.id,
            created_time: item.created_time,
            permalink_url: item.permalink_url,
            attachment: attachment
          },
          created_at: item.created_time || new Date().toISOString()
        }

        processedItems.push(bookmarkData)
      } catch (error) {
        console.error('Error processing item:', error, item)
      }
    }

    // Batch insert bookmarks
    if (processedItems.length > 0) {
      const { data: insertedBookmarks, error: insertError } = await supabaseClient
        .from('bookmarks')
        .upsert(processedItems, {
          onConflict: 'user_id,url',
          ignoreDuplicates: false
        })

      if (insertError) {
        console.error('Error inserting bookmarks:', insertError)
        throw insertError
      }

      console.log(`Successfully inserted ${processedItems.length} bookmarks`)
    }

    // Update last sync time
    await supabaseClient
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .eq('provider', 'facebook')

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${processedItems.length} Facebook saved items`,
        count: processedItems.length,
        total_found: allSavedItems.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Facebook ingest error:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 