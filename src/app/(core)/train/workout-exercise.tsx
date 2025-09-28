import { type TWorkoutExercise } from '@/api/workouts/types';
import WorkoutSet from './workout-set';
import { useAddWorkoutSet } from '@/api/workouts/mutations';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function WorkoutExercise({ workoutExercise }: { workoutExercise: TWorkoutExercise }) {
  const { mutate: addWorkoutSet } = useAddWorkoutSet();

  return (
    <li className="space-y-4">
      <h2 className="font-bold text-xl">{workoutExercise.exercise.name}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">Set</TableHead>
            <TableHead className="text-center">Previous</TableHead>
            <TableHead className="w-20 text-center">kg</TableHead>
            <TableHead className="w-20 text-center">Reps</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {workoutExercise.workoutSets.map(workoutSet => (
            <WorkoutSet key={workoutSet.id} workoutSet={workoutSet} workoutId={workoutExercise.workoutId} />
          ))}
        </TableBody>
      </Table>

      <Button onClick={() => addWorkoutSet({ workoutId: workoutExercise.workoutId, workoutExerciseId: workoutExercise.id })} className="w-full">
        + Add set
      </Button>
    </li>
  );
}
