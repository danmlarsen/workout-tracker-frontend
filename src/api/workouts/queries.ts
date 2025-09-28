import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { type TWorkout, type TWorkoutsQuery } from './types';

export function useWorkouts() {
  return useQuery<TWorkoutsQuery>({
    queryKey: ['workouts'],
    queryFn: () => apiClient<TWorkoutsQuery>('/workouts'),
  });
}

export function useCompletedWorkouts() {
  return useInfiniteQuery<TWorkoutsQuery>({
    queryKey: ['workouts'],
    queryFn: ({ pageParam = undefined }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) {
        searchParams.set('cursor', String(pageParam));
      }
      const queryString = searchParams.toString();

      return apiClient<TWorkoutsQuery>(`/workouts${queryString ? `?${queryString}` : ''}`);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
}

export function useWorkout(id: number) {
  return useQuery<TWorkout>({
    queryKey: ['workouts', id],
    queryFn: () => apiClient<TWorkout>(`/workouts/${id}`),
  });
}

export function useActiveWorkout() {
  return useQuery<TWorkout | null>({
    queryKey: ['workouts', 'activeWorkout'],
    queryFn: () => apiClient<TWorkout | null>('/workouts/active'),
    staleTime: 0,
  });
}
