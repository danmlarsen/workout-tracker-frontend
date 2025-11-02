import Logo from "@/components/logo";
import { Spinner } from "@/components/ui/spinner";
import { API_URL } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthResult = {
  success: boolean;
  statusCode?: number;
  code?: string;
  message?: string;
};

export type AuthContextType = {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  loginWithCredentials: (
    email: string,
    password: string,
  ) => Promise<AuthResult>;
  register: (email: string, password: string) => Promise<AuthResult>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<AuthResult>;
  confirmEmail: (token: string) => Promise<AuthResult>;
  resendEmailConfirmation: (email: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  resetPassword: (token: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          message: parsedResponse?.message || "Login failed",
          code: parsedResponse?.code,
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
        message: "Network error. Please try again later.",
      };
    }
  };

  const register = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message: parsedResponse?.message || "Registration failed",
        };
      }

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (!accessToken) return;

    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message: parsedResponse?.message || "Unable to change password",
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const confirmEmail = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/confirm/${token}`);

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message: parsedResponse?.message || "Unable to confirm email",
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const resendEmailConfirmation = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/resend-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message:
            parsedResponse?.message || "Unable to resend confirmation email",
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message:
            parsedResponse?.message || "Unable to request password reset",
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/password-reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const parsedResponse = await res.json();
        return {
          success: false,
          statusCode: parsedResponse?.statusCode,
          message: parsedResponse?.message || "Unable to reset password",
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const logout = async () => {
    if (accessToken) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
      } catch (error) {
        console.warn("Logout request failed:", error);
      }
    }

    setAccessToken(null);
    queryClient.clear();
  };

  const refresh = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
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
      <div className="mx-auto grid min-h-dvh px-4">
        <div className="flex justify-center py-10">
          <Logo />
        </div>
        <div className="fixed inset-0 grid place-items-center">
          <Spinner className="size-16" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn: !!accessToken,
        isLoading,
        login,
        loginWithCredentials,
        register,
        changePassword,
        confirmEmail,
        resendEmailConfirmation,
        requestPasswordReset,
        resetPassword,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
