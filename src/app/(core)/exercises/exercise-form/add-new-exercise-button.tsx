"use client";

import { Button } from "@/components/ui/button";
import ExerciseForm from "./exercise-form";
import { useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

export default function AddNewExerciseButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="px-4"
        content={<ExerciseForm />}
        title="Add New Exercise"
      />
      <Button onClick={() => setIsOpen(true)}>Add New Exercise</Button>
    </>
  );
}
