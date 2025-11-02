import { type TWorkoutExercise } from "@/api/workouts/types";
import WorkoutSet from "./workout-set";
import {
  useAddWorkoutSet,
  useUpdateWorkoutExercise,
} from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  findBestWorkoutSetWithIndex,
  getPlaceholderWorkoutSet,
} from "@/lib/utils";
import { useMemo, useState } from "react";
import { TExercise } from "@/api/exercises/types";
import { ChevronRightIcon } from "lucide-react";
import WorkoutExerciseOptionsButton from "./workout-exercise-options-button";
import WorkoutNotes from "./workout-notes";

type TWorkoutExerciseProps = {
  workoutExercise: TWorkoutExercise;
  isEditing?: boolean;
  isActiveWorkout?: boolean;
  onOpenExercise: (exercise: TExercise) => void;
};

export default function WorkoutExercise({
  workoutExercise,
  isActiveWorkout = false,
  onOpenExercise,
}: TWorkoutExerciseProps) {
  const [notesOpen, setNotesOpen] = useState(false);

  const { mutate: addWorkoutSet } = useAddWorkoutSet(isActiveWorkout);
  const updateWorkoutExercise = useUpdateWorkoutExercise(isActiveWorkout);

  const workoutSets = workoutExercise.workoutSets;
  const previousWorkoutSets =
    workoutExercise.previousWorkoutExercise?.workoutSets;

  // Find the best performing set from current workout with its index
  const bestCurrentSetInfo = useMemo(
    () => findBestWorkoutSetWithIndex(workoutSets),
    [workoutSets],
  );

  return (
    <li className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => onOpenExercise(workoutExercise.exercise)}
          variant="ghost"
        >
          <h2 className="text-xl font-bold">{workoutExercise.exercise.name}</h2>
          <ChevronRightIcon />
        </Button>
        <WorkoutExerciseOptionsButton
          workoutExercise={workoutExercise}
          isActiveWorkout={isActiveWorkout}
          onOpenNotes={() => setNotesOpen(true)}
        />
      </div>

      <WorkoutNotes
        notes={workoutExercise.notes}
        notesOpen={notesOpen}
        onNotesOpenChange={setNotesOpen}
        onUpdate={(notes) =>
          updateWorkoutExercise.mutate({
            workoutId: workoutExercise.workoutId,
            workoutExerciseId: workoutExercise.id,
            data: {
              notes,
            },
          })
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">Set</TableHead>
            <TableHead className="text-center">Previous</TableHead>
            {workoutExercise.exercise.category === "strength" && (
              <>
                <TableHead className="w-20 text-center">kg</TableHead>
                <TableHead className="w-20 text-center">Reps</TableHead>
              </>
            )}
            {workoutExercise.exercise.category === "cardio" && (
              <>
                <TableHead />
                <TableHead className="w-20 text-center">Minutes</TableHead>
              </>
            )}
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {workoutSets.map((workoutSet, index) => {
            const { bestSet, bestSetIndex } = bestCurrentSetInfo;
            const placeholderSet = getPlaceholderWorkoutSet(
              index,
              bestSet,
              bestSetIndex,
              previousWorkoutSets,
              workoutExercise.workoutSets,
            );
            const previousSet = previousWorkoutSets?.[index];

            return (
              <WorkoutSet
                key={workoutSet.id}
                workoutSet={workoutSet}
                workoutId={workoutExercise.workoutId}
                exerciseCategory={workoutExercise.exercise.category}
                previousSet={previousSet}
                placeholderSet={placeholderSet}
                isActiveWorkout={isActiveWorkout}
              />
            );
          })}
        </TableBody>
      </Table>

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
    </li>
  );
}
