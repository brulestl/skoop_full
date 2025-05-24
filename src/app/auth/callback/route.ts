import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const provider = requestUrl.searchParams.get('provider') as 'github' | 'twitter' | 'reddit' | 'stack'

  if (code) {
    const supabase = createRouteHandlerClient({
      cookies,
    })

    try {
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${requestUrl.origin}/dashboard/profile?error=oauth_failed`)
      }

      // If we have a provider and session with provider token, store it
      if (provider && data.session && data.session.provider_token) {
        const { user, provider_token, provider_refresh_token } = data.session

        if (user) {
          // Insert or update the connected account
          const { error: insertError } = await (supabase as any)
            .from('connected_accounts')
            .upsert({
              user_id: user.id,
              provider: provider,
              access_token: provider_token,
              refresh_token: provider_refresh_token || null,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id,provider'
            })

          if (insertError) {
            console.error('Error storing connected account:', insertError)
            return NextResponse.redirect(`${requestUrl.origin}/dashboard/profile?error=store_failed`)
          }
        }
      }

      // Redirect to profile page with success
      return NextResponse.redirect(`${requestUrl.origin}/dashboard/profile?connected=${provider || 'account'}`)
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/dashboard/profile?error=callback_failed`)
    }
  }

  // No code provided, redirect with error
  return NextResponse.redirect(`${requestUrl.origin}/dashboard/profile?error=no_code`)
} 