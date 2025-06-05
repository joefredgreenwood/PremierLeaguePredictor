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
    `p-3 rounded-md text-m border w-full flex items-center justify-between ` +
    (isMovable ? `text-slate-800 bg-blue-200` : `text-blue-800 bg-red-50`) +
    (isSelected ? "bg-green-500" : "");

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setAsSelected) setAsSelected(isSelected ? "" : teamName);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={tailwind}>
      {/* Left: Drag Handle */}
      {isMovable && (
        <div
          {...listeners}
          className="cursor-grab pr-2"
          onClick={(e) => e.stopPropagation()} // prevent selection toggle on drag
        >
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
      )}
      <h2>{position}</h2>

      {/* Center: Team Name */}
      <span className="flex-1">{teamName}</span>

      {difference !== undefined && (
        <div className={"bg-text-blue"}>{difference}</div>
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
  );
};

export default SortableTeam;
