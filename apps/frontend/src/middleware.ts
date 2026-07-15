import { NextResponse, type NextRequest } from 'next/server';
import { resolveTenant } from './lib/tenant';

// Multi-tenant edge middleware. For a tenant host it rewrites the request to the
// internal /site/<tenant>/<path> route (which fetches + renders the published
// page); requests to the app's own domain pass through untouched.
export const config = {
  // Skip Next internals, API routes, and any path containing a file extension.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export function middleware(req: NextRequest) {
  const tenant = resolveTenant(req.headers.get('host'));
  if (!tenant) return NextResponse.next();

  const url = req.nextUrl.clone();
  const path = url.pathname === '/' ? '' : url.pathname;
  url.pathname = `/site/${tenant}${path}`;
  return NextResponse.rewrite(url);
}
