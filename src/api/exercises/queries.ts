import { useQuery } from '@tanstack/react-query';
import { type TExercise } from './types';
import { useApiClient } from '../client';

export const useExercises = () => {
  const { apiClient } = useApiClient();

  return useQuery<TExercise[]>({
    queryKey: ['exercises'],
    queryFn: () => apiClient<TExercise[]>('/exercises'),
  });
};
