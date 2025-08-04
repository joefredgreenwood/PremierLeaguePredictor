import { currentSeason } from "@/constants/CurrentSeason";
import FootballLeagueTableModel from "@/models/FootballLeagueTable";
import { getPremierLeagueStandings } from "@/services/actualLeagueTable/getLeagueTable";
import { updateScoreForAllUsers } from "@/services/userScore/userScore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request.json);
  try {
    await doDailyWork();
    return NextResponse.json({ message: "Daily task completed successfully" });
  } catch (error: unknown) {
    console.error("Error during daily task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
