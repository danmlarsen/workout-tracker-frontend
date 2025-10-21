"use client";

import ConfirmDialog from "@/components/ui/confirm-dialog";

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
    <ConfirmDialog
      isOpen={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title="Confirm Complete"
      content={
        <>
          {!incomplete && <p>This workout will be marked as complete</p>}
          {!!incomplete && (
            <p>
              You have incomplete sets. Are you sure you want to complete the
              workout?
            </p>
          )}
        </>
      }
    />
  );
}
