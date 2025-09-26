import ExercisesList from './exercises-list';
import AddNewExerciseButton from './add-new-exercise-button';

export default function StatsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Exercises</h1>
        <AddNewExerciseButton />
      </div>
      <ExercisesList />
    </div>
  );
}
