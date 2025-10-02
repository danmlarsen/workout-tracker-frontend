'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ children, requireAuth = true, redirectTo }: AuthGuardProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const shouldRedirect = requireAuth ? !isLoggedIn : isLoggedIn;
    const defaultRedirect = requireAuth ? '/login' : '/';

    if (shouldRedirect) {
      router.push(redirectTo || defaultRedirect);
    }
  }, [hasMounted, isLoggedIn, requireAuth, redirectTo, router]);

  // Prevent hydration mismatch
  if (!hasMounted) {
    return null;
  }

  // Check if user should be allowed to see this route
  const canAccess = requireAuth ? isLoggedIn : !isLoggedIn;

  if (!canAccess) {
    return null;
  }

  return <>{children}</>;
}
