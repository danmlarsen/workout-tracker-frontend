import { useUpdateWorkoutSet } from "@/api/workouts/mutations";
import { TWorkoutSetDto, type TWorkoutSet } from "@/api/workouts/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const parseToNumberOrNull = (value: string): number | null => {
  if (value.trim() === "") return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};

export default function WorkoutSet({
  workoutSet,
  workoutId,
  isEditing = true,
  previousSet,
  placeholderSet,
}: {
  workoutSet: TWorkoutSet;
  workoutId: number;
  isEditing?: boolean;
  previousSet?: TWorkoutSet;
  placeholderSet?: Partial<TWorkoutSet>;
}) {
  const [weight, setWeight] = useState(workoutSet.weight?.toString() || "");
  const [reps, setReps] = useState(workoutSet.reps?.toString() || "");

  useEffect(() => {
    setWeight(workoutSet.weight?.toString() || "");
    setReps(workoutSet.reps?.toString() || "");
  }, [workoutSet.weight, workoutSet.reps]);

  const updateWorkoutSetMutation = useUpdateWorkoutSet();
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

  function handleCheckedChange(isChecked: boolean) {
    debouncedUpdateWeight.cancel();
    debouncedUpdateReps.cancel();

    const numericWeight = parseToNumberOrNull(weight);
    const numericReps = parseToNumberOrNull(reps);

    const payload = {
      weight: numericWeight || placeholderSet?.weight || null,
      reps: numericReps || placeholderSet?.reps || null,
      completed: isChecked,
    };

    if (isChecked && (!payload.weight || !payload.reps)) {
      return;
    }

    updateWorkoutSet(payload);
  }

  function handleWeightChange(value: string) {
    setWeight(value);
    const numericvalue = parseToNumberOrNull(value);
    debouncedUpdateWeight(numericvalue);
  }

  function handleWeightBlur() {
    debouncedUpdateWeight.cancel();
    const numericvalue = parseToNumberOrNull(weight);
    if (numericvalue !== workoutSet.weight) {
      updateWorkoutSet({ weight: numericvalue });
    }
  }

  function handleRepsChange(value: string) {
    setReps(value);
    const numericvalue = parseToNumberOrNull(value);
    debouncedUpdateReps(numericvalue);
  }

  function handleRepsBlur() {
    debouncedUpdateReps.cancel();
    const numericvalue = parseToNumberOrNull(reps);
    if (numericvalue !== workoutSet.reps) {
      updateWorkoutSet({ reps: numericvalue });
    }
  }

  return (
    <TableRow
      className={cn(
        "",
        workoutSet.completedAt && "bg-slate-100 hover:bg-slate-50",
      )}
    >
      <TableCell>{workoutSet.setNumber}</TableCell>
      <TableCell>
        {previousSet ? `${previousSet.weight} x ${previousSet.reps}` : "-"}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          placeholder={
            placeholderSet?.weight ? placeholderSet.weight.toString() : ""
          }
          value={weight}
          onChange={(e) => handleWeightChange(e.target.value)}
          onBlur={handleWeightBlur}
          disabled={!isEditing || !!workoutSet.completedAt}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          placeholder={
            placeholderSet?.reps ? placeholderSet.reps.toString() : ""
          }
          value={reps}
          onChange={(e) => handleRepsChange(e.target.value)}
          onBlur={handleRepsBlur}
          disabled={!isEditing || !!workoutSet.completedAt}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          className="size-8 rounded-full"
          checked={!!workoutSet.completedAt}
          onCheckedChange={(checked) => handleCheckedChange(!!checked)}
          disabled={!isEditing}
        />
      </TableCell>
    </TableRow>
  );
}
