import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../client';
import { type TExercise, type TExerciseDto } from './types';

export const useCreateExercise = () => {
  const { apiClient } = useApiClient();
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
