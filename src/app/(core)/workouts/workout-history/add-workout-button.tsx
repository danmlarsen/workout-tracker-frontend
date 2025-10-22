"use client";

import {
  useCompleteDraftWorkout,
  useCreateDraftWorkout,
  useDeleteWorkout,
} from "@/api/workouts/mutations";
import { useWorkout } from "@/api/workouts/queries";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useState } from "react";
import WorkoutForm from "../workout-form/workout-form";

export default function AddWorkoutButton({
  selectedDate,
}: {
  selectedDate?: Date;
}) {
  const [open, setOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState<number | undefined>();

  const createWorkout = useCreateDraftWorkout();
  const completeDraftWorkout = useCompleteDraftWorkout();
  const deleteWorkout = useDeleteWorkout();
  const workout = useWorkout(workoutId);

  function handleAddWorkout() {
    createWorkout.mutate(
      { startedAt: selectedDate?.toISOString() || undefined },
      {
        onSuccess: (workout) => {
          setWorkoutId(workout.id);
          setOpen(true);
        },
      },
    );
  }

  function handleOpenChange() {
    setOpen(false);
    if (workout.data && workout.data.status === "DRAFT") {
      deleteWorkout.mutate(workout.data.id);
    }
  }

  function handleSaveWorkout() {
    if (!workout.data) return;
    completeDraftWorkout.mutate(workout.data.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  function handleDiscardWorkout() {
    if (!workout.data) return;
    deleteWorkout.mutate(workout.data.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <>
      {workout.data && (
        <ResponsiveModal
          isOpen={open}
          onOpenChange={handleOpenChange}
          content={
            <div className="px-4">
              <WorkoutForm
                workout={workout.data}
                onClose={handleDiscardWorkout}
                onSuccess={handleSaveWorkout}
              />
            </div>
          }
          title="Add workout"
          description=""
        />
      )}
      <Button onClick={handleAddWorkout} disabled={createWorkout.isPending}>
        {createWorkout.isPending ? "Creating..." : "Add Workout"}
      </Button>
    </>
  );
}
