import { useUpdateWorkoutSet } from '@/api/workouts/queries';
import { type TWorkoutSet } from '@/api/workouts/types';
import { Input } from '@/components/ui/input';

export default function WorkoutSet({ workoutSet, workoutId, setNumber }: { workoutSet: TWorkoutSet; workoutId: number; setNumber: number }) {
  const { mutate: updateWorkoutSet } = useUpdateWorkoutSet();

  return (
    <li className="grid grid-cols-3 items-center">
      <div>Set #{setNumber}</div>
      <Input
        type="number"
        placeholder="weight"
        defaultValue={workoutSet.weight?.toString() || ''}
        onChange={e => {
          updateWorkoutSet({
            workoutId: workoutId,
            workoutExerciseId: workoutSet.workoutExerciseId,
            setId: workoutSet.id,
            data: { weight: +e.target.value },
          });
        }}
      />
      <Input
        type="number"
        placeholder="reps"
        defaultValue={workoutSet.reps?.toString() || ''}
        onChange={e => {
          updateWorkoutSet({
            workoutId: workoutId,
            workoutExerciseId: workoutSet.workoutExerciseId,
            setId: workoutSet.id,
            data: { reps: +e.target.value },
          });
        }}
      />
    </li>
  );
}
