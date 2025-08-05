"use client";

import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";
import { LeagueRequests } from "@/services/leagueStandings/types/types";
import { Inbox } from "lucide-react";

export const Header = ({
  requests,
}: {
  requests: LeagueRequests | undefined;
}) => {
  const pathname = usePathname();

  const generateTailwindCss = (isSelected: boolean) =>
    isSelected ? "mx-2 text-blue-200" : "mx-2 text-blue-800 ";

  return (
    <header className="bg-slate-800 text-white text-3xl px-6 py-4 shadow-md flex flex-row justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/" className={generateTailwindCss(pathname === "/")}>
          Home
        </Link>
        <Link
          href="/my-predictions"
          className={generateTailwindCss(pathname === "/my-predictions")}
        >
          Compare Predictions
        </Link>
        <Link
          href="/leagues"
          className={generateTailwindCss(pathname === "/leagues")}
        >
          My Leagues
        </Link>
      </div>
      <div className="flex flex-row  text-white font-medium py-0 px-4 text-2xl">
        {!!(
          requests?.leagueRequests.length ||
          requests?.leagueUserInvitedTo.length
        ) && (
          <div className="text-white font-medium py-2 px-4 text-2xl">
            <Link href="/leagues/view-requests">
              <button
                type="button"
                className="relative p-3 rounded-full bg-slate-600 hover:bg-slate-500 transition"
              >
                <Inbox className="text-white w-5 h-5" />

                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 min-w-[1rem] text-center">
                  {requests.leagueRequests.length +
                    requests.leagueUserInvitedTo.length}
                </span>
              </button>
            </Link>
          </div>
        )}
        <AuthButton />
      </div>
    </header>
  );
};
