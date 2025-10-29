"use client";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ConfirmationState = "loading" | "success" | "error" | "missing-token";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { confirmEmail } = useAuth();

  const [state, setState] = useState<ConfirmationState>("loading");
  const [message, setMessage] = useState<string>("");

  // Track if confirmation has been attempted to prevent double calls
  const confirmationAttempted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("missing-token");
      setMessage("No confirmation token provided");
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
          setMessage(result.message || "Email confirmed successfully!");

          // Redirect to login after 5 seconds
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setState("error");
          setMessage(result.message || "Failed to confirm email");
        }
      } catch {
        setState("error");
        setMessage("An unexpected error occurred");
      }
    };

    handleConfirmation();
  }, [searchParams, confirmEmail, router]);

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            <div className="mb-4 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
            <p className="text-center text-gray-600">
              Confirming your email...
            </p>
          </>
        );

      case "success":
        return (
          <>
            <div className="mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="mb-4 text-center text-gray-800">{message}</p>
            <p className="mb-4 text-center text-sm text-gray-600">
              Redirecting to login in 5 seconds...
            </p>
            <Button onClick={() => router.push("/login")} className="w-full">
              Go to Login
            </Button>
          </>
        );

      case "error":
        return (
          <>
            <div className="mb-4 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <p className="mb-4 text-center text-gray-800">{message}</p>
            <div className="space-y-2">
              <Button
                onClick={() => router.push("/register")}
                variant="outline"
                className="w-full"
              >
                Try Registering Again
              </Button>
              <Button
                onClick={() => router.push("/resend-email-confirmation")}
                className="w-full"
              >
                Resend Confirmation Email
              </Button>
            </div>
          </>
        );

      case "missing-token":
        return (
          <>
            <div className="mb-4 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <p className="mb-4 text-center text-gray-800">{message}</p>
            <Button onClick={() => router.push("/register")} className="w-full">
              Go to Registration
            </Button>
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
            {state === "success" && "Email Confirmed!"}
            {state === "error" && "Confirmation Failed"}
            {state === "missing-token" && "Invalid Link"}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </AuthGuard>
  );
}
