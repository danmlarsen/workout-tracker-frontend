"use client";

import { TExercisesQueryFilters } from "@/api/exercises/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EQUIPMENT_OPTIONS,
  MUSCLE_GROUP_OPTIONS,
  TEquipment,
  TMuscleGroup,
} from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";

export default function ExercisesFilters({
  onFiltersChange,
}: {
  onFiltersChange: (filters: TExercisesQueryFilters) => void;
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    TMuscleGroup[]
  >([]);
  const [selectedEquipment, setSelectedEquipment] = useState<TEquipment[]>([]);

  const updateFilters = useCallback(() => {
    const filters: TExercisesQueryFilters = {};

    if (nameFilter.trim()) filters.name = nameFilter.trim();
    if (selectedEquipment.length > 0) filters.equipment = selectedEquipment;
    if (selectedMuscleGroups.length > 0)
      filters.muscleGroups = selectedMuscleGroups;

    onFiltersChange(filters);
  }, [nameFilter, selectedEquipment, selectedMuscleGroups, onFiltersChange]);

  useEffect(() => {
    const timer = setTimeout(updateFilters, 500);
    return () => clearTimeout(timer);
  }, [nameFilter, updateFilters]);

  useEffect(() => {
    updateFilters();
  }, [selectedEquipment, selectedMuscleGroups, updateFilters]);

  return (
    <div className="grid grid-cols-2">
      <DropdownMenu>
        <DropdownMenuTrigger>Equipment</DropdownMenuTrigger>
        <DropdownMenuContent>
          {EQUIPMENT_OPTIONS.map((equipment) => (
            <DropdownMenuCheckboxItem
              key={equipment}
              className="capitalize"
              checked={selectedEquipment.includes(equipment)}
              onCheckedChange={() =>
                setSelectedEquipment((prev) =>
                  prev.includes(equipment)
                    ? prev.filter((e) => e !== equipment)
                    : [...prev, equipment],
                )
              }
            >
              {equipment}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>Muscle Groups</DropdownMenuTrigger>
        <DropdownMenuContent className="grid grid-cols-2">
          {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
            <DropdownMenuCheckboxItem
              key={muscleGroup}
              className="capitalize"
              checked={selectedMuscleGroups.includes(muscleGroup)}
              onCheckedChange={() =>
                setSelectedMuscleGroups((prev) =>
                  prev.includes(muscleGroup)
                    ? prev.filter((e) => e !== muscleGroup)
                    : [...prev, muscleGroup],
                )
              }
            >
              {muscleGroup}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
