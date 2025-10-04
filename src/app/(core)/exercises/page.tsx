import ExercisesList from "./exercises-list";
import AddNewExerciseButton from "./add-new-exercise-button";

export default function StatsPage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Exercises</h1>
        <AddNewExerciseButton />
      </div>
      <ExercisesList />
    </div>
  );
}
