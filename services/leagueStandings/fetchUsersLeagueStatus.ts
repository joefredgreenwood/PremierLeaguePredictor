import PredictionLeagueTableModel from "@/models/PredictionLeagueTable";
import Prediction from "@/models/Prediction";
import { getPremierLeagueStandings } from "../actualLeagueTable/getLeagueTable";
import { getDifferenceBetweenLeagueTable } from "../leagueComparisonLogic/getDifferenceBetweenTeams";
import { currentSeason } from "@/constants/CurrentSeason";
import { LeagueRequest, LeagueRequests, LeagueStandings } from "./types/types";

async function fetchConfirmedLeagueStandings(
  username: string,
  season: string,
  currentTable: string[]
) {
  // fetch the confirmed leagues which the user is part of
  const confirmedLeagues = await PredictionLeagueTableModel.find({
    confirmedMembers: { $elemMatch: { $eq: username } },
    season,
  });

  const confirmedLeagueMembers = confirmedLeagues.flatMap(
    (league) => league.confirmedMembers
  );

  // Get the predictions for all confirmed members
  const userPredictions = await Prediction.find({
    season,
    username: { $in: confirmedLeagueMembers },
  });

  const userMap = new Map(
    userPredictions.map((userPrediction) => [
      userPrediction.username,
      getDifferenceBetweenLeagueTable(userPrediction.leagueTable, currentTable),
    ])
  );

  const confirmedLeaguesWithStandings: LeagueStandings[] = confirmedLeagues.map(
    (league) => ({
      leagueName: league.leagueName,
      rankedStandings: league.confirmedMembers
        .map((leagueMemberUsername) => ({
          username: leagueMemberUsername,
          // TODO - Improve the logic here to determine what should happen
          // when they can't find a prediction
          pointsDifferential: userMap.get(leagueMemberUsername) || 1000000,
        }))
        .sort((a, b) => a.pointsDifferential - b.pointsDifferential),
    })
  );

  return confirmedLeaguesWithStandings;
}

export async function fetchUserRequests(
  username: string,
  season = currentSeason
): Promise<LeagueRequests> {
  // TODO - Make one db query
  const leaguesUserOwnsWithRequests = await PredictionLeagueTableModel.find({
    season,
    ownerUsername: username,
    "usersWhoHaveRequestedToJoin.0": { $exists: true },
  });

  console.log("Log after request 1");

  const leaguesUserHasBeenInvitedTo = await PredictionLeagueTableModel.find({
    season,
    invitedUsers: { $elemMatch: { $eq: username } },
  });

  console.log("Log after request 2");

  return {
    leagueRequests: leaguesUserOwnsWithRequests.flatMap((league) =>
      league.usersWhoHaveRequestedToJoin.map((user) => ({
        leagueName: league.leagueName,
        userRequesting: user,
      }))
    ),
    leagueUserInvitedTo: leaguesUserHasBeenInvitedTo.map(
      (league) => league.leagueName
    ),
  };
}

export async function getMyLeagues({
  season = currentSeason,
  username,
}: {
  fetchLeagueStandings?: boolean;
  username: string;
  season?: string;
}): Promise<{
  confirmedLeagues: LeagueStandings[];
  leaguesUserHasRequestedToJoin: LeagueRequest[];
  leaguesUserHasBeenInvitedTo: LeagueRequest[];
}> {
  // Fetch the current league table
  // This may change to a database query
  const currentLeagueTable = await getPremierLeagueStandings();

  const confirmedLeaguesWithStandings = await fetchConfirmedLeagueStandings(
    username,
    season,
    currentLeagueTable.table
  );

  const requestedLeagues = await PredictionLeagueTableModel.find({
    $or: [
      { usersWhoHaveRequestedToJoin: { $elemMatch: { $eq: username } } },
      { invitedUsers: { $elemMatch: { eq: username } } },
    ],
    season,
  });

  const leaguesUserHasBeenInvitedTo: LeagueRequest[] = [];
  const leaguesUserHasRequestedToJoin: LeagueRequest[] = [];

  requestedLeagues.forEach((league) => {
    (league.usersWhoHaveRequestedToJoin.includes(username)
      ? leaguesUserHasRequestedToJoin
      : leaguesUserHasBeenInvitedTo
    ).push({
      leagueName: league.leagueName,
      leagueOwner: league.ownerUsername,
    });
  });

  return {
    confirmedLeagues: confirmedLeaguesWithStandings,
    leaguesUserHasRequestedToJoin,
    leaguesUserHasBeenInvitedTo,
  };
}
