import NewWorkoutButton from "../workouts/new-workout-button";
import LifetimeWorkoutsStats from "./lifetime-workouts-stats";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <NewWorkoutButton />
      <LifetimeWorkoutsStats />
    </div>
  );
}
