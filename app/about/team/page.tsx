import Loading from "@/app/loading";
import User from "@/models/User";
import Link from "next/link";
import React, { Suspense } from "react";

async function getUserNames(): Promise<string[]> {
  try {
    const users = await User.find().lean();
    return users.length ? users.map((user) => user.username) : ["randomPerson"];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserNameSlowWrapper() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const usernames = await getUserNames();
  return (
    <ul>
      {usernames.map((username) => {
        return (
          <li key={username}>
            <Link href={`/about/team/${username}`}> {username}</Link>
          </li>
        );
      })}
    </ul>
  );
}

const TeamPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const usernames = getUserNameSlowWrapper();

  return (
    <div>
      <h1>Fast Loading Part</h1>
      <Suspense fallback={<Loading />}>{usernames} </Suspense>
    </div>
  );
};

export default TeamPage;
