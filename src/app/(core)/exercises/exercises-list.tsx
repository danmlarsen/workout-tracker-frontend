'use client';

import { useExercises } from '@/api/exercises/queries';
import { useActiveWorkout, useAddWorkoutExercise } from '@/api/workouts/queries';

export default function ExercisesList() {
  const exercises = useExercises();
  const { data: activeWorkout } = useActiveWorkout();

  const { mutate: addWorkoutExercise } = useAddWorkoutExercise();

  return (
    <ul>
      {exercises.data?.map(exercise => (
        <li
          key={exercise.id}
          onClick={() => {
            if (activeWorkout) {
              addWorkoutExercise({ workoutId: activeWorkout.id, exerciseId: exercise.id });
            }
          }}
        >
          <button className="grid grid-cols-[50px_1fr_50px] items-center w-full gap-2 p-4 bg-secondary">
            <div>img</div>
            <div className="text-left">
              <h2>{exercise.name}</h2>
              <div>
                {exercise.muscleGroups.map((muscleGroup, idx) => (
                  <span key={muscleGroup} className="text-muted-foreground text-xs">
                    {muscleGroup}
                    {idx + 1 !== exercise.muscleGroups.length ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
            <div>{exercise.timesUsed} times</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
