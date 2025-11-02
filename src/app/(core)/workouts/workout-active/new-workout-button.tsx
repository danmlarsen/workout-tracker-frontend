"use client";

import { Button } from "@/components/ui/button";
import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import { useCreateActiveWorkout } from "@/api/workouts/mutations";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function NewWorkoutButton() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();

  const { data: activeWorkout } = useActiveWorkout();
  const createWorkoutQuery = useCreateActiveWorkout();

  function handleClick() {
    if (activeWorkout) {
      setActiveWorkoutOpen(true);
    } else {
      createWorkoutQuery.mutate(undefined, {
        onSuccess: () => {
          setActiveWorkoutOpen(true);
        },
        onError: () => {
          toast.error(
            "Failed to create a new workout. This is probably due to a network issue. Please try again later.",
          );
        },
      });
    }
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full"
      disabled={createWorkoutQuery.isPending}
    >
      {createWorkoutQuery.isPending && <Spinner />}
      {activeWorkout ? "Go to active workout" : "Start new Workout"}
    </Button>
  );
}
