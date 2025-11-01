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
import { useState } from "react";

export default function ChangePasswordButton({
  className,
}: React.ComponentProps<"button">) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn("", className)} onClick={() => setIsOpen(true)}>
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
