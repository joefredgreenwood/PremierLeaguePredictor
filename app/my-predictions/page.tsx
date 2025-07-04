import LeagueTable from "@/components/footballLeagueTable/LeagueTable";
import {
  currentSeason,
  currentTeams,
  hasSeasonStarted,
} from "@/constants/CurrentSeason";
import authOptions from "@/lib/auth";
import Prediction from "@/models/Prediction";

import { getServerSession } from "next-auth";

const MyPredictionsPage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  const name = session?.user?.email ?? "";

  const userPredictions = await Prediction.findOne({
    season: currentSeason,
    username: name,
  }).lean();

  const leagueTableToDisplay = userPredictions?.leagueTable ?? currentTeams;

  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl mx-auto">Premier League Table</h1>
      <h2 className="mx-auto">
        {userPredictions
          ? "Please view your predictions and make any required changes"
          : "Please submit your predictions"}
      </h2>
      <div className="w-1/2 mx-auto">
        <LeagueTable
          orderedTeams={leagueTableToDisplay}
          username={name}
          isEnabled={!hasSeasonStarted}
        ></LeagueTable>
      </div>
    </div>
  );
};

export default MyPredictionsPage;
