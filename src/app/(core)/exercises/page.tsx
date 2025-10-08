import AddNewExerciseButton from "./add-new-exercise-button";
import ExercisesView from "./exercises-view";

export default function ExercisesPage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Exercises</h1>
        <AddNewExerciseButton />
      </div>
      <ExercisesView />
    </div>
  );
}
