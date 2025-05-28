"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTeam: React.FC<{ teamName: string }> = ({ teamName }) => {
  // Get the attributes outside of useSortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: teamName });

  // Add some of the sortable elements to the styling
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-md border bg-white shadow-sm cursor-grab select-none transition-colors w-1/2 ${
        isDragging ? "bg-blue-100" : "hover:bg-gray-100"
      }`}
    >
      {teamName}
    </div>
  );
};

export default SortableTeam;
