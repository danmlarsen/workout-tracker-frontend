"use client";

import { useCompletedWorkouts } from "@/api/workouts/queries";
import WorkoutHistoryItem from "./workout-history-item";
import InfiniteScroll from "react-infinite-scroller";
import WorkoutCalendar from "./workout-calendar";
import { useState } from "react";

export default function WorkoutHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const { data, fetchNextPage, hasNextPage, isFetching, isSuccess } =
    useCompletedWorkouts(selectedDate);

  return (
    <>
      <WorkoutCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
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
