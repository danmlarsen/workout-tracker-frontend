import { type Workout } from '@/api/workouts/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from 'date-fns';

export default function WorkoutHistoryItem({ data: { title, createdAt, workoutExercises } }: { data: Workout }) {
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
      </CardContent>
    </Card>
  );
}
