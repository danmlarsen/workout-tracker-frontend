import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TExercisesQuery, type TExercise } from "./types";
import { useApiClient } from "../client";

export const useExercises = () => {
  const { apiClient } = useApiClient();

  return useQuery<TExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => apiClient<TExercise[]>("/exercises"),
  });
};

export const useInfiniteExercises = () => {
  const { apiClient } = useApiClient();

  return useInfiniteQuery<TExercisesQuery>({
    queryKey: ["exercises"],
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) {
        searchParams.set("cursor", String(pageParam));
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
