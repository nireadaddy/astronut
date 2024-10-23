import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Create a secret key for JWT verification
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// Protected routes that require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /reading, /daily)
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/about',
    '/privacy',
    '/terms',
  ];

  // Check if the path is public
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('auth-token');

  // Redirect to login if there's no token
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(token.value, secret);

    // Add user info to headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);

    // Continue with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Handle invalid token
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);

    // Clear invalid token
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth-token');

    return response;
  }
}
