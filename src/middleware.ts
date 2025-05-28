import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Detect the correct origin when behind a proxy (like ngrok)
    const forwardedHost = req.headers.get('x-forwarded-host')
    const forwardedProto = req.headers.get('x-forwarded-proto')
    const host = req.headers.get('host')
    
    let origin: string
    if (forwardedHost && forwardedProto) {
      // Behind a proxy like ngrok
      origin = `${forwardedProto}://${forwardedHost}`
    } else if (host) {
      // Direct access
      const protocol = req.nextUrl.protocol
      origin = `${protocol}//${host}`
    } else {
      // Fallback to nextUrl origin
      origin = req.nextUrl.origin
    }
    
    const redirectUrl = new URL('/login', origin)
    return NextResponse.redirect(redirectUrl)
  }
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 