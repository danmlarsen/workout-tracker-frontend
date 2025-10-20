"use client";

import { TWorkout } from "@/api/workouts/types";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EditWorkoutNameButton({
  workout,
  handleEdit,
}: {
  workout: TWorkout;
  handleEdit: (newWorkoutName?: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState(workout.title || "");

  const placeholderTitle =
    new Date(workout.startedAt).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    }) + " Workout";

  return (
    <Dialog open={isOpen} onOpenChange={(newState) => setIsOpen(newState)}>
      <DialogTrigger>Edit name</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit workout</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            onChange={(e) => setNewWorkoutName(e.target.value)}
            value={newWorkoutName}
            placeholder={placeholderTitle}
          />
        </div>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            onClick={() => {
              handleEdit(newWorkoutName);
              setIsOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
