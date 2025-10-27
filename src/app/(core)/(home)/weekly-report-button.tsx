"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRightIcon } from "lucide-react";

export default function WeeklyReportButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <span>Weekly Report</span> <ChevronRightIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Weekly Report</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <p className="text-muted-foreground">Weekly Report coming soon..</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
