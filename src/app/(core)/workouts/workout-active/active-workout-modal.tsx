import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../../../components/ui/drawer";
import WorkoutForm from "@/app/(core)/workouts/workout-form/workout-form";
import { Button } from "@/components/ui/button";
import Timer from "@/components/ui/timer";
import DeleteActiveWorkoutDialog from "./delete-active-workout-dialog";

export default function ActiveWorkoutModal() {
  const { activeWorkoutOpen, setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: activeWorkout } = useActiveWorkout();

  return (
    <>
      <Drawer open={activeWorkoutOpen} onOpenChange={setActiveWorkoutOpen}>
        <DrawerContent className="h-[95dvh]">
          <DrawerHeader>
            <DrawerTitle className="sr-only">
              {activeWorkout?.title}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Current active workout
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            {activeWorkout && (
              <WorkoutForm
                workout={activeWorkout}
                onSuccess={() => setActiveWorkoutOpen(false)}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {activeWorkout && (
        <>
          <div className="h-16" />
          <div className="bg-sidebar text-sidebar-foreground fixed inset-x-0 bottom-16 grid h-16 translate-y-[1px] grid-cols-[80px_auto_80px] items-center rounded-t-lg px-4">
            <div className="flex items-center justify-start">
              <DeleteActiveWorkoutDialog />
            </div>
            <div className="flex flex-col items-center">
              <div>{activeWorkout.title}</div>
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
