'use client';

import AddExerciseButton from './add-exercise-button';
import { format } from 'date-fns';
import { useActiveWorkout, useCompleteWorkout } from '@/api/workouts/queries';
import { Button } from '@/components/ui/button';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import WorkoutExercise from './workout-exercise';

export default function ActiveWorkoutForm() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: workout } = useActiveWorkout();
  const { mutate: completeWorkout } = useCompleteWorkout();

  if (!workout) {
    return <div>No active workout</div>;
  }

  return (
    <div>
      <h1>{workout.title}</h1>
      <p>{format(workout.createdAt, "PPP 'at' p")}</p>

      <Button
        onClick={() => {
          setActiveWorkoutOpen(false);
          completeWorkout(workout.id);
        }}
      >
        Complete Workout
      </Button>
      {workout.workoutExercises && workout.workoutExercises.length > 0 && (
        <ul className="space-y-4">
          {workout.workoutExercises.map(workoutExercise => (
            <WorkoutExercise key={workoutExercise.id} workoutExercise={workoutExercise} />
          ))}
        </ul>
      )}
      <AddExerciseButton />
    </div>
  );
}
