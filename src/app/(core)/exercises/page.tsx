"use client";

import ExercisesList from "./exercises-list";
import AddNewExerciseButton from "./add-new-exercise-button";
import ExercisesFilters from "./exercises-filters";
import { useCallback, useState } from "react";
import { TExercisesQueryFilters } from "@/api/exercises/types";

export default function ExercisesPage() {
  const [filters, setFilters] = useState<TExercisesQueryFilters>();

  const handleFiltersChange = useCallback(
    (newFilters: TExercisesQueryFilters) => {
      setFilters(newFilters);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Exercises</h1>
        <AddNewExerciseButton />
      </div>
      <ExercisesFilters onFiltersChange={handleFiltersChange} />
      <ExercisesList filters={filters} />
    </div>
  );
}
