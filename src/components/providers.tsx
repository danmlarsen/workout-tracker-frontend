"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";

import { queryClient } from "@/react-query/queryClient";
import { AuthProvider } from "@/api/auth/auth-context";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
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
            <Analytics />
            <Toaster position="top-center" />
          </>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
