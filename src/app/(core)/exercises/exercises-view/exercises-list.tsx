"use client";

import { useInfiniteExercises } from "@/api/exercises/queries";
import { TExercise, type TExercisesQueryFilters } from "@/api/exercises/types";
import InfiniteScroll from "react-infinite-scroller";
import ExerciseItem from "./exercise-item";
import { useState } from "react";
import ExerciseDetailsModal from "../exercise-details/exercise-details-modal";

export default function ExercisesList({
  filters,
  onExerciseClick,
}: {
  filters?: TExercisesQueryFilters;
  onExerciseClick?: (id: number) => void;
}) {
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
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

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteExercises(
    {
      filters,
    },
  );

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
        useWindow={false} // Set to false if used in a drawer/modal
      >
        <ul className="space-y-2">
          {data?.pages.map((group) =>
            group.results.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onExerciseClick={() => handleExerciseClick(exercise)}
              />
            )),
          )}
        </ul>
      </InfiniteScroll>
    </>
  );
}
