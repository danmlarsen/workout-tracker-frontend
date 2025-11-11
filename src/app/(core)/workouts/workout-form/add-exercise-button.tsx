"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddWorkoutExercise } from "@/api/workouts/workout-exercise-mutations";
import ExercisesView from "../../exercises/exercises-view/exercises-view";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Spinner } from "@/components/ui/spinner";

export default function AddExerciseButton({
  workoutId,
  isActiveWorkout = false,
}: {
  workoutId: number;
  isActiveWorkout?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const mutateWorkoutExercise = useAddWorkoutExercise(isActiveWorkout);

  function handleExerciseClick(exerciseId: number) {
    if (mutateWorkoutExercise.isPending) return;

    mutateWorkoutExercise.mutate(
      { workoutId, exerciseId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  }

  return (
    <>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add Exercise"
        content={
          <div className="relative">
            <div className="px-4">
              <ExercisesView onExerciseClick={handleExerciseClick} />
            </div>
            {mutateWorkoutExercise.isPending && (
              <div className="fixed inset-0 z-50 bg-black/50">
                <Spinner className="absolute top-1/2 left-1/2 z-50 size-6 -translate-x-1/2 -translate-y-1/2" />
              </div>
            )}
          </div>
        }
      />
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        + Add Exercise
      </Button>
    </>
  );
}
