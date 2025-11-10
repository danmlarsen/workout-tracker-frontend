"use client";

import { TWorkout } from "@/api/workouts/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEventHandler, useState } from "react";

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
    new Date(workout.startedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) + " Workout";

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    if (newName.length > 32) return;

    setNewWorkoutName(newName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newState) => setIsOpen(newState)}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit name</Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit workout name</DialogTitle>
          <DialogDescription>
            Please enter a new name for your workout.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            onChange={handleChangeName}
            value={newWorkoutName}
            placeholder={placeholderTitle}
          />
        </div>
        <DialogFooter>
          <DialogClose className="grow">Cancel</DialogClose>
          <Button
            onClick={() => {
              handleEdit(newWorkoutName);
              setIsOpen(false);
            }}
            className="grow"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
