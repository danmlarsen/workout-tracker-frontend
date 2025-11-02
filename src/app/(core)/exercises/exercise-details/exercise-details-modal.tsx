"use client";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import ExerciseDetails from "./exercise-details";
import { TExercise } from "@/api/exercises/types";
import { useRef } from "react";

export default function ExerciseDetailsModal({
  isOpen,
  onOpenChange,
  exercise,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise?: TExercise;
}) {
  const scrollParentRef = useRef<HTMLDivElement | null>(null);

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      content={
        exercise && (
          <ExerciseDetails
            exerciseId={exercise.id}
            scrollParentRef={scrollParentRef}
          />
        )
      }
      title={exercise && exercise.name}
      scrollParentRef={scrollParentRef}
    />
  );
}
