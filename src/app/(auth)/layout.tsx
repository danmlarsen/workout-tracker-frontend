'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto grid place-items-center min-h-screen px-6 py-4">{children}</div>
    </div>
  );
}
