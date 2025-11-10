"use client";

import { useActiveWorkout } from "@/api/workouts/queries";
import WorkoutForm from "@/app/(core)/workouts/workout-form/workout-form";
import { Button } from "@/components/ui/button";
import Timer from "@/components/ui/timer";
import DeleteActiveWorkoutDialog from "./delete-active-workout-dialog";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useState } from "react";
import { ExpandIcon, MaximizeIcon, XIcon } from "lucide-react";
import { parseWorkoutTitle } from "@/lib/utils";
import { useActiveWorkoutContext } from "@/context/active-workout-context";

export default function ActiveWorkoutView() {
  const { data: activeWorkout } = useActiveWorkout();
  const [deleteWorkoutOpen, setDeleteWorkoutOpen] = useState(false);
  const { activeWorkoutOpen, setActiveWorkoutOpen } = useActiveWorkoutContext();

  return (
    <>
      <ResponsiveModal
        isOpen={activeWorkoutOpen}
        onOpenChange={setActiveWorkoutOpen}
        content={
          activeWorkout ? (
            <div className="px-4">
              <WorkoutForm
                workout={activeWorkout}
                onSuccess={() => setActiveWorkoutOpen(false)}
              />
            </div>
          ) : null
        }
        title="Active Workout"
      />

      {activeWorkout && (
        <>
          <DeleteActiveWorkoutDialog
            isOpen={deleteWorkoutOpen}
            onOpenChanged={setDeleteWorkoutOpen}
          />

          <div className="h-16 lg:hidden" />
          <div className="bg-sidebar text-sidebar-foreground fixed inset-x-0 bottom-16 z-10 grid h-16 translate-y-[1px] grid-cols-[auto_1fr_auto] items-center gap-2 rounded-t-lg px-2 lg:inset-x-auto lg:bottom-4 lg:h-auto lg:w-[250px] lg:grid-cols-2 lg:gap-4">
            <div className="flex items-center justify-start lg:row-start-2">
              <Button
                onClick={() => setDeleteWorkoutOpen(true)}
                variant="outline"
                className="p-4"
              >
                <XIcon />
              </Button>
            </div>
            <div className="flex flex-col items-center lg:col-span-2 lg:space-y-2">
              <div className="text-center text-sm font-bold">
                {parseWorkoutTitle(activeWorkout)}
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-1 px-2 text-sm">
                <Timer workout={activeWorkout} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant="outline"
                className="p-4"
                onClick={() => setActiveWorkoutOpen(true)}
              >
                <MaximizeIcon />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
