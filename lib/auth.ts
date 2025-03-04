// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("here");
//         if (!credentials?.username || !credentials?.password) {
//           throw new Error("Invalid username or password");
//         }
//         console.log({ credentials });

//         const user = await User.findOne({ username: credentials.username });
//         if (!user) {
//           throw new Error("Invalid username or password");
//         }

//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValidPassword) {
//           throw new Error("Invalid username or password");
//         }

//         return {
//           id: user.username.toString(),
//           name: user.username,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.JWT_SECRET,
// };
