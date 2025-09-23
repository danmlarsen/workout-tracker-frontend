'use client';

import MobileNav from '@/components/mobile-nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <div className="px-6 py-4">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>

        <MobileNav />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
