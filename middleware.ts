import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value; // Primarily check cookie

    if (!token) {
      return NextResponse.redirect(new URL('/auth/admin-login?redirect=' + encodeURIComponent(pathname), request.url));
    }
  }

  if (pathname.startsWith('/api/admin')) {
    // Kiểm tra cả Authorization header và admin_token cookie
    const authHeader = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const token = authHeader || cookieToken;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify token (có thể thêm validation logic ở đây)
    if (token !== 'admin_demo_token') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
} 