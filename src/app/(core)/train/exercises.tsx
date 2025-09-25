'use client';

import { useExercises } from '@/api/exercises/queries';
import { useActiveWorkout, useAddWorkoutExercise } from '@/api/workouts/queries';

export default function Exercises() {
  const exercises = useExercises();
  const { data: activeWorkout } = useActiveWorkout();

  const { mutate: addWorkoutExercise } = useAddWorkoutExercise();

  if (!activeWorkout) return null;

  return (
    <ul>
      {exercises.data?.map(exercise => (
        <li key={exercise.id} onClick={() => addWorkoutExercise({ workoutId: activeWorkout.id, exerciseId: exercise.id })}>
          {exercise.name}
        </li>
      ))}
    </ul>
  );
}
