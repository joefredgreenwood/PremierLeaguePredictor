"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";
import { LeagueRequests } from "@/services/leagueStandings/types/types";
import { Inbox, Menu, X } from "lucide-react";

export const Header = ({
  requests,
}: {
  requests: LeagueRequests | undefined;
}) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const generateTailwindCss = (isSelected: boolean) =>
    isSelected ? "text-blue-200" : "text-blue-400 hover:text-blue-200";

  const pendingCount =
    (requests?.leagueRequests.length ?? 0) +
    (requests?.leagueUserInvitedTo.length ?? 0);

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left section: Logo + Desktop nav links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="text-3xl font-semibold">
            Premier League
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center space-x-6 text-xl">
            <Link href="/" className={generateTailwindCss(pathname === "/")}>
              Home
            </Link>
            <Link
              href="/my-predictions"
              className={generateTailwindCss(pathname === "/my-predictions")}
            >
              Compare
            </Link>
            <Link
              href="/leagues"
              className={generateTailwindCss(pathname === "/leagues")}
            >
              Leagues
            </Link>
          </nav>
        </div>

        {/* Right section: Inbox + Auth */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu toggle */}
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Inbox */}
          {!!pendingCount && (
            <Link href="/leagues/view-requests">
              <button
                type="button"
                className="relative p-3 rounded-full bg-slate-600 hover:bg-slate-500 transition"
              >
                <Inbox className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 min-w-[1rem] text-center">
                  {pendingCount}
                </span>
              </button>
            </Link>
          )}

          {/* Auth Button */}
          <AuthButton />
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 text-lg">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={generateTailwindCss(pathname === "/")}
          >
            Home
          </Link>
          <Link
            href="/my-predictions"
            onClick={() => setMenuOpen(false)}
            className={generateTailwindCss(pathname === "/my-predictions")}
          >
            Compare Predictions
          </Link>
          <Link
            href="/leagues"
            onClick={() => setMenuOpen(false)}
            className={generateTailwindCss(pathname === "/leagues")}
          >
            My Leagues
          </Link>
        </div>
      )}
    </header>
  );
};
