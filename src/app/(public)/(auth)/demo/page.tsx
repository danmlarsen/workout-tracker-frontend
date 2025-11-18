"use client";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import RecaptchaNotice from "@/components/recaptcha-notice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { loginWithCaptcha } = useAuth();

  const handleCreateDemoSession = async () => {
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not available. Please refresh the page.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await executeRecaptcha("demo_login");

      if (!token) {
        toast.error("Failed to verify reCAPTCHA. Please try again");
      }

      const response = await loginWithCaptcha(token);

      if (response.success) {
        toast.success("Demo session started successfully");
      } else {
        toast.error(response.message || "Failed to start demo session");
      }
    } catch (error) {
      console.error("Demo session error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="justify-center gap-4">
          <CardTitle className="text-xl">NextLift Demo</CardTitle>
          <CardDescription>
            Experience the full workout tracking app with sample data.
            <br />
            <span className="text-muted-foreground text-sm">
              Demo data will be deleted after 2 hours.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleCreateDemoSession}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
            Start Demo
          </Button>

          <RecaptchaNotice />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div>
            <span>Want to create a real account?</span>{" "}
            <Link href="/register" className="font-bold underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
