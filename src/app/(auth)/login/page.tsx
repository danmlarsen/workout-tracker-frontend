import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
