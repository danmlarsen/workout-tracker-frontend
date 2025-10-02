import { API_URL } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

export type AuthContextType = {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true);
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

  const logout = async () => {
    if (accessToken) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });
      } catch (error) {
        console.warn('Logout request failed:', error);
      }
    }

    setAccessToken(null);
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  const refresh = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        const { access_token: accessToken } = await res.json();
        setAccessToken(accessToken);
        return accessToken;
      }

      setAccessToken(null);
      return null;
    } catch {
      setAccessToken(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn: !!accessToken, isLoading, login, loginWithCredentials, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
