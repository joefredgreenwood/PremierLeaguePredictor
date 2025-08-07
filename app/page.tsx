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
    <div className="min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Premier League Table
        </h1>
        <h2 className="text-center text-base sm:text-lg mb-4 text-gray-600">
          {userPredictions
            ? "Please view your predictions and make any required changes"
            : "Please submit your predictions"}
        </h2>

        {/* 👇 Responsive container: full on mobile, 50% on md+ */}
        <div className="w-full md:w-1/2 mx-auto">
          <LeagueTable
            orderedTeams={leagueTableToDisplay}
            username={name}
            isEnabled={!hasSeasonStarted}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPredictionsPage;
