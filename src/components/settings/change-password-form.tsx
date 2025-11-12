"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useAuth } from "@/api/auth/auth-context";
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
import { changePasswordSchema } from "@/validation/changePasswordSchema";
import { currentPasswordSchema } from "@/validation/currentPasswordSchema";

const schema = currentPasswordSchema.and(changePasswordSchema);

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export default function ChangePasswordForm({
  onSuccess,
}: ChangePasswordFormProps) {
  const { changePassword } = useAuth();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const response = await changePassword(
      data.currentPassword,
      data.newPassword,
    );

    if (response.success) {
      toast.success("Password changed successfully");
      onSuccess?.();
    } else {
      form.setError("root", {
        type: "custom",
        message: response.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-4" disabled={form.formState.isSubmitting}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
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
                <FormLabel>Confirm New Password</FormLabel>
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
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && <Spinner />}
            Change Password
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
