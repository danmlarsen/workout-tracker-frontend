import { type TWorkout } from '@/api/workouts/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from 'date-fns';
import WorkoutHistoryItemDropdownMenu from './workout-history-item-dropdown-menu';

export default function WorkoutHistoryItem({ data: { id, title, createdAt, workoutExercises } }: { data: TWorkout }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <WorkoutHistoryItemDropdownMenu workoutId={id} />
        </div>
        <CardDescription>{formatDate(createdAt, 'PP')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>
              <TableHead className="w-10 text-center">Sets</TableHead>
              <TableHead className="w-30 text-end">Best Set</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workoutExercises.map(workoutExercise => {
              const bestSet = workoutExercise.workoutSets.length ? `${workoutExercise.workoutSets[0].weight} kg x ${workoutExercise.workoutSets[0].reps}` : '-';

              return (
                <TableRow key={workoutExercise.id}>
                  <TableCell>{workoutExercise.exercise.name}</TableCell>
                  <TableCell className="text-center">{workoutExercise.workoutSets.length}</TableCell>
                  <TableCell className="text-end">{bestSet}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
