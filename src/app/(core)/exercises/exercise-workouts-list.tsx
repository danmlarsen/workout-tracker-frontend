import { useExerciseWorkouts } from "@/api/exercises/queries";
import { TExercise } from "@/api/exercises/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExerciseWorkoutsList({
  exercise,
}: {
  exercise: TExercise | null;
}) {
  const { data, isLoading } = useExerciseWorkouts(exercise?.id);

  return (
    <>
      {!isLoading && data && data.results.length && (
        <ul className="overflow-y-auto px-4 pb-6">
          {data.results.map((workout) => (
            <li key={workout.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{workout.title}</CardTitle>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
