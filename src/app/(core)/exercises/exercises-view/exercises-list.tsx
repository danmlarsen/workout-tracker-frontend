"use client";

import { useInfiniteExercises } from "@/api/exercises/queries";
import { TExercise, type TExercisesQueryFilters } from "@/api/exercises/types";
import InfiniteScroll from "react-infinite-scroller";
import ExerciseItem from "./exercise-item";
import { useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import ExerciseWorkoutsList from "../exercise-details/exercise-workouts-list";

export default function ExercisesList({
  filters,
  onExerciseClick,
}: {
  filters?: TExercisesQueryFilters;
  onExerciseClick?: (id: number) => void;
}) {
  const [selectedExercise, setSelectedExercise] = useState<TExercise | null>(
    null,
  );

  const handleExerciseClick = (exercise: TExercise) => {
    if (onExerciseClick) {
      onExerciseClick(exercise.id);
    } else {
      setSelectedExercise(exercise);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteExercises(
    {
      filters,
    },
  );

  return (
    <>
      <ResponsiveModal
        isOpen={!!selectedExercise}
        onOpenChange={() => setSelectedExercise(null)}
        content={<ExerciseWorkoutsList exercise={selectedExercise} />}
        title={selectedExercise?.name}
      />

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
                onExerciseClick={() => handleExerciseClick(exercise)}
              />
            )),
          )}
        </ul>
      </InfiniteScroll>
    </>
  );
}
