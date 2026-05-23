import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  
  if (request.nextUrl.pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
