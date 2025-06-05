import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  // Anything but the home page requires authentication
  const requiresAuth = req.nextUrl.pathname.length > 1;
  if (requiresAuth) {
    // Let `withAuth` handle authentication
    return withAuth(() => {
      return NextResponse.next();
    }, {})(req as NextRequestWithAuth, event);
  }

  return NextResponse.next();
}

// Config with a wildcard matcher to ensure all requests go through middleware
export const config = {
  matcher: "/((?!api|_next|_proxy|_auth|assets|images|favicon.ico).*)",
};
