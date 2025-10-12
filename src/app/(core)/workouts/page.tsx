import WorkoutHistory from "./workout-history/workout-history";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      {/* <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">History</h1>
      </div> */}
      <WorkoutHistory />
    </div>
  );
}
