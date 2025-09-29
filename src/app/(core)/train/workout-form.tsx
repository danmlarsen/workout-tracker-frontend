'use client';

import AddExerciseButton from './add-exercise-button';
import { useCompleteWorkout, useUpdateWorkout } from '@/api/workouts/mutations';
import { Button } from '@/components/ui/button';
import WorkoutExercise from './workout-exercise';
import EditWorkoutNameButton from './edit-workout-name-button';
import Timer from '@/components/ui/timer';
import { type TWorkout } from '@/api/workouts/types';
import { useState } from 'react';

export default function WorkoutForm({ workout, onSuccess }: { workout: TWorkout; onSuccess?: () => void }) {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: completeWorkout } = useCompleteWorkout();
  const updateWorkoutMutation = useUpdateWorkout();

  function handleCompleteWorkout() {
    onSuccess?.();
    completeWorkout(workout.id);
  }

  function handleUpdateWorkoutName(newTitle: string) {
    updateWorkoutMutation.mutate({
      workoutId: workout.id,
      data: { title: newTitle },
    });
  }

  const isActiveWorkout = !workout.completedAt;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {isActiveWorkout ? (
          <>
            <Timer workout={workout} />
            <Button onClick={handleCompleteWorkout}>Finish</Button>
          </>
        ) : (
          <>
            <p>{workout.completedAt}</p>
            <Button onClick={() => setIsEditing(curState => !curState)}>{isEditing ? 'Done' : 'Edit'}</Button>
          </>
        )}
      </div>
      <div className="flex justify-between items-center">
        <h1>{workout.title}</h1>
        {isActiveWorkout || (isEditing && <EditWorkoutNameButton workoutName={workout.title} handleEdit={handleUpdateWorkoutName} />)}
      </div>

      {workout.workoutExercises && workout.workoutExercises.length > 0 && (
        <ul className="space-y-4">
          {workout.workoutExercises.map(workoutExercise => (
            <WorkoutExercise key={workoutExercise.id} workoutExercise={workoutExercise} isEditing={isActiveWorkout || isEditing} />
          ))}
        </ul>
      )}
      {isActiveWorkout || (isEditing && <AddExerciseButton workoutId={workout.id} />)}
    </div>
  );
}
