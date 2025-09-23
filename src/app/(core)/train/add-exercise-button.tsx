'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Exercises from './exercises';

export default function AddExerciseButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>Add exercise</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Exercises />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
