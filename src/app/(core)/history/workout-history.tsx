'use client';

import { useWorkouts } from '@/api/workouts/queries';
import WorkoutHistoryItem from './workout-history-item';

export default function WorkoutHistory() {
  const workouts = useWorkouts();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Workout History {workouts.isFetched && <span className="text-muted-foreground font-normal">({workouts.data?.length ?? 0})</span>}
      </h2>
      <ul className="space-y-6">
        {workouts.data?.map(workout => (
          <WorkoutHistoryItem key={workout.id} data={workout} />
        ))}
      </ul>
    </div>
  );
}
