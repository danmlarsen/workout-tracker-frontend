'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import ExercisesList from '../exercises/exercises-list';
import { useState } from 'react';

export default function AddExerciseButton({ workoutId }: { workoutId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={newState => setIsOpen(newState)}>
      <DrawerTrigger asChild>
        <Button className="w-full">+ Add Exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>Add exercise</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ExercisesList selectedWorkoutId={workoutId} onExerciseClick={() => setIsOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
