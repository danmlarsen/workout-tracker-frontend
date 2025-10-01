'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (accessToken !== null || !isLoggedIn) {
      setIsChecking(false);
    }

    if (!isChecking && !isLoggedIn) {
      router.push('/login');
    }
  }, [accessToken, isLoggedIn, router, isChecking]);

  if (isChecking) {
    return fallback || <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}
