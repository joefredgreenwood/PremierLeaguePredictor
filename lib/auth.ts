import User from "@/models/User";
import { AuthOptions } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When the user logs in for the first time, store additional data in the token
      if (user) {
        try {
          const dbUser = await User.findOne({ username: user.name });
          if (dbUser) {
            token.height = dbUser.height; // Add height to the JWT token
            user.height = dbUser.height;
          }
        } catch (e) {
          console.error(e);
          token.height = "100";
        }
      }
      return token;
    },
    async session({ session }) {
      const user = await User.findOne({ username: session.user?.name });

      if (user) {
        session!.user!.height = user.height;
      }

      return session;
    },
  },
};

export default authOptions;
