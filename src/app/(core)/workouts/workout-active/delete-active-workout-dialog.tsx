"use client";

import { useDeleteActiveWorkout } from "@/api/workouts/workout-mutations";
import ConfirmDialog from "@/components/ui/confirm-dialog";

import { useActiveWorkoutContext } from "@/context/active-workout-context";

export default function DeleteActiveWorkoutDialog({
  isOpen,
  onOpenChanged,
}: {
  isOpen: boolean;
  onOpenChanged: (newState: boolean) => void;
}) {
  const { mutate: deleteActiveWorkoutMutation } = useDeleteActiveWorkout();
  const { setActiveWorkoutOpen } = useActiveWorkoutContext();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onOpenChange={onOpenChanged}
      onConfirm={() => {
        setActiveWorkoutOpen(false);
        deleteActiveWorkoutMutation();
        onOpenChanged(false);
      }}
      title="Discard Workout"
      variant="destructive"
    />
  );
}
