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
    const { content, type } = await req.json()
    
    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Generate summary based on content type
    let prompt = ''
    switch (type) {
      case 'github':
        prompt = `Summarize this GitHub repository or issue in a concise way:\n\n${content}`
        break
      case 'twitter':
        prompt = `Summarize this Twitter thread or post in a concise way:\n\n${content}`
        break
      case 'reddit':
        prompt = `Summarize this Reddit post and its comments in a concise way:\n\n${content}`
        break
      case 'stack':
        prompt = `Summarize this Stack Overflow question and its answers in a concise way:\n\n${content}`
        break
      default:
        prompt = `Summarize this content in a concise way:\n\n${content}`
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    })

    const summary = completion.data.choices[0].text?.trim()

    return new Response(
      JSON.stringify({ summary }),
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