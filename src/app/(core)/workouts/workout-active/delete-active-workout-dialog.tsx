"use client";

import ConfirmDialog from "@/components/ui/confirm-dialog";

export default function DeleteActiveWorkoutDialog({
  isOpen,
  onOpenChanged,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChanged: (newState: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onOpenChange={onOpenChanged}
      onConfirm={() => {
        onConfirm();
        onOpenChanged(false);
      }}
      title="Discard Workout"
      variant="destructive"
    />
  );
}
