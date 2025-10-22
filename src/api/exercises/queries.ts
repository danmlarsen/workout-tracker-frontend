import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  type TExercisesQuery,
  type TExercisesQueryFilters,
  type TExercise,
  type TExerciseWorkoutsQuery,
} from "./types";
import { useApiClient } from "../client";

export const useExercises = () => {
  const { apiClient } = useApiClient();

  return useQuery<TExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => apiClient<TExercise[]>("/exercises"),
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export const useExercise = (exerciseId?: number) => {
  const { apiClient } = useApiClient();

  return useQuery<TExercise>({
    queryKey: ["exercises", exerciseId],
    queryFn: () => apiClient<TExercise>(`/exercises/${exerciseId}`),
    enabled: !!exerciseId,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export const useInfiniteExercises = ({
  filters,
}: {
  filters?: TExercisesQueryFilters;
} = {}) => {
  const { apiClient } = useApiClient();

  return useInfiniteQuery<TExercisesQuery>({
    queryKey: filters ? ["exercises", filters] : ["exercises"],
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) {
        searchParams.set("cursor", String(pageParam));
      }

      if (filters?.name) {
        searchParams.set("name", filters.name);
      }

      if (filters?.targetMuscleGroups) {
        searchParams.set(
          "targetMuscleGroups",
          filters.targetMuscleGroups.join(","),
        );
      }

      if (filters?.equipment) {
        searchParams.set("equipment", filters.equipment.join(","));
      }

      const queryString = searchParams.toString();

      return apiClient<TExercisesQuery>(
        `/exercises${queryString ? `?${queryString}` : ""}`,
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export const useExerciseWorkouts = (exerciseId?: number) => {
  const { apiClient } = useApiClient();

  return useQuery<TExerciseWorkoutsQuery>({
    queryKey: ["exercises", { exerciseId }, "workouts"],
    queryFn: () =>
      apiClient<TExerciseWorkoutsQuery>(`/exercises/${exerciseId}/workouts`),
    enabled: !!exerciseId,
  });
};
