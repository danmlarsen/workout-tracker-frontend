import { useQuery } from '@tanstack/react-query';
import { type TExercise } from './types';
import { apiClient } from '../client';

export const useExercises = () =>
  useQuery<TExercise[]>({
    queryKey: ['exercises'],
    queryFn: () => apiClient<TExercise[]>('/exercises'),
  });
