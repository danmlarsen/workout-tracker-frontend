'use client';

import { useAuth } from '@/api/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Please enter a password'),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const { loginWithCredentials } = useAuth();

  async function handleSubmit(data: z.infer<typeof loginSchema>) {
    const response = await loginWithCredentials(data.email, data.password);

    if (response.success) {
      router.push('/');
    } else {
      form.setError('root', { type: 'custom', message: 'Invalid email and/or password' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-4" disabled={form.formState.isSubmitting}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && <FormMessage>{form.formState.errors.root.message}</FormMessage>}

          <Button type="submit" size="lg" className="w-full">
            Login
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
