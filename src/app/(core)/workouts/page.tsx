import WorkoutHistory from "./workout-history";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Workout History</h1>
      </div>
      <WorkoutHistory />
    </div>
  );
}
