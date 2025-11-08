import { useUpdateWorkoutSet } from "@/api/workouts/workout-set-mutations";
import { TWorkoutSetDto, type TWorkoutSet } from "@/api/workouts/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import WorkoutSetOptionsButton from "./workout-set-options-button";
import { useWorkoutFormContext } from "./workout-form";
import { useMutationState } from "@tanstack/react-query";

const parseToNumberOrNull = (value: string): number | null => {
  if (value.trim() === "") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};

type TWorkoutSetProps = {
  workoutSet: TWorkoutSet;
  exerciseCategory: "strength" | "cardio";
  previousSet?: TWorkoutSet;
  placeholderSet?: Partial<TWorkoutSet>;
};

export default function WorkoutSet({
  workoutSet,
  exerciseCategory,
  previousSet,
  placeholderSet,
}: TWorkoutSetProps) {
  const [isChecked, setIsChecked] = useState(!!workoutSet.completedAt);
  const [weight, setWeight] = useState(workoutSet.weight?.toString() || "");
  const [reps, setReps] = useState(workoutSet.reps?.toString() || "");
  const [duration, setDuration] = useState(
    workoutSet?.duration?.toString() || "",
  );

  const { workout, isActiveWorkout, isEditing } = useWorkoutFormContext();

  const workoutId = workout.id;

  const { mutate, isPending } = useUpdateWorkoutSet(isActiveWorkout);
  const updateWorkoutSet = (payload: TWorkoutSetDto) =>
    mutate({
      workoutId,
      workoutExerciseId: workoutSet.workoutExerciseId,
      setId: workoutSet.id,
      data: payload,
    });

  // Sync local state with prop changes (from optimistic updates)
  useEffect(() => {
    if (!isPending) {
      setIsChecked(!!workoutSet.completedAt);
      setWeight(workoutSet.weight?.toString() || "");
      setReps(workoutSet.reps?.toString() || "");
      setDuration(workoutSet.duration?.toString() || "");
    }
  }, [
    workoutSet.completedAt,
    workoutSet.weight,
    workoutSet.reps,
    workoutSet.duration,
    isPending,
  ]);

  const isPendingDelete = useMutationState({
    filters: {
      mutationKey: ["deleteWorkoutSet"],
      status: "pending",
    },
    select: (mutation) => mutation.state.variables as { setId: number },
  }).some((set) => set.setId === workoutSet.id);

  const debouncedUpdateWeight = useDebouncedCallback(
    (weight: number | null) => {
      updateWorkoutSet({ weight });
    },
    200,
  );

  const debouncedUpdateReps = useDebouncedCallback((reps: number | null) => {
    updateWorkoutSet({ reps });
  }, 200);

  const debouncedUpdateDuration = useDebouncedCallback(
    (duration: number | null) => {
      updateWorkoutSet({ duration });
    },
    200,
  );

  function handleCheckedChange(checkedChange: boolean) {
    setIsChecked(checkedChange);

    debouncedUpdateWeight.cancel();
    debouncedUpdateReps.cancel();
    debouncedUpdateDuration.cancel();

    const numericWeight = parseToNumberOrNull(weight);
    const numericReps = parseToNumberOrNull(reps);
    const numericDuration = parseToNumberOrNull(duration);

    const payload = {
      weight: numericWeight || placeholderSet?.weight || null,
      reps: numericReps || placeholderSet?.reps || null,
      duration: numericDuration || placeholderSet?.duration || null,
      completed: checkedChange,
    };

    if (
      checkedChange &&
      exerciseCategory === "strength" &&
      (!payload.weight || !payload.reps)
    ) {
      setIsChecked(!!workoutSet.completedAt);
      return;
    }

    if (checkedChange && exerciseCategory === "cardio" && !payload.duration) {
      setIsChecked(!!workoutSet.completedAt);
      return;
    }

    updateWorkoutSet(payload);
  }

  function handleWeightChange(value: string) {
    setWeight(value);
    const numericValue = parseToNumberOrNull(value);
    debouncedUpdateWeight(numericValue);
  }

  function handleWeightBlur() {
    debouncedUpdateWeight.cancel();
    const numericValue = parseToNumberOrNull(weight);
    if (numericValue !== workoutSet.weight) {
      updateWorkoutSet({ weight: numericValue });
    }
  }

  function handleRepsChange(value: string) {
    setReps(value);
    const numericValue = parseToNumberOrNull(value);
    debouncedUpdateReps(numericValue);
  }

  function handleRepsBlur() {
    debouncedUpdateReps.cancel();
    const numericValue = parseToNumberOrNull(reps);
    if (numericValue !== workoutSet.reps) {
      updateWorkoutSet({ reps: numericValue });
    }
  }

  function handleDurationChange(value: string) {
    setDuration(value);
    const numericValue = parseToNumberOrNull(value);
    debouncedUpdateDuration(numericValue);
  }

  function handleDurationBlur() {
    debouncedUpdateDuration.cancel();
    const numericValue = parseToNumberOrNull(duration);
    if (numericValue !== workoutSet.duration) {
      updateWorkoutSet({ duration: numericValue });
    }
  }

  let previousSetString = "-";
  if (exerciseCategory === "strength" && previousSet) {
    previousSetString = `${previousSet.weight} x ${previousSet.reps}`;
  }
  if (exerciseCategory === "cardio" && previousSet) {
    previousSetString = `${previousSet.duration} Minutes`;
  }

  return (
    <TableRow
      className={cn(
        "",
        isChecked && "bg-secondary/5 hover:bg-secondary/10",
        isPendingDelete && "animate-pulse",
      )}
    >
      <TableCell>
        <WorkoutSetOptionsButton workoutSet={workoutSet} />
      </TableCell>
      <TableCell>{previousSetString}</TableCell>
      <TableCell>
        {exerciseCategory === "strength" && (
          <Input
            type="number"
            placeholder={
              placeholderSet?.weight ? placeholderSet.weight.toString() : ""
            }
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            onBlur={handleWeightBlur}
            disabled={isChecked || isPendingDelete}
            className="h-9"
          />
        )}
      </TableCell>
      <TableCell>
        {exerciseCategory === "strength" && (
          <Input
            type="number"
            placeholder={
              placeholderSet?.reps ? placeholderSet.reps.toString() : ""
            }
            value={reps}
            onChange={(e) => handleRepsChange(e.target.value)}
            onBlur={handleRepsBlur}
            disabled={isChecked || isPendingDelete}
            className="h-9"
          />
        )}
        {exerciseCategory === "cardio" && (
          <Input
            type="number"
            placeholder={
              placeholderSet?.duration ? placeholderSet.duration.toString() : ""
            }
            value={duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            onBlur={handleDurationBlur}
            disabled={isChecked || isPendingDelete}
            className="h-9"
          />
        )}
      </TableCell>
      <TableCell>
        <Checkbox
          className="size-8 rounded-full"
          checked={isChecked}
          onCheckedChange={(checked) => handleCheckedChange(!!checked)}
          disabled={!isEditing || isPendingDelete}
        />
      </TableCell>
    </TableRow>
  );
}
