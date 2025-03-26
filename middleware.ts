import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For now, we'll use basic auth
    const basicAuth = request.headers.get('authorization')

    if (!basicAuth) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
      })
    }

    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    // Replace these with your desired credentials
    if (user !== 'admin' || pwd !== 'ladakh123') {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 