"use client";

import { useCreateDraftWorkout } from "@/api/workouts/mutations";
import { useWorkout } from "@/api/workouts/queries";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useState } from "react";
import WorkoutForm from "../workout-form/workout-form";

export default function AddWorkoutButton() {
  const [open, setOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState<number | undefined>();

  const createWorkout = useCreateDraftWorkout();
  const workout = useWorkout(workoutId);

  function handleAddWorkout() {
    createWorkout.mutate(undefined, {
      onSuccess: (workout) => {
        setWorkoutId(workout.id);
        setOpen(true);
      },
    });
  }

  return (
    <>
      {workout.isSuccess && (
        <ResponsiveModal
          isOpen={open}
          onOpenChange={setOpen}
          content={<WorkoutForm workout={workout.data} />}
          title="Add workout"
          description=""
        />
      )}
      <Button onClick={handleAddWorkout}>Add Workout</Button>
    </>
  );
}
