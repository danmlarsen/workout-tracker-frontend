import { TWorkoutSummary } from "@/api/workouts/types";
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
import { CheckCircleIcon, ClockIcon, WeightIcon } from "lucide-react";
import { formatBestSet, formatTime, parseWorkoutTitle } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkoutModal } from "./workout-modal-provider";
import { Button } from "@/components/ui/button";

export default function WorkoutHistoryItem({
  workout,
}: {
  workout: TWorkoutSummary;
}) {
  const { openWorkout } = useWorkoutModal();

  const { id, startedAt, workoutExercises } = workout;

  const workoutTitle = parseWorkoutTitle(workout);
  const workoutDuration = formatTime(workout.activeDuration);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="sr-only">{workoutTitle}</CardTitle>
            <Button
              onClick={() => openWorkout(workout.id, false)}
              variant="link"
              className="px-0 font-bold lg:text-xl"
            >
              {workoutTitle}
            </Button>
            <WorkoutHistoryItemDropdownMenu
              workoutId={id}
              onClickEdit={() => openWorkout(workout.id)}
            />
          </div>
          <CardDescription>{formatDate(startedAt, "EEEE PP")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between gap-4 text-sm lg:text-base">
            {!!workoutDuration && (
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4 lg:size-6" />{" "}
                <span>{workoutDuration}</span>
              </div>
            )}
            {!!workout.totalWeight && (
              <div className="flex items-center gap-2">
                <WeightIcon className="size-4 lg:size-6" />{" "}
                <span>{workout.totalWeight}kg</span>
              </div>
            )}
            {!!workout.totalCompletedSets && (
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="size-4 lg:size-6" />{" "}
                <span>{workout.totalCompletedSets} sets</span>
              </div>
            )}
          </div>
          {workoutExercises.length === 0 && (
            <p className="text-muted-foreground py-4 text-center font-medium">
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
                {workoutExercises.map((workoutExercise, idx) => {
                  const exerciseName = workoutExercise.exerciseName;
                  const bestSet = formatBestSet(workoutExercise.bestSet);

                  const NAME_MAXLENGTH = 20;

                  return (
                    <TableRow key={`${workoutExercise.exerciseName}-${idx}`}>
                      <TableCell>
                        {exerciseName.length >= NAME_MAXLENGTH
                          ? `${exerciseName.slice(0, NAME_MAXLENGTH - 3).trim()}...`
                          : exerciseName}
                      </TableCell>
                      <TableCell className="text-center">
                        {workoutExercise.sets}
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

export function WorkoutHistoryItemSkeleton() {
  return (
    <li>
      <Skeleton className="h-[200px] rounded-xl" />
    </li>
  );
}
