"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteWorkout } from "@/api/workouts/workout-mutations";
import ConfirmDialog from "@/components/ui/confirm-dialog";

interface WorkoutHistoryItemDropdownMenuProps {
  workoutId: number;
  onClickEdit: () => void;
}

export default function WorkoutHistoryItemDropdownMenu({
  workoutId,
  onClickEdit,
}: WorkoutHistoryItemDropdownMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteWorkout = useDeleteWorkout();

  const handleDelete = () => {
    deleteWorkout.mutate(workoutId, {
      onSuccess: () => {
        toast.success(`Successfully deleted workout`);
      },
    });
    setDeleteDialogOpen(false);
  };

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
