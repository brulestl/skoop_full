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

    // Get LinkedIn connected account
    const { data: accounts, error: accountError } = await supabaseClient
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'linkedin')
      .single()

    if (accountError || !accounts) {
      throw new Error('No LinkedIn account connected')
    }

    const accessToken = accounts.access_token
    let allSavedItems: any[] = []

    // First, get user profile to get their LinkedIn ID
    console.log('Fetching LinkedIn user profile...')
    const profileResponse = await fetch('https://api.linkedin.com/v2/people/~?projection=(id,firstName,lastName)', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202212'
      }
    })

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text()
      console.error('LinkedIn profile API error:', profileResponse.status, errorText)
      throw new Error(`LinkedIn profile API error: ${profileResponse.status} ${errorText}`)
    }

    const profileData = await profileResponse.json()
    const linkedinUserId = profileData.id

    console.log(`Found LinkedIn user ID: ${linkedinUserId}`)

    // Fetch user's posts using the Posts API
    console.log('Fetching LinkedIn posts...')
    const postsUrl = `https://api.linkedin.com/rest/posts?author=urn%3Ali%3Aperson%3A${encodeURIComponent(linkedinUserId)}&q=author&count=50&sortBy=LAST_MODIFIED`
    
    const postsResponse = await fetch(postsUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202212',
        'X-RestLi-Method': 'FINDER'
      }
    })

    if (postsResponse.ok) {
      const postsData = await postsResponse.json()
      if (postsData.elements && postsData.elements.length > 0) {
        allSavedItems = allSavedItems.concat(postsData.elements.map((post: any) => ({
          ...post,
          type: 'post'
        })))
        console.log(`Found ${postsData.elements.length} LinkedIn posts`)
      }
    } else {
      console.warn('Failed to fetch LinkedIn posts:', postsResponse.status, await postsResponse.text())
    }

    // Fetch user's articles using the Articles API
    console.log('Fetching LinkedIn articles...')
    const articlesResponse = await fetch('https://api.linkedin.com/v2/originalArticles?q=authors', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    })

    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json()
      if (articlesData.elements && articlesData.elements.length > 0) {
        allSavedItems = allSavedItems.concat(articlesData.elements.map((article: any) => ({
          ...article,
          type: 'article'
        })))
        console.log(`Found ${articlesData.elements.length} LinkedIn articles`)
      }
    } else {
      console.warn('Failed to fetch LinkedIn articles:', articlesResponse.status, await articlesResponse.text())
    }

    console.log(`Total LinkedIn items found: ${allSavedItems.length}`)

    // Process and store saved items
    const processedItems = []
    
    for (const item of allSavedItems) {
      try {
        let url, title, description, previewImage, createdAt

        if (item.type === 'post') {
          // Process LinkedIn post
          url = `https://www.linkedin.com/feed/update/${item.id}/`
          title = item.commentary ? 
            (item.commentary.length > 100 ? item.commentary.substring(0, 100) + '...' : item.commentary) :
            'LinkedIn Post'
          description = item.commentary || ''
          previewImage = null
          createdAt = item.createdAt ? new Date(item.createdAt).toISOString() : new Date().toISOString()

          // Extract image from content if available
          if (item.content?.media?.id) {
            previewImage = item.content.media.id
          }
        } else if (item.type === 'article') {
          // Process LinkedIn article
          url = `https://www.linkedin.com/pulse/${item.permlink || item.id}/`
          title = item.title || 'LinkedIn Article'
          description = item.content?.['com.linkedin.publishing.HtmlContent']?.htmlText?.replace(/<[^>]*>/g, '').substring(0, 500) || ''
          previewImage = item.displayImage || item.coverImage?.croppedImage?.cropped || null
          createdAt = item.publishedAt ? new Date(item.publishedAt).toISOString() : new Date().toISOString()
        }

        if (!url) continue

        // Create bookmark entry
        const bookmarkData = {
          user_id: user.id,
          url: url,
          title: title,
          description: description,
          source: 'linkedin',
          tags: ['linkedin', item.type],
          preview_image: previewImage,
          metadata: {
            linkedin_id: item.id,
            linkedin_type: item.type,
            raw: item
          },
          created_at: createdAt
        }

        processedItems.push(bookmarkData)
      } catch (error) {
        console.error('Error processing LinkedIn item:', error, item)
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

      console.log(`Successfully inserted ${processedItems.length} LinkedIn bookmarks`)
    }

    // Update last sync time
    await supabaseClient
      .from('connected_accounts')
      .update({ 
        last_sync_at: new Date().toISOString(),
        status: 'active'
      })
      .eq('user_id', user.id)
      .eq('provider', 'linkedin')

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${processedItems.length} LinkedIn items`,
        count: processedItems.length,
        total_found: allSavedItems.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('LinkedIn ingest error:', error)
    
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