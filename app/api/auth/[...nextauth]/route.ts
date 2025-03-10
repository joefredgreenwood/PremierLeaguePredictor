import authOptions from "@/lib/auth";
import NextAuth from "next-auth";

// Increase the timeout for this function as doing quite a lot in
// the callback function
export const maxDuration = 30;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
