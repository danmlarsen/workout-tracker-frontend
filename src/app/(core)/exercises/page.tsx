import AddNewExerciseButton from "./exercise-form/add-new-exercise-button";
import ExercisesView from "./exercises-view/exercises-view";

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Exercises</h1>
        <AddNewExerciseButton />
      </div>
      <ExercisesView />
    </div>
  );
}
