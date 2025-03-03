import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
});

export const config = {
  matcher: ["/about/:path*"],
};
