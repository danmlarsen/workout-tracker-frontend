"use client";

import { useDeleteWorkoutExercise } from "@/api/workouts/workout-exercise-mutations";
import { TWorkoutExercise } from "@/api/workouts/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

export default function WorkoutExerciseOptionsButton({
  workoutExercise,
  isActiveWorkout,
  onOpenNotes,
}: {
  workoutExercise: TWorkoutExercise;
  isActiveWorkout: boolean;
  onOpenNotes: () => void;
}) {
  const deleteMutation = useDeleteWorkoutExercise(isActiveWorkout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button onClick={onOpenNotes} variant="ghost">
            Add Exercise Notes
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            onClick={() =>
              deleteMutation.mutate({
                workoutId: workoutExercise.workoutId,
                workoutExerciseId: workoutExercise.id,
              })
            }
            variant="ghost"
          >
            Remove Exercise
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
