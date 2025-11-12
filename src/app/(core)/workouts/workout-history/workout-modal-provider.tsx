"use client";

import { createContext, useContext, useState } from "react";

import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useSearchParamState } from "@/hooks/use-search-param-state";
import WorkoutForm from "../workout-form/workout-form";
import { useWorkout } from "@/api/workouts/queries";
import { parseWorkoutTitle } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useInvalidateWorkout } from "@/api/workouts/workout-mutations";

interface WorkoutModalProviderContextValue {
  openWorkout: (workoutId: number, editing?: boolean) => void;
}

const WorkoutModalContext =
  createContext<WorkoutModalProviderContextValue | null>(null);

interface WorkoutModalProviderProps {
  children: React.ReactNode;
}

export default function WorkoutModalProvider({
  children,
}: WorkoutModalProviderProps) {
  const [isOpen, setIsOpen] = useSearchParamState("workout-modal");
  const [workoutId, setWorkoutId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const invalidateWorkout = useInvalidateWorkout();
  const {
    data: workout,
    isSuccess,
    isLoading,
  } = useWorkout(workoutId || undefined);

  const workoutTitle = workout ? parseWorkoutTitle(workout) : "Loading...";

  const openWorkout = (workoutId: number, editing = true) => {
    setWorkoutId(workoutId);
    setIsEditing(editing);
    setIsOpen(true);
  };

  const closeWorkout = () => {
    setIsOpen(false);
    if (workoutId) {
      invalidateWorkout(workoutId);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <WorkoutModalContext.Provider value={{ openWorkout }}>
      <ResponsiveModal
        isOpen={isOpen}
        onOpenChange={closeWorkout}
        content={
          <div className="px-4">
            {workoutId && isLoading && (
              <div className="flex items-center justify-center py-8">
                <Spinner />
              </div>
            )}
            {isSuccess && workout && (
              <WorkoutForm
                workout={workout}
                onClose={closeWorkout}
                onToggleEdit={toggleEdit}
                isEditing={isEditing}
              />
            )}
          </div>
        }
        title={workoutTitle}
        description={`Viewing workout ${workoutTitle}`}
      />
      {children}
    </WorkoutModalContext.Provider>
  );
}

export const useWorkoutModal = () => {
  const context = useContext(WorkoutModalContext);
  if (!context) {
    throw new Error("useWorkoutModal must be used within WorkoutModalProvider");
  }
  return context;
};
