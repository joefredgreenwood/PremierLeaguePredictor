import { currentSeason } from "@/constants/CurrentSeason";
import PredictionLeagueTableModel from "@/models/PredictionLeagueTable";

export async function createPredictionLeagueTable({
  username,
  leagueName,
  peopleToInvite,
  season = currentSeason,
  footballLeague = "premierLeague",
}: {
  username: string;
  leagueName: string;
  peopleToInvite: string[];
  footballLeague?: string;
  season?: string;
}) {
  // TODO - Add Error Handling
  await PredictionLeagueTableModel.insertOne({
    ownerUsername: username,
    footballLeague,
    leagueName,
    season,
    confirmedMembers: [username],
    usersWhoHaveRequestedToJoin: [],
    invitedUsers: peopleToInvite,
  });
}

export async function requestToJoinLeague(
  username: string,
  leagueName: string,
  season = currentSeason
) {
  // TODO - Add validation to ensure not already a member
  await PredictionLeagueTableModel.updateOne(
    { leagueName: leagueName, season },
    {
      $addToSet: {
        usersWhoHaveRequestedToJoin: username,
      },
    }
  );
}

export async function respondToRequestToJoinLeague(
  username: string,
  leagueName: string,
  userRespondingToRequest: string,
  acceptUser: boolean,
  season = currentSeason
) {
  const league = await PredictionLeagueTableModel.findOne({
    leagueName,
    season,
  });
  if (league?.ownerUsername !== userRespondingToRequest) {
    throw new Error("");
  }
  if (!league.usersWhoHaveRequestedToJoin.includes(username)) {
    throw new Error("User has not requested to join");
  }

  await PredictionLeagueTableModel.updateOne(
    { _id: league._id },
    {
      $set: {
        usersWhoHaveRequestedToJoin: league.usersWhoHaveRequestedToJoin.filter(
          (user) => user !== username
        ),
      },
      ...(acceptUser
        ? {
            $addToSet: {
              confirmedMembers: username,
            },
          }
        : {}),
    }
  );
}

export async function respondToLeagueInvite(
  username: string,
  leagueName: string,
  acceptInvite: boolean,
  season = currentSeason
) {
  // Verify the username has been requested to join league
  const league = await PredictionLeagueTableModel.findOne({
    leagueName,
    season,
  });
  if (!league?.invitedUsers.includes(username)) {
    throw new Error("User was never invited");
  }
  PredictionLeagueTableModel.updateOne(
    { _id: league._id },
    {
      $set: {
        usersWhoHaveRequestedToJoin: league.invitedUsers.filter(
          (user) => user !== username
        ),
      },
      ...(acceptInvite
        ? {
            $addToSet: {
              confirmedMembers: username,
            },
          }
        : {}),
    }
  );
}

export async function inviteUserToLeague(
  usernameToAdd: string | string[],
  leagueName: string,
  userMakingRequest: string,
  season = currentSeason
) {
  const isArray = Array.isArray(usernameToAdd);
  if (isArray && usernameToAdd.length === 0) {
    throw new Error("No usernames provided to invite");
  }
  const league = await PredictionLeagueTableModel.findOne({
    leagueName,
    season,
  });
  if (!league?.confirmedMembers.includes(userMakingRequest)) {
    throw new Error("Only league members can invite a user");
  }
  const usernamesToAdd = isArray ? usernameToAdd : [usernameToAdd];

  const bulkInserts = usernamesToAdd.flatMap((username) => {
    if (league.confirmedMembers.includes(username)) {
      return [];
    }
    return [
      {
        updateOne: {
          filter: { _id: league._id },
          update: {
            $addToSet: {
              invitedUsers: username,
            },
          },
        },
      },
    ];
  });

  if (bulkInserts.length > 0) {
    await PredictionLeagueTableModel.bulkWrite(bulkInserts);
  }
}

async function leaveLeague(username: string, leagueName: string) {}
