"use client";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export default function WeeklyReportButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Weekly Report"
        content={
          <div className="px-4 text-center">
            <p className="text-muted-foreground text-xl">
              Weekly Report coming soon..
            </p>
          </div>
        }
      />
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <span>Weekly Report</span> <ChevronRightIcon />
      </Button>
    </>
  );
}
