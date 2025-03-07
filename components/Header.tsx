"use client";

import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="container">
        <div className="navbar">
          <Link
            href="/"
            className={pathname === "/" ? "link-selected" : "link-not-selected"}
          >
            {" "}
            Home
          </Link>

          <Link
            href="/about"
            className={
              pathname === "/about" ? "link-selected" : "link-not-selected"
            }
          >
            About
          </Link>
          <Link
            href="/about/team"
            className={
              pathname === "/about/team" ? "link-selected" : "link-not-selected"
            }
          >
            Our Team
          </Link>
          <Link
            href="/register-user"
            className={
              pathname === "/register-user"
                ? "link-selected"
                : "link-not-selected"
            }
          >
            Register a new user
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
