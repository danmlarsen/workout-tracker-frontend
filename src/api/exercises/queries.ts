import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type TExerciseDto, type TExercise } from './types';
import { apiClient } from '../client';

export const useExercises = () =>
  useQuery<TExercise[]>({
    queryKey: ['exercises'],
    queryFn: () => apiClient<TExercise[]>('/exercises'),
  });

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TExerciseDto) =>
      apiClient<TExercise>('/exercises', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
};
