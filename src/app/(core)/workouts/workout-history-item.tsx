import { type TWorkout } from '@/api/workouts/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from 'date-fns';
import WorkoutHistoryItemDropdownMenu from './workout-history-item-dropdown-menu';
import { useState } from 'react';
import WorkoutModal from './workout-modal';
import { Button } from '@/components/ui/button';

export default function WorkoutHistoryItem({ workout }: { workout: TWorkout }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { id, title, createdAt, workoutExercises } = workout;

  return (
    <>
      <WorkoutModal workout={workout} isOpen={modalIsOpen} onOpenChange={newState => setModalIsOpen(newState)} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setModalIsOpen(true)}>
                Open
              </Button>
              <WorkoutHistoryItemDropdownMenu workoutId={id} />
            </div>
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
                const completedSets = workoutExercise.workoutSets.filter(set => !!set.completedAt);

                if (!completedSets) return null;

                const bestSet = completedSets.length > 0 ? `${completedSets[0].weight} kg x ${completedSets[0].reps}` : '-';

                return (
                  <TableRow key={workoutExercise.id}>
                    <TableCell>{workoutExercise.exercise.name}</TableCell>
                    <TableCell className="text-center">{completedSets.length}</TableCell>
                    <TableCell className="text-end">{bestSet}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
