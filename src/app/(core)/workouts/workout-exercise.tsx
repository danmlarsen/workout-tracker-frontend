import { type TWorkoutExercise } from "@/api/workouts/types";
import WorkoutSet from "./workout-set";
import { useAddWorkoutSet } from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TWorkoutExerciseProps = {
  workoutExercise: TWorkoutExercise;
  isEditing?: boolean;
  isActiveWorkout?: boolean;
};

export default function WorkoutExercise({
  workoutExercise,
  isEditing = true,
  isActiveWorkout = false,
}: TWorkoutExerciseProps) {
  const { mutate: addWorkoutSet } = useAddWorkoutSet(isActiveWorkout);

  const previousSets = workoutExercise.previousWorkoutExercise?.workoutSets;
  const lastSet = previousSets
    ? previousSets[previousSets.length - 1]
    : undefined;

  return (
    <li className="space-y-4">
      <h2 className="text-xl font-bold">{workoutExercise.exercise.name}</h2>

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
          {workoutExercise.workoutSets.map((workoutSet, index) => {
            const placeholderSet = previousSets?.[index]
              ? previousSets?.[index]
              : lastSet;

            return (
              <WorkoutSet
                key={workoutSet.id}
                workoutSet={workoutSet}
                workoutId={workoutExercise.workoutId}
                isEditing={isEditing}
                previousSet={previousSets?.[index]}
                placeholderSet={placeholderSet}
                isActiveWorkout={isActiveWorkout}
              />
            );
          })}
        </TableBody>
      </Table>

      {isEditing && (
        <Button
          onClick={() =>
            addWorkoutSet({
              workoutId: workoutExercise.workoutId,
              workoutExerciseId: workoutExercise.id,
            })
          }
          className="w-full"
        >
          + Add set
        </Button>
      )}
    </li>
  );
}
