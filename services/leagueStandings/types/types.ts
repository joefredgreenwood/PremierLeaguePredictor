export type UserRank = {
  username: string;
  pointsDifferential: number;
};

export type LeagueStandings = {
  leagueName: string;
  rankedStandings: UserRank[];
};

export type LeagueRequest = {
  leagueName: string;
  leagueOwner: string;
};

export type LeagueRequests = {
  leagueRequests: {
    leagueName: string;
    userRequesting: string;
  }[];
  leagueUserInvitedTo: string[];
};
