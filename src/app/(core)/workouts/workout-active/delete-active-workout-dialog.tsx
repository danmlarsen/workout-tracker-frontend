"use client";

import { useDeleteActiveWorkout } from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Dialog open={isOpen} onOpenChange={onOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard workout?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              setActiveWorkoutOpen(false);
              deleteActiveWorkoutMutation();
              onOpenChanged(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
