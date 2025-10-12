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
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function DeleteActiveWorkoutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteActiveWorkoutMutation } = useDeleteActiveWorkout();

  return (
    <Dialog open={isOpen} onOpenChange={(newValue) => setIsOpen(newValue)}>
      <DialogTrigger>
        <XIcon />
      </DialogTrigger>
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
              deleteActiveWorkoutMutation();
              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
