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
import { DEFAULT_LIST_ITEM_AMOUNT } from "@/lib/constants";
import WorkoutModalProvider from "./workout-modal-provider";

export default function WorkoutHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    isError,
  } = useCompletedWorkouts(selectedDate);

  const { data: workoutStats } = useWorkoutLifetimeStats();

  return (
    <WorkoutModalProvider>
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
            {isLoading &&
              Array.from({ length: DEFAULT_LIST_ITEM_AMOUNT }).map(
                (_, index) => (
                  <WorkoutHistoryItemSkeleton key={`initial-${index}`} />
                ),
              )}
            {isSuccess &&
              data.pages.map((group) =>
                group.data.map((workout) => (
                  <WorkoutHistoryItem key={workout.id} workout={workout} />
                )),
              )}
            {isSuccess &&
              data.pages.length > 0 &&
              data.pages[0].data.length === 0 && (
                <p className="text-muted-foreground">
                  {selectedDate
                    ? `No workout history found for this date.`
                    : "No workout history found."}
                </p>
              )}
            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <WorkoutHistoryItemSkeleton key={`loading-more-${index}`} />
              ))}
            {isError && (
              <p className="text-destructive">
                An unexpected error occurred while loading workouts. Please try
                again later.
              </p>
            )}
          </ul>
        </InfiniteScroll>
      </div>
    </WorkoutModalProvider>
  );
}
