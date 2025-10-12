"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CompleteWorkoutDialog({
  open,
  onOpenChange,
  onConfirm,
  incomplete = false,
}: {
  open: boolean;
  onOpenChange: (newValue: boolean) => void;
  onConfirm: () => void;
  incomplete?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Complete</DialogTitle>
        </DialogHeader>
        {!incomplete && <p>This workout will be marked as complete</p>}
        {!!incomplete && (
          <p>
            You have incomplete sets. Are you sure you want to complete the
            workout?
          </p>
        )}
        <DialogFooter className="grid grid-cols-2">
          <DialogClose>Cancel</DialogClose>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
