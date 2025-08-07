"use client";

import LeagueTable from "@/components/footballLeagueTable/LeagueTable";
import { createContext, useState } from "react";

export const SelectedTeamContext = createContext("");

type TeamsProps = {
  nameOfTeamsSelection: string;
  isMovable: boolean;
  teams: string[];
};

const LeagueComparator: React.FC<{
  teamsList1: TeamsProps;
  teamsList2: TeamsProps;
}> = ({ teamsList1, teamsList2 }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6 px-4 md:px-10">
      <SelectedTeamContext.Provider value={selectedTeam}>
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
            {teamsList1.nameOfTeamsSelection}
          </h3>
          <LeagueTable
            isEnabled={teamsList1.isMovable}
            orderedTeams={teamsList1.teams}
            username={teamsList1.nameOfTeamsSelection}
            setSelectedTeam={setSelectedTeam}
          />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
            {teamsList2.nameOfTeamsSelection}
          </h3>
          <LeagueTable
            isEnabled={teamsList2.isMovable}
            orderedTeams={teamsList2.teams}
            username={teamsList2.nameOfTeamsSelection}
            setSelectedTeam={setSelectedTeam}
            comparedTeams={teamsList1.teams}
          />
        </div>
      </SelectedTeamContext.Provider>
    </div>
  );
};

export default LeagueComparator;
