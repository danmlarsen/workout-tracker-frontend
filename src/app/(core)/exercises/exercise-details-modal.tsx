import { type TExercise } from "@/api/exercises/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ExerciseWorkoutsList from "./exercise-workouts-list";

export default function ExerciseDetailsModal({
  exercise,
  isOpen,
  onOpenChange,
}: {
  exercise: TExercise | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader>
          <DrawerTitle>{exercise?.name}</DrawerTitle>
        </DrawerHeader>
        <ExerciseWorkoutsList exercise={exercise} />
      </DrawerContent>
    </Drawer>
  );
}
