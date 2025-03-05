import authOptions from "@/lib/auth";
import NextAuth from "next-auth";

export const maxDuration = 30; // This function can run for a maximum of 30 seconds

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
