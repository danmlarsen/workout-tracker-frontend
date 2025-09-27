import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { type TWorkoutSetDto, type TWorkout, type TWorkoutsQuery, TUpdateWorkoutDto } from './types';

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
    queryKey: ['activeWorkout'],
    queryFn: () => apiClient<TWorkout | null>('/workouts/active'),
  });
}

export function useCreateActiveWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<TWorkout>('/workouts/active', {
        method: 'POST',
      }),
    onSuccess: newWorkout => {
      queryClient.setQueryData(['activeWorkout'], newWorkout);
    },
  });
}

export function useCompleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<TWorkout>(`/workouts/${workoutId}/complete`, {
        method: 'POST',
      }),
    onSuccess: (_, workoutId) => {
      queryClient.setQueryData(['activeWorkout'], null);
      queryClient.invalidateQueries({ queryKey: ['workouts', workoutId] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workoutId, data }: { workoutId: number; data: TUpdateWorkoutDto }) =>
      apiClient<TWorkout>(`/workouts/${workoutId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: workout => {
      queryClient.invalidateQueries({ queryKey: ['activeWorkout'] });
      queryClient.invalidateQueries({ queryKey: ['workouts', workout.id] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workoutId: number) =>
      apiClient<TWorkout>(`/workouts/${workoutId}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, workoutId) => {
      queryClient.removeQueries({ queryKey: ['workouts', workoutId] });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
}

export function useAddWorkoutExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workoutId, exerciseId }: { workoutId: number; exerciseId: number }) =>
      apiClient<void>(`/workouts/${workoutId}/workoutExercises`, {
        method: 'POST',
        body: JSON.stringify({
          exerciseId,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeWorkout'] });
    },
  });
}

export function useAddWorkoutSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workoutId, workoutExerciseId }: { workoutId: number; workoutExerciseId: number }) =>
      apiClient<void>(`/workouts/${workoutId}/workoutExercises/${workoutExerciseId}/sets`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeWorkout'] });
    },
  });
}

export function useUpdateWorkoutSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workoutId, workoutExerciseId, setId, data }: { workoutId: number; workoutExerciseId: number; setId: number; data: TWorkoutSetDto }) =>
      apiClient<void>(`/workouts/${workoutId}/workoutExercises/${workoutExerciseId}/sets/${setId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeWorkout'] });
    },
  });
}
