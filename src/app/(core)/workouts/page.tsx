import WorkoutCalendar from "./workout-calendar";
import WorkoutHistory from "./workout-history";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Workout History</h1>
      </div>
      <WorkoutCalendar />
      <WorkoutHistory />
    </div>
  );
}
