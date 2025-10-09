"use client";

import { useCompletedWorkouts, useWorkoutStats } from "@/api/workouts/queries";
import WorkoutHistoryItem from "./workout-history-item";
import InfiniteScroll from "react-infinite-scroller";
import WorkoutCalendar from "./workout-calendar";
import { useState } from "react";

export default function WorkoutHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { data, fetchNextPage, hasNextPage, isFetching, isSuccess } =
    useCompletedWorkouts(selectedDate);

  const { data: workoutStats } = useWorkoutStats();

  return (
    <>
      <WorkoutCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <h2 className="text-xl font-bold">
        Workout History{" "}
        {!selectedDate && workoutStats?.totalWorkouts
          ? `(${workoutStats.totalWorkouts})`
          : ""}
      </h2>
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
          {isSuccess && (
            <ul className="space-y-6">
              {data.pages.map((group) =>
                group.results.map((workout) => (
                  <WorkoutHistoryItem key={workout.id} workout={workout} />
                )),
              )}
            </ul>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
