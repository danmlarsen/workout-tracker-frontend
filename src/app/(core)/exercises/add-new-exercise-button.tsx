'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import ExerciseForm from './exercise-form';

export default function AddNewExerciseButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add new exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>Add new exercise</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <ExerciseForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
