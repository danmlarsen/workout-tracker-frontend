import WorkoutHistory from "./workout-history";
import NewWorkoutButton from "./new-workout-button";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Workout History</h1>
        <NewWorkoutButton />
      </div>
      <WorkoutHistory />
    </div>
  );
}
