"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { useAuth } from "@/api/auth/auth-context";
import AuthGuard from "@/api/auth/auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { emailConfirmationSchema } from "@/validation/emailConfirmationSchema";

export default function ResendEmailConfirmation() {
  const [emailSent, setEmailSent] = useState(false);
  const { resendEmailConfirmation } = useAuth();
  const form = useForm<z.infer<typeof emailConfirmationSchema>>({
    resolver: zodResolver(emailConfirmationSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  const handleSubmit = async (
    data: z.infer<typeof emailConfirmationSchema>,
  ) => {
    const response = await resendEmailConfirmation(data.email);

    setEmailSent(true);

    setTimeout(() => {
      setEmailSent(false);
    }, 1000 * 30);

    if (response.success) {
      router.push(`/register?success=true&email=${data.email}`);
    } else {
      form.setError("root", {
        type: "custom",
        message: response.message,
      });
    }
  };

  return (
    <AuthGuard requireAuth={false}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Resend Confirmation Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                className="space-y-4"
                disabled={form.formState.isSubmitting}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="email" />
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

                <Button type="submit" className="w-full" disabled={emailSent}>
                  {emailSent ? "Email Sent" : "Send"}
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Go back to Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthGuard>
  );
}
