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
  username: string;
}> = ({ teamsList1, teamsList2, username }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  return (
    <div className="flex mt-10 ml-10">
      <SelectedTeamContext.Provider value={selectedTeam}>
        <div className="w-1/3 ml-10">
          <h3 className="text-lg">{teamsList1.nameOfTeamsSelection}</h3>
          <LeagueTable
            isEnabled={teamsList1.isMovable}
            orderedTeams={teamsList1.teams}
            username={username}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
        <div className="w-1/3 ml-10">
          <h3 className="text-lg">{teamsList2.nameOfTeamsSelection}</h3>
          <LeagueTable
            isEnabled={teamsList2.isMovable}
            orderedTeams={teamsList2.teams}
            username={username}
            setSelectedTeam={setSelectedTeam}
            comparedTeams={teamsList1.teams}
          />
        </div>
      </SelectedTeamContext.Provider>
    </div>
  );
};

export default LeagueComparator;
