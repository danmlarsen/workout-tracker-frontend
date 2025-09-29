import { useUpdateWorkoutSet } from '@/api/workouts/mutations';
import { TWorkoutSetDto, type TWorkoutSet } from '@/api/workouts/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';

export default function WorkoutSet({ workoutSet, workoutId, isEditing = true }: { workoutSet: TWorkoutSet; workoutId: number; isEditing?: boolean }) {
  const updateWorkoutSetMutation = useUpdateWorkoutSet();
  const updateWorkoutSet = (payload: TWorkoutSetDto) =>
    updateWorkoutSetMutation.mutate({ workoutId, workoutExerciseId: workoutSet.workoutExerciseId, setId: workoutSet.id, data: payload });
  const debouncedUpdateWorkoutSet = useDebouncedCallback((payload: TWorkoutSetDto) => updateWorkoutSet(payload), 500);

  return (
    <TableRow className={cn('', workoutSet.completedAt && 'bg-slate-100 hover:bg-slate-50')}>
      <TableCell>{workoutSet.setNumber}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Input
          type="number"
          placeholder=""
          defaultValue={workoutSet.weight?.toString() || ''}
          onChange={e => debouncedUpdateWorkoutSet({ weight: parseInt(e.target.value) })}
          onBlur={e => updateWorkoutSet({ weight: parseInt(e.target.value) })}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          placeholder=""
          defaultValue={workoutSet.reps?.toString() || ''}
          onChange={e => debouncedUpdateWorkoutSet({ reps: parseInt(e.target.value) })}
          onBlur={e => updateWorkoutSet({ reps: parseInt(e.target.value) })}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          className="rounded-full size-8"
          checked={!!workoutSet.completedAt}
          onCheckedChange={isChecked => updateWorkoutSet({ completed: !!isChecked })}
          disabled={!isEditing}
        />
      </TableCell>
    </TableRow>
  );
}
