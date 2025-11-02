import { TExercise, TExerciseWorkouts } from "@/api/exercises/types";
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
import { parseWorkoutTitle } from "@/lib/utils";
import { formatDate } from "date-fns";

export default function ExerciseWorkoutsItem({
  workout,
  exercise,
}: {
  workout: TExerciseWorkouts;
  exercise: TExercise;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{parseWorkoutTitle(workout)}</CardTitle>
        <CardDescription>
          {formatDate(workout.startedAt, "EEEE PP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">Sets</TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.workoutSets.map((set) => (
              <TableRow key={set.id}>
                <TableCell>
                  {set.type === "warmup" ? "W" : set.setNumber}
                </TableCell>
                <TableCell>
                  {exercise.category === "strength" && (
                    <>
                      {set.weight} kg x {set.reps}
                    </>
                  )}
                  {exercise.category === "cardio" && (
                    <>{set.duration} Minutes</>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
