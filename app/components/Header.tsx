import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/"> Home</Link>
        </div>
        <div className="links">
          <Link href="/about">About</Link>
          <Link href="/about/team">Our Team</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </header>
  );
};
