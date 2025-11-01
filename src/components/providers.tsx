"use client";

import { AuthProvider } from "@/api/auth/auth-context";
import { queryClient } from "@/react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <>
            {children}
            <Toaster position="top-center" />
          </>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
