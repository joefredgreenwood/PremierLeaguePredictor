"use server";

import PredictionLeagueTable from "@/components/predictionLeagueTable/PredictionLeagueTable";
import authOptions from "@/lib/auth";
import { getMyLeagues } from "@/services/leagueStandings/fetchUsersLeagueStatus";
import { getServerSession } from "next-auth";

const LeaguesPage = async () => {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? "";

  const { confirmedLeagues } = await getMyLeagues({ username });
  return (
    <>
      {!!confirmedLeagues.length && (
        <>
          {confirmedLeagues.map((league) => {
            return (
              <div key={league.leagueName} className="w-1/2 p-5">
                <PredictionLeagueTable
                  leagueName={league.leagueName}
                  rankedStandings={league.rankedStandings}
                ></PredictionLeagueTable>
              </div>
            );
          })}
        </>
      )}
      <PredictionLeagueTable
        leagueName="My First League"
        rankedStandings={[
          {
            username: "JoeGreenwood",
            pointsDifferential: 12,
          },
          {
            username: "AliciaDunn",
            pointsDifferential: 17,
          },
          {
            username: "BillyGreenwood",
            pointsDifferential: 19,
          },
        ]}
      />
    </>
  );
};

export default LeaguesPage;
