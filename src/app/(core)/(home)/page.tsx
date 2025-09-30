'use client';

import { useAuth } from '@/api/auth/auth-context';

export default function HomePage() {
  const { loginWithCredentials, accessToken } = useAuth();

  async function handleLogin() {
    await loginWithCredentials('test@example.com', '12345');
    console.log(accessToken);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>login</button>
    </div>
  );
}
