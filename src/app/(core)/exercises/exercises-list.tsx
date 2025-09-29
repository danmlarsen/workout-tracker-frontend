'use client';

import { useExercises } from '@/api/exercises/queries';
import { useAddWorkoutExercise } from '@/api/workouts/mutations';
import ExerciseAvatar from '@/components/ui/exercise-avatar';

export default function ExercisesList({ selectedWorkoutId, onExerciseClick }: { selectedWorkoutId?: number; onExerciseClick?: () => void }) {
  const exercises = useExercises();
  const mutateWorkoutExercise = useAddWorkoutExercise();

  return (
    <ul className="space-y-2">
      {exercises.data?.map(exercise => (
        <li
          key={exercise.id}
          onClick={() => {
            if (selectedWorkoutId) {
              mutateWorkoutExercise.mutate(
                { workoutId: selectedWorkoutId, exerciseId: exercise.id },
                {
                  onSuccess: () => onExerciseClick?.(),
                }
              );
            }
          }}
        >
          <button className="grid grid-cols-[50px_1fr_50px] items-center w-full gap-4 py-4">
            <div>
              <ExerciseAvatar name={exercise.name} />
            </div>
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
