"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mx-auto grid min-h-screen place-items-center px-6 py-4">
        {children}
      </div>
    </div>
  );
}
