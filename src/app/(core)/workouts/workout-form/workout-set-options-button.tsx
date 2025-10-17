"use client";

import {
  useDeleteWorkoutSet,
  useUpdateWorkoutSet,
} from "@/api/workouts/mutations";
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
  const updateWorkoutSet = useUpdateWorkoutSet(isActiveWorkout);
  const deleteWorkoutSet = useDeleteWorkoutSet(isActiveWorkout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {workoutSet.setNumber}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {workoutSet.type !== "normal" && (
          <DropdownMenuItem asChild>
            <Button
              onClick={() =>
                updateWorkoutSet.mutate({
                  workoutId,
                  workoutExerciseId: workoutSet.workoutExerciseId,
                  setId: workoutSet.id,
                  data: {
                    type: "normal",
                  },
                })
              }
              variant="ghost"
            >
              Work Set
            </Button>
          </DropdownMenuItem>
        )}
        {workoutSet.type !== "warmup" && (
          <DropdownMenuItem asChild>
            <Button
              onClick={() =>
                updateWorkoutSet.mutate({
                  workoutId,
                  workoutExerciseId: workoutSet.workoutExerciseId,
                  setId: workoutSet.id,
                  data: {
                    type: "warmup",
                  },
                })
              }
              variant="ghost"
            >
              Warmup Set
            </Button>
          </DropdownMenuItem>
        )}
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
