import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from './register-form';
import AuthGuard from '@/api/auth/auth-guard';

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
      </Card>
    </AuthGuard>
  );
}
