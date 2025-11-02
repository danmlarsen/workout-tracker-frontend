"use client";

import {
  useCompletedWorkouts,
  useWorkoutLifetimeStats,
} from "@/api/workouts/queries";
import WorkoutHistoryItem, {
  WorkoutHistoryItemSkeleton,
} from "./workout-history-item";
import InfiniteScroll from "react-infinite-scroller";
import WorkoutHistoryCalendar from "./workout-history-calendar";
import { useState } from "react";
import AddWorkoutButton from "./add-workout-button";

export default function WorkoutHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useCompletedWorkouts(selectedDate);

  const { data: workoutStats } = useWorkoutLifetimeStats();

  return (
    <>
      <WorkoutHistoryCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Workout History{" "}
          {!selectedDate && workoutStats?.totalWorkouts
            ? `(${workoutStats.totalWorkouts})`
            : ""}
        </h2>
        <AddWorkoutButton selectedDate={selectedDate} />
      </div>
      <div className="space-y-4">
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => {
            if (!isFetching) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
        >
          <ul className="space-y-6">
            {isFetching &&
              Array.from({ length: 10 }).map((_, index) => (
                <WorkoutHistoryItemSkeleton key={`initial-${index}`} />
              ))}
            {isSuccess &&
              data.pages.map((group) =>
                group.results.map((workout) => (
                  <WorkoutHistoryItem key={workout.id} workout={workout} />
                )),
              )}
            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <WorkoutHistoryItemSkeleton key={`loading-more-${index}`} />
              ))}
          </ul>
        </InfiniteScroll>
      </div>
    </>
  );
}
