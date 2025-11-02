"use client";

import { useExerciseWorkouts } from "@/api/exercises/queries";
import { TExercise } from "@/api/exercises/types";
import ExerciseWorkoutsItem from "./exercise-workouts-item";

export default function ExerciseWorkoutsList({
  exercise,
}: {
  exercise: TExercise;
}) {
  const { data } = useExerciseWorkouts(exercise.id);

  return (
    <>
      {data && !!data.results.length && (
        <ul className="space-y-4 overflow-y-auto px-4 pb-6">
          {data.results.map((workout) => (
            <li key={workout.id}>
              <ExerciseWorkoutsItem workout={workout} exercise={exercise} />
            </li>
          ))}
        </ul>
      )}
      {data && !data.results.length && (
        <p className="text-muted-foreground">
          No history for this exercise found..
        </p>
      )}
    </>
  );
}
