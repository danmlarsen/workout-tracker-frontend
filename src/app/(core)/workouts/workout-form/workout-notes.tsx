"use client";

import { useUpdateWorkout } from "@/api/workouts/mutations";
import { TWorkout } from "@/api/workouts/types";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import WorkoutNotesDialog from "./workout-notes-dialog";
import WorkoutNotesDeleteDialog from "./workout-notes-delete-dialog";

export default function WorkoutNotes({ workout }: { workout: TWorkout }) {
  const [workoutNotesOpen, setWorkoutNotesOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isActiveWorkout = workout.status === "ACTIVE";

  const updateWorkoutMutation = useUpdateWorkout(isActiveWorkout);

  function handleUpdateWorkoutNotes(notes: string) {
    updateWorkoutMutation.mutate({
      workoutId: workout.id,
      data: { notes },
    });
  }

  function handleDeleteWorkoutNotes() {
    setDeleteDialogOpen(false);
    updateWorkoutMutation.mutate({
      workoutId: workout.id,
      data: { notes: "" },
    });
  }

  return (
    <>
      <WorkoutNotesDialog
        key={`${workoutNotesOpen}-${workout.notes}`}
        isOpen={workoutNotesOpen}
        onOpenChange={setWorkoutNotesOpen}
        notes={workout.notes}
        onConfirm={handleUpdateWorkoutNotes}
      />

      <WorkoutNotesDeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteWorkoutNotes}
      />

      {!workout.notes && (
        <Button
          onClick={() => setWorkoutNotesOpen(true)}
          className="text-muted-foreground flex w-full items-center justify-start gap-2"
          variant="ghost"
        >
          <PencilIcon />
          <p>Add notes here</p>
        </Button>
      )}

      {workout.notes && (
        <div>
          <p className="break-words whitespace-pre-wrap">{workout.notes}</p>
          <div className="flex items-center gap-2">
            <Button onClick={() => setWorkoutNotesOpen(true)} variant="ghost">
              <PencilIcon />
              Edit
            </Button>
            <Button onClick={() => setDeleteDialogOpen(true)} variant="ghost">
              <TrashIcon />
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
