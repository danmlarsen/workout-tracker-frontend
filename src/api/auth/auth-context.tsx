import { API_URL } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

export type AuthContextType = {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const login = (token: string) => {
    setAccessToken(token);
  };

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        return {
          success: false,
          message: errorMessage || 'Invalid credentials',
        };
      }

      const { access_token: accessToken } = await res.json();
      setAccessToken(accessToken);

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  };

  const logout = () => {
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  const refresh = async () => {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      const { access_token: accessToken } = await res.json();
      setAccessToken(accessToken);
      return accessToken;
    }

    logout();
    return null;
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn: !!accessToken, login, loginWithCredentials, logout, refresh }}>{children}</AuthContext.Provider>
  );
};
