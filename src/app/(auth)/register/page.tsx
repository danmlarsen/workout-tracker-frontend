import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from './register-form';
import AuthGuard from '@/api/auth/auth-guard';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex items-center gap-2 justify-center">
          <span>Already have an account?</span>
          <Link href="/login" className="underline font-bold">
            Login
          </Link>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
