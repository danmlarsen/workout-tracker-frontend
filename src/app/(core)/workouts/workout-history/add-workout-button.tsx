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
import { useQueryClient } from "@tanstack/react-query";

export default function AddWorkoutButton() {
  const [workoutId, setWorkoutId] = useState<number | undefined>();

  const queryClient = useQueryClient();
  const createWorkout = useCreateDraftWorkout();
  const completeDraftWorkout = useCompleteDraftWorkout();
  const deleteWorkout = useDeleteWorkout();
  const workout = useWorkout(workoutId);

  function handleAddWorkout() {
    createWorkout.mutate(undefined, {
      onSuccess: (workout) => {
        setWorkoutId(workout.id);
      },
    });
  }

  function handleCloseModal() {
    if (workout.data && workout.data.status === "DRAFT") {
      deleteWorkout.mutate(workout.data.id);
    }
    setWorkoutId(undefined);
  }

  function handleSaveWorkout() {
    if (!workout.data) return;
    completeDraftWorkout.mutate(workout.data.id, {
      onSuccess: (_, id) => {
        // queryClient.setQueryData(["workouts", { id }], (oldData) =>
        //   oldData ? { ...oldData, status: "COMPLETED" } : oldData,
        // );
        setWorkoutId(undefined);
      },
    });
  }

  function handleDiscardWorkout() {
    if (!workout.data) return;
    deleteWorkout.mutate(workout.data.id, {
      onSuccess: () => {
        setWorkoutId(undefined);
      },
    });
  }

  return (
    <>
      {workout.data && (
        <ResponsiveModal
          isOpen={!!workoutId}
          onOpenChange={handleCloseModal}
          content={
            <WorkoutForm
              workout={workout.data}
              onClose={handleDiscardWorkout}
              onSuccess={handleSaveWorkout}
            />
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
