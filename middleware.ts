import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log({ token }, "-------------------------------");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    console.log(
      { token },
      ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
    );
    jwt.verify(token, JWT_SECRET);
    console.log("here ////////////////////////////////////////////////////");
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    console.log("here2 ----------------------------------------------------");
    // return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }
}

// Define which routes to apply middleware to
export const config = {
  matcher: ["/about/:path*"], // Protect all /dashboard routes
};
