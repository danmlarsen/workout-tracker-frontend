import { useUpdateWorkoutSet } from "@/api/workouts/mutations";
import { TWorkoutSetDto, type TWorkoutSet } from "@/api/workouts/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import WorkoutSetOptionsButton from "./workout-set-options-button";

const parseToNumberOrNull = (value: string): number | null => {
  if (value.trim() === "") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};

type TWorkoutSetProps = {
  workoutSet: TWorkoutSet;
  workoutId: number;
  exerciseCategory: "strength" | "cardio";
  isActiveWorkout?: boolean;
  previousSet?: TWorkoutSet;
  placeholderSet?: Partial<TWorkoutSet>;
};

export default function WorkoutSet({
  workoutSet,
  workoutId,
  exerciseCategory,
  isActiveWorkout = false,
  previousSet,
  placeholderSet,
}: TWorkoutSetProps) {
  const [weight, setWeight] = useState(workoutSet.weight?.toString() || "");
  const [reps, setReps] = useState(workoutSet.reps?.toString() || "");
  const [duration, setDuration] = useState(
    workoutSet?.duration?.toString() || "",
  );

  useEffect(() => {
    setWeight(workoutSet.weight?.toString() || "");
    setReps(workoutSet.reps?.toString() || "");
    setDuration(workoutSet.duration?.toString() || "");
  }, [workoutSet.weight, workoutSet.reps, workoutSet.duration]);

  const updateWorkoutSetMutation = useUpdateWorkoutSet(isActiveWorkout);
  const updateWorkoutSet = (payload: TWorkoutSetDto) =>
    updateWorkoutSetMutation.mutate({
      workoutId,
      workoutExerciseId: workoutSet.workoutExerciseId,
      setId: workoutSet.id,
      data: payload,
    });

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

  function handleCheckedChange(isChecked: boolean) {
    debouncedUpdateWeight.cancel();
    debouncedUpdateReps.cancel();

    const numericWeight = parseToNumberOrNull(weight);
    const numericReps = parseToNumberOrNull(reps);
    const numericDuration = parseToNumberOrNull(duration);

    const payload = {
      weight: numericWeight || placeholderSet?.weight || null,
      reps: numericReps || placeholderSet?.reps || null,
      duration: numericDuration || placeholderSet?.duration || null,
      completed: isChecked,
    };

    if (
      isChecked &&
      exerciseCategory === "strength" &&
      (!payload.weight || !payload.reps)
    ) {
      return;
    }

    if (isChecked && exerciseCategory === "cardio" && !payload.duration) {
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
        workoutSet.completedAt && "bg-accent hover:bg-accent/75",
      )}
    >
      <TableCell>
        <WorkoutSetOptionsButton
          workoutId={workoutId}
          workoutSet={workoutSet}
          isActiveWorkout={isActiveWorkout}
        />
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
            disabled={!!workoutSet.completedAt}
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
            disabled={!!workoutSet.completedAt}
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
            disabled={!!workoutSet.completedAt}
          />
        )}
      </TableCell>
      <TableCell>
        <Checkbox
          className="size-8 rounded-full"
          checked={!!workoutSet.completedAt}
          onCheckedChange={(checked) => handleCheckedChange(!!checked)}
        />
      </TableCell>
    </TableRow>
  );
}
