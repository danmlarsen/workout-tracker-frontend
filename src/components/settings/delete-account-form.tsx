"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useAuth } from "@/api/auth/auth-context";
import { useDeleteAccount } from "@/api/user/mutations";
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
import { currentPasswordSchema } from "@/validation/currentPasswordSchema";

export default function DeleteAccountForm() {
  const form = useForm<z.infer<typeof currentPasswordSchema>>({
    resolver: zodResolver(currentPasswordSchema),
    defaultValues: {
      currentPassword: "",
    },
  });
  const { logout } = useAuth();
  const deleteAccount = useDeleteAccount();

  const handleSubmit = async (data: z.infer<typeof currentPasswordSchema>) => {
    deleteAccount.mutate(data.currentPassword, {
      onSuccess: () => {
        toast.success("Successfully deleted your account");
        logout();
      },
      onError: (error) => {
        form.setError("root", {
          type: "custom",
          message: error.message || "Unable to delete account",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
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

          <Button type="submit" variant="destructive" className="w-full">
            Delete Account
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
