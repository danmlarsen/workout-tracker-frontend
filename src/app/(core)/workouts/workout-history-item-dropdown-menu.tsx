"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import DeleteWorkoutDialog from "./delete-workout-dialog";
import { useState } from "react";

export default function WorkoutHistoryItemDropdownMenu({
  workoutId,
}: {
  workoutId: number;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DeleteWorkoutDialog
        workoutId={workoutId}
        isOpen={deleteDialogOpen}
        onOpenChange={(newValue) => setDeleteDialogOpen(newValue)}
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
