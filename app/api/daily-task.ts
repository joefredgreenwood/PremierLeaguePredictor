// pages/api/daily-task.ts
import { currentSeason } from "@/constants/CurrentSeason";
import FootballLeagueTableModel from "@/models/FootballLeagueTable";
import { getPremierLeagueStandings } from "@/services/actualLeagueTable/getLeagueTable";
import { updateScoreForAllUsers } from "@/services/userScore/userScore";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData =
  | {
      message: string;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await doDailyWork();
    return res
      .status(200)
      .json({ message: "Daily task completed successfully" });
  } catch (error: unknown) {
    console.error("Error during daily task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function doDailyWork(): Promise<void> {
  const premierLeague = "PremierLeague";
  // Get Up to date league
  const currentLeagueTable = await getPremierLeagueStandings();
  const dbLeagueTable = await FootballLeagueTableModel.findOne(
    { season: currentSeason, leagueName: premierLeague },
    {},
    { sort: { createdAt: -1 } }
  );

  if (currentLeagueTable.totalGamesPlayed !== dbLeagueTable?.gamesPlayed) {
    // Save the latest league
    await FootballLeagueTableModel.insertOne({
      leagueName: premierLeague,
      league: currentLeagueTable.table,
      gamesPlayed: currentLeagueTable.totalGamesPlayed,
      season: currentSeason,
    });

    // Update the scores for all users with a prediction
    await updateScoreForAllUsers(currentLeagueTable.table);
  }
}
