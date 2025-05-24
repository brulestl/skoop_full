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
    const { query, userId, limit = 10 } = await req.json()
    
    // Initialize OpenAI for embeddings
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Generate embedding for the query
    const embeddingResponse = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: query,
    })

    const [{ embedding }] = embeddingResponse.data.data

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Perform semantic search using pgvector
    const { data: bookmarks, error } = await supabaseClient
      .rpc('match_bookmarks', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: limit,
        p_user_id: userId
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ results: bookmarks }),
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