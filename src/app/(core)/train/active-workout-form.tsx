'use client';

import AddExerciseButton from './add-exercise-button';
import { format } from 'date-fns';
import { useActiveWorkout, useAddWorkoutSet, useCompleteWorkout } from '@/api/workouts/queries';
import { Button } from '@/components/ui/button';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import WorkoutSet from './workout-set';

export default function ActiveWorkoutForm() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: workout } = useActiveWorkout();
  const { mutate: completeWorkout } = useCompleteWorkout();
  const { mutate: addWorkoutSet } = useAddWorkoutSet();

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
        <ul>
          {workout.workoutExercises.map(workoutExercise => (
            <li key={workoutExercise.id}>
              <h2>{workoutExercise.exercise.name}</h2>
              <ul className="space-y-2">
                {workoutExercise.workoutSets.map((workoutSet, index) => (
                  <WorkoutSet key={workoutSet.id} workoutSet={workoutSet} workoutId={workout.id} setNumber={index + 1} />
                ))}
              </ul>
              <Button onClick={() => addWorkoutSet({ workoutId: workout.id, workoutExerciseId: workoutExercise.id })}>Add set</Button>
            </li>
          ))}
        </ul>
      )}
      <AddExerciseButton />
    </div>
  );
}
