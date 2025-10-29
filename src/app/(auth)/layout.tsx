"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mx-auto grid min-h-screen place-items-center p-4">
        {children}
      </div>
    </div>
  );
}
