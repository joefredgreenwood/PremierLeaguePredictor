import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// You can only have one middleware per app which is a bit annoying, they recommend using conditionals basically
// https://nextjs.org/docs/messages/nested-middleware
export function middleware(req: NextRequest, event: NextFetchEvent) {
  console.log("Global middleware runs for every request");

  // If you had APIs could check the headers in here to make sure they are verified

  // Check if the route requires authentication
  const requiresAuth = req.nextUrl.pathname.startsWith("/about");
  if (requiresAuth) {
    console.log("This route requires authentication");
    // Let `withAuth` handle authentication
    return withAuth(() => {
      console.log("User is authenticated on a protected route");
      return NextResponse.next();
    }, {})(req as NextRequestWithAuth, event);
  }

  return NextResponse.next();
}

// Config with a wildcard matcher to ensure all requests go through middleware
export const config = {
  matcher: "/((?!api|_next|_proxy|_auth|assets|images|favicon.ico).*)",
};
