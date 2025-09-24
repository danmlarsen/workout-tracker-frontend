import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { type Workout } from './types';

export function useWorkouts() {
  return useQuery<Workout[]>({
    queryKey: ['workouts'],
    queryFn: () => apiClient<Workout[]>('/workouts'),
  });
}

export function useWorkout(id: number) {
  return useQuery<Workout>({
    queryKey: ['workouts', id],
    queryFn: () => apiClient<Workout>(`/workouts/${id}`),
  });
}

export function useActiveWorkout() {
  return useQuery<Workout | null>({
    queryKey: ['workouts', 'active'],
    queryFn: () => apiClient<Workout | null>('/workouts/active'),
  });
}

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<Workout>('/workouts', {
        method: 'POST',
      }),
    onSuccess: newWorkout => {
      queryClient.setQueryData(['workouts', 'active'], newWorkout);
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}

export function useCompleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<Workout>(`/workouts/${workoutId}/complete`, {
        method: 'POST',
      }),
    onSuccess: (_, workoutId) => {
      queryClient.setQueryData(['workouts', 'active'], null);
      queryClient.invalidateQueries({ queryKey: ['workouts', workoutId] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<Workout>(`/workouts/${workoutId}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, workoutId) => {
      queryClient.removeQueries({ queryKey: ['workouts', workoutId] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}
