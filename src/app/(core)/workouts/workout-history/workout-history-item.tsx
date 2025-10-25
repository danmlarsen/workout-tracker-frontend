import { type TWorkout } from "@/api/workouts/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "date-fns";
import WorkoutHistoryItemDropdownMenu from "./workout-history-item-dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  ClockIcon,
  MaximizeIcon,
  WeightIcon,
} from "lucide-react";
import {
  formatBestSet,
  formatTime,
  getBestSetByDuration,
  getBestSetByOneRM,
  parseWorkoutTitle,
} from "@/lib/utils";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import WorkoutForm from "../workout-form/workout-form";

export default function WorkoutHistoryItem({ workout }: { workout: TWorkout }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { id, startedAt, workoutExercises } = workout;

  const workoutTitle = parseWorkoutTitle(workout);

  const workoutDuration = workout.activeDuration
    ? formatTime(workout.activeDuration)
    : null;

  const totalWeight = workout.workoutExercises.reduce(
    (total, exercise) =>
      total +
      exercise.workoutSets.reduce(
        (setTotal, curSet) =>
          setTotal +
          (!!curSet.completedAt
            ? (curSet.weight ?? 0) * (curSet.reps ?? 0)
            : 0),
        0,
      ),
    0,
  );

  const totalCompletedSets = workout.workoutExercises.reduce(
    (total, exercise) =>
      total + exercise.workoutSets?.filter((set) => !!set.completedAt)?.length,
    0,
  );

  return (
    <>
      <ResponsiveModal
        isOpen={modalIsOpen}
        onOpenChange={setModalIsOpen}
        content={
          <div className="px-4">
            <WorkoutForm
              workout={workout}
              onClose={() => setModalIsOpen(false)}
            />
          </div>
        }
        title={workout.title}
        description={`Edit workout ${workout.title}`}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{workoutTitle}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalIsOpen(true)}
              >
                <MaximizeIcon />
              </Button>
              <WorkoutHistoryItemDropdownMenu workoutId={id} />
            </div>
          </div>
          <CardDescription>{formatDate(startedAt, "EEEE PP")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 text-sm">
            {!!workoutDuration && (
              <div className="flex items-center gap-2">
                <ClockIcon size={16} /> <span>{workoutDuration}</span>
              </div>
            )}
            {!!totalWeight && (
              <div className="flex items-center gap-2">
                <WeightIcon size={16} /> <span>{totalWeight}kg</span>
              </div>
            )}
            {!!totalCompletedSets && (
              <div className="flex items-center gap-2">
                <CheckCircleIcon size={16} />{" "}
                <span>{totalCompletedSets} sets</span>
              </div>
            )}
          </div>
          {workoutExercises.length === 0 && (
            <p className="text-muted-foreground text-lg font-medium">
              No exercises added
            </p>
          )}
          {workoutExercises.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead className="w-8 text-center">Sets</TableHead>
                  <TableHead className="w-30 text-end">Best Set</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workoutExercises.map((workoutExercise) => {
                  const completedSets = workoutExercise.workoutSets.filter(
                    (set) => !!set.completedAt,
                  );

                  if (!completedSets) return null;

                  const { exercise } = workoutExercise;
                  const bestSet = formatBestSet(
                    exercise.category === "strength"
                      ? getBestSetByOneRM(completedSets)
                      : getBestSetByDuration(completedSets),
                  );

                  const NAME_MAXLENGTH = 20;

                  return (
                    <TableRow key={workoutExercise.id}>
                      <TableCell>
                        {exercise.name.length >= NAME_MAXLENGTH
                          ? `${exercise.name.slice(0, NAME_MAXLENGTH - 3).trim()}...`
                          : exercise.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {completedSets.length}
                      </TableCell>
                      <TableCell className="text-end">{bestSet}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
