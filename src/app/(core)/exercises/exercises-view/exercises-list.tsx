"use client";

import { useInfiniteExercises } from "@/api/exercises/queries";
import { TExercise, type TExercisesQueryFilters } from "@/api/exercises/types";
import InfiniteScroll from "react-infinite-scroller";
import ExerciseItem, { ExerciseItemSkeleton } from "./exercise-item";
import { useState } from "react";
import ExerciseDetailsModal from "../exercise-details/exercise-details-modal";
import { DEFAULT_LIST_ITEM_AMOUNT } from "@/lib/constants";
import { useSearchParamState } from "@/hooks/use-search-param-state";

export default function ExercisesList({
  filters,
  onExerciseClick,
}: {
  filters?: TExercisesQueryFilters;
  onExerciseClick?: (id: number) => void;
}) {
  const [exerciseModalOpen, setExerciseModalOpen] =
    useSearchParamState("exercise-modal");
  const [selectedExercise, setSelectedExercise] = useState<
    TExercise | undefined
  >();

  const handleExerciseClick = (exercise: TExercise) => {
    if (onExerciseClick) {
      onExerciseClick(exercise.id);
    } else {
      setSelectedExercise(exercise);
      setExerciseModalOpen(true);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    isError,
  } = useInfiniteExercises({
    filters,
  });

  return (
    <>
      <ExerciseDetailsModal
        isOpen={exerciseModalOpen}
        onOpenChange={setExerciseModalOpen}
        exercise={selectedExercise}
      />

      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
        useWindow={!onExerciseClick} // Set to false if used in a drawer/modal
      >
        <ul>
          {isLoading &&
            Array.from({ length: DEFAULT_LIST_ITEM_AMOUNT }).map((_, index) => (
              <ExerciseItemSkeleton key={`initial-${index}`} />
            ))}
          {isSuccess &&
            data.pages.map((group) =>
              group.data.map((exercise) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  onExerciseClick={() => handleExerciseClick(exercise)}
                />
              )),
            )}
          {isFetchingNextPage &&
            Array.from({ length: DEFAULT_LIST_ITEM_AMOUNT }).map((_, index) => (
              <ExerciseItemSkeleton key={`loading-more-${index}`} />
            ))}
          {isError && (
            <p className="text-destructive">
              An unexpected error occurred while loading exercises. Please try
              again later.
            </p>
          )}
        </ul>
      </InfiniteScroll>
    </>
  );
}
