"use client";

import { useRef } from "react";

import { ResponsiveModal } from "@/components/ui/responsive-modal";
import ExerciseDetails from "./exercise-details";
import { TExercise } from "@/api/exercises/types";

interface ExerciseDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise?: TExercise;
}

export default function ExerciseDetailsModal({
  isOpen,
  onOpenChange,
  exercise,
}: ExerciseDetailsModalProps) {
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
