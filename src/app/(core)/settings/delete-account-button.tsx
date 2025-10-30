"use client";

import {
  Dialog,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>Enter your password to confirm</DialogDescription>
        </DialogHeader>
        <DeleteAccountForm />
      </DialogContent>
    </Dialog>
  );
}
