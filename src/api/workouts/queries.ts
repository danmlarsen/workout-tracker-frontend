import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { type Workout } from './types';

export function useWorkouts() {
  return useQuery<Workout[]>({
    queryKey: ['workouts'],
    queryFn: () => apiClient<Workout[]>('/workouts'),
  });
}

export function useCreateWorkout() {
  return useMutation({
    mutationFn: (data: { title: string }) =>
      apiClient<Workout>('/workouts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}

export function useWorkout(id: number) {
  return useQuery<Workout>({
    queryKey: ['workouts', id],
    queryFn: () => apiClient<Workout>(`/workouts/${id}`),
  });
}
