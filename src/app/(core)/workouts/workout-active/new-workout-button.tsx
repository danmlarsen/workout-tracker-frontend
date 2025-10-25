"use client";

import { Button } from "@/components/ui/button";
import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import { useCreateActiveWorkout } from "@/api/workouts/mutations";

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
      });
    }
  }

  return (
    <Button onClick={handleClick} className="w-full">
      {activeWorkout ? "Go to active workout" : "Start new Workout"}
    </Button>
  );
}
