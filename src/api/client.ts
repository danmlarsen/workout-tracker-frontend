import { API_TESTING_TOKEN, API_URL } from '@/lib/constants';

export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TESTING_TOKEN}`,
      ...options?.headers,
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
