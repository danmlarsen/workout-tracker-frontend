"use client";

import { useDeleteWorkout } from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteWorkoutDialog({
  workoutId,
  isOpen = false,
  onOpenChange,
}: {
  workoutId: number;
  isOpen: boolean;
  onOpenChange: (newValue: boolean) => void;
}) {
  const { mutate: deleteWorkoutMutation } = useDeleteWorkout();

  return (
    <Dialog open={isOpen} onOpenChange={(newValue) => onOpenChange(newValue)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete workout?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              deleteWorkoutMutation(workoutId);
              onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
