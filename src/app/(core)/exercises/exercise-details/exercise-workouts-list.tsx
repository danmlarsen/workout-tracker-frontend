"use client";

import { useInfiniteExerciseWorkouts } from "@/api/exercises/queries";
import { TExercise } from "@/api/exercises/types";
import ExerciseWorkoutsItem from "./exercise-workouts-item";
import InfiniteScroll from "react-infinite-scroller";

export default function ExerciseWorkoutsList({
  exercise,
  scrollParentRef,
}: {
  exercise: TExercise;
  scrollParentRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteExerciseWorkouts(exercise.id);

  return (
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => {
        if (!isFetching) {
          fetchNextPage();
        }
      }}
      hasMore={hasNextPage}
      useWindow={!scrollParentRef}
      getScrollParent={() => scrollParentRef?.current || null}
    >
      <ul className="space-y-4 overflow-y-auto px-4 pb-6">
        {isSuccess &&
          data.pages.map((group) =>
            group.results.map((workout) => (
              <li key={workout.id}>
                <ExerciseWorkoutsItem workout={workout} exercise={exercise} />
              </li>
            )),
          )}
      </ul>
      {/* {data && !data.results.length && (
        <p className="text-muted-foreground">
          No history for this exercise found..
        </p>
      )} */}
    </InfiniteScroll>
  );
}
