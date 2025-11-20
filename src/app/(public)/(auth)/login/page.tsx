import Link from "next/link";

import AuthGuard from "@/api/auth/auth-guard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm">
          <div>
            <span>Need to create an account?</span>{" "}
            <Link
              href="/register"
              className="text-foreground font-bold underline underline-offset-2"
            >
              Sign up
            </Link>
          </div>
          <div>
            <span>Forgot password?</span>{" "}
            <Link
              href="/request-password-reset"
              className="text-foreground font-bold underline underline-offset-2"
            >
              Reset my password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
