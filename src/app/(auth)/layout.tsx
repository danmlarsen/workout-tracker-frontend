"use client";

import Logo from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid min-h-dvh grid-rows-[auto_1fr] px-4">
      <div className="flex justify-center py-10">
        <Logo />
      </div>
      <div className="grid place-items-center">{children}</div>
    </div>
  );
}
