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
    <Drawer open={isOpen} onOpenChange={(newState) => setIsOpen(newState)}>
      <DrawerTrigger asChild>
        <Button className="w-full">+ Add Exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>Add exercise</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}
