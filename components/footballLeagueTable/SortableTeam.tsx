"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableTeamProps {
  teamName: string;
  isMovable: boolean;
  isSelected: boolean;
  setAsSelected?: Dispatch<SetStateAction<string>>;
  difference?: number;
  position: number;
}

const SortableTeam: React.FC<SortableTeamProps> = ({
  teamName,
  isMovable,
  isSelected,
  setAsSelected,
  difference,
  position,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: teamName });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const tailwind =
    `p-3 rounded-md text-m border w-full flex items-center justify-between text-slate-800 bg-blue-200` +
    (isSelected ? "bg-green-500" : "");

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setAsSelected) setAsSelected(isSelected ? "" : teamName);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={tailwind}>
      {/* Left: Drag Handle */}
      <div className="flex items-center gap-2">
        {isMovable && (
          <div
            {...listeners}
            className="cursor-grab pr-2"
            onClick={(e) => e.stopPropagation()} // prevent selection toggle on drag
          >
            <GripVertical className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <h2 className="flex flex-start">{position}. </h2>
      </div>

      {/* Center: Team Name */}
      <span>{teamName}</span>

      <div className="flex items-center justify-between ">
        {difference !== undefined && (
          <div
            className={"bg-text-blue justify-items-end mr-6"}
            title="Difference in positions with list being compared against"
          >
            {difference}
          </div>
        )}

        {/* Right: Button */}
        {setAsSelected && (
          <button
            type="button"
            onClick={handleClick}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm cursor-pointer"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default SortableTeam;
