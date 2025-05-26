import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DetailedContext {
  readme?: string;
  codeFile?: string;
  issues?: string[];
  discussions?: string[];
  thread?: string;
  sentiment?: string;
  comments?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { bookmarkId, userId, forceRefresh = false } = await req.json()
    
    // Initialize Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get bookmark details
    const { data: bookmark, error: bookmarkError } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('id', bookmarkId)
      .eq('user_id', userId)
      .single()

    if (bookmarkError || !bookmark) {
      throw new Error('Bookmark not found')
    }

    // Check if we already have a detailed summary and don't need to refresh
    if (bookmark.summary_detailed && !forceRefresh) {
      return new Response(
        JSON.stringify({ summary: bookmark.summary_detailed, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Determine source type from URL
    const url = bookmark.url
    let sourceType = 'general'
    if (url.includes('github.com')) sourceType = 'github'
    else if (url.includes('twitter.com') || url.includes('x.com')) sourceType = 'twitter'
    else if (url.includes('reddit.com')) sourceType = 'reddit'
    else if (url.includes('stackoverflow.com')) sourceType = 'stack'

    // Fetch detailed context based on source type
    const context = await fetchDetailedContext(url, sourceType, userId, supabase)
    
    // Generate detailed summary with AI
    const detailedSummary = await generateDetailedSummary(bookmark, context, sourceType)
    
    // Save to database
    const { error: updateError } = await supabase
      .from('bookmarks')
      .update({ summary_detailed: detailedSummary })
      .eq('id', bookmarkId)
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating bookmark:', updateError)
    }

    return new Response(
      JSON.stringify({ summary: detailedSummary, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating detailed summary:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})

async function fetchDetailedContext(url: string, sourceType: string, userId: string, supabase: any): Promise<DetailedContext> {
  let context: DetailedContext = {}

  try {
    switch (sourceType) {
      case 'github':
        context = await fetchGitHubContext(url, userId, supabase)
        break
      case 'twitter':
        context = await fetchTwitterContext(url, userId, supabase)
        break
      case 'reddit':
        context = await fetchRedditContext(url)
        break
      case 'stack':
        context = await fetchStackOverflowContext(url)
        break
    }
  } catch (error) {
    console.error(`Error fetching ${sourceType} context:`, error)
  }

  return context
}

async function fetchGitHubContext(url: string, userId: string, supabase: any): Promise<DetailedContext> {
  const context: DetailedContext = {}
  
  try {
    // Parse GitHub URL to get owner/repo
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!match) return context

    const [, owner, repo] = match
    
    // Try to get GitHub access token for the user (optional)
    let headers: any = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'SKOOP-Bot/1.0'
    }
    
    try {
      const { data: account } = await supabase
        .from('connected_accounts')
        .select('access_token')
        .eq('user_id', userId)
        .eq('provider', 'github')
        .single()

      if (account?.access_token) {
        headers['Authorization'] = `token ${account.access_token}`
      }
    } catch (e) {
      console.log('No GitHub token found, using public API')
    }

    // Fetch README
    try {
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers })
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json()
        const readmeContent = atob(readmeData.content)
        context.readme = readmeContent.slice(0, 2000) // First 2KB
      }
    } catch (e) {
      console.log('No README found or API error:', e)
    }

    // Fetch repository info for basic details
    try {
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      if (repoResponse.ok) {
        const repoData = await repoResponse.json()
        // Add repo description and language info to context
        if (repoData.description) {
          context.readme = (context.readme || '') + `\n\nRepository Description: ${repoData.description}`
        }
        if (repoData.language) {
          context.readme = (context.readme || '') + `\n\nPrimary Language: ${repoData.language}`
        }
        if (repoData.topics && repoData.topics.length > 0) {
          context.readme = (context.readme || '') + `\n\nTopics: ${repoData.topics.join(', ')}`
        }
      }
    } catch (e) {
      console.log('Could not fetch repository info:', e)
    }

    // Fetch a representative code file
    try {
      const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, { headers })
      if (contentsResponse.ok) {
        const contents = await contentsResponse.json()
        const codeFile = contents.find((file: any) => 
          file.type === 'file' && 
          (file.name.endsWith('.js') || file.name.endsWith('.ts') || file.name.endsWith('.py') || file.name.endsWith('.java') || file.name.endsWith('.go') || file.name.endsWith('.rs'))
        )
        
        if (codeFile && codeFile.download_url) {
          const fileResponse = await fetch(codeFile.download_url)
          if (fileResponse.ok) {
            const fileContent = await fileResponse.text()
            context.codeFile = `File: ${codeFile.name}\n${fileContent.slice(0, 1000)}` // First 1KB
          }
        }
      }
    } catch (e) {
      console.log('No code files found or API error:', e)
    }

    // Fetch top 5 issues (public repositories)
    try {
      const issuesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&sort=comments&per_page=5`, { headers })
      if (issuesResponse.ok) {
        const issues = await issuesResponse.json()
        context.issues = issues.map((issue: any) => `${issue.title}: ${issue.body?.slice(0, 200) || 'No description'}`)
      }
    } catch (e) {
      console.log('No issues found or API error:', e)
    }

    // For public repos, we can still try to get basic stats
    try {
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      if (repoResponse.ok) {
        const repoData = await repoResponse.json()
        const stats = `Stars: ${repoData.stargazers_count}, Forks: ${repoData.forks_count}, Issues: ${repoData.open_issues_count}`
        context.readme = (context.readme || '') + `\n\nRepository Stats: ${stats}`
      }
    } catch (e) {
      console.log('Could not fetch repository stats:', e)
    }

  } catch (error) {
    console.error('Error fetching GitHub context:', error)
  }

  return context
}

async function fetchTwitterContext(url: string, userId: string, supabase: any): Promise<DetailedContext> {
  const context: DetailedContext = {}
  
  try {
    // Get Twitter access token for the user
    const { data: account } = await supabase
      .from('connected_accounts')
      .select('access_token')
      .eq('user_id', userId)
      .eq('provider', 'twitter')
      .single()

    if (!account?.access_token) {
      return context
    }

    // Extract tweet ID from URL
    const tweetMatch = url.match(/status\/(\d+)/)
    if (!tweetMatch) return context

    const tweetId = tweetMatch[1]
    const headers = {
      'Authorization': `Bearer ${account.access_token}`,
      'Content-Type': 'application/json'
    }

    // Fetch tweet and replies (conversation)
    try {
      const tweetResponse = await fetch(
        `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id,referenced_tweets.id&tweet.fields=created_at,public_metrics,context_annotations&user.fields=name,username`,
        { headers }
      )
      
      if (tweetResponse.ok) {
        const tweetData = await tweetResponse.json()
        context.thread = `Original: ${tweetData.data.text}`
        
        // Fetch replies/conversation
        const conversationResponse = await fetch(
          `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetId}&max_results=10&tweet.fields=created_at,public_metrics`,
          { headers }
        )
        
        if (conversationResponse.ok) {
          const conversationData = await conversationResponse.json()
          if (conversationData.data) {
            const replies = conversationData.data.map((tweet: any) => tweet.text).join(' | ')
            context.thread += ` | Replies: ${replies}`
          }
        }

        // Simple sentiment analysis based on metrics
        const metrics = tweetData.data.public_metrics
        const engagement = metrics.like_count + metrics.retweet_count + metrics.reply_count
        const sentiment = engagement > 100 ? 'High engagement, likely positive' : 
                         engagement > 10 ? 'Moderate engagement' : 'Low engagement'
        context.sentiment = sentiment
      }
    } catch (e) {
      console.log('Error fetching Twitter data:', e)
    }

  } catch (error) {
    console.error('Error fetching Twitter context:', error)
  }

  return context
}

async function fetchRedditContext(url: string): Promise<DetailedContext> {
  const context: DetailedContext = {}
  
  try {
    // Convert Reddit URL to JSON API format
    const jsonUrl = url.replace(/\/$/, '') + '.json'
    
    const response = await fetch(jsonUrl, {
      headers: { 'User-Agent': 'SKOOP-Bot/1.0' }
    })
    
    if (response.ok) {
      const data = await response.json()
      const post = data[0]?.data?.children?.[0]?.data
      const comments = data[1]?.data?.children || []
      
      if (post) {
        context.comments = comments
          .slice(0, 5)
          .map((comment: any) => comment.data?.body || '')
          .filter((body: string) => body && body !== '[deleted]')
      }
    }
  } catch (error) {
    console.error('Error fetching Reddit context:', error)
  }

  return context
}

async function fetchStackOverflowContext(url: string): Promise<DetailedContext> {
  const context: DetailedContext = {}
  
  try {
    // Extract question ID from Stack Overflow URL
    const match = url.match(/questions\/(\d+)/)
    if (!match) return context

    const questionId = match[1]
    
    // Fetch question and answers from Stack Overflow API
    const response = await fetch(
      `https://api.stackexchange.com/2.3/questions/${questionId}/answers?order=desc&sort=votes&site=stackoverflow&filter=withbody`
    )
    
    if (response.ok) {
      const data = await response.json()
      context.comments = data.items
        .slice(0, 5)
        .map((answer: any) => answer.body?.replace(/<[^>]*>/g, '').slice(0, 300) || '')
    }
  } catch (error) {
    console.error('Error fetching Stack Overflow context:', error)
  }

  return context
}

