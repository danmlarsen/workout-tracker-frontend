import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import AuthGuard from "@/api/auth/auth-guard";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <span>Need to create an account?</span>
          <Link href="/register" className="font-bold underline">
            Register
          </Link>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
