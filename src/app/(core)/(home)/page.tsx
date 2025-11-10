import NewWorkoutButton from "../workouts/workout-active/new-workout-button";
import AddWorkoutButton from "../workouts/workout-history/add-workout-button";
import LifetimeWorkoutsStats from "./lifetime-workouts-stats";
import WeeklyReportStats from "./weekly-report-stats";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_20rem] sm:gap-8">
        <div className="space-y-4 sm:col-start-2 sm:row-start-1">
          <NewWorkoutButton />
          <AddWorkoutButton className="w-full">Add Workout</AddWorkoutButton>
        </div>
        <div className="space-y-4 sm:col-start-1 sm:row-start-1">
          <LifetimeWorkoutsStats />
          <WeeklyReportStats />
        </div>
      </div>
    </div>
  );
}
