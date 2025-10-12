'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import ExerciseForm from './exercise-form';
import { useState } from 'react';

export default function AddNewExerciseButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={newState => setIsOpen(newState)}>
      <DrawerTrigger asChild>
        <Button>Add new exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>Add new exercise</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          <ExerciseForm onSuccess={() => setIsOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
