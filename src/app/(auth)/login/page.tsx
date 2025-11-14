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
import RecaptchaNotice from "@/components/recaptcha-notice";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <RecaptchaNotice />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div>
            <span>Need to create an account?</span>{" "}
            <Link href="/register" className="font-bold underline">
              Register
            </Link>
          </div>
          <div>
            <span>Forgot password?</span>{" "}
            <Link
              href="/request-password-reset"
              className="font-bold underline"
            >
              Reset my password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
