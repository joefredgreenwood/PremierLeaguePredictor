import {
  standingsResponseSchema,
  type FootballDataResponse,
} from "./types/FootballDataResponse";

const baseUrlPremierLeague =
  "http://api.football-data.org/v4/competitions/PL/standings";

function verifyIfResponseIsCorrect(
  response: unknown
): response is FootballDataResponse {
  const verification = standingsResponseSchema.safeParse(response);
  return verification.success;
}

export async function getPremierLeagueStandings() {
  const premierLeagueResponse = await fetch(baseUrlPremierLeague, {
    headers: { "X-Auth-token": process.env["FOOTBALL_DATA_API_KEY"] || "" },
  });

  if (!premierLeagueResponse.ok) {
    throw new Error("Response failed");
  }

  const premierLeagueTable = await premierLeagueResponse.json();

  if (!verifyIfResponseIsCorrect(premierLeagueTable)) {
    throw new Error("Unexpected response");
  }
  return formatPlTable(premierLeagueTable);
}

function formatPlTable(response: FootballDataResponse): {
  table: string[];
  totalGamesPlayed: number;
} {
  let gamesPlayed = 0;
  const formattedTable = response.standings
    .find((tableObj) => tableObj.type === "TOTAL")
    ?.table.map((teamObj) => {
      gamesPlayed += teamObj.playedGames;
      return teamObj.team.name;
    });

  if (!formattedTable) {
    throw new Error("Total table not provided");
  }
  return { table: formattedTable, totalGamesPlayed: gamesPlayed };
}
