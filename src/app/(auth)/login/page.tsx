import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './login-form';
import AuthGuard from '@/api/auth/auth-guard';

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </AuthGuard>
  );
}
