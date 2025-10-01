'use client';

import { useAuth } from '@/api/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      await logout();
      router.push('/login');
    }
    handleLogout();
  }, [logout, router]);

  return null;
}
