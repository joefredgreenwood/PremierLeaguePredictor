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
    <div className="flex mt-10 ml-10">
      <SelectedTeamContext.Provider value={selectedTeam}>
        <div className="w-2/5 ml-10">
          <h3 className="text-lg">{teamsList1.nameOfTeamsSelection}</h3>
          <LeagueTable
            isEnabled={teamsList1.isMovable}
            orderedTeams={teamsList1.teams}
            username={teamsList1.nameOfTeamsSelection}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
        <div className="w-2/5 ml-10">
          <h3 className="text-lg">{teamsList2.nameOfTeamsSelection}</h3>
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
