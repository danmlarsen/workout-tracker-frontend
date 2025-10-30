import { API_URL } from "@/lib/constants";
import { useAuth } from "./auth/auth-context";

class ApiError extends Error {
  statusCode: number;
  error?: string;

  constructor(data: { statusCode: number; message: string; error?: string }) {
    super(data.message);
    this.statusCode = data.statusCode;
    this.error = data.error;
  }
}

export const useApiClient = () => {
  const { accessToken, refresh, logout } = useAuth();

  const apiClient = async <T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> => {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...options?.headers,
    });

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    // If token expired, try refresh flow
    if (res.status === 401) {
      try {
        const newToken = await refresh();

        if (!newToken) {
          if (accessToken) {
            await logout();
          }
          throw new Error("No access token after refresh");
        }

        headers.set("Authorization", `Bearer ${newToken}`);
        res = await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers,
          credentials: "include",
        });
      } catch (err) {
        if (accessToken) {
          await logout();
        }
        throw err;
      }
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new ApiError(errorData);
    }

    const data = await res.json();

    return data as T;
  };

  return { apiClient };
};
