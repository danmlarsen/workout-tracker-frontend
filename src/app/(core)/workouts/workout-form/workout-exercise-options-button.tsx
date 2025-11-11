"use client";

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
  onOpenNotes,
  onConfirmDelete,
}: {
  workoutExercise: TWorkoutExercise;
  isActiveWorkout: boolean;
  onOpenNotes: () => void;
  onConfirmDelete: () => void;
}) {
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
          <Button onClick={onConfirmDelete} variant="ghost">
            Remove Exercise
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