async function generateDetailedSummary(bookmark: any, context: DetailedContext, sourceType: string): Promise<string> {
  const configuration = new Configuration({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  })
  const openai = new OpenAIApi(configuration)

  let prompt = `Source: ${sourceType}
Title: ${bookmark.title}
URL: ${bookmark.url}
Description: ${bookmark.description || 'No description'}

Context:`

  let hasContext = false

  if (context.readme) {
    prompt += `\n- README/Repository Info: ${context.readme}`
    hasContext = true
  }
  
  if (context.codeFile) {
    prompt += `\n- Code sample: ${context.codeFile}`
    hasContext = true
  }
  
  if (context.issues?.length) {
    prompt += `\n- Issues: ${context.issues.join('; ')}`
    hasContext = true
  }
  
  if (context.discussions?.length) {
    prompt += `\n- Discussions: ${context.discussions.join('; ')}`
    hasContext = true
  }
  
  if (context.thread) {
    prompt += `\n- Thread: ${context.thread}`
    hasContext = true
  }
  
  if (context.sentiment) {
    prompt += `\n- Sentiment summary: ${context.sentiment}`
    hasContext = true
  }
  
  if (context.comments?.length) {
    prompt += `\n- Comments: ${context.comments.join('; ')}`
    hasContext = true
  }

  if (!hasContext) {
    prompt += `\n- Limited context available - analyzing based on title, URL, and description only`
  }

  if (sourceType === 'github') {
    prompt += `\n\nProvide a comprehensive summary of this GitHub repository highlighting:
1. The main purpose and what problem it solves
2. Key technologies, frameworks, or languages used
3. Target audience and use cases
4. Community activity and project maturity
5. Why developers should consider using or contributing to this project

Keep it informative and practical (3-4 paragraphs).`
  } else {
    prompt += `\n\nProvide a comprehensive summary highlighting:
1. The key purpose and functionality
2. Community feedback and engagement
3. Technical details and implementation
4. Overall sentiment and reception
5. Who would benefit from this content

Keep it informative but concise (3-4 paragraphs).`
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: sourceType === 'github' 
            ? 'You are an expert developer and technical content analyst. Create comprehensive, well-structured summaries that help developers quickly understand the value, purpose, and context of GitHub repositories and technical projects.'
            : 'You are an expert technical content analyst. Create comprehensive, well-structured summaries that help developers quickly understand the value and context of technical content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    return completion.data.choices[0].message?.content?.trim() || 'Summary generation failed'
  } catch (error) {
    console.error('Error generating AI summary:', error)
    return 'Failed to generate detailed summary'
  }
} 