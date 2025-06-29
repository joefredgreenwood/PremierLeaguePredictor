"use server";

import PredictionLeagueTable from "@/components/predictionLeagueTable/PredictionLeagueTable";
import authOptions from "@/lib/auth";
import { getMyLeagues } from "@/services/leagueStandings/fetchUsersLeagueStatus";
import { getServerSession } from "next-auth";

const LeaguesPage = async () => {
  const session = await getServerSession(authOptions);
  const username = session?.user?.email ?? "";

  const { confirmedLeagues } = await getMyLeagues({ username });
  return (
    <>
      {!!confirmedLeagues.length && (
        <>
          {confirmedLeagues.map((league) => {
            return (
              <PredictionLeagueTable
                leagueName={league.leagueName}
                rankedStandings={league.rankedStandings}
                key={league.leagueName}
              ></PredictionLeagueTable>
            );
          })}
        </>
      )}
    </>
  );
};

export default LeaguesPage;
