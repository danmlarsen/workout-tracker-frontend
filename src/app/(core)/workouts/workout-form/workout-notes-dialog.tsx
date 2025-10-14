"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function WorkoutNotesDialog({
  notes,
  isOpen,
  onOpenChange,
  onConfirm,
}: {
  notes: string | null;
  isOpen: boolean;
  onOpenChange: (newState: boolean) => void;
  onConfirm: (newNotes: string) => void;
}) {
  const [newNotes, setNewNotes] = useState(notes || "");

  function handleConfirm() {
    onConfirm(newNotes);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Workout Note</DialogTitle>
        </DialogHeader>
        <div>
          <Textarea
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Please enter your notes here..."
            className="w-full"
          />
        </div>
        <DialogFooter className="grid grid-cols-2">
          <DialogClose>Cancel</DialogClose>
          <Button onClick={handleConfirm}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
