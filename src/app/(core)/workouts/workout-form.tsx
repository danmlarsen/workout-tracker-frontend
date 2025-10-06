"use client";

import AddExerciseButton from "./add-exercise-button";
import { useCompleteWorkout, useUpdateWorkout } from "@/api/workouts/mutations";
import { Button } from "@/components/ui/button";
import WorkoutExercise from "./workout-exercise";
import EditWorkoutNameButton from "./edit-workout-name-button";
import Timer from "@/components/ui/timer";
import { type TWorkout } from "@/api/workouts/types";
import { useState } from "react";
import { formatDate } from "date-fns";
import CompleteWorkoutDialog from "./complete-workout-dialog";

type TWorkoutFormProps = {
  workout: TWorkout;
  onSuccess?: () => void;
};

export default function WorkoutForm({ workout, onSuccess }: TWorkoutFormProps) {
  const isActiveWorkout = !workout.completedAt;

  const [isEditing, setIsEditing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const { mutate: completeWorkout } = useCompleteWorkout();
  const updateWorkoutMutation = useUpdateWorkout(isActiveWorkout);

  const hasIncompleteSets =
    workout.workoutExercises?.filter(
      (workoutExercise) =>
        workoutExercise.workoutSets?.filter((set) => !set.completedAt).length >
        0,
    ).length > 0;

  function handleCompleteWorkout() {
    onSuccess?.();
    completeWorkout(workout.id);
  }

  function handleUpdateWorkoutName(newTitle: string) {
    updateWorkoutMutation.mutate({
      workoutId: workout.id,
      data: { title: newTitle },
    });
  }

  return (
    <>
      <CompleteWorkoutDialog
        open={isFinished}
        onOpenChange={(open) => setIsFinished(open)}
        onConfirm={handleCompleteWorkout}
        incomplete={hasIncompleteSets}
      />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          {isActiveWorkout ? (
            <>
              <Timer workout={workout} />
              <Button onClick={() => setIsFinished(true)}>Finish</Button>
            </>
          ) : (
            <>
              <p>{formatDate(workout.completedAt!, "EEEE PP")}</p>
              <Button onClick={() => setIsEditing((curState) => !curState)}>
                {isEditing ? "Done" : "Edit"}
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h1>{workout.title}</h1>
          {(isActiveWorkout || isEditing) && (
            <EditWorkoutNameButton
              workoutName={workout.title}
              handleEdit={handleUpdateWorkoutName}
            />
          )}
        </div>

        {workout.workoutExercises && workout.workoutExercises.length > 0 && (
          <ul className="space-y-4">
            {workout.workoutExercises.map((workoutExercise) => (
              <WorkoutExercise
                key={workoutExercise.id}
                workoutExercise={workoutExercise}
                isEditing={isActiveWorkout || isEditing}
                isActiveWorkout={isActiveWorkout}
              />
            ))}
          </ul>
        )}
        {(isActiveWorkout || isEditing) && (
          <AddExerciseButton
            workoutId={workout.id}
            isActiveWorkout={isActiveWorkout}
          />
        )}
      </div>
    </>
  );
}
