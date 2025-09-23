'use client';

import { useExercises } from '@/api/exercises/queries';

export default function Exercises() {
  const exercises = useExercises();

  return (
    <ul>
      {exercises.data?.map(exercise => (
        <li key={exercise.id}>{exercise.name}</li>
      ))}
    </ul>
  );
}
