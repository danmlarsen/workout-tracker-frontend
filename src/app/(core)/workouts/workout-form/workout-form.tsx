"use client";

import AddExerciseButton from "./add-exercise-button";
import { useCompleteWorkout, useUpdateWorkout } from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import WorkoutExercise from "./workout-exercise";
import EditWorkoutNameButton from "./edit-workout-name-button";
import Timer from "@/components/ui/timer";
import { type TWorkout } from "@/api/workouts/types";
import { createContext, useContext, useState } from "react";
import CompleteWorkoutDialog from "../workout-active/complete-workout-dialog";
import { TExercise } from "@/api/exercises/types";
import DeleteActiveWorkoutDialog from "../workout-active/delete-active-workout-dialog";
import WorkoutNotes from "./workout-notes";
import { parseWorkoutTitle } from "@/lib/utils";
import DatePicker from "@/components/date-picker";
import DurationInput from "@/components/duration-input";
import ExerciseDetailsModal from "../../exercises/exercise-details/exercise-details-modal";

type TWorkoutFormProps = {
  workout: TWorkout;
  onSuccess?: () => void;
  onClose?: () => void;
};

export type WorkoutFormContextValue = {
  workout: TWorkout;
  isActiveWorkout: boolean;
  isEditing: boolean;
};

const WorkoutFormContext = createContext<WorkoutFormContextValue | null>(null);

export default function WorkoutForm({
  workout,
  onSuccess,
  onClose,
}: TWorkoutFormProps) {
  const isActiveWorkout = workout.status === "ACTIVE";

  const [completeWorkoutDialogOpen, setCompleteWorkoutDialogOpen] =
    useState(false);
  const [workoutNotesOpen, setWorkoutNotesOpen] = useState(false);
  const [deleteWorkoutOpen, setDeleteWorkoutOpen] = useState(false);

  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [selectedWorkoutExercise, setSelectedWorkoutExercise] = useState<
    TExercise | undefined
  >();

  const completeWorkout = useCompleteWorkout();
  const updateWorkout = useUpdateWorkout(isActiveWorkout);

  const hasIncompleteSets =
    workout.workoutExercises?.filter(
      (workoutExercise) =>
        workoutExercise.workoutSets?.filter((set) => !set.completedAt).length >
        0,
    ).length > 0;

  const workoutTitle = parseWorkoutTitle(workout);

  function handleCompleteWorkout() {
    onSuccess?.();
    completeWorkout.mutate(workout.id);
  }

  function handleUpdateWorkoutName(newTitle?: string) {
    updateWorkout.mutate({
      workoutId: workout.id,
      data: { title: newTitle || null },
    });
  }

  function handleUpdateWorkoutDate(startedDate: Date) {
    const startedAt = startedDate.toISOString();

    updateWorkout.mutate({
      workoutId: workout.id,
      data: { startedAt },
    });
  }

  function handleUpdateWorkoutDuration(duration: number) {
    updateWorkout.mutate({
      workoutId: workout.id,
      data: { activeDuration: duration },
    });
  }

  return (
    <WorkoutFormContext.Provider
      value={{
        workout,
        isActiveWorkout,
        isEditing: true,
      }}
    >
      <CompleteWorkoutDialog
        open={completeWorkoutDialogOpen}
        onOpenChange={(open) => setCompleteWorkoutDialogOpen(open)}
        onConfirm={handleCompleteWorkout}
        incomplete={hasIncompleteSets}
      />

      <DeleteActiveWorkoutDialog
        isOpen={deleteWorkoutOpen}
        onOpenChanged={setDeleteWorkoutOpen}
      />

      <ExerciseDetailsModal
        isOpen={exerciseModalOpen}
        onOpenChange={setExerciseModalOpen}
        exercise={selectedWorkoutExercise}
      />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          {workout.status === "ACTIVE" && (
            <>
              <Timer workout={workout} isButton={true} />
              <Button onClick={() => setCompleteWorkoutDialogOpen(true)}>
                Finish
              </Button>
            </>
          )}

          {workout.status === "COMPLETED" && (
            <>
              <DurationInput
                workout={workout}
                onDurationChanged={handleUpdateWorkoutDuration}
              />
              <Button onClick={() => onClose?.()}>Close</Button>
            </>
          )}

          {workout.status === "DRAFT" && (
            <>
              <DurationInput
                workout={workout}
                onDurationChanged={handleUpdateWorkoutDuration}
              />
              <div className="flex gap-2">
                <Button onClick={() => onClose?.()}>Discard</Button>
                <Button onClick={() => onSuccess?.()}>Save</Button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h1>{workoutTitle}</h1>
          {
            <EditWorkoutNameButton
              workout={workout}
              handleEdit={handleUpdateWorkoutName}
            />
          }
        </div>

        {!isActiveWorkout && (
          <DatePicker
            date={new Date(workout.startedAt)}
            onDateChanged={(date) => handleUpdateWorkoutDate(date)}
          />
        )}

        <WorkoutNotes
          notes={workout.notes}
          notesOpen={workoutNotesOpen}
          onNotesOpenChange={setWorkoutNotesOpen}
          onUpdate={(notes) =>
            updateWorkout.mutate({
              workoutId: workout.id,
              data: { notes },
            })
          }
          showPlaceholder
        />

        {workout.workoutExercises && workout.workoutExercises.length > 0 && (
          <ul className="space-y-4">
            {workout.workoutExercises.map((workoutExercise) => (
              <WorkoutExercise
                key={workoutExercise.id}
                workoutExercise={workoutExercise}
                onOpenExercise={(exercise) => {
                  setSelectedWorkoutExercise(exercise);
                  setExerciseModalOpen(true);
                }}
              />
            ))}
          </ul>
        )}
        {
          <AddExerciseButton
            workoutId={workout.id}
            isActiveWorkout={isActiveWorkout}
          />
        }
        {isActiveWorkout && (
          <Button
            onClick={() => setDeleteWorkoutOpen(true)}
            className="w-full"
            variant="destructive"
          >
            Discard Workout
          </Button>
        )}
      </div>
    </WorkoutFormContext.Provider>
  );
}

export const useWorkoutFormContext = () => {
  const context = useContext(WorkoutFormContext);
  if (!context) {
    throw new Error("useWorkoutFormContext must be used within WorkoutForm");
  }
  return context;
};
