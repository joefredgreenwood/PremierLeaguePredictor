"use client";

import React, { useState } from "react";
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
import { CSS } from "@dnd-kit/utilities";
import SortableTeam from "@/components/SortableTeam";

const LeagueTable: React.FC<{ isEnabled: boolean; orderedTeams: string[] }> = ({
  isEnabled,
  orderedTeams,
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
          {teams.map((team) => (
            <SortableTeam key={team} teamName={team} />
          ))}
        </SortableContext>
      </DndContext>
      {isEnabled && (
        <button type="submit" onClick={() => console.log(teams)}>
          Submit
        </button>
      )}
    </>
  );
};

export default LeagueTable;
