"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteAccountForm from "./delete-account-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DeleteAccountButton({
  className,
}: React.ComponentProps<"button">) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className={cn("", className)}>
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DeleteAccountForm />
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
