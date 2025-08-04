"use server";

import { currentSeason } from "@/constants/CurrentSeason";
import { inviteUserToLeague } from "@/services/leagueStandings/manageLeagueMembership";

export async function inviteUsersToLeague(
  usernames: string[],
  leagueName: string,
  user: string,
  season = currentSeason
) {
  await inviteUserToLeague(usernames, leagueName, user, season);
}
