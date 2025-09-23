'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import WorkoutForm from './workout-form';
import { useState } from 'react';
import { useCreateWorkout } from '@/api/workouts/queries';

export default function NewWorkoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<number | null>(null);

  const createWorkoutQuery = useCreateWorkout();

  return (
    <>
      <Button
        onClick={() => {
          createWorkoutQuery.mutate(
            { title: 'react query workout' },
            {
              onSuccess: data => {
                setCurrentWorkout(data.id);
                setIsOpen(true);
              },
            }
          );
        }}
      >
        New workout
      </Button>
      <Drawer open={isOpen} onOpenChange={open => setIsOpen(open)}>
        <DrawerContent className="h-[95dvh]">
          <DrawerHeader>
            <DrawerTitle>New workout</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">{currentWorkout && <WorkoutForm workoutId={currentWorkout} />}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
