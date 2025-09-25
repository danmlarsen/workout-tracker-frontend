import { useActiveWorkout } from '@/api/workouts/queries';
import { useActiveWorkoutContext } from '@/context/active-workout-context';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import ActiveWorkoutForm from '@/app/(core)/train/active-workout-form';

export default function ActiveWorkoutModal() {
  const { activeWorkoutOpen, setActiveWorkoutOpen } = useActiveWorkoutContext();
  const { data: activeWorkout } = useActiveWorkout();

  return (
    <>
      <Drawer open={activeWorkoutOpen} onOpenChange={setActiveWorkoutOpen}>
        <DrawerContent className="h-[95dvh]">
          <DrawerHeader>
            <DrawerTitle>{activeWorkout?.title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <ActiveWorkoutForm />
          </div>
        </DrawerContent>
      </Drawer>

      {activeWorkout && (
        <>
          <div className="h-20" />
          <button onClick={() => setActiveWorkoutOpen(true)} className="fixed bottom-20 inset-x-0 h-20 bg-black text-white grid place-items-center">
            {activeWorkout?.title}
          </button>
        </>
      )}
    </>
  );
}
