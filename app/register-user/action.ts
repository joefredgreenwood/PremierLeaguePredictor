"use server";

import User from "@/models/User";
import { v4 as uuidGenerator } from "uuid";

export default async function registerNewUser({
  username,
  height,
  email,
}: {
  username: string;
  height: string;
  email: string;
}) {
  // Validate what has been passed in
  await new Promise((res) => setTimeout(res, 3000));
  const validation = await validateUsername(username);
  if (validation) {
    throw new Error("Username failed validation");
  }
  await User.insertOne({
    height,
    username,
    email,
    password: uuidGenerator(),
  });
  console.log(username, height, email);
  return "Hello here";
}

export async function validateUsername(
  username: string
): Promise<string | undefined> {
  console.log("Validation being called");
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return "Username is already taken";
  }
  return undefined;
}
