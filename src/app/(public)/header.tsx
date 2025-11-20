"use client";

import Link from "next/link";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/api/auth/auth-context";

export default function LandingHeader() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className="border-foreground/10 bg-card fixed inset-x-0 top-0 grid min-h-24 border-b">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 p-4 md:p-6">
          <Logo className="h-8 w-auto -translate-y-0.5 sm:h-10" />
          <div className="flex items-center gap-2 sm:gap-4">
            {!isLoggedIn && (
              <>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Log in</Link>
                </Button>
              </>
            )}
            {isLoggedIn && (
              <>
                <Button asChild>
                  <Link href="/app">Go to App</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="h-24" />
    </>
  );
}
