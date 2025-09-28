'use client';

import AddExerciseButton from './add-exercise-button';
import { useActiveWorkout, useCompleteWorkout, useUpdateWorkout } from '@/api/workouts/queries';
import { Button } from '@/components/ui/button';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import WorkoutExercise from './workout-exercise';
import EditWorkoutNameButton from './edit-workout-name-button';
import Timer from '@/components/ui/timer';

export default function ActiveWorkoutForm() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: workout } = useActiveWorkout();
  const { mutate: completeWorkout } = useCompleteWorkout();
  const updateWorkoutMutation = useUpdateWorkout();

  function handleCompleteWorkout() {
    setActiveWorkoutOpen(false);
    if (workout) {
      completeWorkout(workout.id);
    }
  }

  function handleUpdateWorkoutName(newTitle: string) {
    if (!workout) return;

    updateWorkoutMutation.mutate({
      workoutId: workout.id,
      data: { title: newTitle },
    });
  }

  if (!workout) {
    return <div>No active workout</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Timer workout={workout} />
        <Button onClick={handleCompleteWorkout}>Finish</Button>
      </div>
      <div className="flex justify-between items-center">
        <h1>{workout.title}</h1>
        <EditWorkoutNameButton workoutName={workout.title} handleEdit={handleUpdateWorkoutName} />
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
