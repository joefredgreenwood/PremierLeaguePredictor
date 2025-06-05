import { currentSeason } from "@/constants/CurrentSeason";
import League from "@/models/League";

export async function createLeagueTable(
  username: string,
  leagueName: string,
  footballLeague = "premierLeague",
  season = currentSeason
) {
  // TODO - Add Error Handling
  await League.insertOne({
    ownerUsername: username,
    footballLeague,
    leagueName,
    season,
    confirmedMembers: [],
    usersWhoHaveRequestedToJoin: [],
    invitedUsers: [],
  });
}

export async function requestToJoinLeague(
  username: string,
  leagueName: string,
  season = currentSeason
) {
  // TODO - Add validation to ensure not already a member
  await League.updateOne(
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
  const league = await League.findOne({ leagueName, season });
  if (league?.ownerUsername !== userRespondingToRequest) {
    throw new Error("");
  }
  if (!league.usersWhoHaveRequestedToJoin.includes(username)) {
    throw new Error("User has not requested to join");
  }

  await League.updateOne(
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
  const league = await League.findOne({ leagueName, season });
  if (!league?.invitedUsers.includes(username)) {
    throw new Error("User was never invited");
  }
  League.updateOne(
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
  usernameToAdd: string,
  leagueName: string,
  userMakingRequest: string,
  season = currentSeason
) {
  const league = await League.findOne({ leagueName, season });
  if (!league?.confirmedMembers.includes(userMakingRequest)) {
    throw new Error("Only league members can invite a user");
  }
  if (league.confirmedMembers.includes(usernameToAdd)) {
    // User is already a confirmed member and therefore does not need to be invited
    return;
  }
  await League.updateOne(
    { _id: league._id },
    {
      $addToSet: {
        invitedUsers: usernameToAdd,
      },
    }
  );
}

async function leaveLeague(username: string, leagueName: string) {}
