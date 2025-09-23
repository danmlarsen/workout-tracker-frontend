'use client';

import { useWorkout } from '@/api/workouts/queries';
import AddExerciseButton from './add-exercise-button';
import { format } from 'date-fns';

export default function WorkoutForm({ workoutId }: { workoutId: number }) {
  const workout = useWorkout(workoutId);

  if (workout.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{workout.data?.title}</h1>
      <p>{workout.data?.createdAt && format(workout.data.createdAt, "PPP 'at' p")}</p>
      <AddExerciseButton />
    </div>
  );
}
