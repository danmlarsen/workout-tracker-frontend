import { useUpdateWorkoutSet } from '@/api/workouts/queries';
import { TWorkoutSetDto, type TWorkoutSet } from '@/api/workouts/types';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';

export default function WorkoutSet({ workoutSet, workoutId, setNumber }: { workoutSet: TWorkoutSet; workoutId: number; setNumber: number }) {
  const { mutate: updateWorkoutSet } = useUpdateWorkoutSet();
  const debouncedUpdateWorkoutSet = useDebouncedCallback(
    (payload: TWorkoutSetDto) =>
      updateWorkoutSet({
        workoutId,
        workoutExerciseId: workoutSet.workoutExerciseId,
        setId: workoutSet.id,
        data: payload,
      }),
    500
  );

  return (
    <li className="grid grid-cols-3 items-center">
      <div>Set #{setNumber}</div>
      <Input
        type="number"
        placeholder="weight"
        defaultValue={workoutSet.weight?.toString() || ''}
        onChange={e => debouncedUpdateWorkoutSet({ weight: parseInt(e.target.value) })}
      />
      <Input
        type="number"
        placeholder="reps"
        defaultValue={workoutSet.reps?.toString() || ''}
        onChange={e => debouncedUpdateWorkoutSet({ reps: parseInt(e.target.value) })}
      />
    </li>
  );
}
