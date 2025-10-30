"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ChangePasswordForm from "./change-password-form";

export default function ChangePasswordButton({
  className,
}: React.ComponentProps<"button">) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("", className)}>Change Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
}
