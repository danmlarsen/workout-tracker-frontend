"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

type TResponsiveModalProps = {
  content: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
};

export function ResponsiveModal({
  content,
  isOpen,
  onOpenChange,
  title,
  description,
  className,
}: TResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    // return (
    //   <Dialog open={isOpen} onOpenChange={onOpenChange}>
    //     <DialogContent className="flex max-h-[60vh] flex-col">
    //       <DialogHeader className="sr-only">
    //         <DialogTitle>{title}</DialogTitle>
    //         <DialogDescription>{description}</DialogDescription>
    //       </DialogHeader>
    //       <div className={cn("overflow-y-auto pt-6", className)}>{content}</div>
    //     </DialogContent>
    //   </Dialog>
    // );
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className={cn("overflow-y-auto pt-6", className)}>{content}</div>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[95dvh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className={cn("overflow-y-auto pb-6", className)}>{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }
}
