import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, accessToken } = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch starred repositories
    const response = await fetch('https://api.github.com/user/starred', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stars')
    }

    const stars = await response.json()

    // Process each starred repository
    for (const star of stars) {
      // Store raw data
      await supabaseClient
        .from('bookmarks_raw')
        .insert({
          user_id: userId,
          source: 'github',
          raw_json: star,
        })

      // Generate embedding
      const configuration = new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
      })
      const openai = new OpenAIApi(configuration)

      const content = `${star.full_name}\n${star.description || ''}\n${star.html_url}`
      const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: content,
      })

      const [{ embedding }] = embeddingResponse.data.data

      // Store processed bookmark
      await supabaseClient
        .from('bookmarks')
        .insert({
          user_id: userId,
          url: star.html_url,
          title: star.full_name,
          description: star.description,
          vector: embedding,
        })
    }

    return new Response(
      JSON.stringify({ success: true, count: stars.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
}) 