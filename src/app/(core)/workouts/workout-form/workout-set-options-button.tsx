"use client";

import {
  useDeleteWorkoutSet,
  useUpdateWorkoutSet,
} from "@/api/workouts/mutations";
import { TWorkoutSet, WORKOUT_SET_TYPES } from "@/api/workouts/types";
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
        <Button variant="outline" className="size-9 px-0 py-0">
          {workoutSet.type === "normal" && workoutSet.setNumber}
          {workoutSet.type === "warmup" && (
            <span className="text-amber-500">W</span>
          )}
          {workoutSet.type === "dropset" && (
            <span className="text-blue-500">D</span>
          )}
          {workoutSet.type === "failure" && (
            <span className="text-red-500">F</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {WORKOUT_SET_TYPES.map((type) => (
          <DropdownMenuItem asChild key={type}>
            <Button
              onClick={() =>
                updateWorkoutSet.mutate({
                  workoutId,
                  workoutExerciseId: workoutSet.workoutExerciseId,
                  setId: workoutSet.id,
                  data: {
                    type,
                  },
                })
              }
              variant="ghost"
              className="capitalize"
            >
              {type} Set
            </Button>
          </DropdownMenuItem>
        ))}
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
