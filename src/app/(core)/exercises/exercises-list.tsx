"use client";

import { useInfiniteExercises } from "@/api/exercises/queries";
import { type TExercisesQueryFilters } from "@/api/exercises/types";
import InfiniteScroll from "react-infinite-scroller";
import ExerciseItem from "./exercise-item";

export default function ExercisesList({
  filters,
  onExerciseClick,
}: {
  filters?: TExercisesQueryFilters;
  onExerciseClick?: (id: number) => void;
}) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteExercises(
    {
      filters,
    },
  );

  return (
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => {
        if (!isFetching) {
          fetchNextPage();
        }
      }}
      hasMore={hasNextPage}
    >
      <ul className="space-y-2">
        {data?.pages.map((group) =>
          group.results.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onExerciseClick={onExerciseClick}
            />
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
