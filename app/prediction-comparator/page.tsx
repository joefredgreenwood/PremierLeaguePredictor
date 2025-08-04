import LeagueComparator from "@/components/footballLeagueTable/LeagueTableComparator";
import { currentSeason } from "@/constants/CurrentSeason";
import Prediction from "@/models/Prediction";

const LeaguesPage = async ({ searchParams }: { searchParams: any }) => {
  const team1Email = decodeURIComponent(searchParams.team1Email || "");
  const team2Email = decodeURIComponent(searchParams.team2Email || "");

  if (!(team1Email && team2Email)) {
    throw new Error("Missing Parameters");
  }

  const predictions = await Prediction.find({
    season: currentSeason,
    username: { $in: [team1Email, team2Email] },
  });

  // if (predictions.length !== 2) {
  //   throw new Error("Missing predictions");
  // }

  const team1Prediction = predictions.find((p) => p.username === team1Email);
  const team2Prediction = predictions.find((p) => p.username === team2Email);

  if (!team1Prediction || !team2Prediction) {
    throw new Error("Missing prediction");
  }

  return (
    <>
      <LeagueComparator
        teamsList1={{
          isMovable: false,
          nameOfTeamsSelection: team1Email,
          teams: team1Prediction.leagueTable,
        }}
        teamsList2={{
          isMovable: false,
          nameOfTeamsSelection: team2Email,
          teams: team2Prediction.leagueTable,
        }}
      ></LeagueComparator>
    </>
  );
};

export default LeaguesPage;
