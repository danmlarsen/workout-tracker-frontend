import NewWorkoutButton from "../workouts/workout-active/new-workout-button";
import AddWorkoutButton from "../workouts/workout-history/add-workout-button";
import LifetimeWorkoutsStats from "./lifetime-workouts-stats";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex min-h-12 items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <NewWorkoutButton />
      <AddWorkoutButton className="w-full">Add Workout</AddWorkoutButton>
      <LifetimeWorkoutsStats />
    </div>
  );
}
