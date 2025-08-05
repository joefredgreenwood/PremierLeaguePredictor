"use client";

import { LeagueStandings } from "@/services/leagueStandings/types/types";
import { MousePointerClickIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const PredictionLeagueTable: React.FC<LeagueStandings> = ({
  leagueName,
  rankedStandings,
}) => {
  const session = useSession();
  const username = session?.data?.user?.email ?? "";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 mb-4">
      {/* Header */}
      <div className="bg-slate-800 text-white text-lg sm:text-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="truncate">{leagueName}</span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 py-2 rounded"
          onClick={() =>
            redirect(
              `/leagues/add-members?leagueName=${encodeURIComponent(
                leagueName
              )}`
            )
          }
        >
          Add Users
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gray-100 font-semibold text-gray-700 text-sm sm:text-base">
            <div className="p-3 border-b">Rank</div>
            <div className="p-3 border-b">Team</div>
            <div className="p-3 border-b">Total Position Difference</div>
            <div className="p-3 border-b">Compare</div>
          </div>

          {/* Table Rows */}
          {rankedStandings.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-4 even:bg-gray-50 text-sm sm:text-base"
            >
              <div className="p-3 border-b">{index + 1}</div>
              <div className="p-3 border-b truncate">{user.username}</div>
              <div className="p-3 border-b">{user.pointsDifferential}</div>
              <div className="p-3 border-b">
                <button
                  aria-label={`Compare ${username} with ${user.username}`}
                  className="hover:text-blue-600"
                  onClick={() =>
                    redirect(
                      `/prediction-comparator?team1Email=${encodeURIComponent(
                        username
                      )}&team2Email=${encodeURIComponent(user.username)}`
                    )
                  }
                >
                  <MousePointerClickIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionLeagueTable;
