"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/api/auth/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "@/validation/loginSchema";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const { loginWithCredentials } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsPending(true);
    const response = await loginWithCredentials(data.email, data.password);
    setIsPending(false);

    if (response.success) {
      router.push("/app");
    } else {
      if (response.code && response.code === "EMAIL_NOT_CONFIRMED") {
        form.setError("root", {
          type: "custom",
          message: "Email is not confirmed. Please check your email",
        });
      } else {
        form.setError("root", {
          type: "custom",
          message: response.message || "Login failed. Please try again later.",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="space-y-4"
          disabled={form.formState.isSubmitting || isPending}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" className="w-full">
            Login
            {(form.formState.isSubmitting || isPending) && <Spinner />}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
