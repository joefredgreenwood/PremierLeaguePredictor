"use server";

import { createLeagueTable } from "@/services/leagueStandings/manageLeagueMembership";
import { CreateNewLeague } from "./types";
import PredictionLeagueTable from "@/models/PredictionLeagueTable";
import { currentSeason } from "@/constants/CurrentSeason";

export default async function registerNewLeague(
  { leagueName, peopleToInvite }: CreateNewLeague,
  email: string
): Promise<void> {
  await createLeagueTable({ username: email, leagueName, peopleToInvite });
}

export async function validateLeagueName(leagueName: string): Promise<void> {
  const existingLeague = await PredictionLeagueTable.findOne({
    season: currentSeason,
    leagueName: leagueName,
  });

  if (existingLeague) {
    throw new Error(`League with name [${leagueName}] already exists`);
  }
}
