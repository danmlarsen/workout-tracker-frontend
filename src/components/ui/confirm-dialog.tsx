"use client";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

export default function ConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Confirm",
  text,
  content,
  confirmText = "Confirm",
  variant = "default",
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  text?: string;
  content?: React.ReactNode;
  confirmText?: string;
  variant?: "default" | "destructive";
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {!!content && content}
        {!content && !!text && <p>{text}</p>}
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
