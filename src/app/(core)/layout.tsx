"use client";

import AuthGuard from "@/api/auth/auth-guard";
import ActiveWorkoutModal from "@/app/(core)/workouts/active-workout-modal";
import MobileNav from "@/components/mobile-nav";
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

          <ActiveWorkoutModal />
          <MobileNav />
        </div>
        <ReactQueryDevtools />
      </ActiveWorkoutProvider>
    </AuthGuard>
  );
}
