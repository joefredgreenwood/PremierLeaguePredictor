// "use server";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "@/models/User";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

// // Secret for JWT (in a real app, store this securely!)
// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("bad");
// }

// export async function loginAction(username: string, password: string) {
//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       throw new Error("Invalid username or password");
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new Error("Invalid username or password");
//     }

//     // Create a JWT token (or set up a session)
//     const token = jwt.sign({ userId: user.username }, JWT_SECRET as string, {
//       expiresIn: "1h",
//     });

//     (await cookies()).set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       maxAge: 60 * 60,
//       secure: process.env.NODE_ENV === "production",
//     });

//     // Store the token in cookies or redirect (example using redirect)

//     // In a real app, you might set a cookie instead of a plain return:
//     // cookies().set('token', token, { httpOnly: true });
//   } catch (error) {
//     throw new Error("Failed to login");
//   }
//   return redirect("/about"); // Redirect to a secure page
// }
