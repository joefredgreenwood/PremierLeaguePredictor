import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
// import logger from "@/services/logger";
import authOptions from "@/lib/auth";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;
  const height = session?.user?.height;
  // logger.info("This is a log");
  return (
    <div>
      <h1>
        Welcome {name} to your first first Next App. You are {height}
      </h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
