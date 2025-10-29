"use client";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const passwordResetSchema = z.object({
  email: z.email(),
});

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const { requestPasswordReset } = useAuth();

  async function handleSubmit(data: z.infer<typeof passwordResetSchema>) {
    await requestPasswordReset(data.email);
  }

  if (form.formState.isSubmitSuccessful) {
    return (
      <AuthGuard requireAuth={false}>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Email Sent</CardTitle>
          </CardHeader>
          <CardContent>
            If you have an account with us you will receive a password reset
            email at: <strong>{form.getValues("email")}</strong>
          </CardContent>
        </Card>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>
            Enter your email address to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset className="space-y-4">
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

                <Button className="w-full">Submit</Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div>
            <span>Remember your password?</span>{" "}
            <Link href="/login" className="font-bold underline">
              Login
            </Link>
          </div>
          <div>
            <span>Don&apos;t have an account?</span>{" "}
            <Link href="/register" className="font-bold underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
