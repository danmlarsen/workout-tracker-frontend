"use client";

import { useDeleteWorkoutSet } from "@/api/workouts/mutations";
import { TWorkoutSet } from "@/api/workouts/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkoutSetOptionsButton({
  workoutSet,
  workoutId,
  isActiveWorkout,
}: {
  workoutSet: TWorkoutSet;
  workoutId: number;
  isActiveWorkout: boolean;
}) {
  const deleteWorkoutSet = useDeleteWorkoutSet(isActiveWorkout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {workoutSet.setNumber}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button
            onClick={() =>
              deleteWorkoutSet.mutate({
                workoutId,
                workoutExerciseId: workoutSet.workoutExerciseId,
                setId: workoutSet.id,
              })
            }
            variant="ghost"
          >
            Remove Set
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
