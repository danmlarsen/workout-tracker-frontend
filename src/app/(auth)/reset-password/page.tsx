"use client";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/validation/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();

  const [resetSuccess, setResetSuccess] = useState(false);

  const token = searchParams.get("token");

  async function handleSubmit(data: z.infer<typeof changePasswordSchema>) {
    if (!token) {
      form.setError("root", {
        type: "custom",
        message: "Invalid token provided. Please check your email",
      });
      return;
    }

    const response = await resetPassword(token, data.newPassword);

    if (response.success) {
      setResetSuccess(true);
    } else {
      form.setError("root", {
        type: "custom",
        message: response.message,
      });
    }
  }

  if (resetSuccess) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Update password</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your password has been updated.</p>
          <Link href="/login" className="underline">
            Click here to login to your account
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Update password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPasswordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password Confirm</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root?.message && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}

                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthGuard>
  );
}
