"use client";

import { useInfiniteExerciseWorkouts } from "@/api/exercises/queries";
import { TExercise } from "@/api/exercises/types";
import ExerciseWorkoutsItem, {
  ExerciseWorkoutsItemSkeleton,
} from "./exercise-workouts-item";
import InfiniteScroll from "react-infinite-scroller";
import { DEFAULT_LIST_ITEM_AMOUNT } from "@/lib/constants";

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
    isLoading,
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
        {isLoading &&
          Array.from({ length: DEFAULT_LIST_ITEM_AMOUNT }).map((_, index) => (
            <li key={`initial-${index}`}>
              <ExerciseWorkoutsItemSkeleton />
            </li>
          ))}
        {isSuccess &&
          data.pages.map((group) =>
            group.data.map((workout) => (
              <li key={workout.id}>
                <ExerciseWorkoutsItem workout={workout} exercise={exercise} />
              </li>
            )),
          )}
        {isSuccess &&
          data.pages.length > 0 &&
          data.pages[0].data.length === 0 && (
            <p className="text-muted-foreground text-center">
              No workout history found for this exercise.
            </p>
          )}
        {isFetchingNextPage &&
          Array.from({ length: DEFAULT_LIST_ITEM_AMOUNT }).map((_, index) => (
            <li key={`loading-more-${index}`}>
              <ExerciseWorkoutsItemSkeleton />
            </li>
          ))}
      </ul>
    </InfiniteScroll>
  );
}
