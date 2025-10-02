"use client";

import { TWorkout } from "@/api/workouts/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import WorkoutForm from "./workout-form";

export default function WorkoutModal({
  workout,
  isOpen,
  onOpenChange,
}: {
  workout: TWorkout;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle className="sr-only">{workout.title}</DrawerTitle>
          <DrawerDescription className="sr-only">
            Workout data
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <WorkoutForm workout={workout} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
