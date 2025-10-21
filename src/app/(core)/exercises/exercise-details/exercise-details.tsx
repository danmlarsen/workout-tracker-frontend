"use client";
import { useExercise } from "@/api/exercises/queries";
import ExerciseWorkoutsList from "./exercise-workouts-list";

export default function ExerciseDetails({
  exerciseId,
}: {
  exerciseId: number;
}) {
  const { data, isLoading } = useExercise(exerciseId);

  return (
    <div className="space-y-4">
      {data && <p className="text-center text-xl">{data.name}</p>}
      {data && <ExerciseWorkoutsList exerciseId={data.id} />}
    </div>
  );
}
