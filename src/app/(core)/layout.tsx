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
        <div className="min-h-screen">
          <div className="p-4">
            <div className="mx-auto max-w-lg">{children}</div>
          </div>

          <ActiveWorkoutView />
          <Navigation />
        </div>
        <ReactQueryDevtools />
      </ActiveWorkoutProvider>
    </AuthGuard>
  );
}
