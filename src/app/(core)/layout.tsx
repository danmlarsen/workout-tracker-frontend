"use client";

import AuthGuard from "@/api/auth/auth-guard";
import ActiveWorkoutView from "@/app/(core)/workouts/workout-active/active-workout-view";
import Navigation from "@/components/navigation";
import { ActiveWorkoutProvider } from "@/context/active-workout-context";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ActiveWorkoutProvider>
        <div className="grid min-h-screen lg:grid-cols-[auto_1fr]">
          <div className="hidden w-[16rem] lg:block"></div>

          <div className="p-4 lg:p-8">
            <div className="mx-auto max-w-5xl">{children}</div>
          </div>

          <div className="h-16 lg:hidden" />

          <ActiveWorkoutView />
          <Navigation />
        </div>
        <ReactQueryDevtools />
      </ActiveWorkoutProvider>
    </AuthGuard>
  );
}
