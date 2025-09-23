import { useQuery } from '@tanstack/react-query';
import { Exercise } from './types';
import { apiClient } from '../client';

export const useExercises = () =>
  useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: () => apiClient<Exercise[]>('/exercises'),
  });
