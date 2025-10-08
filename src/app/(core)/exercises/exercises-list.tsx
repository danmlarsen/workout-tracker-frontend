"use client";

import { useInfiniteExercises } from "@/api/exercises/queries";
import ExerciseAvatar from "@/components/ui/exercise-avatar";
import InfiniteScroll from "react-infinite-scroller";

export default function ExercisesList({
  onExerciseClick,
}: {
  onExerciseClick?: (id: number) => void;
}) {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteExercises();

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
            <li
              key={exercise.id}
              onClick={() => onExerciseClick?.(exercise.id)}
            >
              <button className="grid w-full grid-cols-[50px_1fr_50px] items-center gap-4 py-4">
                <div>
                  <ExerciseAvatar name={exercise.name} />
                </div>
                <div className="text-left">
                  <h2>{exercise.name}</h2>
                  <div>
                    {exercise.muscleGroups.map((muscleGroup, idx) => (
                      <span
                        key={muscleGroup}
                        className="text-muted-foreground text-xs capitalize"
                      >
                        {muscleGroup}
                        {idx + 1 !== exercise.muscleGroups.length ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div>{exercise.timesUsed} times</div>
              </button>
            </li>
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
