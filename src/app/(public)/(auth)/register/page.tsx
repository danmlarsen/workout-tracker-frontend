import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import AuthGuard from "@/api/auth/auth-guard";
import EmailConfirmation from "./email-confirmation";

interface RegisterPageProps {
  searchParams: Promise<{ success?: "true"; email?: string }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const searchParamValues = await searchParams;

  if (searchParamValues.success === "true" && searchParamValues.email) {
    return <EmailConfirmation email={searchParamValues.email} />;
  }

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="font-bold underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
