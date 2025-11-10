import { useUpdateWorkoutSet } from "@/api/workouts/workout-set-mutations";
import { TWorkoutSetDto, type TWorkoutSet } from "@/api/workouts/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import WorkoutSetOptionsButton from "./workout-set-options-button";
import { useWorkoutFormContext } from "./workout-form";
import { useMutationState } from "@tanstack/react-query";

const parseWorkoutValue = (
  value: string,
  max: number,
  shouldTruncate = false,
): number | null => {
  if (value.trim() === "") return null;

  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 1) return null;

  const clamped = Math.min(max, parsed);
  return shouldTruncate ? Math.trunc(clamped) : clamped;
};

const parseReps = (value: string) => parseWorkoutValue(value, 999, true);
const parseWeight = (value: string) => parseWorkoutValue(value, 9999);
const parseDuration = (value: string) => parseWorkoutValue(value, 9999);

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
  const [isChecked, setIsChecked] = useState(workoutSet.completed);
  const [weight, setWeight] = useState(workoutSet.weight?.toString() || "");
  const [reps, setReps] = useState(workoutSet.reps?.toString() || "");
  const [duration, setDuration] = useState(
    workoutSet?.duration?.toString() || "",
  );

  const { workout, isActiveWorkout, isEditing } = useWorkoutFormContext();

  const workoutId = workout.id;

  const { mutate } = useUpdateWorkoutSet(isActiveWorkout);
  const updateWorkoutSet = (payload: TWorkoutSetDto) =>
    mutate({
      workoutId,
      workoutExerciseId: workoutSet.workoutExerciseId,
      setId: workoutSet.id,
      data: payload,
    });

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
    500,
  );

  const debouncedUpdateReps = useDebouncedCallback((reps: number | null) => {
    updateWorkoutSet({ reps });
  }, 500);

  const debouncedUpdateDuration = useDebouncedCallback(
    (duration: number | null) => {
      updateWorkoutSet({ duration });
    },
    500,
  );

  function handleCheckedChange(checkedChange: boolean) {
    setIsChecked(checkedChange);

    debouncedUpdateWeight.cancel();
    debouncedUpdateReps.cancel();
    debouncedUpdateDuration.cancel();

    const numericWeight = parseWeight(weight);
    const numericReps = parseReps(reps);
    const numericDuration = parseDuration(duration);

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
      setIsChecked(workoutSet.completed);
      return;
    }

    if (checkedChange && exerciseCategory === "cardio" && !payload.duration) {
      setIsChecked(workoutSet.completed);
      return;
    }

    updateWorkoutSet(payload);
  }

  function handleWeightChange(value: string) {
    // Only allow empty string or valid numbers up to 4 digits
    if (value === "" || (/^\d{1,4}$/.test(value) && parseInt(value) <= 9999)) {
      setWeight(value);
      const numericValue = parseWeight(value);
      debouncedUpdateWeight(numericValue);
    }
    // Invalid input is simply ignored
  }

  function handleWeightBlur() {
    debouncedUpdateWeight.cancel();
    const numericValue = parseWeight(weight);
    if (numericValue !== workoutSet.weight) {
      updateWorkoutSet({ weight: numericValue });
    }
  }

  function handleRepsChange(value: string) {
    // Only allow empty string or valid numbers up to 3 digits
    if (value === "" || (/^\d{1,3}$/.test(value) && parseInt(value) <= 999)) {
      setReps(value);
      const numericValue = parseReps(value);
      debouncedUpdateReps(numericValue);
    }
  }

  function handleRepsBlur() {
    debouncedUpdateReps.cancel();
    const numericValue = parseReps(reps);
    if (numericValue !== workoutSet.reps) {
      updateWorkoutSet({ reps: numericValue });
    }
  }

  function handleDurationChange(value: string) {
    // Only allow empty string or valid numbers up to 4 digits
    if (value === "" || (/^\d{1,4}$/.test(value) && parseInt(value) <= 9999)) {
      setDuration(value);
      const numericValue = parseDuration(value);
      debouncedUpdateDuration(numericValue);
    }
  }

  function handleDurationBlur() {
    debouncedUpdateDuration.cancel();
    const numericValue = parseDuration(duration);
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
            className="h-9 text-center"
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
            className="h-9 text-center"
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
            className="h-9 text-center"
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
