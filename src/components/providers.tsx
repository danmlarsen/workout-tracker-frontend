"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/react-query/queryClient";
import { AuthProvider } from "@/api/auth/auth-context";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import RecaptchaProvider from "./recaptcha-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <RecaptchaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          // disableTransitionOnChange
        >
          <AuthProvider>
            <>
              {children}
              <Toaster position="top-center" />
            </>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecaptchaProvider>
  );
}
