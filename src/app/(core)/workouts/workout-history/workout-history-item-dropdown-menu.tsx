"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteWorkout } from "@/api/workouts/mutations";
import ConfirmDialog from "@/components/ui/confirm-dialog";

export default function WorkoutHistoryItemDropdownMenu({
  workoutId,
}: {
  workoutId: number;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteWorkoutMutation } = useDeleteWorkout();

  return (
    <>
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          deleteWorkoutMutation(workoutId);
          setDeleteDialogOpen(false);
        }}
        title="Delete Workout?"
        confirmText="Delete"
        variant="destructive"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit Workout</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={() => setDeleteDialogOpen(true)}>
              Delete Workout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
