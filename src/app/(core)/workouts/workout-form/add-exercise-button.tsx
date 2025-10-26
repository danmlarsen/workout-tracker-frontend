"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useAddWorkoutExercise } from "@/api/workouts/mutations";
import ExercisesView from "../../exercises/exercises-view/exercises-view";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

export default function AddExerciseButton({
  workoutId,
  isActiveWorkout = false,
}: {
  workoutId: number;
  isActiveWorkout?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const mutateWorkoutExercise = useAddWorkoutExercise(isActiveWorkout);

  return (
    <>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add Exercise"
        className="px-4"
        content={
          <ExercisesView
            onExerciseClick={(exerciseId) => {
              mutateWorkoutExercise.mutate(
                { workoutId, exerciseId },
                {
                  onSuccess: () => {
                    setIsOpen(false);
                  },
                },
              );
            }}
          />
        }
      />
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        + Add Exercise
      </Button>
    </>
  );
}
