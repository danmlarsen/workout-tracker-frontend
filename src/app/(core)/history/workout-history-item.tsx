import { useDeleteWorkout } from '@/api/workouts/queries';
import { type Workout } from '@/api/workouts/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from 'date-fns';

export default function WorkoutHistoryItem({ data: { id, title, createdAt, workoutExercises } }: { data: Workout }) {
  const { mutate: deleteWorkout } = useDeleteWorkout();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{formatDate(createdAt, 'PP')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {workoutExercises.map(workoutExercise => (
            <li key={workoutExercise.id}>{workoutExercise.exercise.name}</li>
          ))}
        </ul>
        <Button onClick={() => deleteWorkout(id)}>DELETE</Button>
      </CardContent>
    </Card>
  );
}
