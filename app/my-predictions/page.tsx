import LeagueComparator from "@/components/footballLeagueTable/LeagueTableComparator";
import { currentSeason } from "@/constants/CurrentSeason";
import authOptions from "@/lib/auth";
import FootballLeagueTableModel from "@/models/FootballLeagueTable";
import Prediction from "@/models/Prediction";
import { getPremierLeagueStandings } from "@/services/actualLeagueTable/getLeagueTable";
import { getServerSession } from "next-auth";

const PredictionVersusActualPage = async () => {
  const session = await getServerSession(authOptions);
  const name = session?.user?.email ?? "";

  const userPredictions = await Prediction.findOne({
    season: currentSeason,
    username: name,
  }).lean();

  const currentLeagueTable =
    (
      await FootballLeagueTableModel.findOne(
        {},
        {},
        { sort: { createdAt: -1 } }
      )
    )?.league ?? (await getPremierLeagueStandings()).table;

  if (!userPredictions || !currentLeagueTable) {
    return <div>Please submit your predictions first</div>;
  }

  return (
    <>
      <LeagueComparator
        teamsList1={{
          isMovable: false,
          nameOfTeamsSelection: name,
          teams: userPredictions.leagueTable,
        }}
        teamsList2={{
          isMovable: false,
          nameOfTeamsSelection: "Actual League Table",
          teams: currentLeagueTable,
        }}
      ></LeagueComparator>
    </>
  );
};

export default PredictionVersusActualPage;
