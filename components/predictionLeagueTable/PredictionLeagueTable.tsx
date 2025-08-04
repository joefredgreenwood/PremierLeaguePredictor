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
    <>
      <div className="bg-slate-800 text-white text-xl bg-5 p-5 flex items-center justify-between">
        <span>{leagueName}</span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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

      <div className="border border-gray-300 rounded-md overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-4 sm:grid-cols-4 bg-gray-100 font-semibold text-gray-700">
          <div className="p-3 border-b">Rank</div>
          <div className="p-3 border-b">Team</div>
          <div className="p-3 border-b">Total Position Difference</div>
          <div className="p-3 border-b">Compare predictions</div>
        </div>

        {/* Data Rows */}
        {rankedStandings.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-4 sm:grid-cols-4 even:bg-gray-50"
          >
            <div className="p-3 border-b sm:border-0 sm:border-r">
              {index + 1}
            </div>
            <div className="p-3 border-b sm:border-0 sm:border-r">
              {user.username}
            </div>
            <div className="p-3 border-b sm:border-0 sm:border-r">
              {user.pointsDifferential}
            </div>
            <div className="p-3 border-b sm:border-0">
              <button
                onClick={() => {
                  redirect(
                    `/prediction-comparator?team1Email=${encodeURIComponent(
                      username
                    )}&team2Email=${encodeURIComponent(user.username)}`
                  );
                }}
              >
                <MousePointerClickIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PredictionLeagueTable;
