import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/"> Home</Link>
        </div>
        <div className="links">
          <AuthButton />
          <Link href="/about">About</Link>
          <Link href="/about/team">Our Team</Link>
          <Link href="/registerUser">Register a new user</Link>
        </div>
      </div>
    </header>
  );
};
