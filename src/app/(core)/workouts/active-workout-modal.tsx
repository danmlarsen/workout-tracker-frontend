import { useActiveWorkout } from "@/api/workouts/queries";
import { useActiveWorkoutContext } from "@/context/active-workout-context";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../../components/ui/drawer";
import WorkoutForm from "@/app/(core)/workouts/workout-form";

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
          <button
            onClick={() => setActiveWorkoutOpen(true)}
            className="bg-foreground text-background fixed inset-x-0 bottom-16 grid h-16 place-items-center"
          >
            {activeWorkout?.title}
          </button>
        </>
      )}
    </>
  );
}
