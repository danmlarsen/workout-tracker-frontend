"use client";

import { type TExercisesQueryFilters } from "@/api/exercises/types";
import { type TEquipment, type TMuscleGroup } from "@/lib/constants";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import ExercisesFilters from "./exercises-filters";
import ExercisesList from "./exercises-list";

export default function ExercisesView() {
  const [nameFilter, setNameFilter] = useState("");
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    TMuscleGroup[]
  >([]);
  const [selectedEquipment, setSelectedEquipment] = useState<TEquipment[]>([]);

  const [debouncedName] = useDebounce(nameFilter, 300);

  const filters = useMemo((): TExercisesQueryFilters => {
    const result: TExercisesQueryFilters = {};

    if (debouncedName.trim()) result.name = debouncedName.trim();
    if (selectedEquipment.length > 0) result.equipment = selectedEquipment;
    if (selectedMuscleGroups.length > 0)
      result.muscleGroups = selectedMuscleGroups;

    return result;
  }, [debouncedName, selectedEquipment, selectedMuscleGroups]);

  return (
    <>
      <ExercisesFilters
        nameFilter={nameFilter}
        onNameFilterChange={setNameFilter}
        selectedMuscleGroups={selectedMuscleGroups}
        onMuscleGroupsChange={setSelectedMuscleGroups}
        selectedEquipment={selectedEquipment}
        onEquipmentChange={setSelectedEquipment}
      />
      <ExercisesList filters={filters} />
    </>
  );
}
