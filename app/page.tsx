import React from "react";
import Link from "next/link";

const HomePage = () => {
  console.log(process.env.JWT_SECRET);
  return (
    <div>
      <h1>Welcome to my first Next App</h1>
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
