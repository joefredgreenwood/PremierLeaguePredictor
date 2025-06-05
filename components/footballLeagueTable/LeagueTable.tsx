"use client";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTeam from "@/components/footballLeagueTable/SortableTeam";
import addNewPrediction from "@/app/action";
import { SelectedTeamContext } from "./LeagueTableComparator";
import { getDifferenceBetweenTeam } from "@/services/leagueComparisonLogic/getDifferenceBetweenTeams";

const LeagueTable: React.FC<{
  isEnabled: boolean;
  orderedTeams: string[];
  username: string;
  setSelectedTeam?: Dispatch<SetStateAction<string>>;
  comparedTeams?: string[];
}> = ({
  isEnabled,
  orderedTeams,
  username,
  setSelectedTeam,
  comparedTeams,
}) => {
  // To be replaced by API call
  const [teams, setTeams] = useState<string[]>(orderedTeams);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = teams.indexOf(active.id as string);
      const newIndex = teams.indexOf(over?.id as string);
      setTeams((teams) => arrayMove(teams, oldIndex, newIndex));
    }
  };

  const selectedTeam = useContext(SelectedTeamContext);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={teams}
          strategy={verticalListSortingStrategy}
          disabled={!isEnabled}
        >
          {teams.map((team, index) => (
            <div className="p-2" key={team}>
              <SortableTeam
                key={team}
                teamName={team}
                isMovable={isEnabled}
                isSelected={team === selectedTeam}
                setAsSelected={setSelectedTeam}
                difference={
                  comparedTeams &&
                  getDifferenceBetweenTeam(team, index, comparedTeams)
                }
                position={index + 1}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <div className="pt-2 pb-2 flex flex-grow">
        {isEnabled && (
          <button
            type="submit"
            onClick={() => addNewPrediction({ username, table: teams })}
            className="mx-2 bg-slate-800 hover:bg-slate-400 rounded-md transition p-2 flex flex-grow w-98 text-white text-lg text-center mx-auto"
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default LeagueTable;
