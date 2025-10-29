import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import AuthGuard from "@/api/auth/auth-guard";
import Link from "next/link";
import EmailConfirmation from "./email-confirmation";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: "true"; email?: string }>;
}) {
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
