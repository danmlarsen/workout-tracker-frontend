"use client";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import ExerciseDetails from "./exercise-details";
import { TExercise } from "@/api/exercises/types";

export default function ExerciseDetailsModal({
  isOpen,
  onOpenChange,
  exercise,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise?: TExercise;
}) {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      content={exercise && <ExerciseDetails exerciseId={exercise.id} />}
      title={exercise && exercise.name}
    />
  );
}
