import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  TWorkoutCalendarData,
  TWorkoutStats,
  type TWorkout,
  type TWorkoutsQuery,
} from "./types";

export function useWorkouts() {
  const { apiClient } = useApiClient();

  return useQuery<TWorkoutsQuery>({
    queryKey: ["workouts"],
    queryFn: () => apiClient<TWorkoutsQuery>("/workouts"),
  });
}

export function useCompletedWorkouts() {
  const { apiClient } = useApiClient();

  return useInfiniteQuery<TWorkoutsQuery>({
    queryKey: ["workouts"],
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) {
        searchParams.set("cursor", String(pageParam));
      }
      const queryString = searchParams.toString();

      return apiClient<TWorkoutsQuery>(
        `/workouts${queryString ? `?${queryString}` : ""}`,
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useWorkout(id: number) {
  const { apiClient } = useApiClient();

  return useQuery<TWorkout>({
    queryKey: ["workouts", id],
    queryFn: () => apiClient<TWorkout>(`/workouts/${id}`),
  });
}

export function useActiveWorkout() {
  const { apiClient } = useApiClient();

  return useQuery<TWorkout | null>({
    queryKey: ["activeWorkout"],
    queryFn: () => apiClient<TWorkout | null>("/workouts/active"),
    staleTime: 0,
  });
}

export function useWorkoutStats() {
  const { apiClient } = useApiClient();

  return useQuery<TWorkoutStats>({
    queryKey: ["workouts", "stats"],
    queryFn: () => apiClient<TWorkoutStats>("/workouts/stats"),
  });
}

export function useWorkoutCalendar(year: number) {
  const { apiClient } = useApiClient();

  return useQuery<TWorkoutCalendarData>({
    queryKey: ["workouts", "workoutDates", year],
    queryFn: () =>
      apiClient<TWorkoutCalendarData>(`/workouts/calendar?year=${year}`),
    staleTime: 60 * 60 * 1000,
  });
}
