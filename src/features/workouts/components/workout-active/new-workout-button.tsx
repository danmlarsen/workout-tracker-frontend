"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import { useCreateActiveWorkout } from "@/api/workouts/workout-mutations";
import { Spinner } from "@/components/ui/spinner";

export default function NewWorkoutButton() {
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: activeWorkout } = useActiveWorkout();
  const createActiveWorkout = useCreateActiveWorkout();

  const handleClick = () => {
    if (activeWorkout) {
      setActiveWorkoutOpen(true);
    } else {
      createActiveWorkout.mutate(undefined, {
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
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full"
      disabled={createActiveWorkout.isPending}
    >
      {createActiveWorkout.isPending && <Spinner />}
      {activeWorkout ? "Go to active workout" : "Start new Workout"}
    </Button>
  );
}
