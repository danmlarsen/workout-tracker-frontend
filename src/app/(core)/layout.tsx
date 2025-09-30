'use client';

import ActiveWorkoutModal from '@/app/(core)/train/active-workout-modal';
import MobileNav from '@/components/mobile-nav';
import { ActiveWorkoutProvider } from '@/context/active-workout-context';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <ActiveWorkoutProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="px-6 py-4">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>

        <ActiveWorkoutModal />
        <MobileNav />
      </div>
      <ReactQueryDevtools />
    </ActiveWorkoutProvider>
  );
}
