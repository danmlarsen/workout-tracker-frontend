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
import { useDeleteWorkout } from "@/api/workouts/workout-mutations";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { toast } from "sonner";

export default function WorkoutHistoryItemDropdownMenu({
  workoutId,
  onClickEdit,
}: {
  workoutId: number;
  onClickEdit: () => void;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteWorkoutMutation } = useDeleteWorkout();

  function handleDelete() {
    deleteWorkoutMutation(workoutId, {
      onSuccess: () => {
        toast.success(`Successfully deleted workout`);
      },
    });
    setDeleteDialogOpen(false);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
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
          <DropdownMenuItem onSelect={onClickEdit}>
            Edit Workout
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)}>
            Delete Workout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
