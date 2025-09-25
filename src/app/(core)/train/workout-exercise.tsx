import { type TWorkoutExercise } from '@/api/workouts/types';
import WorkoutSet from './workout-set';
import { useAddWorkoutSet } from '@/api/workouts/queries';
import { Button } from '@/components/ui/button';

export default function WorkoutExercise({ workoutExercise }: { workoutExercise: TWorkoutExercise }) {
  const { mutate: addWorkoutSet } = useAddWorkoutSet();

  return (
    <li>
      <h2>{workoutExercise.exercise.name}</h2>
      <ul className="space-y-2">
        {workoutExercise.workoutSets.map((workoutSet, index) => (
          <WorkoutSet key={workoutSet.id} workoutSet={workoutSet} workoutId={workoutExercise.workoutId} setNumber={index + 1} />
        ))}
      </ul>
      <Button onClick={() => addWorkoutSet({ workoutId: workoutExercise.workoutId, workoutExerciseId: workoutExercise.id })}>Add set</Button>
    </li>
  );
}
