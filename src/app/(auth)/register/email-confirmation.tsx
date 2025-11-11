import Link from "next/link";
import { MailOpenIcon } from "lucide-react";

import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmailConfirmationProps {
  email: string;
}

export default function EmailConfirmation({ email }: EmailConfirmationProps) {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <MailOpenIcon size={64} />
          <CardTitle>Email Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>
            We have sent a mail to <strong>{email}</strong> to confirm the
            validity of your email address. After receiving the email please
            follow the link provided to complete your registration.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <Button asChild className="w-full">
            <Link href="/login">Back to Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/resend-email-confirmation">
              Resend Confirmation Mail
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
