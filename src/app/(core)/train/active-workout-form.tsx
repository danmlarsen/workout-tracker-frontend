'use client';

import AddExerciseButton from './add-exercise-button';
import { useActiveWorkout, useCompleteWorkout } from '@/api/workouts/queries';
import { Button } from '@/components/ui/button';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import WorkoutExercise from './workout-exercise';

export default function ActiveWorkoutForm() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: workout } = useActiveWorkout();
  const { mutate: completeWorkout } = useCompleteWorkout();

  function handleCompleteWorkout() {
    setActiveWorkoutOpen(false);
    if (workout) {
      completeWorkout(workout.id);
    }
  }

  if (!workout) {
    return <div>No active workout</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>timer</div>
        <Button onClick={handleCompleteWorkout}>Finish</Button>
      </div>
      <div className="flex justify-between items-center">
        <h1>{workout.title}</h1>
        <Button>Edit name</Button>
      </div>

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
