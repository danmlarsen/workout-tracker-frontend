import { useActiveWorkout } from '@/api/workouts/queries';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../../../components/ui/drawer';
import WorkoutForm from '@/app/(core)/train/workout-form';

export default function ActiveWorkoutModal() {
  const { activeWorkoutOpen, setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: activeWorkout } = useActiveWorkout();

  return (
    <>
      <Drawer open={activeWorkoutOpen} onOpenChange={setActiveWorkoutOpen}>
        <DrawerContent className="h-[95dvh]">
          <DrawerHeader>
            <DrawerTitle className="sr-only">{activeWorkout?.title}</DrawerTitle>
            <DrawerDescription className="sr-only">Current active workout</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            {activeWorkout && <WorkoutForm workout={activeWorkout} onSuccess={() => setActiveWorkoutOpen(false)} />}
          </div>
        </DrawerContent>
      </Drawer>

      {activeWorkout && (
        <>
          <div className="h-20" />
          <button onClick={() => setActiveWorkoutOpen(true)} className="fixed bottom-20 inset-x-0 h-20 bg-foreground text-background grid place-items-center">
            {activeWorkout?.title}
          </button>
        </>
      )}
    </>
  );
}
