'use client';

import { useCompletedWorkouts } from '@/api/workouts/queries';
import WorkoutHistoryItem from './workout-history-item';
import InfiniteScroll from 'react-infinite-scroller';

export default function WorkoutHistory() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useCompletedWorkouts();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Workout History</h2>
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        <ul className="space-y-6">{data.pages.map(group => group.results.map(workout => <WorkoutHistoryItem key={workout.id} data={workout} />))}</ul>
      </InfiniteScroll>
    </div>
  );
}
