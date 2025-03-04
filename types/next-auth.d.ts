import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      height?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    height?: string;
  }

  interface JWT {
    height?: string;
  }
}
