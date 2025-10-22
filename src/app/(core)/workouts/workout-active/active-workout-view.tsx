import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import WorkoutForm from "@/app/(core)/workouts/workout-form/workout-form";
import { Button } from "@/components/ui/button";
import Timer from "@/components/ui/timer";
import DeleteActiveWorkoutDialog from "./delete-active-workout-dialog";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { parseWorkoutTitle } from "@/lib/utils";

export default function ActiveWorkoutView() {
  const { activeWorkoutOpen, setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: activeWorkout } = useActiveWorkout();
  const [deleteWorkoutOpen, setDeleteWorkoutOpen] = useState(false);

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

          <div className="h-16" />
          <div className="bg-sidebar text-sidebar-foreground fixed inset-x-0 bottom-16 grid h-16 translate-y-[1px] grid-cols-[80px_auto_80px] items-center rounded-t-lg px-4">
            <div className="flex items-center justify-start">
              <Button
                onClick={() => setDeleteWorkoutOpen(true)}
                variant="ghost"
              >
                <XIcon />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <div>{parseWorkoutTitle(activeWorkout)}</div>
              <div>
                <Timer workout={activeWorkout} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveWorkoutOpen(true)}
              >
                Resume
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
