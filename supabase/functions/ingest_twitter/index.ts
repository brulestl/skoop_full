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

    console.log(`Starting Twitter ingestion for user: ${user.id}`)

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
      // TODO: Implement Twitter API integration
      // For now, simulate a successful sync with placeholder logic
      console.log('Twitter ingestion not yet implemented - simulating success')

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
        count: 0, 
        message: 'Twitter ingestion not yet implemented - coming soon!'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })

    } catch (apiError) {
      console.error('Twitter API call failed:', apiError)
      
      // Update connected_accounts with error status
      const errorMessage = apiError.message || 'Failed to fetch data from Twitter API'
      await supabaseAdmin
        .from('connected_accounts')
        .update({ 
          status: 'error',
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