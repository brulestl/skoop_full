import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { content, type = 'general', long = false, model = 'gpt-3.5-turbo' } = await req.json()
    
    console.log('Received request:', { content: content?.slice(0, 100) + '...', type, long, model })
    
    // This function doesn't require authentication since it's just generating summaries
    // No user-specific data is accessed
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }

    // Generate summary based on content type and length
    let prompt = ''
    let maxTokens = long ? 600 : 50
    
    if (long) {
      // Long summary prompt
      switch (type) {
        case 'github':
          prompt = `Analyze this GitHub repository and provide a comprehensive summary. Based on the title, URL, description, and any available content, create a detailed analysis covering:

1. **Purpose & Problem Solved**: What is the main purpose of this project and what problem does it solve?
2. **Technology Stack**: What programming languages, frameworks, or technologies are used?
3. **Key Features**: What are the main features and capabilities?
4. **Target Audience**: Who would benefit from using this project (developers, companies, specific use cases)?
5. **Project Maturity**: Based on available information, assess the project's maturity and community adoption

Provide 3-4 well-structured paragraphs that give developers a clear understanding of whether this project is relevant to their needs.

Content: ${content}`
          break
        case 'twitter':
          prompt = `Provide a detailed summary of this Twitter thread or post. Include:
1. Main topic and key points
2. Important insights or takeaways
3. Context and relevance
4. Who should read this

Content: ${content}`
          break
        case 'reddit':
          prompt = `Provide a comprehensive summary of this Reddit post and discussion. Include:
1. Main topic and question/issue
2. Key insights from comments
3. Community consensus or debate points
4. Practical takeaways

Content: ${content}`
          break
        case 'stack':
          prompt = `Provide a detailed summary of this Stack Overflow question and answers. Include:
1. The problem being solved
2. Best solution approach
3. Key technical details
4. When to use this solution

Content: ${content}`
          break
        default:
          prompt = `Provide a comprehensive summary of this content. Include:
1. Main topic and key points
2. Important insights or information
3. Who would benefit from reading this
4. Practical applications or takeaways

Content: ${content}`
      }
    } else {
      // Short summary prompt (≤20 words)
      prompt = `Summarize in ≤20 words for a busy developer. Focus on the core value. No emojis. Plain text only:

${content}`
    }

    const systemPrompt = long 
      ? (type === 'github' 
          ? 'You are an expert developer and technical content analyst specializing in open-source projects. Create comprehensive, well-structured summaries that help developers quickly understand the value, purpose, and relevance of GitHub repositories and technical projects. Focus on practical insights and actionable information.'
          : 'You are a helpful assistant that creates comprehensive, well-structured summaries for developers and tech professionals.')
      : 'You are a helpful assistant that creates ultra-concise summaries in 20 words or less for busy developers.'

    console.log('Making OpenAI request with model:', model.includes('gpt-4') ? 'gpt-4' : 'gpt-3.5-turbo')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model.includes('gpt-4') ? 'gpt-4' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', response.status, errorData)
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`)
    }

    const data = await response.json()
    const summary = data.choices[0].message?.content?.trim()

    console.log('Generated summary:', summary?.slice(0, 100) + '...')

    return new Response(
      JSON.stringify({ summary }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
}) 