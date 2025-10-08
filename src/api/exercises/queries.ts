import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  type TExercisesQuery,
  type TExercisesQueryFilters,
  type TExercise,
} from "./types";
import { useApiClient } from "../client";

export const useExercises = () => {
  const { apiClient } = useApiClient();

  return useQuery<TExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => apiClient<TExercise[]>("/exercises"),
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

      if (filters?.muscleGroups) {
        searchParams.set("muscleGroups", filters.muscleGroups.join(","));
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
  });
};
