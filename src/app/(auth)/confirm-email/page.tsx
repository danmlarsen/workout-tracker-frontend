"use client";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ConfirmationState = "loading" | "success" | "error" | "missing-token";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { confirmEmail } = useAuth();

  const [state, setState] = useState<ConfirmationState>("missing-token");

  // Track if confirmation has been attempted to prevent double calls
  const confirmationAttempted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("missing-token");
      return;
    }

    // Prevent multiple calls in development mode (StrictMode)
    if (confirmationAttempted.current) {
      return;
    }

    confirmationAttempted.current = true;

    const handleConfirmation = async () => {
      try {
        const result = await confirmEmail(token);

        if (result.success) {
          setState("success");

          // Redirect to login after 5 seconds
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    };

    handleConfirmation();
  }, [searchParams, confirmEmail, router]);

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            <div className="mb-4 flex items-center justify-center gap-2">
              <p className="text-muted-foreground text-center">
                Confirming your email
              </p>
              <Loader2 className="text-accent animate-spin" />
            </div>
          </>
        );

      case "success":
        return (
          <>
            <div className="mb-4 flex items-center justify-center gap-2">
              <p className="text-muted-foreground text-center">
                Redirecting to login
              </p>
              <Loader2 className="text-accent animate-spin" />
            </div>
            <Button className="w-full" asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </>
        );

      case "error":
        return (
          <>
            <p className="text-muted-foreground mb-4 text-center">
              An unexpected error occurred
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link href="/resend-email-confirmation">
                  Resend Confirmation Email
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/register">Go to Registration</Link>
              </Button>
            </div>
          </>
        );

      case "missing-token":
        return (
          <>
            <p className="text-muted-foreground mb-4 text-center">
              Invalid or no token provided
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link href="/resend-email-confirmation">
                  Resend Confirmation Email
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/register">Go to Registration</Link>
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {state === "loading" && "Confirming Email"}
            {state === "success" && "Email Confirmed"}
            {state === "error" && "Confirmation Failed"}
            {state === "missing-token" && "Invalid Link"}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </AuthGuard>
  );
}
